import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export const DELETE = async (req: Request) => {
 const body = await req.json();
 const { id } = body;
 try {
  const unit_id = id.toString();
  const unit = await prisma.volunteerUnit.findFirst({
   where: { id: unit_id },
  });

  if (!unit) {
   return NextResponse.json({ error: "Unit not found" }, { status: 404 });
  }

  await prisma.volunteerUnit.delete({
   where: { id: unit_id },
  });

  return NextResponse.json({
   success: true,
   message: "Unit deleted",
  }, {
   status: 200
  });
 } catch (error) {
  console.error("Error in DELETE request:", error);
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
 } finally {
  await prisma.$disconnect();
 }
}