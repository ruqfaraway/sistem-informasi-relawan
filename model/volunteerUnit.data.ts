import prisma from "@/lib/prisma";

interface createUser {
 name: string;
 builder: string;
 birth_date: Date;
 email: string;
 password: string;
 address: string;
 phone: string
}



// create 
export const createUserAndUnitVolunteer = (data: createUser,) => {
 return prisma.$transaction(async (prisma) => {
  try {
   const user = await prisma.user.create({
    data: {
     email: data.email,
     password: data.password,
     role_id: 2, // or any appropriate role_id value
    },
   });
   const unit = await prisma.volunteerUnit.create({
    data: {
     name: data.name,
     builder: data.builder,
     birth_date: data.birth_date,
     user_id: user.id,
     address: data.address,
     phone: data.phone,
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