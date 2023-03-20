import { Input } from '@chakra-ui/react';
import useSetParams from '@/lib/hooks/useSetParams';

const DatePicker = () => {
  const { currentDate, onSetParams } = useSetParams();

  return (
    <>
      {currentDate && (
        <Input
          placeholder="Select Date and Time"
          size="lg"
          bg="white"
          type="date"
          border="hidden"
          value={currentDate}
          onChange={(event) => onSetParams({ event })}
        />
      )}
    </>
  );
};

export default DatePicker;
