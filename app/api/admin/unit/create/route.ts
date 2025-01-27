import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();
export const POST = async (req: Request) => {
 try {
  const body = await req.json();
  const hashedPassword = await bcrypt.hash("password", 10);
  const [user, unit] = await prisma.$transaction([
   prisma.user.create({
    data: {
     email: body.email,
     password: hashedPassword,
     role_id: 2,
    },
   }),
   prisma.volunteerUnit.create({
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
    },
   }),
  ]);


  return NextResponse.json({
   success: true,
   message: "Unit created",
   data: {
    user: {
     id: user.id,
     email: user.email,
    },
    unit: {
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
    },
   },
  });
 } catch (error) {
  console.error("Error in POST request:", error);
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
 } finally {
  await prisma.$disconnect();
 }
}