import React, { useContext, useState } from "react";
import logo from "../img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { BookmarksContext } from "../App";
import Recipe from "./Recipe";
function Header(props) {
  const { state } = useContext(BookmarksContext);

  const renderElems = state.map((item, i) => {
    return (
      <React.Fragment key={item?.recipe_id}>
        <Recipe item={item} onClick={props.clickRecipe} />;
      </React.Fragment>
    );
  });

  return (
    <header className="header d-flex justify-between items-center">
      <div className="logo">
        <img src={logo} alt="Forkify Replica" />
      </div>
      <form
        autoComplete="off"
        className="search d-flex items-center"
        onSubmit={props.onSubmit}
      >
        <input
          autoComplete="off"
          className="search__input"
          type="search"
          name="search"
          id=""
          placeholder="Search over 1,000,000 recipes..."
          onChange={props.onChange}
        />
        <button className="search__btn d-flex items-center" type="submit">
          SEARCH
        </button>
      </form>
      <div className="bookmarks-container">
        <nav className="nav d-flex items-center">
          <FontAwesomeIcon
            icon={faBookmark}
            style={{
              fontSize: "20px",
              marginRight: "10px",
              color: "#f38e82",
            }}
          />
          <span className="sm-hidden">BOOKMARKS</span>
        </nav>
        <div
          className="bookmarks"
        >
          {state.length ? (
            <ul className="recipe-list d-flex flex-column">{renderElems}</ul>
          ) : (
            <div>
              <h2 className="text-center">
                Add some recipes to your Bookmarks!
              </h2>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
