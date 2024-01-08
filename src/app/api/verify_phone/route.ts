// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { verificationCheck } from "@/app/utils/sendConfirmations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, phone, emailCode, phoneCode } = await req.json();
    const phoneValid = await verificationCheck(phone, phoneCode);
    return NextResponse.json({ phoneValid, status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: e.message, status: 500 });
  }
}
