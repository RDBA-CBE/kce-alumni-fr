
import BackToTop from "@/app/backToTop";
import ProfileEducation from "./(profile-photograph)";


export const metadata = {
  title: "Karpagam College Of Engineering - Profile Education",
  description: "Online Courses & Education NEXTJS14 Template",
};

const ProfileEducationPage = async () => {
  return (
    <>
      <ProfileEducation/>
      <BackToTop/>
    </>
  );
};

export default ProfileEducationPage;