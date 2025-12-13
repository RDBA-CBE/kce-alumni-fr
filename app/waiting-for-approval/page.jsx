import BackToTop from "@/app/backToTop";
import WaitingForApproval from "./(waiting-for-approval)";


export const metadata = {
  title: "Instructor Dashboard - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const WaitingForApprovalPage = () => {
  return (
    <>
      <WaitingForApproval />
      <BackToTop />
    </>
  );
};

export default WaitingForApprovalPage;
