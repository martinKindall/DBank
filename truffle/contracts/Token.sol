// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
  address public minter;

  constructor() payable ERC20('Moneda de Banco Decentralizado', 'DBC') {
    minter = msg.sender;
  }

  function passMinterRole(address dBank) public returns (bool) {
    require(msg.sender == minter, 'Error, only the minter can pass the minter role.');
    minter = dBank;
    return true;
  }

  function mint(address account, uint256 amount) public {
    require(msg.sender == minter, 'Error, only the minter can mint.');
    _mint(account, amount);
  }
}
