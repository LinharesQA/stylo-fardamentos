import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const FAQSection = () => {
  const sectionRef = useScrollReveal();

  const faqs = [
    {
      question: "Quais os prazos de entrega?",
      answer: "Nossos prazos variam de acordo com a quantidade e tipo de produto. Para pedidos padrão, o prazo é de 7 a 10 dias úteis. Para pedidos expressos, conseguimos entregar em até 24 horas."
    },
    {
      question: "É possível personalizar os uniformes?",
      answer: "Sim! Oferecemos personalização completa, incluindo bordados e layouts exclusivos."
    },
    {
      question: "Vocês atendem pedidos de pequenas quantidades?",
      answer: "Sim, atendemos pedidos a partir de 5 unidades. Temos soluções flexíveis para empresas de todos os tamanhos."
    },
    {
      question: "Oferecem amostras antes da compra?",
      answer: "Sim, disponibilizamos amostras de tecidos e modelos para que você possa avaliar a qualidade antes de fechar o pedido."
    },
    {
      question: "Vocês entregam em todo o Brasil?",
      answer: "Sim, atendemos todo o território nacional. Frete grátis para pedidos acima de R$ 500."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Dúvidas Frequentes (FAQ)
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-lg px-6 border-0 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-semibold py-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};