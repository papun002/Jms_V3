import { React, useState } from "react";

const TextAreaComponent = ({ placeholder, name, label }) => (
  <div className="col-md-6 col-sm-12 col-lg-5">
    <div className="form-group">
      <label>
        {label}
        <span className="text-danger">*</span>
      </label>
      <textarea
        name={name}
        id=""
        className="form-control"
        cols="10"
        rows="3"
        placeholder={placeholder}
      ></textarea>
    </div>
  </div>
);

const SelectComponent = ({ name, label, options, placeholder, classValue }) => (
  <div className={`col-md-6 col-sm-12 col-lg-4 ${classValue}`}>
    <label>
      {label} <span className="text-danger">*</span>
    </label>
    <select className={`form-control show-tick`} name={name}>
      <option value="">-- {placeholder} --</option>
      {options.map((odata) => (
        <option key={odata.value} value={odata.value}>
          {odata.option}
        </option>
      ))}
    </select>
  </div>
);

function InputFields({
  type,
  placeholder,
  name,
  info,
  label,
  isSelect,
  isTextArea,
  options,
  classValue,
  isSearch,
  suggestions,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredSuggestions = suggestions
    ? suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase())
      )
    : [];

  return (
    <>
      {isTextArea ? (
        <TextAreaComponent
          placeholder={placeholder}
          name={name}
          label={label}
        />
      ) : isSelect ? (
        <SelectComponent
          name={name}
          placeholder={placeholder}
          label={label}
          options={options}
        />
      ) : (
        <div className={`col-md-6 col-sm-12 col-lg-4 ${classValue}`}>
          <div className="form-group">
            <label>
              {label} <span className="text-danger">*</span>
            </label>
            <input
              type={type}
              className={`form-control ${classValue}`}
              placeholder={placeholder}
              name={name}
              onChange={handleInputChange}
              list={isSearch ? "suggestionList" : undefined}
            />
            {isSearch && (
              <datalist id="suggestionList">
                {filteredSuggestions.map((suggestion, index) => (
                  <option key={index} value={suggestion} />
                ))}
              </datalist>
            )}
            {info ? <small className="text-danger">{info}</small> : null}
          </div>
        </div>
      )}
    </>
  );
}

export default InputFields;   