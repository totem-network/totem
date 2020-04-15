import InputAdornment from '@material-ui/core/InputAdornment';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/styles';
import { Form, Formik } from 'formik';
import React from 'react';
import TextField from 'ui/components/form/TextField';
import { useDispatch } from 'react-redux';

interface ISearchProps {}

const useStyles = makeStyles((theme: Theme) => {
    return {
        input: {
            [theme.breakpoints.up('lg')]: {
                color: theme.palette.primary.contrastText,
            },
        },
        inputLabel: {
            [theme.breakpoints.up('lg')]: {
                color: theme.palette.primary.contrastText,
            },
        },
        underline: {
            [theme.breakpoints.up('lg')]: {
                '&:before': {
                    borderBottomColor: theme.palette.primary.contrastText,
                },
                '&:hover:not(&disabled):before': {
                    borderBottomColor: theme.palette.primary.contrastText,
                },
            },
        },
    };
});

const Search = ({}: ISearchProps) => {
    const classes = useStyles();

    const handleSubmit = () => {
        //
    };

    return (
        <Formik
            initialValues={{
                search: '',
            }}
            onSubmit={handleSubmit}
        >
            <Form>
                <TextField
                    fullWidth={true}
                    InputLabelProps={{
                        className: classes.inputLabel,
                    }}
                    InputProps={{
                        classes: {
                            underline: classes.underline,
                        },
                        className: classes.input,
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    label={'Search Settings'}
                    name={'search'}
                    type={'search'}
                />
            </Form>
        </Formik>
    );
};

export default Search;
