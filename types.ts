export interface Product {
  id: string;
  name: string;
  category: string;
  priceRef: number; // For internal ref only
  imageUrl: string;
  shortDescription: string;
  clinicalSummary: string;
  badges: string[];
  specs: { [key: string]: string };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  isProductSuggestion?: boolean;
  suggestedProducts?: Product[];
  timestamp: Date;
}

export interface ConsultationFormData {
  name: string;
  phone: string;
  province: string;
  mobilityLevel: string;
  condition: string;
  details: string;
  originProductId?: string;
}

export enum ConsultationStep {
  CONTACT = 0,
  CONDITION = 1,
  CONTEXT = 2,
  CONFIRM = 3
}