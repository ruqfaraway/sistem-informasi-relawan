"use server";

import { getDataOccupation } from "./actions";
import OccupationPage from "./comp/EducationPage";

const Page = async () => {
  const data = await getDataOccupation();
  return (
    <>
      <OccupationPage dataSource={data.data} />
    </>
  );
};

export default Page;
