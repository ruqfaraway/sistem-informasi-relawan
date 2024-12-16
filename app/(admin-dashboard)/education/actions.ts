'use server'
import { ActionResponseType } from "@/lib/definitions";
import { getSession } from "@/lib/session";
import { createEducation, deleteEducationData, getDetailEducationData, getEducationData, getEducationPaginate, updateEducationData } from "@/model/education.data";
import { revalidatePath } from "next/cache";

interface education {
 name: string;
 code: string;
}

export const getPaginationEducation = async (page: number, perPage: number): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   const data = await getEducationPaginate(
    page,
    perPage,
   );
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

export const PostEducation = async (data: education): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   await createEducation({
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

export const getDataEducation = async (): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   const data = await getEducationData();
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

export const getDetailEducation = async (id: string): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   const data = await getDetailEducationData(id);
   return {
    success: true,
    message: "success get data",
    data: {
     name: data?.education,
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

export const UpdateEducation = async (id: string, data: education): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   await updateEducationData(id, {
    name: data.name,
    code: data.code,
   })
   revalidatePath("/education");
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

export const DeleteEducation = async (id: string): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   await deleteEducationData(id);
   revalidatePath("/education");
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