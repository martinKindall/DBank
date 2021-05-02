# MyDbank

A decentralized Bank based on Smart Contracts made in Solidity and running on Ethereum Blockchain, for learning purpouses.
The proyect idea is based on this one from [Dapp University](https://github.com/dappuniversity/dbank).

## Install

```bash
npm install 
cd truffle
npm install # yes, there are two package.jsons, one for the frontend and another for truffle
```

## Compile and Migrate Smart Contracts

First, make sure you are running a local ERC20 blockchain, for example [Ganache](https://www.trufflesuite.com/ganache).
Verify that the _development_ network configured in __truffle-config.js__ matches your params, else modify them. 
Then, just execute _truffle_ commands:

```bash
cd truffle/
truffle compile
truffle migrate
```

## Run Truffle Tests

```bash
truffle test
```
