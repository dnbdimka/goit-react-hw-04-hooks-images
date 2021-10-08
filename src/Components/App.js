import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Searchbar from "./searchBar/SearchBar";
import ImageGallery from "./imageGallery/ImageGallery";
import Modal from "./modal/Modal";

const initialStateQuery = {
  searchQuery: "",
  bigImg: "",
};

const App = () => {
  const [query, setQuery] = useState(initialStateQuery);
  const [modal, setModalOpen] = useState(false);

  const onSubmitSearch = (searchInput) => {
    setQuery((prev) => ({ ...prev, searchQuery: searchInput }));
  };

  const toggleModal = (bigImg) => {
    setQuery((prev) => ({ ...prev, bigImg }));
    setModalOpen((prev) => !prev);
  };
  return (
    <>
      <Searchbar onSubmit={onSubmitSearch} />
      <ImageGallery searchQuery={query.searchQuery} toggleModal={toggleModal} />
      <ToastContainer theme="colored" autoClose={3000} />
      {modal && <Modal image={query.bigImg} toggleModal={toggleModal} />}
    </>
  );
};

export default App;
