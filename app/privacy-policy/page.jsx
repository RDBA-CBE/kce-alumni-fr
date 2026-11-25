import BackToTop from "@/app/backToTop";
import PrivacyPolicy from "./(privacy-policy)";

export const metadata = {
  title: "Privacy Policy – KCE Alumni | Karpagam College of Engineering",
  description:
    "Privacy Policy for KCE Alumni (Karpagam College of Engineering Alumni Association Mobile App).",
};

const PrivacyPolicyPage = () => {
  return (
    <>
      <PrivacyPolicy />
      <BackToTop />
    </>
  );
};

export default PrivacyPolicyPage;
