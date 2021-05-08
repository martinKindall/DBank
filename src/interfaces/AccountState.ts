import {DBank} from './DBank';

export interface AccountState {
  balance: () => Promise<number>;
  dBank: DBank;
}
