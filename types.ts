
export type AppView = 'welcome' | 'dashboard' | 'tutor' | 'explorer';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  attachments?: string[];
  groundingSources?: Array<{
    title: string;
    uri: string;
  }>;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export enum SubjectType {
  MATH = 'math',
  SCIENCE = 'science',
  HISTORY = 'history',
  LANGUAGE = 'language',
  ART = 'art',
  FRENCH = 'french',
  VOCATIONAL = 'vocational',
  RME = 'rme',
  TWI = 'twi'
}
