import React from "react";
import Recipe from "./Recipe";

function RecipesList({ recipes }) {
  const list = recipes.map((recipe, i) => {
    return (
      <React.Fragment key={i}>
        <Recipe
          imgSrc={recipe?.image_url}
          imgAlt={recipe?.title}
          title={recipe?.title}
          publisher={recipe?.publisher}
        />
      </React.Fragment>
    );
  });
  return <ul className="recipe-list d-flex flex-column">{list}</ul>;
}

export default RecipesList;
