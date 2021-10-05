import React, { useState, useEffect } from "react";
import ImageGalleryItem from "./imageGalleryItem/ImageGalleryItem";
import {
  Button,
  LoaderContainer,
  SearchGalleryList,
} from "./ImageGalleryStyled";
import { getGallery } from "../../services/galleryAPI";
import { toast } from "react-toastify";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const initialState = { page: 1, gallery: [], isLoading: false, totalPage: 1 };

const ImageGallery = ({ searchQuery, toggleModal }) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (searchQuery === "") {
      return;
    }

    async function fetchData() {
      const data = await getGallery(1, searchQuery.trim(""));
      return data;
    }
    setState((prev) => ({ ...prev, page: 1, isLoading: true, gallery: [] }));

    fetchData().then((data) => {
      const galleryList = data.normalizeData;
      setState((prev) => ({
        ...prev,
        gallery: galleryList,
        isLoading: false,
        total: data.total,
        totalPage: Math.ceil(data.total / 12),
      }));
      if (galleryList.length === 0) {
        toast.error("Please enter valid search query");
        setState((prev) => ({ ...prev, totalPage: 1 }));
        return;
      }
    });
  }, [searchQuery]);

  const onLoadMoreClick = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    const data = await getGallery(state.page + 1, searchQuery.trim(""));
    const galleryList = data.normalizeData;

    setState((prev) => ({
      ...prev,
      page: state.page + 1,
      gallery: [...state.gallery, ...galleryList],
      isLoading: false,
    }));

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <SearchGalleryList>
        {state.gallery.map((item) => (
          <ImageGalleryItem
            key={item.id}
            image={item}
            toggleModal={toggleModal}
          />
        ))}
      </SearchGalleryList>
      {state.isLoading && (
        <LoaderContainer>
          <Loader type="Oval" color="#3f51b5" height={40} width={40} />
        </LoaderContainer>
      )}
      {state.page !== state.totalPage && !state.isLoading && (
        <Button type="button" onClick={onLoadMoreClick} className="Button">
          Load More
        </Button>
      )}
    </>
  );
};

export default ImageGallery;
