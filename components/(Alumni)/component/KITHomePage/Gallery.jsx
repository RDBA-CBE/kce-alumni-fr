"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import "venobox/dist/venobox.min.css";

import GalleryData from "../../../../data/elements/gallery.json";

const GalleryMain = () => {
  useEffect(() => {
    import("venobox/dist/venobox.min.js").then((venobox) => {
      new venobox.default({
        selector: ".child-gallery-single",
        numeration: true,
        infinigall: true,
        spinner: "rotating-plane",
      });
    });
  }, []);
  return (
    <div className="container-fluid">
      <div className="row g-3 parent-gallery-container KITgallery">
      {GalleryData &&
        GalleryData.gallery.slice(1, 7).map((data, index) => (
          <div className="col-lg-2 col-md-4 col-sm-6 col-6" key={index}>
            <div className="instagram-grid">
              <Link
                className="child-gallery-single "
                key={index}
                href={`${data.img}`}
                data-gall="gallery01"
              >
                <div className="rbt-gallery rounded">
                  <Image
                    className="w-100 rounded"
                    src={data.img}
                    width={253}
                    height={274}
                    alt="Gallery Images"
                  />
                </div>

                {/* <span className="user-info">
                  <span className="icon">
                    <i className="icon-instagram"></i>
                  </span>
                  <span className="user-name">Batch 2</span>
                  <div className="gallery-dec">2 Photos</div>
                </span> */}
              </Link>
            </div>
          </div>
        ))}
    </div>
    </div>
    
  );
};

export default GalleryMain;
