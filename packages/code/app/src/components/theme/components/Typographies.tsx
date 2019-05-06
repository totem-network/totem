import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';

interface ITypographiesProps {}

interface ITypographiesState {}

class Typographies extends Component<ITypographiesProps, ITypographiesState> {

    public render() {
        return (
            <div>
                <Typography variant="h1" gutterBottom={true}>
                    h1. Heading
                </Typography>
                <Typography variant="h2" gutterBottom={true}>
                    h2. Heading
                </Typography>
                <Typography variant="h3" gutterBottom={true}>
                    h3. Heading
                </Typography>
                <Typography variant="h4" gutterBottom={true}>
                    h4. Heading
                </Typography>
                <Typography variant="h5" gutterBottom={true}>
                    h5. Heading
                </Typography>
                <Typography variant="h6" gutterBottom={true}>
                    h6. Heading
                </Typography>
                <Typography variant="subtitle1" gutterBottom={true}>
                    subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                </Typography>
                <Typography variant="subtitle2" gutterBottom={true}>
                    subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                </Typography>
                <Typography variant="body1" gutterBottom={true}>
                    body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                    unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                    dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                </Typography>
                <Typography variant="body2" gutterBottom={true}>
                    body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                    unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                    dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                </Typography>
                <Typography variant="button" gutterBottom={true}>
                    button text
                </Typography>
                <Typography variant="caption" gutterBottom={true}>
                    caption text
                </Typography>
                <Typography variant="overline" gutterBottom={true}>
                    overline text
                </Typography>
            </div>
        );
    }

}

export default Typographies;
