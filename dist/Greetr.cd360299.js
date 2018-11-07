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
})({"js/lib/Greetr.js":[function(require,module,exports) {
var global = arguments[3];
// If jQuery does not exist make it an empty object.
if (!jQuery) {
  var jQuery = {};
}

(function (global, $) {
  /**
   * Greetr constructor function.
   * @constructor
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} language
   */
  var Greetr = function Greetr(firstName, lastName, language, age) {
    return new Greetr.init(firstName, lastName, language, age);
  };
  /** Supported languages. */


  var supportedLangs = ['en', 'es', 'nl'];
  /** Whether language is formal or not. */

  var formalLanguage = false;
  /** Default informal greetings. */

  var greetings = {
    en: 'Hello',
    es: 'Hola',
    nl: 'Hallo'
  };
  /** Default formal greetings. */

  var _formalGreeting = {
    en: 'Greetings',
    es: 'Saludos',
    nl: 'Gegroet'
  };
  /** Logged in messages. */

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
    fullName: function fullName() {
      return this.firstName + ' ' + this.lastName;
    },

    /**
     * Validate if a language is supported.
     */
    validate: function validate() {
      if (supportedLangs.indexOf(this.language) === -1) {
        throw 'Invalid language.';
      }
    },

    /**
     * Informally greet (default).
     */
    greeting: function greeting() {
      return greetings[this.language] + ' ' + this.firstName + '!';
    },

    /**
     * Formally greet (set `formal` to `true`).
     */
    formalGreeting: function formalGreeting() {
      return _formalGreeting[this.language] + ', ' + this.fullName() + '.';
    },

    /**
     * Greet method. Call either formal or informal greeting methods.
     * @param {boolean} formal
     */
    greet: function greet(formal) {
      var msg; // Decide whether to call formal or informal greeting.

      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      if (console) {
        this.log();
      } // Make method chainable.


      return this, msg;
    },

    /**
     * Log fullname to console.
     */
    log: function log(msg) {
      if (console) {
        if (msg) {
          console.log(msg);
        } else {
          console.log(logMessages[this.language] + ': ' + this.fullName());
        }
      } // Make method chainable.


      return this;
    },

    /**
     * Set language that greeting should be returned in.
     * @param {string} lang
     */
    setLang: function setLang(lang) {
      this.language = lang;
      this.validate(); // Make method chainable.

      return this;
    },

    /**
     * Set language to formal or informal.
     * @param {string} lang
     */
    setFormal: function setFormal(formal) {
      if (formal.toString() === 'undefined' || formal.toString() === 'true') {
        this.isFormal = true;
      } else {
        this.isFormal = false;
      } // Make method chainable.


      return this;
    },

    /**
     * Insert greeting in HTML.
     * @param {string} selector
     * @param {boolean} formal
     */
    HTMLGreeting: function HTMLGreeting(selector, formal) {
      var htmlMsg;
      var selected;

      if (!$) {// throw 'jQuery not found.';
      }

      if (!selector) {
        throw 'Missing selector';
      }

      formalLanguage = this.setFormal(formal).isFormal;
      htmlMsg = this.greet(formalLanguage);

      selected = function () {
        try {
          return document.querySelectorAll(selector);
        } catch (error) {
          console.error(error);
          return document.querySelector(selector);
        }
      }(); // Insert HTML for unique element or a collection of elements.


      if (selected.length === 1) {
        selected[0].innerHTML = htmlMsg;
      } else {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = selected[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var element = _step.value;
            element[0].innerHTML = htmlMsg;
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
      } // Make method chainable.


      return this;
    }
  };
  /**
   * Init function to instantiate prototype (class),
   * i.e. the actual object is created here.
   */

  Greetr.init = function (firstName, lastName, language, age) {
    // Use self instead of `this` to avoid confusion with setting stuff on the function constructor.
    var self = this;
    self.firstName = firstName || '';
    self.lastName = lastName || '';
    self.language = language || 'en';
    self.age = age || NaN;
    self.validate();
  };
  /**
   * Make Greetr.init refer to the prototype of the function constructor.
   * This way we do not have to use the `new` keyword.
   */


  Greetr.init.prototype = Greetr.prototype;
  /**
   * Attach Greetr to the global object (i.e. "window")
   * and provide a shorthand `$G` to access it.
   */

  global.Greetr = global.G$ = Greetr;
})(window, jQuery);
},{}],"../../../../.nvm/versions/node/v9.11.1/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "39929" + '/');

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
},{}]},{},["../../../../.nvm/versions/node/v9.11.1/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/lib/Greetr.js"], null)
//# sourceMappingURL=/Greetr.cd360299.map