import BackToTop from "@/app/backToTop";
import RemoveAccount from "./(remove-account)";

export const metadata = {
  title: "Request Account Removal – KCE Alumni | Karpagam College of Engineering",
  description:
    "Request deletion of your KCE Alumni mobile app and web portal account and personal information.",
};

const RemoveAccountPage = () => {
  return (
    <>
      <RemoveAccount />
      <BackToTop />
    </>
  );
};

export default RemoveAccountPage;
