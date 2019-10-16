import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import React, {
    CSSProperties,
    MouseEvent,
} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
    selectCategory,
} from '../../actions/instances';
import categoriesSelector from '../../selectors/categories';
import instanceCategorySelector from '../../selectors/instanceCategory';

interface ICategory {
    id: string;
    colorFrom: string;
    colorTo: string;
    contrastText?: string;
    title: string;
}

export interface ICategoriesProps {
    instance: string;
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        categories: {
            [theme.breakpoints.down('md') + ' and (orientation:landscape)']: {
                width: '50%',
            },
            flexDirection: 'row',
            margin: '2.5rem 1.5rem',
            padding: '0',
        },
        category: {
            [theme.breakpoints.down('md') + ' and (orientation:landscape)']: {
                height: '9vw',
                marginLeft: '1.5vw',
                marginTop: '1.5vw',
                width: '9vw',
            },
            [theme.breakpoints.up('lg')]: {
                display: 'block',
                marginTop: '.5rem',
                padding: '.1rem .5rem',
            },
            borderRadius: '.1rem .4rem .1rem',
            color: '#333', // TODO: color from theme
            cursor: 'pointer',
            display: 'inline-block',
            listStyleType: 'none',
            overflow: 'hidden',
        },
        categoryIcon: {
            width: '100%',
        },
    };
});

const Categories = ({
    instance,
}: ICategoriesProps) => {
    const categories: ICategory[] = useSelector(categoriesSelector, shallowEqual);
    const selectedCategory = useSelector((state) => {
        return instanceCategorySelector(state, instance);
    }, shallowEqual);

    const dispatch = useDispatch();
    const classes = useStyles();

    const categoryComponents = categories.map((category, index) => {
        const handleClick = (event: MouseEvent<HTMLElement>) => {
            dispatch(selectCategory(instance, category.id));
        };

        const categoryBackground: CSSProperties  = {};

        if (selectedCategory === category.id) {
            categoryBackground.background = `linear-gradient(
                to right,
                ${category.colorFrom},
                ${category.colorTo}
            )`;

            if (category.contrastText) {
                categoryBackground.color = category.contrastText;
            }
        }

        return (
            <li key={index} className={classes.category} style={categoryBackground} onClick={handleClick}>
                {category.title}
            </li>
        );
    });

    return (
        <>
            <ul className={classes.categories}>
                {categoryComponents}
            </ul>
        </>
    );
};

export default Categories;
