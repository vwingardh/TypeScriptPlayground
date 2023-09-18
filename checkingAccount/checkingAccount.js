"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckingAccount = void 0;
var createCheckingAccount = function (hasOverdraft) {
    var balance = { amount: 0, overdraftProtection: hasOverdraft };
    if (hasOverdraft) {
        balance.overdraftBalance = 500;
    }
    var deposit = function (deposit) {
        balance.amount += deposit;
        return balance;
    };
    var withdrawal = function (withdrawal) {
        if (balance.overdraftBalance && withdrawal > balance.amount) {
            var newOverdraftBalance = balance.overdraftBalance - (withdrawal - balance.amount);
            if (newOverdraftBalance < 0) {
                throw new Error("You have reached your overdraft protection limit.");
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
    };
    function accountBalance() {
        return balance;
    }
    return {
        deposit: deposit,
        withdrawal: withdrawal,
        accountBalance: accountBalance,
    };
};
exports.createCheckingAccount = createCheckingAccount;
var newAccount = (0, exports.createCheckingAccount)(true);
newAccount.deposit(200);
newAccount.withdrawal(300);
console.log(newAccount.accountBalance());
newAccount.withdrawal(399);
console.log(newAccount.accountBalance());
