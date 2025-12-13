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
      fontSize: "16px",
      fontWeight: "400",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "black",
      fontSize: "16px",
      fontWeight: "400",
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
    }),
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
          className={`react-select ${className} ${
            error ? "border-red-500" : ""
          } ${isMulti ? "is-multi" : ""}`}
          onMenuScrollToBottom={loadMore}
          // Add these two crucial props:
          menuPortalTarget={
            typeof document !== "undefined" ? document.body : null
          }
          menuShouldBlockScroll={true}
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default CustomSelect;
