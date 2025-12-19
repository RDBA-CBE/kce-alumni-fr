import Link from "next/link";
import Image from "next/image";

import useCategoryCount from "@/context/useCategoryCount";

import AlumniConnect from "./AlumniConnect";

const Connect = () => {
 

  const CourseDetails = [
    {
      category:"Success Stories",
      cateBigImg:"/images/category/image/2.jpg"
    },
    {
      category:"President Message",
      cateBigImg:"/images/category/image/3.jpg"
    },
    {
      category:"Business Directory",
      cateBigImg:"/images/category/image/4.jpg"
    },
    {
      category:"Be a Mentor",
      cateBigImg:"/images/category/image/1.jpg"
    },
  ]

   const { categoryCounts } = useCategoryCount(CourseDetails);

  return (
    <>
      {CourseDetails &&
        CourseDetails.map((item, innerIndex) => {
          const count = categoryCounts[item.category] || 0;

          return (
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 " key={innerIndex} >
              <Link
                className="rbt-cat-box rbt-cat-box-1 image-overlaping-content on-hover-content-visible"
                href={`/`}
                // course-filter-one-toggle/${item.category}
              >
                <div className="inner">
                  <div className="thumbnail">
                    <Image
                      src={item.cateBigImg}
                      width={300}
                      height={300}
                      
                      alt="Icons Images"
                    />
                  </div>
                  <div className="content">
                    <h5 className="title">{item.category}</h5>
                    <div className="read-more-btn">
                      <span className="rbt-btn-link">
                        {/* {count} Course{count !== 1 ? "s" : ""}
                        <i className="feather-arrow-right"></i> */}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              
            </div>
          );
        })}

        {/* <div className="px-3">
           <AlumniConnect/>
        </div> */}

       
    </>
  );
};

export default Connect;
