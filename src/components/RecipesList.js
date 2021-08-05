import React from "react";
import Recipe from "./Recipe";
import Paginator from "../services/Paginator";
import Pagination from "./Pagination";


function RecipesList({
  recipes,
  page,
  nextPage,
  prevPage,
  error,
  clickRecipe,
}) {

  if (!recipes.length) {
    return error;
  }
  const paginator = new Paginator(recipes);
  const paginatedRecipes = paginator.paginate(page, 10);

  return (
    <div className="d-flex flex-column">
      <ul className="recipe-list d-flex flex-column">
        {paginatedRecipes.map((recipe, i) => (
          <Recipe key={recipe?.recipe_id} item={recipe} onClick={clickRecipe} />
        ))}
      </ul>
      <Pagination page={page} prevPage={prevPage} nextPage={nextPage} isLastPage={recipes.length / 10 <= page} />
    </div>
  );

}

export default RecipesList;
