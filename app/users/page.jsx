import BackToTop from "@/app/backToTop";
import Users from "./(users)";


export const metadata = {
  title: "Karpagam Institute of Technology - Dashboard",
  description: "Online Courses & Education NEXTJS14 Template",
};

const UsersPage = () => {
  return (
    <>
      <Users />
      <BackToTop />
    </>
  );
};

export default UsersPage;
