import { Flex, Td } from '@chakra-ui/react';
import { BiPlusCircle } from 'react-icons/bi';

const CustomCell = ({
  interestedPeople,
  setInterestedPeople,
  setOpenMoreInfoModal
}: {
  interestedPeople: any;
  setInterestedPeople: Function;
  setOpenMoreInfoModal: Function;
}) => {
  const handleClick = (interestedPeolple: any) => {
    setInterestedPeople(interestedPeolple);
    setOpenMoreInfoModal(true);
    console.log(interestedPeolple);
  };
  return (
    <Td>
      <Flex alignItems='center' gap='4px'>
        {interestedPeople?.[0]?.fullName || 'N/A'}
        {interestedPeople.length > 0 && (
          <BiPlusCircle onClick={() => handleClick(interestedPeople)} />
        )}
      </Flex>
    </Td>
  );
};

export default CustomCell;
