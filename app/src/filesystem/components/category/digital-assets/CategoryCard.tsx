import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

export interface ICategoryCardProps {
    image: string;
    name: string;
    onClick: () => any;
}

const useStyles = makeStyles({
    card: {
        cursor: 'pointer',
        margin: '1rem',
        width: '200px',
    },
    media: {
        height: 0,
        marginBottom: '1rem',
        paddingTop: '56.25%', // 16:9
    },
});

const CategoryCard = ({
    image,
    name,
    onClick,
}: ICategoryCardProps) => {
    const classes = useStyles();

    return (
        <Card className={classes.card} onClick={onClick}>
            <CardHeader
                title={name}
            />
            <CardMedia
                className={classes.media}
                image={image}
                title={name}
            />
        </Card>
    );
};

export default CategoryCard;
