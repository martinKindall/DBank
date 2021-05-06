import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {WalletService} from '../services/WalletService';
import {Metamask} from '../services/Metamask.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [
    {provide: WalletService, useClass: Metamask}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
