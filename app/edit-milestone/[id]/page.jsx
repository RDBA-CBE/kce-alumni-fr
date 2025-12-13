
import BackToTop from "@/app/backToTop";
import MyAccount from "../(id)/MyAccount";

export const metadata = {
  title: "Histudy - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const MyAccountPage = async () => {
  return (
    <>
      <MyAccount/>
      <BackToTop/>
    </>
  );
};

export default MyAccountPage;
