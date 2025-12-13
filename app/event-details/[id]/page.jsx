import BackToTop from "@/app/backToTop";
import SingleEvent from "../(event-details)";

export const metadata = {
  title: "Event Details - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const SingleEventLayout = () => {
  return (
    <>
      <SingleEvent  />
      <BackToTop />
    </>
  );
};

export default SingleEventLayout;
