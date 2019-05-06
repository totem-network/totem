import Badge from '@material-ui/core/Badge';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import MailIcon from '@material-ui/icons/Mail';
import React, { Component } from 'react';

interface IBadgesProps {}

interface IBadgesState {}

type BadgesProps = IBadgesProps & WithStyles;

class Badges extends Component<BadgesProps, IBadgesState> {

    public render() {
        const {
            badge,
            container,
        } = this.props.classes;

        return (
            <div className={container}>
                <Badge className={badge} badgeContent={12} color="primary">
                    <MailIcon />
                </Badge>
                <Badge className={badge} badgeContent={7} color="secondary">
                    <MailIcon />
                </Badge>
            </div>
        );
    }

}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        badge: {
            margin: '.5rem',
        },
        container: {
            margin: '1rem',
        },
    };
};

export default withStyles(style)(Badges);
