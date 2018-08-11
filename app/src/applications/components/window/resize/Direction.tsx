import React, {
    Component,
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

interface IDirectionState {
    mouseDown: boolean;
}

class Direction extends Component<IDirectionProps, IDirectionState> {

    protected x: number;

    protected y: number;

    constructor(props: IDirectionProps, context?: any) {
        super(props, context);

        this.x = 0;
        this.y = 0;

        this.state = {
            mouseDown: false,
        };

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
    }

    public onMouseDown(event: ReactMouseEvent<HTMLElement>) {
        this.setState({
            ...this.state,
            mouseDown: true,
        });

        this.x = event.clientX;
        this.y = event.clientY;

        window.addEventListener<'mousemove'>(
            'mousemove',
            this.onMouseMove,
            true,
        );

        window.addEventListener<'mouseup'>(
            'mouseup',
            this.onMouseUp,
            true,
        );

        event.preventDefault();
    }

    public onMouseUp(event: MouseEvent) {
        window.removeEventListener(
            'mousemove',
            this.onMouseMove,
            true,
        );
        window.removeEventListener(
            'mouseup',
            this.onMouseUp,
            true,
        );

        this.setState({
            ...this.state,
            mouseDown: false,
        });

        this.props.finish();
    }

    public onMouseMove(event: MouseEvent) {
        const { direction } = this.props;

        if (this.state.mouseDown) {
            const { move, resize } = this.props;

            let resizeX = 0;
            let resizeY = 0;

            switch (direction) {
                case 'e':
                    resizeX = event.clientX - this.x;
                    resize(-resizeX, 0);
                    move(resizeX, 0);
                    break;
                case 'n':
                    resizeY = event.clientY - this.y;
                    resize(0, -resizeY);
                    move(0, resizeY);
                    break;
                case 'ne':
                    resizeX = event.clientX - this.x;
                    resizeY = event.clientY - this.y;
                    resize(-resizeX, -resizeY);
                    move(resizeX, resizeY);
                    break;
                case 'nw':
                    resizeX = event.clientX - this.x;
                    resizeY = event.clientY - this.y;
                    resize(resizeX, -resizeY);
                    move(0, resizeY);
                    break;
                case 's':
                    resizeY = event.clientY - this.y;
                    resize(0, resizeY);
                    break;
                case 'se':
                    resizeX = event.clientX - this.x;
                    resizeY = event.clientY - this.y;
                    resize(resizeX, resizeY);
                    break;
                case 'sw':
                    resizeX = event.clientX - this.x;
                    resizeY = event.clientY - this.y;
                    resize(-resizeX, resizeY);
                    move(resizeX, 0);
                    break;
                case 'w':
                    resizeX = event.clientX - this.x;
                    resize(resizeX, 0);
                    break;
            }

            this.x = event.clientX;
            this.y = event.clientY;
        }
    }

    public render() {
        const { className } = this.props;

        return (
            <div
                onMouseDown={this.onMouseDown}
                className={className}
            />
        );
    }
}

export default Direction;
