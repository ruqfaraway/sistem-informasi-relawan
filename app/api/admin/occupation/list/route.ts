import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export const GET = async (request: Request) => {
  try {
    // params
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1
    const perPage = parseInt(searchParams.get("perPage") || "10", 10); // Default to 10 items per page
    const query = searchParams.get("query") || "";
    //pagination
    const skip = (page - 1) * perPage;
    const take = perPage;
    // clause
    const [data, total] = await Promise.all([
      prisma.occupation.findMany({
        where: {
          occupation: {
            contains: query,
            mode: 'insensitive',
          }
        },
        skip,
        take,
      }),
      prisma.occupation.count({
        where: {
          occupation: {
            contains: query,
            mode: 'insensitive',
          }
        }
      }),
    ]);
    if (!data) {
      return NextResponse.json({ error: "Occupation not found" }, { status: 404 });
    }
    const units = data.map((item) => {
      return {
        id: item.id,
        name: item.occupation,
        code: item.code
      }
    })
    return NextResponse.json({
      success: true,
      message: "Successfull get occupation!",
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