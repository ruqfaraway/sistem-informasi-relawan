import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export const GET = async (req: Request,) => {
 try {
  // params
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1
  const perPage = parseInt(searchParams.get("perPage") || "10", 10); // Default to 10 items per page
  const query = searchParams.get("query") || "";
  //pagination
  const skip = (page - 1) * perPage;
  const take = perPage;
  // clause
  const [data, total] = await Promise.all([
   prisma.volunteerUnit.findMany({
    where: {
     name: {
      contains: query,
      mode: 'insensitive',
     }
    },
    skip,
    take,
   }),
   prisma.volunteerUnit.count({
    where: {
     name: {
      contains: query,
      mode: 'insensitive',
     }
    }
   }),
  ]);
  if (!data) {
   return NextResponse.json({ error: "Unit not found" }, { status: 404 });
  }
  const units = data.map((item) => {
   return {
    id: item.id,
    name: item.name,
    builder: item.builder,
    birth_date: item.birth_date,
    address: item.address,
    phone: item.phone,
    unit_number: item.unit_number,
    photo: item.photo,
    instagram: item.instagram,
    website: item.website,
   }
  })
  return NextResponse.json({
   success: true,
   message: "Successfull get unit!",
   data: units,
   metadata: {
    page,
    perPage,
    total,
   }
  });
 } catch (error) {
  console.error("Error in GET request:", error);
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
 } finally {
  await prisma.$disconnect();
 }
}
