'use client';
import dynamic from 'next/dynamic';

import React from 'react';
import {
  Box,
  CloseButton,
  Flex,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import IconAndData from './IconAndData';
import {
  FaRulerCombined,
  FaBath,
  FaDoorOpen,
  FaBed,
  FaBuilding,
  FaCar,
  FaCalendarAlt,
  FaWifi,
  FaSnowflake,
  FaFire,
  FaBurn,
  FaTags,
  FaHandshake,
  FaDollarSign,
  FaCheckCircle
} from 'react-icons/fa';
import { Property } from '@/lib/types/types';
const HouseMap = dynamic(() => import('./HouseMap'), { ssr: false });

const InfoModal = ({
  isOpen,
  onClose,
  information
}: {
  isOpen: boolean;
  onClose: () => void;
  information?: Property;
}) => {
  return (
    <Modal
      blockScrollOnMount
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick
    >
      <ModalOverlay>
        <ModalContent maxW='95vw' w='1084px' m='0 auto' maxH='95vh'>
          <ModalHeader>
            <Flex>
              Caraterísticas
              <CloseButton outline='none' marginLeft='auto' onClick={onClose} />
            </Flex>
          </ModalHeader>
          {information?.coords?.lat && information?.coords?.lon && (
            <HouseMap information={information} />
          )}
          <div
            style={{
              padding: '16px',
              display: 'grid',
              width: '100%',
              overflow: 'auto',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }}
          >
            {information?.showPrice && (
              <IconAndData
                Icon={FaDollarSign}
                textValue={'Precio: U$D' + information?.price?.toString()}
              />
            )}
            {information?.totalMeters && (
              <IconAndData
                Icon={FaRulerCombined}
                textValue={`Metros totales: ${information.totalMeters}m2`}
              />
            )}
            {information?.bathrooms && (
              <IconAndData
                Icon={FaBath}
                textValue={`Baños: ${information.bathrooms}`}
              />
            )}
            {information?.rooms && (
              <IconAndData
                Icon={FaDoorOpen}
                textValue={`Ambientes: ${information.rooms}`}
              />
            )}
            {information?.bedrooms && (
              <IconAndData
                Icon={FaBed}
                textValue={`Dormitorios: ${information.bedrooms}`}
              />
            )}
            {information?.stories && (
              <IconAndData
                Icon={FaBuilding}
                textValue={`Plantas: ${information.stories}`}
              />
            )}
            {information?.garage && (
              <IconAndData
                Icon={FaCar}
                textValue={`Garaje: ${information.garage}`}
              />
            )}
            {information?.antiquity && (
              <IconAndData
                Icon={FaCalendarAlt}
                textValue={`Antigüedad: ${information.antiquity} años`}
              />
            )}
            {information?.internet !== undefined && (
              <IconAndData
                Icon={FaWifi}
                textValue={`Internet: ${information.internet ? 'Sí' : 'No'}`}
              />
            )}
            {information?.ac !== undefined && (
              <IconAndData
                Icon={FaSnowflake}
                textValue={`Aire Acondicionado: ${
                  information.ac ? 'Sí' : 'No'
                }`}
              />
            )}
            {information?.heat !== undefined && (
              <IconAndData
                Icon={FaFire}
                textValue={`Calefacción: ${information.heat ? 'Sí' : 'No'}`}
              />
            )}
            {information?.gas !== undefined && (
              <IconAndData
                Icon={FaBurn}
                textValue={`Gas: ${information.gas ? 'Sí' : 'No'}`}
              />
            )}
            {information?.category && (
              <IconAndData
                Icon={FaTags}
                textValue={`Tipo de vivienda: ${information.category}`}
              />
            )}
            {information?.operationType && (
              <IconAndData
                Icon={FaHandshake}
                textValue={`Tipo de Operación: ${information.operationType}`}
              />
            )}
            {information?.available !== undefined && (
              <IconAndData
                Icon={FaCheckCircle}
                textValue={`Disponible: ${information.available ? 'Sí' : 'No'}`}
              />
            )}
          </div>
          <Box p='16px'>
            <Text fontWeight={600}>Mas detalles:</Text>
            <Box
              dangerouslySetInnerHTML={{ __html: information?.more || '' }}
            />
          </Box>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default InfoModal;
