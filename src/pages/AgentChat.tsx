import React from 'react';
import { useParams } from 'react-router-dom';
import { Bot, Smartphone, Database, PenTool, Scale, Users, Target } from 'lucide-react';
import { Agent } from '@/types/agent';

// Sample agents data (in a real app, you'd fetch this from an API)
const agents: Agent[] = [
  {
    id: '1',
    name: 'Assistente Personale',
    description: 'Il tuo assistente personale per organizzare appuntamenti e gestire la tua agenda.',
    icon: Smartphone,
    tags: ['Organizzazione', 'Agenda', 'Produttività'],
    category: 'Assistenti',
    embedUrl: 'https://agencii.ai/custom-gpt/pQ4Z0FeyJY5dGdzrGWwf'
  },
  {
    id: '2',
    name: 'Analista Dati',
    description: 'Analizza i tuoi dati e genera report dettagliati per le tue decisioni aziendali.',
    icon: Database,
    tags: ['Analisi', 'Reporting', 'Business Intelligence'],
    category: 'Business',
    embedUrl: 'https://agencii.ai/custom-gpt/pQ4Z0FeyJY5dGdzrGWwf'
  },
  {
    id: '3',
    name: 'Copywriter AI',
    description: 'Crea contenuti persuasivi per il tuo sito web, blog o social media.',
    icon: PenTool,
    tags: ['Copywriting', 'Marketing', 'Contenuti'],
    category: 'Creatività',
    embedUrl: 'https://agencii.ai/custom-gpt/pQ4Z0FeyJY5dGdzrGWwf'
  },
  {
    id: '4',
    name: 'Consulente Legale',
    description: 'Risposte rapide alle tue domande legali e assistenza con documenti base.',
    icon: Scale,
    tags: ['Legale', 'Documenti', 'Consulenza'],
    category: 'Professionale',
    embedUrl: 'https://agencii.ai/custom-gpt/pQ4Z0FeyJY5dGdzrGWwf'
  },
  {
    id: '5',
    name: 'Assistente HR',
    description: 'Aiuto con processi HR, screening CV e pianificazione colloqui.',
    icon: Users,
    tags: ['HR', 'Recruiting', 'Risorse Umane'],
    category: 'Business',
    embedUrl: 'https://agencii.ai/custom-gpt/pQ4Z0FeyJY5dGdzrGWwf'
  },
  {
    id: '6',
    name: 'Consulente Marketing',
    description: 'Strategie di marketing personalizzate e consigli per la tua azienda.',
    icon: Target,
    tags: ['Marketing', 'Strategie', 'Crescita'],
    category: 'Business',
    embedUrl: 'https://agencii.ai/custom-gpt/pQ4Z0FeyJY5dGdzrGWwf'
  }
];

const AgentChat = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const agent = agents.find(a => a.id === agentId);
  
  if (!agent) {
    return <div className="flex items-center justify-center min-h-screen">Agente non trovato</div>;
  }
  
  return (
    <div className="w-full h-screen">
      <iframe 
        src={agent.embedUrl}
        className="w-full h-full border-0"
        allow="clipboard-read; clipboard-write; microphone *"
      />
    </div>
  );
};

export default AgentChat;
