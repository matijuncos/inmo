'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Property } from '@/lib/types/types';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Textarea,
  Button,
  Spinner,
  VStack,
  Heading,
  Container,
  Text,
  Flex,
  Image,
  IconButton,
  Link
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { BiTrash } from 'react-icons/bi';
import { useDropzone } from 'react-dropzone';
import { FaArrowLeft, FaImage } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { useInmoCtx } from '@/app/context/InmoContext';

const EditProperty = () => {
  const { id } = useParams();
  const router = useRouter();
  const notify = (string: string) =>
    toast(string, { theme: 'dark', hideProgressBar: true });
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [allFiles, setFiles] = useState<File[]>([]);
  const { user, setUser } = useInmoCtx();
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      ]);
    }
  });

  useEffect(() => {
    // TODO: This might be better in context
    const token = user?.token;
    if (!token) {
      router.push('/login');
      return;
    }

    const decodedToken = jwtDecode(token);
    if (decodedToken && 'exp' in decodedToken && decodedToken.exp) {
      const isExpired = decodedToken.exp * 1000 < Date.now();
      if (isExpired) {
        setUser(null);
        router.push('/login');
      }
    }
  }, [router]);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(`/api/getProperty/${id}`);
          setProperty(data.property);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id]);

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64Data = result.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = (error) => reject(error);
    });

  const updateProperty = async () => {
    const token = user?.token;
    setLoading(true);
    const base64Images = await Promise.all(allFiles.map(toBase64));
    try {
      const { data } = await axios.put(
        '/api/updateProperty',
        {
          ...property,
          newFiles: base64Images
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (data.success) {
        router.push('/admin');
        notify('Propiedad actualizada! 🙌🏼');
      }
    } catch (error) {
      console.log(error);
      notify('Oops! Algo salió mal.');
    } finally {
      setLoading(false);
    }
  };

  const openConfirmationPopUp = () => {
    confirmAlert({
      title: `Estas por editar editar ${property?.title}`,
      message: 'Guardar los cambios?',
      buttons: [
        {
          label: 'Si',
          onClick: () => updateProperty()
        },
        {
          label: 'No'
        }
      ]
    });
  };

  const removeFile = (file: any) => {
    if (allFiles.some((f) => (f as any).preview === file)) {
      setFiles((prevFiles) =>
        prevFiles.filter((f) => (f as any).preview !== file)
      );
    } else {
      setProperty((prevProperty) => {
        if (!prevProperty) return null;
        return {
          ...prevProperty,
          images: prevProperty.images.filter((image) => image !== file)
        };
      });
    }
  };

  const newFilePreview = allFiles.map((file) => (file as any).preview);

  const filesPreview = [...(property?.images || []), ...newFilePreview].map(
    (file) => (
      <Flex
        key={file}
        align='center'
        justify='space-between'
        p={2}
        position='relative'
      >
        <Image
          src={file as any}
          alt={file}
          boxSize='100px'
          objectFit='cover'
          borderRadius='8px'
        />
        <IconButton
          position='absolute'
          top={'-8px'}
          right={'-8px'}
          borderRadius='100%'
          aria-label='Delete image'
          icon={<BiTrash />}
          onClick={() => removeFile(file)}
        />
      </Flex>
    )
  );

  return (
    <Container
      maxW='container.md'
      p={5}
      boxShadow='xl'
      borderRadius='md'
      bg='gray.50'
    >
      {loading ? (
        <Spinner size='xl' />
      ) : property ? (
        <Box as='form' p={5} borderRadius='md' bg='white' boxShadow='md'>
          <Flex alignItems='center' gap='6px'>
            <Link href='/admin'>
              <FaArrowLeft />
            </Link>
          </Flex>
          <VStack spacing={4} align='stretch'>
            <Heading size='lg' textAlign='center'>
              Editar Propiedad
            </Heading>

            <FormControl>
              <FormLabel htmlFor='title'>Título</FormLabel>
              <Input
                type='text'
                id='title'
                bg='white'
                value={property.title}
                onChange={(e) =>
                  setProperty({ ...property, title: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='location'>Ubicación</FormLabel>
              <Input
                type='text'
                id='location'
                bg='white'
                value={property.location}
                onChange={(e) =>
                  setProperty({ ...property, location: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='stories'>Plantas</FormLabel>
              <Input
                type='number'
                id='stories'
                bg='white'
                value={property.stories}
                onChange={(e) =>
                  setProperty({
                    ...property,
                    stories: parseInt(e.target.value)
                  })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='garage'>Garaje</FormLabel>
              <Input
                type='number'
                id='garage'
                bg='white'
                value={property.garage}
                onChange={(e) =>
                  setProperty({ ...property, garage: parseInt(e.target.value) })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='antiquity'>Antigüedad</FormLabel>
              <Input
                type='number'
                id='antiquity'
                bg='white'
                value={property.antiquity}
                onChange={(e) =>
                  setProperty({
                    ...property,
                    antiquity: parseInt(e.target.value)
                  })
                }
              />
            </FormControl>
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='pool' mb='0'>
                Piscina
              </FormLabel>
              <Checkbox
                id='pool'
                isChecked={property.pool}
                onChange={(e) =>
                  setProperty({ ...property, pool: e.target.checked })
                }
              />
            </FormControl>
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='isPrivate' mb='0'>
                Privado
              </FormLabel>
              <Checkbox
                id='isPrivate'
                isChecked={property.isPrivate}
                onChange={(e) =>
                  setProperty({ ...property, isPrivate: e.target.checked })
                }
              />
            </FormControl>
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='internet' mb='0'>
                Internet
              </FormLabel>
              <Checkbox
                id='internet'
                isChecked={property.internet}
                onChange={(e) =>
                  setProperty({ ...property, internet: e.target.checked })
                }
              />
            </FormControl>

            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='ac' mb='0'>
                Aire Acondicionado
              </FormLabel>
              <Checkbox
                id='ac'
                isChecked={property.ac}
                onChange={(e) =>
                  setProperty({ ...property, ac: e.target.checked })
                }
              />
            </FormControl>

            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='heat' mb='0'>
                Calefacción
              </FormLabel>
              <Checkbox
                id='heat'
                isChecked={property.heat}
                onChange={(e) =>
                  setProperty({ ...property, heat: e.target.checked })
                }
              />
            </FormControl>

            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='gas' mb='0'>
                Gas
              </FormLabel>
              <Checkbox
                id='gas'
                isChecked={property.gas}
                onChange={(e) =>
                  setProperty({ ...property, gas: e.target.checked })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='more'>Más Detalles</FormLabel>
              <Textarea
                id='more'
                bg='white'
                value={property.more}
                onChange={(e) =>
                  setProperty({ ...property, more: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='category'>Tipo de vivienda</FormLabel>
              <Input
                type='text'
                id='category'
                bg='white'
                value={property.category}
                onChange={(e) =>
                  setProperty({ ...property, category: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='operationType'>Tipo de Operación</FormLabel>
              <Input
                type='text'
                id='operationType'
                bg='white'
                value={property.operationType}
                onChange={(e) =>
                  setProperty({ ...property, operationType: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='rooms'>Habitaciones</FormLabel>
              <Input
                type='text'
                id='rooms'
                bg='white'
                value={property.rooms}
                onChange={(e) =>
                  setProperty({ ...property, rooms: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='coveredMeters'>Metros Cubiertos</FormLabel>
              <Input
                type='number'
                id='coveredMeters'
                bg='white'
                value={property.coveredMeters}
                onChange={(e) =>
                  setProperty({
                    ...property,
                    coveredMeters: parseInt(e.target.value)
                  })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='totalMeters'>Metros Totales</FormLabel>
              <Input
                type='number'
                id='totalMeters'
                bg='white'
                value={property.totalMeters}
                onChange={(e) =>
                  setProperty({
                    ...property,
                    totalMeters: parseInt(e.target.value)
                  })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='price'>Precio</FormLabel>
              <Input
                type='number'
                id='price'
                bg='white'
                value={property.price}
                onChange={(e) =>
                  setProperty({ ...property, price: parseInt(e.target.value) })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='bedrooms'>Dormitorios</FormLabel>
              <Input
                type='number'
                id='bedrooms'
                bg='white'
                value={property.bedrooms}
                onChange={(e) =>
                  setProperty({
                    ...property,
                    bedrooms: parseInt(e.target.value)
                  })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='bathrooms'>Baños</FormLabel>
              <Input
                type='number'
                id='bathrooms'
                bg='white'
                value={property.bathrooms}
                onChange={(e) =>
                  setProperty({
                    ...property,
                    bathrooms: parseInt(e.target.value)
                  })
                }
              />
            </FormControl>
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='showPrice' mb='0'>
                Mostrar Precio
              </FormLabel>
              <Checkbox
                id='showPrice'
                isChecked={property.showPrice}
                onChange={(e) =>
                  setProperty({ ...property, showPrice: e.target.checked })
                }
              />
            </FormControl>
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='available' mb='0'>
                Disponible
              </FormLabel>
              <Checkbox
                id='available'
                isChecked={property.available}
                onChange={(e) =>
                  setProperty({ ...property, available: e.target.checked })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Coordenadas</FormLabel>
              <Input
                placeholder='Latitud'
                type='number'
                step='any'
                onChange={(e) =>
                  setProperty({
                    ...property,
                    coords: {
                      ...property.coords,
                      lon: property.coords?.lon || 0,
                      lat: Number(e.target.value)
                    }
                  })
                }
              />
              <Input
                placeholder='Longitud'
                type='number'
                step='any'
                onChange={(e) =>
                  setProperty({
                    ...property,
                    coords: {
                      ...property.coords,
                      lat: property.coords?.lat || 0,
                      lon: Number(e.target.value)
                    }
                  })
                }
              />
            </FormControl>
            <FormControl my={12} id='images' gridColumn='span 2'>
              <FormLabel>Imágenes</FormLabel>
              <Box
                cursor='pointer'
                borderRadius='6px'
                display='flex'
                alignItems='center'
                gap='16px'
                padding='8px'
                border='solid 3px gray'
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <FaImage size={42} />
                <p>Arrastra imágenes o haz click para adjuntarlas</p>
              </Box>
              <Flex wrap='wrap' mt={4}>
                {filesPreview}
              </Flex>
            </FormControl>
            <Button
              onClick={openConfirmationPopUp}
              colorScheme='teal'
              size='lg'
              width='full'
            >
              Guardar Cambios
            </Button>
          </VStack>
        </Box>
      ) : (
        <Text>No se encontró la propiedad.</Text>
      )}
    </Container>
  );
};

export default EditProperty;
