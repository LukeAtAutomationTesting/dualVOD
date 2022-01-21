/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

import BasePage from "../../support/Pages/basePage";
import RegisterPage from "../../support/Pages/registerPage";
import LoginPage from "../../support/Pages/loginPage";

describe('A new user registration tests', () => {

    const basePage = new BasePage();
    const registerPage = new RegisterPage();
    const loginPage = new LoginPage();

    const newUserEmail = 'user@gmail.com';
    const newUserPassword = 'pass1234';

    before(function () {
        basePage.accessHomepage();
    });

    it('should log in on new registered user', () => {
        registerPage.goToRegisterPage();
        registerPage.registerNewUser(newUserEmail, newUserPassword);
        loginPage.logout();
        loginPage.goToLoginPage();
        loginPage.loginUser(newUserEmail, newUserPassword);
        loginPage.logout();
    });

    describe('Empty input tests', () => {

        beforeEach(function () {
            loginPage.goToLoginPage();
        });

        afterEach(function () {
            loginPage.cancelLogin();
        });

        it('should try to log in without password', () => {
            loginPage.typeEmail(newUserEmail);
            loginPage.clickLoginButton();
            loginPage.checkingIsEmptyCredentialsErrorVisible();
        });

        it('should try to log in without e-mail', () => {
            loginPage.typePassword(newUserPassword);
            loginPage.clickLoginButton();
            loginPage.checkingIsEmptyCredentialsErrorVisible();
        });

        it('should try to log in without credentials', () => {
            loginPage.clickLoginButton();
            loginPage.checkingIsEmptyCredentialsErrorVisible();
        });
    });

});