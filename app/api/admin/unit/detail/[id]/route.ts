import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export const GET = async (req: Request,
 { params }: { params: { id: string } }) => {
 try {
  const { id } = params;
  const unitId = id.toString();
  const unit = await prisma.volunteerUnit.findFirst({
   where: { id: unitId },
  });

  if (!unit) {
   return NextResponse.json({ error: "Unit not found" }, { status: 404 });
  }

  return NextResponse.json({
   success: true,
   message: "Unit found",
   data: {
    id: unit.id,
    name: unit.name,
    builder: unit.builder,
    birth_date: unit.birth_date,
    address: unit.address,
    phone: unit.phone,
    unit_number: unit.unit_number,
    photo: unit.photo,
    instagram: unit.instagram,
    website: unit.website,
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
  const unitId = id.toString();
  const unit = await prisma.volunteerUnit.findFirst({
   where: { id: unitId },
  });

  if (!unit) {
   return NextResponse.json({ error: "Unit not found" }, { status: 404 });
  }

  const body = await req.json();
  const updatedUnit = await prisma.volunteerUnit.update({
   where: { id: unitId },
   data: {
    name: body.name,
    builder: body.builder,
    birth_date: body.birth_date,
    address: body.address,
    phone: body.phone,
    unit_number: body.unit_number,
    photo: body.photo,
    instagram: body.instagram,
    website: body.website,
   }
  });

  return NextResponse.json({
   success: true,
   message: "Unit updated",
   data: updatedUnit,
  });
 } catch (error) {
  console.error("Error in PATCH request:", error);
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
 } finally {
  await prisma.$disconnect();
 }
}
