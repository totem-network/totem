import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';

export interface ICategoryCardProps {
    image: string;
    name: string;
    onClick: () => any;
}

interface ICategoryCardState {}

type CategoryCardProps = ICategoryCardProps & WithStyles;

class CategoryCard extends Component<CategoryCardProps, ICategoryCardState> {

    public render() {
        const {
            classes,
            image,
            name,
            onClick,
        } = this.props;

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
    }
}

const style: StyleRulesCallback<Theme, ICategoryCardProps> = (theme: Theme) => {
    return {
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
    };
};

export default withStyles(style)(CategoryCard);
