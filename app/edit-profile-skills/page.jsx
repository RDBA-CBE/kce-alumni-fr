
import BackToTop from "@/app/backToTop";
import MyProfileSkills from "./(edit-profile-skills)";

// import MyProfileSkills from "./(edit-profile-skills)";


export const metadata = {
  title: "Karpagam Institute of Technology - Skills",
  description: "Online Courses & Education NEXTJS14 Template",
};

const MyProfileSkillsPage = async () => {
  return (
    <>
      <MyProfileSkills/>
      <BackToTop/>
    </>
  );
};

export default MyProfileSkillsPage;
