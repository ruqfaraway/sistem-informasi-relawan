import { getSession } from "@/lib/session";
import { getTotalAssignment } from "@/model/assignment";
import { getTotalVolunteers, } from "@/model/volunteer.data";

export const getDataTotalVolunteersAdmin = async () => {
 const session = await getSession();
 if (session.isLoggedIn) {
  const unit_id = session?.unit_id;
  const totalAssignment = await getTotalAssignment()
  const total = await getTotalVolunteers();
  return {
   total_volunteers: total,
   total_assignment: totalAssignment,
  };
 }
}