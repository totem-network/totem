// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.6.0;

import "@openzeppelin/upgrades/contracts/Initializable.sol";

contract IdentityRegistry is Initializable {

    mapping(address => bytes) private _didDocuments;

    event NewIdentity(address subject, bytes didDocument);
    event RevokeIdentity(address subject);

    function setDidDocument(bytes memory didDocument) public {
        _didDocuments[msg.sender] = didDocument;

        emit NewIdentity(msg.sender, didDocument);
    }

    function revokeDidDocument() public {
        _didDocuments[msg.sender] = '';

        emit RevokeIdentity(msg.sender);
    }

    function getDidDocument(address subject) external view returns (bytes memory) {
        return _didDocuments[subject];
    }

}
