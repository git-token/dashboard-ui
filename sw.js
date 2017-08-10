var serviceWorkerOption = {
  "assets": [
    "/gittoken-dashboard.dist.js"
  ]
};
        
        /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var serviceWorkerOption = {
  "assets": ["/gittoken-dashboard.dist.js"]
};

/******/(function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/var installedModules = {};
  /******/
  /******/ // The require function
  /******/function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/if (installedModules[moduleId]) {
      /******/return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/var module = installedModules[moduleId] = {
      /******/i: moduleId,
      /******/l: false,
      /******/exports: {}
      /******/ };
    /******/
    /******/ // Execute the module function
    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Flag the module as loaded
    /******/module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/__webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/__webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/__webpack_require__.d = function (exports, name, getter) {
    /******/if (!__webpack_require__.o(exports, name)) {
      /******/Object.defineProperty(exports, name, {
        /******/configurable: false,
        /******/enumerable: true,
        /******/get: getter
        /******/ });
      /******/
    }
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/__webpack_require__.n = function (module) {
    /******/var getter = module && module.__esModule ?
    /******/function getDefault() {
      return module['default'];
    } :
    /******/function getModuleExports() {
      return module;
    };
    /******/__webpack_require__.d(getter, 'a', getter);
    /******/return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/__webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/__webpack_require__.p = "";
  /******/
  /******/ // Load entry module and return exports
  /******/return __webpack_require__(__webpack_require__.s = 0);
  /******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

  "use strict";
  /* WEBPACK VAR INJECTION */
  (function (global) {

    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }return arr2;
      } else {
        return Array.from(arr);
      }
    }

    //  weak
    /* eslint-disable no-console */

    var DEBUG = false;

    // When the user navigates to your site,
    // the browser tries to redownload the script file that defined the service
    // worker in the background.
    // If there is even a byte's difference in the service worker file compared
    // to what it currently has, it considers it 'new'.
    var assets = global.serviceWorkerOption.assets;

    var CACHE_NAME = new Date().toISOString();

    var assetsToCache = [].concat(_toConsumableArray(assets), ['./']);

    assetsToCache = assetsToCache.map(function (path) {
      return new URL(path, global.location).toString();
    });

    // When the service worker is first added to a computer.
    self.addEventListener('install', function (event) {
      // Perform install steps.
      if (DEBUG) {
        console.log('[SW] Install event');
      }

      // Add core website files to cache during serviceworker installation.
      event.waitUntil(global.caches.open(CACHE_NAME).then(function (cache) {
        return cache.addAll(assetsToCache);
      }).then(function () {
        if (DEBUG) {
          console.log('Cached assets: main', assetsToCache);
        }
      }).catch(function (error) {
        console.error(error);
        throw error;
      }));
    });

    // After the install event.
    self.addEventListener('activate', function (event) {
      if (DEBUG) {
        console.log('[SW] Activate event');
      }

      // Clean the caches
      event.waitUntil(global.caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.map(function (cacheName) {
          // Delete the caches that are not the current one.
          if (cacheName.indexOf(CACHE_NAME) === 0) {
            return null;
          }

          return global.caches.delete(cacheName);
        }));
      }));
    });

    self.addEventListener('message', function (event) {
      switch (event.data.action) {
        case 'skipWaiting':
          if (self.skipWaiting) {
            self.skipWaiting();
            self.clients.claim();
          }
          break;
        default:
          break;
      }
    });

    self.addEventListener('fetch', function (event) {
      var request = event.request;

      // Ignore not GET request.
      if (request.method !== 'GET') {
        if (DEBUG) {
          console.log('[SW] Ignore non GET request ' + request.method);
        }
        return;
      }

      var requestUrl = new URL(request.url);

      // Ignore difference origin.
      if (requestUrl.origin !== location.origin) {
        if (DEBUG) {
          console.log('[SW] Ignore difference origin ' + requestUrl.origin);
        }
        return;
      }

      var resource = global.caches.match(request).then(function (response) {
        if (response) {
          if (DEBUG) {
            console.log('[SW] fetch URL ' + requestUrl.href + ' from cache');
          }

          return response;
        }

        // Load and cache known assets.
        return fetch(request).then(function (responseNetwork) {
          if (!responseNetwork || !responseNetwork.ok) {
            if (DEBUG) {
              console.log('[SW] URL [' + requestUrl.toString() + '] wrong responseNetwork: ' + responseNetwork.status + ' ' + responseNetwork.type);
            }

            return responseNetwork;
          }

          if (DEBUG) {
            console.log('[SW] URL ' + requestUrl.href + ' fetched');
          }

          var responseCache = responseNetwork.clone();

          global.caches.open(CACHE_NAME).then(function (cache) {
            return cache.put(request, responseCache);
          }).then(function () {
            if (DEBUG) {
              console.log('[SW] Cache asset: ' + requestUrl.href);
            }
          });

          return responseNetwork;
        }).catch(function () {
          // User is landing on our page.
          if (event.request.mode === 'navigate') {
            return global.caches.match('./');
          }

          return null;
        });
      });

      event.respondWith(resource);
    });
    /* WEBPACK VAR INJECTION */
  }).call(exports, __webpack_require__(1));

  /***/
},
/* 1 */
/***/function (module, exports) {

  var g;

  // This works in non-strict mode
  g = function () {
    return this;
  }();

  try {
    // This works if eval is allowed (see CSP)
    g = g || Function("return this")() || (1, eval)("this");
  } catch (e) {
    // This works if the window reference is available
    if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
  }

  // g can still be undefined, but nothing to do about it...
  // We return undefined, instead of nothing here, so it's
  // easier to handle this case. if(!global) { ...}

  module.exports = g;

  /***/
}]
/******/);
//# sourceMappingURL=sw.js.map

/***/ })
/******/ ]);
//# sourceMappingURL=sw.js.map