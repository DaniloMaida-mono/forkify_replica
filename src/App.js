import React, { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

const axios = require("axios");

const App = () => {
  const [query, setQuery] = useState("");

  const [error, SetError] = useState("");

  const [queryResults, setQueryResults] = useState([]);
  const [page, setPage] = useState(1);

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getRecipes()
      .then((data) => {
        const { recipes } = data || [];
        if (recipes) {
          setPage(1);
          setQueryResults(recipes);
        }
      })
      .catch((err) => {
        console.log(err);
        SetError("Something went wrong with data fetching");
      });
  };

  const handlePrevPage = (e) => {
    const { prev } = e.target.dataset;
    setPage(parseInt(prev));
  };
  const handleNextPage = (e) => {
    const { next } = e.target.dataset;
    setPage(parseInt(next));
  };

  const getRecipes = async () => {
    try {
      const { data } = await axios.get(process.env.API_URL + "/search", {
        params: { q: query },
      });
      return data;
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="App">
      <div className="container">
        <Header onChange={handleChange} onSubmit={handleSubmit} />
        <Main
          recipes={queryResults}
          page={page}
          nextPage={handleNextPage}
          prevPage={handlePrevPage}
          error={error}
        />
      </div>
    </div>
  );
};

export default App;
