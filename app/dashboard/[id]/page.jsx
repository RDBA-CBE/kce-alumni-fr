import BackToTop from "@/app/backToTop";
import PostDetail from "../(id)";

export const metadata = {
  title: "Karpagam Institute of Technology - Dashboard",
  description: "Online Courses & Education NEXTJS14 Template",
};

const PostDetailPage = async () => {
  return (
    <>
      <PostDetail/>
      <BackToTop/>
    </>
  );
};

export default PostDetailPage;
