// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js/_config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONFIG = void 0;
var CONFIG = {
  selectors: {
    // Login card.
    card: '.card',
    // Login form.
    loginForm: '#loginForm'
  },
  state: {
    // Is the user logged in?
    loggedIn: false,
    // The current language.
    currentLanguage: 'en'
  }
};
exports.CONFIG = CONFIG;
},{}],"js/_translations.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translatableStrings = void 0;
var translatableStrings = {
  en: {
    formTitle: 'Enter your details:',
    firstName: 'First name',
    lastName: 'Last name',
    age: 'Age',
    langEN: 'English',
    langES: 'Español (Spanish)',
    langNL: 'Nederlands (Dutch)',
    login: 'Login',
    logout: 'Logout',
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
    logout: 'Cerrar sesión',
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
    logout: 'Uitloggen',
    formError: 'Voor- en achternaam zijn vereist.',
    welcomeMsg: 'Welkom in the app.',
    loginPrompt: null // 'Log in om de inhoud te zien.'

  }
};
exports.translatableStrings = translatableStrings;
},{}],"js/_translateStrings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translate = translate;

var _translations = require("./_translations.js");

/**
 * Translate a single string.
 * @param {string} lang
 * @param {string} string
 */
function translateString(lang, string) {
  var elementToTranslate = document.querySelector('[data-translate="' + string + '"]');
  var newString;
  var oldString; // Get translation for string.

  if (_translations.translatableStrings[lang][string] !== null && typeof _translations.translatableStrings[lang][string] !== 'undefined') {
    newString = _translations.translatableStrings[lang][string];
  } else {
    // Fallback to English.
    newString = _translations.translatableStrings['en'][string];
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
/**
 * Translate page or single string.
 * @param {string} lang
 * @param {boolean|string} oneString
 */


function translate(lang) {
  var oneString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  // Translate all translatable strings unless one is specified.
  if (!oneString) {
    for (var string in _translations.translatableStrings[lang]) {
      translateString(lang, string);
    } // Translate a single string if it is passed in.

  } else {
    if (typeof oneString === 'string') {
      translateString(lang, oneString);
    }
  }
}
},{"./_translations.js":"js/_translations.js"}],"js/_formValidation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formIsValid = formIsValid;
exports.formError = formError;
exports.formEnable = formEnable;

var _config = require("./_config.js");

// import {translatableStrings} from './_translations.js';
function formIsValid(formSelector) {
  var form = document.querySelector(formSelector); // True on start.

  var allRequiredHaveValue = true; // If one required field has no input return false.

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = form.querySelectorAll('[required]')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var field = _step.value;

      // Currently only validate input fields of type 'text'.
      if (field.type === 'text') {
        allRequiredHaveValue = allRequiredHaveValue && field.value.length > 0;
      }
    } // Return 'true' is all fields have valid input.

  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return allRequiredHaveValue;
}
/**
 * Display a form error.
 * Currently only checking for input on name fields.
 * @param {boolean} clear
 */


function formError() {
  var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  if (error) {
    // Create new HTML element and text node for an error notice.
    var errorNode = document.createElement('div');
    var errorText = document.createTextNode(translatableStrings[_config.CONFIG.state.currentLanguage]['formError']); // Append error notice to the form.

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

function formEnable(formSelector) {
  var enable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var submitButton = document.querySelector(formSelector).querySelector('[type=submit]');

  if (enable) {
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.setAttribute('disabled', 'disabled');
  }
}
},{"./_config.js":"js/_config.js"}],"js/_cssClass.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.toggleClass = toggleClass;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
  return _typeof(cssClass) === 'object';
}
/**
 * Apply changes to HTML document.
 * @param {string|object} selector
 * @param {string|object} cssClass
 * @param {string} change
 */


