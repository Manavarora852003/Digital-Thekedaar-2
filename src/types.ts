export type Role = 'hirer' | 'worker';
export type UserRole = 'hirer' | 'worker' | 'admin';
export type Language = 'en' | 'hi';

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  trade?: TradeCategory;
  city?: string;
  avatar?: string;
  isVerified?: boolean;
  createdAt: string;
  organizationPin?: string;
}

export type TradeCategory = 
  | 'Rajmistri / Mason'
  | 'Electrician'
  | 'Plumber'
  | 'Carpenter / Badhai'
  | 'Painter & Polish'
  | 'Tile & Marble Specialist'
  | 'Fabricator & Welder'
  | 'General Thekedaar'
  | 'POP & False Ceiling'
  | 'Labor / Helper Supplier';

export interface Review {
  id: string;
  workerId: string;
  hirerName: string;
  hirerAvatar?: string;
  rating: number; // 1 to 5
  title?: string;
  comment: string;
  createdAt: string;
  projectTitle: string;
  qualityRating: number;
  punctualityRating: number;
  behaviorRating: number;
  verifiedHirer: boolean;
}

export type SortOption = 
  | 'rating_desc' 
  | 'experience_desc' 
  | 'wage_asc' 
  | 'wage_desc' 
  | 'completed_desc' 
  | 'reviews_desc';

export interface WorkerProfile {
  id: string;
  name: string;
  nameHindi: string;
  trade: TradeCategory;
  avatar: string;
  city: string;
  area: string;
  phone: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  dailyWage: number;
  unitRate: string;
  isAadhaarVerified: boolean;
  isPoliceVerified: boolean;
  isSkillCertified: boolean;
  verificationScore: number;
  completedProjects: number;
  teamSize: number;
  bio: string;
  bioHindi: string;
  skills: string[];
  availability: 'immediate' | 'this_week' | 'next_15_days';
  toolsEquipment: string[];
  photos: string[];
  badges: string[];
  availableNow: boolean;
  distanceKm: number;
  reviews: Review[];
}

export interface JobPost {
  id: string;
  title: string;
  titleHindi: string;
  trade: TradeCategory;
  hirerName: string;
  hirerPhone: string;
  city: string;
  area: string;
  budget: number;
  budgetType: 'fixed' | 'per_day' | 'per_sqft';
  durationDays: number;
  description: string;
  status: 'open' | 'assigned' | 'completed';
  applicantsCount: number;
  postedAt: string;
  urgent: boolean;
  escrowFunded: boolean;
  siteVisitRequired: boolean;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: Role;
  text: string;
  timestamp: string;
  type?: 'text' | 'quote' | 'escrow_request' | 'site_visit' | 'agreement';
  meta?: {
    amount?: number;
    milestonesCount?: number;
    visitDate?: string;
    visitTime?: string;
    status?: string;
  };
}

export interface Conversation {
  id: string;
  workerId: string;
  hirerId: string;
  workerName: string;
  workerAvatar: string;
  workerTrade: TradeCategory;
  hirerName: string;
  hirerAvatar: string;
  jobTitle: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  status: 'inquiry' | 'quote_sent' | 'escrow_locked' | 'work_in_progress' | 'completed';
}

export interface Milestone {
  id: string;
  title: string;
  percentage: number;
  amount: number;
  status: 'locked' | 'in_progress' | 'released' | 'disputed';
  description: string;
  dueDate: string;
  approvedAt?: string;
}

export interface EscrowProject {
  id: string;
  jobTitle: string;
  workerName: string;
  workerTrade: TradeCategory;
  workerAvatar: string;
  hirerName: string;
  totalAmount: number;
  fundedAmount: number;
  releasedAmount: number;
  status: 'funded' | 'in_progress' | 'completed' | 'disputed';
  createdAt: string;
  transactionRef: string;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking';
  milestones: Milestone[];
}

export interface SupportInquiry {
  id: string;
  senderName: string;
  email: string;
  phone?: string;
  category: 'Escrow & Payments' | 'Worker KYC & Verification' | 'Dispute & Resolution' | 'General Query' | 'Hiring Assistance';
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
}

export interface FAQItem {
  id: string;
  category: 'general' | 'hiring' | 'escrow' | 'workers' | 'safety';
  questionEn: string;
  questionHi: string;
  answerEn: string;
  answerHi: string;
}

