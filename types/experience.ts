export interface Experience {
  id?: string;

  category: string;
  position: string;

  company: string;
  organization?: string;

  startDate: string;
  endDate: string;

  description: string;

  tags: string[];

  logoUrl: string;

  order: number;

  createdAt?: string;
  updatedAt?: string;
}