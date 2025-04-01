import React, { useState } from 'react'
import { cn } from "@/lib/utils"
import { ChevronDown, Mail } from 'lucide-react'
import ButtonGlow from './ButtonGlow'

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  toggleOpen: () => void
}

const FAQItem = ({ question, answer, isOpen, toggleOpen }: FAQItemProps) => {
  return (
    <div className="border-b border-ai-darkblue/30 last:border-b-0">
      <button
        className="flex items-center justify-between w-full py-6 text-left focus:outline-none"
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-medium text-ai-white">{question}</h3>
        <ChevronDown 
          className={cn(
            "w-5 h-5 text-ai-gray transition-transform duration-200",
            isOpen ? "transform rotate-180" : ""
          )} 
        />
      </button>
      <div 
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
        )}
      >
        <p className="text-ai-gray">{answer}</p>
      </div>
    </div>
  )
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqItems = [
    {
      question: "Cos'è Aigentic?",
      answer: "Aigentic è un marketplace completo di agenti AI per il business, progettato per offrire migliaia di servizi automatizzati in tempo reale. Pensato appositamente per piccole e medie imprese (PMI), lavoratori autonomi e liberi professionisti, Aigentic ti aiuta a semplificare i processi aziendali e a scoprire nuove opportunità di crescita, tutto da un'unica piattaforma integrata."
    },
    {
      question: "Come posso iniziare?",
      answer: "Per iniziare ad utilizzare Aigentic, ti basta contattarci via email a info@potrai.com o telefonicamente al numero +39 331 344 4693. Il nostro team ti guiderà nel processo di attivazione e ti mostrerà tutte le potenzialità della piattaforma."
    },
    {
      question: "Quali tipi di servizi posso utilizzare?",
      answer: "Nel marketplace Aigentic trovi una vasta gamma di servizi potenziati dall'intelligenza artificiale: dall'analisi dei dati all'automazione del marketing, dal supporto clienti alla gestione dei flussi di lavoro. Ogni servizio è progettato da esperti per rispondere alle reali esigenze della tua attività."
    },
    {
      question: "Come viene garantita la qualità dei servizi?",
      answer: "Ogni agente AI presente su Aigentic è sviluppato da professionisti qualificati e sottoposto a un accurato processo di revisione prima della pubblicazione. Monitoriamo costantemente le performance e il feedback degli utenti per mantenere elevati standard di qualità e affidabilità."
    },
    {
      question: "Come posso integrare questi servizi nel mio business?",
      answer: "Una volta attivato il servizio, puoi esplorare il nostro marketplace e selezionare i servizi più adatti al tuo business. Le descrizioni dettagliate e interfacce intuitive rendono l'integrazione dei nostri strumenti AI semplice e immediata nei tuoi flussi di lavoro."
    },
    {
      question: "Che tipo di supporto è disponibile?",
      answer: "Aigentic offre supporto dedicato tramite email o contatto diretto con il founder (tramite il numero telefonico nella sezione \"contatti\"). Il nostro team è sempre a disposizione per aiutarti con qualsiasi dubbio o esigenza tecnica, così da garantirti la migliore esperienza d'uso possibile."
    },
    {
      question: "Con quale frequenza vengono aggiunti nuovi servizi?",
      answer: "Il nostro marketplace è in costante evoluzione. Aggiungiamo regolarmente nuovi agenti AI e servizi sviluppati da esperti del settore, per offrirti sempre le soluzioni più aggiornate e innovative nel panorama dell'intelligenza artificiale. Diamo la possibilità ai nostri utenti di chiedere di sviluppare agenti specifici cosi da soddisfare le loro esigenze."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Domande Frequenti sul Nostro Servizio
          </h2>
          <p className="text-ai-gray">
            Abbiamo raccolto le domande più frequenti per aiutarti a iniziare rapidamente.
          </p>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8">
          {faqItems.map((item, index) => (
            <FAQItem 
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFAQ(index)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-ai-gray mb-6">
            Hai altre domande? Contatta il nostro team di supporto
          </p>
          <div className="flex justify-center">
            <a href="mailto:info@potrai.com">
              <ButtonGlow>
                <Mail className="mr-2 w-5 h-5" />
                Contattaci
              </ButtonGlow>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
