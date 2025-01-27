import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export const GET = async (req: Request,
 { params }: { params: { id: string } }) => {
 try {
  const { id } = params;
  const educationId = id.toString();
  const education = await prisma.educationLevel.findFirst({
   where: { id: educationId },
  });

  if (!education) {
   return NextResponse.json({ error: "Education not found" }, { status: 404 });
  }

  return NextResponse.json({
   success: true,
   message: "Education found",
   data: {
    id: education.id,
    name: education.education,
    code: education.code,
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
  const educationId = id.toString();
  const education = await prisma.educationLevel.findFirst({
   where: { id: educationId },
  });

  if (!education) {
   return NextResponse.json({ error: "Education not found" }, { status: 404 });
  }

  const body = await req.json();
  const updatedEducation = await prisma.educationLevel.update({
   where: { id: educationId },
   data: {
    education: body.name,
    code: body.code,
   },
  });

  return NextResponse.json({
   success: true,
   message: "Education updated",
   data: updatedEducation,
  });
 } catch (error) {
  console.error("Error in PATCH request:", error);
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
 } finally {
  await prisma.$disconnect();
 }
 }