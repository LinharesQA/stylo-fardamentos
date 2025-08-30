import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";

export const DiferenciaisSection = () => {
  const sectionRef = useScrollReveal();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const diferenciais = [
    {
      title: "Velocidade na Entrega",
      description: "Rapidez na entrega é uma de nossas maiores prioridades. Sabemos que o tempo é essencial para o funcionamento da sua empresa.",
      color: "bg-primary text-primary-foreground"
    },
    {
      title: "Personalização Exclusiva", 
      description: "Estudamos e desenvolvemos projetos de acordo com a necessidade de cada cliente que vão desde a elaboração à repaginação dos uniformes já utilizados pela empresa.",
      color: "bg-foreground text-background"
    },
    {
      title: "Consultoria na Escolha",
      description: "Nossos consultores são especializados em apresentar uma ampla variedade de modelos, tecidos e cores, garantindo a escolha perfeita que melhor se alinha à identidade visual da sua empresa.",
      color: "bg-foreground text-background"
    },
    {
      title: "Bordados Personalizados",
      description: "Além das impressões em silk, oferecemos o serviço de bordado do seu logo utilizando máquinas computadorizadas de alta precisão, garantindo o formato e as especificações exatas que você deseja para cada peça.",
      color: "bg-primary text-primary-foreground"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Nossos Diferenciais
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {diferenciais.map((diferencial, index) => (
            <div 
              key={index}
              className={`p-8 rounded-lg ${diferencial.color} card-float`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <h3 className="text-2xl font-bold mb-4">{diferencial.title}</h3>
              <p className="leading-relaxed">{diferencial.description}</p>
            </div>
          ))}
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