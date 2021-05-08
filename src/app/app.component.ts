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
  accountState?: AccountState;
  loadedBalance = false;

  constructor(private walltetService: WalletService) {
    this.depositAmount = 0.01;
  }

  ngOnInit(): void {
        this.loadedBalance = false;
        this.walltetService.init()
          .then((accState) => {
            this.accountState = accState;
            this.loadedBalance = true;
          })
          .catch((error) => {
            console.error(error);
          });
    }

  depositar(): void {
    console.log(this.depositAmount);
  }
}
