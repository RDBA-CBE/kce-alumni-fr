import PublishShare from "../(publish-and-share)";
import BackToTop from "@/app/backToTop";

export const metadata = {
  title: "Histudy - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const PublishSharePage = async () => {
  return (
    <>
      <PublishShare />
      <BackToTop/>
    </>
  );
};

export default PublishSharePage;
