import {Component, OnInit} from '@angular/core';
import {WalletService} from '../services/WalletService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  depositAmount: number;

  constructor(private walltetService: WalletService) {
    this.depositAmount = 0.01;
  }

  ngOnInit(): void {
        this.walltetService.init()
          .then()
          .catch((error) => {
            console.error(error);
          });
    }

  depositar(): void {
    console.log(this.depositAmount);
  }
}
