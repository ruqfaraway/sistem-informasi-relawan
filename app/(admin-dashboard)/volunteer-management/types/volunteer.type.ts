type Gender = "M" | "F";
type BloodType = "A" | "B" | "AB" | "O" | "Unknown";
type Status = "active" | "inactive";

export type VolunteerData = {
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

export type VolunteersType = {
 id: string;
 name: string;
 position_id: string;
 unit_id: string;
 occupation_id: string;
};

export type educationList = {
 id: string;
 education: string;
}

export type occupationList = {
 id: string;
 occupation: string;
}

export type positionList = {
 id: string;
 position: string;
}

export type unitList = {
 id: string;
 name: string;
}

export type volunteerTypeList = {
 id: string;
 volunteer_type: string;
}

export type religionList = {
 id: string;
 religion: string;
}