import { ResizeObserver as Polyfill } from '@juggle/resize-observer';
import {
    RefObject,
    useCallback,
    useLayoutEffect,
    useState,
} from 'react';

const ResizeObserver = (window as any).ResizeObserver || Polyfill;

const useComponentSize = (ref: RefObject<any>) => {
    const initialState = {
        height: 0,
        width: 0,
    };

    if (ref && ref.current) {
        initialState.height = ref.current.clientHeight;
        initialState.width = ref.current.clientWidth;
    }

    const [size, setSize] = useState(initialState);

    const handleResize = useCallback(
        () => {
            if (ref && ref.current) {
                setSize({
                    height: ref.current.clientHeight,
                    width: ref.current.clientWidth,
                });
            }
        },
        [ref],
    );

    useLayoutEffect(
        () => {
            if (!ref.current) {
                return;
            }

            handleResize();

            const observer = new ResizeObserver(() => {
                handleResize();
            });

            observer.observe(ref.current);

            return () => {
                observer.disconnect(ref.current);
            };
        },
        [ref.current],
    );

    return size;
};

export default useComponentSize;
