import BackToTop from "@/app/backToTop";
import SignIn from "./(signin)";

export const metadata = {
  title: "Login & Register - Karpagam College Of Engineering",
  description: "Online Courses & Education NEXTJS14 Template",
};

const SignInPage = () => {
  return (
    <>
      <SignIn />
      <BackToTop />
    </>
  );
};

export default SignInPage;
