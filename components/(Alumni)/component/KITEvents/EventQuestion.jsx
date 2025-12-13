// import React, { useState } from "react";

// const MAX_QUESTIONS_TOTAL = 10;

// const DynamicQuestionManager = ({
//   questions,
//   addQuestions,
//   updateInputChange,
//   defaultQuestions,
//   questionErrors,
// }) => {
//   const [errors, setErrors] = useState({});

//   const addQuestion = (questionId) => {
//     if (questions.length >= MAX_QUESTIONS_TOTAL) {
//       alert(`You can only add up to ${MAX_QUESTIONS_TOTAL} questions.`);
//       return;
//     }

//     if (questionId === "custom") {
//       addQuestions({
//         id: Date.now(),
//         question: "",
//         help_text: "",
//         options: "",
//         is_faq: false,
//       });
//     } else {
//       const selectedQuestion = defaultQuestions.find(
//         (q) => q.id === questionId
//       );
//       if (selectedQuestion) {
//         addQuestions({ ...selectedQuestion });
//       }
//     }
//   };

//   const handleInputChange = (index, field, value) => {
//     const updatedQuestions = questions.map((q, i) =>
//       i === index ? { ...q, [field]: value } : q
//     );
//     updateInputChange(updatedQuestions);

//     if (field === "options") {
//       const updatedErrors = { ...errors };
//       if (!value.trim()) {
//         updatedErrors[`options-${index}`] = "Options field is required.";
//       } else {
//         delete updatedErrors[`options-${index}`];
//       }
//       setErrors(updatedErrors);
//     }
//   };

//   const handleDelete = (index) => {
//     const updatedQuestions = questions.filter((_, i) => i !== index);
//     updateInputChange(updatedQuestions);

//     const updatedErrors = { ...errors };
//     delete updatedErrors[`options-${index}`];
//     setErrors(updatedErrors);
//   };

//   return (
//     <div>
//       {questions?.length > 0 &&
//         questions.map((q, index) => (
//           <EventQuestion
//             key={q.id}
//             index={index}
//             data={q}
//             handleInputChange={handleInputChange}
//             handleDelete={handleDelete}
//             questionError={questionErrors?.length > 0 && questionErrors[index]}
//           />
//         ))}
//       <div
//         style={{
//           display: "flex",
//         //   flexDirection:"column",
//           flexWrap: "wrap",
//           gap: "5px",
//           marginTop: "20px",

//         }}
//       >
//         {defaultQuestions?.map((q) => (
//           <button
//             key={q.id}
//              type="button"
//             style={{
//               padding: "5px 20px",
//               borderRadius: "5px",
//               backgroundColor: "#005385",
//               color: "white",
//               cursor: "pointer",
//               fontSize: "14px",
//               border:"none",

//             }}
//             onClick={() => addQuestion(q.id)}
//           >
//             {q?.question}
//           </button>
//         ))}

//         <button
//          type="button"
//           style={{
//             padding: "5px 20px",
//             borderRadius: "5px",
//             backgroundColor: "transparent",
//             color: "#005385",
//             cursor: "pointer",
//             fontSize: "14px",
//             border:"1px solid #005385",

//           }}
//           onClick={() => addQuestion("custom")}
//         >
//           Add a custom question
//         </button>
//       </div>
//     </div>
//   );
// };

// const EventQuestion = ({
//   index,
//   data,
//   handleInputChange,
//   handleDelete,
//   questionError,
// }) => {
//   console.log("✌️questionError --->", questionError);

//   return (
//     <div style={{ border: "0.5px solid #ccc", marginBottom: "10px", borderRadius:"5px" }}>
//       <div
//         style={{
//           height: "40px",
//           backgroundColor: "#005385",
//           color: "white",
//           paddingLeft: "10px",
//           alignItems: "center",
//           display: "flex",
//           justifyContent: "space-between",
//         }}
//       >
//         <label>Custom Question</label>
//         <button
//           style={{
//             background: "transparent",
//             color: "white",
//             border: "none",
//             padding: "5px 10px",
//             cursor: "pointer",
//           }}
//           onClick={() => handleDelete(index)}
//         >
//           <i className="feather-trash"> </i>
//         </button>
//       </div>
//       <div style={{ padding: "10px" }}>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Question</label>
//           <FormField
//             type="text"
//             name={`question-${index}`}
//             onChange={(e) =>
//               handleInputChange(index, "question", e.target.value)
//             }
//             value={data.question}
//           />
//           {questionError && (
//             <div style={{ color: "red", fontSize: "12px" }}>
//               {questionError}
//             </div>
//           )}
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Help Text</label>
//           <FormField
//             type="text"
//             name={`help_text-${index}`}
//             onChange={(e) =>
//               handleInputChange(index, "help_text", e.target.value)
//             }
//             value={data.help_text}
//           />
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Options</label>
//           <FormField
//             type="text"
//             name={`options-${index}`}
//             onChange={(e) =>
//               handleInputChange(index, "options", e.target.value)
//             }
//             value={data.options}
//           />
//           <div>
//             Use comma(,) to seperated options, leave blank for user to input a
//             value.
//           </div>
//         </div>
//         <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
//           <label>Is Mandatory?</label>
//           <label>
//             <input
//               type="radio"
//               name={`is_faq-${index}`}
//               value={true}
//               checked={data.is_faq === true}
//               onChange={(e) =>
//                 handleInputChange(index, "is_faq", e.target.value === "true")
//               }
//             />
//             Yes
//           </label>
//           <label>
//             <input
//               type="radio"
//               name={`is_faq-${index}`}
//               value={false}
//               checked={data.is_faq === false}
//               onChange={(e) =>
//                 handleInputChange(index, "is_faq", e.target.value === "true")
//               }
//             />
//             No
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// const FormField = ({ type, name, onChange, value }) => (
//   <input
//     type={type}
//     name={name}
//     onChange={onChange}
//     value={value || ""}
//     style={{
//       width: "100%",
//       padding: "8px",
//       marginBottom: "5px",
//       borderRadius: "5px",
//       border: "1px solid #ccc",
//     }}
//   />
// );

