import React from "react";

const Input = (props) => {
  const { label, required, error, renderInput, ...rest } = props;
  return (
    <div className="form-group">
      <label className="label">
        {label} {required && <span>*</span>}
      </label>

      {/* dòng 12 ý nghĩa : nếu có props renderSelect thì sẽ gọi nó nếu ko thì mặc định(||) chạy input*/}
      {renderInput?.({ error, ...rest }) || (
        <input
          type="text"
          {...rest}
          className={`form__input ${error ? "formerror" : ""}`}
        />
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Input;
