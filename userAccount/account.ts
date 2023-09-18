import { v4 as uuidv4 } from 'uuid';
import { createCheckingAccount, Checking as CheckingAccount } from '../checkingAccount/checkingAccount';
import { createSavingsAccount, Savings as SavingsAccount } from '../savingsAccount/savingsAccount';

export interface BankUser {
    id: string,
    firstName: string,
    initialAmount: number,
    overdraftProtection: boolean,
    checkingAccount?: CheckingAccount,
    savingsAccount?: SavingsAccount,
}

export const account = (
    firstName: string, 
    initialAmount: number,
    hasOverdraft: boolean, 
    shouldCreateChecking?: boolean, 
    shouldCreateSavings?: boolean): BankUser => { 
    
    const accountUser: BankUser = {
        id: uuidv4(),
        firstName: firstName,
        initialAmount: initialAmount,
        overdraftProtection: hasOverdraft,
    };

    if (!shouldCreateChecking && !shouldCreateSavings) {
        throw new Error("Please select at least one account type.");
    }

    if (shouldCreateChecking && shouldCreateSavings) {
        const initialSavingsRate: number = 0.5;
        let savingsDepositAmount: number = (initialAmount - (initialAmount * initialSavingsRate));
        accountUser.checkingAccount = createCheckingAccount(hasOverdraft).deposit((initialAmount * initialSavingsRate));

        accountUser.savingsAccount = createSavingsAccount().deposit(savingsDepositAmount);
    }
    
    else if (shouldCreateChecking) {
        accountUser.checkingAccount = createCheckingAccount(hasOverdraft).deposit(initialAmount);
    }

    else if (shouldCreateSavings) {
        accountUser.savingsAccount = createSavingsAccount().deposit(initialAmount);
    }

    return accountUser;
}


const newAccount = account("vanessa", 200, false, true, false);
console.log(newAccount)
