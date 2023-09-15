"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckingAccount = void 0;
var createCheckingAccount = function () {
    var balance = { amount: 0 };
    var deposit = function (deposit) {
        balance.amount += deposit;
        return balance;
    };
    var withdrawal = function (withdrawal) {
        if (balance.amount - withdrawal < 0) {
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
