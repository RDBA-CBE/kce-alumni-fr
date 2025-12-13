import BackToTop from "@/app/backToTop";
import EventCategory from "./(event-category)";



export const metadata = {
  title: "Karpagam College Of Engineering - Event Category",
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
