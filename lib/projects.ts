import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import type { Project } from "@/types/project";

const projectsCollection = collection(db, "projects");

export async function getProjects(): Promise<Project[]> {
  const snapshot = await getDocs(projectsCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Project[];
}

export async function createProject(
  data: Omit<Project, "id" | "createdAt" | "updatedAt">
) {
  const now = new Date();

  const docRef = await addDoc(projectsCollection, {
    ...data,
    createdAt: now,
    updatedAt: now,
  });

  return docRef.id;
}

export async function updateProject(
  id: string,
  data: {
    title: string;
    slug: string;
    description: string;
    category: string;
    technologies: string[];
    year: number;
    featured: boolean;
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
  }
) {
  const projectRef = doc(
    db,
    "projects",
    id
  );

  await updateDoc(projectRef, {
    ...data,
    updatedAt: new Date(),
  });
}