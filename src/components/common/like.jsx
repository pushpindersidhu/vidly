import React from "react";

function Like({ liked, onClick }) {
  const className = `fa ${liked ? "fa-heart" : "fa-heart-o"}`;
  return (
    <i
      style={{ cursor: "pointer" }}
      className={className}
      onClick={onClick}
      aria-hidden="true"
    ></i>
  );
}

export default Like;
