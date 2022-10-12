import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ songTitle, onClick }) => {
  return (
    <nav>
      <h1>
        {songTitle &&
          songTitle
            .split(" ")
            .map((text) => `${text[0]?.toUpperCase()}${text?.substring(1)}`)
            .join(" ")}
      </h1>
      <button onClick={onClick}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
