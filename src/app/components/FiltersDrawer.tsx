'use client';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Radio,
  RadioGroup,
  Stack
} from '@chakra-ui/react';
import React from 'react';

const FiltersDrawer = ({
  isOpen,
  onClose,
  onOpen,
  filters,
  handleInputChange,
  handleFilterReset,
  getAllProperties,
  aggFilters
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  filters: {
    category: string;
    operationType: string;
    bedrooms: string;
    priceMin: string;
    priceMax: string;
  };
  handleInputChange: (...arg: any) => any;
  handleFilterReset: () => void;
  getAllProperties: Function;
  aggFilters?: {
    prices: any[];
    categories: any[];
    operationTypes: any[];
    bedrooms: any[];
  };
}) => {
  const handleCheckboxChange = (e: any) => {
    const { name, value, checked } = e.target;

    handleInputChange(name, value, checked);
  };

  const isChecked = (name: keyof typeof filters, value: string) => {
    const filterValue = filters[name];

    return filterValue.split(',').includes(value);
  };

  const handleRadioChange = (name: string) => (value: string) => {
    handleInputChange(name, value, true);
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filtros</DrawerHeader>
          <DrawerBody>
            <Box p={4} borderWidth='1px' borderRadius='lg'>
              {/* Price Min Filter */}
              <Box mb={4}>
                Precio minimo
                <RadioGroup
                  onChange={handleRadioChange('priceMin')}
                  value={filters.priceMin}
                >
                  <Stack>
                    {aggFilters?.prices?.map((price, index) => (
                      <Radio
                        key={index + price}
                        name='priceMin'
                        value={price.toString()}
                      >
                        {price} U$D
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </Box>

              {/* Price Max Filter */}
              <Box mb={4}>
                Precio maximo
                <RadioGroup
                  onChange={handleRadioChange('priceMax')}
                  value={filters.priceMax}
                >
                  <Stack>
                    {aggFilters?.prices?.map((price, index) => (
                      <Radio
                        key={index + price + 'max'}
                        name='priceMax'
                        value={price.toString()}
                      >
                        {price} U$D
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </Box>

              {/* Category Filter */}
              <Box mb={4}>
                Tipo de vivienda
                <Stack>
                  {aggFilters?.categories?.map((category, index) => (
                    <Checkbox
                      key={index + category}
                      name='category'
                      value={category}
                      onChange={handleCheckboxChange}
                      isChecked={isChecked('category', category)}
                    >
                      {category}
                    </Checkbox>
                  ))}
                </Stack>
              </Box>

              {/* Operation Type Filter */}
              <Box mb={4}>
                Tipo de operación
                <Stack>
                  {aggFilters?.operationTypes?.map((type, index) => (
                    <Checkbox
                      key={index + type}
                      name='operationType'
                      value={type}
                      onChange={handleCheckboxChange}
                      isChecked={isChecked('operationType', type)}
                    >
                      {type}
                    </Checkbox>
                  ))}
                </Stack>
              </Box>

              {/* Bedrooms Filter */}
              <Box mb={4}>
                Cantidad de habitaciones
                <Stack>
                  {aggFilters?.bedrooms?.map((bedroom, index) => (
                    <Checkbox
                      key={index + bedroom}
                      name='bedrooms'
                      value={bedroom?.toString()}
                      onChange={handleCheckboxChange}
                      isChecked={isChecked('bedrooms', bedroom?.toString())}
                    >
                      {bedroom}
                    </Checkbox>
                  ))}
                </Stack>
              </Box>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Flex justifyContent='space-between' width='100%'>
              <Button variant='ghost' onClick={handleFilterReset}>
                Limpiar filtros
              </Button>
              <Button onClick={() => getAllProperties(filters)}>Aplicar</Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FiltersDrawer;
