import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Compression middleware (secure)
app.use(compression({
    filter: (req, res) => {
        // Don't compress responses with this request header
        if (req.headers['x-no-compression']) {
            return false;
        }
        // Use compression filter function
        return compression.filter(req, res);
    },
    level: 6,
    threshold: 1024
}));

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com", "https://connect.facebook.net"],
            imgSrc: ["'self'", "data:", "https:", "blob:"],
            connectSrc: ["'self'", "https://www.google-analytics.com", "https://analytics.google.com"],
            frameSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            childSrc: ["'self'"]
        }
    },
    crossOriginEmbedderPolicy: false,
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

const formLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit form submissions to 5 per windowMs
    message: 'Too many form submissions from this IP, please try again later.',
    skip: (req) => req.method !== 'POST',
    standardHeaders: true,
    legacyHeaders: false,
});

// Security logging middleware
app.use((req, res, next) => {
    const now = new Date().toISOString();
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent') || 'Unknown';
    
    // Log suspicious patterns
    const suspiciousPatterns = [
        /script/gi,
        /eval\(/gi,
        /javascript:/gi,
        /data:text\/html/gi,
        /vbscript:/gi
    ];
    
    const requestData = JSON.stringify(req.body || {});
    const queryData = JSON.stringify(req.query || {});
    
    if (suspiciousPatterns.some(pattern => 
        pattern.test(requestData) || pattern.test(queryData) || pattern.test(req.url)
    )) {
        console.warn(`[SECURITY] Suspicious request detected: ${now}`, {
            ip,
            userAgent,
            url: req.url,
            method: req.method,
            body: req.body,
            query: req.query
        });
    }
    
    next();
});

app.use(limiter);
app.use('/api', formLimiter);

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir arquivos estáticos com MIME types corretos
app.use(express.static(path.join(__dirname, 'dist'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        } else if (path.endsWith('.mjs')) {
            res.setHeader('Content-Type', 'application/javascript');
        } else if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

// API endpoint for form submissions with enhanced security
app.post('/api/contact', formLimiter, (req, res) => {
    const { nome, telefone, email, produto, quantidade, detalhes } = req.body;
    
    // Basic validation
    if (!nome || !telefone || !email) {
        return res.status(400).json({ error: 'Required fields missing' });
    }
    
    // Here you would normally process the form submission
    // For now, just return success
    res.json({ success: true, message: 'Form submitted successfully' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Fallback para SPA - todas as rotas retornam index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
