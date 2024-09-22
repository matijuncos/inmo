'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  Textarea,
  Heading,
  Flex,
  Image,
  IconButton
} from '@chakra-ui/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import { BiTrash } from 'react-icons/bi';
import { FaImage } from 'react-icons/fa';
import { useInmoCtx } from '../context/InmoContext';

const initialState = {
  title: '',
  location: '',
  stories: '',
  pool: undefined,
  garage: '',
  isPrivate: undefined,
  antiquity: '',
  internet: undefined,
  ac: undefined,
  heat: undefined,
  gas: undefined,
  more: '',
  category: 'Casa',
  operationType: 'Venta',
  rooms: '',
  showPrice: undefined,
  coveredMeters: '',
  totalMeters: '',
  price: '',
  images: [],
  bedrooms: '',
  bathrooms: '',
  available: undefined,
  coords: {
    lat: 0,
    lon: 0
  }
};

const PropertyForm = () => {
  const notify = (string: string) =>
    toast(string, { theme: 'dark', hideProgressBar: true });
  const [formValues, setFormValues] = useState(initialState);
  const [allFiles, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useInmoCtx();
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

  const removeFile = (file: File) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };
  const filesPreview = allFiles.map((file) => (
    <Flex
      key={file.name}
      align='center'
      justify='space-between'
      p={2}
      position='relative'
    >
      <Image
        src={(file as any).preview}
        alt={file.name}
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
  ));

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

  const handleChange = (e: any) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFiles((prevFiles: File[]) => {
        const newFiles: File[] = Array.from(files);
        const allFiles: File[] = [...prevFiles, ...newFiles];
        return Array.from(new Set(allFiles.map((file) => file.name))).map(
          (name) => allFiles.find((file) => file.name === name) as File
        );
      });
    } else if (name === 'more') {
      setFormValues({
        ...formValues,
        [name]: value
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<any>) => {
    e.preventDefault();
    setLoading(true);
    const token = user?.token;
    // TODO: Validate required features
    try {
      const base64Images = await Promise.all(allFiles.map(toBase64));
      const formDataToSubmit = {
        ...formValues,
        more: formValues.more.replace(/\n/g, '<br>'), // Replace newlines with <br> tags
        images: base64Images
      };
      const { data } = await axios.post(
        '/api/createProperty',
        formDataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setFormValues(initialState);
      setFiles([]);
      if (data.success) {
        notify('Nueva propiedad creada! 🎉');
      }
    } catch (error) {
      notify('Oops! Algo salió mal');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <>Loading...</>;

  return (
    <Box
      maxW='90vw'
      mx='auto'
      p={6}
      mt={12}
      bg={'grey'}
      borderWidth={1}
      borderRadius='lg'
      boxShadow='lg'
    >
      <Heading as='h2' color='whitesmoke' size='xl' textAlign='center' mb={6}>
        Agregar propiedad
      </Heading>
      <form
        onSubmit={handleSubmit}
        style={{ gap: '24px', display: 'flex', flexDirection: 'column' }}
      >
        <FormControl id='title'>
          <FormLabel color='whitesmoke' fontWeight={700}>
            Nombre
          </FormLabel>
          <Input
            backgroundColor='white'
            p='24px'
            type='text'
            name='title'
            placeholder='La Catalina - Mz 56'
            value={formValues.title}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id='location'>
          <FormLabel color='whitesmoke' fontWeight={700}>
            Ubicaciòn
          </FormLabel>
          <Input
            p='24px'
            backgroundColor='white'
            type='text'
            placeholder='Av Bodereau 1234...'
            name='location'
            value={formValues.location}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id='stories'>
          <FormLabel color='whitesmoke' fontWeight={700}>
            Plantas
          </FormLabel>
          <Input
            backgroundColor='white'
            p='24px'
            type='number'
            name='stories'
            value={formValues.stories}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id='garage'>
          <FormLabel color='whitesmoke' fontWeight={700}>
            Cochera
          </FormLabel>
          <Input
            p='24px'
            backgroundColor='white'
            type='number'
            name='garage'
            value={formValues.garage}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id='antiquity'>
          <FormLabel color='whitesmoke' fontWeight={700}>
            Antigüedad
          </FormLabel>
          <Input
            p='24px'
            backgroundColor='white'
            type='number'
            name='antiquity'
            value={formValues.antiquity}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id='price'>
          <FormLabel color='whitesmoke' fontWeight={700}>
            Precio (U$D)
          </FormLabel>
          <Input
            type='number'
            name='price'
            backgroundColor='white'
            p='24px'
            value={formValues.price}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id='coveredMeters'>
          <FormLabel color='whitesmoke' fontWeight={700}>
            Metros cubiertos
          </FormLabel>
          <Input
            type='number'
            name='coveredMeters'
            p='24px'
            backgroundColor='white'
            value={formValues.coveredMeters}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id='totalMeters'>
          <FormLabel color='whitesmoke' fontWeight={700}>
            Metros totales
          </FormLabel>
          <Input
            type='number'
            name='totalMeters'
            backgroundColor='white'
            p='24px'
            value={formValues.totalMeters}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id='coords'>
          <FormLabel color='whitesmoke' fontWeight={700}>
            Coordenadas
          </FormLabel>
          <Flex gap='16px'>
            <Input
              type='number'
              name='lat'
              placeholder='Latitud'
              backgroundColor='white'
              p='24px'
              value={formValues.coords.lat}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  coords: {
                    ...formValues.coords,
                    lat: parseFloat(e.target.value)
                  }
                })
              }
            />
            <Input
              type='number'
              name='lon'
              placeholder='Longitud'
              backgroundColor='white'
              p='24px'
              value={formValues.coords.lon}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  coords: {
                    ...formValues.coords,
                    lon: parseFloat(e.target.value)
                  }
                })
              }
            />
          </Flex>
        </FormControl>
        <FormControl id='bedrooms'>
          <FormLabel color='whitesmoke' fontWeight={700}>
            Habitaciones
          </FormLabel>
          <Input
            type='number'
            name='bedrooms'
            backgroundColor='white'
            p='24px'
            value={formValues.bedrooms}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id='bathrooms'>
          <FormLabel color='whitesmoke' fontWeight={700}>
            Baños
          </FormLabel>
          <Input
            type='number'
            name='bathrooms'
            backgroundColor='white'
            p='24px'
            value={formValues.bathrooms}
            onChange={handleChange}
          />
        </FormControl>
        <Flex gap='32px'>
          <FormControl id='category'>
            <FormLabel color='whitesmoke' fontWeight={700}>
              Tipo de vivienda
            </FormLabel>
            <Select
              name='category'
              backgroundColor='white'
              value={formValues.category}
              onChange={handleChange}
            >
              <option value='Casa'>Casa</option>
              <option value='Departamento'>Departamento</option>
              <option value='Duplex'>Duplex</option>
              <option value='Terreno'>Terreno</option>
            </Select>
          </FormControl>
          <FormControl id='operationType'>
            <FormLabel color='whitesmoke' fontWeight={700}>
              Tipo de operación
            </FormLabel>
            <Select
              backgroundColor='white'
              name='operationType'
              value={formValues.operationType}
              onChange={handleChange}
            >
              <option value='Venta'>Venta</option>
              <option value='Alquiler'>Alquiler</option>
            </Select>
          </FormControl>
        </Flex>
        <FormControl fontWeight={700} id='rooms'>
          <FormLabel color='whitesmoke' fontWeight={700}>
            Ambientes
          </FormLabel>
          <Input
            p='24px'
            type='text'
            backgroundColor='white'
            name='rooms'
            value={formValues.rooms}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id='more'>
          <FormLabel color='whitesmoke' fontWeight={700}>
            Más Características
          </FormLabel>
          <Textarea
            name='more'
            value={formValues.more}
            onChange={handleChange}
            backgroundColor='white'
            rows={4}
          />
        </FormControl>
        <Flex
          borderRadius='6px'
          mt={0}
          align='start'
          backgroundColor='white'
          padding='16px'
        >
          <Flex flex={1} flexDirection='column' gap='8px'>
            <FormControl display='flex' alignItems='baseline'>
              <Checkbox
                fontWeight={700}
                colorScheme='green'
                size='lg'
                name='pool'
                isChecked={formValues.pool}
                onChange={handleChange}
              >
                Piscina
              </Checkbox>
            </FormControl>
            <FormControl display='flex' alignItems='center'>
              <Checkbox
                colorScheme='green'
                fontWeight={700}
                size='lg'
                name='isPrivate'
                isChecked={formValues.isPrivate}
                onChange={handleChange}
              >
                Barrio Privado
              </Checkbox>
            </FormControl>

            <FormControl fontWeight={700} display='flex' alignItems='center'>
              <Checkbox
                size='lg'
                fontWeight={700}
                colorScheme='green'
                name='internet'
                isChecked={formValues.internet}
                onChange={handleChange}
              >
                Internet
              </Checkbox>
            </FormControl>
            <FormControl display='flex' alignItems='center'>
              <Checkbox
                colorScheme='green'
                size='lg'
                name='ac'
                fontWeight={700}
                isChecked={formValues.ac}
                onChange={handleChange}
              >
                Aire Acondicionado
              </Checkbox>
            </FormControl>
          </Flex>
          <Flex flex={1} flexDirection='column' gap='8px'>
            <FormControl display='flex' alignItems='center'>
              <Checkbox
                size='lg'
                fontWeight={700}
                colorScheme='green'
                name='heat'
                isChecked={formValues.heat}
                onChange={handleChange}
              >
                Calefacción
              </Checkbox>
            </FormControl>
            <FormControl display='flex' alignItems='center'>
              <Checkbox
                name='gas'
                fontWeight={700}
                size='lg'
                colorScheme='green'
                isChecked={formValues.gas}
                onChange={handleChange}
              >
                Gas Natural
              </Checkbox>
            </FormControl>
            <FormControl display='flex' alignItems='baseline'>
              <Switch
                size='lg'
                name='showPrice'
                id='isChecked'
                colorScheme='green'
                isChecked={formValues.showPrice}
                onChange={handleChange}
              ></Switch>
              <FormLabel htmlFor='isChecked' fontWeight={700} ml={2}>
                Mostrar precio en la publicación
              </FormLabel>
            </FormControl>
          </Flex>
        </Flex>
        <FormControl mb={12} id='images' gridColumn='span 2'>
          <FormLabel color='whitesmoke'>Imágenes</FormLabel>
          <Box
            cursor='pointer'
            color='whitesmoke'
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
        <Button h='40px' padding='16px' colorScheme='green' type='submit'>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default PropertyForm;
