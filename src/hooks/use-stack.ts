import { useState } from 'react';

type Stack<T> = {
  items: T[];
  push: (item: T) => void;
  pop: () => T | undefined;
  peek: () => T | undefined;
  clear: () => void;
  size: () => number;
};

const useStack = <T>(initialItems: T[] = []): Stack<T> => {
  const [items, setItems] = useState<T[]>(initialItems);

  const push = (item: T) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const pop = () => {
    if (items.length === 0) return undefined;
    const poppedItem = items[items.length - 1];
    setItems((prevItems) => prevItems.slice(0, -1));
    return poppedItem;
  };

  const peek = () => {
    if (items.length === 0) return undefined;
    return items[items.length - 1];
  };

  const clear = () => {
    setItems([]);
  };

  const size = () => items.length;

  return {
    items,
    push,
    pop,
    peek,
    clear,
    size,
  };
}

export default useStack;
