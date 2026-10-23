import { NextResponse } from "next/server";
import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export async function GET() {
  try {
    const snapshot = await getDocs(
      collection(db, "experiences")
    );

    const experiences = snapshot.docs
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
        };
      })
      .sort((a, b) => a.order - b.order);

    return NextResponse.json(experiences);
  } catch (error) {
    console.error(
      "Failed to fetch experiences:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to fetch experiences.",
      },
      {
        status: 500,
      }
    );
  }
}