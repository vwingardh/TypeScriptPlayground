"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.account = void 0;
var uuid_1 = require("uuid");
var checkingAccount_1 = require("../checkingAccount/checkingAccount");
var savingsAccount_1 = require("../savingsAccount/savingsAccount");
var account = function (firstName, initialAmount, hasOverdraft, shouldCreateChecking, shouldCreateSavings) {
    var accountUser = {
        id: (0, uuid_1.v4)(),
        firstName: firstName,
        initialAmount: initialAmount,
        overdraftProtection: hasOverdraft,
    };
    if (!shouldCreateChecking && !shouldCreateSavings) {
        throw new Error("Please select at least one account type.");
    }
    if (shouldCreateChecking && shouldCreateSavings) {
        var initialSavingsRate = 0.5;
        var savingsDepositAmount = (initialAmount - (initialAmount * initialSavingsRate));
        accountUser.checkingAccount = (0, checkingAccount_1.createCheckingAccount)(hasOverdraft).deposit((initialAmount * initialSavingsRate));
        accountUser.savingsAccount = (0, savingsAccount_1.createSavingsAccount)().deposit(savingsDepositAmount);
    }
    else if (shouldCreateChecking) {
        accountUser.checkingAccount = (0, checkingAccount_1.createCheckingAccount)(hasOverdraft).deposit(initialAmount);
    }
    else if (shouldCreateSavings) {
        accountUser.savingsAccount = (0, savingsAccount_1.createSavingsAccount)().deposit(initialAmount);
    }
    return accountUser;
};
exports.account = account;
var newAccount = (0, exports.account)("vanessa", 200, false, true, false);
console.log(newAccount);
