import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';

export interface ICategoryImageProps {
    images: string[];
}

export interface ICategoryImageState {}

type CategoryImageProps = ICategoryImageProps & WithStyles;

class CategoryImage extends Component<CategoryImageProps, ICategoryImageState> {

    public render() {
        const { images } = this.props;
        const {
            image,
        } = this.props.classes;

        if (images.length === 1) {
            const imageStyle = {
                backgroundImage: `url(${images[0]})`,
            };

            return (
                <div className={image} style={imageStyle} />
            );
        }

        // TODO: show split view for up to 4 images

        if (images.length >= 1) {
            const imageStyle = {
                backgroundImage: `url(${images[0]})`,
            };

            return (
                <div className={image} style={imageStyle} />
            );
        }

        return (
            <img />
        );
    }
}

const style: StyleRulesCallback<Theme, ICategoryImageProps> = (theme: Theme) => {
    return {
        image: {
            backgroundPositionX: 'center',
            backgroundSize: 'cover',
            borderRadius: '.25rem 1rem .25rem',
            boxShadow: '0 0 4px rgba(0, 0, 0, 0.2)',
            height: '64px',
            margin: '.2rem auto',
            width: '64px',
        },
    };
};

export default withStyles(style)(CategoryImage);
