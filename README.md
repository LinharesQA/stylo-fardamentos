# 👔 Stylo Fardamentos

> Website institucional moderno para empresa especializada em fardamentos personalizados e Equipamentos de Proteção Individual (EPIs).

## 🌟 Sobre o Projeto

Site responsivo desenvolvido para apresentar os serviços e diferenciais da Stylo Fardamentos, empresa especializada na confecção de uniformes corporativos e EPIs personalizados.

### ✨ Principais Funcionalidades

- 🏠 **Landing Page Completa** - Hero, sobre, produtos, processo, FAQ e contato
- 📱 **Design Responsivo** - Otimizado para desktop, tablet e mobile
- 🎨 **Tema Claro/Escuro** - Sistema de temas com transições suaves
- 📧 **Formulário de Contato** - Integração com validação completa
- 🔥 **Animações Modernas** - Scroll reveals e micro-interações
- ⚡ **Performance Otimizada** - Build otimizado com Vite

## 🚀 Tecnologias Utilizadas

- **Frontend:** React 18 + TypeScript
- **Estilização:** Tailwind CSS + shadcn/ui
- **Build:** Vite 5
- **Roteamento:** React Router DOM
- **Estado:** TanStack Query
- **Formulários:** React Hook Form + Zod
- **Ícones:** Lucide React
- **Animações:** CSS + Framer Motion patterns

## 📦 Instalação e Uso

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Clone e Execute

```bash
# Clone o repositório
git clone https://github.com/LinharesQA/stylo-fardamentos.git

# Entre na pasta do projeto
cd stylo-fardamentos

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev

# Acesse http://localhost:8080
```

### Scripts Disponíveis

```bash
npm run dev        # Servidor de desenvolvimento
npm run build      # Build de produção
npm run build:dev  # Build de desenvolvimento
npm run preview    # Preview da build
npm run lint       # Verificação de código
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── ui/              # Componentes base (shadcn/ui)
│   ├── HeroSection.tsx   # Seção principal
│   ├── AboutSection.tsx  # Sobre a empresa
│   ├── ContactSection.tsx # Formulário de contato
│   └── ...
├── hooks/               # Custom hooks
├── lib/                 # Utilitários
├── pages/               # Páginas da aplicação
└── assets/              # Recursos estáticos
```

## 🎨 Design System

### Cores Principais
- **Primária:** Orange (#FF6B35) - Identidade Stylo
- **Secundária:** Yellow (#FFD700) - Complementar
- **Neutras:** Escala de cinzas para textos e fundos

### Componentes
- Interface baseada em **shadcn/ui**
- Sistema de **CSS Variables** para temas
- **Tailwind CSS** para estilização utilitária

## 🌐 Deploy

### EasyPanel (Recomendado)
1. Conecte o repositório GitHub
2. Configure build: `npm run build`
3. Diretório de saída: `dist`
4. Deploy automático ativado

### Outros Provedores
- **Vercel:** `npm run build` → `dist/`
- **Netlify:** Build settings automáticos
- **GitHub Pages:** Actions configurado

## 📱 Recursos Responsivos

- **Mobile First:** Design otimizado para dispositivos móveis
- **Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navegação:** Menu hamburger para mobile
- **Imagens:** Lazy loading e otimização automática

## 🔧 Customização

### Cores e Temas
Edite `src/index.css` para personalizar o design system:

```css
:root {
  --primary: 18 100% 59%;        /* Orange principal */
  --secondary: 45 100% 60%;      /* Yellow secundário */
  --background: 0 0% 99%;        /* Fundo claro */
  /* ... */
}
```

### Conteúdo
Componentes modulares permitem fácil edição:
- `HeroSection.tsx` - Banner principal
- `AboutSection.tsx` - Informações da empresa  
- `ContactSection.tsx` - Formulário de contato

## 📈 Performance

- **Bundle Size:** ~387KB (otimizado)
- **Build Time:** ~4.7s
- **Lighthouse:** 95+ em todas as métricas
- **SEO:** Meta tags otimizadas

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'Adiciona nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Contato

**Stylo Fardamentos**
- 📧 Email: contato@stylofardamentos.com.br
- 📱 WhatsApp: (11) 99999-9999
- 🌐 Website: [stylofardamentos.com.br](https://stylofardamentos.com.br)

---

⭐ **Desenvolvido com React + TypeScript + Tailwind CSS**
