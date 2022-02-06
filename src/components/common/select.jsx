import React from "react";

function Select({ name, label, error, options, ...rest }) {
  return (
    <div className="mb-3">
      <label htmlFor={name}>{label}</label>
      <select
        {...rest}
        name={name}
        id={name}
        className="form-select"
        aria-label="Default select example"
      >
        <option disabled value="">
          -- select an option --
        </option>
        {options.map((option) => (
          <option
            key={option._id}
            value={option._id}
          >
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
}

export default Select;
