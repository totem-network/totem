pragma solidity ^0.5.0;

import "openzeppelin-eth/contracts/ownership/Ownable.sol";
import "openzeppelin-eth/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-eth/contracts/token/ERC20/ERC20Mintable.sol";
import "openzeppelin-eth/contracts/token/ERC20/ERC20Burnable.sol";
import "zos-lib/contracts/Initializable.sol";

contract Token is Initializable, ERC20Detailed, ERC20Mintable, ERC20Burnable, Ownable {

    string private constant ERROR_SELL_AMOUNT = "ERROR_SELL_AMOUNT";
    string private constant ERROR_SENDER_ZERO = "ERROR_SENDER_ZERO";
    string private constant ERROR_ZERO_ETH = "ERROR_ZERO_ETH";
    string private constant ERROR_ZERO_FOUNDER_DAO_TOKENS = "ERROR_ZERO_FOUNDER_DAO_TOKENS";

    uint internal constant TOKEN_PRICE_INITIAL = 0.0000001 ether;
    uint internal constant TOKEN_PRICE_INCREMENTAL = 0.00000001 ether;

    uint internal constant MAX_FOUNDER_DAO_TOKENS = 1000000;

    uint public _reserveBalance;
    uint public _gasPrice;

    uint private _totalFounderDaoTokens;
    uint private _founderTokensWithdrawn;
    uint private _daoTokensWithdrawn;

    modifier validGasPrice() {
        assert(tx.gasprice <= _gasPrice);
        _;
    }

    function initialize(
        string memory name, string memory symbol, uint8 decimals,
        address[] memory minters, address sender, uint gasPrice
    ) public initializer {
        ERC20Detailed.initialize(name, symbol, decimals);

        // Initialize the minter and pauser roles, and renounce them
        ERC20Mintable.initialize(address(this));
        _removeMinter(address(this));

        // Add the requested minters and pausers (this can be done after renouncing since
        // these are the internal calls)
        for (uint i = 0; i < minters.length; ++i) {
            _addMinter(minters[i]);
        }

        Ownable.initialize(sender);

        _gasPrice = gasPrice;
    }
    
    function setGasPrice(uint gasPrice) public onlyOwner {
        require(gasPrice > 0);
        _gasPrice = gasPrice;
    }

    function _calculatePurchaseReturn(uint value) public view returns (uint) {
        uint tokenPriceInitial = TOKEN_PRICE_INITIAL * 1e18;

        uint root = sqrt(
            (tokenPriceInitial**2).add(
                (TOKEN_PRICE_INCREMENTAL.mul(1e18)).mul(2).mul(value.mul(1e18))
            ).add(
                ((TOKEN_PRICE_INCREMENTAL)**2).mul(totalSupply()**2)
            ).add(
                TOKEN_PRICE_INCREMENTAL.mul(2).mul(tokenPriceInitial).mul(totalSupply())
            )
        );

        uint tokenAmount = 
            root.sub(
                tokenPriceInitial
            ).div(
                TOKEN_PRICE_INCREMENTAL
            ).sub(
                totalSupply()
            );

        return tokenAmount;
    }

    function _calculateSaleReturn(uint sellAmount) public view returns (uint) {
        require(totalSupply() >= sellAmount, ERROR_SELL_AMOUNT);

        uint tokens = (sellAmount + 1e18);
        uint tokenSupply = (totalSupply() + 1e18);

        uint etherAmount =      
            TOKEN_PRICE_INITIAL.add(
                TOKEN_PRICE_INCREMENTAL.mul(tokenSupply.div(1e18))
            ).sub(
                TOKEN_PRICE_INCREMENTAL
            ).mul(
                tokens.sub(1e18)
            ).sub(
                (TOKEN_PRICE_INCREMENTAL.mul(((tokens**2).sub(tokens)).div(1e18))).div(2)
            ).div(
                1e18
            ).div(5);
        
        return etherAmount;
    }

    function _calculateTokensPrice(uint tokenAmount) public view returns (uint) {
        uint tokens = (tokenAmount + 1e18);
        uint tokenSupply = (totalSupply() + tokenAmount + 1e18);

        uint etherAmount =      
            TOKEN_PRICE_INITIAL.add(
                TOKEN_PRICE_INCREMENTAL.mul(tokenSupply.div(1e18))
            ).sub(
                TOKEN_PRICE_INCREMENTAL
            ).mul(
                tokens.sub(1e18)
            ).sub(
                (TOKEN_PRICE_INCREMENTAL.mul(((tokens**2).sub(tokens)).div(1e18))).div(2)
            ).div(
                1e18
            );
        
        return etherAmount;
    }

    function sqrt(uint x) public pure returns (uint y) {
        if (x == 0) return 0;
        else if (x <= 3) return 1;
        uint z = x.add(1).div(2);
        y = x;
        while (z < y) {
            y = z;
            z = x.div(z).add(z).div(2);
        }
    }

    function buy() public payable {
        require(msg.value > 0, ERROR_ZERO_ETH);

        // buy user tokens
        uint tokensToMint = _calculatePurchaseReturn(msg.value);
        _mint(address(msg.sender), tokensToMint);
        _reserveBalance = _reserveBalance.add(msg.value.div(5));

        uint maxTokensWithDecimals = MAX_FOUNDER_DAO_TOKENS.mul(10 ** uint(decimals()));
        
        // buy founder&dao tokens
        if (_totalFounderDaoTokens < maxTokensWithDecimals) {
            uint founderDaoTokensToMint = _calculatePurchaseReturn(msg.value.div(4));
            uint founderDaoReserve = msg.value.div(20);

            // Special case: totalFounderDaoTokens + founderDaoTokensToMint > maxTokensWithDecimals
            // only mint till 1000000 reached and add only price for purchased tokens to reserve
            if (_totalFounderDaoTokens.add(founderDaoTokensToMint) > maxTokensWithDecimals) {
                founderDaoTokensToMint = maxTokensWithDecimals.sub(_totalFounderDaoTokens);
                founderDaoReserve = _calculateTokensPrice(founderDaoTokensToMint);
            }

            _mint(address(this), founderDaoTokensToMint);
            _reserveBalance = _reserveBalance.add(founderDaoReserve);

            _totalFounderDaoTokens = _totalFounderDaoTokens.add(founderDaoTokensToMint);
        }
    }

    function sell(uint sellAmount) validGasPrice public {
        require(sellAmount > 0 && balanceOf(msg.sender) >= sellAmount, ERROR_SELL_AMOUNT);
        uint ethAmount = _calculateSaleReturn(sellAmount);

        msg.sender.transfer(ethAmount);
        _burn(address(msg.sender), sellAmount);
        _reserveBalance = _reserveBalance.sub(ethAmount);
    }

    function withdrawEther(address payable beneficiary) public onlyOwner {
        uint amount = address(this).balance.sub(_reserveBalance);

        beneficiary.transfer(amount);
    }

    function withdrawDaoTokens(address payable beneficiary) public onlyOwner {
        require(_totalFounderDaoTokens > 0, ERROR_ZERO_FOUNDER_DAO_TOKENS);

        uint tokensToWithdraw = _totalFounderDaoTokens.div(2).sub(_daoTokensWithdrawn);

        _transfer(address(this), beneficiary, tokensToWithdraw);

        _daoTokensWithdrawn = _daoTokensWithdrawn.add(tokensToWithdraw);
    }

    function withdrawFounderTokens(address payable beneficiary) public onlyOwner {
        require(_totalFounderDaoTokens > 0, ERROR_ZERO_FOUNDER_DAO_TOKENS);

        uint tokensToWithdraw = _totalFounderDaoTokens.div(2).sub(_founderTokensWithdrawn);

        _transfer(address(this), beneficiary, tokensToWithdraw);

        _founderTokensWithdrawn = _founderTokensWithdrawn.add(tokensToWithdraw);
    }

}