import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SendIcon from '@material-ui/icons/Send';
import React, { Component } from 'react';
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

export interface IRowState {
    anchorElement: any;
    openMenu: boolean;
    sendCryptoCurrencyDialog: boolean;
}

type RowProps = IRowProps & WithStyles;

class Row extends Component<RowProps, IRowState> {

    constructor(props: RowProps, context?: any) {
        super(props, context);

        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.openSendCryptoCurrencyDialog = this.openSendCryptoCurrencyDialog.bind(this);
        this.closeSendCryptoCurrencyDialog = this.closeSendCryptoCurrencyDialog.bind(this);

        this.state = {
            anchorElement: null,
            openMenu: false,
            sendCryptoCurrencyDialog: false,
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

    public openSendCryptoCurrencyDialog() {
        this.setState({
            ...this.state,
            openMenu: false,
            sendCryptoCurrencyDialog: true,
        });
    }

    public closeSendCryptoCurrencyDialog() {
        this.setState({
            ...this.state,
            sendCryptoCurrencyDialog: false,
        });
    }

    public render() {
        const {
            balance,
            classes,
            currencyOrToken,
            decimals,
            icon,
            name,
            price,
            symbol,
        } = this.props;

        const {
            anchorElement,
            openMenu,
            sendCryptoCurrencyDialog,
        } = this.state;

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
                    <TableCell align="right" size="small">{this.formatCurrency(balance)}</TableCell>
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
                        <IconButton onClick={this.openMenu}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorElement}
                            onClose={this.closeMenu}
                            open={openMenu}
                        >
                            <MenuItem onClick={this.openSendCryptoCurrencyDialog}>
                                <ListItemIcon>
                                    <SendIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    Send
                                </ListItemText>
                            </MenuItem>
                        </Menu>
                        <SendCryptoCurrencyDialog
                            closeDialog={this.closeSendCryptoCurrencyDialog}
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
    }

    protected formatCurrency(balance: string) {
        const splitBalance = balance.split('.');

        if (splitBalance.length === 1) {
            return balance;
        }

        return `${splitBalance[0]}.${splitBalance[1].slice(0, 4)}`;
    }
}

const style: StyleRulesCallback<Theme, IRowProps> = (theme: Theme) => {
    return {
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
    };
};

export default withStyles(style)(Row);
