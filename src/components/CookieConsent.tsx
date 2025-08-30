import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Shield, Settings } from "lucide-react";
import { analytics } from "@/lib/analytics";

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = analytics.getConsent();
    if (consent === null) {
      // Show consent banner after a short delay
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    analytics.setConsent(true);
    setShowConsent(false);
  };

  const handleRejectAll = () => {
    analytics.setConsent(false);
    setShowConsent(false);
  };

  const handleAcceptNecessary = () => {
    analytics.setConsent(false);
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed bottom-0 left-0 right-0 p-4 md:bottom-6 md:left-6 md:right-auto md:max-w-md">
        <Card className="shadow-xl border-2 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">
                  Privacidade e Cookies
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowConsent(false)}
                className="h-auto p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {!showDetails ? (
              <>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Utilizamos cookies e tecnologias similares para melhorar sua experiência, 
                  personalizar conteúdo e analisar nosso tráfego. Seus dados são tratados 
                  conforme nossa Política de Privacidade e LGPD.
                </p>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={handleAcceptAll}
                    className="bg-primary hover:bg-primary-dark text-primary-foreground flex-1"
                  >
                    Aceitar Todos
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleAcceptNecessary}
                    className="flex-1"
                  >
                    Apenas Necessários
                  </Button>
                </div>

                <div className="flex justify-center mt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDetails(true)}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Settings className="w-3 h-3 mr-1" />
                    Personalizar
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4 mb-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Cookies Necessários</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Essenciais para o funcionamento básico do site. Sempre ativos.
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-4 bg-primary rounded-full relative">
                        <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </div>
                      <span className="text-xs text-muted-foreground">Sempre ativo</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Cookies Analíticos</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Nos ajudam a entender como você usa nosso site para melhorarmos a experiência.
                    </p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div>• Google Analytics (Anonimizado)</div>
                      <div>• Métricas de performance</div>
                      <div>• Análise de conversões</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={handleAcceptAll}
                    className="bg-primary hover:bg-primary-dark text-primary-foreground"
                  >
                    Aceitar Todos os Cookies
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRejectAll}
                  >
                    Rejeitar Cookies Analíticos
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDetails(false)}
                    className="text-xs"
                  >
                    Voltar
                  </Button>
                </div>
              </>
            )}

            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Para mais informações, consulte nossa{' '}
                <button className="underline hover:no-underline">
                  Política de Privacidade
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};