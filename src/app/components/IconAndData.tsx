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
      <span>{textValue}</span>
    </div>
  );
};

export default IconAndData;
