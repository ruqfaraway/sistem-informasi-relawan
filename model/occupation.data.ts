import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface occupation {
 name: string;
 code: string;
}

// get all

export const getOccupationData = async () => {
 const data = await prisma.occupation.findMany();
 const datas = data.map((d) => {
  return {
   id: d.id,
   occupation: d.occupation,
   code: d.code,
  };
 });
 return datas;
};

export const getOccupationAll = async () => {
 const data = await prisma.occupation.findMany();
 const datas = data.map((d) => {
  return {
   id: d.id,
   occupation: d.occupation,
   code: d.code,
  };
 });
 return datas;
};

// Create
export const createOccupationData = async (data: occupation) => {
 const div: Prisma.OccupationCreateInput = {
  occupation: data.name,
  code: data.code,
 };
 try {
  const stored = await prisma.occupation.create({ data: div });
  return stored;
 } catch (error) {
  throw error;
 }
};

// Get Detail
export const getDetailOccupationData = async (id: string) => {
 try {
  const data = await prisma.occupation.findUnique({
   where: {
    id: id,
   },
  });
  return data;
 } catch (error) {
  throw error;
 }
};

// Update Data
export const updateOccupationData = async (id: string, data: occupation) => {
 const div: Prisma.OccupationUpdateInput = {
  occupation: data.name,
  code: data.code,
 };
 try {

  const stored = await prisma.occupation.update({
   where: {
    id: id,
   },
   data: div,
  });
  return stored;
 } catch (error) {
  throw error;
 }
};

// Delete Data
export const deleteOccupationData = async (id: string) => {
 try {
  const stored = await prisma.occupation.delete({
   where: {
    id: id,
   },
  });
  return stored;
 } catch (error) {
  throw error;
 }
};