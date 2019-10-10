import React, {
    MouseEvent as ReactMouseEvent,
} from 'react';

type ResizeDirection = 'e' | 'n' | 'ne' | 'nw' | 's' | 'se' | 'sw' | 'w';

interface IDirectionProps {
    className: string;
    direction: ResizeDirection;
    finish: () => void;
    move: (x: number, y: number) => void;
    resize: (width: number, height: number) => void;
}

// TODO: make functional component work!

const Direction = ({
    className,
    direction,
    finish,
    move,
    resize,
}: IDirectionProps) => {
    let mouseDown = false;

    let x = 0;
    let y = 0;

    const onMouseDown = (event: ReactMouseEvent<HTMLElement>) => {
        mouseDown = true;

        x = event.clientX;
        y = event.clientY;

        window.addEventListener<'mousemove'>(
            'mousemove',
            onMouseMove,
            true,
        );

        window.addEventListener<'mouseup'>(
            'mouseup',
            onMouseUp,
            true,
        );

        event.preventDefault();
    };

    const onMouseUp = (event: MouseEvent) => {
        window.removeEventListener(
            'mousemove',
            onMouseMove,
            true,
        );
        window.removeEventListener(
            'mouseup',
            onMouseUp,
            true,
        );

        mouseDown = false;

        finish();
    };

    const onMouseMove = (event: MouseEvent) => {
        if (mouseDown) {
            let resizeX = 0;
            let resizeY = 0;

            switch (direction) {
                case 'e':
                    resizeX = event.clientX - x;
                    resize(-resizeX, 0);
                    move(resizeX, 0);
                    break;
                case 'n':
                    resizeY = event.clientY - y;
                    resize(0, -resizeY);
                    move(0, resizeY);
                    break;
                case 'ne':
                    resizeX = event.clientX - x;
                    resizeY = event.clientY - y;
                    resize(-resizeX, -resizeY);
                    move(resizeX, resizeY);
                    break;
                case 'nw':
                    resizeX = event.clientX - x;
                    resizeY = event.clientY - y;
                    resize(resizeX, -resizeY);
                    move(0, resizeY);
                    break;
                case 's':
                    resizeY = event.clientY - y;
                    resize(0, resizeY);
                    break;
                case 'se':
                    resizeX = event.clientX - x;
                    resizeY = event.clientY - y;
                    resize(resizeX, resizeY);
                    break;
                case 'sw':
                    resizeX = event.clientX - x;
                    resizeY = event.clientY - y;
                    resize(-resizeX, resizeY);
                    move(resizeX, 0);
                    break;
                case 'w':
                    resizeX = event.clientX - x;
                    resize(resizeX, 0);
                    break;
            }

            x = event.clientX;
            y = event.clientY;
        }
    };

    return (
        <div
            onMouseDown={onMouseDown}
            className={className}
        />
    );
};

export default Direction;
