/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./controller.js":
/*!***********************!*\
  !*** ./controller.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Controller; }
/* harmony export */ });
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gsap */ "../node_modules/gsap/index.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./player.js");
/* harmony import */ var _projectile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projectile */ "./projectile.js");
/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./particle */ "./particle.js");
/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./enemy */ "./enemy.js");
/* harmony import */ var _assets_dima_head_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/dima-head.png */ "./assets/dima-head.png");
/* harmony import */ var _assets_dima_head_left_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/dima-head-left.png */ "./assets/dima-head-left.png");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }









var Controller = /*#__PURE__*/function () {
  function Controller() {
    _classCallCheck(this, Controller);

    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.scoreEl = document.querySelector('#scoreEl');
    this.startGameBtn = document.querySelector('.modal__button');
    this.modal = document.querySelector('.modal');
    this.modalScore = document.querySelector('.modal__score');
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;
    this.player = new _player__WEBPACK_IMPORTED_MODULE_0__.default(this.x, this.y, 10, 'white');
    this.projectiles = [];
    this.enemies = [];
    this.particles = [];
    this.score = 0;
    this.animationId = null;
    this.img = new Image(10);
    this.img.src = _assets_dima_head_png__WEBPACK_IMPORTED_MODULE_4__.default;
    this.img.width = 100;
    this.angle = 0; // this.isReversed = false;
  }

  _createClass(Controller, [{
    key: "drawHead",
    value: function drawHead() {
      // this.img.onload = () => {
      this.ctx.drawImage(this.img, this.img.width / 2, this.img.width / 2, this.img.width, this.img.width); // };
    }
  }, {
    key: "headRotate",
    value: function headRotate() {
      // const angleDeg = (angle * 180) / Math.PI;
      // this.img.style.transform = `rotate(${angleDeg})`;
      // console.log(angleDeg);
      // this.drawHead();
      // Сохраняем настройки канваса до всяких манипуляций с ним
      this.ctx.save(); // console.log(this.angle);

      this.ctx.translate(this.x, this.y);

      if (Math.abs(this.angle) > Math.PI / 2) {
        this.img.src = _assets_dima_head_left_png__WEBPACK_IMPORTED_MODULE_5__.default; // this.ctx.scale(1, -1);
        // this.angle = -this.angle;
        // console.log('left');
      } else {
        // console.log('right');
        this.img.src = _assets_dima_head_png__WEBPACK_IMPORTED_MODULE_4__.default;
      } // Сдвигаем все адресованные пиксели на указанные значения
      // this.ctx.translate(canvas.width/2,canvas.height/2);
      // Поворачиваем на `degrees` наш градус


      this.ctx.rotate(this.angle); // Рисуем повернутую картинку

      this.ctx.drawImage(this.img, 0 - this.img.width / 2, 0 - this.img.width / 2, this.img.width, this.img.width); // Восстанавливаем настройки на момент когда делали `ctx.save`
      // то бишь до `ctx.translate` и `ctx.rotate`. Рисунок при этом сохраняется.

      this.ctx.restore();
    }
  }, {
    key: "init",
    value: function init() {
      this.player = new _player__WEBPACK_IMPORTED_MODULE_0__.default(this.x, this.y, 10, 'white');
      this.projectiles = [];
      this.enemies = [];
      this.particles = [];
      this.score = 0;
      this.scoreEl.innerHTML = this.score;
    }
  }, {
    key: "spawnEnemies",
    value: function spawnEnemies() {
      var _this = this;

      setInterval(function () {
        var radius = Math.random() * (30 - 4) + 4;
        var x;
        var y;

        if (Math.random() < 0.5) {
          x = Math.random() < 0.5 ? 0 - radius : _this.canvas.width + radius;
          y = Math.random() * _this.canvas.height;
        } else {
          x = Math.random() * _this.canvas.width;
          y = Math.random() < 0.5 ? 0 - radius : _this.canvas.height + radius;
        }

        var color = "hsl(".concat(Math.random() * 360, ", 50%, 50%)");
        var angle = Math.atan2(_this.canvas.height / 2 - y, _this.canvas.width / 2 - x);
        var velocity = {
          x: Math.cos(angle),
          y: Math.sin(angle)
        };

        _this.enemies.push(new _enemy__WEBPACK_IMPORTED_MODULE_3__.default(x, y, radius, color, velocity)); // console.log(this.enemies);

      }, 1000);
    }
  }, {
    key: "animate",
    value: function animate() {
      var _this2 = this;

      this.animationId = requestAnimationFrame(function () {
        return _this2.animate();
      });
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); // this.player.draw();

      this.headRotate();
      this.particles.forEach(function (particle, index) {
        if (particle.alpha <= 0) {
          _this2.particles.splice(index, 1);
        } else {
          particle.update();
        }
      });
      this.projectiles.forEach(function (projectile, index) {
        projectile.update(); // remove from edges from screen

        if (projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > _this2.canvas.width || projectile.y + projectile.radius < 0 || projectile.y - projectile.radius > _this2.canvas.height) {
          _this2.projectiles.splice(index, 1);
        }
      });
      this.enemies.forEach(function (enemy, index) {
        enemy.update(); // end game

        var dist = Math.hypot(_this2.player.x - enemy.x, _this2.player.y - enemy.y);

        if (dist - enemy.radius - _this2.player.radius < 1) {
          cancelAnimationFrame(_this2.animationId);

          _this2.modal.classList.remove('modal_hidden');

          _this2.modalScore.innerHTML = _this2.score;
        } // hit the enemy


        _this2.projectiles.forEach(function (projectile, projectileIndex) {
          var dist1 = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

          if (dist1 - enemy.radius - projectile.radius < 1) {
            // increase score
            _this2.score += 100;
            _this2.scoreEl.innerHTML = _this2.score; // create explosions

            for (var i = 0; i < enemy.radius * 2; i += 1) {
              _this2.particles.push(new _particle__WEBPACK_IMPORTED_MODULE_2__.default(projectile.x, projectile.y, Math.random() * 2, enemy.color, {
                x: (Math.random() - 0.5) * Math.random() * 8,
                y: (Math.random() - 0.5) * Math.random() * 8
              }));
            }

            if (enemy.radius - 10 > 10) {
              gsap__WEBPACK_IMPORTED_MODULE_6__.default.to(enemy, {
                radius: enemy.radius - 10
              });

              _this2.projectiles.splice(projectileIndex, 1);
            } else {
              _this2.enemies.splice(index, 1);

              _this2.projectiles.splice(projectileIndex, 1);
            }
          }
        });
      });
    }
  }, {
    key: "windowEventListen",
    value: function windowEventListen() {
      var _this3 = this;

      window.addEventListener('click', function (event) {
        _this3.angle = Math.atan2(event.clientY - _this3.canvas.height / 2, event.clientX - _this3.canvas.width / 2);
        var velocity = {
          x: Math.cos(_this3.angle) * 5,
          y: Math.sin(_this3.angle) * 5
        }; // console.log(projectiles)

        _this3.projectiles.push(new _projectile__WEBPACK_IMPORTED_MODULE_1__.default(_this3.canvas.width / 2, _this3.canvas.height / 2, 5, 'white', velocity));
      });
      window.addEventListener('mousemove', function (event) {
        _this3.angle = Math.atan2(event.clientY - _this3.canvas.height / 2, event.clientX - _this3.canvas.width / 2);

        _this3.headRotate(_this3.angle);
      });
    }
  }, {
    key: "startBtnEventListener",
    value: function startBtnEventListener() {
      var _this4 = this;

      this.startGameBtn.addEventListener('click', function () {
        _this4.init();

        _this4.animate();

        _this4.modal.classList.add('modal_hidden');
      });
    }
  }]);

  return Controller;
}();



