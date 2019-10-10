import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import SendDigitalAssetDialog from '../../../containers/category/digital-assets/SendDigitalAssetDialog';

export interface IAssetCardProps {
    contract: string;
    description: string;
    image: string;
    name: string;
    token: string;
}

const useStyles = makeStyles({
    card: {
        margin: '1rem',
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
});

const AssetCard = ({
    contract,
    description,
    image,
    name,
    token,
}: IAssetCardProps) => {
    const classes = useStyles();

    const [anchorElement, setAnchorElement] = useState(null);
    const [menu, setMenu] = useState(false);
    const [sendDigitalAssetDialog, setSendDigitalAssetDialog] = useState(false);

    const openMenu = (event: any) => {
        setAnchorElement(event.currentTarget);
        setMenu(true);
    };

    const closeMenu = () => {
        setMenu(false);
    };

    const openSendDigitalAssetDialog = () => {
        setSendDigitalAssetDialog(true);
        setMenu(false);
    };

    const closeSendDigitalAssetDialog = () => {
        setSendDigitalAssetDialog(false);
    };

    return (
        <Card className={classes.card}>
            <CardHeader
                action={(
                    <IconButton onClick={openMenu}>
                        <MoreVertIcon />
                    </IconButton>
                )}
                title={name}
            />
            <Menu
                anchorEl={anchorElement}
                onClose={closeMenu}
                open={menu}
            >
                <MenuItem onClick={openSendDigitalAssetDialog}>
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
                closeDialog={closeSendDigitalAssetDialog}
                contract={contract}
                open={sendDigitalAssetDialog}
                token={token}
            />
        </Card>
    );
};

export default AssetCard;
