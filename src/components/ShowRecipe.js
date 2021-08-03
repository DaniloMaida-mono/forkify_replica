import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faUserFriends,
  faPlus,
  faMinus,
  faBookmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

function ShowRecipe({ item, servings, addServing, removeServing, time }) {
  const ingredients = item?.ingredients.map((ing, i) => {
    calculateIngredient(ing);
    return (
      <li key={i} className="ing-item d-flex items-center">
        <FontAwesomeIcon
          icon={faCheck}
          style={{
            marginRight: "10px",
            fontSize: "15px",
          }}
        />
        <span className="ing-quantity"></span>
        <span className="ing-desc">{ing}</span>
      </li>
    );
  });

  function calculateIngredient(ing) {
    const arrSplit = ing.split(" ");
    const regex = /[0-9]\/(\d{1})\b/;
    const quantity = arrSplit[0].match(regex);

    console.log(quantity);
  }

  return (
    <div className="recipe">
      <div className="recipe__img">
        <figure>
          <img src={item?.image_url} alt={item?.title} />
          <h1>
            <span>{item?.title}</span>
          </h1>
        </figure>
      </div>
      <div className="recipe__information">
        <div className="d-flex">
          <div className="recipe_detail d-flex items-center">
            <FontAwesomeIcon icon={faClock} />
            <span className="text d-flex">
              <strong>{time}</strong> MINUTES
            </span>
          </div>
          <div className="recipe_detail d-flex items-center">
            <FontAwesomeIcon icon={faUserFriends} />
            <span className="text d-flex">
              <strong>{servings}</strong> SERVINGS
            </span>
            <span className="d-flex">
              <FontAwesomeIcon
                icon={faPlus}
                className="pointer"
                style={{
                  marginRight: "10px",
                }}
                onClick={addServing}
              />
              <FontAwesomeIcon
                icon={faMinus}
                className="pointer"
                onClick={removeServing}
              />
            </span>
          </div>
        </div>
        <div className="d-flex justify-end">
          <FontAwesomeIcon icon={faBookmark} className="pointer" />
        </div>
      </div>

      <div className="recipe__ingredients">
        <h2 className="text-pink">RECIPE INGREDIENTS</h2>
        <ul>{ingredients}</ul>
      </div>
    </div>
  );
}

export default ShowRecipe;
