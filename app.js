;(function() {

    // Default values.
    var g = G$('John', 'Wick', 'en');

    // Reset login.
    function resetLogin() {
        if (document.querySelector('#toGreet').innerHTML) {
            document.querySelector('#toGreet').innerHTML = '';
        }
    }

    function formError() {
        // Create new HTML element and text node for an error notice.
        var errorNode = document.createElement('div');
        var errorText = document.createTextNode('First and last name are required.');

        // Append error notice to the form.
        errorNode.setAttribute('id', 'formError');
        errorNode.setAttribute('style', 'color: tomato');
        errorNode.appendChild(errorText);
        document.querySelector('#loginForm').appendChild(errorNode);
    }

    $('#langSelect').on('change', function(event) {
        event.preventDefault();

        g.language = event.target.value;

        // Remove any existing welcome message.
        resetLogin();
    });

    $('#loginForm').on('submit', function(event) {
        event.preventDefault();
    });

    $('#login').on('click', function(event) {
        event.preventDefault();

        var firstname = document.querySelector('#loginForm #firstName').value;
        var lastname = document.querySelector('#loginForm #lastName').value;

        if (firstname.length > 0 && lastname.length > 0) {
            // Remove form error.
            if (document.querySelector('#formError')) {
                document.querySelector('#formError').remove();
            }

            g.firstName = firstname;
            g.lastName = lastname;

            // Call method to display welcome message on page.
            g.HTMLGreeting('#toGreet', true);
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
