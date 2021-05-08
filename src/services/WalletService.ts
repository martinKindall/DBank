import {AccountState} from '../interfaces/AccountState';

export abstract class WalletService {
  abstract init(): Promise<AccountState>;
}
