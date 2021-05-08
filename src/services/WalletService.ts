import {AccountState} from '../interfaces/AccountState';

export abstract class WalletService {
  abstract deposit(amount: number): Promise<any>;
  abstract init(): Promise<AccountState>;
}
