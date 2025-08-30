import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle, Target, Eye, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const AboutSection = () => {
  const sectionRef = useScrollReveal();
  const contentRef = useScrollReveal();

  return (
    <section id="sobre" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div ref={sectionRef} className="animate-slide-right">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Desde 2021: Transformando o Mercado
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Em outubro de 2021, a Stylo Express entrou no mercado de Fardamentos & EPI 
              com um diferencial claro: oferecer produtos a pronta entrega, personalizáveis 
              e com muito estilo.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Qualidade Garantida</h4>
                  <p className="text-muted-foreground">Tecidos premium e acabamento impecável em todas as peças.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Personalização Total</h4>
                  <p className="text-muted-foreground">Design exclusivo adaptado à identidade visual da sua empresa.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Entrega Rápida</h4>
                  <p className="text-muted-foreground">Produção ágil com prazos que atendem suas necessidades urgentes.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Values Cards */}
          <div ref={contentRef} className="animate-slide-left">
            <div className="grid gap-6">
              <Card className="card-float bg-gradient-primary">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary-foreground mb-2">Missão</h3>
                      <p className="text-primary-foreground/90 leading-relaxed">
                        Fornecer soluções de fardamento e EPI com qualidade, rapidez e personalização, 
                        garantindo a segurança e o conforto dos profissionais de nossos clientes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-float bg-secondary">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-secondary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Eye className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary-foreground mb-2">Visão</h3>
                      <p className="text-secondary-foreground/80 leading-relaxed">
                        Ser referência em inovação e atendimento no mercado de fardamentos e EPI, 
                        expandindo nossa marca nacionalmente.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-float bg-card border-2 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Valores</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Compromisso com a excelência, inovação constante, relacionamento próximo 
                        com clientes e responsabilidade social em todos os processos.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};