import BackToTop from "@/app/backToTop";
import CreateMember from "./(create-member)";


export const metadata = {
  title: "Karpagam College Of Engineering - Create Member",
  description: "Online Courses & Education NEXTJS14 Template",
};

const UsersPage = () => {
  return (
    <>
      <CreateMember />
      <BackToTop />
    </>
  );
};

export default UsersPage;
