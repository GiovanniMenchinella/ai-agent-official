
import React from 'react'
import FeatureCard from './FeatureCard'
import ButtonGlow from './ButtonGlow'
import { Zap, Infinity, Bot, Phone, Mail } from 'lucide-react'

const Features = () => {
  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-ai-purple/10 blur-[120px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-5xl font-bold mb-6">
            I tuoi dipendenti, <span className="text-ai-purple">potenziati dall'AI.</span>
          </h2>
          <p className="text-ai-gray text-lg">
            Le decisioni digitali non devono essere complicate o stressanti. Qui, crediamo nell'utilizzo di agenti intelligenti per semplificare ogni attività.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <FeatureCard
            title="Accelerazione Produttività"
            description="Automatizza flussi di lavoro e attività ripetitive con i nostri agenti AI intelligenti."
            icon={Zap}
            tags={["Risparmio Tempo", "Automazione"]}
          />
          
          <FeatureCard
            title="Accesso Illimitato"
            description="Accesso senza limiti a tutti i nostri agenti AI e funzionalità avanzate, senza costi aggiuntivi."
            icon={Infinity}
            tags={["Nessun Limite", "Utilizzo Completo"]}
          />
          
          <FeatureCard
            title="Assistente Personale"
            description="Sperimenta contenuti di qualità eccellente e risultati immediati grazie agli agenti AI al tuo servizio."
            icon={Bot}
            tags={["Chat Assistita", "Consegna in tempo reale"]}
          />
          
          <FeatureCard
            title="Risorse Illimitate"
            description="Crea senza limiti ogni risorsa necessaria per la tua azienda, in modo semplice e totalmente libero."
            icon={Phone}
            tags={["iOS & Android", "Asset illimitati"]}
          />
        </div>

        {/* Call-to-action section */}
        <div className="flex flex-col md:flex-row bg-gradient-blue rounded-3xl overflow-hidden">
          <div className="p-8 md:p-12 md:w-2/3">
            <h2 className="text-3xl font-bold mb-4">
              Richiedi Il Tuo Agente Personalizzato
            </h2>
            <p className="text-ai-white/80 mb-6">
              Progettato su misura per le esigenze specifiche della tua azienda, con competenze e conoscenze settoriali rilevanti.
            </p>
            <div className="flex justify-center md:justify-start">
              <a href="mailto:info@potrai.com">
                <ButtonGlow className="bg-ai-white text-ai-purple hover:bg-ai-lightgray hover:text-ai-blue">
                  <Mail className="mr-2 w-5 h-5" />
                  Contattaci ora
                </ButtonGlow>
              </a>
            </div>
          </div>
          
          <div className="md:w-1/3 bg-[url('/lovable-uploads/882b6dca-4ae4-4e61-be3d-9fe5c55a23a8.png')] bg-cover bg-center">
            {/* Image via CSS background for better control */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
