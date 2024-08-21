import { Box, Flex, Text } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import PropertyCard from '../components/PropertyCard';
import { getAllProperties } from '@/lib/getAllProperties';
import { Property } from '@/lib/types/types';

export default async function PropertiesPage() {
  const properties: Property[] | undefined = await getAllProperties();
  return (
    <Suspense fallback='Cargando...'>
      <Box width={{ base: '95%', md: '80%' }} pt='1rem' m='auto'>
        <Text as='h2' fontWeight='700' fontSize={24}>
          Conocé nuestras propiedades.
        </Text>
        <Flex
          py='2rem'
          flexWrap='wrap'
          flexDirection={{ base: 'column', md: 'row' }}
          gap='18px'
        >
          {properties?.map((item, idx) => {
            return <PropertyCard key={idx} property={item} />;
          })}
        </Flex>
      </Box>
    </Suspense>
  );
}
