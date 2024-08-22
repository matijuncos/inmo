import IconAndData from '@/app/components/IconAndData';
import ImagesPreview from '@/app/components/ImagesPreview';
import { getOneProperty } from '@/lib/getOneProperty';
import connectToDatabase from '@/lib/mongodb';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React, { Suspense, useState } from 'react';
import {
  FaBurn,
  FaCalendarAlt,
  FaFire,
  FaHandshake,
  FaSnowflake,
  FaTags,
  FaWifi
} from 'react-icons/fa';
import {
  FaBath,
  FaBed,
  FaBuilding,
  FaCar,
  FaDollarSign,
  FaDoorOpen,
  FaRulerCombined
} from 'react-icons/fa6';
const HouseMap = dynamic(() => import('../../components/HouseMap'), {
  ssr: false
});

export default async function page({
  params: { id }
}: {
  params: { id: string };
}) {
  await connectToDatabase();
  const property = await getOneProperty(id);
  console.log(id, property);
  const {
    coords,
    title,
    more,
    bedrooms,
    price,
    totalMeters,
    category,
    bathrooms,
    images,
    coveredMeters,
    totalMenters,
    operationType,
    rooms,
    location,
    antiquity,
    internet,
    ac,
    heat,
    gas,
    stories,
    pool,
    garage,
    isPrivate
  } = property;

  return (
    <Suspense fallback='Cargando...'>
      <Box width={['95%', '90%', '85%', '80%']} margin='2rem auto'>
        <Text
          as='h2'
          fontSize={['24px', '28px', '34px']}
          fontWeight='600'
          mt='1rem'
          mb='1rem'
        >
          {title}
        </Text>

        <Flex direction={['column', 'column', 'row']} gap='1rem'>
          {!!images?.length && <ImagesPreview images={images} />}
          <Box flex='1'>
            <div
              style={{
                padding: '16px',
                display: 'grid',
                maxWidth: '600px',
                width: '100%',
                overflow: 'auto',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '20px'
              }}
            >
              <IconAndData
                Icon={FaDollarSign}
                textValue={'Precio: U$D' + price?.toString()}
              />
              <IconAndData
                Icon={FaRulerCombined}
                textValue={'Metros totales: ' + totalMeters?.toString()}
              />
              <IconAndData
                Icon={FaBath}
                textValue={'Baños: ' + bathrooms?.toString()}
              />
              <IconAndData
                Icon={FaDoorOpen}
                textValue={'Ambientes: ' + rooms?.toString()}
              />
              <IconAndData
                Icon={FaBed}
                textValue={'Dormitorios: ' + bedrooms?.toString()}
              />
              <IconAndData
                Icon={FaBuilding}
                textValue={'Plantas: ' + stories?.toString()}
              />
              <IconAndData
                Icon={FaCar}
                textValue={'Garaje: ' + garage?.toString()}
              />
              <IconAndData
                Icon={FaCalendarAlt}
                textValue={'Antigüedad: ' + antiquity?.toString() + ' años'}
              />
              <IconAndData
                Icon={FaWifi}
                textValue={'Internet: ' + (internet ? 'Sí' : 'No')}
              />
              <IconAndData
                Icon={FaSnowflake}
                textValue={'Aire Acondicionado: ' + ac ? 'Sí' : 'No'}
              />
              <IconAndData
                Icon={FaFire}
                textValue={'Calefacción: ' + (heat ? 'Sí' : 'No')}
              />
              <IconAndData
                Icon={FaBurn}
                textValue={'Gas: ' + (gas ? 'Sí' : 'No')}
              />
              <IconAndData
                Icon={FaTags}
                textValue={'Tipo de vivienda: ' + category}
              />
              <IconAndData
                Icon={FaHandshake}
                textValue={'Tipo de Operación: ' + operationType}
              />
            </div>
            <Box p='16px' w='100%' maxW='600px'>
              <Text fontWeight={600}>Mas detalles:</Text>
              {more}
            </Box>

            <Flex p='16px' w='100%' gap='18px' direction={['column', 'row']}>
              <Button>Contactate para solicitar ver la propiedad</Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Suspense>
  );
}
