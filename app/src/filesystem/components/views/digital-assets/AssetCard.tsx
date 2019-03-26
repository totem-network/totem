import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SendIcon from '@material-ui/icons/Send';
import React, { Component } from 'react';
import SendDigitalAssetDialog from '../../../containers/views/digital-assets/SendDigitalAssetDialog';

export interface IAssetCardProps {
    contract: string;
    description: string;
    image: string;
    name: string;
    token: string;
}

export interface IAssetCardState {
    anchorElement: any;
    openMenu: boolean;
    sendDigitalAssetDialog: boolean;
}

type AssetCardProps = IAssetCardProps & WithStyles;

class AssetCard extends Component<AssetCardProps, IAssetCardState> {

    constructor(props: AssetCardProps, context?: any) {
        super(props, context);

        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.openSendDigitalAssetDialog = this.openSendDigitalAssetDialog.bind(this);
        this.closeSendDigitalAssetDialog = this.closeSendDigitalAssetDialog.bind(this);

        this.state = {
            anchorElement: null,
            openMenu: false,
            sendDigitalAssetDialog: false,
        };
    }

    public openMenu(event: any) {
        this.setState({
            ...this.state,
            anchorElement: event.currentTarget,
            openMenu: true,
        });
    }

    public closeMenu() {
        this.setState({
            ...this.state,
            openMenu: false,
        });
    }

    public openSendDigitalAssetDialog() {
        this.setState({
            ...this.state,
            openMenu: false,
            sendDigitalAssetDialog: true,
        });
    }

    public closeSendDigitalAssetDialog() {
        this.setState({
            ...this.state,
            sendDigitalAssetDialog: false,
        });
    }

    public render() {
        const {
            classes,
            contract,
            description,
            image,
            name,
            token,
        } = this.props;

        const {
            anchorElement,
            openMenu,
            sendDigitalAssetDialog,
        } = this.state;

        return (
            <Card className={classes.card}>
                <CardHeader
                    action={(
                        <IconButton onClick={this.openMenu}>
                            <MoreVertIcon />
                        </IconButton>
                    )}
                    title={name}
                />
                <Menu
                    anchorEl={anchorElement}
                    onClose={this.closeMenu}
                    open={openMenu}
                >
                    <MenuItem onClick={this.openSendDigitalAssetDialog}>
                        <ListItemIcon>
                            <SendIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Send
                        </ListItemText>
                    </MenuItem>
                </Menu>
                <CardMedia
                    className={classes.media}
                    image={image}
                    title={name}
                />
                <CardContent>
                    <Typography component="p">
                        {description}
                    </Typography>
                </CardContent>
                <SendDigitalAssetDialog
                    assetImage={image}
                    assetName={name}
                    closeDialog={this.closeSendDigitalAssetDialog}
                    contract={contract}
                    open={sendDigitalAssetDialog}
                    token={token}
                />
            </Card>
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        card: {
            margin: '1rem',
            maxWidth: 400,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
    };
};

export default withStyles(style)(AssetCard);
