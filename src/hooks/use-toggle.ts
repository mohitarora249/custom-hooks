import { useState } from 'react';

type Args = {
    initialValue: boolean
};

const useToggle = ({ initialValue }: Args)=> {
  const [value, setValue] = useState(initialValue);

  const toggle = () => {
    setValue((prevValue) => !prevValue);
  };

  const setTrue = () => {
    setValue(true);
  };

  const setFalse = () => {
    setValue(false);
  };

  return { value, toggle, setTrue, setFalse };
};

export default useToggle;
