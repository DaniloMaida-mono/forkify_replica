import React from "react";
import logo from "../img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
function Header(props) {
  return (
    <header className="header d-flex justify-between items-center">
      <div className="logo">
        <img src={logo} alt="Forkify Replica" />
      </div>
      <form className="search d-flex items-center" onSubmit={props.onSubmit}>
        <input
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
      <div className="sm-hidden">
        <nav className="nav d-flex items-center">
          <FontAwesomeIcon
            icon={faBookmark}
            style={{
              fontSize: "20px",
              marginRight: "10px",
              color: "#f38e82",
            }}
          />
          <span>BOOKMARKS</span>
        </nav>
      </div>
    </header>
  );
}

export default Header;
