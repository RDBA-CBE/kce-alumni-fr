import JobDetail from "../(id)";
import BackToTop from "@/app/backToTop";

export const metadata = {
  title: "Karpagam Institute of Technology - Job Detail",
  description: "Online Courses & Education NEXTJS14 Template",
};

const JobDetailPage = async () => {
  return (
    <>
      <JobDetail />
      <BackToTop/>
    </>
  );
};

export default JobDetailPage;
