import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { Component } from 'react';

export interface IHeadProps {}

export interface IHeadState {}

type HeadProps = IHeadProps & WithStyles;

class Head extends Component<HeadProps, IHeadState> {

    public render() {
        const {
            action,
            icon,
            price,
        } = this.props.classes;

        return (
            <TableHead>
                <TableRow>
                    <TableCell
                        classes={{
                            root: icon,
                        }}
                    />
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="right" size="small">Balance</TableCell>
                    <TableCell
                        align="right"
                        classes={{
                            root: price,
                        }}
                    >
                        Price
                    </TableCell>
                    <TableCell
                        classes={{
                            root: action,
                        }}
                    />
                </TableRow>
            </TableHead>
        );
    }
}

const style: StyleRulesCallback<Theme, IHeadProps> = (theme: Theme) => {
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

export default withStyles(style)(Head);
