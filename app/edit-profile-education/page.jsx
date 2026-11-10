import BackToTop from "@/app/backToTop";
import MyProfileEducation from "./edit-profile-education";

export const metadata = {
  title: "Karpagam College Of Engineering - Education",
  description: "Online Courses & Education NEXTJS14 Template",
};

const MyProfileEducationPage = async () => {
  return (
    <>
      <MyProfileEducation/>
      <BackToTop/>
    </>
  );
};

export default MyProfileEducationPage;
