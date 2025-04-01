import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SplashCursor } from '@/components/ui/splash-cursor';

const ChiSiamo = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      <SplashCursor 
        COLOR_UPDATE_SPEED={0}
        SPLAT_RADIUS={0.1}
        SPLAT_FORCE={2000}
        SHADING={false}
        BACK_COLOR={{ r: 0.15, g: 0.1, b: 0.3 }}
        CURL={0}
        DENSITY_DISSIPATION={4.5}
        VELOCITY_DISSIPATION={2.5}
      />
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto glass rounded-2xl p-8 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Chi Siamo</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#9b87f5]">La Nostra Visione</h2>
              <p className="text-ai-gray mb-4">
                Aigentic è nata con una missione chiara: democratizzare l'accesso all'intelligenza artificiale per le piccole e medie imprese italiane. Crediamo che la tecnologia AI non debba essere appannaggio esclusivo delle grandi aziende con budget illimitati, ma uno strumento accessibile a tutti per innovare e crescere.
              </p>
              <p className="text-ai-gray">
                Il nostro marketplace di agenti AI rappresenta un ponte tra la complessità della tecnologia avanzata e le esigenze quotidiane delle aziende, offrendo soluzioni pratiche, immediate e dal valore concreto.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#9b87f5]">Il Team</h2>
              <p className="text-ai-gray mb-4">
                Dietro Aigentic c'è un team di professionisti con esperienza nel settore tecnologico, dell'intelligenza artificiale e dello sviluppo business. La nostra forza risiede nella combinazione di competenze tecniche avanzate e una profonda comprensione delle sfide reali che le PMI affrontano ogni giorno.
              </p>
              <p className="text-ai-gray">
                Ogni membro del nostro team contribuisce con la propria specializzazione per creare un ecosistema di soluzioni AI che siano non solo tecnicamente eccellenti, ma anche intuitive, utili e immediatamente applicabili nei contesti aziendali.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#9b87f5]">I Nostri Valori</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-ai-darkblue/30">
                  <h3 className="text-xl font-medium mb-2 text-white">Accessibilità</h3>
                  <p className="text-ai-gray">Rendiamo l'AI accessibile a tutte le aziende,indipendentemente dalle loro dimensioni o budget.</p>
                </div>
                <div className="p-6 rounded-xl bg-ai-darkblue/30">
                  <h3 className="text-xl font-medium mb-2 text-white">Qualità</h3>
                  <p className="text-ai-gray">Ogni agente AI nel nostro marketplace è sottoposto a rigorosi controlli di qualità e performance.</p>
                </div>
                <div className="p-6 rounded-xl bg-ai-darkblue/30">
                  <h3 className="text-xl font-medium mb-2 text-white">Innovazione</h3>
                  <p className="text-ai-gray">Manteniamo un impegno costante verso l'innovazione, aggiornando e migliorando continuamente i nostri servizi.</p>
                </div>
                <div className="p-6 rounded-xl bg-ai-darkblue/30">
                  <h3 className="text-xl font-medium mb-2 text-white">Praticità</h3>
                  <p className="text-ai-gray">Sviluppiamo soluzioni concrete che rispondono a esigenze reali, non tecnologie fine a se stesse.</p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#9b87f5]">Il Nostro Impegno</h2>
              <p className="text-ai-gray">
                Ci impegniamo a essere partner tecnologici delle PMI italiane, offrendo non solo strumenti, ma anche supporto, formazione e consulenza per trarre il massimo vantaggio dalle potenzialità dell'intelligenza artificiale. Il nostro successo si misura attraverso i risultati che i nostri clienti ottengono utilizzando Aigentic.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChiSiamo;
