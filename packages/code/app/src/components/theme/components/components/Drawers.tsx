import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import React, { Component } from 'react';

interface IDrawersProps {}

interface IDrawersState {
    bottom: boolean;
    left: boolean;
    right: boolean;
    top: boolean;
}

type DrawersProps = IDrawersProps & WithStyles;

class Drawers extends Component<DrawersProps, IDrawersState> {

    constructor(props: DrawersProps, context?: any) {
        super(props, context);

        this.openBottom = this.openBottom.bind(this);
        this.closeBottom = this.closeBottom.bind(this);
        this.openLeft = this.openLeft.bind(this);
        this.closeLeft = this.closeLeft.bind(this);
        this.openRight = this.openRight.bind(this);
        this.closeRight = this.closeRight.bind(this);
        this.openTop = this.openTop.bind(this);
        this.closeTop = this.closeTop.bind(this);

        this.state = {
            bottom: false,
            left: false,
            right: false,
            top: false,
        };
    }

    public openBottom() {
        this.setState({
            ...this.state,
            bottom: true,
        });
    }

    public closeBottom() {
        this.setState({
            ...this.state,
            bottom: false,
        });
    }

    public openLeft() {
        this.setState({
            ...this.state,
            left: true,
        });
    }

    public closeLeft() {
        this.setState({
            ...this.state,
            left: false,
        });
    }

    public openRight() {
        this.setState({
            ...this.state,
            right: true,
        });
    }

    public closeRight() {
        this.setState({
            ...this.state,
            right: false,
        });
    }

    public openTop() {
        this.setState({
            ...this.state,
            top: true,
        });
    }

    public closeTop() {
        this.setState({
            ...this.state,
            top: false,
        });
    }

    public render() {
        const {
            container,
        } = this.props.classes;

        const sideList = (
            <div>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button={true} key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button={true} key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );

        const fullList = (
            <div>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button={true} key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button={true} key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );

        return (
            <div className={container}>
                <Button onClick={this.openLeft}>Open Left</Button>
                <Button onClick={this.openRight}>Open Right</Button>
                <Button onClick={this.openTop}>Open Top</Button>
                <Button onClick={this.openBottom}>Open Bottom</Button>
                <Drawer open={this.state.left} onClose={this.closeLeft}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.closeLeft}
                        onKeyDown={this.closeLeft}
                    >
                        {sideList}
                    </div>
                </Drawer>
                <Drawer anchor="top" open={this.state.top} onClose={this.closeTop}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.closeTop}
                        onKeyDown={this.closeTop}
                    >
                        {fullList}
                    </div>
                </Drawer>
                <Drawer
                    anchor="bottom"
                    open={this.state.bottom}
                    onClose={this.closeBottom}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.closeBottom}
                        onKeyDown={this.closeBottom}
                    >
                        {fullList}
                    </div>
                </Drawer>
                <Drawer anchor="right" open={this.state.right} onClose={this.closeRight}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.closeRight}
                        onKeyDown={this.closeRight}
                    >
                        {sideList}
                    </div>
                </Drawer>
            </div>
        );
    }

}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        container: {
            margin: '1rem',
        },
    };
};

export default withStyles(style)(Drawers);
