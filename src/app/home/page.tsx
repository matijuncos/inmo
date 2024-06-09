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
import { Box, Text } from '@chakra-ui/react';
import { BiInfoCircle } from 'react-icons/bi';
import InfoModal from '../components/InfoModal';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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

export default function Home() {
  const [db, setDb] = useState<Property[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(
    db && Array.isArray(db) ? db.length - 1 : 0
  );
  const [selectedImage, setSelectedImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [lastDirection, setLastDirection] = useState('');
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);
  const router = useRouter();
  const childRefs = useMemo(
    () =>
      Array(db?.length)
        .fill(0)
        .map((i) => React.createRef()),
    [db?.length]
  );

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/api/listProperties');
        console.log(data);
        setDb(data.properties);
        setCurrentIndex(data.properties.length - 1);
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
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
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    const userId = localStorage.getItem('userId');
    if (
      direction === directions.right &&
      userId &&
      !property.interestedUsers.some((user) => user._id === userId)
    ) {
      try {
        await axios.post('/api/addUserToProperty', {
          userId,
          id: property._id
        });
        await axios.post('/api/emailSender', {
          name: 'Nombre',
          email: 'matijuncos@gmail.com',
          message: 'Probando'
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
    db?.[currentIndex]?.totalMenters ||
    db?.[currentIndex]?.operationType ||
    db?.[currentIndex]?.bathrooms ||
    db?.[currentIndex]?.rooms ||
    db?.[currentIndex]?.bedrooms;

  return (
    <main>
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
                preventSwipe={[directions.up, directions.down]}
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
                  <h3>{character.title}</h3>
                  <div
                    className='card-more-info'
                    onClick={() => setIsInfoModalOpen(true)}
                  >
                    <BiInfoCircle color='rgb(40, 35, 97)' />
                    <Text>Ver información</Text>
                  </div>
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
          </div>
          {!!db?.[currentIndex]?.images?.length && (
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
              <>Nada para ver!</>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
