export const menus = {
  guest: [
    { label: "About Us", href: "/about" },
    { label: "Newsroom", href: "/newsroom" },
    { label: "Members", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
    // { label: "Chapters", href: "/chapters" },
  ],
  user: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Members", href: "/members" },
    { label: "Business Directory", href: "/business-directory" },
    { label: "Gallery", href: "/gallery" },
    { label: "Events", href: "/events" },
    // { label: "Chapters", href: "/chapters" },
    // { label: "Change Password", href: "/change-password" },
  ],
  alumni: [
    { label: "Dashboard", href: "/dashboard" },
    
    { label: "Members", href: "/members" },
    { label: "Job Board", href: "/job-board" },
    { label: "Business Directory", href: "/business-directory" },
    { label: "Help Desk", href: "/help-desk" },
    { label: "Gallery", href: "/gallery" },
    { label: "Events", href: "/events" },
    { label: "Profile", href: "/edit-basic-profile" },
    { label: "Chapters", href: "/chapters" },
    // { label: "Change Password", href: "/change-password" },
  ],
  faculty: [
    { label: "Dashboard", href: "/dashboard" },
    // { label: "Home", href: "/home" },
    { label: "Members", href: "/members" },
    { label: "Job Board", href: "/job-board" },
    { label: "Business Directory", href: "/business-directory" },
    { label: "Help Desk", href: "/help-desk/all-support-tickets" },
    { label: "Gallery", href: "/gallery" },
    { label: "Events", href: "/events" },
    { label: "Chapters", href: "/chapters" },
    // { label: "Change Password", href: "/change-password" },
  ],
  admin: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Admin", href: "/users" },
    { label: "Members", href: "/members" },
    { label: "Job Board", href: "/job-board" },
    { label: "Business Directory", href: "/business-directory" },
    { label: "Help Desk", href: "/help-desk/all-support-tickets" },
    { label: "Gallery", href: "/gallery" },
    { label: "Events", href: "/events" },
    { label: "Chapters", href: "/chapters" },
    // { label: "Change Password", href: "/change-password" },
  ],
  alumniManager: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Admin", href: "/users" }, // same as admin
    { label: "Members", href: "/members" },
    { label: "Job Board", href: "/job-board" },
    { label: "Business Directory", href: "/business-directory" },
    { label: "Help Desk", href: "/help-desk/all-support-tickets" },
    { label: "Gallery", href: "/gallery" },
    { label: "Events", href: "/events" },
    { label: "Chapters", href: "/chapters" },
    // { label: "Change Password", href: "/change-password" },
  ],
};

