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
    const initialSavingsAmountRate = 0.5;
    
    const accountUser: BankUser = {
        id: uuidv4(),
        firstName: firstName,
        initialAmount: initialAmount,
    };

    if (createChecking && createSavings) {
        let savingsAmount = (initialAmount - (initialAmount * initialSavingsAmountRate));
        let newChecking = createCheckingAccount();
        accountUser.checkingAccount = newChecking.deposit((initialAmount * initialSavingsAmountRate));

        let newSavings = createSavingsAccount();
        accountUser.savingsAccount = newSavings.deposit(savingsAmount);
        return accountUser;
    }

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
