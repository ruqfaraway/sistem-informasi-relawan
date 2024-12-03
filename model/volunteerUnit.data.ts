import prisma from "@/lib/prisma";

interface createUser {
 name: string;
 builder: string;
 birth_date: Date;
 email: string;
 password: string;
}



// create 
export const createUserAndUnitVolunteer = (data: createUser,) => {
 return prisma.$transaction(async (prisma) => {
  try {
   const unit = await prisma.volunteerUnit.create({
    data: {
     name: data.name,
     builder: data.builder,
     birth_date: data.birth_date,
    },
   });
   const user = await prisma.user.create({
    data: {
     name: data.name,
     email: data.email,
     password: data.password,
     unit_id: unit.id,
     role_id: 2, // or any appropriate role_id value
    },
   });
   return { unit, user };
  } catch (error) {
   throw error;
  }
 })
}

// get
export const getUnitVolunteer = async () => {
 return await prisma.volunteerUnit.findMany();
}

//get all
export const getUnitVolunteerAll = async () => {
 return await prisma.volunteerUnit.findMany();
}