import BackToTop from "@/app/backToTop";
import RemoveAccount from "@/app/remove-account/(remove-account)";

export const metadata = {
  title: "Delete Account – KCE Alumni | Karpagam College of Engineering",
  description:
    "Request deletion of your KCE Alumni mobile app and web portal account and personal information.",
};

const DeleteAccountPage = () => {
  return (
    <>
      <RemoveAccount />
      <BackToTop />
    </>
  );
};

export default DeleteAccountPage;
