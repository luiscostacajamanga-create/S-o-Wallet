
import { DiamondBundle, ServiceItem, WalletTransaction, RaffleInfo } from './types';

export const FF_BUNDLES: DiamondBundle[] = [
  { id: 'ff1', amount: 110, bonus: 11, price: 25, image: '💎', isPromo: true }, // Preço reduzido de 35 para 25
  { id: 'ff2', amount: 341, bonus: 34, price: 85, image: '💠' },  // Reduzido de 110 para 85
  { id: 'ff3', amount: 572, bonus: 57, price: 145, image: '✨' }, // Reduzido de 180 para 145
  { id: 'ff4', amount: 1100, bonus: 110, price: 290, image: '👑' }, // Reduzido de 350 para 290
  { id: 'ff5', amount: 2310, bonus: 231, price: 580, image: '📦' }, // Reduzido de 700 para 580
  { id: 'ff6', amount: 5720, bonus: 572, price: 1350, image: '💰' } // Reduzido de 1650 para 1350
];

export const CURRENT_RAFFLE: RaffleInfo = {
  id: 'r1',
  prizeName: 'MEGA GEMADA GARENA (Skins + Passes)',
  entryPrice: 10,
  endDate: '2024-05-30',
  participants: 124
};

export const SERVICES: ServiceItem[] = [
  { id: 's1', name: 'Free Fire', icon: '🔥', category: 'Gaming' },
  { id: 's2', name: 'Recarga Unitel', icon: '📱', category: 'Telefonia' },
  { id: 's3', name: 'Recarga CST', icon: '📞', category: 'Telefonia' },
  { id: 's4', name: 'Google Play', icon: '🎮', category: 'Gaming' }
];

export const MOCK_HISTORY: WalletTransaction[] = [
  { id: 'tx1', type: 'Recarga', description: 'Depósito via DBS', amount: 500, date: '2024-05-12', status: 'Concluído' },
  { id: 'tx2', type: 'Sorteio', description: 'Entrada Sorteio Gemada', amount: -10, date: '2024-05-12', status: 'Concluído' },
  { id: 'tx3', type: 'Pagamento', description: 'Diamantes FF (110)', amount: -25, date: '2024-05-11', status: 'Concluído' }
];
