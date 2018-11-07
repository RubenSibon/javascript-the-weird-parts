import {config} from './_config.js';
import {addClass, removeClass} from './_cssClass.js';

export default logIn;

/**
 * Reset login.
 * @param {boolean} approved
 */
function logIn(approved) {
    let toAdd;
    let toRemove;

    if (approved) {
        config.state.loggedIn = true;

        g.firstName = document.querySelector(config.selectors.loginForm + ' #firstName').value;
        g.lastName = document.querySelector(config.selectors.loginForm + ' #lastName').value;
        g.age = document.querySelector(config.selectors.loginForm + ' #age').value;

        // Call method to display welcome message on page.
        // If user is older than 29 years old pass in true for formal language.
        g.HTMLGreeting('#toGreet', g.age > 29);

        toAdd = 'is-flipped';
        toRemove = 'is-flippable';
    } else {
        config.state.loggedIn = false;

        toAdd = 'is-flippable';
        toRemove = 'is-flipped';
    }

    addClass(config.selectors.card, toAdd);
    removeClass(config.selectors.card, toRemove);
}
