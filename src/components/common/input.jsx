import React from "react";

function Input({ name, label, type, value, error, onChange }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        autoFocus
        value={value}
        onChange={onChange}
        type={type}
        className="form-control"
        id={name}
        name={name}
      />
      {error && <div className="alert alert-danger mt-2">{ error}</div>}
    </div>
  );
}

export default Input;
