import { Injectable } from '@angular/core';
import {WalletService} from './WalletService';
import {AccountState} from '../interfaces/AccountState';
import {DBank} from '../interfaces/DBank';
// @ts-ignore
const DBankJson = require('../../truffle/build/contracts/DBank.json');
// @ts-ignore
const Web3 = require('web3');

@Injectable({
  providedIn: 'root',
})
export class Metamask implements WalletService {

  constructor() {}

  public async init(): Promise<AccountState> {
    let errMsg;

    // @ts-ignore
    const ethereum = window.ethereum;
    if (typeof ethereum !== 'undefined'){
      const web3 = new Web3(ethereum);
      await ethereum.enable();
      const netId = await web3.eth.net.getId();
      console.log(`Network Id ${netId}`);
      const accounts = await web3.eth.getAccounts();

      if (typeof accounts[0] !== 'undefined') {
        const balance = web3.utils.fromWei(await web3.eth.getBalance(accounts[0]));
        const dBank = this.initDBank(web3, netId, accounts[0]);
        console.log(`The balance is ${balance}`);
        return Promise.resolve({balance, dBank});
      } else {
        errMsg = 'Please login with MetaMask and connect the account to this site.';
        alert(errMsg);
        return Promise.reject({msg: errMsg});
      }
    } else {
      errMsg = 'Enable Metamask!';
      alert(errMsg);
      return Promise.reject({msg: errMsg});
    }
  }

  public deposit(amount: number): Promise<any> {
    return Promise.resolve();
  }

  private initDBank(web3: any, networkdId: number, account: string): DBank {
    const dbank = new web3.eth.Contract(DBankJson.abi, DBankJson.networks[networkdId].address);
    console.log(DBankJson.contractName);
    return {deposit: (value: string) => {
        return dbank.methods.deposit().send({
          value,
          from: account
        });
      }};
  }
}
