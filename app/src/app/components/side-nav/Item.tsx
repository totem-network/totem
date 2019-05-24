import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';

interface IItemProps {
    color: string;
    label: string;
    onClick: any;
}

interface IItemState {}

type ItemProps = IItemProps & WithStyles;

class Item extends Component<ItemProps, IItemState> {

    public render() {
        const {
            color,
            label,
            onClick,
        } = this.props;
        const { item } = this.props.classes;

        const style = {
            borderLeft: `4px solid ${color}`,
        };

        return (
            <li className={item} style={style} onClick={onClick}>
                {label}
            </li>
        );
    }

}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
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
    };
};

export default withStyles(style)(Item);
