import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Form from "./common/form";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

function MovieForm() {
  const params = useParams();
  const navigate = useNavigate();
  const movie = getMovie(params.id);
  const location = useLocation();

  React.useEffect(() => {
    if (!movie && location.pathname !== "/movies/new") {
      navigate("/not-found", { replace: true });
    }
  });

  const handleSubmit = (data) => {
    saveMovie(data);
    navigate("/movies");
  };

  return (
    <div>
      <h1>Movie: {params.id}</h1>
      <MForm movie={movie} doSubmit={handleSubmit} />
    </div>
  );
}

class MForm extends Form {
  movie = this.props.movie
    ? {
        title: this.props.movie.title,
        genreId: this.props.movie.genre._id,
        numberInStock: this.props.movie.numberInStock,
        dailyRentalRate: this.props.movie.dailyRentalRate,
      }
    : {
        title: "",
        genreId: "",
        numberInStock: "",
        dailyRentalRate: "",
      };

  state = {
    data: {
      title: this.movie.title,
      genre: this.movie.genreId,
      numberInStock: this.movie.numberInStock,
      dailyRentalRate: this.movie.dailyRentalRate,
    },
    errors: {},
    genres: [],
  };

  componentDidMount() {
    this.setState({ genres: getGenres() });
  }

  schema = {
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(0).max(100).required().label("Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  };

  doSubmit = () => {
    const {
      title,
      genre: genreId,
      numberInStock,
      dailyRentalRate,
    } = this.state.data;
    const movie = {
      ...this.props.movie,
      title,
      genreId,
      numberInStock,
      dailyRentalRate,
    };
    this.props.doSubmit(movie);
  };

  render() {
    const { genres } = this.state;
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", "text")}
          {this.renderSelect("genre", "Genre", genres)}
          {this.renderInput("numberInStock", "Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
