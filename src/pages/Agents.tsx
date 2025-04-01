import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Bot, MessageCircle, Search, Smartphone, Database, PenTool, Scale, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Agent } from '@/types/agent';
import { GlareCard } from '@/components/ui/glare-card';
import { Input } from '@/components/ui/input';

// Sample agents data
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

const AgentCard: React.FC<{ agent: Agent }> = ({ agent }) => {
  const navigate = useNavigate();
  const Icon = agent.icon || Bot;
  
  const handleCardClick = () => {
    navigate(`/chat/${agent.id}`);
  };
  
  return (
    <div className="flex flex-col relative cursor-pointer h-full" onClick={handleCardClick}>
      <GlareCard className="flex flex-col h-full">
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-ai-purple/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-ai-purple" />
            </div>
            <div className="ml-4">
              <h3 className="font-bold text-lg text-ai-white">{agent.name}</h3>
            </div>
          </div>
          
          <div className="mb-4 flex-grow">
            <p className="text-ai-gray line-clamp-3">{agent.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {agent.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-ai-blue/10 text-ai-lightpurple border-transparent">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-800 p-4">
          <Button 
            className="w-full bg-ai-purple hover:bg-ai-blue text-white flex items-center justify-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/chat/${agent.id}`);
            }}
          >
            <MessageCircle className="w-5 h-5" />
            Inizia la chat
          </Button>
        </div>
      </GlareCard>
    </div>
  );
};

const Agents = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgents = agents.filter(agent => {
    if (!searchQuery) return true;
    
    // Search in tags
    return agent.tags.some(tag => 
      tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4">
                I Nostri <span className="text-[#818fff]">Agenti AI</span>
              </h1>
              <p className="text-ai-gray text-lg max-w-2xl mx-auto">
                Scegli tra i nostri agenti specializzati e inizia subito a collaborare. Ogni agente è progettato per eccellere in aree specifiche.
              </p>
            </div>
            
            {/* Search bar */}
            <div className="mb-8 max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ai-gray w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Cerca agenti per tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-ai-darkblue/40 border-ai-darkblue text-ai-white placeholder:text-ai-gray/70 w-full"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
            
            {filteredAgents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-ai-gray text-lg">Nessun agente trovato con i tag specificati.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Agents;
