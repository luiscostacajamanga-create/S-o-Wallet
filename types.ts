
export interface WalletTransaction {
  id: string;
  type: 'Recarga' | 'Pagamento' | 'Transferência' | 'Sorteio';
  description: string;
  amount: number;
  date: string;
  status: 'Concluído' | 'Pendente' | 'Falhou';
}

export interface ServiceItem {
  id: string;
  name: string;
  icon: string;
  category: 'Gaming' | 'Telefonia' | 'Utilidades';
}

export interface DiamondBundle {
  id: string;
  amount: number;
  bonus: number;
  price: number;
  image: string;
  isPromo?: boolean;
}

export interface RaffleInfo {
  id: string;
  prizeName: string;
  entryPrice: number;
  endDate: string;
  participants: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export enum AppRoute {
  DASHBOARD = 'dashboard',
  SERVICES = 'services',
  HISTORY = 'history',
  ACCOUNT = 'account',
  RAFFLE = 'raffle',
  DOWNLOAD = 'download'
}

export interface Project {
  id: string;
  name: string;
  description: string;
  language: string;
  status: string;
  tags: string[];
  lastModified: string | Date;
  files: any[];
}
