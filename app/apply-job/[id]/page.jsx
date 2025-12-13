import ApplyJob from "../(id)";
import JobDetail from "../(id)";
import BackToTop from "@/app/backToTop";

export const metadata = {
  title: "Histudy - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const ApplyJobPage = async () => {
  return (
    <>
      <ApplyJob />
      <BackToTop/>
    </>
  );
};

export default ApplyJobPage;
