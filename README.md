# useAbandonOnUnmount

> React Hook for abandoning promises upon component unmounting

    yarn add @sevenoutman/use-abandon-on-unmount

 ## Usage

 ```javascript
 import useAbandonOnUnmount from '@sevenoutman/use-abandon-on-unmount';
 
 function App() {

     const [data, setData] = useState();

     const abandonOnUnmount = useAbandonOnUnmount();

     const fetchData = useCallback(async () => {
         const result = await abandonOnUnmount(requestData());
         setData(result); // Will not excute after this component unmounts
     }, [setData]);

     return (
        // ...
     );
 }
 ```

 ## Why?

Get you rid of this:

     Warning: Can only update a mounted or mounting component. This usually means you called setState, replaceState, or forceUpdate on an unmounted component. This is a no-op.
 