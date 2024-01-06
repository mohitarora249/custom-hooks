import { useState } from 'react';

type Priority = 0 | 1 | 2 | 3;

type PriorityQueueItem<T> = {
  value: T;
  priority: Priority
};

const usePriorityQueue = <T,>() => {
  const [items, setItems] = useState<PriorityQueueItem<T>[]>([]);

  const enqueue = (value: T, priority: Priority) => {
    const newItem: PriorityQueueItem<T> = { value, priority };
    setItems((prevItems) => {
      const newItems = [...prevItems, newItem];
      newItems.sort((a, b) => a.priority - b.priority);
      return newItems;
    });
  };

  const dequeue = () => {
    if (items.length === 0) return undefined;
    const removedItem = items.shift();
    setItems([...items]);
    return removedItem?.value;
  };

  const peek = () => items.length > 0 ? items[0].value : undefined;
  const size = () => items.length;
  const isEmpty = ()=> items.length === 0;

  return {
    items,
    enqueue,
    dequeue,
    peek,
    size,
    isEmpty,
  };
}

export default usePriorityQueue;
