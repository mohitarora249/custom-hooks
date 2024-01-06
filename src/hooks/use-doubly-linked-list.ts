import { useState } from 'react';

type Node<T> = {
  value: T;
  prev: Node<T> | null;
  next: Node<T> | null;
};

const useDoublyLinkedList = <T,>() => {
  const [head, setHead] = useState<Node<T> | null>(null);
  const [tail, setTail] = useState<Node<T> | null>(null);
  const [size, setSize] = useState<number>(0);

  const insertFirst = (value: T): void => {
    const newNode = { value, prev: null, next: head };

    if (!head) setTail(newNode);
    else head.prev = newNode;

    setHead(newNode);
    setSize(s => s + 1);
  };

  const insertLast = (value: T): void => {
    const newNode = { value, prev: tail, next: null };

    if (!tail) setHead(newNode);
    else tail.next = newNode;

    setTail(newNode);
    setSize(s => s + 1);
  };

  const deleteFirst = (): void => {
    if (!head) return;

    if (head === tail) {
      setHead(null);
      setTail(null);
    } else {
      head.next.prev = null;
      setHead(head.next);
    }

    setSize(s => s - 1);
  };

  const deleteLast = (): void => {
    if (!tail) return;

    if (head === tail) {
      setHead(null);
      setTail(null);
    } else {
      tail.prev.next = null;
      setTail(tail.prev);
    }

    setSize(s => s - 1);
  };

  const clear = (): void => {
    setHead(null);
    setTail(null);
    setSize(0);
  };

  const toArray = (): T[] => {
    const result: T[] = [];
    let current = head;

    while (current !== null) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  };

  return {
    head,
    tail,
    size,
    insertFirst,
    insertLast,
    deleteFirst,
    deleteLast,
    clear,
    toArray,
  };
}

export default useDoublyLinkedList;
