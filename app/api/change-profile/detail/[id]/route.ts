import { getSession } from '@/lib/session';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'
const prisma = new PrismaClient();
export async function GET(
 request: Request,
 { params }: { params: { id: string } }
) {
 try {
  const { id } = params;
  const unit = await prisma.volunteerUnit.findUnique({
   where: { id: id },
  });

  if (!unit) {
   return NextResponse.json({ error: "Unit not found" }, { status: 404 });
  }
  return NextResponse.json({
   ...unit,
  });
 } catch (error) {
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
 } finally {
  await prisma.$disconnect();
 }
}

export async function PATCH(
 request: Request,
 { params }: { params: { id: string } }
) {
 try {
  const { id } = params;
  const body = await request.json();
  const unit = await prisma.volunteerUnit.update({
   where: { id: id },
   data: body,
  });

  if (!unit) {
   return NextResponse.json({ error: "Unit not found" }, { status: 404 });
  }

  const session = await getSession();
  if (session.name !== unit.name) {
   session.name = unit.name;
   await session.save();
  }

  return NextResponse.json({
   ...unit,
  });
 } catch (error) {
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
 } finally {
  await prisma.$disconnect();
 }
}



