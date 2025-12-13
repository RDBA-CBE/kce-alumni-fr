import Dashboard from "./(dashboard)";
import BackToTop from "@/app/backToTop";

export const metadata = {
  title: "Karpagam Institute of Technology - Dashboard",
  description: "Online Courses & Education NEXTJS14 Template",
};

const DashboardPage = async () => {
  return (
    <>
      <Dashboard />
      <BackToTop/>
    </>
  );
};

export default DashboardPage;
