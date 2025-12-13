import * as yup from "yup";

export const createEvent = yup.object().shape({
  title: yup.string().required("Title is required"),
  category: yup.string().required("Category is required"),
  start_date: yup.string().required("Start date is required"),
  // start_time: yup.string().required("Start time is required"),
  venue: yup.string().required("Venue is required"),
  address: yup.string().required("Address is required"),
  link: yup.string().required("Link is required").url("Must be a valid URL"),
  is_public: yup.string().required("Visibility is required"),
  need_registration: yup.string().required("Registration is required"),
  registration_close_date: yup
    .string()
    .required("Registration close date is required"),
  description: yup.string().required(),
  event_wallpaper: yup.mixed().required("Event wallpaper is required"),
  instructions: yup.string().nullable(),
  event_question: yup.array().of(
    yup.object().shape({
      question: yup.string().required("Question is required"),
      // Add other fields inside question object if needed
    })
  ),
});

export const updateEvent = yup.object().shape({
  title: yup.string().required("Title is required"),
  category: yup.string().required("Category is required"),
  start_date: yup.string().required("Start date is required"),
  // start_time: yup.string().required("Start time is required"),
  venue: yup.string().required("Venue is required"),
  address: yup.string().required("Address is required"),
  link: yup.string().required("Link is required").url("Must be a valid URL"),
  is_public: yup.string().required("Visibility is required"),
  need_registration: yup.string().required("Registration is required"),
  registration_close_date: yup
    .string()
    .required("Registration close date is required"),
  description: yup.string().required(),
  instructions: yup.string().nullable(),
  event_question: yup.array().of(
    yup.object().shape({
      question: yup.string().required("Question is required"),
      // Add other fields inside question object if needed
    })
  ),
});

export const registerEvent = yup.object().shape({
  question_id: yup.string().required("Question Id is required"),
  response: yup.string().required("response is required"),
});

export const registerUser = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  mobile_no: yup.string().required("Mobile No is required"),
});

export const chapterValidate = yup.object().shape({
  name: yup
    .string()
    .required("Chapter name is required"),
  description : yup
    .string()
    .required("Description is required"),
    
  country_id: yup.string().required("Country No is required"),
});

export const userValidate = yup.object().shape({
  users: yup
    .array()
    .required("Users  is required"),
 
});
