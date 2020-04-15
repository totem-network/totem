import List from '@material-ui/core/List';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useDispatch } from 'react-redux';

interface ISubViewProps {}

const useStyles = makeStyles((theme: Theme) => {
    return {
        //
    };
});

const SubView = ({}: ISubViewProps) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <List
            component={'div'}
            disablePadding={true}
        >
            Test
        </List>
    );
};

export default SubView;
