
export abstract class WalletService {
  abstract deposit(amount: number): Promise<any>;
}
