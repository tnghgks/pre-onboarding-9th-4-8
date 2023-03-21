import { useState } from 'react';

const useInput = (initialValue: string): [string, any, any] => {
  const [value, setValue] = useState<string>(initialValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return [value, onChange, setValue];
};

export default useInput;
