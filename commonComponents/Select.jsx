import React from "react";
import Select from "react-select";

const CustomSelect = (props) => {
  const {
    borderRadius,
    disabled,
    options,
    value,
    onChange,
    placeholder = "Select...",
    title,
    isSearchable = true,
    className,
    error,
    isMulti,
    required,
    loadMore,
    menuOpen,
  } = props;
  const customStyles = {
    control: (provided) => ({
      ...provided,

      borderRadius: borderRadius ? borderRadius : "0px",
      padding: "2px 10px",
      fontSize: "16px", // Tailwind's text-sm
      fontWeight: "400",
      zIndex:9999
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "black", // Tailwind's gray-400
      fontSize: "16px", // Tailwind's text-sm
      fontWeight: "400",
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    menu: (base) => ({ ...base, zIndex: 9999 }),
  };
  return (
    <div className={`w-full ${className}`}>
      {title && (
        <label className="block text-sm font-bold">
          {title} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="">
        <Select
          isDisabled={disabled}
          placeholder={placeholder}
          options={options}
          value={value}
          onChange={onChange}
          isSearchable={isSearchable}
          isMulti={isMulti}
          isClearable={true}
          styles={customStyles}
          onMenuOpen={() => menuOpen && menuOpen(true)}
          onMenuClose={() => menuOpen && menuOpen(false)}
          className={`react-select   ${className} ${
            error ? "border-red-500" : ""
          } ${ isMulti ?  "is-multi" : ""}`} // Add conditional styling for error
          // classNamePrefix="react-select" // Adds a prefix for custom styles
          // styles={{
          //     menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          //     menu: (base) => ({ ...base, zIndex: 9999 }),
          // }}
          onMenuScrollToBottom={loadMore}
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default CustomSelect;
