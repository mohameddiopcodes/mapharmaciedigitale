// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import allowedList from "@/app/utils/allowedList";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    if (!process.env.BACKEND_URL) throw new Error("Can't perform task.");
    const { name, phone, role, userAgent } = await req.json();
    if (role === 0 && !allowedList.includes(phone)) {
      return NextResponse.json({
        message: "Veuillez inscrire votre pharmacie.",
        status: 403,
      });
    }
    const response = await axios.post(process.env.BACKEND_URL + "/user", {
      name,
      phone,
      role,
      userAgent,
    });
    return NextResponse.json({ data: response.data, status: 200 });
  } catch (e: any) {
    console.log(e.response);
    return NextResponse.json({
      message: e.response.data.message,
      status: e.response.status,
    });
  }
}
