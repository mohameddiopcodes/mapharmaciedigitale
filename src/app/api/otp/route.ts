// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sendConfirmations from "@/app/utils/sendConfirmations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, phone, send } = await req.json();
    sendConfirmations(email, phone, send);
    return NextResponse.json({ status: 200, message: "success" });
  } catch (e: any) {
    return NextResponse.json({ message: e.message, status: 500 });
  }
}
