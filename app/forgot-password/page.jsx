import BackToTop from "@/app/backToTop";
import Password from "./(forgot-password)";
import ForgetPassword from "./(forgot-password)";

export const metadata = {
  title: "Login & Register - Karpagam Institute of Technology",
  description: "Online Courses & Education NEXTJS14 Template",
};

const ForgetPasswordPage = () => {
  return (
    <>
      <ForgetPassword />
      <BackToTop />
    </>
  );
};

export default ForgetPasswordPage;
