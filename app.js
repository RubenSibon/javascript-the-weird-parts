;(function() {

    // Default values.
    const g = G$('John', 'Wick', 'en');

    // Is user logged in?
    let loggedIn = false;

    // Current language.
    let currentLanguage = 'en';

    const strings = {
        en: {
            formTitle: 'Enter your details:',
            firstName: 'First name',
            lastName: 'Last name',
            age: 'Age',
            langEN: 'English',
            langES: 'Español (Spanish)',
            langNL: 'Nederlands (Dutch)',
            login: 'Login',
            formError: 'First and last name are required.',
            welcomeMsg: 'Welcome in the app.',
            loginPrompt: 'Log in to see app\'s content.'
        },
        es: {
            formTitle: 'Introduce tus detalles:',
            firstName: 'Primer nombre',
            lastName: 'Apellido',
            age: 'Años',
            langEN: 'English (Inglés)',
            langES: 'Español',
            langNL: 'Nederlands (Holandés)',
            login: 'Iniciar sesión',
            formError: 'Se requieren nombre y apellido.',
            welcomeMsg: 'Bienvenido en la aplicación.',
            loginPrompt: 'Inicia sesión para ver el contenido de la aplicación.'
        },
        nl: {
            formTitle: 'Voer je details in:',
            firstName: 'Voornaam',
            lastName: 'Achternaam',
            age: 'Leeftijd',
            langEN: 'English (Engels)',
            langES: 'Español (Spaans)',
            langNL: 'Nederlands',
            login: 'Inloggen',
            formError: 'Voor- en achternaam zijn vereist.',
            welcomeMsg: 'Welkom in the app.',
            loginPrompt: 'Log in om de inhoud te zien.'
        }
    };

    // Reset login.
    function resetLogin() {
        loggedIn = false;

        $('.greeting').removeClass('appeared');
        $('.prompt').removeClass('hide');

        if (document.querySelector('#toGreet').innerHTML) {
            document.querySelector('#toGreet').innerHTML = '';
        }
    }

    // Display a form error.
    // Currently only checking for input on name fields.
    function formError() {
        // Create new HTML element and text node for an error notice.
        const errorNode = document.createElement('div');
        const errorText = document.createTextNode(strings[currentLanguage]['formError']);

        // Append error notice to the form.
        errorNode.setAttribute('id', 'formError');
        errorNode.setAttribute('class', 'form-error');
        errorNode.setAttribute('data-translate', 'formError');
        errorNode.appendChild(errorText);
        document.querySelector('#loginForm').appendChild(errorNode);
    }

    function translateStrings(lang) {
        for (const string in strings[lang]) {
            const elementToTranslate = document.querySelector('[data-translate="' + string + '"]');

            let newString;
            let oldString;

            // Get translation for string.
            if (typeof string !== 'undefined') {
                newString = strings[lang][string];
            } else {
                // Fallback to English.
                newString = strings['en'][string];
            }

            if (elementToTranslate) {
                // String to translate is in input.
                if (elementToTranslate.nodeName === 'INPUT') {
                    if (elementToTranslate.type === 'submit') {
                        // If input element is of type 'submit' set new value.
                        elementToTranslate.value = newString;
                    } else {
                        // All other input elements get there placeholder translated.
                        elementToTranslate.setAttribute('placeholder', newString);
                    }
                } else {
                    // Text node inside element that can be replaced.
                    oldString = elementToTranslate.innerHTML;

                    elementToTranslate.innerHTML = elementToTranslate.innerHTML.replace(oldString, newString);
                }
            }
        }
    }

    $('#langSelect').on('change', function(event) {
        event.preventDefault();

        if (event.target.value !== currentLanguage) {
            currentLanguage = event.target.value;

            g.setLang(event.target.value);

            translateStrings(event.target.value);

            // Remove any existing welcome message.
            resetLogin();
        }
    });

    $('#login').on('click', function(event) {
        event.preventDefault();

        const firstname = document.querySelector('#loginForm #firstName').value;
        const lastname = document.querySelector('#loginForm #lastName').value;
        const age = document.querySelector('#loginForm #age').value;

        if (firstname.length > 0 && lastname.length > 0) {
            // Remove form error.
            if (document.querySelector('#formError')) {
                document.querySelector('#formError').remove();
            }

            g.firstName = firstname;
            g.lastName = lastname;
            g.age = age;

            // Call method to display welcome message on page.
            // If user is older than 29 years old pass in true for formal language.
            g.HTMLGreeting('#toGreet', g.age > 29);

            if (!loggedIn) {
                $('.greeting').addClass('appeared');
                $('.prompt').addClass('hide');
            }

            loggedIn = true;
        } else {
            // Remove any existing welcome message.
            resetLogin();

            // Display error below form if there is none yet.
            if (!document.querySelector('#formError')) {
                formError();
            }
        }
    });

})();
