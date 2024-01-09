// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { phone, role, userAgent } = await req.json();
    const response = await axios.post(process.env.BACKEND_URL + "/user", {
      phone,
      role,
      userAgent,
    });
    console.log(response.data);
    return NextResponse.json({ data: response.data, status: 200 });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ message: e.message, status: e.status });
  }
}
