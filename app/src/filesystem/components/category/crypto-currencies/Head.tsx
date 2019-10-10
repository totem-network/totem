import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

export interface IHeadProps {}

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

const Head = ({}: IHeadProps) => {
    const classes = useStyles();

    return (
        <TableHead>
            <TableRow>
                <TableCell
                    classes={{
                        root: classes.icon,
                    }}
                />
                <TableCell align="left">Name</TableCell>
                <TableCell align="right" size="small">Balance</TableCell>
                <TableCell
                    align="right"
                    classes={{
                        root: classes.price,
                    }}
                >
                    Price
                </TableCell>
                <TableCell
                    classes={{
                        root: classes.action,
                    }}
                />
            </TableRow>
        </TableHead>
    );
};

export default Head;
