import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ChiSiamo = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      <div className="container mx-auto px-4 py-16 mt-20">
        <h1 className="text-4xl font-bold text-center mb-8">Chi Siamo</h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-6">
            Siamo un team di esperti nel campo dell'intelligenza artificiale dedicati a rivoluzionare il modo in cui le aziende interagiscono con i loro clienti. La nostra missione è rendere l'AI accessibile e pratica per ogni business.
          </p>
          <p className="text-lg mb-6">
            Con anni di esperienza nel settore tecnologico e una profonda comprensione delle esigenze aziendali, abbiamo sviluppato una piattaforma che permette alle aziende di creare agenti AI personalizzati in modo semplice ed efficace.
          </p>
          <p className="text-lg mb-6">
            Il nostro obiettivo è aiutare le aziende a:
          </p>
          <ul className="list-disc list-inside text-lg mb-6 space-y-2">
            <li>Migliorare l'efficienza operativa</li>
            <li>Aumentare la soddisfazione dei clienti</li>
            <li>Ridurre i costi del servizio clienti</li>
            <li>Mantenere una presenza online 24/7</li>
            <li>Scalare le operazioni in modo sostenibile</li>
          </ul>
          <p className="text-lg">
            Crediamo che l'intelligenza artificiale sia il futuro dell'interazione tra aziende e clienti, e siamo qui per guidare questa trasformazione.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChiSiamo;
