/// <reference types="cypress" />

export default class HomePage {

    accessHomepage() {
        cy.visit('https://lukeatautomationtesting.github.io/dualVOD-test-platform/index.html');
        cy.title().should('include', 'dualVOD | Najlepsze filmy tu i teraz');
        cy.url().should('include', 'index');
    }

    goToTop15MoviesSection() {
        cy.get("a.navigation__link").contains('TOP 15 filmów').click();
        cy.get('h2.heading-secondary').contains('Top 15 dzisiaj').should('be.visible');
    }

    selectGenre(genreName) {
        cy.get('select#genre-filtering').select(genreName, {force: true}).should('have.value', genreName);
    }

    checkActiveMovieCardsGenres(genre) {
        const moviesGenre = [];
        cy.get('.card-about.visible .genre').each(($el, index, $list) => {
            moviesGenre.push($el.text());
        }).then(() => {
            for (let i = 0; i < moviesGenre.length; i++) {
                expect(moviesGenre[i]).contain(genre);
            }
        });
    }
}