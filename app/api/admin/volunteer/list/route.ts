import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
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
   prisma.volunteer.findMany({
    where: {
     name: {
      contains: query,
      mode: 'insensitive',
     },
    },
    include: {
     type: true,
     unit: true,
     religion: true,
     education: true,
     occupation: true,
     position: true,
    },
    skip,
    take,
   }),
   prisma.volunteer.count({
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
  const volunteers = data.map((d) => {
   return {
    id: d.id,
   nrp: d.volunteer_id,
   volunteer_type_id: d.type.id,
   unit_id: d.unit.name,
   religion_id: d.religion.religion,
   education_id: d.education.education,
   occupation_id: d.occupation.occupation,
   position_id: d.position.position,
   name: d.name,
   address: d.address,
   birth_date: d.birth_date,
   gender: d.gender === "M" ? "Laki-laki" : "Perempuan",
   }
  })
  return NextResponse.json({
   success: true,
   message: "Successfull get volunteer!",
   data: volunteers,
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