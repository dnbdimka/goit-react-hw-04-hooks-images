import React, { useEffect } from "react";
import { ModalStyle } from "./ModalStyled";

const bodyRef = document.querySelector("body");

const Modal = ({ image, toggleModal }) => {
  useEffect(() => {
    window.addEventListener("keydown", onHandleEscape);
    bodyRef.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onHandleEscape);
      bodyRef.style.overflow = "auto";
    };
  });

  const onHandleEscape = (e) => e.code === "Escape" && toggleModal();

  const onOverlayClick = (e) => e.target === e.currentTarget && toggleModal();
  return (
    <>
      <ModalStyle onClick={onOverlayClick}>
        <div className="Modal">
          <img src={image} alt="" />
        </div>
      </ModalStyle>
    </>
  );
};

export default Modal;
