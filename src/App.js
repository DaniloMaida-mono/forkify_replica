import React, { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

const axios = require("axios");

const App = () => {
  const url = "https://forkify-api.herokuapp.com/api";
  const [query, setQuery] = useState("");

  const [queryResults, setQueryResults] = useState([]);

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getRecipes().then((data) => {
      const { recipes } = data;
      setQueryResults(recipes);
    });
  };

  const renderQueryResults = queryResults.map((item, i) => {
    return <div>{item.title}</div>;
  });

  const getRecipes = async () => {
    try {
      const { data } = await axios.get(url + "/search", {
        params: { q: query },
      });
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <Header onChange={handleChange} onSubmit={handleSubmit} />
        <Main recipes={queryResults} />
      </div>
    </div>
  );
};

export default App;
