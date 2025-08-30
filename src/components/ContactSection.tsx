import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useToast } from "@/hooks/use-toast";
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";

export const ContactSection = () => {
  const sectionRef = useScrollReveal();
  const formRef = useScrollReveal();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    produto: '',
    quantidade: '',
    detalhes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Orçamento Solicitado!",
      description: "Recebemos sua solicitação e entraremos em contato em breve.",
    });

    // Reset form
    setFormData({
      nome: '',
      telefone: '',
      email: '',
      produto: '',
      quantidade: '',
      detalhes: ''
    });
  };

  return (
    <section id="contato" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Solicite um Orçamento
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Preencha suas informações abaixo ou entre em contato pelo nosso WhatsApp. 
            Responderemos em até 2 horas durante horário comercial.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div ref={formRef} className="animate-slide-right">
            <div className="space-y-6">
              <Card className="card-float">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Telefone</h3>
                      <p className="text-muted-foreground">(11) 99999-9999</p>
                      <p className="text-sm text-muted-foreground">WhatsApp disponível 24h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-float">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">E-mail</h3>
                      <p className="text-muted-foreground">contato@stylo.com.br</p>
                      <p className="text-sm text-muted-foreground">Resposta em até 2h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-float">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Endereço</h3>
                      <p className="text-muted-foreground">São Paulo - SP</p>
                      <p className="text-sm text-muted-foreground">Atendimento nacional</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-float">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Horário</h3>
                      <p className="text-muted-foreground">Seg - Sex: 8h às 18h</p>
                      <p className="text-sm text-muted-foreground">Sáb: 8h às 12h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="card-float bg-primary shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary-foreground text-center">
                  Faça seu Orçamento Gratuito
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome" className="text-primary-foreground font-medium">
                        Nome Completo *
                      </Label>
                      <Input
                        id="nome"
                        value={formData.nome}
                        onChange={(e) => handleInputChange('nome', e.target.value)}
                        required
                        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone" className="text-primary-foreground font-medium">
                        Telefone *
                      </Label>
                      <Input
                        id="telefone"
                        value={formData.telefone}
                        onChange={(e) => handleInputChange('telefone', e.target.value)}
                        required
                        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                        placeholder="(XX) 99999-9999"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-primary-foreground font-medium">
                      E-mail *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-primary-foreground font-medium">
                        Tipo de Produto *
                      </Label>
                      <Select value={formData.produto} onValueChange={(value) => handleInputChange('produto', value)}>
                        <SelectTrigger className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fardamentos">Fardamentos</SelectItem>
                          <SelectItem value="epi">EPIs</SelectItem>
                          <SelectItem value="ambos">Fardamentos + EPIs</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-primary-foreground font-medium">
                        Quantidade *
                      </Label>
                      <Select value={formData.quantidade} onValueChange={(value) => handleInputChange('quantidade', value)}>
                        <SelectTrigger className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                          <SelectValue placeholder="Selecione a quantidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5-10">05 a 10 unidades</SelectItem>
                          <SelectItem value="15-20">15 a 20 unidades</SelectItem>
                          <SelectItem value="20-30">20 a 30 unidades</SelectItem>
                          <SelectItem value="50-70">50 a 70 unidades</SelectItem>
                          <SelectItem value="100+">Acima de 100 unidades</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="detalhes" className="text-primary-foreground font-medium">
                      Outros Detalhes
                    </Label>
                    <Textarea
                      id="detalhes"
                      value={formData.detalhes}
                      onChange={(e) => handleInputChange('detalhes', e.target.value)}
                      rows={4}
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                      placeholder="Descreva cores, tamanhos, logotipos ou qualquer detalhe específico..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-secondary hover:bg-secondary-dark text-secondary-foreground font-semibold text-lg py-6 btn-glow group"
                  >
                    Enviar Solicitação
                    <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>

                <div className="text-center pt-4 border-t border-primary-foreground/20">
                  <p className="text-primary-foreground/80 text-sm">
                    Ao enviar, você concorda em receber contato da nossa equipe comercial
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};