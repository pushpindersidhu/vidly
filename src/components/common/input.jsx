import React from "react";

function Input({ name, label, error, ...rest }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input {...rest} placeholder={label} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
}

export default Input;
