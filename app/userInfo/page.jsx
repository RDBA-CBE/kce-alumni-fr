import BackToTop from "@/app/backToTop";
import UserInfo from "./(userInfo)";

export const metadata = {
  title: "Login & Register - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const SignInPage = () => {
  return (
    <>
      <UserInfo />
      <BackToTop />
    </>
  );
};

export default SignInPage;
