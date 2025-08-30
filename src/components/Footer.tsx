import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
              S
            </div>
            <span className="text-2xl font-bold">Stylo</span>
          </div>
          
          <p className="text-background/80 mb-6 max-w-2xl mx-auto">
            Transformando empresas através de fardamentos personalizados de qualidade. 
            Seu parceiro de confiança desde 2021.
          </p>

          <div className="border-t border-background/20 pt-6">
            <p className="text-background/60 text-sm flex items-center justify-center">
              Feito com 
              <Heart className="w-4 h-4 mx-1 text-primary fill-current" /> 
              pela Stylo Fardamentos © 2024
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};