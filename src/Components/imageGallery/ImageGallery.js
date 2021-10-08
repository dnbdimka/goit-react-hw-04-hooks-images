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

const initialStateGallery = {
  page: 1,
  gallery: [],
  totalPage: 1,
};

const ImageGallery = ({ searchQuery, toggleModal }) => {
  const [gallery, setGallery] = useState(initialStateGallery);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery === "") {
      return;
    }

    async function fetchData() {
      const data = await getGallery(1, searchQuery.trim(""));
      return data;
    }
    setGallery((prev) => ({ ...prev, page: 1, gallery: [] }));
    setLoading((prev) => !prev);

    fetchData().then((data) => {
      const galleryList = data.normalizeData;
      setGallery((prev) => ({
        ...prev,
        gallery: galleryList,
        total: data.total,
        totalPage: Math.ceil(data.total / 12),
      }));
      setLoading((prev) => !prev);
      if (galleryList.length === 0) {
        toast.error("Please enter valid search query");
        setGallery((prev) => ({ ...prev, totalPage: 1 }));
        return;
      }
    });
  }, [searchQuery]);

  const onLoadMoreClick = async () => {
    setLoading((prev) => !prev);
    const data = await getGallery(gallery.page + 1, searchQuery.trim(""));
    const galleryList = data.normalizeData;

    setGallery((prev) => ({
      ...prev,
      page: gallery.page + 1,
      gallery: [...gallery.gallery, ...galleryList],
    }));
    setLoading((prev) => !prev);

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <SearchGalleryList>
        {gallery.gallery.map((item) => (
          <ImageGalleryItem
            key={item.id}
            image={item}
            toggleModal={toggleModal}
          />
        ))}
      </SearchGalleryList>
      {loading.isLoading && (
        <LoaderContainer>
          <Loader type="Oval" color="#3f51b5" height={40} width={40} />
        </LoaderContainer>
      )}
      {gallery.page !== gallery.totalPage && !loading.isLoading && (
        <Button type="button" onClick={onLoadMoreClick} className="Button">
          Load More
        </Button>
      )}
    </>
  );
};

export default ImageGallery;
