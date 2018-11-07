import {CONFIG} from './_config.js';

/**
 * Reset login.
 * @param {boolean} approved
 */
export function logIn(approved) {
    let toAdd;
    let toRemove;

    if (approved) {
        CONFIG.state.loggedIn = true;

        g.firstName = document.querySelector(CONFIG.selectors.loginForm + ' #firstName').value;
        g.lastName = document.querySelector(CONFIG.selectors.loginForm + ' #lastName').value;
        g.age = document.querySelector(CONFIG.selectors.loginForm + ' #age').value;

        // Call method to display welcome message on page.
        // If user is older than 29 years old pass in true for formal language.
        g.HTMLGreeting('#toGreet', g.age > 29);

        toAdd = 'is-flipped';
        toRemove = 'is-flippable';
    } else {
        CONFIG.state.loggedIn = false;

        toAdd = 'is-flippable';
        toRemove = 'is-flipped';
    }

    console.log(j);

    j.addClass(CONFIG.selectors.card, toAdd);
    j.removeClass(CONFIG.selectors.card, toRemove);
}
