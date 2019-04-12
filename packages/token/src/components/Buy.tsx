
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Contract, utils } from 'ethers';
import React, { Component } from 'react';
import Media from 'react-media';
import { signerOrProvider } from '../web3provider';

import Token from '../../build/contracts/Token.json';
import zos from '../../zos.mainnet.json';

const TokenContract = new Contract(
    zos.proxies["@totem/token/Token"][0].address,
    Token.abi,
    (signerOrProvider as any),
);

const buy = async (eth: string) => {
    TokenContract.buy({
        value: utils.parseEther(eth),
    });
};

const sell = async (tokens: string) => {
    TokenContract.sell(utils.parseEther(tokens), {
        gasLimit: utils.bigNumberify('500000'),
    });
};

const updateState = async (setState: any, state: IBuyState) => {
    try {
        const accounts = await (window as any).ethereum.enable();

        const balance = await TokenContract.balanceOf(accounts[0]);

        const tokens = utils.formatEther(balance);

        setState({
            ...state,
            tokens,
        });
    } catch (error) {
        setState({
            ...state,
            web3NotFound: true,
        });
    }
};

interface IBuyProps {}

interface IBuyState {
    buyAmount: string;
    buyDialog: boolean;
    buyError: string;
    sellAmount: string;
    sellDialog: boolean;
    sellError: string;
    tab: any;
    tokens: string;
    web3NotFound: boolean;
}

class Buy extends Component<IBuyProps, IBuyState> {

    constructor(props: IBuyProps, context?: any) {
        super(props, context);

        this.state = {
            buyAmount: '',
            buyDialog: false,
            buyError: '',
            sellAmount: '',
            sellDialog: false,
            sellError: '',
            tab: 0,
            tokens: '0',
            web3NotFound: false,
        };

        this.openBuyDialog = this.openBuyDialog.bind(this);
        this.closeBuyDialog = this.closeBuyDialog.bind(this);
        this.openSellDialog = this.openSellDialog.bind(this);
        this.closeSellDialog = this.closeSellDialog.bind(this);
        this.buyTokens = this.buyTokens.bind(this);
        this.sellTokens = this.sellTokens.bind(this);
        this.changeBuyAmount = this.changeBuyAmount.bind(this);
        this.changeSellAmount = this.changeSellAmount.bind(this);
        this.changeTab = this.changeTab.bind(this);
    }

    public openBuyDialog() {
        this.setState({
            ...this.state,
            buyAmount: '',
            buyDialog: true,
            buyError: '',
            sellAmount: '',
            sellDialog: false,
        });
    }

    public closeBuyDialog() {
        this.setState({
            ...this.state,
            buyAmount: '',
            buyDialog: false,
            buyError: '',
        });
    }

    public openSellDialog() {
        this.setState({
            ...this.state,
            buyAmount: '',
            buyDialog: false,
            sellAmount: '',
            sellDialog: true,
            sellError: '',
        });
    }

    public closeSellDialog() {
        this.setState({
            ...this.state,
            sellAmount: '',
            sellDialog: false,
            sellError: '',
        });
    }

    public buyTokens() {
        if (this.state.buyAmount === '') {
            this.setState({
                ...this.state,
                buyError: 'Please enter an amount of ETH',
            });

            return;
        }

        buy(this.state.buyAmount);

        this.setState({
            ...this.state,
            buyAmount: '',
            buyDialog: false,
        });
    }

    public sellTokens() {
        if (this.state.sellAmount === '') {
            this.setState({
                ...this.state,
                sellError: 'Please enter an amount of TOTEM',
            });

            return;
        }

        sell(this.state.sellAmount);

        this.setState({
            ...this.state,
            sellAmount: '',
            sellDialog: false,
        });
    }

    public changeBuyAmount(event: any) {
        if (event.target.value !== ''
            && this.state.buyError
        ) {
            this.setState({
                ...this.state,
                buyAmount: event.target.value,
                buyError: '',
            });

            return;
        }

        this.setState({
            ...this.state,
            buyAmount: event.target.value,
        });
    }

    public changeSellAmount(event: any) {
        if (event.target.value !== ''
            && this.state.sellError
        ) {
            this.setState({
                ...this.state,
                sellAmount: event.target.value,
                sellError: '',
            });

            return;
        }

        this.setState({
            ...this.state,
            sellAmount: event.target.value,
        });
    }

