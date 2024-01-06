type ClassType<T> = new (...args: any[]) => T;

const useSingleton = <T,>(className: ClassType<T>) =>  {
  let instance: T | null = null;
  
  const getInstance = (): T => {
    if (!instance) instance = new className();
    return instance;
  };

  return getInstance();
}

export default useSingleton;
