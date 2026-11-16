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
    menuPosition = "fixed",
    menuPlacement = "auto",
    menuPortalTarget,
    maxMenuHeight = 250,
  } = props;
  const portalTarget =
    menuPortalTarget !== undefined
      ? menuPortalTarget
      : typeof document !== "undefined"
        ? document.body
        : null;
  const loadMoreInProgress = React.useRef(false);
  const handleLoadMore = async () => {
    if (!loadMore || loadMoreInProgress.current) return;

    loadMoreInProgress.current = true;
    try {
      await loadMore();
    } finally {
      loadMoreInProgress.current = false;
    }
  };
  const selectOptions =
    loadMore && Array.isArray(options)
      ? Array.from(new Map(options.map((option) => [option.value, option])).values())
      : options;

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
          {title} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      <div className="">
        <Select
          isDisabled={disabled}
          placeholder={placeholder}
          options={selectOptions}
          value={value}
          onChange={onChange}
          isSearchable={isSearchable}
          isMulti={isMulti}
          isClearable={true}
          menuPlacement={menuPlacement}
          menuPosition={menuPosition}
          menuPortalTarget={portalTarget}
          maxMenuHeight={maxMenuHeight}
          styles={customStyles}
          onMenuOpen={() => menuOpen && menuOpen(true)}
          onMenuClose={() => menuOpen && menuOpen(false)}
          className={`react-select ${className} ${
            error ? "border-red-500" : ""
          } ${isMulti ? "is-multi" : ""}`}
          onMenuScrollToBottom={handleLoadMore}
          menuShouldBlockScroll={true}
        />
        {error && (
          <p
            className="sub text-danger"
            style={{ color: "red", paddingTop: "3px", fontSize: "15px" }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
