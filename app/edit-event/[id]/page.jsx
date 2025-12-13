import BackToTop from "@/app/backToTop";
import EditEvents from "../(edit-event)";

export const metadata = {
  title: "Histudy - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const EditEventsPage = async () => {
  return (
    <>
      <EditEvents />
      <BackToTop/>
    </>
  );
};

export default EditEventsPage;