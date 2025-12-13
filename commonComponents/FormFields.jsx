import React, { useState } from "react";
import CustomSelect from "./Select";

const FormField = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  options,
  className,
  onSubmit,
  accept,
  placeholder,
  required,
  checked,
  ref,
  style,
  disabled,
  loadMore,
  isMulti,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="relative">
        {label && (
          <label style={{ paddingRight: "20px", marginBottom: "10px" }}>
            {label} {required && <span style={{ color: "red" }}>*</span>}
          </label>
        )}

        {type === "select" ? (
          <select
            name={name}
            onChange={onChange}
            value={value}
            className={className}
            style={style}
          >
            <option value="" disabled={disabled ? disabled : false}>
              Select {placeholder ? placeholder : label}
            </option>
            {options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type == "loadMoreSelect" ? (
          <CustomSelect
            name={name}
            value={value}
            // className="applicant-input"
            onChange={onChange}
            placeholder={`Select ${placeholder ? placeholder : label}`}
            options={options}
            loadMore={loadMore}
            menuPosition="fixed"
            isMulti={isMulti ? isMulti : false}
            className={className}
            // className={`${className} ${
            //   value && !placeholder ? "input-has-value" : ""
            // }`}
          />
        ) : type === "selectbyname" ? (
          <select
            name={name}
            onChange={onChange}
            value={value}
            className={className}
            //  className={`${className} ${
            //   value && !placeholder ? "input-has-value" : ""
            // }`}
            style={style}
          >
            <option value="" disabled>
              Select {placeholder}
            </option>
            {options.map((option, index) => (
              <option key={index} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === "file" ? (
          <input
            type="file"
            name={name}
            ref={ref}
            accept={accept}
            onChange={onChange}
            className={`${className} inputfile`}
          />
        ) : type === "password" ? (
          <div className="flex items-center" style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder={label || placeholder}
              name={name}
              onChange={onChange}
              value={value}
              className={`${className} flex-grow`}
              // className={`${className} flex-grow ${
              //   value && !placeholder ? "input-has-value" : ""
              // }`}
            />
            <button
              type="button"
              onClick={handleTogglePasswordVisibility}
              className="ml-2"
              style={{
                position: "absolute",
                right: "10px",
                top: "22%",
                border: "none",
                background: "transparent",
              }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {!showPassword ? (
                <i className="fas fa-eye-slash cursor-pointer"></i>
              ) : (
                <i className="fas fa-eye cursor-pointer"></i>
              )}
            </button>
          </div>
        ) : type === "email" ? (
          <input
            type="email"
            name={name}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            className={className}
            // className={`${className}  ${
            //   value && !placeholder ? "input-has-value" : ""
            // }`}
            disabled={disabled}
          />
        ) : type === "textarea" ? (
          <textarea
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            className={className}
            //  className={`${className}  ${
            //   value && !placeholder ? "input-has-value" : ""
            // }`}
            style={style}
          ></textarea>
        ) : type === "date" ? (
          <input
            type="date"
            name={name}
            onChange={onChange}
            placeholder={ "label"}
            value={value}
            className={className}
            //  className={`${className}  ${
            //   value && !placeholder ? "input-has-value" : ""
            // }`}
            style={style}
          />
        ) : type === "datetime" ? (
          <input
            type="datetime-local"
            name={name}
            onChange={onChange}
            placeholder={placeholder ? placeholder : label}
            value={value}
            className={className}
            // className={`${className}  ${
            //   value && !placeholder ? "input-has-value" : ""
            // }`}
            style={style}
          />
        ) : type === "tel" ? (
          <input
            type="tel"
            name={name}
            onChange={onChange}
            value={value}
            placeholder={placeholder ? placeholder : label}
            className={className}
            // className={`${className}  ${
            //   value && !placeholder ? "input-has-value" : ""
            // }`}
            pattern="\d{10}"
            maxLength="10"
            disabled={disabled}
          />
        ) : type === "radio" ? (
          <div className="row ">
            {options?.map((option, index) => (
              <div key={index} className="col-4">
                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={name}
                    value={option.value}
                    id={`${name}-${option.value}`}
                    checked={value === option.value}
                    onChange={onChange}
                  />
                  <label
                    className="form-check-label ms-2"
                    htmlFor={`${name}-${option.value}`}
                  >
                    {option.label}
                  </label>
                </div>
              </div>
            ))}
          </div>
        ) : type === "checkbox" ? (
          <input
            type="checkbox"
            name={name}
            onChange={onChange}
            checked={checked}
            // className="form-checkbox"
            className="form-check-input"
            id={name}
          />
        ) : (
          <input
            type={type}
            name={name}
            onChange={onChange}
            value={value}
            className={`${className} custom-input`}
            // className={`${className} custom-input ${
            //   value && !placeholder ? "input-has-value" : ""
            // }`}
            placeholder={placeholder}
            style={style}
            disabled={disabled}
          />
        )}
        {error && (
          <p
            className="sub"
            style={{ color: "red", paddingTop: "3px", fontSize: "15px" }}
          >
            {error}
          </p>
        )}
      </div>
      <div>
        {onSubmit && (
          <button className="applicants-search-btn" onClick={onSubmit}>
            Search
          </button>
        )}
      </div>
    </>
  );
};

export default FormField;
