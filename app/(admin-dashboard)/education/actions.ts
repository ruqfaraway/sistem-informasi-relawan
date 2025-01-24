'use server'
import apiHandler from "@/lib/apiHandler";
import { ActionResponseType } from "@/lib/definitions";
import { getSession } from "@/lib/session";
import { createEducation, getDetailEducationData, getEducationData, updateEducationData } from "@/model/education.data";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface education {
 name: string;
 code: string;
}



export const CreateEducation = async (data: education) => {
 try {
  const res = await apiHandler.request({
   method: 'POST',
   url: '/api/admin/education/add',
   data: data
  })
  if (res.status === 200) {
   revalidatePath("/education")
  };
  return res.data
 } catch (error) {
  return error
 }
}

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

export const DeleteEducation = async (id: string) => {
 try {
  const res = await apiHandler.request({
   method: "DELETE",
   url: `/api/admin/education/delete/`,
   data: { id },
  })
  if (res.status === 200) {
   revalidatePath("/education")
  }
  return res.data
 } catch (error) {
  return error
 }
}