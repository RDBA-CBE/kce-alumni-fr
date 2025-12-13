import React from "react";
import DatePicker from "react-date-picker";
// import "react-date-picker/dist/DatePicker.css";
// import "react-calendar/dist/Calendar.css";

const DatePickerField = ({ label, value, onChange, required = false, error }) => {
  return (
    <div className="mb-3">
      {label && (
        <label className="form-label fw-bold">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <DatePicker
        onChange={onChange}
        value={value}
        format="dd/MM/yyyy"
        // className="form-control"
        clearIcon={null}
        calendarIcon={null}
        className="applicant-input w-full"
      />
      {error && <div className="text-danger small">{error}</div>}
    </div>
  );
};

export default DatePickerField;
