// This file defines TypeScript types and interfaces used throughout the application, ensuring type safety.

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  perks: string[];
  remaining: number;
}

export interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  ticketTier: string;
}

export interface RSVPFormData {
  name: string;
  email: string;
  guests: number;
}

export interface InventoryResponse {
  ticketTiers: TicketTier[];
}

export interface CheckoutResponse {
  success: boolean;
  message: string;
  ticketId?: string;
}

export interface RSVPResponse {
  success: boolean;
  message: string;
}