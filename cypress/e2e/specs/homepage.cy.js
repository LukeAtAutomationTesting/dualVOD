/// <reference types="cypress" />

import HomePage from "../../support/Pages/HomePage";

describe('Homepage tests', () => {

    const homePage = new HomePage();

    before(function () {
        homePage.accessHomepage();
    });

    describe('Filtering movies', () => {
        before(function () {
            homePage.goToTop15MoviesSection();
        });

        // HOME_01
        it('should filter movies by changing genre and update visibility of active movie cards', () => {
            homePage.selectGenre('Dramat');
            homePage.checkActiveMovieCardsGenres('Dramat');
        });
    });
});