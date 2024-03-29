import { useState } from "react";

type Node<T> = {
  value: T;
  next: Node<T> | null;
};

const useLinkedList = <T>() => {
  const [head, setHead] = useState<Node<T> | null>(null);
  const [size, setSize] = useState<number>(0);

  const insertFirst = (value: T): void => {
    const newNode = { value, next: head };
    setHead(newNode);
    setSize((s) => s + 1);
  };

  const insertLast = (value: T) => {
    const newNode = { value, next: null };

    if (!head) {
      setHead(newNode);
    } else {
      let current = head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
    setSize((s) => s + 1);
  };

  const deleteFirst = () => {
    if (!head) return;

    setHead(head.next);
    setSize((s) => s - 1);
  };

  const deleteLast = () => {
    if (!head) return;
    if (!head.next) {
      setHead(null);
    } else {
      let current = head;
      let prev: Node<T> | null = null;
      while (current.next !== null) {
        prev = current;
        current = current.next;
      }
      if (prev) {
        prev.next = null;
      }
    }
    setSize((s) => s - 1);
  };

  const clear = () => {
    setHead(null);
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
    size,
    insertFirst,
    insertLast,
    deleteFirst,
    deleteLast,
    clear,
    toArray,
  };
};

export default useLinkedList;
