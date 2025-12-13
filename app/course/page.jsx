import BackToTop from "@/app/backToTop";
import Salutation from "./(course)";
import Course from "./(course)";


export const metadata = {
  title: "Karpagam Institute of Technology - Course",
  description: "Online Courses & Education NEXTJS14 Template",
};

const CoursePage = () => {
  return (
    <>
      <Course />
      <BackToTop />
    </>
  );
};

export default CoursePage;
