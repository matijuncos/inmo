'use client';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { FaHeart, FaMailBulk } from 'react-icons/fa';
import { FaHouse } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useInmoCtx } from '../context/InmoContext';

const size = 48;
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
  const imgVariants = {
    hidden: { x: 1020 },
    visible: {
      x: 0,
      transition: {
        duration: 0.7
      }
    }
  };

  const goSwipe = () => {
    router.push(user ? '/match' : '/login');
  };

  return (
    <Box position='relative' minHeight='calc(100vh - 80px)' display='flex'>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <Box
          position='absolute'
          top='0'
          right='0'
          bottom='0'
          left='0'
          zIndex='0'
        >
          <Box
            backgroundSize='cover'
            backgroundRepeat='no-repeat'
            backgroundImage='url("/house-render.jpg")'
            height='100%'
            width='100%'
          />
          <Box
            position='absolute'
            top='0'
            right='0'
            bottom='0'
            left='0'
            bg='linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)' // Gradient overlay
          />
        </Box>

        <Box
          position='relative'
          display='flex'
          flexDirection={['column', 'column', 'row']}
          alignContent='center'
          justifyContent='space-evenly'
          padding={['5vw', '3vw']}
          gap={['16px', '24px']}
          height='100%'
          zIndex='10'
        >
          <Box
            gap={['12px', '18px']}
            flex={1}
            display='flex'
            flexDirection='column'
          >
            <Text
              fontSize={['28px', '42px']}
              fontWeight='bold'
              color='white'
              as='h1'
              mt='2rem'
            >
              Encontremos la casa de tus sueños
            </Text>

            <motion.div variants={itemVariants}>
              <Text fontWeight='bold' color='white'>
                La creatividad hoy no está entre nosotros así que no se que
                escribir acà
              </Text>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Text fontWeight='semibold' color='white'>
                Descubre un nuevo estándar en servicios inmobiliarios. En
                Santamarina & Asociados, conectamos personas con sus hogares y
                oportunidades de inversión soñadas, brindando asesoramiento
                profesional y un enfoque personalizado.
              </Text>
            </motion.div>
            <Flex
              w='100%'
              justifyContent='space-evenly'
              alignItems='flex-start'
              m={['16px auto', '32px auto 18px auto']}
            >
              <motion.div variants={itemVariants}>
                <Box
                  width={['80px', '120px']}
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  aspectRatio='1'
                  border='solid 2px white'
                  borderRadius='4px'
                  transition='all ease 0.3s'
                  _hover={{
                    transform: 'scale(1.05)'
                  }}
                >
                  <FaHeart size={size} color='white' />
                </Box>
                <Text
                  m=' 8px auto auto auto'
                  textAlign='center'
                  color='white'
                  fontWeight={600}
                >
                  Hacé match!
                </Text>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Box
                  width={['80px', '120px']}
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  aspectRatio='1'
                  border='solid 2px white'
                  borderRadius='4px'
                  fontWeight={600}
                  transition='all ease 0.3s'
                  _hover={{
                    transform: 'scale(1.05)'
                  }}
                >
                  <FaMailBulk size={size} color='white' />
                </Box>
                <Text
                  m=' 8px auto auto auto'
                  textAlign='center'
                  color='white'
                  fontWeight={600}
                >
                  Comunicate con <br />
                  un representante
                </Text>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Box
                  width={['80px', '120px']}
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  aspectRatio='1'
                  border='solid 2px white'
                  borderRadius='4px'
                  transition='all ease 0.3s'
                  _hover={{
                    transform: 'scale(1.05)'
                  }}
                >
                  <FaHouse size={size} color='white' />
                </Box>
                <Text
                  fontWeight={600}
                  m=' 8px auto auto auto'
                  textAlign='center'
                  color='white'
                >
                  Conocé tu <br />
                  próximo hogar!
                </Text>
              </motion.div>
            </Flex>
            <Box
              position='relative'
              display={['block', 'block', 'none']}
              boxShadow='18px 18px 24px rgba(0,0,0, 0.55)'
              width={['100%', '100%', '40%']}
              minHeight={['450px', '450px', '450px']}
              borderRadius='12px'
              padding='14px'
              zIndex='10'
              backgroundImage='url("/placeit.png")'
              backgroundRepeat='no-repeat'
              backgroundSize='cover'
              backgroundPosition='50% 50%'
            ></Box>
            <motion.button
              onClick={goSwipe}
              style={{
                padding: '8px',
                backgroundColor: '#B50202',
                borderRadius: '4px',
                color: 'whitesmoke',
                fontWeight: '600'
              }}
              variants={itemVariants}
            >
              ¡Empezar!
            </motion.button>
          </Box>
          <Box
            position='relative'
            p='2rem'
            display={['none', 'none', 'block']}
            //   boxShadow='18px 18px 24px rgba(0,0,0, 0.25)'
            width={['100%', '100%', '40%']}
            minHeight={['450px', '450px', '450px']}
            borderRadius='6px'
            zIndex='10'
            /*  backgroundImage='url("/placeit.png")'
            backgroundRepeat='no-repeat'
            backgroundSize='cover'
            backgroundPosition='50% 50%' */
          >
            <motion.div
              variants={imgVariants}
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: 'url("/placeit.png")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: '50% 50%',
                borderRadius: '3px',
                boxShadow: '18px 18px 24px rgba(0,0,0, 0.25)'
              }}
            ></motion.div>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Hero;
