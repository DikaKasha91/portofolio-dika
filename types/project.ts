export type Project = {
  id: string;

  title: string;
  slug: string;

  description: string;

  category: string;

  technologies: string[];

  year: number;

  imageUrl: string;

  githubUrl?: string;
  liveUrl?: string;

  featured: boolean;

  createdAt?: unknown;
  updatedAt?: unknown;
};