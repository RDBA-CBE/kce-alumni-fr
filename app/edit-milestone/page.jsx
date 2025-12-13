
import BackToTop from "@/app/backToTop";
import MyMiltestone from "./(edit-profile-skills)";

// import MyProfileSkills from "./(edit-profile-skills)";


export const metadata = {
  title: "Karpagam Institute of Technology - Milestone",
  description: "Online Courses & Education NEXTJS14 Template",
};

const MyMiltestonePage = async () => {
  return (
    <>
      <MyMiltestone/>
      <BackToTop/>
    </>
  );
};

export default MyMiltestonePage;
