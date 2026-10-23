import { NextResponse } from "next/server";
import { getCertificates } from "@/lib/certificates";

export async function GET() {
  try {
    const certificates = await getCertificates();

    return NextResponse.json(certificates);
  } catch (error) {
    console.error("Failed to fetch certificates:", error);

    return NextResponse.json(
      { error: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}