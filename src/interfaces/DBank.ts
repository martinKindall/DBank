
export interface DBank {
  deposit(value: number): Promise<any>;
  withdraw(): Promise<any>;
}
