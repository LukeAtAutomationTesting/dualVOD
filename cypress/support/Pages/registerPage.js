/// <reference types="cypress" />

const emailInput = '#email-input-register';
const passwordInput = '#password-input-register';
const registerButton = '#register-button';
const userNameTextOnHomepage = '.navigation__username-button .btn';
const logOutButton = '.navigation__logout-button .btn';

export default class RegisterPage {

    goToRegisterPage() {
        cy.visit('https://lukeatautomationtesting.github.io/dualVOD-test-platform/RegisterPage.html');
    }

    registerNewUser(email, password) {
        cy.get(emailInput).type(email);
        cy.get(passwordInput).type(password);
        cy.get(registerButton).click();
        cy.get(userNameTextOnHomepage).should('have.text', email);
        cy.get('.header__logo-box span').should('be.visible');
        cy.get(logOutButton)
            .should('be.visible')
            .and('have.text', 'Wyloguj się');
    }
}