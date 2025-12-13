import BackToTop from "@/app/backToTop";
import CreateEvents from "./(create-event)";

export const metadata = {
  title: "Histudy - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const CreateEventsPage = async () => {
  return (
    <>
      <CreateEvents />
      <BackToTop/>
    </>
  );
};

export default CreateEventsPage;