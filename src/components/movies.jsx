import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: null,
    pageSize: 4,
    currentPage: 1,
    search: "",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres,
    });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    deleteMovie(movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    this.setState((prevState) => ({
      movies: prevState.movies.map((m) =>
        m._id === movie._id ? { ...m, liked: !m.liked } : m
      ),
    }));
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, search: "" });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearchChange = (e) => {
    const { value } = e.target;
    this.setState({ search: value, selectedGenre: null, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.movies;

    const {
      pageSize,
      currentPage,
      genres: allGenres,
      selectedGenre,
      sortColumn,
      search,
    } = this.state;

    if (count === 0)
      return (
        <p>
          There are no movies in the database.{" "}
          <Link className="btn btn-primary m-4" to="new">
            New Movie
          </Link>
        </p>
      );

    const { searchFiltered: filtered, movies } = this.getPagedData();

    return (
      <div className="row mt-4">
        <div className="col-3 mt-4 pt-4">
          <ListGroup
            items={allGenres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col mt-4 pt-4">
          <Link className="btn btn-primary mb-2" to="new">
            New Movie
          </Link>
          <p>Showing {filtered.length} movies in the database.</p>
          <SearchBox value={search} onChange={this.handleSearchChange} />
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      search,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
        : allMovies;

    const searchFiltered = filtered.filter(
      (movie) => movie.title.toLowerCase().indexOf(search.toLowerCase()) > -1
    );

    const sorted = _.orderBy(
      searchFiltered,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sorted, currentPage, pageSize);
    return { searchFiltered, movies };
  };
}

export default Movies;
