import React from 'react';
import {
  CloseButton,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
const AdminModal = ({
  isOpen,
  onClose,
  interestedPeople
}: {
  isOpen: boolean;
  onClose: () => void;
  interestedPeople: any[];
}) => {
  return (
    <Modal
      blockScrollOnMount
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick
      size='3xl'
    >
      <ModalOverlay>
        <ModalContent
          maxW='1084px'
          w='884px'
          m='0 auto'
          display='grid'
          placeItems='center'
        >
          <CloseButton outline='none' marginLeft='auto' onClick={onClose} />
          <Table>
            <Thead>
              <Tr>
                <Th> Nombre Completo</Th>
                <Th>Email</Th>
                <Th>Teléfono</Th>
              </Tr>
            </Thead>
            <Tbody>
              {interestedPeople?.map((person, idx) => {
                return (
                  <Tr key={idx}>
                    <Td>{person.fullName || 'N/A'}</Td>
                    <Td>{person.email || 'N/A'}</Td>
                    <Td>{person.phone || 'N/A'}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default AdminModal;
