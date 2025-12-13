import BackToTop from "@/app/backToTop";

import PostCategory from "./(post-category)";


export const metadata = {
  title: "Karpagam College Of Engineering - Post Category",
  description: "Online Courses & Education NEXTJS14 Template",
};

const PostCategoryPage = () => {
  return (
    <>
      <PostCategory />
      <BackToTop />
    </>
  );
};

export default PostCategoryPage;
