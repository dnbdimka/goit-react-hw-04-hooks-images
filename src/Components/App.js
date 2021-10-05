import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Searchbar from "./searchBar/SearchBar";
import ImageGallery from "./imageGallery/ImageGallery";
import Modal from "./modal/Modal";

const initialState = {
  searchQuery: "",
  isModalOpen: false,
  bigImg: "",
};

const App = () => {
  const [state, setState] = useState(initialState);

  const onSubmitSearch = (searchInput) => {
    setState((prev) => ({ ...prev, searchQuery: searchInput }));
  };

  const toggleModal = (bigImg) => {
    setState((prev) => ({ ...prev, isModalOpen: !prev.isModalOpen, bigImg }));
  };
  return (
    <>
      <Searchbar onSubmit={onSubmitSearch} />
      <ImageGallery searchQuery={state.searchQuery} toggleModal={toggleModal} />
      <ToastContainer theme="colored" autoClose={3000} />
      {state.isModalOpen && (
        <Modal image={state.bigImg} toggleModal={toggleModal} />
      )}
    </>
  );
};

export default App;
