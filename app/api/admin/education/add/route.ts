import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req: Request) {
 try {
  const body = await req.json();
  const education = await prisma.educationLevel.create({
   data: {
    education: body.name,
    code: body.code,
   },
  })
  return NextResponse.json({
   success: true,
   message: "Education created!",
   data: education,
  });
 } catch (error) {
  console.error("Error in POST request:", error);
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
 } finally {
  await prisma.$disconnect();
 }
}