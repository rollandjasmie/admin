"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _history = require("history");

var history = (0, _history.createBrowserHistory)({
  forceRefresh: true
});
var _default = history;
exports["default"] = _default;