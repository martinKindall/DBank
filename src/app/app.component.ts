import { Component } from '@angular/core';
import {WalletService} from '../services/WalletService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  depositAmount: number;

  constructor(private walltetService: WalletService) {
    this.depositAmount = 0.01;
  }

  depositar(): void {
    console.log(this.depositAmount);
  }
}
