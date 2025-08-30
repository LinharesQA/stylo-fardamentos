import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ReactNode } from "react";

interface AnimatedCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedCard = ({ title, description, icon, className, delay = 0 }: AnimatedCardProps) => {
  const cardRef = useScrollReveal();

  return (
    <div 
      ref={cardRef}
      className={cn(
        "animate-reveal card-float",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <Card className="h-full bg-card hover:bg-card-hover transition-all duration-300 border-0 shadow-md hover:shadow-xl">
        <CardHeader className="text-center pb-4">
          {icon && (
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-2xl">
              {icon}
            </div>
          )}
          <CardTitle className="text-xl font-bold text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-muted-foreground text-center leading-relaxed">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};