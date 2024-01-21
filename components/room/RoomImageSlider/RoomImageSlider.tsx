"use client"
import { IImage } from "@/backend/models/room";
import Image from "next/image";
import React, { useState } from "react";
import styles from './roomImageSlider.module.css';

interface RoomImageSliderProps {
  images: IImage[];
}

export const RoomImageSlider = ({ images }: RoomImageSliderProps) => {
  const [currentIndex,setCurrentIndex] = useState<number>(0);

  const handleNextClick = () => {
    if(currentIndex===images.length-1) {
      setCurrentIndex(0);
    } else {setCurrentIndex(prev => prev+1)}
  }
  const handlePreviousClick = () => {
    if(currentIndex===0) {
      setCurrentIndex(images.length-1);
    } else {setCurrentIndex(prev => prev-1)}
  }

  return (
<div>
{
  images.length > 0 ? <>
  <div className="flex align-align-items-center" style={{ width: "90%", height: "460px" }}>
  <Image
    className="d-block m-auto"
    src={images[currentIndex].url}
    alt={images[currentIndex].url}
    width={600}
    height={300}
  />
    <div className="w-100">
    <button onClick={handlePreviousClick} className={`btn ${styles['action-btn']}`}>
    <i className="fa-solid fa-chevron-left"></i>
      Previous

    </button>
    <button onClick={handleNextClick} className={`btn ${styles['action-btn']}`}>
      Next
    <i className="fa-solid fa-chevron-right"></i>
    </button>
    </div>
</div>
  </> : <div style={{ width: "100%", height: "460px" }}>
  <Image
    className="d-block m-auto"
    src="/images/default_room_image.jpg"
    alt="/images/default_room_image.jpg"
    width={600}
    height={500}
  />
</div>
}
</div>
  );
};


{/* <div style={{ width: "100%", height: "460px" }}>
  <Image
    className="d-block m-auto"
    src="/images/default_room_image.jpg"
    alt="/images/default_room_image.jpg"
    width={600}
    height={500}
  />
</div> */}