import BackToTop from "@/app/backToTop";
import MyBusinessDirectory from "./(my-business-directory)";

export const metadata = {
  title: "karpagam Institute of Technology - Bussiness Directory",
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
