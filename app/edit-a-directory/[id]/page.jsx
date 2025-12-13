import BackToTop from "@/app/backToTop";
import EditDirectory from "./(edit-a-directory)";

export const metadata = {
  title: "Histudy - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const EditDirectoryPage = async () => {
  return (
    <>
      <EditDirectory />
      <BackToTop/>
    </>
  );
};

export default EditDirectoryPage;