export const welness_data = [
  {
    id: 1,
    img: "https://github.com/shadcn.png",
    title: "Yoga",
    price: "20000",
    duration: "30 Days",
    lounge_type: "Online",
    opening_date: "09-12-2024",
    closing_date: "20-02-2025",
    status: "Publish",
  },
  {
    id: 2,
    img: "https://github.com/shadcn.png",
    title: "Pilates",
    price: 25000,
    duration: "45 Days",
    lounge_type: "Offline",
    opening_date: "15-01-2025",
    closing_date: "28-02-2025",
    status: "Draft",
  },
  {
    id: 3,
    img: "https://github.com/shadcn.png",
    title: "Zumba",
    price: 18000,
    duration: "30 Days",
    lounge_type: "Online",
    opening_date: "10-03-2025",
    closing_date: "10-04-2025",
    status: "Publish",
  },
  {
    id: 4,
    img: "https://github.com/shadcn.png",
    title: "CrossFit",
    price: 30000,
    duration: "60 Days",
    lounge_type: "Offline",
    opening_date: "05-02-2025",
    closing_date: "05-04-2025",
    status: "Publish",
  },
  {
    id: 5,
    img: "https://github.com/shadcn.png",
    title: "Meditation",
    price: 15000,
    duration: "20 Days",
    lounge_type: "Online",
    opening_date: "12-04-2025",
    closing_date: "02-05-2025",
    status: "Draft",
  },
  {
    id: 6,
    img: "https://github.com/shadcn.png",
    title: "Strength Training",
    price: 28000,
    duration: "50 Days",
    lounge_type: "Offline",
    opening_date: "20-03-2025",
    closing_date: "08-05-2025",
    status: "Publish",
  },
  {
    id: 7,
    img: "https://github.com/shadcn.png",
    title: "Aerobics",
    price: 19000,
    duration: "30 Days",
    lounge_type: "Online",
    opening_date: "25-02-2025",
    closing_date: "27-03-2025",
    status: "Publish",
  },
  {
    id: 8,
    img: "https://github.com/shadcn.png",
    title: "Kickboxing",
    price: 22000,
    duration: "40 Days",
    lounge_type: "Offline",
    opening_date: "10-05-2025",
    closing_date: "20-06-2025",
    status: "Draft",
  },
  {
    id: 9,
    img: "https://github.com/shadcn.png",
    title: "Bodybuilding",
    price: 35000,
    duration: "70 Days",
    lounge_type: "Offline",
    opening_date: "01-06-2025",
    closing_date: "10-08-2025",
    status: "Publish",
  },
  {
    id: 10,
    img: "https://github.com/shadcn.png",
    title: "Cycling",
    price: 17000,
    duration: "25 Days",
    lounge_type: "Online",
    opening_date: "15-07-2025",
    closing_date: "10-08-2025",
    status: "Publish",
  },
];

export const categories_data = [
  {
    id: 1,
    img: "https://github.com/shadcn.png",
    name: "Yoga",
    parent_category: "Wellness",
    description: "lorem",
    wellness_lounge: "5",
    status: "Publish",
  },
  {
    id: 2,
    img: "https://github.com/shadcn.png",
    name: "Pilates",
    parent_category: "Fitness",
    description: "lorem",
    wellness_lounge: "3",
    status: "Publish",
  },
  {
    id: 3,
    img: "https://github.com/shadcn.png",
    name: "Meditation",
    parent_category: "Mindfulness",
    description: "lorem",
    wellness_lounge: "4",
    status: "Publish",
  },
  {
    id: 4,
    img: "https://github.com/shadcn.png",
    name: "Nutrition",
    parent_category: "Wellness",
    description: "lorem",
    wellness_lounge: "2",
    status: "Publish",
  },
  {
    id: 5,
    img: "https://github.com/shadcn.png",
    name: "Mental Health",
    parent_category: "Mindfulness",
    description: "lorem",
    wellness_lounge: "6",
    status: "Publish",
  },
  {
    id: 6,
    img: "https://github.com/shadcn.png",
    name: "Strength Training",
    parent_category: "Fitness",
    description: "lorem",
    wellness_lounge: "7",
    status: "Publish",
  },
  {
    id: 7,
    img: "https://github.com/shadcn.png",
    name: "Massage Therapy",
    parent_category: "Relaxation",
    description: "lorem",
    wellness_lounge: "5",
    status: "Publish",
  },
  {
    id: 8,
    img: "https://github.com/shadcn.png",
    name: "Aromatherapy",
    parent_category: "Relaxation",
    description: "lorem",
    wellness_lounge: "3",
    status: "Publish",
  },
  {
    id: 9,
    img: "https://github.com/shadcn.png",
    name: "Reiki",
    parent_category: "Energy Healing",
    description: "lorem",
    wellness_lounge: "4",
    status: "Publish",
  },
  {
    id: 10,
    img: "https://github.com/shadcn.png",
    name: "Acupuncture",
    parent_category: "Alternative Therapy",
    description: "lorem",
    wellness_lounge: "2",
    status: "Publish",
  },
];

export const orderStatusList = [
  {
    label: "Pending",
    value: "Pending",
  },
  {
    label: "Completed",
    value: "Completed",
  },
  {
    label: "Failed",
    value: "Failed",
  },
];

