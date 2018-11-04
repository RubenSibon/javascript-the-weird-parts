;(function() {

    // Default values.
    var g = G$('John', 'Wick', 'en');

    // Is user logged in?
    var loggedIn = false;

    // Reset login.
    function resetLogin() {
        loggedIn = false;

        $('.greeting').removeClass('appeared');

        if (document.querySelector('#toGreet').innerHTML) {
            document.querySelector('#toGreet').innerHTML = '';
        }
    }

    // Display a form error.
    // Currently only checking for input on name fields.
    function formError() {
        // Create new HTML element and text node for an error notice.
        var errorNode = document.createElement('div');
        var errorText = document.createTextNode('First and last name are required.');

        // Append error notice to the form.
        errorNode.setAttribute('id', 'formError');
        errorNode.setAttribute('class', 'form-error');
        errorNode.setAttribute('style', 'color: tomato');
        errorNode.appendChild(errorText);
        document.querySelector('#loginForm').appendChild(errorNode);
    }

    $('#langSelect').on('change', function(event) {
        event.preventDefault();

        g.setLang(event.target.value);

        // Remove any existing welcome message.
        resetLogin();
    });

    $('#login').on('click', function(event) {
        event.preventDefault();

        var firstname = document.querySelector('#loginForm #firstName').value;
        var lastname = document.querySelector('#loginForm #lastName').value;
        var age = document.querySelector('#loginForm #age').value;

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
