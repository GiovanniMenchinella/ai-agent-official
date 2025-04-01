import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SplashCursor } from '@/components/ui/splash-cursor';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Contatti = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Messaggio inviato",
      description: "Grazie per averci contattato. Ti risponderemo al più presto.",
    });
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <SplashCursor 
        COLOR_UPDATE_SPEED={5}
        SPLAT_RADIUS={0.3}
        SPLAT_FORCE={6000}
        SHADING={true}
        BACK_COLOR={{ r: 0.15, g: 0.1, b: 0.3 }}
        CURL={20}
      />
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Contattaci</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact form */}
            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6 text-[#9b87f5]">Scrivici un messaggio</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-ai-gray">Nome</label>
                  <Input id="name" placeholder="Il tuo nome" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-ai-gray">Email</label>
                  <Input id="email" type="email" placeholder="La tua email" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-ai-gray">Oggetto</label>
                  <Input id="subject" placeholder="Oggetto del messaggio" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-ai-gray">Messaggio</label>
                  <Textarea id="message" placeholder="Il tuo messaggio" rows={5} required />
                </div>
                
                <Button type="submit" className="w-full bg-[#818fff] hover:bg-ai-blue">
                  Invia Messaggio
                </Button>
              </form>
            </div>
            
            {/* Contact information */}
            <div className="space-y-8">
              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-6 text-[#9b87f5]">Informazioni di contatto</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-[#9b87f5] mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium text-white">Email</h3>
                      <a href="mailto:info@potrai.com" className="text-ai-gray hover:text-white transition-colors">
                        info@potrai.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-[#9b87f5] mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium text-white">Telefono</h3>
                      <a href="tel:+393313444693" className="text-ai-gray hover:text-white transition-colors">
                        +39 331 344 4693
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-[#9b87f5] mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium text-white">Sede</h3>
                      <p className="text-ai-gray">
                        Foligno, Italia
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Linkedin className="w-6 h-6 text-[#9b87f5] mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium text-white">LinkedIn</h3>
                      <a 
                        href="https://www.linkedin.com/in/giovanni-menchinella-6b2b7aa3/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-ai-gray hover:text-white transition-colors"
                      >
                        Giovanni Menchinella
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-6 text-[#9b87f5]">Orari di supporto</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-ai-gray">Lunedì - Venerdì:</span>
                    <span className="text-white">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ai-gray">Sabato:</span>
                    <span className="text-white">10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ai-gray">Domenica:</span>
                    <span className="text-white">Chiuso</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contatti;
