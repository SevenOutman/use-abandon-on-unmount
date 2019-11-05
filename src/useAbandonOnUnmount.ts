import { useCallback, useEffect, useRef } from 'react';

interface PromiseWrapper<T = any> {
  (promise: Promise<T>): Promise<T>;
}

/**
 * Abandon Promise on component unmount
 *
 * const abandonOnUnmount = useAbandonOnUnmount()
 * const promise = abandonOnUnmount(new Promise(...)) // Promise will be abandoned upon component unmount
 */
export default function useAbandonOnUnmount(): PromiseWrapper {

  const didUnmountRef = useRef(false);

  useEffect(() => {
    return () => {
      didUnmountRef.current = true;
    };
  }, []);

  return useCallback<PromiseWrapper>(<T>(promise: Promise<T>) => {
    return new Promise((resolve, reject) => {
      promise.then(() => {
        if (!didUnmountRef.current) resolve(promise);
      }, e => {
        if (!didUnmountRef.current) reject(e);
      });
    });
  }, []);
}
