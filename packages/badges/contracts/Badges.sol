pragma solidity ^0.5.0;

import "openzeppelin-eth/contracts/ownership/Ownable.sol";
import "openzeppelin-eth/contracts/token/ERC721/StandaloneERC721.sol";
import "zos-lib/contracts/Initializable.sol";

contract Badges is Initializable, Ownable {

    string private constant ERROR_SENDER_ZERO = "ERROR_SENDER_ZERO";
    string private constant ERROR_TOKEN_ZERO = "ERROR_TOKEN_ZERO";
    string private constant ERROR_TOKEN_ALREADY_SET = "ERROR_TOKEN_ALREADY_SET";
    string private constant ERROR_NOT_ENOUGH_ETH = "ERROR_NOT_ENOUGH_ETH";
    string private constant ERROR_BADGE_EXPIRED = "ERROR_BADGE_EXPIRED";
    string private constant ERROR_BADGE_ALREADY_CREATED = "ERROR_BADGE_ALREADY_CREATED";
    string private constant ERROR_BADGE_NOT_FOUND = "ERROR_BADGE_NOT_FOUND";

    StandaloneERC721 private _token;

    mapping(string => uint) _price;
    mapping(string => uint) _expires;

    string[] public _badges;

    function initialize(address sender) public initializer {
        require(address(sender) != address(0), ERROR_SENDER_ZERO);
        _transferOwnership(sender);
    }

    function setToken(StandaloneERC721 token) external {
        require(address(token) != address(0), ERROR_TOKEN_ZERO);
        require(address(_token) == address(0), ERROR_TOKEN_ALREADY_SET);
        _token = token;
    }

    function getBadgesLength() public view returns (uint length) {
        length = _badges.length;
    }

    function getBadgeData(string memory tokenURI) public view returns (uint price, uint expires) {
        price = _price[tokenURI];
        expires = _expires[tokenURI];
    }

    function buy(string memory tokenURI) public payable {
        require(_expires[tokenURI] > 0, ERROR_BADGE_NOT_FOUND);
        require(msg.value >= _price[tokenURI], ERROR_NOT_ENOUGH_ETH);
        require(block.number < _expires[tokenURI], ERROR_BADGE_EXPIRED);

        _token.mintWithTokenURI(address(msg.sender), _token.totalSupply(), tokenURI);
    }

    function createBadge(string memory tokenURI, uint price, uint expires) public onlyOwner {
        require(_price[tokenURI] == 0, ERROR_BADGE_ALREADY_CREATED);
        _price[tokenURI] = price;
        _expires[tokenURI] = expires;

        _badges.push(tokenURI);
    }

    function makeAvailableUntil(string memory tokenURI, uint expires) public onlyOwner {
        require(_expires[tokenURI] > 0, ERROR_BADGE_NOT_FOUND);
        _expires[tokenURI] = expires;
    }

    function withdraw(address payable beneficiary) public onlyOwner {
        beneficiary.transfer(address(this).balance);
    }

}