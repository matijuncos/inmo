'use client';
import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import TinderCard from 'react-tinder-card';
import {
  FaArrowRotateLeft,
  FaThumbsUp,
  FaThumbsDown,
  FaHouse
} from 'react-icons/fa6';
import ImageModal from '../components/ImageModal';
import Carousel from '../components/Carousel';
import { Box, Flex, Text } from '@chakra-ui/react';
import { BiInfoCircle } from 'react-icons/bi';
import InfoModal from '../components/InfoModal';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loader from '../components/Loader';

enum directions {
  left = 'left',
  right = 'right',
  up = 'up',
  down = 'down'
}

interface Property {
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
  totalMenters: number; // Note: Check if this should be 'totalMeters'
  price: number;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  available: boolean;
  interestedUsers: any[];
}

interface Customer {
  fullName: string;
  email: string;
}
const defaultProperty = {
  _id: 'last',
  title: 'last',
  location: 'last',
  stories: 0,
  pool: false,
  garage: 0,
  isPrivate: false,
  antiquity: 0,
  internet: false,
  ac: false,
  heat: false,
  gas: false,
  more: 'last',
  category: 'last',
  operationType: 'last',
  rooms: 'last',
  showPrice: false,
  coveredMeters: 0,
  totalMenters: 0, // Note: Check if this should be 'totalMeters'
  price: 0,
  images: ['/placeholder.webp'],
  bedrooms: 0,
  bathrooms: 0,
  available: false,
  interestedUsers: []
};

