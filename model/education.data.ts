import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface education {
 name: string;
 code: string;
}

// get all

export const getEducationData = async () => {
 const data = await prisma.educationLevel.findMany();
 const datas = data.map((d) => {
  return {
   id: d.id,
   education: d.education,
   code: d.code,
  };
 });
 return datas;
};

export const getEducationAll = async () => {
 const data = await prisma.educationLevel.findMany();
 const datas = data.map((d) => {
  return {
   id: d.id,
   education: d.education,
   code: d.code,
  };
 });
 return datas;
};

// Create
export const createEducation = async (data: education) => {
 const div: Prisma.EducationLevelCreateInput = {
  education: data.name,
  code: data.code,
 };
 try {
  const stored = await prisma.educationLevel.create({ data: div });
  return stored;
 } catch (error) {
  throw error;
 }
};

// Get Detail
export const getDetailEducationData = async (id: string) => {
 try {
  const data = await prisma.educationLevel.findUnique({
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

// Delete Data
export const deleteEducationData = async (id: string) => {
 try {
  const stored = await prisma.educationLevel.delete({
   where: {
    id: id,
   },
  });
  return stored;
 } catch (error) {
  throw error;
 }
};