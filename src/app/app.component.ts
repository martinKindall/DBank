import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  depositAmount: number;

  constructor() {
    this.depositAmount = 0.01;
  }

  depositar(): void {
    console.log(this.depositAmount);
  }
}
