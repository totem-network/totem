import Paper from '@material-ui/core/Paper';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { Component } from 'react';

interface ITabsComponentProps {}

interface ITabsComponentState {
    tabs1: number;
}

type TabsComponentProps = ITabsComponentProps & WithStyles;

class TabsComponent extends Component<TabsComponentProps, ITabsComponentState> {

    constructor(props: TabsComponentProps, context?: any) {
        super(props, context);

        this.changeTab1 = this.changeTab1.bind(this);

        this.state = {
            tabs1: 0,
        };
    }

    public changeTab1(event: any, value: number) {
        this.setState({
            ...this.state,
            tabs1: value,
        });
    }

    public render() {
        const {
            container,
        } = this.props.classes;

        return (
            <div className={container}>
                <Paper square={true}>
                    <Tabs
                        value={this.state.tabs1}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.changeTab1}
                        variant={'fullWidth'}
                    >
                        <Tab label="Active" />
                        <Tab label="Disabled" disabled={true} />
                        <Tab label="Active" />
                    </Tabs>
                </Paper>
            </div>
        );
    }

}

const style: StyleRulesCallback = (theme: Theme) => {
    return {
        container: {
            margin: '1rem',
        },
    };
};

export default withStyles(style)(TabsComponent);