export default function Home() {
  const [db, setDb] = useState<Property[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(
    db && Array.isArray(db) ? db.length - 1 : 0
  );
  const [selectedImage, setSelectedImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [userId, setUserId] = useState('');
  const currentIndexRef = useRef(currentIndex);
  const router = useRouter();
  const childRefs = useMemo(
    () =>
      Array(db?.length)
        .fill(0)
        .map((i) => React.createRef()),
    [db?.length]
  );

  const getAllProperties = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/listProperties');
      const updatedProperties = [defaultProperty, ...data.properties];
      setDb(updatedProperties);
      setCurrentIndex(updatedProperties.length - 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProperties();
  }, []);

  useEffect(() => {
    const customer = localStorage.getItem('user');
    const userId = localStorage.getItem('userId');
    setUserId(userId || '');

    if (customer) setCustomer(JSON.parse(customer));
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    const decodedToken = jwtDecode(token);
    if (decodedToken && 'exp' in decodedToken && decodedToken.exp) {
      const isExpired = decodedToken.exp * 1000 < Date.now();
      if (isExpired) {
        localStorage.removeItem('jwt');
        router.push('/');
      }
    }
  }, [router]);

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < (db?.length ?? 0) - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = async (
    direction: string,
    nameToDelete: string,
    index: number,
    property: Property
  ) => {
    updateCurrentIndex(index - 1);
    const userId = localStorage.getItem('userId');
    const alreadyLiked = property.interestedUsers.some(
      (user) => user._id === userId
    );
    if (direction === directions.right && userId && !alreadyLiked) {
      try {
        await Promise.all([
          axios.post('/api/addUserToProperty', {
            userId,
            id: property._id
          }),
          axios.post('/api/emailSender', {
            name: customer?.fullName,
            email: customer?.email,
            message: `
            <div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #fff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
  <h1 style="color: #2c3e50; font-size: 28px; text-align: center;">¡Hola ${customer?.fullName}!</h1>
  <p style="font-size: 18px; line-height: 1.6; color: #7f8c8d; text-align: justify;">Gracias por tu interés en nuestra propiedad: <strong style="color: #2980b9;">${property.title}</strong>.</p>
  <p style="font-size: 18px; line-height: 1.6; color: #7f8c8d; text-align: justify;">Creemos que esta propiedad podría ser perfecta para ti, ¡y estamos emocionados de poder ofrecértela!</p>
  <p style="font-size: 18px; line-height: 1.6; color: #7f8c8d; text-align: justify;">Un representante se pondrá en contacto contigo pronto para responder a cualquier pregunta y brindarte más información.</p>
  <p style="font-size: 18px; line-height: 1.6; color: #7f8c8d; text-align: justify;">¡Gracias de nuevo por tu interés!</p>
  <p style="font-size: 18px; line-height: 1.6; color: #2c3e50; text-align: center; font-weight: bold;">El equipo de [Nombre de tu Empresa]</p>
</div>
          `
          })
        ]);
        setDb((prevDb) => {
          if (!prevDb) return prevDb;
          return prevDb.map((p) => {
            if (p._id === property._id) {
              return {
                ...p,
                interestedUsers: [...p.interestedUsers, { _id: userId }]
              };
            }
            return p;
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    if (currentIndexRef.current >= idx && childRefs[idx].current) {
      (childRefs[idx].current as any).restoreCard();
    }
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir: string) => {
    if (canSwipe && db && currentIndex < db.length) {
      const currentCardRef = childRefs[currentIndex].current as any;
      if (currentCardRef && currentCardRef.swipe) {
        await currentCardRef.swipe(dir); // Swipe the card!
      }
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    const newCardRef = childRefs[newIndex].current as any;
    if (newCardRef && newCardRef.restoreCard) {
      await newCardRef.restoreCard();
    }
  };

  const IconAndData = ({
    Icon,
    textValue
  }: {
    Icon: FunctionComponent<{ size?: number; color?: string }>;
    textValue: string;
  }) => {
    return (
      <div className='icon-data'>
        <Icon />
        <span>{textValue}</span>
      </div>
    );
  };

  const hasMainFeatures =
    (db?.[currentIndex]?.totalMenters ||
      db?.[currentIndex]?.operationType ||
      db?.[currentIndex]?.bathrooms ||
      db?.[currentIndex]?.rooms ||
      db?.[currentIndex]?.bedrooms) &&
    db?.[currentIndex]?._id !== 'last';

  console.log(userId);

  return (
    <main>
      {loading ? (
        <Flex
          w='100%'
          height='100%'
          justifyContent='center'
          alignItems='center'
        >
          <Loader />
        </Flex>
      ) : (
        <div className='app-container'>
          <ImageModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            imageUrl={selectedImage}
          />
          <InfoModal
            information={db?.[currentIndex]}
            onClose={() => setIsInfoModalOpen(false)}
            isOpen={isInfoModalOpen}
          />
          <div className='flex'>
            <div className='cardContainer'>
              {db?.map((character, index) => (
                <TinderCard
                  ref={childRefs[index] as React.RefObject<any>}
                  className='swipe'
                  key={character.title}
                  preventSwipe={
                    hasMainFeatures
                      ? [directions.up, directions.down]
                      : [
                          directions.up,
                          directions.down,
                          directions.left,
                          directions.right
                        ]
                  }
                  swipeRequirementType='position'
                  onSwipe={(dir) =>
                    swiped(dir, character.title, index, character)
                  }
                  onCardLeftScreen={() => outOfFrame(character.title, index)}
                >
                  <div
                    style={{
                      backgroundImage: 'url(' + character.images[0] + ')'
                    }}
                    className='card'
                  >
                    {character.interestedUsers.some(
                      (user) => user._id === userId
                    ) && (
                      <Box
                        border='solid 6px green'
                        borderRadius='16px'
                        backgroundColor='white'
                        p='8px'
                        position='absolute'
                        top={'62px'}
                        right={'14px'}
                        transform='rotate(30deg)'
                        boxShadow='4px 4px 12px rgba(0, 0, 0, 0.3)'
                        color='green'
                        fontWeight={700}
                        fontSize='24px'
                      >
                        <Text>Le diste Like!</Text>
                      </Box>
                    )}
                    {hasMainFeatures && <h3>{character.title}</h3>}
                    {hasMainFeatures && (
                      <div
                        className='card-more-info'
                        onClick={() => setIsInfoModalOpen(true)}
                      >
                        <BiInfoCircle color='rgb(40, 35, 97)' />
                        <Text>Ver información</Text>
                      </div>
                    )}
                  </div>
                </TinderCard>
              ))}
            </div>
            <br />
            <div className='buttons-container'>
              <button
                className='button button-undo'
                disabled={!canGoBack}
                style={{ backgroundColor: !canGoBack ? '#c3c4d3' : '' }}
                onClick={() => goBack()}
              >
                <FaArrowRotateLeft size={24} color='#886602' />
              </button>
              {hasMainFeatures && (
                <>
                  <button
                    className='button button-left'
                    disabled={!canSwipe}
                    style={{ backgroundColor: !canSwipe ? '#c3c4d3' : '' }}
                    onClick={() => swipe(directions.left)}
                  >
                    <FaThumbsDown size={24} color='#BB2D3E' />
                  </button>
                  <button
                    className='button button-right'
                    disabled={!canSwipe}
                    style={{ backgroundColor: !canSwipe ? '#c3c4d3' : '' }}
                    onClick={() => swipe(directions.right)}
                  >
                    <FaThumbsUp size={24} color='rgb(10,101,0)' />
                  </button>
                </>
              )}
            </div>
            {!!db?.[currentIndex]?.images?.length && hasMainFeatures && (
              <Box my='16px'>
                <Carousel
                  images={db?.[currentIndex]?.images}
                  setIsModalOpen={setIsModalOpen}
                  setSelectedImage={setSelectedImage}
                />
              </Box>
            )}
            <div className='info-container'>
              {hasMainFeatures ? (
                <div className='description'>
                  <IconAndData
                    Icon={FaHouse}
                    textValue={
                      'Baños: ' + db?.[currentIndex]?.bathrooms.toString()
                    }
                  />
                  <IconAndData
                    Icon={FaHouse}
                    textValue={
                      'Ambientes: ' + db?.[currentIndex]?.rooms.toString()
                    }
                  />
                  <IconAndData
                    Icon={FaHouse}
                    textValue={
                      'Dormitorios: ' + db?.[currentIndex]?.bedrooms.toString()
                    }
                  />
                </div>
              ) : (
                <Box m='auto'>
                  <Text fontSize='32px' fontWeight={600} mt='16px'>
                    Llegaste al final!
                  </Text>
                </Box>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
