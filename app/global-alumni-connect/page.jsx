import BackToTop from "@/app/backToTop";
import GlobalAlumniConnect from "./(global-alumni-connect)";

export const metadata = {
  title: "Karpagam College of Engineering - Global Alumni Connect",
  description:
    "Meet Karpagam College of Engineering alumni connecting and leading across the world.",
};

const GlobalAlumniConnectPage = () => (
  <>
    <GlobalAlumniConnect />
    <BackToTop />
  </>
);

export default GlobalAlumniConnectPage;
