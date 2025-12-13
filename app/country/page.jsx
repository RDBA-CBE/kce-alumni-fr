import BackToTop from "@/app/backToTop";
import IndustryType from "./(country)";
import Locations from "./(country)";
import Country from "./(country)";


export const metadata = {
  title: "Karpagam College Of Engineering - Country",
  description: "Online Courses & Education NEXTJS14 Template",
};

const CountryPage = () => {
  return (
    <>
      <Country />
      <BackToTop />
    </>
  );
};

export default CountryPage;
