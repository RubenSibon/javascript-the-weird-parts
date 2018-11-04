;(function(global, $) {

    /**
     * Greetr constructor function.
     * @constructor
     * @param {string} firstName 
     * @param {string} lastName 
     * @param {string} language 
     */
    var Greetr = function(firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    }

    /**
     * Properties of Greetr.
     */
    var supportedLangs = ['en', 'es', 'nl'];

    var greetings = {
        en: 'Hello',
        es: 'Hola',
        nl: 'Hallo'
    };

    var formalGreeting = {
        en: 'Greetings',
        es: 'Saludos',
        nl: 'Gegroet'
    };

    var logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion',
        nl: 'Ingelogd'
    };

    /**
     * Methods of Greetr.
     */
    Greetr.prototype = {

        /**
         * Return fullname.
         */
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },

        /**
         * Validate if a language is supported.
         */
        validate: function() {
            if (supportedLangs.indexOf(this.language) === -1) {
                throw 'Invalid language.';
            }
        },

        /**
         * Informally greet (default).
         */
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },

        /**
         * Formally greet (set `formal` to `true`).
         */
        formalGreeting: function() {
            return formalGreeting[this.language] + ', ' + this.fullName() + '.';
        },

        /**
         * Greet method. Call either formal or informal greeting methods.
         * @param {boolean} formal 
         */
        greet: function(formal) {
            var msg;

            // Decide whether to call formal or informal greeting.
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            if (console) {
                console.log(msg);
            }

            // Make method chainable.
            return (
                this,
                msg
            );
        },

        /**
         * Log fullname to console.
         */
        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }

            // Make method chainable.
            return this;
        },

        /**
         * Set language that greeting should be returned in.
         * @param {string} lang 
         */
        setLang: function(lang) {
            this.language = lang;

            this.validate();

            // Make method chainable.
            return this;
        },

        /**
         * Insert greeting in HTML.
         * @param {string} selector 
         * @param {boolean} formal 
         */
        HTMLGreeting: function(selector, formal) {
            var htmlMsg;

            if (!$) {
                throw 'jQuery not loaded';
            }

            if (!selector) {
                throw 'Missing jQuery selector';
            }

            htmlMsg = this.greet(formal);

            $(selector).html(htmlMsg);

            // Make method chainable.
            return this;
        },

    };

    /**
     * Init function to instantiate prototype (class);
     * i.e. the actual object is created here.
     */ 
    Greetr.init = function(firstName, lastName, language) {

        // Use self var instead of `this` to avoid confusion with setting stuff on the function constructor.
        var self = this;
        
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';

        self.validate();
    };

    /**
     * Make Greetr.init refer to the prototype of the function constructor.
     * This we do not have to use the `new` keyword.
     */ 
    Greetr.init.prototype = Greetr.prototype;

    /**
     * Attach Greetr to the global object (i.e. "window")
     * and provide a shorthand `$G` to access it.
     */
    global.Greetr = global.G$ = Greetr;

})(window, jQuery);
