import List from '@material-ui/core/List';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useDispatch } from 'react-redux';
import Reset from './Reset';

interface ISubViewProps {}

const useStyles = makeStyles((theme: Theme) => {
    return {
        //
    };
});

const SubView = ({}: ISubViewProps) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    // TODO: use a list for settings to iterate, but create handlers, ... in this component
    // Handle search in every component too -> expand all components and hide those with no results
    // pass a function from the view component to hide or show the category

    return (
        <List
            component={'div'}
            disablePadding={true}
        >
            <Reset />
        </List>
    );
};

export default SubView;
