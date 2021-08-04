import React, { useState } from "react";
import RecipesList from "./RecipesList";
import ShowRecipe from "./ShowRecipe";

function Main(props) {
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
            clickRecipe={props.clickRecipe}
          />
        </div>
      </div>
      <div className="show_recipe">
        {Object.keys(props.item).length ? (
          <ShowRecipe
            item={props.item}
            servings={props.servings}
            time={props.time}
            addServing={props.addServing}
            removeServing={props.removeServing}
          />
        ) : (
          <h2 className="text-center">
            Start searching for your favorite recipes or get inspiration for a
            new one!
          </h2>
        )}
      </div>
    </div>
  );
}

export default Main;
