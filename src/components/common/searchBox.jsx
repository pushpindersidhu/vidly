import React from "react";

function SearchBox(props) {
  const { value, onChange } = props;

  return (
    <div className="mb-3">
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder="Search..."
        name="search"
        className="form-control"
      />
    </div>
  );
}

export default SearchBox;
