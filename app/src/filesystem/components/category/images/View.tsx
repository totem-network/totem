import StoreIcon from '@material-ui/icons/Store';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import ActionButtons from '../../action-buttons/ActionButtons';
import ActionButton from '../../action-buttons/Button';
import Error from '../../Error';
import LoadingBar from '../../LoadingBar';
import ViewNavButton from '../../view-nav/Button';
import ViewNav from '../../view-nav/ViewNav';

export interface IImagesViewProps {}

const useStyles = makeStyles({
    container: {
        alignContent: 'flex-start',
        display: 'flex',
        flexWrap: 'wrap',
        height: '100%',
        overflowY: 'auto',
    },
});

const ImagesView = ({}: IImagesViewProps) => {
    const classes = useStyles();

    return (
        <>
            <ViewNav>
                <ViewNavButton
                    icon={<StoreIcon />}
                    label={'Albums'}
                />
            </ViewNav>
            <div className={classes.container}>
                Test
            </div>
        </>
    );
};

export default ImagesView;
