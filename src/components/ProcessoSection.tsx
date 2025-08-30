import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, CheckCircle } from "lucide-react";

export const ProcessoSection = () => {
  const sectionRef = useScrollReveal();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const empresas = [
    "Vale Mais",
    "Top Service", 
    "Vigas",
    "Pillar Engenharia",
    "Mearim Motos"
  ];

  const processos = [
    {
      numero: "1.",
      titulo: "Solicite seu orçamento",
      descricao: "Entre em contato através do nosso telefone WhatsApp ou através do formulário.",
      cor: "bg-muted"
    },
    {
      numero: "2.", 
      titulo: "Consultoria na Escolha",
      descricao: "Um time de consultores entrará em contato para melhor orientar.",
      cor: "bg-muted"
    },
    {
      numero: "3.",
      titulo: "Aprovação do Layout",
      descricao: "Após definir os detalhes, você receberá o layout do fardamento para aprovação.",
      cor: "bg-primary/10"
    },
    {
      numero: "4.",
      titulo: "Produção e Entrega",
      descricao: "Com o layout aprovado, iniciamos a produção. Em poucos dias, seus fardamentos estarão prontos e entregues no endereço combinado.",
      cor: "bg-primary"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Empresas que confiam */}
        <div ref={sectionRef} className="text-center mb-20 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 gradient-text">
            Empresas que confiam na Stylo
          </h2>
          
          <div className="flex flex-wrap justify-center items-center gap-8 mb-16">
            {empresas.map((empresa, index) => (
              <div 
                key={index}
                className="bg-card rounded-lg px-6 py-4 shadow-md hover:shadow-lg transition-all duration-300 min-w-[120px]"
              >
                <div className="text-sm font-semibold text-muted-foreground">{empresa}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Processo de trabalho */}
        <div className="grid lg:grid-cols-4 gap-6">
          {processos.map((processo, index) => (
            <div 
              key={index}
              className={`rounded-xl p-6 text-center relative ${
                processo.cor === 'bg-primary' 
                  ? 'bg-primary text-primary-foreground' 
                  : processo.cor === 'bg-primary/10'
                    ? 'bg-primary/10 text-foreground'
                    : 'bg-muted text-foreground'
              } card-float`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold">{processo.numero}</span>
                {index === 3 ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <ArrowRight className="w-6 h-6" />
                )}
              </div>
              
              <h3 className="text-lg font-bold mb-3">{processo.titulo}</h3>
              <p className="text-sm leading-relaxed">{processo.descricao}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
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