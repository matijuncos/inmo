import IconAndData from '@/app/components/IconAndData';
import ImagesPreview from '@/app/components/ImagesPreview';
import SendEmailbtn from '@/app/components/SendEmailbtn';
import { getOneProperty } from '@/lib/getOneProperty';
import connectToDatabase from '@/lib/mongodb';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
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
  FaLocationPin,
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
      <Box width={['95%', '90%', '85%', '80%']} margin='2rem auto' pt='40px'>
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
              {location && (
                <IconAndData
                  Icon={FaLocationPin}
                  textValue={`Ubicación: ${location}`}
                />
              )}
              {price && (
                <IconAndData
                  Icon={FaDollarSign}
                  textValue={`Precio: U$D ${price}`}
                />
              )}
              {totalMeters && (
                <IconAndData
                  Icon={FaRulerCombined}
                  textValue={`Metros totales: ${totalMeters}m2`}
                />
              )}
              {coveredMeters && (
                <IconAndData
                  Icon={FaRulerCombined}
                  textValue={`Metros cubiertos: ${coveredMeters}m2`}
                />
              )}
              {bathrooms && (
                <IconAndData Icon={FaBath} textValue={`Baños: ${bathrooms}`} />
              )}
              {rooms && (
                <IconAndData
                  Icon={FaDoorOpen}
                  textValue={`Ambientes: ${rooms}`}
                />
              )}
              {bedrooms && (
                <IconAndData
                  Icon={FaBed}
                  textValue={`Dormitorios: ${bedrooms}`}
                />
              )}
              {stories && (
                <IconAndData
                  Icon={FaBuilding}
                  textValue={`Plantas: ${stories}`}
                />
              )}
              {garage && (
                <IconAndData Icon={FaCar} textValue={`Garaje: ${garage}`} />
              )}
              {antiquity && (
                <IconAndData
                  Icon={FaCalendarAlt}
                  textValue={`Antigüedad: ${antiquity} años`}
                />
              )}
              {internet !== undefined && (
                <IconAndData
                  Icon={FaWifi}
                  textValue={`Internet: ${internet ? 'Sí' : 'No'}`}
                />
              )}
              {ac !== undefined && (
                <IconAndData
                  Icon={FaSnowflake}
                  textValue={`Aire Acondicionado: ${ac ? 'Sí' : 'No'}`}
                />
              )}
              {heat !== undefined && (
                <IconAndData
                  Icon={FaFire}
                  textValue={`Calefacción: ${heat ? 'Sí' : 'No'}`}
                />
              )}
              {gas !== undefined && (
                <IconAndData
                  Icon={FaBurn}
                  textValue={`Gas: ${gas ? 'Sí' : 'No'}`}
                />
              )}
              {category && (
                <IconAndData
                  Icon={FaTags}
                  textValue={`Tipo de vivienda: ${category}`}
                />
              )}
              {operationType && (
                <IconAndData
                  Icon={FaHandshake}
                  textValue={`Tipo de Operación: ${operationType}`}
                />
              )}
            </div>
            {more && (
              <Box p='16px' w='100%' maxW='600px'>
                <Text fontWeight={600}>Mas detalles:</Text>
                <Box dangerouslySetInnerHTML={{ __html: more }} />
              </Box>
            )}

            <SendEmailbtn property={property} />
          </Box>
        </Flex>
      </Box>
    </Suspense>
  );
}