function changeClass(selector, cssClass, change) {
  var selected = document.querySelectorAll(selector);
  var curSelected;
  var singleClass;

  var toRemove = function toRemove() {
    curSelected.setAttribute('class', curSelected.className.replace(singleClass, ''));
  };

  var toAdd = function toAdd() {
    var newClassName = curSelected.className + ' ' + singleClass;
    curSelected.setAttribute('class', newClassName);
  };

  var applyChange = function applyChange() {
    // Toggle class: remove if it exists; add if it does not.
    if (change === 'toggle') classExists(curSelected, singleClass) ? toRemove(singleClass) : toAdd(singleClass); // Remove class from selected element if it exists.

    if (change === 'remove' && classExists(curSelected, singleClass)) toRemove(singleClass); // Add class to selected element if it did not exist yet.

    if (change === 'add' && !classExists(curSelected, singleClass)) toAdd(singleClass);
  };

  var singleOrListClasses = function singleOrListClasses() {
    if (isSingleClass(cssClass)) {
      singleClass = cssClass;
      applyChange();
    } else if (isClassList(cssClass)) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = cssClass[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var c = _step.value;
          singleClass = cssClass[c];
          applyChange();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } else {
      throw 'Is not a valid CSS class or classLIst.';
    }
  }; // Loop over node list and then apply change on each element.


  var changeOnNodeList = function changeOnNodeList() {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = selected[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var s = _step2.value;
        curSelected = selected[s][0];
        singleOrListClasses();
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
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
},{}],"js/_userAccount.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logIn = logIn;

var _config = require("./_config.js");

var _cssClass = require("./_cssClass.js");

/**
 * Reset login.
 * @param {boolean} approved
 */
function logIn(approved) {
  var toAdd;
  var toRemove;

  if (approved) {
    _config.CONFIG.state.loggedIn = true;
    g.firstName = document.querySelector(_config.CONFIG.selectors.loginForm + ' #firstName').value;
    g.lastName = document.querySelector(_config.CONFIG.selectors.loginForm + ' #lastName').value;
    g.age = document.querySelector(_config.CONFIG.selectors.loginForm + ' #age').value; // Call method to display welcome message on page.
    // If user is older than 29 years old pass in true for formal language.

    g.HTMLGreeting('#toGreet', g.age > 29);
    toAdd = 'is-flipped';
    toRemove = 'is-flippable';
  } else {
    _config.CONFIG.state.loggedIn = false;
    toAdd = 'is-flippable';
    toRemove = 'is-flipped';
  }

  (0, _cssClass.addClass)(_config.CONFIG.selectors.card, toAdd);
  (0, _cssClass.removeClass)(_config.CONFIG.selectors.card, toRemove);
}
},{"./_config.js":"js/_config.js","./_cssClass.js":"js/_cssClass.js"}],"js/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;

var _config = require("./_config.js");

var _translateStrings = require("./_translateStrings.js");

var _formValidation = require("./_formValidation.js");

var _userAccount = require("./_userAccount.js");

var App = function App() {
  console.log(_config.CONFIG);
  console.log(_translateStrings.translate);

  (function (G$) {
    if (!G$) {
      throw 'Greetr library not found.';
    } // Instantiate Greetr object.


    window.g = G$('John', 'Wick', 'en');
    var nameInputSelectors = ['#firstName', '#lastName']; // Name input handling.

    var nameInput = function nameInput(event) {
      event.preventDefault();
      var showFormError = false; // Reset login on any input.

      (0, _userAccount.logIn)(false); // If form is valid enable its submission.

      if ((0, _formValidation.formIsValid)(_config.CONFIG.selectors.loginForm)) {
        (0, _formValidation.formEnable)(_config.CONFIG.selectors.loginForm);
      } else {
        showFormError = true;
        (0, _formValidation.formEnable)(_config.CONFIG.selectors.loginForm, false);
      } //  Only show error on input in last name field.


      event.target.id === 'lastName' && event.key !== 'Tab' ? (0, _formValidation.formError)(showFormError) : (0, _formValidation.formError)(false);
    }; // User uses language select field.


    document.querySelector('#langSelect').addEventListener('change', function (event) {
      event.preventDefault();

      if (event.target.value !== _config.CONFIG.state.currentLanguage) {
        // Update state with new language.
        _config.CONFIG.state.currentLanguage = event.target.value; // Set language in app.

        g.setLang(event.target.value); // Translate interface.

        (0, _translateStrings.translate)(event.target.value);
      }
    }); // User types something in a name field or it looses focus.

    for (var _i = 0; _i < nameInputSelectors.length; _i++) {
      var input = nameInputSelectors[_i];
      document.querySelector(input).addEventListener('keyup', function (event) {
        return nameInput(event);
      });
      document.querySelector(input).addEventListener('blur', function (event) {
        return nameInput(event);
      });
    } // User clicks the login button.


    document.querySelector('#login').addEventListener('click', function (event) {
      event.preventDefault();

      if ((0, _formValidation.formIsValid)(_config.CONFIG.selectors.loginForm)) {
        // Remove form error.
        (0, _formValidation.formError)(false);

        if (_config.CONFIG.state.loggedIn !== true) {
          (0, _userAccount.logIn)(true);
        } else {
          (0, _userAccount.logIn)(false);
        }
      } else {
        // Remove any existing welcome message.
        (0, _userAccount.logIn)(false); // Display error below form if there is none yet.

        if (!document.querySelector(_config.CONFIG.selectors.loginForm)) {
          (0, _formValidation.formError)();
        }
      }
    }); // User clicks the logout button.

    document.querySelector('#logout').addEventListener('click', function (event) {
      event.preventDefault();
      (0, _userAccount.logIn)(false);
    });
  })(Greetr);
};

exports.App = App;
},{"./_config.js":"js/_config.js","./_translateStrings.js":"js/_translateStrings.js","./_formValidation.js":"js/_formValidation.js","./_userAccount.js":"js/_userAccount.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _app = require("./js/app.js");

console.log('hello');
(0, _app.App)();
},{"./js/app.js":"js/app.js"}],"../../../../.nvm/versions/node/v9.11.1/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "42327" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../.nvm/versions/node/v9.11.1/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/javascript-the-weird-parts.e31bb0bc.map