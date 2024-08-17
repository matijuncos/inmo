import { Property } from '@/lib/types/types';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type Props = {
  information: Property;
};

const HouseMap = (props: Props) => {
  const { information } = props;
  return (
    <MapContainer
      center={[
        information?.coords?.lat || -32,
        information?.coords?.lon || -64
      ]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '300px', width: '100%' }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={[
          information?.coords?.lat || -32,
          information?.coords?.lon || -64
        ]}
      >
        <Popup>Estas aca</Popup>
      </Marker>
    </MapContainer>
  );
};

export default HouseMap;
