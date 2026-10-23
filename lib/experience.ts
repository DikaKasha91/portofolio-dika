import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import type { Experience } from "@/types/experience";

const experiencesCollection = collection(
  db,
  "experiences"
);

export async function getExperiences(): Promise<Experience[]> {
  const snapshot = await getDocs(experiencesCollection);

  return snapshot.docs
    .map((document) => {
      const data = document.data();

      return {
        id: document.id,

        category: data.category ?? "",
        position: data.position ?? "",

        company: data.company ?? "",
        organization: data.organization ?? "",

        startDate: data.startDate ?? "",
        endDate: data.endDate ?? "",

        description: data.description ?? "",

        tags: Array.isArray(data.tags)
          ? data.tags
          : [],

        logoUrl: data.logoUrl ?? "",

        order: Number(data.order ?? 0),

        createdAt:
          data.createdAt?.toDate?.().toISOString() ?? "",

        updatedAt:
          data.updatedAt?.toDate?.().toISOString() ?? "",
      };
    })
    .sort((a, b) => a.order - b.order);
}

export async function createExperience(
  data: Omit<
    Experience,
    "id" | "createdAt" | "updatedAt"
  >
) {
  const docRef = await addDoc(
    experiencesCollection,
    {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
  );

  return docRef.id;
}

export async function updateExperience(
  id: string,
  data: {
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
  }
) {
  const experienceRef = doc(
    db,
    "experiences",
    id
  );

  await updateDoc(experienceRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteExperience(
  id: string
) {
  const experienceRef = doc(
    db,
    "experiences",
    id
  );

  await deleteDoc(experienceRef);
}