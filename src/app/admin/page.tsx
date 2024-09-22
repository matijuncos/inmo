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
import { confirmAlert } from 'react-confirm-alert';
import { BiPlusCircle } from 'react-icons/bi';
import AdminModal from '../components/AdminModal';
import PropertyDetailsModal from '../components/PropertyDetailsModal';
import { useRouter } from 'next/navigation';
import Loader from '../components/Loader';
import { FaEye, FaTrash, FaPen } from 'react-icons/fa';
import { Property } from '@/lib/types/types';
import { toast } from 'react-toastify';
import { useInmoCtx } from '../context/InmoContext';

const Admin = () => {
  const { user } = useInmoCtx();
  const [properties, setProperties] = useState<Property[]>([]);
  const [openMoreInfoModal, setOpenMoreInfoModal] = useState(false);
  const [interestedPeople, setInterestedPeople] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [isLoading, setIsloading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const notify = (string: string) =>
    toast(string, { theme: 'dark', hideProgressBar: true });
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setIsloading(true);
      try {
        const { data } = await axios.get('/api/listProperties');
        setProperties(data.properties);
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!user?.admin) router.push('/');
  }, [user]);

  const CustomCell = ({ interestedPeople }: { interestedPeople: any }) => {
    const handleClick = (interestedPeolple: any) => {
      setInterestedPeople(interestedPeolple);
      setOpenMoreInfoModal(true);
    };

    return (
      <Td>
        <Flex alignItems='center' gap='4px'>
          {interestedPeople?.[0]?.fullName || 'N/A'}
          {!!interestedPeople.length && (
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

  const navigate = (path: string) => {
    router.push(path);
  };

  const showAlert = (id: string, title: string) => {
    confirmAlert({
      title: `Confirmar para eliminar ${title}`,
      message: 'Estás seguro/a?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => removeProperty(id)
        },
        {
          label: 'No'
        }
      ]
    });
  };

  const removeProperty = async (id: string) => {
    const token = user?.token;
    try {
      setIsloading(true);
      await axios.delete(`/api/deleteProperty/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { data } = await axios.get('/api/listProperties');
      notify('Propiedad eliminada');
      setProperties(data.properties);
    } catch (error) {
      console.log(error);
      notify('Oops! Algo salió mal');
    } finally {
      setIsloading(false);
    }
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
      {isLoading ? (
        <Box
          p={16}
          display='flex'
          alignItems='center'
          justifyContent='center'
          minH='550px'
        >
          <Loader />
        </Box>
      ) : (
        <Box p={16}>
          <Box overflowX='auto'>
            <Table p={5} whiteSpace='nowrap' layout='auto' color='black'>
              <Thead>
                <Tr>
                  <Th color='black'>Propiedad</Th>
                  <Th color='black'>Metros Totales</Th>
                  <Th color='black'>Metros Cubiertos</Th>
                  <Th color='black'>Interesados</Th>
                  <Th color='black'>Precio (U$D)</Th>
                  <Th color='black'>Tipo de vivienda</Th>
                  <Th color='black'>Tipo de Operación</Th>
                  <Th color='black'>Ambientes</Th>
                  <Th color='black'>Dormitorios</Th>
                  <Th color='black'>Baños</Th>
                  <Th color='black'>Disponible</Th>
                  <Th color='black' textAlign='center'>
                    <Button
                      colorScheme='blue'
                      onClick={() => navigate('/create-property')}
                    >
                      +
                    </Button>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {properties?.map((prop, i) => {
                  return (
                    <Tr key={i}>
                      <Td>{prop.title}</Td>
                      <Td>{prop.totalMeters} m2</Td>
                      <Td>{prop.coveredMeters} m2</Td>
                      <CustomCell interestedPeople={prop.interestedUsers} />
                      <Td>{prop.price?.toLocaleString()}</Td>
                      <Td>{prop.category}</Td>
                      <Td>{prop.operationType}</Td>
                      <Td>{prop.rooms}</Td>
                      <Td>{prop.bedrooms}</Td>
                      <Td>{prop.bathrooms}</Td>
                      <Td>{prop.available ? 'Si' : 'No'}</Td>
                      <Td>
                        <Flex gap='8px'>
                          <Button
                            colorScheme='green'
                            onClick={() => handleOpenModal(prop)}
                          >
                            <FaEye />
                          </Button>
                          <Button
                            colorScheme='red'
                            onClick={() => showAlert(prop._id, prop.title)}
                          >
                            <FaTrash />
                          </Button>
                          <Button
                            onClick={() =>
                              router.push(`/admin/edit/${prop._id}`)
                            }
                          >
                            <FaPen />
                          </Button>
                        </Flex>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Admin;
