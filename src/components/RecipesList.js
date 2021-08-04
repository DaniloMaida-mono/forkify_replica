import React from "react";
import Recipe from "./Recipe";
import Paginator from "../services/Paginator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
      <div className="pagination d-flex justify-between">
        <button
          onClick={prevPage}
          data-prev={(page - 1).toString()}
          style={{
            visibility: page <= 1 ? "hidden" : "",
          }}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{
              fontSize: "15px",
              marginRight: "10px",
            }}
          />
          Page {page - 1}{" "}
        </button>
        <button
          onClick={nextPage}
          data-next={(page + 1).toString()}
          style={{
            visibility: recipes.length / 10 <= page ? "hidden" : "",
            alignSelf: "flex-end",
          }}
        >
          Page {page + 1}{" "}
          <FontAwesomeIcon
            icon={faArrowRight}
            style={{
              fontSize: "15px",
              marginLeft: "10px",
            }}
          />
        </button>
      </div>
    </div>
  );

}

export default RecipesList;
