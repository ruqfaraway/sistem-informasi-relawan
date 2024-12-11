import prisma from "@/lib/prisma";

export const getPositionAll = async () => {
 const data = await prisma.position.findMany();
 const datas = data.map((d) => {
  return {
   id: d.id,
   position: d.position,
  };
 });
 return datas;
};