import { Balance } from '../checkingAccount/checkingAccount';

export interface SavingsBalance extends Balance {
}

export const createSavingsAccount = () => {
    let balance: SavingsBalance = { amount: 0 };

    const deposit = (deposit: number): Balance => {
        balance.amount += deposit;
        return balance;
    }

    const transfer = (transfer: number): void => {
        if (balance.amount - transfer < 0) {
            throw new Error("Transfer cannot be completed, account will become negative.")
        } 
        balance.amount -= transfer;
    }

    return {
        deposit,
        transfer,
    }
}
