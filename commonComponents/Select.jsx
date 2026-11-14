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
    othersValue,
    onOthersChange,
    othersError,
    othersPlaceholder = "Please specify...",
  } = props;

  const isOthersOption = (option) =>
    typeof option?.label === "string" &&
    ["other", "others"].includes(option.label.trim().toLowerCase());
  const isOthersSelected = Array.isArray(value)
    ? value.some(isOthersOption)
    : isOthersOption(value);

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
  const selectOptions = (() => {
    const opts = loadMore && Array.isArray(options)
      ? Array.from(new Map(options.map((option) => [option.value, option])).values())
      : (options || []);
    const others = opts.filter(isOthersOption);
    const rest = opts.filter((option) => !isOthersOption(option));
    return [...others, ...rest];
  })();
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
      <div>
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
          menuShouldBlockScroll={true}
          styles={customStyles}
          onMenuOpen={() => menuOpen && menuOpen(true)}
          onMenuClose={() => menuOpen && menuOpen(false)}
          className={`react-select ${className} ${error ? "border-red-500" : ""} ${isMulti ? "is-multi" : ""}`}
          onMenuScrollToBottom={handleLoadMore}
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        {isOthersSelected && onOthersChange && (
          <div style={{ marginTop: '8px' }}>
            <input
              type="text"
              value={othersValue || ''}
              onChange={(e) => onOthersChange(e.target.value)}
              placeholder={othersPlaceholder}
              style={{
                width: '100%',
                border: othersError ? '1px solid red' : '1px solid #e6e3f1',
                borderRadius: '4px',
                padding: '10px 14px',
                fontSize: '16px',
                outline: 'none',
              }}
            />
            {othersError && <p className="mt-2 text-sm text-red-600">{othersError}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
