import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { Route, Switch } from "react-router-dom";
import CategorySelect from '../../containers/theme/settings/CategorySelect';

export interface ISettingsProps {
    category?: string;
}

export interface ISettingsState {}

type SettingsProps = ISettingsProps & WithStyles;

const TypographyLoadable = Loadable({
    loader: () => import(/* webpackChunkName: 'theme-settings-typography' */ './settings/Typography'),
    loading: () => null,
});

const PaletteLoadable = Loadable({
    loader: () => import(/* webpackChunkName: 'theme-settings-palette' */ './settings/Palette'),
    loading: () => null,
});

const MiscLoadable = Loadable({
    loader: () => import(/* webpackChunkName: 'theme-settings-misc' */ './settings/Misc'),
    loading: () => null,
});

class Settings extends Component<SettingsProps, ISettingsState> {

    public render() {
        const {
            category,
        } = this.props;

        const {
            main,
        } = this.props.classes;

        return (
            <main
                className={main}
            >
                <CategorySelect
                    category={category}
                />
                <Switch>
                    <Route path={'/theme/typography/:component?'} component={TypographyLoadable} />
                    <Route path={'/theme/palette'} component={PaletteLoadable} />
                    <Route path={'/theme/misc'} component={MiscLoadable} />
                </Switch>
            </main>
        );
    }
}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        main: {
            padding: '1rem',
        },
    };
};

export default withStyles(style)(Settings);
