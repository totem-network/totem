import { makeStyles } from '@material-ui/styles';
import { ISideNavSelectCategoryAction } from 'filesystem';
import React from 'react';
import Item from './Item';

interface ICategory {
    id: string;
    colorFrom: string;
    colorTo: string;
    contrastText?: string;
    title: string;
}

interface ICategoriesProps {
    categories: ICategory[];
    selectCategory: (category: string) => ISideNavSelectCategoryAction;
}

const useStyles = makeStyles({
    list: {
        padding: 0,
        width: '100%',
    },
});

const Categories = ({
    categories,
    selectCategory,
}: ICategoriesProps) => {
    const classes = useStyles();

    const items = categories.map((category: ICategory, index: number) => {
        const handleClick = () => selectCategory(category.id);

        return (
            <Item
                colorFrom={category.colorFrom}
                colorTo={category.colorTo}
                key={index}
                label={category.title}
                onClick={handleClick}
            />
        );
    });

    return (
        <ul className={classes.list}>
            {items}
        </ul>
    );
};

export default Categories;
