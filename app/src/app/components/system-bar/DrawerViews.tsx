import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { isWidthDown } from '@material-ui/core/withWidth';
import { makeStyles } from '@material-ui/styles';
import NotificationsView from 'notifications/components/View';
import React from 'react';
import { View as SettingsView } from 'settings';
import { useWidth } from 'ui';
import QuickSettings from './QuickSettings';

export interface IViewsProps {
    view: string;
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            [theme.breakpoints.up('lg')]: {
                //
            },
        },
    };
});

const Views = ({
    view,
}: IViewsProps) => {
    const classes = useStyles();
    const width = useWidth();

    const renderCategory = () => {
        switch (view) {
            case 'notifications':
                return (
                    <NotificationsView />
                );
            case 'settings':
                return (
                    <SettingsView />
                );
            case 'default':
            default:
                if (isWidthDown('md', width)) {
                    return (
                        <QuickSettings />
                    );
                }

                return null;
        }
    };

    return (
        <div className={classes.container}>
            {renderCategory()}
        </div>
    );
};

export default Views;
