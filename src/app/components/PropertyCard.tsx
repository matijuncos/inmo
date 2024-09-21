'use client';
import { Property } from '@/lib/types/types';
import { Box, Flex, Img, Text } from '@chakra-ui/react';
import React from 'react';
import { FaBed, FaCamera } from 'react-icons/fa';
import { FaLocationPin } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { motion, MotionProps } from 'framer-motion';

const PropertyCard = ({
  property,
  ...motionProps
}: { property: Property } & MotionProps) => {
  const router = useRouter();
  const goToProperty = () => {
    router.push(`/property/${property._id}`);
  };

  return (
    <motion.div {...motionProps}>
      <Flex
        flexDirection='column'
        flex='1'
        maxWidth={{ base: '100%', md: '280px' }}
        height='340px'
        borderBottom='solid 8px #B50202'
        bg='white'
        onClick={goToProperty}
        borderRadius='6px'
        cursor='pointer'
        transition='all ease 0.2s'
        _hover={{
          boxShadow: 'xl'
        }}
      >
        <Box height='200px' position='relative' overflow='hidden'>
          <Img
            alt='foto de propiedad'
            src={property.images?.[0]}
            width='100%'
            height='100%'
            objectFit='cover'
          />
          {!!property.images?.length && (
            <Flex
              position='absolute'
              bottom='3px'
              padding='2px 3px'
              borderRadius='3px'
              right='3px'
              alignItems='center'
              gap='4px'
              fontSize='12px'
              backgroundColor='rgba(255,255,255,0.8)'
            >
              <FaCamera color='grey' />
              1/{property.images.length}
            </Flex>
          )}
        </Box>
        <Flex
          p='6px'
          justifyContent='space-between'
          flexDirection='column'
          gap='2px'
          flex='1'
        >
          <Text fontWeight='600' noOfLines={1}>
            {property.title}
          </Text>
          <Flex alignItems='center' gap='6px'>
            <FaLocationPin color='#B50202' />
            <Text noOfLines={1}>{property.location}</Text>
          </Flex>
          <Flex alignItems='center' gap='6px'>
            <FaBed color='#B50202' />
            <Text>{property.bedrooms} Dormitorios</Text>
          </Flex>
          <Flex alignItems='center' gap='6px'>
            <Text fontSize='20px' fontWeight='700' color='#B50202'>
              U$D {property.price}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </motion.div>
  );
};

export default PropertyCard;
