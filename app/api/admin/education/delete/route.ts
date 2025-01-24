import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function DELETE(req: Request) {
 const body = await req.json();
 const { id } = body;
 try {
  const education_id = id.toString();
  const education = await prisma.educationLevel.findFirst({
   where: { id: education_id },
  });

  if (!education) {
   return NextResponse.json({ error: "Education not found" }, { status: 404 });
  }

  await prisma.educationLevel.delete({
   where: { id: education_id },
  });

  return NextResponse.json({
   success: true,
   message: "Education deleted",
  });
 } catch (error) {
  console.error("Error in DELETE request:", error);
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
 } finally {
  await prisma.$disconnect();
 }
 return
}