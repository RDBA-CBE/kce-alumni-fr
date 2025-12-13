import BackToTop from "@/app/backToTop";
import Login from "./(login)";

export const metadata = {
  title: "Login & Register - Karpagam College Of Engineering",
  description: "Online Courses & Education NEXTJS14 Template",
};

const LoginPage = () => {
  return (
    <>
      <Login />
      <BackToTop />
    </>
  );
};

export default LoginPage;
