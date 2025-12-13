import BackToTop from "@/app/backToTop";
import PostJob from "./(post-a-job)";

export const metadata = {
  title: "Histudy - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const JobBoardPage = async () => {
  return (
    <>
      <PostJob />
      <BackToTop/>
    </>
  );
};

export default JobBoardPage;
