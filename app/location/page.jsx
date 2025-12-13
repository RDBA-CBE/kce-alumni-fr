import BackToTop from "@/app/backToTop";
import IndustryType from "./(location)";
import Locations from "./(location)";


export const metadata = {
  title: "Karpagam Institute of Technology - Location",
  description: "Online Courses & Education NEXTJS14 Template",
};

const LocationPage = () => {
  return (
    <>
      <Locations />
      <BackToTop />
    </>
  );
};

export default LocationPage;
