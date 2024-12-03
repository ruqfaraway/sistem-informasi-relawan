import prisma from "@/lib/prisma";

export const getVolunteerTypeAll = async () => {
 const data = await prisma.volunteerType.findMany();
 return data;
};