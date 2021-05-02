// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "./Token.sol";

contract DBank {
    Token private token;

     mapping(address => bool) public isDeposited;
     mapping(address => uint) public etherBalanceOf;
     mapping(address => uint) public depositStart;

    constructor (Token _token) {
        token = _token;
    }
    
    function deposit() payable public {
        require(isDeposited[msg.sender] == false, 'Error, deposit already active');
        require(msg.value >= 1e16, 'Error, deposit must be >= 0.01 ETH');

        etherBalanceOf[msg.sender] = msg.value;
        isDeposited[msg.sender] = true;
        depositStart[msg.sender] = block.timestamp;
    }

    function withdraw() public  {
        require(isDeposited[msg.sender] == true, 'Error, user has no funds in the dBank.');

        uint depositTime = block.timestamp - depositStart[msg.sender];
        uint interestPerSecond = 31668017 * (etherBalanceOf[msg.sender] / 1e16);
        uint interest = depositTime * interestPerSecond;

        msg.sender.transfer(etherBalanceOf[msg.sender]);
        token.mint(msg.sender, interest);

        etherBalanceOf[msg.sender] = 0;
        depositStart[msg.sender] = 0;
        isDeposited[msg.sender] = false;
    }
}