
import BackToTop from "@/app/backToTop";
import ProfileAlumni from "./(profile-alumni)";


export const metadata = {
  title: "Karpagam Institute of Technology - Profile Contact",
  description: "Online Courses & Education NEXTJS14 Template",
};

const ProfileAlumniPage = async () => {
  return (
    <>
      <ProfileAlumni/>
      <BackToTop/>
    </>
  );
};

export default ProfileAlumniPage;