import { LucideIcon } from 'lucide-react';

export interface Agent {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  icon?: LucideIcon;
  tags: string[];
  category: string;
  embedUrl: string;
}
