/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

import HomePage from "../../support/Pages/HomePage";
import RegisterPage from "../../support/Pages/RegisterPage";
import LoginPage from "../../support/Pages/LoginPage";

describe('Login tests', () => {

    const homePage = new HomePage();
    const registerPage = new RegisterPage();
    const loginPage = new LoginPage();

    const newUserEmail = 'user@gmail.com';
    const newUserPassword = 'pass1234';

    before(function () {
        homePage.accessHomepage();
    });

    // LOG_01
    it('should log in on new registered user and then log out', () => {
        registerPage.goToRegisterPage();
        registerPage.registerNewUser(newUserEmail, newUserPassword);
        loginPage.logout();
        loginPage.goToLoginPageByButton();
        loginPage.loginUser(newUserEmail, newUserPassword);
        loginPage.logout();
    });

    describe('Empty input tests', () => {

        beforeEach(function () {
            loginPage.goToLoginPageByUrl();
        });

        afterEach(function () {
            loginPage.cancelLogin();
        });

        // LOG_02
        it('should try to log in without password', () => {
            loginPage.typeEmail(newUserEmail);
            loginPage.clickLoginButton();
            loginPage.checkingIsEmptyCredentialsErrorVisible();
        });

        // LOG_03
        it('should try to log in without e-mail', () => {
            loginPage.typePassword(newUserPassword);
            loginPage.clickLoginButton();
            loginPage.checkingIsEmptyCredentialsErrorVisible();
        });

        // LOG_04
        it('should try to log in without credentials', () => {
            loginPage.clickLoginButton();
            loginPage.checkingIsEmptyCredentialsErrorVisible();
        });
    });

});