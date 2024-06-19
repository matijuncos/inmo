import { Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

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
      <Text fontSize={14}>{textValue}</Text>
    </div>
  );
};

export default IconAndData;
