import React, { useEffect, useState } from 'react';
import ButtonGlow from './ButtonGlow';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Set visibility after component mounts with slight delay for animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  return <section id="home" className="min-h-screen pt-24 grid-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-24">
        {/* Badge centrale */}
        <div className="flex justify-center mb-8">
          <div className={`inline-flex items-center px-4 py-2 rounded-full bg-opacity-10 bg-ai-purple border border-ai-purple transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <Sparkles className="w-4 h-4 text-ai-purple mr-2" />
            <span className="text-sm text-ai-white">il Primo Marketplace di Agenti AI in Italia</span>
          </div>
        </div>

        {/* Hero title */}
        <h1 className={`text-center max-w-5xl mx-auto mb-6 transform transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <span className="block text-5xl md:text-6xl font-bold text-ai-white mb-2">
            Le Tue Passioni, <span className="text-ai-blue">Senza Limiti.</span>
          </span>
        </h1>

        {/* Hero subtitle */}
        <p className={`text-center text-lg md:text-xl text-ai-gray max-w-2xl mx-auto mb-10 transform transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>Automatizza La Crescita Della Tua Azienda Grazie Agli Agenti AI.</p>

        {/* CTA Button */}
        <div className={`flex justify-center mb-16 transform transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <Link to="/login">
            <ButtonGlow className="px-8 py-6 text-lg">
              Assumi un Agente AI
            </ButtonGlow>
          </Link>
        </div>
      </div>

      {/* Demo cards */}
      <div className={`max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Feature Card 1 */}
        <div className="glass rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-ai-purple/20">
          <h3 className="text-xl font-bold mb-4">Contenuti On-Brand</h3>
          <p className="text-ai-gray mb-4">
            Gli agenti AI utilizzano i tuoi dettagli di brand per generare contenuti che rispettano la tua identità aziendale.
          </p>
        </div>

        {/* Feature Card 2 */}
        <div className="glass rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-ai-purple/20">
          <h3 className="text-xl font-bold mb-4">Consegna in Tempo Reale</h3>
          <p className="text-ai-gray mb-4">
            Sperimenta contenuti di qualità eccellente e risultati immediati grazie agli agenti AI al tuo servizio.
          </p>
        </div>

        {/* Feature Card 3 */}
        <div className="glass rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-ai-purple/20">
          <h3 className="text-xl font-bold mb-4">Risorse Illimitate</h3>
          <p className="text-ai-gray mb-4">
            Crea senza limiti ogni risorsa necessaria per la tua azienda, in modo semplice e totalmente libero.
          </p>
        </div>
      </div>
    </section>;
};

export default Hero;