export const mentorList = [
  {
    label: "Yes",
    value: "Yes",
  },
  {
    label: "No",
    value: "No",
  },
];

export const ROLE = [
  {
    name: "Student Registration",
    value: "student",
  },
  {
    name: "Alumni Registration",
    value: "alumni",
  },
];

export const GENDER = [
  {
    label: "Male",
    value: "1",
  },
  {
    label: "Female",
    value: "2",
  },
  {
    label: "Others",
    value: "3",
  },
];

export const TeamData = [
    {
      img: "/images/team/team-07.jpg",
      isLarge: false,
      isActive: false,
      details: [
        {
          img: "/images/team/team-07.jpg",
          name: "Irma J. Erwin",
          type: "English Teacher",
          location: "CO Miego, AD,USA",
          desc: "You can run Histudy easily. Any School, University, College can be use this histudy education template for their educational purpose. A university can be success you.",
          descTwo:
            "You can run Histudy easily. Any School, University, College can be use this histudy education template for their educational purpose. A university can be success you.",
          phone: "+1-202-555-0174",
          email: "example@gmail.com",
        },
      ],
    },
    {
      img: "/images/team/team-08.jpg",
      isLarge: false,
      isActive: false,
      details: [
        {
          img: "/images/team/team-08.jpg",
          name: "John Due",
          type: "English Teacher",
          location: "CO Miego, AD,USA",
          desc: "You can run Histudy easily. Any School, University, College can be use this histudy education template for their educational purpose. A university can be success you.",
          descTwo:
            "You can run Histudy easily. Any School, University, College can be use this histudy education template for their educational purpose. A university can be success you.",
          phone: "+1-202-555-0174",
          email: "example@gmail.com",
        },
      ],
    },
    {
      img: "/images/team/team-09.jpg",
      isLarge: false,
      isActive: false,
      details: [
        {
          img: "/images/team/team-09.jpg",
          name: "Joo Bieden",
          type: "English Teacher",
          location: "CO Miego, AD,USA",
          desc: "You can run Histudy easily. Any School, University, College can be use this histudy education template for their educational purpose. A university can be success you.",
          descTwo:
            "You can run Histudy easily. Any School, University, College can be use this histudy education template for their educational purpose. A university can be success you.",
          phone: "+1-202-555-0174",
          email: "example@gmail.com",
        },
      ],
    },
    {
      img: "/images/team/team-10.jpg",
      isLarge: false,
      isActive: false,
      details: [
        {
          img: "/images/team/team-10.jpg",
          name: "Alejandro",
          type: "English Teacher",
          location: "CO Miego, AD,USA",
          desc: "You can run Histudy easily. Any School, University, College can be use this histudy education template for their educational purpose. A university can be success you.",
          descTwo:
            "You can run Histudy easily. Any School, University, College can be use this histudy education template for their educational purpose. A university can be success you.",
          phone: "+1-202-555-0174",
          email: "example@gmail.com",
        },
      ],
    },
    {
      img: "/images/team/team-07.jpg",
      isLarge: false,
      isActive: false,
      details: [
        {
          img: "/images/team/team-07.jpg",
          name: "Irma J. Erwin",
          type: "English Teacher",
          location: "CO Miego, AD,USA",
          desc: "You can run Histudy easily. Any School, University, College can be use this histudy education template for their educational purpose. A university can be success you.",
          descTwo:
            "You can run Histudy easily. Any School, University, College can be use this histudy education template for their educational purpose. A university can be success you.",
          phone: "+1-202-555-0174",
          email: "example@gmail.com",
        },
      ],
    },
    {
      img: "/images/team/team-08.jpg",
      isLarge: false,
      isActive: false,
      details: [
        {
          img: "/images/team/team-08.jpg",
          name: "John Due",
          type: "English Teacher",
          location: "CO Miego, AD,USA",
          desc: "You can run Histudy easily. Any School, University, College can be use this histudy education template for their educational purpose. A university can be success you.",
          descTwo:
            "You can run Histudy easily. Any School, University, College can be use this histudy education template for their educational purpose. A university can be success you.",
          phone: "+1-202-555-0174",
          email: "example@gmail.com",
        },
      ],
    },
    {
      img: "/images/team/team-09.jpg",
      isLarge: false,
      isActive: false,
      details: [
        {
          img: "/images/team/team-09.jpg",
          name: "Joo Bieden",
          type: "English Teacher",
          location: "CO Miego, AD,USA",
          desc: "You can run Histudy easily. Any School, University, College can be use this histudy education template for their educational purpose. A university can be success you.",
          descTwo:
            "You can run Histudy easily. Any School, University, College can be use this histudy education template for their educational purpose. A university can be success you.",
          phone: "+1-202-555-0174",
          email: "example@gmail.com",
        },
      ],
    },
    {
      img: "/images/team/team-10.jpg",
      isLarge: false,
      isActive: false,
      details: [
        {
          img: "/images/team/team-10.jpg",
          name: "Alejandro",
          type: "English Teacher",
          location: "CO Miego, AD,USA",
          desc: "You can run Histudy easily. Any School, University, College can be use this histudy education template for their educational purpose. A university can be success you.",
          descTwo:
            "You can run Histudy easily. Any School, University, College can be use this histudy education template for their educational purpose. A university can be success you.",
          phone: "+1-202-555-0174",
          email: "example@gmail.com",
        },
      ],
    },
  ];

  export const jobTypeOption = [
  {
    value: "Job",
    label: "Job",
  },
  {
    value: "Internship",
    label: "Internship",
  },
];


