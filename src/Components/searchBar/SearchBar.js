import React, { useState } from "react";
import { toast } from "react-toastify";
import { SearchbarHeader } from "./SearchBarStyled";

const initialState = { searchQuery: "" };

const SearchBar = ({ onSubmit }) => {
  const [state, setState] = useState(initialState);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (state.searchQuery.trim("") === "") {
      toast.error("Enter search query");
      return;
    }
    onSubmit(state.searchQuery);
  };

  return (
    <SearchbarHeader>
      <form onSubmit={handelSubmit} className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          onChange={handleInputChange}
          value={state.searchQuery}
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
