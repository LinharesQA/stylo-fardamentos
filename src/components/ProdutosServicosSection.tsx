import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle, ArrowRight } from "lucide-react";
import fardamentosImg from "@/assets/fardamentos-polo.jpg";
import epiImg from "@/assets/epi-uniforme.jpg";

export const ProdutosServicosSection = () => {
  const sectionRef = useScrollReveal();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="produtos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Produtos e Serviços
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Fardamentos */}
          <Card className="bg-card hover:bg-card-hover transition-all duration-300 border-0 shadow-md hover:shadow-xl card-float overflow-hidden">
            <CardHeader className="text-center pb-6 relative">
              <div className="w-full h-64 mb-6 overflow-hidden rounded-lg">
                <img 
                  src={fardamentosImg} 
                  alt="Fardamentos corporativos personalizados" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <CheckCircle className="w-8 h-8 text-primary-foreground" />
              </div>
            </CardHeader>
            <CardContent className="pt-8 space-y-4">
              <h3 className="text-2xl font-bold text-foreground text-center mb-6">Fardamentos</h3>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  Fardas de diversos tecidos (algodão, malhas, piquet, tricoline, etc.).
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  Personalização de uniformes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* EPIs */}
          <Card className="bg-card hover:bg-card-hover transition-all duration-300 border-0 shadow-md hover:shadow-xl card-float overflow-hidden">
            <CardHeader className="text-center pb-6 relative">
              <div className="w-full h-64 mb-6 overflow-hidden rounded-lg">
                <img 
                  src={epiImg} 
                  alt="EPIs - Equipamentos de Proteção Individual" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <CheckCircle className="w-8 h-8 text-primary-foreground" />
              </div>
            </CardHeader>
            <CardContent className="pt-8 space-y-4">
              <h3 className="text-2xl font-bold text-foreground text-center mb-6">EPI's</h3>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  Conjuntos operacionais com ou sem proteção química.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  Equipamentos de proteção, como botas, luvas, óculos, retardantes de chamas.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-secondary hover:bg-secondary-dark text-secondary-foreground font-semibold px-8 py-6 text-lg"
            onClick={() => scrollToSection('contato')}
          >
            Peça Um Orçamento Agora!
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};