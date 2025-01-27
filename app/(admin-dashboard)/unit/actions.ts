'use server'
import { ActionResponseType } from "@/lib/definitions";
import { getSession } from "@/lib/session";
import { createUserAndUnitVolunteer, getUnitVolunteer } from "@/model/volunteerUnit.data";
import { revalidatePath } from "next/cache";
import * as bcrypt from "bcrypt";

interface volunteerUnit {
 name: string;
 builder: string;
 email: string;
 birth_date: Date;
}

export const createVolunteerUnit = async (data: volunteerUnit): Promise<ActionResponseType> => {
 const session = await getSession();
 const hashedPassword = await bcrypt.hash("password", 10);
 try {
  if (session.superAdmin === true) {
   await createUserAndUnitVolunteer({
    name: data.name,
    builder: data.builder,
    email: data.email,
    birth_date: data.birth_date,
    password: hashedPassword, // or any appropriate password value
    address: "address",
    phone: "phone",
   });
   revalidatePath("/unit");
   return {
    success: true,
    message: "success create data",
   };
  }
  return {
   success: false,
   message: "You are not authorized",
  };
 } catch (error) {
  return {
   success: false,
   message: error instanceof Error ? error.message : "Something went wrong",
  }
 }
};

export const getUnitVolunteerData = async (): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   const data = await getUnitVolunteer();
   return {
    success: true,
    message: "success get data",
    data: data,
   };
  }
  return {
   success: false,
   message: "You are not authorized",
  };
 } catch (error) {
  return {
   success: false,
   message: error instanceof Error ? error.message : "Something went wrong",
  }
 }
}