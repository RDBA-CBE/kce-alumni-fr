import BackToTop from "@/app/backToTop";
import MyJobList from "./(my-job-posts)";

export const metadata = {
  title: "Histudy - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const MyJobListPage =() => {
  return (
    <>
      <MyJobList />
      <BackToTop/>
    </>
  );
};

export default MyJobListPage;
