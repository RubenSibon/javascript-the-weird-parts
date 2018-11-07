export default {addClass, removeClass, toggleClass};

/**
 * Check if class exists on HTML element.
 * @param {string|object} el
 * @param {string|object} cssClass
 */
function classExists(el, cssClass) {
    return el.className.indexOf(cssClass) > 0;
}

/**
 * Check if there is a single class (string).
 * @param {string|object} selector
 * @param {string|object} cssClass
 */
function isSingleClass(cssClass) {
    return typeof cssClass === 'string';
}

/**
 * Check if there is a list of class names (object).
 * @param {string|object} selector
 * @param {string|object} cssClass
 */
function isClassList(cssClass) {
    return typeof cssClass === 'object';
}

/**
 * Apply changes to HTML document.
 * @param {string|object} selector
 * @param {string|object} cssClass
 * @param {string} change
 */
function changeClass(selector, cssClass, change) {
    const selected = document.querySelectorAll(selector);

    let curSelected;
    let singleClass;

    const toRemove = () => {
        curSelected.setAttribute('class', curSelected.className.replace(singleClass, ''));
    };

    const toAdd = () => {
        const newClassName = curSelected.className + ' ' + singleClass;
        curSelected.setAttribute('class', newClassName);
    };

    const applyChange = () => {
        // Toggle class: remove if it exists; add if it does not.
        if (change === 'toggle') classExists(curSelected, singleClass) ? toRemove(singleClass) : toAdd(singleClass);

        // Remove class from selected element if it exists.
        if (change === 'remove' && classExists(curSelected, singleClass)) toRemove(singleClass);

        // Add class to selected element if it did not exist yet.
        if (change === 'add' && !classExists(curSelected, singleClass)) toAdd(singleClass);
    };

    const singleOrListClasses = () => {
        if (isSingleClass(cssClass)) {
            singleClass = cssClass;

            applyChange();
        } else if (isClassList(cssClass)) {
            for (const c of cssClass) {
                singleClass = cssClass[c];

                applyChange();
            }
        } else {
            throw 'Is not a valid CSS class or classLIst.';
        }
    };

    // Loop over node list and then apply change on each element.
    const changeOnNodeList = () => {
        for (const s of selected) {
            curSelected = selected[s][0];
            singleOrListClasses();
        }
    };

    if (selected.length === 1) {
        curSelected = selected[0];
        singleOrListClasses();
    } else if (selected.length > 1) {
        changeOnNodeList();
    }
}

/**
 * Add a class to an HTML element.
 * @param {string|object} selector
 * @param {string|object} cssClass
 */
function addClass(selector, cssClass) {
    changeClass(selector, cssClass, 'add');
}

/**
 * Remove a class from an HTML element.
 * @param {string|object} selector
 * @param {string|object} cssClass
 */
function removeClass(selector, cssClass) {
    changeClass(selector, cssClass, 'remove');
}

/**
 * Toggle a class on an HTML element.
 * @param {string|object} selector
 * @param {string|object} cssClass
 */
function toggleClass(selector, cssClass) {
    changeClass(selector, cssClass, 'toggle');
}