export const Gallerydata = [
  {
    id: 1,
    src: "/assets/images/kce/pic-1.jpg",
  },
  {
    id: 2,
    src: "/assets/images/kce/pic-2.jpg",
  },
  {
    id: 3,
    src: "/assets/images/kce/pic-3.jpg",
  },
  {
    id: 4,
    src: "/assets/images/kce/pic-4.jpg",
  },
  {
    id: 5,
    src: "/assets/images/kce/pic-5.jpg",
  },
  {
    id: 6,
    src: "/assets/images/kce/pic-6.jpg",
  },
  {
    id: 7,
    src: "/assets/images/kce/pic-7.jpg",
  },
  {
    id: 8,
    src: "/assets/images/kce/pic-8.jpg",
  },
  {
    id: 9,
    src: "/assets/images/kce/pic-9.jpg",
  },
];

export const FilterJobBoard = [
  {
    id: 1,
    title: "Department",
    link: "/department",
  },
  {
    id: 2,
    icon: "fa fa-users",
    title: "Designation",
    link: "/role",
  },
  // {
  //   id: 3,
  //   icon: "fa fa-users",
  //   title: "Sourced From Partner Network",
  // },
  // {
  //   id: 4,
  //   icon: "fa fa-user",
  //   title: "Internships",
  // },
  // {
  //   id: 5,
  //   icon: "fa fa-briefcase",
  //   title: "Jobs Areas",
  //   subfilter: {
  //     title: [
  //       "Client Management",
  //       "AI",
  //       "ML",
  //       "Computer Vision Engineer",
  //       "SAAS",
  //     ],
  //   },
  // },
  // {
  //   id: 6,
  //   icon: "fa fa-briefcase",
  //   title: "Locations",
  //   subfilter: {
  //     title: ["Hyderabad", "Bangalore", "Mumbai", "Work From Home", "Remote"],
  //   },
  // },
];

