import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export const GET = async (req: Request,
 { params }: { params: { id: string } }) => {
 try {
  const { id } = params;
  const volunteer_id = id.toString();
  const volunteer = await prisma.volunteer.findUnique({
   where: {
    id: volunteer_id,
   }
  });

  if (!volunteer) {
   return NextResponse.json({ error: "Volunteer not found" }, { status: 404 });
  }

  return NextResponse.json({
   success: true,
   message: "Volunteer found",
   data: {
    ...volunteer
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
  const volunteer_id = id.toString();
  const volunteer = await prisma.volunteer.findFirst({
   where: { id: volunteer_id },
  });

  if (!volunteer) {
   return NextResponse.json({ error: "Volunteer not found" }, { status: 404 });
  }

  const body = await req.json();
  const updatedVolunteer = await prisma.volunteerUnit.update({
   where: { id: volunteer_id },
   data: {
    ...body,
   }
  });

  return NextResponse.json({
   success: true,
   message: "Volunteer updated",
   data: updatedVolunteer,
  });
 } catch (error) {
  console.error("Error in PATCH request:", error);
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
 } finally {
  await prisma.$disconnect();
 }
}
