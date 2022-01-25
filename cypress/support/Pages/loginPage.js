/// <reference types="cypress" />

import BasePage from "./BasePage";

const emailInput = '#email-input-login';
const passwordInput = '#password-input-login';
const loginButton = '#login-button';
const userNameTextOnHomepage = '.navigation__username-button .btn';
const logInButton = '.navigation__logging-button .btn';
const logOutButton = '.navigation__logout-button .btn';
const homePageLogo = '.header__logo-box span';
const loginPageHeader = '#login-card h2.text-center';

export default class LoginPage extends BasePage {

    goToLoginPageByUrl() {
        //cy.visit('https://lukeatautomationtesting.github.io/dualVOD-test-platform/LoginPage.html');
        cy.visit('http://127.0.0.1:5500/LoginPage.html');
        cy.get(loginPageHeader).should('have.text', 'Logowanie dualVOD');
    }

    goToLoginPageByButton() {
        cy.get(logInButton).click();
        cy.get(loginPageHeader).should('have.text', 'Logowanie dualVOD');
    }

    loginUser(email, password) {
        this.typeEmail(email);
        this.typePassword(password);
        this.clickLoginButton();
        cy.get(userNameTextOnHomepage).should('have.text', email);
        cy.get(homePageLogo).should('be.visible');
        cy.get(logOutButton)
            .should('be.visible')
            .and('have.text', 'Wyloguj się');
    }

    logout() {
        cy.get(logOutButton).click();
        cy.get(logInButton)
            .should('be.visible')
            .and('have.text', 'Zaloguj się');
    }

    typeEmail(email) {
        cy.get(emailInput).type(email);
        cy.get(emailInput).should('have.value', email);
    }

    typePassword(password) {
        cy.get(passwordInput).type(password);
    }

    cancelLogin() {
        cy.get('#cancel-login').click();
        // asserting that cancel action takes user to the homepage
        cy.get(homePageLogo).should('be.visible');
        cy.get(logInButton)
            .should('be.visible')
            .and('have.text', 'Zaloguj się');
    }

    clickLoginButton() {
        cy.get(loginButton).click();
    }

    checkingIsEmptyCredentialsErrorVisible() {
        cy.get('#emptyLoginCredentialsError').should('be.visible').and('have.class', 'showError');
        cy.get('#emptyLoginCredentialsError .alert').should('contain.text', 'E-mail lub hasło jest puste');
    }
}