
import BackToTop from "@/app/backToTop";
import ProfileMilestone from "./(profile-milestone)";


export const metadata = {
  title: "Karpagam College Of Engineering - Profile Milestone",
  description: "Online Courses & Education NEXTJS14 Template",
};

const ProfileMilestonePage = async () => {
  return (
    <>
      <ProfileMilestone/>
      <BackToTop/>
    </>
  );
};

export default ProfileMilestonePage;