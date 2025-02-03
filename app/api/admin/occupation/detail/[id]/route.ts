import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export const GET = async (req: Request,
 { params }: { params: { id: string } }) => {
 try {
  const { id } = params;
  const occupationId = id.toString();
  const occupation = await prisma.occupation.findFirst({
   where: { id: occupationId },
  });

  if (!occupation) {
   return NextResponse.json({ error: "Occupation not found" }, { status: 404 });
  }

  return NextResponse.json({
   success: true,
   message: "Occupation found",
   data: {
    id: occupation.id,
    name: occupation.occupation,
    code: occupation.code,
   }
  });
 } catch (error) {
  console.error("Error in GET request:", error);
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
 } finally {
  await prisma.$disconnect();
 }
}

export const PATCH = async (req: Request,
 { params }: { params: { id: string } }) => {
 try {
  const { id } = params;
  const occupationId = id.toString();
  const occupation = await prisma.occupation.findFirst({
   where: { id: occupationId },
  });

  if (!occupation) {
   return NextResponse.json({ error: "Occupation not found" }, { status: 404 });
  }

  const body = await req.json();
  const updatedOccupation = await prisma.occupation.update({
   where: { id: occupationId },
   data: {
    occupation: body.name,
    code: body.code,
   },
  });

  return NextResponse.json({
   success: true,
   message: "Occupation updated",
   data: updatedOccupation,
  });
 } catch (error) {
  console.error("Error in PATCH request:", error);
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
 } finally {
  await prisma.$disconnect();
 }
}