/***/ }),

/***/ "./enemy.js":
/*!******************!*\
  !*** ./enemy.js ***!
  \******************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Enemy; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var Enemy = /*#__PURE__*/function () {
  function Enemy(x, y, radius, color, velocity) {
    _classCallCheck(this, Enemy);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  _createClass(Enemy, [{
    key: "draw",
    value: function draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }
  }]);

  return Enemy;
}();



/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/style.scss */ "./styles/style.scss");
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller */ "./controller.js");
 // import gsap from 'gsap';


var controller = new _controller__WEBPACK_IMPORTED_MODULE_1__.default();
controller.startBtnEventListener();
controller.spawnEnemies();
controller.windowEventListen(); // controller.drawHead();

/***/ }),

/***/ "./particle.js":
/*!*********************!*\
  !*** ./particle.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Particle; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var Particle = /*#__PURE__*/function () {
  function Particle(x, y, radius, color, velocity) {
    _classCallCheck(this, Particle);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
    this.friction = 0.99;
  }

  _createClass(Particle, [{
    key: "draw",
    value: function draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();
      this.velocity.x *= this.friction;
      this.velocity.y *= this.friction;
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.alpha -= 0.01; // console.log(this.alpha)
    }
  }]);

  return Particle;
}();



/***/ }),

/***/ "./player.js":
/*!*******************!*\
  !*** ./player.js ***!
  \*******************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Player; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var Player = /*#__PURE__*/function () {
  function Player(x, y, radius, color) {
    _classCallCheck(this, Player);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  _createClass(Player, [{
    key: "draw",
    value: function draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }]);

  return Player;
}();



/***/ }),

/***/ "./projectile.js":
/*!***********************!*\
  !*** ./projectile.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Projectile; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var Projectile = /*#__PURE__*/function () {
  function Projectile(x, y, radius, color, velocity) {
    _classCallCheck(this, Projectile);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  _createClass(Projectile, [{
    key: "draw",
    value: function draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }
  }]);

  return Projectile;
}();



/***/ }),

/***/ "./assets/dima-head-left.png":
/*!***********************************!*\
  !*** ./assets/dima-head-left.png ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "a89aa665da1489c324a7df7b751bec4a.png");

/***/ }),

/***/ "./assets/dima-head.png":
/*!******************************!*\
  !*** ./assets/dima-head.png ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "559820ee2cc479f7fdf7b157ef876a6d.png");

/***/ }),

/***/ "./styles/style.scss":
/*!***************************!*\
  !*** ./styles/style.scss ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = function() {}
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["../node_modules/@babel/polyfill/lib/index.js","vendors-node_modules_babel_polyfill_lib_index_js-node_modules_gsap_index_js"],
/******/ 			["./index.js","vendors-node_modules_babel_polyfill_lib_index_js-node_modules_gsap_index_js"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = function() {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			var executeModules = data[3];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = function() {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = function() {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (function() {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	return __webpack_require__.x();
/******/ })()
;
//# sourceMappingURL=main.js.map