
import BackToTop from "@/app/backToTop";

import MyProfileExperience from "./(edit-profile-experience)";


export const metadata = {
  title: "Karpagam College Of Engineering - Experience",
  description: "Online Courses & Education NEXTJS14 Template",
};

const MyProfileExperiencePage = async () => {
  return (
    <>
      <MyProfileExperience/>
      <BackToTop/>
    </>
  );
};

export default MyProfileExperiencePage;
