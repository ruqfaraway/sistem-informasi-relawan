import { ClimbingBoxLoader } from "react-spinners";
export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div>
      <ClimbingBoxLoader color={"#000"} loading={true} size={15} />
    </div>
  );
}
