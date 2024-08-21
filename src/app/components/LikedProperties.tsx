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
import LikedPropertyItem from './LikedPropertyItem';

const LikedPropertiesDrawer = ({
  isOpen,
  onClose,
  properties
}: {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
}) => {
  return (
    <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Tus matches!</DrawerHeader>
        <DrawerBody>
          {properties.map((item) => (
            <LikedPropertyItem key={item._id} item={item} />
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default LikedPropertiesDrawer;
