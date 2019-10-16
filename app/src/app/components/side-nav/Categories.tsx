import { makeStyles } from '@material-ui/styles';
import { categoriesSelector, sideNavSelectCategory } from 'filesystem';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Item from './Item';

interface ICategory {
    id: string;
    colorFrom: string;
    colorTo: string;
    contrastText?: string;
    title: string;
}

interface ICategoriesProps {}

const useStyles = makeStyles({
    list: {
        padding: 0,
        width: '100%',
    },
});

const Categories = ({}: ICategoriesProps) => {
    const categories = useSelector(categoriesSelector, shallowEqual);

    const dispatch = useDispatch();

    const classes = useStyles();

    const items = categories.map((category: ICategory, index: number) => {
        const handleClick = () => {
            dispatch(sideNavSelectCategory(category.id));
        };

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
