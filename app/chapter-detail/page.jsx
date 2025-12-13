import BackToTop from "@/app/backToTop";
import ChapterDirDetail from "./[id]/page";

export const metadata = {
    title: "Chapter Details - Online Courses & Education NEXTJS14 Template",
    description: "Online Courses & Education NEXTJS14 Template",
  };
const BusinessDirDetailPage = async () => {
  return (
    <>
      <ChapterDirDetail />
      <BackToTop/>
    </>
  );
};

export default BusinessDirDetailPage;