export const JobBoard = [
  {
    id: 1,
    title: "Relationship Manager",
    date: "3 days ago",
    company: "Vaave",
    location: "Hyderabad (In Office Only)",
    jobArea: "Client Management",
    skills: "Listening Skills, Excelent Communication, Customer Experience",
    sourced: "SOURCED FROM PARTNER NETWORK",
  },
  {
    id: 2,
    title: "ML /AI Engineer",
    date: "6 days ago",
    company: "OneRoot",
    location: "Bangalore",
    jobArea: "AI , ML",
    skills: "Python, tensorFlow, PyTorch",
    sourced: "SOURCED FROM PARTNER NETWORK",
  },
  {
    id: 3,
    title: "Computer Vision Engineer",
    date: "6 days ago",
    company: "OneRoot",
    location: "Bangalore",
    jobArea: "Computer Vision Engineer",
    skills: "tensorFlow, PyTorch, OpenCV, Python, c++",
    sourced: "SOURCED FROM PARTNER NETWORK",
  },
  {
    id: 4,
    title: "Full Stack Developer",
    date: "24 days ago",
    company: "OneRoot",
    location: "Bangalore, Karnataka (On-Site)",
    jobArea: "Information Technology / Software",
    skills: "React.js, React Native, Node.js, ES6, Typescript, Angular",
    sourced: "SOURCED FROM PARTNER NETWORK",
  },
];

export const YearOfExperience = [
  {
    id: 1,
    value: 0,
    label: 0,
  },
  {
    id: 2,
    value: 1,
    label: 1,
  },
  {
    id: 3,
    value: 2,
    label: 2,
  },
  {
    id: 4,
    value: 3,
    label: 3,
  },
  {
    id: 5,
    value: 4,
    label: 4,
  },
  {
    id: 6,
    value: 5,
    label: 5,
  },
  {
    id: 7,
    value: 6,
    label: 6,
  },
  {
    id: 8,
    value: 7,
    label: 7,
  },
  {
    id: 9,
    value: 8,
    label: 8,
  },
  {
    id: 10,
    value: 9,
    label: 9,
  },
  {
    id: 11,
    value: 10,
    label: 10,
  },
];

