import BackToTop from "@/app/backToTop";
import EditEvents from "../(email-attendees)";
import EmailAttendees from "../(email-attendees)";

export const metadata = {
  title: "Histudy - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const EmailAttendeesPage = async () => {
  return (
    <>
      <EmailAttendees />
      <BackToTop/>
    </>
  );
};

export default EmailAttendeesPage;