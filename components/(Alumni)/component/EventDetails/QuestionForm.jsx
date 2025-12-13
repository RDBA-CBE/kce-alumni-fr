// pages/register-event/[eventId].tsx
'use client';

import React from 'react';



const QuestionForm = ({ data, responses, setResponses, otherInputs, setOtherInputs }) => {
  // const Colors = useTheme();

  const handleOptionSelect = (questionId, selectedOption) => {
    setResponses((prev) => ({ ...prev, [questionId]: selectedOption }));
    setOtherInputs((prev) => ({ ...prev, [questionId]: '' }));
  };

  const handleOtherChange = (questionId, text) => {
    setOtherInputs((prev) => ({ ...prev, [questionId]: text }));
  };

  return (
    <div
      className="p-3 rounded rbt-shadow-box"
      style={{
        // backgroundColor: Colors.white,
        
        width: '100%',
      }}
    >
      <h5 style={{  marginBottom: '0.25rem' }}>
        {data.question} <span style={{color:"red"}}>{data.question.is_faq === true && '*'}</span>
      </h5>
      <p className="text-muted mb-3">{data.help_text}</p>

      {[...data.options.map((o) => o.name), 'Others'].map((option) => {
        const selected = responses[data.id] === option;
        return (
          <div
            className="d-flex align-items-center mb-2 "
            key={option}
            role="button"
            onClick={() => handleOptionSelect(data.id, option)}
            style={{ cursor: 'pointer' }}
          >
            <div
              className="me-2 d-flex align-items-center justify-content-center"
              style={{
                height: '20px',
                width: '20px',
                borderRadius: '50%',
                border: `1.5px solid ${selected ? "green" : '#aaa'}`,
              }}
            >
              {selected && (
                <div
                  style={{
                    height: '10px',
                    width: '10px',
                    borderRadius: '50%',
                    backgroundColor: "green",
                  }}
                />
              )}
            </div>
            <span
              style={{
                fontSize: '15px',
                color: selected ? "green" : '#333',
                
              }}
            >
              {option}
            </span>
          </div>
        );
      })}

      {responses[data.id] === 'Others' && (
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Please specify"
          style={{ fontSize: '14px', height: '45px' }}
          value={otherInputs[data.id] || ''}
          onChange={(e) => handleOtherChange(data.id, e.target.value)}
        />
      )}
    </div>
  );
};

export default QuestionForm;

