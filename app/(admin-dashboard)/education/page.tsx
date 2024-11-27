"use server";
import { getDataEducation } from "./actions";
import EducationPage from "./comp/EducationPage";

const Page = async () => {
  const data = await getDataEducation();
  return (
    <>
      <EducationPage dataSource={data.data} />
    </>
  );
};

export default Page;
