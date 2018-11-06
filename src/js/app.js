import {config} from './_config.js';
import {translate} from './_translateStrings.js';
import {formValidate, formError, formEnable} from './_formValidation.js';
import {resetLogin} from './_userAccount.js';

(function() {

    // Instantiate Greetr object.
    const g = G$('John', 'Wick', 'en');

    // User uses language select field.
    $('#langSelect').on('change', function(event) {
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
    $('#firstName, #lastName').on('change, blur', function(event) {
        event.preventDefault();

        let showFormError = false;

        // Reset login on any input.
        resetLogin();

        // If form is valid enable its submission.
        if (formValidate(config.selectors.loginForm)) {
            formEnable(config.selectors.loginForm);
        } else {
            formEnable(config.selectors.loginForm, false);

            showFormError = true;
        }

        console.log(event);

        //  Only show error on input in last name field.
        (event.target.id === 'lastName' || event.type === 'blur') ? formError(showFormError) : formError(false);
    });

    // User clicks the login button.
    $('#login').on('click', function(event) {
        event.preventDefault();

        if (formValidate(config.selectors.loginForm)) {
            // Remove form error.
            formError(false);

            g.firstName = document.querySelector('#loginForm #firstName').value;
            g.lastName = document.querySelector('#loginForm #lastName').value;
            g.age = document.querySelector('#loginForm #age').value;

            // Call method to display welcome message on page.
            // If user is older than 29 years old pass in true for formal language.
            g.HTMLGreeting('#toGreet', g.age > 29);

            if (!config.state.loggedIn) {
                $(config.selectors.card).toggleClass('is-flipped');
            }

            config.state.loggedIn = true;
        } else {
            // Remove any existing welcome message.
            resetLogin();

            // Display error below form if there is none yet.
            if (!document.querySelector('#formError')) {
                formError();
            }
        }
    });

    // User clicks the logout button.
    $('#logout').on('click', function(event) {
        event.preventDefault();

        resetLogin();
    });

})();
