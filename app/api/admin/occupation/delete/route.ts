import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function DELETE(req: Request) {
 const body = await req.json();
 const { id } = body;
 try {
  const occupation_id = id.toString();
  const occupation = await prisma.occupation.findFirst({
   where: { id: occupation_id },
  });

  if (!occupation) {
   return NextResponse.json({ error: "Occupation not found" }, { status: 404 });
  }

  await prisma.occupation.delete({
   where: { id: occupation_id },
  });

  return NextResponse.json({
   success: true,
   message: "Occupation deleted",
  });
 } catch (error) {
  console.error("Error in DELETE request:", error);
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
 } finally {
  await prisma.$disconnect();
 }
}