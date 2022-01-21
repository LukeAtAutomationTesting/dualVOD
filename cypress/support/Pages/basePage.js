/// <reference types="cypress" />

export default class BasePage {

    accessHomepage() {
        // cy.visit('https://lukeatautomationtesting.github.io/dualVOD-test-platform/index.html');
        cy.visit('http://127.0.0.1:5500/index.html');
        cy.url().should('include', 'index');
    }
}