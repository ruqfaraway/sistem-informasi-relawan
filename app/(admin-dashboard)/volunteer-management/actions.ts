'use server'
import { ActionResponseType } from "@/lib/definitions";
import { getSession } from "@/lib/session";
import { getEducationAll } from "@/model/education.data";
import { getOccupationAll } from "@/model/occupation.data";
import { getPositionAll } from "@/model/position.data";
import { getReligionAll } from "@/model/religion.data";
import { getVolunteerTypeAll } from "@/model/volunteer-type.data";
import { createVolunteerData, deleteVolunteerData, getAllVolunteer, getVolunteerData, getVolunteerDataPaginationAdmin, updateVolunteerData } from "@/model/volunteer.data";
import { getUnitVolunteerAll } from "@/model/volunteerUnit.data";
import { VolunteerData } from "./types/volunteer.type";

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

export const getDataVolunteerAdminPagination = async ({ page, perPage }: {
 page: number;
 perPage: number;
}): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   const data = await getVolunteerDataPaginationAdmin(page, perPage);
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

export const getAllVolunteerData = async (): Promise<ActionResponseType> => {
 const session = await getSession();
 try {
  if (session.superAdmin === true) {
   const data = await getAllVolunteer();
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