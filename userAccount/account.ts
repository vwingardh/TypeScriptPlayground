import { v4 as uuidv4 } from 'uuid';
import { createCheckingAccount, Balance as CheckingBalance } from '../checkingAccount/checkingAccount';
import { createSavingsAccount, SavingsBalance } from '../savingsAccount/savingsAccount';

export interface BankUser {
    id: string,
    firstName: string,
    initialAmount: number,
    checkingAccount?: CheckingBalance,
    savingsAccount?: SavingsBalance,
}

export const account = (firstName: string, initialAmount: number, createChecking?: boolean, createSavings?: boolean): BankUser => {    
    const accountUser: BankUser = {
        id: uuidv4(),
        firstName: firstName,
        initialAmount: initialAmount,
    };

    if (createChecking) {
        let newChecking = createCheckingAccount();
        newChecking.deposit(initialAmount);
        accountUser.checkingAccount = newChecking.accountBalance();
    }

    if (createSavings) {
        let newSavings = createSavingsAccount();
        accountUser.savingsAccount = newSavings.deposit(initialAmount);
    }
    
    return accountUser;
}


const newAccount = account("vanessa", 200, true, true);
console.log(newAccount)
