import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Movies from "./components/movies";
import Navbar from "./components/Navbar";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/">
            <Route index element={"home"} />
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="movies">
              <Route index element={<Movies />} />
              <Route path=":id" element={<MovieForm />} />
              <Route path="new" element={<MovieForm />} />
            </Route>
            <Route path="customers" element={<Customers />} />
            <Route path="rentals" element={<Rentals />} />
            <Route path="not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
