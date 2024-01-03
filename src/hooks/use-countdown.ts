import { useState, useEffect } from 'react';

type Args = {
    initialValue: number;
    delay: number;
}

const useCountdown = ({ initialValue, delay }: Args) => {
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }, delay);

    return () => clearInterval(timer);
  }, [delay]);

  return count;
};

export default useCountdown;
