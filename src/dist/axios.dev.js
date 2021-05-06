"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _history = _interopRequireDefault(require("./history"));

var _store = _interopRequireDefault(require("./store"));

var _auth = require("./redux/Auth/auth.action");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_axios["default"].defaults.baseURL = ' http://localhost:4000';
/**
 * Injecting token to axios instance
 */

_axios["default"].interceptors.request.use(function (config) {
  var token = null;
  var jwtToken = window.localStorage.getItem('jwtToken');
  console.log(jwtToken);

  if (jwtToken) {
    token = jwtToken;
    config.headers.Authorization = "Bearer ".concat(token);
  } else {
    config.headers.Authorization = null; //history.push("/signup");
  }

  return config;
});

_axios["default"].interceptors.response.use(function (response) {
  return response;
}, function (error) {
  var status = null;

  if (error.response) {
    if (error.response.status) {
      status = error.response.status;
    }
  }

  if (401 === status) {
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('user');

    _store["default"].dispatch((0, _auth.userLogoutAttempt)());
  } else {
    return Promise.reject(error);
  }
});

var _default = _axios["default"];
exports["default"] = _default;