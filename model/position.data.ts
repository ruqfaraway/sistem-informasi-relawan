import prisma from "@/lib/prisma";

export const getPositionAll = async () => {
 const data = await prisma.position.findMany();
 return data;
};