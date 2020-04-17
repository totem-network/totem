import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, {
    CSSProperties,
    MouseEvent as ReactMouseEvent,
} from 'react';
import Buttons from './Buttons';

interface IHeaderProps {
    close: (event: ReactMouseEvent<HTMLElement>) => void;
    finish: () => void;
    minimize: (event: ReactMouseEvent<HTMLElement>) => void;
    move: (x: number, y: number) => void;
    noHeader?: boolean;
    themeColor: string;
    title: string;
}

const useStyles = makeStyles({
    header: {
        boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
        height: '2rem',
        lineHeight: '2rem',
        position: 'relative',
        textAlign: 'center',
        userSelect: 'none',
        width: '100%',
    },
    noHeader: {
        background: 'none',
        boxShadow: 'none',
        position: 'absolute',
        zIndex: 1,
    },
});

const hexToLuma = (color: string) => {
    const hex   = color.replace(/#/, '');
    const r     = parseInt(hex.substr(0, 2), 16);
    const g     = parseInt(hex.substr(2, 2), 16);
    const b     = parseInt(hex.substr(4, 2), 16);

    return [
        0.299 * r,
        0.587 * g,
        0.114 * b,
    ].reduce((previous, current) => previous + current) / 255;
};

const Header = ({
    close,
    finish,
    minimize,
    move,
    noHeader,
    themeColor,
    title,
}: IHeaderProps) => {
    const classes = useStyles();

    let domNode: HTMLElement | null = null;
    let mouseDown = false;

    let x = 0;
    let y = 0;

    const setRef = (element: any) => {
        domNode = element;
    };

    const onMouseDown = (event: ReactMouseEvent<HTMLElement>) => {
        if (!domNode) {
            return;
        }

        domNode.style.cursor = 'grabbing';

        mouseDown = true;

        x = event.clientX;
        y = event.clientY;

        window.addEventListener<'mousemove'>('mousemove', onMouseMove, true);
        window.addEventListener<'mouseup'>('mouseup', onMouseUp, true);

        event.preventDefault();
    };

    const onMouseUp = (event: MouseEvent) => {
        if (!domNode) {
            return;
        }

        domNode.style.cursor = 'auto';

        window.removeEventListener('mousemove', onMouseMove, true);
        window.removeEventListener('mouseup', onMouseUp, true);

        mouseDown = false;

        finish();
    };

    const onMouseMove = (event: MouseEvent) => {
        if (mouseDown) {
            const moveX = event.clientX - x;
            const moveY = event.clientY - y;

            move(moveX, moveY);

            x = event.clientX;
            y = event.clientY;
        }
    };

    let color = 'rgba(247, 247, 247, 0.8)';
    let buttonBackground = 'rgba(247, 247, 247, 0.65)';
    if (hexToLuma(themeColor) > 0.5) {
        color = 'rgba(8, 8, 8, 0.8)';
        buttonBackground = 'rgba(8, 8, 8, 0.65)';
    }

    const headerColors: CSSProperties = {
        backgroundColor: themeColor,
        color,
    };

    if (noHeader) {
        return (
            <div
                className={classNames(
                    classes.header,
                    classes.noHeader,
                )}
                onMouseDown={onMouseDown}
                ref={setRef}
            >
                <Buttons
                    backgroundColor={buttonBackground}
                    close={close}
                    color={themeColor}
                    minimize={minimize}
                />
            </div>
        );
    }

    return (
        <div
            className={classNames(
                classes.header,
            )}
            onMouseDown={onMouseDown}
            ref={setRef}
            style={headerColors}
        >
            <Buttons
                backgroundColor={buttonBackground}
                close={close}
                color={themeColor}
                minimize={minimize}
            />
            {title}
        </div>
    );
};

export default Header;
