import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';

interface IBottomNavigationComponentProps {}

interface IBottomNavigationComponentState {}

type BottomNavigationComponentProps = IBottomNavigationComponentProps & WithStyles;

class BottomNavigationComponent extends Component<BottomNavigationComponentProps, IBottomNavigationComponentState> {

    public render() {
        const {
            container,
        } = this.props.classes;

        return (
            <div className={container}>
                <Card>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom={true}>
                            Word of the Day
                        </Typography>
                        <Typography variant="h5">
                            be
                            -
                            nev
                            -o-
                            lent
                        </Typography>
                        <Typography color="textSecondary">
                            adjective
                        </Typography>
                        <Typography>
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }

}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        container: {
            margin: '1rem',
            maxWidth: '200px',
        },
    };
};

export default withStyles(style)(BottomNavigationComponent);
