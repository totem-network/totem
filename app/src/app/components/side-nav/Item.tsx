import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';

interface IItemProps {
    colorFrom: string;
    colorTo: string;
    label: string;
    onClick: any;
}

interface IItemState {}

type ItemProps = IItemProps & WithStyles;

class Item extends Component<ItemProps, IItemState> {

    public render() {
        const {
            colorFrom,
            colorTo,
            label,
            onClick,
        } = this.props;
        const { item } = this.props.classes;

        const style = {
            borderImage: `linear-gradient(to bottom, ${colorFrom}, ${colorTo}) 1 100%`,
            borderStyle: 'solid',
            borderWidth: '4px',
        };

        return (
            <li className={item} style={style} onClick={onClick}>
                {label}
            </li>
        );
    }

}

const styles: StyleRulesCallback<Theme, IItemProps> = (theme: Theme) => {
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

export default withStyles(styles)(Item);
