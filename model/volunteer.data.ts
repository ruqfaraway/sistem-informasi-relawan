import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";


type Gender = "M" | "F";
type BloodType = "A" | "B" | "AB" | "O" | "Unknown";
type Status = "active" | "inactive";

interface VolunteerData {
 volunteer_id: string
 volunteer_type_id: string
 unit_id: string
 religion_id: string
 education_id: string
 occupation_id: string
 position_id: string
 name: string
 born_place: string
 birth_date: Date
 gender: Gender
 blood_type: BloodType
 address: string
 phone: string
 email: string
 status: Status
 join_date: Date
 photo?: string
 period?: string
 isOfficer: boolean
}

export const createVolunteerData = async (data: VolunteerData) => {
 const div: Prisma.VolunteerCreateInput = {
  volunteer_id: data.volunteer_id,
  type: {
   connect: {
    id: data.volunteer_type_id,
   },
  },
  unit: {
   connect: {
    id: data.unit_id,
   }
  },
  religion: {
   connect: {
    id: data.religion_id,
   },
  },
  education: {
   connect: {
    id: data.education_id,
   },
  },
  occupation: {
   connect: {
    id: data.occupation_id,
   },
  },
  position: {
   connect: {
    id: data.position_id,
   },
  },
  name: data.name,
  born_place: data.born_place,
  birth_date: data.birth_date,
  gender: data.gender,
  blood_type: data.blood_type,
  address: data.address,
  phone: data.phone,
  email: data.email,
  status: data.status,
  join_date: data.join_date,
  photo: data.photo,
  period: data.period,
  isOfficer: data.isOfficer,
 }
 try {
  const stored = await prisma.volunteer.create({ data: div });
  return stored;
 } catch (error) {
  throw error;
 }
};

export const updateVolunteerData = async (id: string, data: VolunteerData) => {
 const div: Prisma.VolunteerUpdateInput = {
  type: {
   connect: {
    id: data.volunteer_type_id,
   },
  },
  unit: {
   connect: {
    id: data.unit_id,
   }
  },
  religion: {
   connect: {
    id: data.religion_id,
   },
  },
  education: {
   connect: {
    id: data.education_id,
   },
  },
  occupation: {
   connect: {
    id: data.occupation_id,
   },
  },
  position: {
   connect: {
    id: data.position_id,
   },
  },
  name: data.name,
  born_place: data.born_place,
  birth_date: data.birth_date,
  gender: data.gender,
  blood_type: data.blood_type,
  address: data.address,
  phone: data.phone,
  email: data.email,
  status: data.status,
  join_date: data.join_date,
  photo: data.photo,
  period: data.period,
  isOfficer: data.isOfficer,
 }

 try {
  const updated = await prisma.volunteer.update({
   where: {
    id: id,
   },
   data: div,
  });
  return updated;
 } catch (error) {
  throw error;
 }

}

export const deleteVolunteerData = async (id: string) => {
 try {
  const deleted = await prisma.volunteer.delete({
   where: {
    id: id,
   },
  });
  return deleted;
 } catch (error) {
  throw error;
 }
}

export const getDetailVolunteerData = async (id: string) => {
 const data = await prisma.volunteer.findUnique({
  where: {
   id: id,
  }
 });

 if (!data) {
  throw new Error("Data not found");
 }
 return data;
}


export const getVolunteerData = async () => {
 const data = await prisma.volunteer.findMany({
  include: {
   type: true,
   unit: true,
   religion: true,
   education: true,
   occupation: true,
   position: true,
  },
 });
 const datas = data.map((d) => {
  return {
   id: d.id,
   nrp: d.volunteer_id,
   volunteer_type_id: d.type.id,
   unit_id: d.unit.name,
   religion_id: d.religion.religion,
   education_id: d.education.education,
   occupation_id: d.occupation.occupation,
   position_id: d.position.position,
   name: d.name,
   address: d.address,
   birth_date: d.birth_date,
  }
 })
 return datas;
}