import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface education {
 name: string;
 code: string;
}

export const getEducationData = async () => {
 const data = await prisma.educationLevel.findMany();
 return data;
};
export const createEducation = async (data: education) => {
 const div: Prisma.EducationLevelCreateInput = {
  education: data.name,
  code: data.code,
 };
 try {
  const stored = await prisma.educationLevel.create({ data: div });
  return stored;
 } catch (error) {
  return {
   success: false,
   message: error instanceof Error ? error.message : "Something went wrong",
  }
 }
};

export const getDetailEducationData = async (id: string) => {
 const data = await prisma.educationLevel.findUnique({
  where: {
   id: id,
  },
 });
 return data;
};

export const updateEducationData = async (id: string, data: education) => {
 const div: Prisma.EducationLevelUpdateInput = {
  education: data.name,
  code: data.code,
 };
 try {
  
  const stored = await prisma.educationLevel.update({
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