import { getSession } from "@/lib/session";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

export const dynamic = 'force-dynamic'
const prisma = new PrismaClient();
export async function PATCH(
 request: Request,
 { params }: { params: { id: string } }
) {
 try {
  const { id } = params;
  const body = await request.json();
  const user = await prisma.user.findUnique({
   where: { id: id },
  });
  if (!user) {
   return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const passwordMatch = await bcrypt.compare(body.old_password, user.password);
  if (!passwordMatch) {
   return NextResponse.json({ error: "Old password does not match" }, { status: 400 });
  }
  const encryptedPassword = await bcrypt.hash(body.new_password, 10);
  const UpdateUser = await prisma.user.update({
   where: { id: id },
   data: {
    password: encryptedPassword,
   },
  });

  const session = await getSession();
  await session.destroy();
  return NextResponse.json({
   ...user,
   ...UpdateUser
  });
 } catch (error) {
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
 } finally {
  await prisma.$disconnect();
 }
}

