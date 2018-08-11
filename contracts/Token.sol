pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "zos-lib/contracts/migrations/Migratable.sol";

contract Token is Migratable, DetailedERC20("Totem", "TOTEM", 18), StandardToken {

    function initialize(address wallet) isInitializer("Token", "0") public 
    {
        name = "Totem";
        symbol = "TOTEM";
        decimals = 18;

        totalSupply_ = 10000000 * (10 ** uint256(decimals));

        balances[wallet] = totalSupply_;
        emit Transfer(0x0, wallet, totalSupply_);
    }

}