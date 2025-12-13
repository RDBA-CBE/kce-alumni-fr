
import BackToTop from "@/app/backToTop";
import MyBasicDetails from "./edit-profile-education";
import MyProfilePicture from "./edit-profile-education";
import MyProfileEducation from "./edit-profile-education";


export const metadata = {
  title: "Karpagam Institute of Technology - Education",
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
