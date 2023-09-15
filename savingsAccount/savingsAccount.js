"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSavingsAccount = void 0;
var createSavingsAccount = function () {
    var balance = { amount: 0 };
    var deposit = function (deposit) {
        balance.amount += deposit;
        return balance;
    };
    var transfer = function (transfer) {
        if (balance.amount - transfer < 0) {
            throw new Error("Transfer cannot be completed, account will become negative.");
        }
        balance.amount -= transfer;
    };
    return {
        deposit: deposit,
        transfer: transfer,
    };
};
exports.createSavingsAccount = createSavingsAccount;
