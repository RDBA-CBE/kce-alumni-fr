
import BackToTop from "@/app/backToTop";
import MyBasicDetails from "./(edit-profile-picture)";
import MyProfilePicture from "./(edit-profile-picture)";


export const metadata = {
  title: "Karpagam College Of Engineering - Profile Picture",
  description: "Online Courses & Education NEXTJS14 Template",
};

const MyProfilePicturePage = async () => {
  return (
    <>
      <MyProfilePicture/>
      <BackToTop/>
    </>
  );
};

export default MyProfilePicturePage;
