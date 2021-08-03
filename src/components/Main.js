import React, { useState } from "react";
import RecipesList from "./RecipesList";
import ShowRecipe from "./ShowRecipe";

function Main(props) {
  const axios = require("axios");
  const [item, setItem] = useState({});
  const [servings, setServings] = useState(4);
  const [time, setTime] = useState(0);

  const handleShowRecipe = (e) => {
    const { rid } = e.currentTarget.dataset;
    getRecipe(rid).then((data) => {
      const { recipe } = data || {};
      if (recipe) {
        setTime(Math.ceil(recipe?.ingredients.length / 3) * 3);
        setItem(recipe);
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
    <div className="main w-100 d-flex">
      <div className="search_results d-flex flex-column">
        <div className="list">
          <RecipesList
            recipes={props.recipes}
            page={props.page}
            nextPage={props.nextPage}
            prevPage={props.prevPage}
            error={props.error}
            clickRecipe={handleShowRecipe}
          />
        </div>
      </div>
      <div className="show_recipe">
        {Object.keys(item).length ? (
          <ShowRecipe
            item={item}
            servings={servings}
            time={time}
            addServing={handleAddServing}
            removeServing={handleRemoveServing}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Main;
