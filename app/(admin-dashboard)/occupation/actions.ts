'use server'
import { ActionResponseType } from "@/lib/definitions";
import { getSession } from "@/lib/session";
import { createOccupationData, deleteOccupationData, getDetailOccupationData, getOccupationData, updateOccupationData } from "@/model/occupation.data";
import { revalidatePath } from "next/cache";

interface occupation {
 name: string;
 code: string;
}

// create

export const createOccupation = async (data: occupation): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   await createOccupationData({
    name: data.name,
    code: data.code,
   });
   revalidatePath("/question");
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

//read
export const getDataOccupation = async (): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   const data = await getOccupationData();
   return {
    success: true,
    message: "success get data",
    data,
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

//update

export const getDetailOccupation = async (id: string): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   const data = await getDetailOccupationData(id);
   return {
    success: true,
    message: "success get data",
    data: {
     name: data?.occupation,
     code: data?.code,
    },
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

// update

export const UpdateOccupation = async (id: string, data: occupation): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   await updateOccupationData(id, {
    name: data.name,
    code: data.code,
   })
   revalidatePath("/occupation");
   return {
    success: true,
    message: "success update data",
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

//delete

export const DeleteOccupation = async (id: string): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   await deleteOccupationData(id);
   revalidatePath("/occupation");
   return {
    success: true,
    message: "success delete data",
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