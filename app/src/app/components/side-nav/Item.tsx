import { makeStyles } from '@material-ui/styles';
import React from 'react';

interface IItemProps {
    colorFrom: string;
    colorTo: string;
    label: string;
    onClick: any;
}

const useStyles = makeStyles({
    item: {
        borderBottom: '1px solid #ddd',
        color: '#333',
        fontSize: '1.4rem',
        fontWeight: 'lighter',
        listStyle: 'none',
        margin: 0,
        padding: '.8rem .5rem',
        width: 'calc(100% - 4px - 1rem)',
    },
});

const Item = ({
    colorFrom,
    colorTo,
    label,
    onClick,
}: IItemProps) => {
    const classes = useStyles();

    const style = {
        borderImage: `linear-gradient(to bottom, ${colorFrom}, ${colorTo}) 1 100%`,
        borderStyle: 'solid',
        borderWidth: '4px',
    };

    return (
        <li className={classes.item} style={style} onClick={onClick}>
            {label}
        </li>
    );
};

export default Item;
