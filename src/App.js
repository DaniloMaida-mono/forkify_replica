import React, { useReducer, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Client from "./services/Client";

export const BookmarksContext = React.createContext();

const initialState = [];
const client = new Client(process.env.API_URL);

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
    try {
      const { data } = await client.get('/search', { q: query });
      const { recipes } = data
      setPage(1);
      setQueryResults(recipes);
    } catch (err) {
      console.log(err);
      SetError(
        "Something went wrong with data fetching, check the available keyword allowed: https://forkify-api.herokuapp.com/phrases.html"
      );
    }
  };

  const handlePrevPage = (e) => {
    const { prev } = e.target.dataset;
    setPage(parseInt(prev));
  };
  const handleNextPage = (e) => {
    const { next } = e.target.dataset;
    setPage(parseInt(next));
  };

  const handleShowRecipe = async (e) => {
    try {
      const { rid } = e.currentTarget.dataset;
      const { data } = await client.get('/get', { rId: rid });
      const { recipe } = data || {};
      if (recipe) {
        setTime(Math.ceil(recipe?.ingredients.length / 3) * 3);
        setItemToShow(recipe);
      }
    } catch (error) {
      console.log(error);
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
