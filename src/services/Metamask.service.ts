import { Injectable } from '@angular/core';
import {WalletService} from './WalletService';

@Injectable({
  providedIn: 'root',
})
export class Metamask implements WalletService {

  constructor() {
    // @ts-ignore
    if (typeof window.ethereum !== 'undefined'){
      console.log('Metamask is enabled!');
    } else {
      alert('Enable Metamask!');
    }
  }

  public deposit(amount: number): Promise<any> {
    return Promise.resolve();
  }
}
