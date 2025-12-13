import MyPost from "./(my-posts)";
import Dashboard from "./(my-posts)";
import BackToTop from "@/app/backToTop";

export const metadata = {
  title: "Karpagam Institute of Technology - Dashboard",
  description: "Online Courses & Education NEXTJS14 Template",
};

const MyPostPage = async () => {
  return (
    <>
      <MyPost />
      <BackToTop/>
    </>
  );
};

export default MyPostPage;
