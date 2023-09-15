export interface Balance {
    amount: number,
}

export const createCheckingAccount = () => {
    
    let balance: Balance = { amount: 0 };

    const deposit = (deposit: number): Balance => {
        balance.amount += deposit;
        return balance;
    }

    const withdrawal = (withdrawal: number): Balance => {
        if (balance.amount - withdrawal < 0) {
            throw new Error("Your account will become negative with this withdrawal.");
        }
        
        balance.amount -= withdrawal;
        return balance;
    }

    function accountBalance(): Balance {
        return balance;
    }

    return {
        deposit,
        withdrawal,
        accountBalance,
    }
};
