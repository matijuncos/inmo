import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
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
            <MapContainer
              center={[-31.3192715, -64.2830725]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: '300px', width: '100%' }}
            >
              <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[-31.3192715, -64.2830725]}>
                <Popup>Estas aca</Popup>
              </Marker>
            </MapContainer>
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
            <IconAndData
              Icon={FaRulerCombined}
              textValue={
                'Metros totales: ' + information?.totalMeters?.toString()
              }
            />
            <IconAndData
              Icon={FaBath}
              textValue={'Baños: ' + information?.bathrooms?.toString()}
            />
            <IconAndData
              Icon={FaDoorOpen}
              textValue={'Ambientes: ' + information?.rooms?.toString()}
            />
            <IconAndData
              Icon={FaBed}
              textValue={'Dormitorios: ' + information?.bedrooms?.toString()}
            />
            <IconAndData
              Icon={FaBuilding}
              textValue={'Plantas: ' + information?.stories?.toString()}
            />
            <IconAndData
              Icon={FaCar}
              textValue={'Garaje: ' + information?.garage?.toString()}
            />
            <IconAndData
              Icon={FaCalendarAlt}
              textValue={
                'Antigüedad: ' + information?.antiquity?.toString() + ' años'
              }
            />
            <IconAndData
              Icon={FaWifi}
              textValue={'Internet: ' + (information?.internet ? 'Sí' : 'No')}
            />
            <IconAndData
              Icon={FaSnowflake}
              textValue={
                'Aire Acondicionado: ' + (information?.ac ? 'Sí' : 'No')
              }
            />
            <IconAndData
              Icon={FaFire}
              textValue={'Calefacción: ' + (information?.heat ? 'Sí' : 'No')}
            />
            <IconAndData
              Icon={FaBurn}
              textValue={'Gas: ' + (information?.gas ? 'Sí' : 'No')}
            />
            <IconAndData
              Icon={FaTags}
              textValue={'Tipo de vivienda: ' + information?.category}
            />
            <IconAndData
              Icon={FaHandshake}
              textValue={'Tipo de Operación: ' + information?.operationType}
            />
            <IconAndData
              Icon={FaCheckCircle}
              textValue={
                'Disponible: ' + (information?.available ? 'Sí' : 'No')
              }
            />
          </div>
          <Box p='16px'>
            <Text fontWeight={600}>Mas detalles:</Text>
            {information?.more}
          </Box>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default InfoModal;
