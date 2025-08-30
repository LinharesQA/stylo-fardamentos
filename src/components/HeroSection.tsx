import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useAnalytics } from "@/hooks/useAnalytics";
import heroImage from "@/assets/hero-bg.jpg";

export const HeroSection = () => {
  const heroRef = useScrollReveal();
  const { trackCTAClick } = useAnalytics();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Fardamentos Personalizados" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div ref={heroRef} className="text-center lg:text-left animate-slide-right">
            <div className="flex items-center justify-center lg:justify-start mb-6">
            <div className="flex items-center space-x-1 bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
              <Star className="w-4 h-4 text-secondary fill-current" />
              <Star className="w-4 h-4 text-secondary fill-current" />
              <Star className="w-4 h-4 text-secondary fill-current" />
              <Star className="w-4 h-4 text-secondary fill-current" />
              <Star className="w-4 h-4 text-secondary fill-current" />
              <span className="ml-2 text-sm font-semibold text-white">
                +500 Clientes Satisfeitos
              </span>
            </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Fardamentos
              <span className="block text-secondary">Personalizados,</span>
              <span className="text-3xl md:text-4xl lg:text-5xl block mt-2">
                feitos sob medida para sua Empresa
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Estilo, conforto e qualidade em cada peça, com entrega rápida.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:bg-primary-dark text-primary-foreground font-semibold px-8 py-6 text-lg btn-glow group"
                onClick={() => {
                  trackCTAClick('Peça um Orçamento Agora', 'hero_section');
                  scrollToSection('contato');
                }}
              >
                Peça um Orçamento Agora
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm px-8 py-6 text-lg"
                onClick={() => {
                  trackCTAClick('Ver Nossos Serviços', 'hero_section');
                  scrollToSection('servicos');
                }}
              >
                Ver Nossos Serviços
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-1">3+</div>
                <div className="text-sm text-white/80">Anos no Mercado</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-1">500+</div>
                <div className="text-sm text-white/80">Clientes Atendidos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-1">24h</div>
                <div className="text-sm text-white/80">Entrega Expressa</div>
              </div>
            </div>
          </div>

          {/* Right Content - Floating Elements */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-primary rounded-full opacity-20 animate-float"></div>
              <div className="absolute top-10 left-10 w-60 h-60 bg-secondary rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-20 left-20 w-40 h-40 bg-primary-foreground rounded-full opacity-40 animate-float" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};