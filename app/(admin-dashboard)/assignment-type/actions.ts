'use server'
import { ActionResponseType } from "@/lib/definitions";
import { getSession } from "@/lib/session";
import { createAssignmentType, deleteAssignmentType, getAssignmentType, getDetailAssignmentType, updateAssignmentType } from "@/model/assignment-type.data";
import { revalidatePath } from "next/cache";

interface AssignmentType {
 name: string;
 code: string;
}

export const PostAssignmentTypeData = async (data: AssignmentType): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   await createAssignmentType({
    name: data.name,
    code: data.code,
   });
   revalidatePath("/assignment-type");
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

export const getAssignmentTypeData = async (): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.isLoggedIn === true) {
   const data = await getAssignmentType();
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

export const getDetailAssignmentTypeData = async (id: string): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   const data = await getDetailAssignmentType(id);
   return {
    success: true,
    message: "success get data",
    data: {
     name: data?.assignment_type,
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

export const UpdateAssignmentTypeData = async (id: string, data: AssignmentType): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   await updateAssignmentType(id, {
    name: data.name,
    code: data.code,
   })
   revalidatePath("/assignment-type");
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

export const DeleteAssignmentTypeData = async (id: string): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   await deleteAssignmentType(id);
   revalidatePath("/assignment-type");
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