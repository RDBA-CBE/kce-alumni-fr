import BackToTop from "@/app/backToTop";
import EventCategory from "./(event-category)";



export const metadata = {
  title: "Karpagam Institute of Technology - Event Category",
  description: "Online Courses & Education NEXTJS14 Template",
};

const EventCategoryPage = () => {
  return (
    <>
      <EventCategory />
      <BackToTop />
    </>
  );
};

export default EventCategoryPage;
