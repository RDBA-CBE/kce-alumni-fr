
import BackToTop from "@/app/backToTop";
import ProfilePhotograph from "./(profile-photograph)";


export const metadata = {
  title: "Karpagam College Of Engineering - Profile Photograph",
  description: "Online Courses & Education NEXTJS14 Template",
};

const ProfilePhotographPage = async () => {
  return (
    <>
      <ProfilePhotograph/>
      <BackToTop/>
    </>
  );
};

export default ProfilePhotographPage;