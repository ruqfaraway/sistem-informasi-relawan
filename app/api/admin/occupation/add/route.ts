import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req: Request) {
 try {
  const body = await req.json();
  const occupation = await prisma.occupation.create({
   data: {
    occupation: body.name,
    code: body.code,
   },
  })
  return NextResponse.json({
   success: true,
   message: "Occupation created!",
   data: occupation,
  });
 } catch (error) {
  console.error("Error in POST request:", error);
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
 } finally {
  await prisma.$disconnect();
 }
}