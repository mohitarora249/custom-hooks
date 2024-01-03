import { useEffect, useRef } from 'react';

type KeyHandler = (event: KeyboardEvent) => void;
type KeyMap = {
   [keyCombo: string]: KeyHandler;
};
type KeyboardModifiers = 'Alt' | 'Control' | 'Shift' | 'Meta';

/**
* A React hook that allows you to listen for keyboard shortcuts.
*
* @param keyMap A map of key combinations (such as `'Ctrl+C'`) to callback functions.
*/
const useHotKey = (keyMap: KeyMap) => {
   /**
    * A reference to the `keyMap` object. This is used to update the `keyMap` object without
    * causing the hook to re-render.
    */
   const keyHandlerRef = useRef<KeyMap>(keyMap);

   /**
    * Updates the `keyMap` object.
    */
   useEffect(() => {
       keyHandlerRef.current = keyMap;
   }, [keyMap]);

   /**
    * Adds an event listener for the `keydown` event. When a key is pressed, the event listener
    * checks if the key combination is in the `keyMap` object. If it is, the corresponding
    * callback function is called.
    */
   useEffect(() => {
       const handleKeyDown = (event: KeyboardEvent) => {
           const keyPressed = event.key.toLowerCase();
           const modifiers: KeyboardModifiers[] = ['Alt', 'Control', 'Shift', 'Meta'];
           const keyCombo = modifiers.reduce((acc: string[], modifier: string) => {
               if (event.getModifierState(modifier.toLowerCase())) acc.push(modifier.toLowerCase());
               return acc;
           }, []);

           keyCombo.push(keyPressed);
           const keyComboString = keyCombo.join('+');
           if (keyHandlerRef?.current && keyHandlerRef?.current[keyComboString]) {
               const handler = keyHandlerRef.current[keyComboString];
               if (typeof handler === 'function') handler(event);
           }
       };
       document.addEventListener('keydown', handleKeyDown);
       return () => {
           document.removeEventListener('keydown', handleKeyDown);
       };
   }, []);
}

export default useHotKey;