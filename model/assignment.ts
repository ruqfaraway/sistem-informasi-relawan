import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface Assignment {
 assignment_type_id: string;
 volunteer_id: string;
 photo?: string;
 start_date: Date;
 end_date: Date;
 description: string;
}

export const getAssignmentPaginateUser = async (page: number, perPage: number, id: string) => {
 const data = await prisma.assignment.findMany({
  where: {
   volunteer: {
    unit_id: id,
   },
  },
  select: {
   id: true,
   volunteer: {
    select: {
     unit_id: true,
     name: true,
    },
   },
   type: {
    select: {
     assignment_type: true,
    },
   },
   start_date: true,
   end_date: true,
  },
  skip: (page - 1) * perPage,
  take: perPage,
 });
 const total = await prisma.assignment.count({
  where: {
   volunteer: {
    unit_id: id,
   },
  },
 });
 const result = data.map((d) => {
  return {
   id: d.id,
   name: d.volunteer.name,
   type: d.type.assignment_type,
   start_date: d.start_date,
   end_date: d.end_date,
  };
 });
 return {
  data: result,
  metadata: {
   page: page,
   perPage: perPage,
   total: total,
  },
 }
}

export const getAssignmentPaginateAdmin = async (page: number, perPage: number) => {
 const data = await prisma.assignment.findMany({
  include: {
   type: true,
   volunteer: true,
  },
  skip: (page - 1) * perPage,
  take: perPage,
 });
 const total = await prisma.assignment.count();
 const datas = data.map((d) => {
  return {
   id: d.id,
   name: d.volunteer.name,
   type: d.type.assignment_type,
   start_date: d.start_date,
   end_date: d.end_date,
  };
 });
 return {
  data: datas,
  metadata: {
   page: page,
   perPage: perPage,
   total: total,
  },
 }
}
// get all
export const getAssignment = async () => {
 const data = await prisma.assignment.findMany(
  {
   include: {
    type: true,
    volunteer: true,
   },
  }
 )
 const datas = data.map((d) => {
  return {
   id: d.id,
   name: d.volunteer.name,
   type: d.type.assignment_type,
   start_date: d.start_date,
   end_date: d.end_date,
  };
 });
 return datas;
};



// Create
export const createAssignment = async (data: Assignment) => {
 const div: Prisma.AssignmentCreateInput = {
  type: {
   connect: { id: data.assignment_type_id },
  },
  volunteer: {
   connect: { id: data.volunteer_id },
  },
  photo: data.photo ?? "",
  start_date: data.start_date,
  end_date: data.end_date,
  description: data.description,
 };
 try {
  const stored = await prisma.assignment.create({ data: div });
  return stored;
 } catch (error) {
  throw error;
 }
};

// Get Detail
export const getDetailAssignment = async (id: string) => {
 try {
  const data = await prisma.assignment.findUnique({
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
export const updateAssignment = async (id: string, data: Assignment) => {
 const div: Prisma.AssignmentUpdateInput = {
  type: {
   connect: { id: data.assignment_type_id },
  },
  volunteer: {
   connect: { id: data.volunteer_id }
  },
  photo: data.photo ?? "",
  start_date: data.start_date,
  end_date: data.end_date,
  description: data.description,
 };
 try {

  const stored = await prisma.assignment.update({
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
export const deleteAssignment = async (id: string) => {
 try {
  const stored = await prisma.assignment.delete({
   where: {
    id: id,
   },
  });
  return stored;
 } catch (error) {
  throw error;
 }
};

export const getTotalAssignment = async () => {
 const total = await prisma.assignment.count();
 return total;
}

export const getAssignmentByVolunteer = async (id: string) => {
const total = await prisma.assignment.count({
 where: {
  volunteer : {
   unit_id: id,
  }
 },
});
console.log(total);
return total;
}