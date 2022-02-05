import React from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";

function MoviesTable(props) {
  const columns = [
    { path: "title", label: "Title", content: (movie) => (
      <Link to={movie._id}>{movie.title}</Link>
    ) },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like onClick={() => onLike(movie)} liked={movie.liked} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];
  const { movies, onDelete, onLike, sortColumn, onSort } = props;

  return (
    <Table
      columns={ columns}
      data={movies}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
}

export default MoviesTable;
