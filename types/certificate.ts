export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  skills: string[];
  imageUrl?: string;
  certificateUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}