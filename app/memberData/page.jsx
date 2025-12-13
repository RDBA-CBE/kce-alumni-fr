import BackToTop from "@/app/backToTop";
import Member from "./(memberData)";

export const metadata = {
  title: "Login & Register - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const SignInPage = () => {
  return (
    <>
      <Member />
      <BackToTop />
    </>
  );
};

export default SignInPage;
