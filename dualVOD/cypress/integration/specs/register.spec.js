/// <reference types="cypress" />

describe('A new user registration tests', () => {
    it('should register user with correct e-mail and password', () => {

        cy.visit('https://lukeatautomationtesting.github.io/dualVOD-test-platform/index.html');
        cy.url().should('include', 'index');
        cy.get('.navigation__signin-button .btn').click();
        cy.get('#email_input').type('lukasz@gmail.com');
        cy.get('#password_input').type('lukasz@gmail.com');
    })
});