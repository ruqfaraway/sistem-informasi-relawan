import prisma from "@/lib/prisma";

export const getReligionAll = async () => {
 const data = await prisma.religion.findMany();
 return data;
};