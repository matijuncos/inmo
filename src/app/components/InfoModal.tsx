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
          <div
            style={{
              padding: '16px',
              display: 'grid',
              width: '100%',
              overflow: 'auto',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Creates three columns
              gap: '20px' // Adds space between the columns
            }}
          >
            {information?.showPrice && (
              <IconAndData
                Icon={FaDollarSign} // Icon for price
                textValue={'Precio: U$D' + information?.price?.toString()}
              />
            )}
            <IconAndData
              Icon={FaRulerCombined} // Icon for total meters
              textValue={
                'Metros totales: ' + information?.totalMeters?.toString()
              }
            />
            <IconAndData
              Icon={FaBath} // Icon for bathrooms
              textValue={'Baños: ' + information?.bathrooms?.toString()}
            />
            <IconAndData
              Icon={FaDoorOpen} // Icon for rooms
              textValue={'Ambientes: ' + information?.rooms?.toString()}
            />
            <IconAndData
              Icon={FaBed} // Icon for bedrooms
              textValue={'Dormitorios: ' + information?.bedrooms?.toString()}
            />
            <IconAndData
              Icon={FaBuilding} // Icon for stories
              textValue={'Plantas: ' + information?.stories?.toString()}
            />
            <IconAndData
              Icon={FaCar} // Icon for garage
              textValue={'Garaje: ' + information?.garage?.toString()}
            />
            <IconAndData
              Icon={FaCalendarAlt} // Icon for antiquity
              textValue={
                'Antigüedad: ' + information?.antiquity?.toString() + ' años'
              }
            />
            <IconAndData
              Icon={FaWifi} // Icon for internet
              textValue={'Internet: ' + (information?.internet ? 'Sí' : 'No')}
            />
            <IconAndData
              Icon={FaSnowflake} // Icon for air conditioning
              textValue={
                'Aire Acondicionado: ' + (information?.ac ? 'Sí' : 'No')
              }
            />
            <IconAndData
              Icon={FaFire} // Icon for heating
              textValue={'Calefacción: ' + (information?.heat ? 'Sí' : 'No')}
            />
            <IconAndData
              Icon={FaBurn} // Icon for gas
              textValue={'Gas: ' + (information?.gas ? 'Sí' : 'No')}
            />
            <IconAndData
              Icon={FaTags} // Icon for category
              textValue={'Tipo de vivienda: ' + information?.category}
            />
            <IconAndData
              Icon={FaHandshake} // Icon for operation type
              textValue={'Tipo de Operación: ' + information?.operationType}
            />

            <IconAndData
              Icon={FaCheckCircle} // Icon for availability
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
