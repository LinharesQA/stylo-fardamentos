import { MessageCircle } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

export const WhatsAppButton = () => {
  const { trackWhatsAppClick } = useAnalytics();

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('floating_button');
    // Replace with your actual WhatsApp number
    const whatsappNumber = "5511999999999";
    const message = encodeURIComponent("Olá! Gostaria de solicitar um orçamento para fardamentos.");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse"
      aria-label="Entrar em contato via WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
};