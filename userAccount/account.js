"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.account = void 0;
var uuid_1 = require("uuid");
var checkingAccount_1 = require("../checkingAccount/checkingAccount");
var savingsAccount_1 = require("../savingsAccount/savingsAccount");
var account = function (firstName, initialAmount, createChecking, createSavings) {
    var initialSavingsAmountRate = 0.5;
    var accountUser = {
        id: (0, uuid_1.v4)(),
        firstName: firstName,
        initialAmount: initialAmount,
    };
    if (createChecking && createSavings) {
        var savingsAmount = (initialAmount - (initialAmount * initialSavingsAmountRate));
        var newChecking = (0, checkingAccount_1.createCheckingAccount)();
        accountUser.checkingAccount = newChecking.deposit((initialAmount * initialSavingsAmountRate));
        var newSavings = (0, savingsAccount_1.createSavingsAccount)();
        accountUser.savingsAccount = newSavings.deposit(savingsAmount);
        return accountUser;
    }
    if (createChecking) {
        var newChecking = (0, checkingAccount_1.createCheckingAccount)();
        newChecking.deposit(initialAmount);
        accountUser.checkingAccount = newChecking.accountBalance();
    }
    if (createSavings) {
        var newSavings = (0, savingsAccount_1.createSavingsAccount)();
        accountUser.savingsAccount = newSavings.deposit(initialAmount);
    }
    return accountUser;
};
exports.account = account;
var newAccount = (0, exports.account)("vanessa", 500, true, true);
console.log(newAccount);
