import {config} from './_config.js';

/**
 * Reset login.
 */
export function resetLogin() {
    config.state.loggedIn = false;

    $(config.selectors.card).removeClass('is-flipped');
}
