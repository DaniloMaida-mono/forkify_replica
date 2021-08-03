import React from "react";
import RecipesList from "./RecipesList";

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
          />
        </div>
      </div>
      <div className="show_recipe"></div>
    </div>
  );
}

export default Main;
