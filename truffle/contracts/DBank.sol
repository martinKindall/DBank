// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "./Token.sol";

contract DBank {
    Token private token;

    constructor (Token _token) {
        token = _token;
    }
}