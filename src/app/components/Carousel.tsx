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
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <Box>
      <PhotoCarousel
        swipeable={true}
        draggable={true}
        centerMode
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
        itemClass='carousel-item-padding-40-px'
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
    </Box>
  );
};

export default Carousel;
