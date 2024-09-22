'use client';
import { Box, Button, Flex, Text, Container, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  FaHeart,
  FaMailBulk,
  FaSearch,
  FaArrowRight,
  FaHome,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useInmoCtx } from '../context/InmoContext';
import { useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const router = useRouter();
  const { user } = useInmoCtx();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const goSwipe = () => {
    router.push(user ? '/match' : '/login');
  };

  const [viewportHeight, setViewportHeight] = useState(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    setViewportHeight(window.innerHeight);
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const y = useTransform(
    scrollY,
    [0, viewportHeight],
    [0, viewportHeight * 0.38]
  );

  const ctaVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.98 }
  };

  const MotionBox = motion(Box);
  const MotionFlex = motion(Flex);

  return (
    <Box position='relative' height='calc(100vh)' overflow='hidden'>
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ y }}
        position='absolute'
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={-1}
      >
        <Image
          src='/house-render.jpg'
          //layout='fill'
          objectFit='cover'
          alt='Hero background'
        />
        <Box
          position='absolute'
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg='linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)'
        />
      </MotionBox>

      <Container maxW='container.xl' height='100%'>
        <Flex height='100%' alignItems='center'>
          <MotionFlex
            flexDirection='column'
            maxWidth='600px'
            variants={containerVariants}
            initial='hidden'
            animate='visible'
          >
            <MotionBox variants={itemVariants}>
              <Text
                fontSize={['4xl', '5xl', '6xl']}
                fontWeight='bold'
                color='white'
                lineHeight='1.2'
                mb={4}
              >
                Encuentra el hogar de tus sueños
              </Text>
            </MotionBox>

            <MotionBox variants={itemVariants}>
              <Text fontSize='xl' color='whiteAlpha.800' mb={8}>
                Descubre propiedades únicas y haz realidad tu visión de hogar
                perfecto con nuestra plataforma intuitiva y personalizada.
              </Text>
            </MotionBox>

            <MotionBox variants={itemVariants}>
              <MotionBox
                as='button'
                onClick={goSwipe}
                variants={ctaVariants}
                initial='rest'
                whileHover='hover'
                whileTap='tap'
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                bg='linear-gradient(135deg, #B50202 0%, #FF4D4D 100%)'
                borderRadius='20px'
                boxShadow='0px 8px 20px rgba(181, 2, 2, 0.3)'
                p={1}
                position='relative'
                overflow='hidden'
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  transition: '0.5s'
                }}
                _hover={{
                  _before: {
                    left: '100%'
                  }
                }}
              >
                <Flex
                  alignItems='center'
                  justifyContent='space-between'
                  bg='white'
                  borderRadius='18px'
                  p={4}
                >
                  <Flex alignItems='center'>
                    <Box bg='#B50202' borderRadius='full' p={3} mr={4}>
                      <FaSearch color='white' size='24px' />
                    </Box>
                    <Box textAlign='left'>
                      <Text fontWeight='bold' fontSize='xl' color='#B50202'>
                        ¡Empieza tu búsqueda!
                      </Text>
                      <Text fontSize='sm' color='gray.600'>
                        Encuentra tu hogar ideal ahora
                      </Text>
                    </Box>
                  </Flex>
                  <Box bg='#B50202' borderRadius='full' p={3} ml={4}>
                    <FaArrowRight color='white' size='24px' />
                  </Box>
                </Flex>
              </MotionBox>
            </MotionBox>

            <MotionFlex
              mt={12}
              justifyContent='space-between'
              variants={itemVariants}
            >
              {[
                { icon: FaHeart, text: 'Favoritos personalizados' },
                { icon: FaHome, text: 'Miles de propiedades' },
                { icon: FaMapMarkerAlt, text: 'Ubicaciones premium' }
              ].map((item, index) => (
                <Flex key={index} alignItems='center' color='white'>
                  <Box as={item.icon} size='24px' mr={2} />
                  <Text fontSize='sm'>{item.text}</Text>
                </Flex>
              ))}
            </MotionFlex>
          </MotionFlex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Hero;
