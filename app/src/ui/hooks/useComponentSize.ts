import {
    RefObject,
    useCallback,
    useLayoutEffect,
    useState,
} from 'react';

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

            // TODO: use ResizeObserver to fix:
            // TODO: does not change when resizing the window

            ref.current.addEventListener('resize', handleResize);

            return () => {
                ref.current.removeEventListener('resize', handleResize);
            };
        },
        [ref.current],
    );

    return size;
};

export default useComponentSize;
