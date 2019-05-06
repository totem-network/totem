import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import AppBar from './components/AppBar';
import Badges from './components/Badges';
import BottomNavigation from './components/BottomNavigation';
import Buttons from './components/Buttons';
import Cards from './components/Cards';
import Chips from './components/Chips';
import Dialogs from './components/Dialogs';
import Drawers from './components/Drawers';
import ExpansionPanels from './components/ExpansionPanels';
import Lists from './components/Lists';
import Menus from './components/Menus';
import Papers from './components/Papers';
import Progress from './components/Progress';
import SelectionControls from './components/SelectionControls';
import Selects from './components/Selects';
import Snackbars from './components/Snackbars';
import Steppers from './components/Steppers';
import Tables from './components/Tables';
import Tabs from './components/Tabs';
import TextFields from './components/TextFields';
import Tooltips from './components/Tooltips';

interface IComponentsProps {}

interface IComponentsState {}

type ComponentsProps = IComponentsProps & WithStyles;

class Components extends Component<ComponentsProps, IComponentsState> {

    public render() {
        return (
            <div>
                <AppBar />
                <Badges />
                <BottomNavigation />
                <Buttons />
                <Cards />
                <Chips />
                <Dialogs />
                <Drawers />
                <ExpansionPanels />
                <Lists />
                <Menus />
                <Papers />
                <Progress />
                <SelectionControls />
                <Selects />
                <Snackbars />
                <Steppers />
                <Tables />
                <Tabs />
                <TextFields />
                <Tooltips />
            </div>
        );
    }

}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        //
    };
};

export default withStyles(style)(Components);
