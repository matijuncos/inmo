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
import { Box, Flex, IconButton, Text, useDisclosure } from '@chakra-ui/react';
import InfoModal from '../components/InfoModal';
import axios from 'axios';
import Loader from '../components/Loader';
import { mailTemplate, mailTemplateTwo } from './utils';
import { Property, directions } from '@/lib/types/types';
import { defaultProperty } from './config';
import { FaBath, FaBed, FaHeart, FaInfo } from 'react-icons/fa';
import { toast } from 'react-toastify';
import FiltersDrawer from '../components/FiltersDrawer';
import LikedPropertiesDrawer from '../components/LikedProperties';
import { useInmoCtx } from '../context/InmoContext';
import CardContent from '../components/CardContent';

export default function Home() {
  const [db, setDb] = useState<Property[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(
    db && Array.isArray(db) ? db.length - 1 : 0
  );
  const [selectedImage, setSelectedImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [listOfLikedProperties, setListOfLikedProperties] = useState([]);
  const [aggFilters, setAggFilters] = useState();
  const [filters, setFilters] = useState({
    category: '',
    operationType: '',
    bedrooms: '',
    priceMin: '',
    priceMax: ''
  });
  const currentIndexRef = useRef(currentIndex);
  const { user } = useInmoCtx();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isLikedDrawerOpen,
    onOpen: onLikedDrawerOpen,
    onClose: onLikedDraweClose
  } = useDisclosure();
  const childRefs = useMemo(
    () =>
      Array(db?.length)
        .fill(0)
        .map((i) => React.createRef()),
    [db?.length]
  );

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/getFilters');
      setAggFilters(data);
    })();
  }, []);

  const notify = (string: string) =>
    toast(string, { theme: 'dark', hideProgressBar: true });
  const getAllProperties = async (filt: object) => {
    onClose();

    setLoading(true);
    try {
      const { data } = await axios.get('/api/listProperties', {
        params: filt
      });
      const updatedProperties = [defaultProperty, ...data.properties];
      setDb(updatedProperties);
      setCurrentIndex(updatedProperties.length - 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserPreferedProperties = async () => {
    try {
      const { data } = await axios.post('/api/getUserLikedProperties', {
        id: user?.userId
      });
      setListOfLikedProperties(data.likedProperties);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProperties({});
  }, []);

  useEffect(() => {
    if (user?.userId) {
      getUserPreferedProperties();
    }
  }, [user?.userId]);

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

    const userId = user?.userId;
    const alreadyLiked = property.interestedUsers.some(
      (user) => user?._id === userId
    );

    console.log(property.interestedUsers, userId);
    if (direction === directions.right && userId && !alreadyLiked) {
      try {
        await Promise.all([
          axios.post('/api/addUserToProperty', {
            userId,
            id: property._id
          }),
          axios.post('/api/emailSender', {
            name: user?.fullName,
            email: user?.email,
            message: mailTemplate(property.title, user?.fullName || ''),
            message2: mailTemplateTwo(property.title, user?.fullName || '')
          })
        ]);
        notify('Matcheaste con una propiedad! ♥️');
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
        notify('Oops! Algo salió mal');
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
        <Icon color='black' />
        <Text as='span' color='black'>
          {textValue}
        </Text>
      </div>
    );
  };

  const hasMainFeatures =
    (db?.[currentIndex]?.totalMeters ||
      db?.[currentIndex]?.operationType ||
      db?.[currentIndex]?.bathrooms ||
      db?.[currentIndex]?.rooms ||
      db?.[currentIndex]?.bedrooms) &&
    db?.[currentIndex]?._id !== 'last';

  const handleInputChange = (name: string, value: string, checked: boolean) => {
    setFilters((prevFilters) => {
      if (name === 'priceMin' || name === 'priceMax') {
        return { ...prevFilters, [name]: value };
      }
      let newValues = (prevFilters as any)[name]
        ? (prevFilters as any)[name].split(',')
        : [];
      if (checked) {
        if (!newValues.includes(value)) {
          newValues = [...newValues, value];
        }
      } else {
        newValues = newValues.filter((v: string) => v !== value);
      }
      return { ...prevFilters, [name]: newValues.join(',') };
    });
  };

  const handleFilterReset = () => {
    setFilters({
      category: '',
      operationType: '',
      bedrooms: '',
      priceMin: '',
      priceMax: ''
    });
    getAllProperties({});
    onClose();
  };

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
        <Box className='app-container'>
          {/*  <Box position='absolute'>
            <IconButton
              aria-label='filters'
              ml='36px'
              my='18px'
              icon={<FaFilter />}
              onClick={() => onOpen()}
            />
          </Box> */}
          {!!listOfLikedProperties.length && (
            <Box position='absolute' top='20px'>
              <IconButton
                aria-label='filters'
                ml='36px'
                icon={<FaHeart color='' />}
                onClick={() => onLikedDrawerOpen()}
              />
            </Box>
          )}
          <LikedPropertiesDrawer
            properties={listOfLikedProperties}
            isOpen={isLikedDrawerOpen}
            onClose={onLikedDraweClose}
          />
          <FiltersDrawer
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            filters={filters}
            handleInputChange={handleInputChange}
            handleFilterReset={handleFilterReset}
            getAllProperties={getAllProperties}
            aggFilters={aggFilters}
          />

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
          {user && (
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
                    <CardContent
                      hasMainFeatures={Boolean(hasMainFeatures)}
                      setIsInfoModalOpen={setIsInfoModalOpen}
                      property={character}
                    />
                  </TinderCard>
                ))}
              </div>
              <br />
              {!hasMainFeatures && (
                <Box m='auto'>
                  <Text fontSize='24px' fontWeight={600} mt='16px'>
                    Pronto tendremos más propiedades.
                  </Text>
                </Box>
              )}
              <div className='buttons-container'>
                <button
                  className='button button-undo'
                  disabled={!canGoBack}
                  style={{
                    cursor: !canGoBack ? 'not-allowed' : 'pointer',
                    backgroundColor: !canGoBack ? 'grey' : 'whitesmoke'
                  }}
                  onClick={() => goBack()}
                >
                  <FaArrowRotateLeft size={24} color='#886602' />
                </button>
                {hasMainFeatures && (
                  <>
                    <button
                      className='button button-left'
                      disabled={!canSwipe}
                      style={{
                        backgroundColor: !canSwipe ? 'black' : 'whitesmoke'
                      }}
                      onClick={() => swipe(directions.left)}
                    >
                      <FaThumbsDown size={24} color='#BB2D3E' />
                    </button>
                    <button
                      className='button button-right'
                      disabled={!canSwipe}
                      style={{
                        backgroundColor: !canSwipe ? 'black' : 'whitesmoke'
                      }}
                      onClick={() => swipe(directions.right)}
                    >
                      <FaThumbsUp size={24} color='rgb(10,101,0)' />
                    </button>
                  </>
                )}
              </div>
              <div className='info-container'>
                {hasMainFeatures && (
                  <>
                    <div className='description'>
                      <IconAndData
                        Icon={FaBath}
                        textValue={
                          'Baños: ' + db?.[currentIndex]?.bathrooms?.toString()
                        }
                      />
                      <IconAndData
                        Icon={FaHouse}
                        textValue={
                          'Ambientes: ' + db?.[currentIndex]?.rooms?.toString()
                        }
                      />
                      <IconAndData
                        Icon={FaBed}
                        textValue={
                          'Dormitorios: ' +
                          db?.[currentIndex]?.bedrooms?.toString()
                        }
                      />
                      <div
                        className='card-more-info'
                        onClick={() => setIsInfoModalOpen(true)}
                      >
                        <FaInfo /> Más info
                      </div>
                    </div>
                    <Box
                      maxW='660px'
                      m='auto'
                      className='flex-in-card'
                      boxShadow='xl'
                    ></Box>
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
            </div>
          )}
        </Box>
      )}
    </main>
  );
}
