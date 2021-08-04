import React, { useReducer, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

const axios = require("axios");
export const BookmarksContext = React.createContext();

const initialState = [];

function bookmarksReducer(state, action) {
  switch (action.type) {
    case "pushButton":
      const foundIndex = state.findIndex((item, index) => {
        return item?.recipe_id === action.payload.recipe_id ? true : false;
      });

      if (foundIndex !== -1) {
        state.splice(foundIndex, 1);
        return [...state];
      }
      return [...state, action.payload];
    default:
      throw new Error();
  }
}
const App = () => {
  const [state, dispatch] = useReducer(bookmarksReducer, initialState);
  const [query, setQuery] = useState("");
  const [error, SetError] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [page, setPage] = useState(1);

  const [itemToShow, setItemToShow] = useState({});
  const [servings, setServings] = useState(4);
  const [time, setTime] = useState(0);

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
        SetError(
          "Something went wrong with data fetching, check the available keyword allowed: https://forkify-api.herokuapp.com/phrases.html"
        );
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

  const handleShowRecipe = (e) => {
    const { rid } = e.currentTarget.dataset;
    getRecipe(rid).then((data) => {
      const { recipe } = data || {};
      if (recipe) {
        setTime(Math.ceil(recipe?.ingredients.length / 3) * 3);
        setItemToShow(recipe);
      }
    });
  };

  const getRecipe = async (rid) => {
    try {
      const { data } = await axios.get(process.env.API_URL + "/get", {
        params: { rId: rid },
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveServing = () => {
    if (servings === 1) {
      return;
    }
    setServings(servings - 1);
  };

  const handleAddServing = () => {
    setServings(servings + 1);
  };

  return (
    <BookmarksContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <div className="container">
          <Header
            onChange={handleChange}
            onSubmit={handleSubmit}
            clickRecipe={handleShowRecipe}
          />
          <Main
            recipes={queryResults}
            page={page}
            nextPage={handleNextPage}
            prevPage={handlePrevPage}
            error={error}
            clickRecipe={handleShowRecipe}
            item={itemToShow}
            servings={servings}
            time={time}
            addServing={handleAddServing}
            removeServing={handleRemoveServing}
          />
        </div>
      </div>
    </BookmarksContext.Provider>
  );
};

export default App;
