import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Box,
  Grid,
  GridItem,
  Text,
  Image,
  Heading,
  Stack,
  Badge,
  VStack,
  HStack,
  Icon
} from '@chakra-ui/react';
import {
  FaMapMarkerAlt,
  FaSwimmingPool,
  FaCar,
  FaShieldAlt,
  FaWifi,
  FaSnowflake,
  FaFire,
  FaGasPump,
  FaBed,
  FaBath
} from 'react-icons/fa';

interface Property {
  title: string;
  location: string;
  price: number;
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
  totalMenters: number;
  bedrooms: number;
  bathrooms: number;
  available: boolean;
  images: string[];
}

interface PropertyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  isOpen,
  onClose,
  property
}) => {
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImageModal = (img: string) => {
    setSelectedImage(img);
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
    setSelectedImage(null);
  };

  if (!property) return null;

  const ImagePopUp = () => (
    <Modal isOpen={isImageModalOpen} onClose={closeImageModal} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <Image src={selectedImage || ''} alt='Selected Property Image' />
      </ModalContent>
    </Modal>
  );

  const DetailItem = ({
    icon,
    label,
    value
  }: {
    icon: any;
    label: string;
    value: string | number | boolean;
  }) => (
    <HStack spacing={2}>
      <Icon as={icon} boxSize={5} color='teal.500' />
      <Text fontSize='md'>
        <Box as='span' fontWeight='bold'>
          {label}:
        </Box>{' '}
        {typeof value === 'boolean' ? (value ? 'Sí' : 'No') : value}
      </Text>
    </HStack>
  );

  return (
    <Modal size='full' isOpen={isOpen} onClose={onClose}>
      <ImagePopUp />
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as='h2' size='lg'>
            {property.title}
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns={['1fr', '1fr 1fr']} gap={0}>
            <GridItem>
              <Grid templateColumns={['1fr', '1fr 1fr']}>
                <GridItem>
                  <Text mb='12px' fontWeight='600' fontSize='16px'>
                    Precio:{' '}
                    <Badge fontSize='16px' colorScheme='green'>
                      U$D{property.price}
                    </Badge>
                  </Text>
                  <DetailItem
                    icon={FaMapMarkerAlt}
                    label='Ubicación'
                    value={property.location}
                  />
                  <DetailItem
                    icon={FaSwimmingPool}
                    label='Piscina'
                    value={property.pool}
                  />
                  <DetailItem
                    icon={FaCar}
                    label='Cochera'
                    value={property.garage}
                  />
                  <DetailItem
                    icon={FaShieldAlt}
                    label='Área Privada'
                    value={property.isPrivate}
                  />
                  <DetailItem
                    icon={FaWifi}
                    label='Internet'
                    value={property.internet}
                  />
                  <DetailItem
                    icon={FaSnowflake}
                    label='Aire Acondicionado'
                    value={property.ac}
                  />
                  <DetailItem
                    icon={FaFire}
                    label='Calefacción'
                    value={property.heat}
                  />
                  <DetailItem
                    icon={FaGasPump}
                    label='Gas'
                    value={property.gas}
                  />
                </GridItem>
                <GridItem>
                  <DetailItem
                    label='Pisos'
                    value={property.stories}
                    icon={FaMapMarkerAlt}
                  />
                  <DetailItem
                    label='Antigüedad'
                    value={`${property.antiquity} años`}
                    icon={FaMapMarkerAlt}
                  />
                  <DetailItem
                    label='Categoría'
                    value={property.category}
                    icon={FaMapMarkerAlt}
                  />
                  <DetailItem
                    label='Tipo de Operación'
                    value={property.operationType}
                    icon={FaMapMarkerAlt}
                  />
                  <DetailItem
                    label='Habitaciones'
                    value={property.rooms}
                    icon={FaBed}
                  />
                  <DetailItem
                    label='Metros Cubiertos'
                    value={property.coveredMeters}
                    icon={FaMapMarkerAlt}
                  />
                  <DetailItem
                    label='Metros Totales'
                    value={property.totalMenters}
                    icon={FaMapMarkerAlt}
                  />
                  <DetailItem
                    label='Dormitorios'
                    value={property.bedrooms}
                    icon={FaBed}
                  />
                  <DetailItem
                    label='Baños'
                    value={property.bathrooms}
                    icon={FaBath}
                  />
                  <DetailItem
                    label='Disponible'
                    value={property.available}
                    icon={FaMapMarkerAlt}
                  />
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem>
              <Flex wrap='wrap' gap={6} justifyContent='center'>
                {!!property.images?.length &&
                  property.images.map((img, index) => (
                    <Box
                      key={index}
                      onClick={() => openImageModal(img)}
                      width='150px'
                      height='150px'
                      borderRadius='md'
                      overflow='hidden'
                      boxShadow='lg'
                      cursor='pointer'
                      transition='transform 0.3s'
                      _hover={{ transform: 'scale(1.05)' }}
                    >
                      <Image
                        src={img}
                        alt={`Image ${index + 1}`}
                        width='100%'
                        height='100%'
                        objectFit='cover'
                        onError={(e: any) =>
                          (e.currentTarget.src = 'path_to_default_image.jpg')
                        }
                      />
                    </Box>
                  ))}
              </Flex>
            </GridItem>
          </Grid>
          <Text fontWeight={600} fontSize='24px'>
            Más Información:
          </Text>
          <Text>{property.more}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PropertyDetailsModal;
