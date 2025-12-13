
import BackToTop from "@/app/backToTop";
import PublishPost from "./(published-posts)";

export const metadata = {
  title: "Karpagam Institute of Technology - Dashboard",
  description: "Online Courses & Education NEXTJS14 Template",
};

const PublishPostPage = async () => {
  return (
    <>
      <PublishPost />
      <BackToTop/>
    </>
  );
};

export default PublishPostPage;
