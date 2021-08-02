import React from "react";

function Recipe(props) {
  return (
    <li className="recipe-list__item w-100 d-flex items-center">
      <figure>
        <img src={props.imgSrc} alt={props.imgAlt} />
      </figure>
      <div className="data d-flex flex-column">
        <h4 className="text-pink">{props.title}</h4>
        <p>{props.publisher}</p>
      </div>
    </li>
  );
}

export default Recipe;
