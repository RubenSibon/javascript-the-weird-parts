import {CONFIG} from './_config.js';
import {TRANSLATABLE_STRINGS} from './_translations.js';

/**
 * Check if form is valid.
 * Currently only checking for input on name fields.
 * @param {string} formSelector
 */
export function formIsValid(formSelector) {
    const form = document.querySelector(formSelector);

    // True on start.
    let allRequiredHaveValue = true;

    // If one required field has no input return false.
    for (const field of form.querySelectorAll('[required]')) {

        // Currently only validate input fields of type 'text'.
        if (field.type === 'text') {
            allRequiredHaveValue = allRequiredHaveValue && (field.value.length > 0);
        }
    }

    // Return 'true' is all fields have valid input.
    return allRequiredHaveValue;
}

/**
 * Display a form error.
 * @param {boolean} error
 */
export function formError(error = true) {
    if (error) {
        // Create new HTML element and text node for an error notice.
        const errorNode = document.createElement('div');
        const errorText = document.createTextNode(TRANSLATABLE_STRINGS[CONFIG.state.currentLanguage]['formError']);

        // Append error notice to the form.
        errorNode.setAttribute('id', 'formError');
        errorNode.setAttribute('class', 'form-error');
        errorNode.setAttribute('data-translate', 'formError');
        errorNode.appendChild(errorText);
        document.querySelector('#loginForm').appendChild(errorNode);
    } else {
        if (document.querySelector('#formError')) {
            document.querySelector('#formError').remove();
        }
    }
}

/**
 * Enable form for submission.
 * @param {boolean} formSelector
 * @param {boolean} enable
 */
export function formEnable(formSelector, enable = true) {
    const submitButton = document.querySelector(formSelector).querySelector('[type=submit]');

    if (enable) {
        submitButton.removeAttribute('disabled');
    } else {
        submitButton.setAttribute('disabled', 'disabled');
    }
}
