import { useState } from "react";

type UseQueue<T> = {
  queue: T[];
  enqueue: (item: T) => void;
  dequeue: () => T | undefined;
  isEmpty: () => boolean;
  clearQueue: () => void;
};
/**
 * A queue hook that can be used to manage a queue of items.
 *
 * @param {T[]} initialQueue - An optional initial queue of items.
 * @returns {UseQueue<T>} An object containing the queue and queue management functions.
 */
export function useQueue<T>(initialQueue: T[] = []): UseQueue<T> {
  const [queue, setQueue] = useState<T[]>(initialQueue);
  /**
   * Adds an item to the queue.
   *
   * @param {T} item - The item to be added to the queue.
   * @return {void} This function does not return anything.
   */
  const enqueue = (item: T) => {
    setQueue((prevQueue) => [...prevQueue, item]);
  };
  /**
   * Dequeues an item from the queue.
   *
   * @return {any} The dequeued item from the queue, or undefined if the queue is empty.
   */
  const dequeue = () => {
    if (isEmpty()) {
      return undefined;
    }
    const frontItem = queue[0];
    setQueue((prevQueue) => prevQueue.slice(1));
    return frontItem;
  };

  /**
   * Checks if the queue is empty.
   *
   * @return {boolean} True if the queue is empty, false otherwise.
   */
  const isEmpty = () => queue.length === 0;
  /**
   * Clears the queue.
   *
   * @return {void}
   */
  const clearQueue = () => {
    setQueue([]);
  };

  return {
    queue,
    enqueue,
    dequeue,
    isEmpty,
    clearQueue,
  };
}