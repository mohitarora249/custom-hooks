import { useState } from "react";

type UseArray<T> = {
  items: T[];
  addItem: (item: T) => void;
  removeItem: (index: number) => void;
  updateItem: (index: number, newItem: T) => void;
  clearItems: () => void;
};

/**
 * Creates a custom hook that manages an array of items.
 *
 * @param {T[]} initialItems - An optional array of initial items. Defaults to an empty array.
 * @return {UseArray<T>} An object containing the array of items and functions to manipulate the array.
 */
export function useArray<T>(initialItems: T[] = []): UseArray<T> {
  const [items, setItems] = useState<T[]>(initialItems);
  /**
   * Adds an item to the list of items.
   *
   * @param {T} item - The item to be added.
   * @return {void} No return value.
   */
  const addItem = (item: T) => {
    setItems((prevItems) => [...prevItems, item]);
  };
  /**
   * Removes the item at the specified index from the items array.
   *
   * @param {number} index - The index of the item to remove.
   * @return {void} No return value.
   */
  const removeItem = (index: number) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };
  /**
   * Updates an item in the array of items at the specified index.
   *
   * @param {number} index - The index of the item to update.
   * @param {T} newItem - The new item to replace the existing item at the specified index.
   * @return {void} No return value.
   */
  const updateItem = (index: number, newItem: T) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = newItem;
      return updatedItems;
    });
  };
  /**
   * Clears all the items in the array.
   *
   * @return {void}
   */
  const clearItems = () => {
    setItems([]);
  };

  return {
    items,
    addItem,
    removeItem,
    updateItem,
    clearItems,
  };
}