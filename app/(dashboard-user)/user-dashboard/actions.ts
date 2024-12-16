import { getSession } from "@/lib/session";
import { getAssignmentByVolunteer } from "@/model/assignment";
import { getTotalVolunteersByUnit } from "@/model/volunteer.data";

export const getDataTotalVolunteers = async () => {
 const session = await getSession();
 if (session.isLoggedIn) {
  const unit_id = session.unit_id ?? '';
  const total = await getTotalVolunteersByUnit(unit_id);
  const totalAssignment = await getAssignmentByVolunteer(unit_id);

  return {
   total_volunteers: total,
   total_assignment: totalAssignment,
  };
 }
}

