import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import { setCurrentNetwork } from 'network/actions/blockchain/currentNetwork';
import currentNetworkSelector from 'network/selectors/blockchain/currentNetwork';
import React, { ChangeEvent } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

// TODO: move to external file with a collection of all networks for each cointype
const networks: any = {
    homestead: 1,
    ropsten: 3,
    rinkeby: 4,
    goerli: 5,
    kovan: 42,
};

interface IBlockchainProps {}

const useStyles = makeStyles((theme: Theme) => {
    return {
        icon: {
            [theme.breakpoints.up('lg')]: {
                color: theme.palette.primary.contrastText,
            },
        },
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
        item: {
            [theme.breakpoints.up('lg')]: {
                color: theme.palette.primary.contrastText,
            },
            paddingLeft: theme.spacing(4),
        },
        formControl: {
            width: '100%',
        },
    };
});

const Blockchain = ({}: IBlockchainProps) => {
    const network = useSelector((state: any) => {
        return currentNetworkSelector(state);
    }, shallowEqual);

    const dispatch = useDispatch();
    const classes = useStyles();

    const handleChange = (event: ChangeEvent<any>) => {
        dispatch(setCurrentNetwork(
            'eip155:' + networks[event.target.value],
            event.target.value,
        ));
    };

    return (
        <>
            <ListItem
                className={classes.item}
            >
                <ListItemText>
                    <FormControl
                        className={classes.formControl}
                    >
                        <InputLabel
                            id="blockchainSettings"
                            className={classes.inputLabel}
                        >
                            Blockchain
                        </InputLabel>
                        <Select
                            inputProps={{
                                classes: {
                                    icon: classes.icon,
                                },
                                className: classes.input,
                            }}
                            labelId="blockchainSettings"
                            onChange={handleChange}
                            value={network.name}
                        >
                            <MenuItem value={'homestead'}>Mainnet</MenuItem>
                            <MenuItem value={'ropsten'}>Ropsten</MenuItem>
                            <MenuItem value={'kovan'}>Kovan</MenuItem>
                            <MenuItem value={'rinkeby'}>Rinkeby</MenuItem>
                            <MenuItem value={'goerli'}>Goerli</MenuItem>
                        </Select>
                    </FormControl>
                </ListItemText>
            </ListItem>
        </>
    );
};

export default Blockchain;
