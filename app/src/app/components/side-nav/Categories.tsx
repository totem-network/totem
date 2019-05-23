import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import Item from './Item';

interface ICategory {
    id: string;
    color: string;
    contrastText?: string;
    title: string;
}

interface ICategoriesProps {
    categories: ICategory[];
}

interface ICategoriesState {}

type CategoriesProps = ICategoriesProps & WithStyles;

class Categories extends Component<CategoriesProps, ICategoriesState> {

    public render() {
        const { categories } = this.props;
        const { list } = this.props.classes;

        const items = categories.map((category: ICategory) => (
            <Item
                color={category.color}
                label={category.title}
            />
        ));

        return (
            <ul className={list}>
                {items}
            </ul>
        );
    }

}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        list: {
            padding: 0,
            width: '100%',
        },
    };
};

export default withStyles(style)(Categories);
