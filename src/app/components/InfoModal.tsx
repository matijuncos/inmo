import React from 'react';
import {
  Box,
  CloseButton,
  Modal,
  ModalContent,
  ModalOverlay
} from '@chakra-ui/react';
import IconAndData from './IconAndData';
import { FaHouse } from 'react-icons/fa6';
interface Property {
  _id: string;
  title: string;
  location: string;
  stories: number;
  pool: boolean;
  garage: number;
  isPrivate: boolean;
  antiquity: number;
  internet: boolean;
  ac: boolean;
  heat: boolean;
  gas: boolean;
  more: string;
  category: string;
  operationType: string;
  rooms: string;
  showPrice: boolean;
  coveredMeters: number;
  totalMenters: number; // Note: Check if this should be 'totalMeters'
  price: number;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  available: boolean;
  interestedUsers: any[];
}
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
          <CloseButton outline='none' marginLeft='auto' onClick={onClose} />
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
            <IconAndData
              Icon={FaHouse}
              textValue={
                'Metros totales: ' + information?.totalMenters.toString()
              }
            />
            <IconAndData
              Icon={FaHouse}
              textValue={'Baños: ' + information?.bathrooms.toString()}
            />
            <IconAndData
              Icon={FaHouse}
              textValue={'Ambientes: ' + information?.rooms.toString()}
            />
            <IconAndData
              Icon={FaHouse}
              textValue={'Dormitorios: ' + information?.bedrooms.toString()}
            />
            <IconAndData
              Icon={FaHouse}
              textValue={'Plantas: ' + information?.stories.toString()}
            />
            <IconAndData
              Icon={FaHouse}
              textValue={'Garaje: ' + information?.garage.toString()}
            />
            <IconAndData
              Icon={FaHouse}
              textValue={
                'Antigüedad: ' + information?.antiquity.toString() + ' años'
              }
            />
            <IconAndData
              Icon={FaHouse}
              textValue={'Internet: ' + (information?.internet ? 'Sí' : 'No')}
            />
            <IconAndData
              Icon={FaHouse}
              textValue={
                'Aire Acondicionado: ' + (information?.ac ? 'Sí' : 'No')
              }
            />
            <IconAndData
              Icon={FaHouse}
              textValue={'Calefacción: ' + (information?.heat ? 'Sí' : 'No')}
            />
            <IconAndData
              Icon={FaHouse}
              textValue={'Gas: ' + (information?.gas ? 'Sí' : 'No')}
            />
            <IconAndData
              Icon={FaHouse}
              textValue={'Categoría: ' + information?.category}
            />
            <IconAndData
              Icon={FaHouse}
              textValue={'Tipo de Operación: ' + information?.operationType}
            />
            <IconAndData
              Icon={FaHouse}
              textValue={'Precio: $' + information?.price.toString()}
            />
            <IconAndData
              Icon={FaHouse}
              textValue={
                'Disponible: ' + (information?.available ? 'Sí' : 'No')
              }
            />
          </div>
          <Box p='16px'>{information?.more}</Box>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default InfoModal;
