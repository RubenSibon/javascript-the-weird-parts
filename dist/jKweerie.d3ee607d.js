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
})({"js/lib/jKweerie.js":[function(require,module,exports) {
var global = arguments[3];
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global) {
  /**
   * jKweerie constructor function.
   */
  var jKweerie = function jKweerie() {
    return new jKweerie.init();
  }; // Store an action.


  var change = '';
  /**
   * Methods of jKweerie.
   */

  jKweerie.prototype = {
    /**
     * Check if class exists on HTML element.
     * @param {string|object} el
     * @param {string|object} cssClass
     */
    classExists: function classExists(el, cssClass) {
      return el.className.indexOf(cssClass) > 0;
    },

    /**
     * Check if there is a single class (string).
     * @param {string|object} selector
     * @param {string|object} cssClass
     */
    isSingleClass: function isSingleClass(cssClass) {
      return typeof cssClass === 'string';
    },

    /**
     * Check if there is a list of class names (object).
     * @param {string|object} selector
     * @param {string|object} cssClass
     */
    isClassList: function isClassList(cssClass) {
      return _typeof(cssClass) === 'object';
    },
    toRemove: function toRemove(curSelected, singleClass) {
      curSelected.setAttribute('class', curSelected.className.replace(singleClass, ''));
    },
    toAdd: function toAdd(curSelected, singleClass) {
      var newClassName = curSelected.className + ' ' + singleClass;
      curSelected.setAttribute('class', newClassName);
    },
    applyChange: function applyChange(curSelected, singleClass) {
      // Toggle class: remove if it exists; add if it does not.
      if (this.change === 'toggle') this.classExists(curSelected, singleClass) ? this.toRemove(curSelected, singleClass) : this.toAdd(curSelected, singleClass); // Remove class from selected element if it exists.

      if (this.change === 'remove' && this.classExists(curSelected, singleClass)) this.toRemove(curSelected, singleClass); // Add class to selected element if it did not exist yet.

      if (this.change === 'add' && !this.classExists(curSelected, singleClass)) this.toAdd(curSelected, singleClass);
    },
    singleOrListClasses: function singleOrListClasses(curSelected, cssClass) {
      if (this.isSingleClass(cssClass)) {
        this.applyChange(curSelected, cssClass);
      } else if (this.isClassList(cssClass)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = cssClass[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var c = _step.value;
            this.applyChange(curSelected, cssClass[c]);
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
        throw 'Is not a valid CSS class or classList.';
      }
    },
    // Loop over node list and then apply change on each element.
    getUniqueElement: function getUniqueElement(selector, cssClass) {
      var selected = document.querySelectorAll(selector);

      if (selected.length === 1) {
        this.singleOrListClasses(selected[0], cssClass);
      } else if (selected.length > 1) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = selected[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var s = _step2.value;
            this.singleOrListClasses(selected[s][0], cssClass);
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
      } else {
        throw 'No valid selector.';
      }
    },

    /**
     * Add a class to an HTML element.
     * @param {string|object} selector
     * @param {string|object} cssClass
     */
    addClass: function addClass(selector, cssClass) {
      this.change = 'add';
      this.getUniqueElement(selector, cssClass);
      return this;
    },

    /**
     * Remove a class from an HTML element.
     * @param {string|object} selector
     * @param {string|object} cssClass
     */
    removeClass: function removeClass(selector, cssClass) {
      this.change = 'remove';
      this.getUniqueElement(selector, cssClass);
      return this;
    },

    /**
     * Toggle a class on an HTML element.
     * @param {string|object} selector
     * @param {string|object} cssClass
     */
    toggleClass: function toggleClass(selector, cssClass) {
      this.change = 'toggle';
      this.getUniqueElement(selector, cssClass);
      return this;
    }
  };
  /**
   * Init function to instantiate prototype (class),
   * i.e. the actual object is created here.
   */

  jKweerie.init = function () {
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
},{}]},{},["../../../../.nvm/versions/node/v9.11.1/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/lib/jKweerie.js"], null)
//# sourceMappingURL=/jKweerie.d3ee607d.map