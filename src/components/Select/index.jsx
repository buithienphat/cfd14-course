import React from "react";

const Select = ({ options, error, ...rest }) => {
  return (
    <select {...rest} className={`form__input ${error ? "formerror" : ""}`}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
