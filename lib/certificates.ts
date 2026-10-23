import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Certificate } from "@/types/certificate";

export async function getCertificates(): Promise<Certificate[]> {
  const snapshot = await getDocs(collection(db, "certificates"));

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title ?? "",
      issuer: data.issuer ?? "",
      date: data.date ?? "",
      expiryDate: data.expiryDate ?? "",
      skills: Array.isArray(data.skills) ? data.skills : [],
      imageUrl: data.imageUrl ?? "",
      certificateUrl: data.certificateUrl ?? "",
      createdAt: "",
      updatedAt: "",
    };
  });
}