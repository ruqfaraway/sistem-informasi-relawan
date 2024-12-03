"use server";
import { getUnitVolunteerData } from "./actions";
import UnitVolunteerPage from "./comp/UnitVolunteerPage";

const page = async () => {
  const dataUnitVolunteer = await getUnitVolunteerData();
  return <UnitVolunteerPage dataSource={dataUnitVolunteer.data} />;
};

export default page;
