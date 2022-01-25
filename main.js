$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.header__menu').addClass('sticky');
    } else if ($(this).scrollTop() < 50) {
        $('.header__menu').removeClass('sticky');
    }
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.navigation__link:link').attr('style', 'color: black');
        // $('.navigation__link:hover').attr('style', 'box-shadow: 0px 3px 10px -5px rgba(0, 0, 0, 0.7)');
        $('div.header__logo-box > span > a').attr('style', 'color: black');
        $('.header__logo-box').attr('style', 'height: 10rem');
        $('.navigation').attr('style', 'height: 10rem');
        $('.navigation__hamburger i').attr('style', 'font-size: 4rem');
        $('.navigation__hamburger').attr('style', 'top: 3rem');

    } else if ($(this).scrollTop() < 50) {
        $('.navigation__link:link').removeAttr('style', 'color: black');
        $('div.header__logo-box > span > a').removeAttr('style', 'color: black');
        $('.header__logo-box').removeAttr('style', 'height: 10rem');
        $('.navigation').removeAttr('style', 'height: 10rem');
        $('.navigation__hamburger i').removeAttr('style', 'font-size: 3rem');
        $('.navigation__hamburger').removeAttr('style', 'top: 3rem');
    }
});


$('.features-tags').on('click', '.features-tags__link', function () {
    $(this).addClass('active').siblings().removeClass('active');

    $(".features-tags__content").removeClass('active');
    $("#" + $(this).attr('data-change')).addClass('active');
});


$(document).ready(function ($) {
    var alterClass = function () {
        var ww = document.body.clientWidth;
        if (ww < 1024) {
            $('.section-features .row > div, .section-testimonials .row > div').removeClass('col-1-of-2');
        } else if (ww >= 1025) {
            $('.section-features .row > div, .section-testimonials .row > div').addClass('col-1-of-2');
        };

        if (ww < 600) {
            $('.section-about .row > div, .section-pricing .row > div').removeClass('col-1-of-3');
        } else if (ww >= 601) {
            $('.section-about .row > div, .section-pricing .row > div').addClass('col-1-of-3');
        };
    };
    $(window).resize(function () {
        alterClass();
    });
    //Fire it when the page first loads:
    alterClass();
    let mainPage = new MainPage();
    mainPage.onMainPageLoad();
});


$("#logoutButton").click(function () {
    console.log("wylogowano")
    let mainPage = new MainPage();
    mainPage.logout();
});

class MainPage {

    onMainPageLoad() {
        const userLogin = JSON.parse(localStorage.getItem("user")) || null;
        if(userLogin) {
            console.log('has login')
            $(".navigation__username-button").html("<a class=\"btn\">"+ userLogin +"</a>");
            $(".loggedInButtons").addClass("loggedIn");
            console.log('test login')
        }
    }

    logout() {
        console.log("logout()")
        localStorage.setItem("user", null);
        $(".loggedInButtons").removeClass("loggedIn");
    }
}

const headerMenu = document.querySelector('.header__menu');
const hamburgerBtn = document.querySelector('.navigation__hamburger');

hamburgerBtn.onclick = function () {

    if (headerMenu.className == 'open') {
        headerMenu.className = 'header__menu';
    } else {
        headerMenu.className = 'open';
    }
}

const modal_container = document.getElementById('modal_container');

document.querySelectorAll('.card-about').forEach((item, index) => {
    item.addEventListener('click', event => {
        modal_container.classList.add('show');
        updateModalData(index);
    });
});

document.querySelectorAll('.close-modal').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        modal_container.classList.remove('show');
    });
});

const genre_filtering = document.getElementById('genre-filtering');
genre_filtering.addEventListener('change', (event) => {
    const genre = event.target.value;
    if (genre === '') {
        clearFilters();
    } else {
        clearFilters();
        filterMovies(genre);
    }
});

const start_year = document.getElementById('start-year');
const end_year = document.getElementById('end-year');

start_year.addEventListener('change', filterByYear );
end_year.addEventListener('change', filterByYear );

function filterByYear() {
    clearFilters2();
    yearFiltering();
}


function filterMovies(genre) {
    const movies = document.querySelectorAll('.card-about');
    document.querySelectorAll('.genre').forEach((item, index) => {
        if (!item.textContent.includes(genre)) {
            movies[index].classList.add('hide');
        }
    });
}

function clearFilters() {
    document.querySelectorAll('.card-about').forEach(item => {
        item.classList.remove('hide');
    });
}

function clearFilters2() {
    console.log('clear')
    document.querySelectorAll('.card-about').forEach(item => {
        item.classList.remove('hidden');
    });
}

function updateModalData(index) {
    const titles = document.querySelectorAll('.card-about__title');
    const descriptions = document.querySelectorAll('.card-about__description');
    const modal_title = document.getElementById('modal-title');
    const modal_description = document.getElementById('modal-description');

    $(modal_title).text(titles[index].textContent);
    $(modal_description).text(descriptions[index].textContent);
}

function yearFiltering() {
    const start_year = document.getElementById('start-year').value;
    const end_year = document.getElementById('end-year').value;
    const movies = document.querySelectorAll('.card-about');
    console.log('yearFiltering', start_year, end_year);
    document.querySelectorAll('.year').forEach((item, index) => {
        let productionData = item.textContent;
        if (+productionData < +start_year || +productionData > +end_year) {
            movies[index].classList.add('hidden');
        }
    });
}

function resetFiltering() {
    document.getElementById('start-year').value = 1900;
    document.getElementById('end-year').value = 2022;
    document.getElementById('genre-filtering').value = "";
    clearFilters();
    clearFilters2();
}
