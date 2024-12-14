'use server'
import { ActionResponseType } from "@/lib/definitions";
import { getSession } from "@/lib/session";
import { createAssignment, deleteAssignment, getAssignment, getDetailAssignment, updateAssignment } from "@/model/assignment";
import { revalidatePath } from "next/cache";

interface Assignment {
 volunteer_id: string;
 assignment_type_id: string;
 start_date: Date;
 end_date: Date;
 description: string;
}

export const PostAssignmentData = async (data: Assignment): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   await createAssignment({
    volunteer_id: data.volunteer_id,
    assignment_type_id: data.assignment_type_id,
    start_date: data.start_date,
    end_date: data.end_date,
    description: data.description,
   });
   revalidatePath("/assignment");
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

export const getAssignmentData = async (): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   const data = await getAssignment();
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

export const getDetailAssignmentData = async (id: string): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   const data = await getDetailAssignment(id);
   return {
    success: true,
    message: "success get data",
    data: {
     volunteer_id: data?.volunteer_id,
     assignment_type_id: data?.assignment_type_id,
     start_date: data?.start_date,
     end_date: data?.end_date,
     description: data?.description,
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

export const UpdateAssignmentData = async (id: string, data: Assignment): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   await updateAssignment(id, {
    volunteer_id: data.volunteer_id,
    assignment_type_id: data.assignment_type_id,
    start_date: data.start_date,
    end_date: data.end_date,
    description: data.description,
   })
   revalidatePath("/assignment");
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

export const DeleteAssignmentData = async (id: string): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   await deleteAssignment(id);
   revalidatePath("/assignment");
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