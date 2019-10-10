import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import SendCryptoCurrencyDialog from '../../../containers/category/crypto-currencies/SendCryptoCurrencyDialog';

export interface IRowProps {
    balance: string;
    currencyOrToken: string;
    decimals: number;
    icon: string;
    name: string;
    price: string;
    symbol: string;
}

const useStyles = makeStyles({
    action: {
        padding: '4px 12px',
        width: '40px',
    },
    icon: {
        padding: '4px 12px 4px 24px',
        width: '32px',
    },
    price: {
        padding: '4px 24px',
    },
});

const formatCurrency = (balance: string) => {
    const splitBalance = balance.split('.');

    if (splitBalance.length === 1) {
        return balance;
    }

    return `${splitBalance[0]}.${splitBalance[1].slice(0, 4)}`;
};

const Row = ({
    balance,
    currencyOrToken,
    decimals,
    icon,
    name,
    price,
    symbol,
}: IRowProps) => {
    const classes = useStyles();

    const [anchorElement, setAnchorElement] = useState(null);
    const [menu, setMenu] = useState(false);
    const [sendCryptoCurrencyDialog, setSendCryptoCurrencyDialog] = useState(false);

    const openMenu = (event: any) => {
        setAnchorElement(event.currentTarget);
        setMenu(true);
    };

    const closeMenu = () => {
        setMenu(false);
    };

    const openSendCryptoCurrencyDialog = () => {
        setSendCryptoCurrencyDialog(true);
        setMenu(false);
    };

    const closeSendCryptoCurrencyDialog = () => {
        setSendCryptoCurrencyDialog(false);
    };

    return (
        <TableBody>
            <TableRow>
                <TableCell
                    classes={{
                        root: classes.icon,
                    }}
                >
                    <object data={icon}>
                        <img
                            src='/images/cryptocurrency-icons/generic.svg'
                        />
                    </object>
                </TableCell>
                <TableCell align="left">{name} ({symbol})</TableCell>
                <TableCell align="right" size="small">{formatCurrency(balance)}</TableCell>
                <TableCell
                    align="right"
                    classes={{
                        root: classes.price,
                    }}
                >
                    {price} $
                </TableCell>
                <TableCell
                    align="right"
                    classes={{
                        root: classes.action,
                    }}
                >
                    <IconButton onClick={openMenu}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorElement}
                        onClose={closeMenu}
                        open={menu}
                    >
                        <MenuItem onClick={openSendCryptoCurrencyDialog}>
                            <ListItemIcon>
                                <SendIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Send
                            </ListItemText>
                        </MenuItem>
                    </Menu>
                    <SendCryptoCurrencyDialog
                        closeDialog={closeSendCryptoCurrencyDialog}
                        currencyName={name}
                        currencyIcon={icon}
                        currencyOrToken={currencyOrToken}
                        decimals={decimals}
                        open={sendCryptoCurrencyDialog}
                    />
                </TableCell>
            </TableRow>
        </TableBody>
    );
};

export default Row;
