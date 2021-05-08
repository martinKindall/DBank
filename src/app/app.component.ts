import {Component, OnInit} from '@angular/core';
import {WalletService} from '../services/WalletService';
import {AccountState} from '../interfaces/AccountState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  depositAmount: number;
  accountState: AccountState;

  constructor(private walltetService: WalletService) {
    this.depositAmount = 0.01;
    this.accountState = {balance: 0};
  }

  ngOnInit(): void {
        this.walltetService.init()
          .then((accState) => {
            this.accountState = accState;
          })
          .catch((error) => {
            console.error(error);
          });
    }

  depositar(): void {
    console.log(this.depositAmount);
  }
}
