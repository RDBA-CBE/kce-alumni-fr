import BackToTop from "@/app/backToTop";
import PostDirectory from "./(post-a-directory)";

export const metadata = {
  title: "Histudy - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const PostDirectoryPage = async () => {
  return (
    <>
      <PostDirectory />
      <BackToTop/>
    </>
  );
};

export default PostDirectoryPage;
