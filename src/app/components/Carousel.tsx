'use client';
import { Box } from '@chakra-ui/react';
import React from 'react';
import PhotoCarousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Carousel = ({
  images,
  setSelectedImage,
  setIsModalOpen
}: {
  images: string[];
  setIsModalOpen: Function;
  setSelectedImage: Function;
}) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 454 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 454, min: 0 },
      items: 2
    }
  };
  return (
    <PhotoCarousel
      swipeable={true}
      draggable={true}
      centerMode={true}
      showDots={false}
      arrows={false}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      autoPlay={true}
      transitionDuration={500}
      containerClass='carousel-container'
      dotListClass='custom-dot-list-style'
    >
      {images.map((img) => (
        <div
          onClick={() => {
            setSelectedImage(img);
            setIsModalOpen(true);
          }}
          className='small-image'
          style={{ backgroundImage: 'url(' + img + ')' }}
          key={img}
        />
      ))}
    </PhotoCarousel>
  );
};

export default Carousel;
