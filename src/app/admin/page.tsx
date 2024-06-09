'use client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Flex
} from '@chakra-ui/react';
import axios from 'axios';
import { BiPlusCircle } from 'react-icons/bi';
import AdminModal from '../components/AdminModal';
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
      console.log(interestedPeolple);
    };
    return (
      <Td>
        <Flex alignItems='center' gap='4px'>
          {interestedPeople?.[0]?.fullName || 'N/A'}
          {interestedPeople.length > 0 && (
            <BiPlusCircle onClick={() => handleClick(interestedPeople)} />
          )}
        </Flex>
      </Td>
    );
  };

  return (
    <>
      <AdminModal
        isOpen={openMoreInfoModal}
        interestedPeople={interestedPeople}
        onClose={() => setOpenMoreInfoModal(false)}
      />
      <Box>
        <Table>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Propiedad</Th>
              <Th>Metros Totales</Th>
              <Th>Metros Cubiertos</Th>
              <Th>Interesados</Th>
              <Th>Es Barrio Privado</Th>
              <Th>Precio</Th>
            </Tr>
          </Thead>
          <Tbody>
            {properties?.map((prop, i) => {
              return (
                <Tr key={i}>
                  <Td>{prop.title}</Td>
                  <Td>{prop.totalMenters}</Td>
                  <Td>{prop.coveredMeters}</Td>
                  <CustomCell interestedPeople={prop.interestedUsers} />
                  <Td>U$D{prop.isPrivate ? 'Si' : 'No'}</Td>
                  <Td>U$D{prop.price}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default Admin;
