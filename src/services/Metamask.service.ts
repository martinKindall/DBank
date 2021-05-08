import { Injectable } from '@angular/core';
import {WalletService} from './WalletService';
// @ts-ignore
const Web3 = require('web3');

@Injectable({
  providedIn: 'root',
})
export class Metamask implements WalletService {

  constructor() {}

  public async init(): Promise<any> {
    // @ts-ignore
    const ethereum = window.ethereum;
    if (typeof ethereum !== 'undefined'){
      const web3 = new Web3(ethereum);
      const netId = await web3.eth.net.getId();
      console.log(netId);
      // const accounts = await web3.eth.getAccounts();
      //
      // if (typeof accounts[0] !== 'undefined') {
      //   const balance = await web3.eth.getBalance(accounts[0]);
      //   console.log(`The balance is ${balance}`);
      // } else {
      //   alert('Please login with MetaMask');
      // }
    } else {
      alert('Enable Metamask!');
    }

    return Promise.resolve();
  }

  public deposit(amount: number): Promise<any> {
    return Promise.resolve();
  }
}
