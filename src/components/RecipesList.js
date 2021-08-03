import React from "react";
import Recipe from "./Recipe";

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
  const start = (page - 1) * 10;
  const stop = page * 10;
  if (recipes.length) {
    const paginatedRecipes = recipes.slice(start, stop);
    const list = paginatedRecipes.map((recipe, i) => {
      return (
        <React.Fragment key={recipe?.recipe_id}>
          <Recipe item={recipe} onClick={clickRecipe} />
        </React.Fragment>
      );
    });
    return (
      <div className="d-flex flex-column">
        <ul className="recipe-list d-flex flex-column">{list}</ul>
        {recipes.length && (
          <div className="pagination d-flex justify-between">
            <button
              onClick={prevPage}
              data-prev={page - 1}
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
              data-next={page + 1}
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
        )}
      </div>
    );
  }

  return error;
}

export default RecipesList;
