'use server'
import { ActionResponseType } from "@/lib/definitions";
import { getSession } from "@/lib/session";
import { getEducationAll } from "@/model/education.data";
import { getOccupationAll } from "@/model/occupation.data";
import { getPositionAll } from "@/model/position.data";
import { getReligionAll } from "@/model/religion.data";
import { getVolunteerTypeAll } from "@/model/volunteer-type.data";
import { createVolunteerData, deleteVolunteerData, getVolunteerDataByUnit, getVolunteerDataPagination, updateVolunteerData } from "@/model/volunteer.data";


type Gender = "M" | "F";
type BloodType = "A" | "B" | "AB" | "O" | "Unknown";
type Status = "active" | "inactive";

interface VolunteerData {
 volunteer_id: string
 volunteer_type_id: string
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

//get dropdown occupation
export const getDataOccupation = async (): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.isLoggedIn === true) {
   const data = await getOccupationAll();
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

//get dropdown education
export const getDataEducation = async (): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.isLoggedIn === true) {
   const data = await getEducationAll();
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
//get dropdown religion
export const getDataReligion = async (): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.isLoggedIn === true) {
   const data = await getReligionAll();
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
//get dropdown volunteer_type_id
export const getDataVolunteerType = async (): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.isLoggedIn === true) {
   const data = await getVolunteerTypeAll();
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

//get dropdown position_id
export const getDataPosition = async (): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.isLoggedIn === true) {
   const data = await getPositionAll();
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

export const getDataUserVolunteerPagination = async (page: number, perPage: number): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.isLoggedIn === true) {
   const id = session?.unit_id ?? undefined;
   const data = await getVolunteerDataPagination(page, perPage, id);
   return {
    success: true,
    message: "success get data",
    data
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

export const getDataUserVolunteer = async (): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.isLoggedIn === true) {
   const id = session?.unit_id ?? undefined;
   const data = await getVolunteerDataByUnit(id);
   return {
    success: true,
    message: "success get data",
    data
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

export const createVolunteerFromUser = async ({ data }: {
 data: VolunteerData
}): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.isLoggedIn === true) {
   const toBeCreatedData = {
    ...data,
    unit_id: session.unit_id ?? '',
   }
   await createVolunteerData(toBeCreatedData);
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
}

export const DeleteUserVolunteer = async (id: string): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.isLoggedIn === true) {
   await deleteVolunteerData(id);
   return {
    success: true,
    message: "success delete data",
   };
  } else {
   return {
    success: false,
    message: "You are not authorized",
   };
  }
 } catch (error) {
  return {
   success: false,
   message: error instanceof Error ? error.message : "Something went wrong",
  }
 }
}

export const UpdateVolunteerFromUser = async ({ id, data }: {
 id: string
 data: VolunteerData
}): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.isLoggedIn === true) {
   const toBeUpdate = {
    ...data,
    unit_id: session.unit_id ?? '',
   }
   await updateVolunteerData(id, toBeUpdate);
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