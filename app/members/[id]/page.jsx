
import BackToTop from "@/app/backToTop";
import Members from "../(members)";
import MyAccount from "../(id)/MyAccount";

export const metadata = {
  title: "Karpagam Institute of Technology",
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
