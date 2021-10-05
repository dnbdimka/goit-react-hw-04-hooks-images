import React from "react";

const ImageGalleryItem = ({ toggleModal, image }) => {
  const onImgClick = () => {
    toggleModal(image.bigImg);
  };
  return (
    <li className="ImageGalleryItem">
      <img
        src={image.smallImg}
        alt=""
        className="ImageGalleryItem-image"
        onClick={onImgClick}
      />
    </li>
  );
};

export default ImageGalleryItem;