// export default DynamicQuestionManager;

import React, { useState } from "react";

const MAX_QUESTIONS_TOTAL = 10;

const DynamicQuestionManager = ({
  questions,
  addQuestions,
  updateInputChange,
  defaultQuestions,
  questionErrors,
}) => {
  const [errors, setErrors] = useState({});

  const addQuestion = (questionId) => {
    if (questions.length >= MAX_QUESTIONS_TOTAL) {
      alert(`You can only add up to ${MAX_QUESTIONS_TOTAL} questions.`);
      return;
    }

    if (questionId === "custom") {
      addQuestions({
        id: Date.now(),
        question: "",
        help_text: "",
        options: "",
        is_faq: false,
      });
    } else {
      const selectedQuestion = defaultQuestions.find(
        (q) => q.id === questionId
      );
      if (selectedQuestion) {
        addQuestions({ ...selectedQuestion });
      }
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    );
    updateInputChange(updatedQuestions);

    if (field === "options") {
      const updatedErrors = { ...errors };
      if (!value.trim()) {
        updatedErrors[`options-${index}`] = "Options field is required.";
      } else {
        delete updatedErrors[`options-${index}`];
      }
      setErrors(updatedErrors);
    }
  };

  const handleDelete = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    updateInputChange(updatedQuestions);

    const updatedErrors = { ...errors };
    delete updatedErrors[`options-${index}`];
    setErrors(updatedErrors);
  };

  return (
    <div>
      {questions?.length > 0 &&
        questions.map((q, index) => (
          <EventQuestion
            key={q.id}
            index={index}
            data={q}
            handleInputChange={handleInputChange}
            handleDelete={handleDelete}
            questionError={questionErrors?.length > 0 && questionErrors[index]}
          />
        ))}

      {/* Buttons Section */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {defaultQuestions?.map((q) => (
          <button
            key={q.id}
            type="button"
            style={{
              padding: "10px 20px",
              borderRadius: "25px",
              backgroundColor: "#005385",
              color: "white",
              cursor: "pointer",
              fontSize: "14px",
              border: "none",
              boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#0070b8")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#005385")
            }
            onClick={() => addQuestion(q.id)}
          >
            {q?.question}
          </button>
        ))}

        <button
          type="button"
          style={{
            padding: "10px 20px",
            borderRadius: "25px",
            backgroundColor: "transparent",
            color: "#005385",
            cursor: "pointer",
            fontSize: "14px",
            border: "1.5px solid #005385",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#005385";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#005385";
          }}
          onClick={() => addQuestion("custom")}
        >
          + Add a custom question
        </button>
      </div>
    </div>
  );
};

const EventQuestion = ({
  index,
  data,
  handleInputChange,
  handleDelete,
  questionError,
}) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        marginBottom: "15px",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      {/* Header */}
      <div
        style={{
          height: "45px",
          backgroundColor: "#005385",
          color: "white",
          padding: "0 15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontWeight: "500",
          fontSize: "15px",
        }}
      >
        <span>Custom Question</span>
        <button
          style={{
            background: "transparent",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={() => handleDelete(index)}
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: "15px" }}>
        <Field
          label="Question"
          value={data.question}
          onChange={(e) => handleInputChange(index, "question", e.target.value)}
          error={questionError}
        />

        <Field
          label="Help Text"
          value={data.help_text}
          onChange={(e) =>
            handleInputChange(index, "help_text", e.target.value)
          }
        />

        <Field
          label="Options"
          value={data.options}
          onChange={(e) => handleInputChange(index, "options", e.target.value)}
          helper="Use comma(,) to separate options, leave blank for user input."
        />

        <div
          className="rbt-check-group"
          style={{ display: "flex", gap: "15px", alignItems: "center" }}
        >
          <label style={{ fontWeight: "500" }}>Is Mandatory?</label>
          <input
            type="radio"
            
            name={`is_faq-${index}`}
            value="true"
            checked={data.is_faq === true}
            onChange={() => handleInputChange(index, "is_faq", true)}
          />
          <label > Yes</label>
          <input
            type="radio"
            
           name={`is_faq-${index}`}
            value="false"
            checked={data.is_faq === false}
            onChange={() => handleInputChange(index, "is_faq", false)}
          />{" "}
          <label >No</label>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange, error, helper }) => (
  <div style={{ marginBottom: "15px" }}>
    <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
      {label}
    </label>
    <input
      type="text"
      value={value || ""}
      onChange={onChange}
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "6px",
        border: error ? "1px solid red" : "1px solid #ccc",
        outline: "none",
        fontSize: "14px",
      }}
    />
    {error && <div style={{ color: "red", fontSize: "12px" }}>{error}</div>}
    {helper && <div style={{ fontSize: "12px", color: "#666" }}>{helper}</div>}
  </div>
);

export default DynamicQuestionManager;
