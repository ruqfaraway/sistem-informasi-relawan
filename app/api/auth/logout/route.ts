import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
 const session = await getSession();
 session.destroy();
 return NextResponse.redirect("/login");
};