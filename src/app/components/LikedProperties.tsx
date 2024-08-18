import { Property } from '@/lib/types/types';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text
} from '@chakra-ui/react';
import React from 'react';

const LikedPropertiesDrawer = ({
  isOpen,
  onClose,
  properties
}: {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
}) => {
  const PropertyItem = ({ item }: { item: Property }) => {
    return (
      <Flex
        width='100%'
        height='85px'
        my='6px'
        border='solid grey 1px'
        borderRadius='3px'
        transition='all ease 0.2s'
        cursor='pointer'
        _hover={{
          transform: 'scale(1.02)'
        }}
        onClick={() =>
          alert(
            'fer, esto todavía no nada, pero te llevaria a una pagina para ver la prop. Hacé click en ok para seguir'
          )
        }
      >
        <Box
          backgroundImage={`url(${item.images?.[0]})`}
          width='80px'
          backgroundPosition='center'
          height='100%'
          backgroundSize='cover'
        />
        <Box padding='3px'>
          <Text fontSize='14px' fontWeight={600}>
            {item.title}
          </Text>
          <Text fontSize='12px'>U$D{item.price}</Text>
          <Text fontSize='12px'>Habitaciones: {item.rooms}</Text>
        </Box>
      </Flex>
    );
  };

  return (
    <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Tus matches!</DrawerHeader>
        <DrawerBody>
          {properties.map((item) => (
            <PropertyItem key={item._id} item={item} />
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default LikedPropertiesDrawer;
