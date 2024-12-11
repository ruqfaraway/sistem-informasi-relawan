import prisma from "@/lib/prisma";

export const getReligionAll = async () => {
 const data = await prisma.religion.findMany();
 const datas = data.map((d) => {
  return {
   id: d.id,
   religion: d.religion,
  };
 });
 return datas;
};