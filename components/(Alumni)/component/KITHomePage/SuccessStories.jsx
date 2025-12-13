import TestimonialData from "../../../../data/elements/testimonial.json";
import Scroll from "../../../Testimonials/Testimonial-Scroll/Scroll";
// import Scroll from "./Testimonial-Scroll/Scroll";

const SuccessStories = ({ tag }) => {
  return (
    <>
      <div className="col-xl-9">
        <div className="overflow-hidden">
          <Scroll
            testimonial={TestimonialData}
            testimonialData={TestimonialData.testimonialTwo}
          />
        </div>
      </div>
    </>
  );
};

export default SuccessStories;
