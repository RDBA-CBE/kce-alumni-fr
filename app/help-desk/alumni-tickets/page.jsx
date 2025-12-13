"use client";

import BackToTop from "@/app/backToTop";


import React from "react";

import AllSupportTicketsMain from "@/components/(Alumni)/component/main/AllSupportTicketsMain";

// export const metadata = {
//   title: "Instructor Dashboard - Online Courses & Education NEXTJS14 Template",
//   description: "Online Courses & Education NEXTJS14 Template",
// };

const AlumniTicketsPage = () => {
  return (
    <>
      <AllSupportTicketsMain />

      <BackToTop />
    </>
  );
};

export default AlumniTicketsPage;
