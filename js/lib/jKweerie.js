(function(global) {

    /**
     * jKweerie constructor function.
     */
    const jKweerie = function() {
        return new jKweerie.init();
    };

    // Store an action.
    const change = '';

    /**
     * Methods of jKweerie.
     */
    jKweerie.prototype = {

        /**
         * Check if class exists on HTML element.
         * @param {string|object} el
         * @param {string|object} cssClass
         */
        classExists: function(el, cssClass) {
            return el.className.indexOf(cssClass) > 0;
        },

        /**
         * Check if there is a single class (string).
         * @param {string|object} selector
         * @param {string|object} cssClass
         */
        isSingleClass: function(cssClass) {
            return typeof cssClass === 'string';
        },

        /**
         * Check if there is a list of class names (object).
         * @param {string|object} selector
         * @param {string|object} cssClass
         */
        isClassList: function(cssClass) {
            return typeof cssClass === 'object';
        },

        toRemove: function(curSelected, singleClass) {
            curSelected.setAttribute('class', curSelected.className.replace(singleClass, ''));
        },

        toAdd: function(curSelected, singleClass) {
            const newClassName = curSelected.className + ' ' + singleClass;
            curSelected.setAttribute('class', newClassName);
        },

        applyChange: function(curSelected, singleClass) {
            // Toggle class: remove if it exists; add if it does not.
            if (this.change === 'toggle') this.classExists(curSelected, singleClass) ? this.toRemove(curSelected, singleClass) : this.toAdd(curSelected, singleClass);

            // Remove class from selected element if it exists.
            if (this.change === 'remove' && this.classExists(curSelected, singleClass)) this.toRemove(curSelected, singleClass);

            // Add class to selected element if it did not exist yet.
            if (this.change === 'add' && !this.classExists(curSelected, singleClass)) this.toAdd(curSelected, singleClass);
        },

        singleOrListClasses: function(curSelected, cssClass) {
            if (this.isSingleClass(cssClass)) {
                this.applyChange(curSelected, cssClass);
            } else if (this.isClassList(cssClass)) {
                for (const c of cssClass) {
                    this.applyChange(curSelected, cssClass[c]);
                }
            } else {
                throw 'Is not a valid CSS class or classList.';
            }
        },

        // Loop over node list and then apply change on each element.
        getUniqueElement: function(selector, cssClass) {
            const selected = document.querySelectorAll(selector);

            if (selected.length === 1) {
                    this.singleOrListClasses(selected[0], cssClass);
            } else if (selected.length > 1) {
                for (const s of selected) {
                    this.singleOrListClasses(selected[s][0], cssClass);
                }
            } else {
                throw 'No valid selector.';
            }
        },

        /**
         * Add a class to an HTML element.
         * @param {string|object} selector
         * @param {string|object} cssClass
         */
        addClass: function(selector, cssClass) {
            this.change = 'add';

            this.getUniqueElement(selector, cssClass);

            return this;
        },

        /**
         * Remove a class from an HTML element.
         * @param {string|object} selector
         * @param {string|object} cssClass
         */
        removeClass: function(selector, cssClass) {
            this.change = 'remove';

            this.getUniqueElement(selector, cssClass);

            return this;
        },

        /**
         * Toggle a class on an HTML element.
         * @param {string|object} selector
         * @param {string|object} cssClass
         */
        toggleClass: function(selector, cssClass) {
            this.change = 'toggle';

            this.getUniqueElement(selector, cssClass);

            return this;
        }

    };

    /**
     * Init function to instantiate prototype (class),
     * i.e. the actual object is created here.
     */
    jKweerie.init = function() {
        console.log('jKweerie.init');
    };

    /**
     * Make jKweerie.init refer to the prototype of the function constructor.
     * This way we do not have to use the `new` keyword.
     */
    jKweerie.init.prototype = jKweerie.prototype;

    /**
     * Attach jKweerie to the global object (i.e. "window")
     * and provide a shorthand `$G` to access it.
     */
    global.jKweerie = global.j$ = jKweerie;

})(window);
