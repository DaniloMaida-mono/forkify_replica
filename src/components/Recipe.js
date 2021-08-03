import React from "react";

function Recipe({ item, onClick }) {
  return (
    <li
      className="recipe-list__item w-100 d-flex items-center"
      data-rid={item.recipe_id}
      onClick={onClick}
    >
      <figure>
        <img src={item?.image_url} alt={item?.title} />
      </figure>
      <div className="data d-flex flex-column">
        <h4 className="text-pink">{item?.title}</h4>
        <p>{item?.publisher}</p>
      </div>
    </li>
  );
}

export default Recipe;
