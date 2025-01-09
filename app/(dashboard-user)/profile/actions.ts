import { ActionResponseType } from "@/lib/definitions";
import { getSession } from "@/lib/session";
import { getDetailProfile } from "@/model/volunteerUnit.data";

export const getDetailProfileData = async (): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.isLoggedIn === true) {
   const id = session.unit_id ?? "";
   const data = await getDetailProfile(id);
   return {
    success: true,
    message: "success get data",
    data: {
     ...data,
     birth_date: data?.birth_date ? new Date(data.birth_date).toLocaleDateString() : "no birth date",
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