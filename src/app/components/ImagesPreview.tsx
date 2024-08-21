'use client';

import { Box, Flex, Image } from '@chakra-ui/react';
import { useState } from 'react';

const ImagesPreview = ({ images }: { images: string[] }) => {
  const [initialImg, setInitialImg] = useState(images?.[0]);
  return (
    <Flex flexDirection='column' maxWidth='500px' margin='0' flex='1'>
      <Box
        backgroundImage={`url(${initialImg})`}
        width='100%'
        height='400px'
        backgroundSize='cover'
        backgroundPosition='center'
        borderRadius='3px'
      ></Box>
      <Flex justifyContent='space-between' flexWrap='wrap' gap='4px' my='8px'>
        {images.length > 1 &&
          images.map((img, index) => (
            <Box
              flex={1}
              key={index}
              borderRadius='3px'
              cursor='pointer'
              onClick={() => setInitialImg(img)}
              width='80px'
              height='80px'
              backgroundImage={`url(${img})`}
              backgroundSize='cover'
              backgroundPosition='center'
            ></Box>
          ))}
      </Flex>
    </Flex>
  );
};

export default ImagesPreview;
