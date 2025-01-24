type Gender = "M" | "F";
type BloodType = "A" | "B" | "AB" | "O" | "Unknown";
type Status = "active" | "inactive";

export type VolunteerDataTypes = {
  id: string;
  volunteer_id: string;
  volunteer_type_id: string;
  unit_id: string;
  religion_id: string;
  education_id: string;
  occupation_id: string;
  position_id: string;
  name: string;
  born_place: string;
  birth_date: Date;
  gender: Gender;
  blood_type: BloodType;
  address: string;
  phone: string;
  email: string;
  join_date: Date;
  photo?: string;
  period?: string | undefined;
  isOfficer: boolean;
  status: Status;
}