/// <reference types="cypress" />

describe('A new user registration tests', () => {

    before(function () {
        // cy.visit('https://lukeatautomationtesting.github.io/dualVOD-test-platform/index.html');
        cy.visit('http://127.0.0.1:5500/index.html');
        cy.url().should('include', 'index');
    });

    const userEmail = 'test@gmail.com';
    const userPassword = 'test1234'

    // REG_01
    it('should register user with correct e-mail and password', () => {
        // actions
        cy.get('.navigation__signin-button .btn').click();
        cy.get('#email-input-register').type(userEmail);
        cy.get('#password-input-register').type(userPassword);
        cy.get('#register-button').click();

        // assertions
        cy.get('.navigation__username-button .btn').should('have.text', userEmail);
        cy.get('.header__logo-box span').should('be.visible');
        cy.get('.navigation__logout-button .btn')
            .should('be.visible')
            .and('have.text', 'Wyloguj się');

        // preparation actions the next test case
        cy.get('.navigation__logout-button .btn').click();
        cy.get('.navigation__logging-button .btn')
            .should('be.visible')
            .and('have.text', 'Zaloguj się');
    });

    describe('Empty input tests', () => {

        afterEach(function () {
            // preparation actions the next test case
            cy.get('#cancel-register').click();
        });

        it('should try to register user without password', () => {
            // actions
            cy.get('.navigation__signin-button .btn').click();
            cy.get('#email-input-register').type(userEmail);
            cy.get('#register-button').click();

            // assertions
            cy.get('#emptyRegisterError').should('be.visible')
                .and('have.class', 'showError');
            cy.get('#emptyRegisterError .alert').should('contain.text', 'E-mail lub hasło jest puste');
        });

        it('should try to register user without e-mail', () => {
            // actions
            cy.get('.navigation__signin-button .btn').click();
            cy.get('#password-input-register').type(userPassword);
            cy.get('#register-button').click();

            // assertions
            cy.get('#emptyRegisterError').should('be.visible')
                .and('have.class', 'showError');
            cy.get('#emptyRegisterError .alert').should('contain.text', 'E-mail lub hasło jest puste');
        });
    })

});