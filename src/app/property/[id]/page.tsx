import HouseMap from '@/app/components/HouseMap';
import IconAndData from '@/app/components/IconAndData';
import ImagesPreview from '@/app/components/ImagesPreview';
import { getOneProperty } from '@/lib/getOneProperty';
import connectToDatabase from '@/lib/mongodb';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
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
  /**
   * {
  coords: { lon: -32.3, lat: -64 },
  _id: new ObjectId('66653f60cb6275b18e47a4fa'),
  title: 'Modern Condo',
  location: '4321 Elm Street, San Francisco, CA 94102',
  stories: 3,
  pool: false,
  garage: 1,
  isPrivate: false,
  antiquity: 5,
  internet: true,
  ac: true,
  heat: false,
  gas: false,
  more: 'Eco-friendly materials and smart home features.',
  category: 'Condo',
  operationType: 'Rent',
  rooms: '3',
  showPrice: true,
  coveredMeters: 150,
  totalMenters: 180,
  price: 3500,
  images: [
    'https://i.ibb.co/VYZYzvr/a2fa8145fdd2.jpg',
    'https://i.ibb.co/hgjkn4w/656a988df7f3.jpg',
    'https://i.ibb.co/qsNdm77/62d29171b94b.jpg',
    'https://i.ibb.co/Kh5gXck/ce27b4d2d731.jpg'
  ],
  bedrooms: 2,
  bathrooms: 2,
  available: true,
  interestedUsers: [
    new ObjectId('6665f162e1e094e0fd9cc66f'),
    new ObjectId('66aa7edfe94f0538502b1223')
  ],
  __v: 9,
  totalMeters: 1200
}
   */

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
              <Button>Pedí una visita</Button>
              <Button>Contactar</Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Suspense>
  );
}
