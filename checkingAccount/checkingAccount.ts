export interface Checking {
    amount: number,
    overdraftProtection: boolean,
    overdraftBalance?: number,
}

export const createCheckingAccount = (hasOverdraft: boolean) => {
        
    let balance: Checking = { amount: 0, overdraftProtection: hasOverdraft };
    if (hasOverdraft) {
        balance.overdraftBalance = 500;
    }

    const deposit = (deposit: number): Checking => {
        balance.amount += deposit;
        return balance;
    }

    const withdrawal = (withdrawal: number): Checking => {
        if (balance.overdraftBalance && withdrawal > balance.amount) {
            let newOverdraftBalance: number = balance.overdraftBalance - (withdrawal - balance.amount); 
            if (newOverdraftBalance < 0) {
                throw new Error("You have reached your overdraft protection limit.")
            }
            balance.overdraftBalance = newOverdraftBalance;
            balance.amount = (balance.amount - withdrawal);
            return balance;
        }

        if (!hasOverdraft && (balance.amount - withdrawal) < 0) {
            throw new Error("Your account will become negative with this withdrawal.");
        }
        
        balance.amount -= withdrawal;
        return balance;
    }

    function accountBalance(): Checking {
        return balance;
    }

    return {
        deposit,
        withdrawal,
        accountBalance,
    }
};