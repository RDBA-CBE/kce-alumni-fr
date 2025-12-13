import BackToTop from "@/app/backToTop";
import MyBusinessDirectory from "./(my-business-directory)";

export const metadata = {
  title: "Karpagam College Of Engineering - Bussiness Directory",
  description: "Online Courses & Education NEXTJS14 Template",
};

const BusinessDirectoryPage = async () => {
  return (
    <>
      <MyBusinessDirectory />
      <BackToTop/>
    </>
  );
};

export default BusinessDirectoryPage;
