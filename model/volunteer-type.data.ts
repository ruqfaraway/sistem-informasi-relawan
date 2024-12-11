import prisma from "@/lib/prisma";

export const getVolunteerTypeAll = async () => {
 const data = await prisma.volunteerType.findMany();
 const datas = data.map((d) => {
  return {
   id: d.id,
   code: d.code,
   volunteer_type: d.volunteer_type,
  };
 });
 return datas;
};