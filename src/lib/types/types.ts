export interface Property {
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
  totalMeters: number;
  price: number;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  available: boolean;
  interestedUsers: any[];
}

export interface Customer {
  fullName: string;
  email: string;
}

export interface PropertyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
}

export enum directions {
  left = 'left',
  right = 'right',
  up = 'up',
  down = 'down'
}
