'use client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Flex,
  useDisclosure,
  Button
} from '@chakra-ui/react';
import axios from 'axios';
import { BiPlusCircle } from 'react-icons/bi';
import AdminModal from '../components/AdminModal';
import PropertyDetailsModal from '../components/PropertyDetailsModal';
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
const Admin = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [openMoreInfoModal, setOpenMoreInfoModal] = useState(false);
  const [interestedPeople, setInterestedPeople] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/api/listProperties');
        setProperties(data.properties);
      } catch (error) {}
    })();
  }, []);

  const CustomCell = ({ interestedPeople }: { interestedPeople: any }) => {
    const handleClick = (interestedPeolple: any) => {
      setInterestedPeople(interestedPeolple);
      setOpenMoreInfoModal(true);
    };

    return (
      <Td>
        <Flex alignItems='center' gap='4px'>
          {interestedPeople?.[0]?.fullName || 'N/A'}
          {interestedPeople.length > 0 && (
            <BiPlusCircle
              cursor='pointer'
              size='20px'
              color='green'
              onClick={() => handleClick(interestedPeople)}
            />
          )}
        </Flex>
      </Td>
    );
  };
  const handleOpenModal = (property: Property) => {
    setSelectedProperty(property);
    onOpen();
  };
  return (
    <>
      <AdminModal
        isOpen={openMoreInfoModal}
        interestedPeople={interestedPeople}
        onClose={() => setOpenMoreInfoModal(false)}
      />
      <PropertyDetailsModal
        isOpen={isOpen}
        onClose={onClose}
        property={selectedProperty}
      />
      <Box>
        <Box overflowX='auto'>
          <Table whiteSpace='nowrap' layout='auto'>
            <Thead>
              <Tr>
                <Th>Propiedad</Th>
                <Th>Metros Totales</Th>
                <Th>Metros Cubiertos</Th>
                <Th>Interesados</Th>
                <Th>Precio</Th>
                <Th>Categoría</Th>
                <Th>Tipo de Operación</Th>
                <Th>Habitaciones</Th>
                <Th>Dormitorios</Th>
                <Th>Baños</Th>
                <Th>Disponible</Th>
              </Tr>
            </Thead>
            <Tbody>
              {properties?.map((prop, i) => {
                return (
                  <Tr key={i}>
                    <Td>{prop.title}</Td>
                    <Td>{prop.totalMenters} m2</Td>
                    <Td>{prop.coveredMeters} m2</Td>
                    <CustomCell interestedPeople={prop.interestedUsers} />
                    <Td>U$D{prop.price}</Td>
                    <Td>{prop.category}</Td>
                    <Td>{prop.operationType}</Td>
                    <Td>{prop.rooms}</Td>
                    <Td>{prop.bedrooms}</Td>
                    <Td>{prop.bathrooms}</Td>
                    <Td>{prop.available ? 'Si' : 'No'}</Td>
                    <Td>
                      <Button
                        colorScheme='blue'
                        onClick={() => handleOpenModal(prop)}
                      >
                        Ver Más
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </>
  );
};

export default Admin;
