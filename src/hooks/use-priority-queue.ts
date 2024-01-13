import { useState } from "react";

type Priority = 0 | 1 | 2 | 3;

type PriorityQueueItem<T> = {
  value: T;
  priority: Priority;
};

/**
 * Creates a priority queue hook.
 * @template T The type of the values stored in the queue.
 * @returns An object with the queue's state and operations.
 */
const usePriorityQueue = <T>() => {
  const [items, setItems] = useState<PriorityQueueItem<T>[]>([]);

  /**
   * Enqueues a new item into the queue.
   * @param value The value to be enqueued.
   * @param priority The priority of the item.
   */
  const enqueue = (value: T, priority: Priority) => {
    const newItem: PriorityQueueItem<T> = { value, priority };
    setItems((prevItems) => {
      const newItems = [...prevItems, newItem];
      newItems.sort((a, b) => a.priority - b.priority);
      return newItems;
    });
  };

  /**
   * Dequeues the item with the highest priority from the queue.
   * @returns The value of the dequeued item, or undefined if the queue is empty.
   */
  const dequeue = () => {
    if (items.length === 0) return undefined;
    const removedItem = items.shift();
    setItems([...items]);
    return removedItem?.value;
  };

  /**
   * Retrieves the value of the item with the highest priority from the queue without removing it.
   * @returns The value of the item with the highest priority, or undefined if the queue is empty.
   */
  const peek = () => (items.length > 0 ? items[0].value : undefined);

  /**
   * Returns the number of items in the queue.
   * @returns The number of items in the queue.
   */
  const size = () => items.length;

  /**
   * Checks if the queue is empty.
   * @returns True if the queue is empty, false otherwise.
   */
  const isEmpty = () => items.length === 0;

  return {
    items,
    enqueue,
    dequeue,
    peek,
    size,
    isEmpty,
  };
};

export default usePriorityQueue;
