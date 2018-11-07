import {config} from './_config.js';
import {translate} from './_translateStrings.js';
import {formIsValid, formError, formEnable} from './_formValidation.js';
import {logIn} from './_userAccount.js';

(function(G$) {

    if (!G$) {
        throw 'Greetr library not found.';
    }

    // Instantiate Greetr object.
    window.g = G$('John', 'Wick', 'en');

    const nameInputSelectors = ['#firstName', '#lastName'];

    // Name input handling.
    const nameInput = event => {
        event.preventDefault();

        let showFormError = false;

        // Reset login on any input.
        logIn(false);

        // If form is valid enable its submission.
        if (formIsValid(config.selectors.loginForm)) {
            formEnable(config.selectors.loginForm);
        } else {
            showFormError = true;
            formEnable(config.selectors.loginForm, false);
        }

        //  Only show error on input in last name field.
        (event.target.id === 'lastName' && event.key !== 'Tab') ? formError(showFormError) : formError(false);
    };

    // User uses language select field.
    document.querySelector('#langSelect').addEventListener('change', event => {
        event.preventDefault();

        if (event.target.value !== config.state.currentLanguage) {

            // Update state with new language.
            config.state.currentLanguage = event.target.value;

            // Set language in app.
            g.setLang(event.target.value);

            // Translate interface.
            translate(event.target.value);
        }
    });

    // User types something in a name field or it looses focus.
    for (const input of nameInputSelectors) {
        document.querySelector(input).addEventListener('keyup', event => nameInput(event));
        document.querySelector(input).addEventListener('blur', event => nameInput(event));
    }

    // User clicks the login button.
    document.querySelector('#login').addEventListener('click', event => {
        event.preventDefault();

        if (formIsValid(config.selectors.loginForm)) {
            // Remove form error.
            formError(false);

            if (config.state.loggedIn !== true) {
                logIn(true);
            } else {
                logIn(false);
            }
        } else {
            // Remove any existing welcome message.
            logIn(false);

            // Display error below form if there is none yet.
            if (!document.querySelector(config.selectors.loginForm)) {
                formError();
            }
        }
    });

    // User clicks the logout button.
    document.querySelector('#logout').addEventListener('click', event => {
        event.preventDefault();

        logIn(false);
    });

})(Greetr);