export const convertUrlToFile = async (url, filename) => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch. Status: ${response.status}`);
    }

    const blob = await response.blob(); // Convert response to a Blob
    console.log("✌️ Blob fetched successfully!");

    // Get MIME type from the blob response
    const mimeType = blob.type || 'image/jpeg'; // Fallback to 'image/jpeg' if MIME type is not available

    // Ensure the filename has the correct extension based on MIME type
    if (!filename.includes(".")) {
      const extension = mimeType.split("/")[1]; // Extract the extension (e.g., 'jpeg' from 'image/jpeg')
      filename = `${filename}.${extension}`;
    }

    console.log("✌️ Returning file: ", filename);

    return new File([blob], filename, { type: mimeType });
  } catch (error) {
    console.error("Error fetching or converting URL to file:", error);
    throw error; // Rethrow the error to handle it further if needed
  }
};

export const convertAllUrlToFile = async (url, filename) => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      console.log('claa')
      throw new Error(`Failed to fetch. Status: ${response.status}`);
    }

    const blob = await response.blob();
    console.log("✌️ Blob fetched successfully!");

    // Get MIME type from the response headers if available
    const contentType = response.headers.get('content-type');
    const mimeType = contentType || blob.type || 'application/octet-stream';

    // Extract filename from URL if not provided
    if (!filename) {
      const urlObj = new URL(url);
      filename = urlObj.pathname.split("/").pop();
      
      // If still no filename, generate a random one
      if (!filename) {
        filename = `file-${Date.now()}`;
      }
    }

    // Ensure proper file extension
    if (!filename.includes(".")) {
      let extension = 'bin'; // default extension
      
      if (mimeType === 'application/pdf') {
        extension = 'pdf';
      } else if (mimeType.startsWith('image/')) {
        extension = mimeType.split('/')[1];
      }
      
      filename = `${filename}.${extension}`;
    }

    console.log("✌️ Converted to file:", { filename, mimeType });
    return new File([blob], filename, { type: mimeType });
  } catch (error) {
    console.error("Error converting URL to file:", error);
    throw error;
  }
};


export const memberType = [
  {
    id: 1,
    name: "Alumni",
  },
  {
    id: 2,
    name: "Faculty",
  },
];

export const IndustryTypeOption = [
  {
    value: 1,
    label: "industry-1",
  },
  {
    value: 2,
    label: "industry-2",
  },
];

export const Priority = [
  {
    id: "High",
    name: "High",
  },
  {
    id: "Medium",
    name: "Medium",
  },
  {
    id: "Low",
    name: "Low",
  },
];

export const BloodGroupChooice = [
  {
    id: "A_POSITIVE",
    name: "A+",
  },
  {
    id: "A_NEGATIVE",
    name: "A-",
  },
  {
    id: "B_POSITIVE",
    name: "B+",
  },
  {
    id: "B_NEGATIVE",
    name: "B-",
  },
  {
    id: "AB_POSITIVE",
    name: "AB+",
  },
  {
    id: "AB_NEGATIVE",
    name: "AB-",
  },
  {
    id: "O_POSITIVE",
    name: "O+",
  },
  {
    id: "O_NEGATIVE",
    name: "O-",
  },
];

export const EventsScreen = [
  {
    id: 1,
    image: "/assets/images/kce/events-1.jpg",
    title:
      "One Day Hands-on Workshop on Statistical Discovery For Pharmaceutical Sciences",
    address: "Saturday, 23rd Dec 2023, 10:00 am to 3:00 pm (IST)",
    location: "Campus",
  },
  {
    id: 2,
    image: "/assets/images/kce/events-2.jpg",
    title:
      "Two Days National Conference on Preclinical To Clinical Approach In Neuropharmacology",
    address: "Sunday, 4th Sep 2022, 4:00 pm (IST)",
    location: "Seminar Hall",
  },
  {
    id: 3,
    image: "/assets/images/kce/events-3.jpg",
    title: "International Conference On Developments In Drug Discovery Science",
    address: "Sunday, 8th May 2022, 9:30 am (IST)",
    location: "Seminar Hall",
  },
  {
    id: 4,
    image: "/assets/images/kce/events-1.jpg",
    title: "One Day Hands-on Workshop on Statistical Discovery",
    address: "Sunday, 8th May 2022, 10:30 am (IST)",
    location: "Campus",
  },
];

export const NewsRoomScreen = [
  {
    id: 1,
    image: "/assets/images/kce/events-1.jpg",
    title:
      "One Day Hands-on Workshop on Statistical Discovery For Pharmaceutical Sciences",
    posted_on: "1st Apr, 2024",
    user: "admin",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 2,
    image: "/assets/images/kce/events-2.jpg",
    title:
      "Two Days National Conference on Preclinical To Clinical Approach In Neuropharmacology",
    user: "admin",
    posted_on: "1st Sep, 2023",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 3,
    image: "/assets/images/kce/events-3.jpg",
    title: "International Conference On Developments In Drug Discovery Science",
    user: "admin",
    posted_on: "1st Sep, 2023",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

export const VisibilityPosts = [
  {
    id: 1,
    name: "Registred",
  },
  {
    id: 2,
    name: "Non Registred",
  },
];

export const eventPublicOptions = [
  {
    id: 1,
    value: true,
    label: "Public",
  },
  {
    id: 2,
    value: false,
    label: "Only registered members",
  },
];

export const eventRegistrationOptions = [
  {
    id: 1,
    value: true,
    label: "yes",
  },
  {
    id: 2,
    value: false,
    label: "No",
  },
];

export const registeredMember = [
  {
    name:1,
    label: "Registered",
  },
  {
    name:2,
    label: "Non Registered",
  },
];


export const getFileFormatFromUrl = (url) => {
  const extension = url.split('.').pop().split(/[?#]/)[0].toLowerCase();
  
  const formatMap = {
    // Images
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml',
    
    // Documents
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    
    // Text
    txt: 'text/plain',
    csv: 'text/csv',
    
    // Archives
    zip: 'application/zip',
    rar: 'application/vnd.rar'
  };

  return formatMap[extension] || 'application/octet-stream';
};



