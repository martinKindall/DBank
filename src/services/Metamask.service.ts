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
      const selectedAccount = accounts[0];

      if (typeof selectedAccount !== 'undefined') {
        const balance = async () => web3.utils.fromWei(await web3.eth.getBalance(selectedAccount));
        const dBank = this.initDBank(web3, netId, selectedAccount);
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

  private initDBank(web3: any, networkId: number, account: string): DBank {
    const dbank = new web3.eth.Contract(DBankJson.abi, DBankJson.networks[networkId].address);
    return {
      deposit: (value: number) => {
        return dbank.methods.deposit().send({
          value: web3.utils.toWei(value).toString(),
          from: account
        });
      },
      withdraw(): Promise<any> {
        return dbank.methods.withdraw().send({
          from: account
        });
      }
    };
  }
}
