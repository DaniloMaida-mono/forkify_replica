import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faUserFriends,
  faPlus,
  faMinus,
  faBookmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { BookmarksContext } from "../App";

function ShowRecipe({ item, servings, addServing, removeServing, time }) {

  const ingredients = item?.ingredients.map((ing, i) => {
    const ingsObj = calculateIngredient(ing);
    return (
      <li key={i} className="ing-item d-flex">
        <FontAwesomeIcon
          icon={faCheck}
          style={{
            marginRight: "10px",
            fontSize: "15px",
          }}
        />
        <span>
          {ingsObj.count && (
            <span className="ing-quantity">{ingsObj?.count} </span>
          )}{" "}
          <span className="ing-desc">{ingsObj?.desc}</span>
        </span>
      </li>
    );
  });

  const { state, dispatch } = useContext(BookmarksContext);


  const findSavedIndex = () => {
    return state.findIndex((stateItem, index) => {
      return stateItem?.recipe_id === item?.recipe_id ? true : false;
    });
  }

  function calculateIngredient(ing) {
    const arrSplit = ing.split(" ");
    const quantity = arrSplit[0].match(/\d*([-]|[\/]?\d+)/g);

    let obj = {
      count: "",
      desc: arrSplit.slice(1).join(" "),
    };
    if (quantity) {
      obj.count = parseQuantity(quantity, servings);
    }

    return obj;
  }

  function parseQuantity(arr, servings) {
    if (arr.length > 1) {
      arr[0] = arr[0].replace("-", "");
    }
    const portion = (eval(arr.join("+")) / 4) * servings;

    const splitPortion = portion.toString().split(".");
    const val = numberToFraction(eval(splitPortion.join(".")));
    return val.toString().replace(" ", "-");
  }

  function numberToFraction(amount) {
    if (parseFloat(amount) === parseInt(amount)) {
      return amount;
    }

    if (amount.toString().split(".")[1].length > 4) {
      amount = amount.toFixed(2);
    }

    var gcd = function (a, b) {
      if (b < 0.0000001) {
        return a;
      }
      return gcd(b, Math.floor(a % b));
    };
    var len = amount.toString().length - 2;
    var denominator = Math.pow(10, len);
    var numerator = amount * denominator;
    var divisor = gcd(numerator, denominator);
    numerator /= divisor;
    denominator /= divisor;
    var base = 0;
    if (numerator > denominator) {
      base = Math.floor(numerator / denominator);
      numerator -= base * denominator;
    }
    amount = Math.floor(numerator) + "/" + Math.floor(denominator);
    if (base) {
      amount = base + " " + amount;
    }
    return amount;
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
          <FontAwesomeIcon
            icon={faBookmark}
            className="pointer"
            onClick={() => {
              dispatch({ type: "pushButton", payload: item });
            }}
            style={{ color: findSavedIndex() !== -1 ? "#E5D000" : "" }}
          />
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
