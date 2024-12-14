import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface AssignmentType {
 code: string;
 name: string;
}

// get all

export const getAssignmentType = async () => {
 const data = await prisma.assignmentType.findMany();
 const datas = data.map((d) => {
  return {
   id: d.id,
   name: d.assignment_type,
   code: d.code,
  };
 });
 return datas;
};

export const getAssignmentTypeAll = async () => {
 const data = await prisma.assignmentType.findMany();
 const datas = data.map((d) => {
  return {
   id: d.id,
   assignment_type: d.assignment_type,
   code: d.code,
  };
 });
 return datas;
};

// Create
export const createAssignmentType = async (data: AssignmentType) => {
 const div: Prisma.AssignmentTypeCreateInput= {
  assignment_type: data.name,
  code: data.code,
 };
 try {
  const stored = await prisma.assignmentType.create({ data: div });
  return stored;
 } catch (error) {
  throw error;
 }
};

// Get Detail
export const getDetailAssignmentType = async (id: string) => {
 try {
  const data = await prisma.assignmentType.findUnique({
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
export const updateAssignmentType = async (id: string, data: AssignmentType) => {
 const div: Prisma.AssignmentTypeUpdateInput = {
  assignment_type: data.name,
  code: data.code,
 };
 try {

  const stored = await prisma.assignmentType.update({
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
export const deleteAssignmentType = async (id: string) => {
 try {
  const stored = await prisma.assignmentType.delete({
   where: {
    id: id,
   },
  });
  return stored;
 } catch (error) {
  throw error;
 }
};