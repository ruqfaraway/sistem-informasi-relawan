'use server'
import { ActionResponseType } from "@/lib/definitions";
import { getSession } from "@/lib/session";
import { getEducationAll } from "@/model/education.data";
import { getOccupationAll } from "@/model/occupation.data";
import { getPositionAll } from "@/model/position.data";
import { getReligionAll } from "@/model/religion.data";
import { getVolunteerTypeAll } from "@/model/volunteer-type.data";
import { createVolunteerData, deleteVolunteerData, getVolunteerData, updateVolunteerData } from "@/model/volunteer.data";
import { getUnitVolunteerAll } from "@/model/volunteerUnit.data";


type Gender = "M" | "F";
type BloodType = "A" | "B" | "AB" | "O" | "Unknown";
type Status = "active" | "inactive";

interface VolunteerData {
 volunteer_id: string
 volunteer_type_id: string
 unit_id: string
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
  if (session.superAdmin === true) {
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
  if (session.superAdmin === true) {
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
  if (session.superAdmin === true) {
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
  if (session.superAdmin === true) {
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
//get dropdown unit_id
export const getDataUnit = async (): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   const data = await getUnitVolunteerAll();
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
  if (session.superAdmin === true) {
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

export const getDataVolunteer = async (): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   const data = await getVolunteerData();
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

export const createVolunteer = async ({ data }: {
 data: VolunteerData
}): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   await createVolunteerData(data);
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

export const DeleteVolunteer = async (id: string): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   await deleteVolunteerData(id);
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

export const UpdateVolunteer = async ({ id, data }: {
 id: string
 data: VolunteerData
}): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   await updateVolunteerData(id, data);
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