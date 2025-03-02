/**
 * Help type definitions for the Help page
 */

export type HelpCategory = 'faq' | 'glossary' | 'tutorials' | 'contact' | 'all';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

export interface GlossaryItem {
  id: string;
  term: string;
  definition: string;
  relatedTerms?: string[];
  category: string;
}

export interface TutorialItem {
  id: string;
  title: string;
  description: string;
  steps: TutorialStep[];
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string; // e.g., "5 min"
  tags: string[];
  videoUrl?: string;
}

export interface TutorialStep {
  stepNumber: number;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface SupportTicket {
  name: string;
  email: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
} 