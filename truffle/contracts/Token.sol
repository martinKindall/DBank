// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
  address public minter;

  constructor() payable ERC20('Moneda de Banco Decentralizado', 'DBC') {
    minter = msg.sender;
  }
}
