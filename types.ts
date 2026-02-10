
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum PlanType {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PRO = 'PRO',
  ELITE = 'ELITE'
}

export enum AdStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  DISABLED = 'DISABLED'
}

export enum Category {
  GENERAL = 'Geral',
  ADULT = '🔞 +18'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  plan: PlanType;
  isAffiliate: boolean;
  affiliateBalance: number;
  referralCount: number;
  referralCode: string;
  createdAt: string;
}

export interface Ad {
  id: string;
  userId: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video' | 'gif';
  category: Category;
  status: AdStatus;
  buttons: Array<{ label: string; url: string }>;
  stats: {
    clicks: number;
    impressions: number;
    sources: Record<string, number>;
  };
  createdAt: string;
}

export interface TelegramBot {
  id: string;
  name: string;
  token: string;
  active: boolean;
  webhookEnabled: boolean;
  category: Category;
}

export interface TelegramGroup {
  id: string;
  name: string;
  inviteLink: string;
  groupId: string;
  botId: string;
  category: Category;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  status: 'PENDING' | 'VERIFIED' | 'PAID';
  createdAt: string;
}

export interface Announcement {
  id: string;
  targetUserId?: string; // If null, global
  title: string;
  message: string;
  createdAt: string;
}
