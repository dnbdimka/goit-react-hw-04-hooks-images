import React, { useState } from "react";
import { toast } from "react-toastify";
import { SearchbarHeader } from "./SearchBarStyled";

// const initialState = { searchQuery: "" };

const SearchBar = ({ onSubmit }) => {
  const [state, setState] = useState("");

  const handleInputChange = (e) => {
    const { value } = e.target;
    setState(value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (state.trim("") === "") {
      toast.error("Enter search query");
      return;
    }
    onSubmit(state);
  };

  return (
    <SearchbarHeader>
      <form onSubmit={handelSubmit} className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          onChange={handleInputChange}
          value={state}
          name="searchQuery"
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </SearchbarHeader>
  );
};

export default SearchBar;
