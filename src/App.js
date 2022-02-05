import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Movies from "./components/movies";
import Navbar from "./components/Navbar";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";

function App() {
  // const navigate = useNavigate(); 
  return (
    <React.Fragment>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/">
            <Route index element={"home"} />
            <Route path="login" element={<LoginForm />} />
            <Route path="movies">
              <Route index element={<Movies />} />
              <Route path=":id" element={<MovieForm />} />
            </Route>
            <Route path="customers" element={<Customers />} />
            <Route path="rentals" element={<Rentals />} />
            <Route path="not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        {/* <Navigate from="/" to="/movies" /> */}
      </main>
    </React.Fragment>
  );
}

export default App;
