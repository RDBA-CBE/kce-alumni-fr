import BackToTop from "@/app/backToTop";

import Batch from "./(department)";
import Department from "./(department)";


export const metadata = {
  title: "Karpagam College Of Engineering - Department",
  description: "Online Courses & Education NEXTJS14 Template",
};

const DepartmentPage = () => {
  return (
    <>
      <Department />
      <BackToTop />
    </>
  );
};

export default DepartmentPage;
