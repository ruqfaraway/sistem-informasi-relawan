import { getSession } from "@/lib/session";
import { getTotalVolunteersByUnit } from "@/model/volunteer.data";

export const getDataTotalVolunteersAdmin = async () => {
 const session = await getSession();
 if (session.isLoggedIn) {
  const unit_id = session.unit_id;
  const total = await getTotalVolunteersByUnit(unit_id);
  return { total_volunteers: total };
 }
}