import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import React, {
    Component,
    CSSProperties,
    MouseEvent as ReactMouseEvent,
} from 'react';
import Buttons from './Buttons';

interface IHeaderProps {
    close: (event: ReactMouseEvent<HTMLElement>) => void;
    finish: () => void;
    minimize: (event: ReactMouseEvent<HTMLElement>) => void;
    move: (x: number, y: number) => void;
    themeColor: string;
    title: string;
}

interface IHeaderState {
    mouseDown: boolean;
}

type HeaderProps = IHeaderProps & WithStyles;

class Header extends Component<HeaderProps, IHeaderState> {

    protected x: number;

    protected y: number;

    constructor(props: HeaderProps, context?: any) {
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

        window.addEventListener<'mousemove'>('mousemove', this.onMouseMove, true);
        window.addEventListener<'mouseup'>('mouseup', this.onMouseUp, true);

        event.preventDefault();
    }

    public onMouseUp(event: MouseEvent) {
        window.removeEventListener('mousemove', this.onMouseMove, true);
        window.removeEventListener('mouseup', this.onMouseUp, true);

        this.setState({
            ...this.state,
            mouseDown: false,
        });

        this.props.finish();
    }

    public onMouseMove(event: MouseEvent) {
        if (this.state.mouseDown) {
            const { move } = this.props;

            const moveX = event.clientX - this.x;
            const moveY = event.clientY - this.y;

            move(moveX, moveY);

            this.x = event.clientX;
            this.y = event.clientY;
        }
    }

    public render() {
        const { mouseDown } = this.state;
        const { close, minimize, themeColor, title } = this.props;
        const { header, headerMove } = this.props.classes;

        let color = 'rgba(247, 247, 247, 0.8)';
        let buttonBackground = 'rgba(247, 247, 247, 0.65)';
        if (this.hexToLuma(themeColor) > 0.5) {
            color = 'rgba(8, 8, 8, 0.8)';
            buttonBackground = 'rgba(8, 8, 8, 0.65)';
        }

        const headerColors: CSSProperties = {
            backgroundColor: themeColor,
            color,
        };

        return (
            <div
                className={classNames(
                    header,
                    {
                        [headerMove]: mouseDown,
                    },
                )}
                style={headerColors}
                onMouseDown={this.onMouseDown}
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
    }

    protected hexToLuma(color: string) {
        const hex   = color.replace(/#/, '');
        const r     = parseInt(hex.substr(0, 2), 16);
        const g     = parseInt(hex.substr(2, 2), 16);
        const b     = parseInt(hex.substr(4, 2), 16);

        return [
            0.299 * r,
            0.587 * g,
            0.114 * b,
        ].reduce((previous, current) => previous + current) / 255;
    }
}

const style: StyleRules = {
    header: {
        boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
        height: '2rem',
        lineHeight: '2rem',
        position: 'relative',
        textAlign: 'center',
        userSelect: 'none',
        width: '100%',
    },
    headerMove: {
        cursor: 'grabbing',
    },
};

export default withStyles(style)(Header);