    public changeTab(event: any, value: any) {
        this.setState({
            ...this.state,
            buyError: '',
            sellError: '',
            tab: value,
        });
    }

    public componentDidMount() {
        updateState(this.setState.bind(this), this.state);
    }

    public render() {
        const {
            tokens,
        } = this.state;

        return (
            <Media query='(max-width: 768px)'>
                {(matches) =>
                    matches ? (
                        <AppBar
                            position="fixed"
                            style={{
                                backgroundColor: '#f8f8f8',
                                bottom: 0,
                                color: '#000',
                                top: 'auto',
                            }}
                        >
                            <Toolbar>
                                <Typography
                                    color="inherit"
                                    style={{
                                        flexGrow: 1,
                                    }}
                                >
                                    Tokens: {tokens}
                                </Typography>
                                <Button color="inherit" onClick={this.openSellDialog}>Sell</Button>
                                <Button color="inherit" onClick={this.openBuyDialog}>Buy</Button>
                            </Toolbar>
                            {this.renderBuyDialog()}
                            {this.renderSellDialog()}
                        </AppBar>
                    ) : this.renderCard()
                }
            </Media>
        );
    }

    public renderBuyDialog() {
        return (
            <Dialog
                open={this.state.buyDialog}
                onClose={this.closeBuyDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Buy TOTEM</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.renderBuy()}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.closeBuyDialog}>
                        Close
                    </Button>
                    <Button onClick={this.buyTokens} color="primary">
                        Buy
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    public renderSellDialog() {
        return (
            <Dialog
                open={this.state.sellDialog}
                onClose={this.closeSellDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Sell TOTEM</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.renderSell()}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.closeSellDialog}>
                        Close
                    </Button>
                    <Button onClick={this.sellTokens} color="primary">
                        Sell
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    public renderCard() {
        const { tokens } = this.state;

        return (
            <Card
                style={{
                    maxWidth: '400px',
                    position: 'fixed',
                    right: 0,
                    width: '25%',
                }}
            >
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.tab}
                        onChange={this.changeTab}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab label="Buy" value={0} />
                        <Tab label="Sell" value={1} />
                    </Tabs>
                </AppBar>
                {this.renderTabContainer()}
                <AppBar
                    position="static"
                    style={{
                        backgroundColor: '#f8f8f8',
                        bottom: 0,
                        color: '#000',
                        top: 'auto',
                    }}
                >
                    <Toolbar>
                        <Typography
                            color="inherit"
                            style={{
                                flexGrow: 1,
                            }}
                        >
                            Tokens: {tokens}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Card>
        );
    }

    public renderTabContainer() {
        if (this.state.tab === 1) {
            return (
                <>
                    <CardContent>
                        <Typography gutterBottom={true} variant="h5">
                            Sell
                        </Typography>
                        {this.renderSell()}
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={this.sellTokens}>
                            Sell
                        </Button>
                    </CardActions>
                </>
            );
        }

        return (
            <>
                <CardContent>
                    <Typography gutterBottom={true} variant="h5">
                        Buy
                    </Typography>
                    {this.renderBuy()}
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={this.buyTokens}>
                        Buy
                    </Button>
                </CardActions>
            </>
        );
    }

    public renderBuy() {
        return (
            <FormControl fullWidth={true}>
                <InputLabel htmlFor="adornment-amount">Amount</InputLabel>
                <Input
                    id="adornment-amount"
                    value={this.state.buyAmount}
                    error={(this.state.buyError !== '')}
                    onChange={this.changeBuyAmount}
                    startAdornment={<InputAdornment position="start">ETH</InputAdornment>}
                />
                <FormHelperText id="component-error-text">{this.state.buyError}</FormHelperText>
            </FormControl>
        );
    }

    public renderSell() {
        return (
            <FormControl fullWidth={true}>
                <InputLabel htmlFor="adornment-amount">Amount</InputLabel>
                <Input
                    id="adornment-amount"
                    value={this.state.sellAmount}
                    error={(this.state.sellError !== '')}
                    onChange={this.changeSellAmount}
                    startAdornment={<InputAdornment position="start">TOTEM</InputAdornment>}
                />
                <FormHelperText id="component-error-text">{this.state.sellError}</FormHelperText>
            </FormControl>
        );
    }

}

export default Buy;
