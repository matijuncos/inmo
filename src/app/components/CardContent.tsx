'use client';
import { Property } from '@/lib/types/types';
import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { BiInfoCircle } from 'react-icons/bi';
import { useInmoCtx } from '../context/InmoContext';

const CardContent = ({
  property,
  hasMainFeatures,
  setIsInfoModalOpen
}: {
  property: Property;
  hasMainFeatures: boolean;
  setIsInfoModalOpen: Function;
}) => {
  const { user } = useInmoCtx();

  return (
    <>
      <Box
        boxShadow='xl'
        style={{
          backgroundImage: 'url(' + property.images[0] + ')'
        }}
        className='card'
      >
        {property.interestedUsers.some((use) => user?.userId === use._id) && (
          <Box
            border='solid 6px green'
            borderRadius='16px'
            backgroundColor='white'
            p={['6px', '14px']}
            position='absolute'
            top={['30px', '62px']}
            right={['0px', '14px']}
            transform='rotate(30deg)'
            boxShadow='4px 4px 4px rgba(0, 0, 0, 0.3)'
            color='green'
            fontWeight={700}
            fontSize={['16px', '18px', '20px', '24px']}
          >
            <Text>Ya hiciste Match!</Text>
          </Box>
        )}
        {/*         {hasMainFeatures && (
          <Flex className='flex-in-card' boxShadow='xl'>
            <Text color='black' pl='8px' fontSize={['16px', '18px', '20px', '24px']} fontWeight={600}>
              {property.title}
            </Text>
            <div
              className='card-more-info'
              onClick={() => setIsInfoModalOpen(true)}
            >
              <BiInfoCircle size={20} color='#223150' />
              <Text>Ver información</Text>
            </div>
          </Flex>
        )} */}
      </Box>
    </>
  );
};

export default CardContent;
