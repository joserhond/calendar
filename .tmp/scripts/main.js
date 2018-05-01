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


var _calendar = __webpack_require__(1);

var _calendar2 = _interopRequireDefault(_calendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.getElementById("button").addEventListener("click", function (event) {
    event.preventDefault();
    (0, _calendar2.default)(document.getElementById("date").value, document.getElementById("days").value, document.getElementById("code").value);
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = calendar;
function calendar(date, number, code) {

	var date = new Date(date);
	var number = parseInt(number);

	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var days = ["S", "M", "T", "W", "T", "F", "S"];
	var holidays = [{ "code": "US", "holidays": [{ "name": "New Year Day", "date": "0/1" }, { "name": "Martin Luther King, Jr. Day", "date": "0/15" }, { "name": "George Washington’s Birthday", "date": "1/19" }, { "name": "Memorial Day", "date": "4/28" }, { "name": "Independence Day", "date": "6/28" }, { "name": "Labor Day", "date": "8/3" }, { "name": "Columbus Day", "date": "9/8" }, { "name": "Veterans Day", "date": "10/12" }, { "name": "Thanksgiving Day", "date": "10/22" }, { "name": "Christmas Day", "date": "11/25" }] }, { "code": "EC", "holidays": [{ "name": "New Year Day", "date": "0/1" }, { "name": "Carnival", "date": "1/12" }, { "name": "Carnival", "date": "1/13" }, { "name": "Good Friday", "date": "2/30" }, { "name": "Easter Day", "date": "3/1" }, { "name": "Labour Day", "date": "4/1" }, { "name": "Battle of Pichincha", "date": "4/24" }, { "name": "Independence Day", "date": "7/10" }, { "name": "Independence of Guayaquil", "date": "9/9" }, { "name": "All Souls Day", "date": "10/2" }, { "name": "Independence of Cuenca", "date": "10/3" }, { "name": "Foundation of Quito", "date": "11/6" }, { "name": "Christmas Day", "date": "11/25" }] }];
	var year = date.getFullYear();
	var month = date.getMonth();
	var dayOfMonth = date.getDate();
	var dayOfWeek = date.getDay();
	var country = getCountryByCode(holidays, code);

	if (date == "Invalid Date" || number <= 0) {
		document.getElementById("calendar").innerHTML = '<p class="invalid-data">Invalid Data</p>';
	} else {
		document.getElementById("calendar").innerHTML = buildCalendar();
	}

	function buildCalendar() {
		var result = "";
		var i = 1;
		var iDay = 1;
		var newDate = new Date(date);
		var positionDay = 0;

		result += setMonth(months[month], year);

		while (i <= number) {
			if (iDay % 7 <= 1) {
				var classDay = "weekend";
			} else {
				var classDay = "week-day";
			}

			if (positionDay >= dayOfWeek) {
				result += '<span class="day ' + classDay;

				if (country.length > 0) {
					var search = month + "/" + dayOfMonth;
					var holiday = getHoliday(country[0].holidays, search);
					result += holiday.length > 0 ? ' holiday' : '';
				}

				result += '">' + dayOfMonth + '</span>';

				i++;
				date.setDate(date.getDate() + 1);
				if (month != date.getMonth() && positionDay % 7 != 0) {
					positionDay++;
					result += fillDisabled(positionDay);
				}
			} else {
				result += '<span class="day disabled-day"> </span>';
			}

			dayOfWeek = date.getDay();
			dayOfMonth = date.getDate();
			positionDay++;

			if (month != date.getMonth()) {
				month = date.getMonth();
				year = date.getFullYear();
				result += setMonth(months[month], year);
				iDay = 0;
				positionDay = 0;
			}

			iDay++;
		}

		if (positionDay % 7 != 0) {
			result += fillDisabled(positionDay);
		}

		return result;
	}

	function setMonth(month, year) {
		var header = '<header><span class="month-header">' + month + ' ' + year + '</span></header>';
		header = header + '<div class="days-line"><span class="day-header">S</span><span class="day-header">M</span><span class="day-header">T</span><span class="day-header">W</span><span class="day-header">T</span><span class="day-header">F</span><span class="day-header">S</span></div>';
		return header;
	}

	function getCountryByCode(data, code) {
		return data.filter(function (data) {
			return data.code == code;
		});
	}

	function getHoliday(data, date) {
		return data.filter(function (data) {
			return data.date == date;
		});
	}

	function fillDisabled(pos) {
		var disabled = "";
		while (pos % 7 != 0) {
			disabled += '<span class="day disabled-day"> </span>';
			pos++;
		}
		return disabled;
	}
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTJmMGU1NWZiZjk3YjhmZDkyN2UiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL2pzL2NhbGVuZGFyLmpzIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInZhbHVlIiwiY2FsZW5kYXIiLCJkYXRlIiwibnVtYmVyIiwiY29kZSIsIkRhdGUiLCJwYXJzZUludCIsIm1vbnRocyIsImRheXMiLCJob2xpZGF5cyIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXlPZk1vbnRoIiwiZ2V0RGF0ZSIsImRheU9mV2VlayIsImdldERheSIsImNvdW50cnkiLCJnZXRDb3VudHJ5QnlDb2RlIiwiaW5uZXJIVE1MIiwiYnVpbGRDYWxlbmRhciIsInJlc3VsdCIsImkiLCJpRGF5IiwibmV3RGF0ZSIsInBvc2l0aW9uRGF5Iiwic2V0TW9udGgiLCJjbGFzc0RheSIsImxlbmd0aCIsInNlYXJjaCIsImhvbGlkYXkiLCJnZXRIb2xpZGF5Iiwic2V0RGF0ZSIsImZpbGxEaXNhYmxlZCIsImhlYWRlciIsImRhdGEiLCJmaWx0ZXIiLCJwb3MiLCJkaXNhYmxlZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FB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SUFBMUIsRUFBZ0NoQyxJQUFoQyxFQUFzQztBQUNwQyxTQUFPZ0MsS0FBS0MsTUFBTCxDQUNKLFVBQVNELElBQVQsRUFBYztBQUFFLFVBQU9BLEtBQUtoQyxJQUFMLElBQWFBLElBQXBCO0FBQTBCLEdBRHRDLENBQVA7QUFHRDs7QUFFRCxVQUFTNEIsVUFBVCxDQUFvQkksSUFBcEIsRUFBMEJsQyxJQUExQixFQUFnQztBQUM5QixTQUFPa0MsS0FBS0MsTUFBTCxDQUNKLFVBQVNELElBQVQsRUFBYztBQUFFLFVBQU9BLEtBQUtsQyxJQUFMLElBQWFBLElBQXBCO0FBQTBCLEdBRHRDLENBQVA7QUFHRDs7QUFFRCxVQUFTZ0MsWUFBVCxDQUFzQkksR0FBdEIsRUFBMEI7QUFDekIsTUFBSUMsV0FBVyxFQUFmO0FBQ0EsU0FBTUQsTUFBSSxDQUFKLElBQU8sQ0FBYixFQUFlO0FBQ2RDLGVBQVcseUNBQVg7QUFDQUQ7QUFDQTtBQUNELFNBQU9DLFFBQVA7QUFDQTtBQUNELEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDEyZjBlNTVmYmY5N2I4ZmQ5MjdlIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgY2FsZW5kYXIgZnJvbSAnLi9jYWxlbmRhci5qcyc7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY2FsZW5kYXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRlXCIpLnZhbHVlLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRheXNcIikudmFsdWUsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29kZVwiKS52YWx1ZSk7XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FwcC5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNhbGVuZGFyKGRhdGUsIG51bWJlciwgY29kZSl7XG5cdFxuXHR2YXIgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuXHR2YXIgbnVtYmVyID0gcGFyc2VJbnQobnVtYmVyKTtcblxuXHR2YXIgbW9udGhzID0gW1wiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIl1cblx0dmFyIGRheXMgPSBbXCJTXCIsIFwiTVwiLCBcIlRcIiwgXCJXXCIsIFwiVFwiLCBcIkZcIiwgXCJTXCJdO1xuXHR2YXIgaG9saWRheXMgPSBbXG5cdFx0e1wiY29kZVwiOlwiVVNcIixcImhvbGlkYXlzXCI6W3tcIm5hbWVcIjpcIk5ldyBZZWFyIERheVwiLFwiZGF0ZVwiOlwiMC8xXCJ9LHtcIm5hbWVcIjpcIk1hcnRpbiBMdXRoZXIgS2luZywgSnIuIERheVwiLFwiZGF0ZVwiOlwiMC8xNVwifSx7XCJuYW1lXCI6XCJHZW9yZ2UgV2FzaGluZ3RvbuKAmXMgQmlydGhkYXlcIixcImRhdGVcIjpcIjEvMTlcIn0se1wibmFtZVwiOlwiTWVtb3JpYWwgRGF5XCIsXCJkYXRlXCI6XCI0LzI4XCJ9LHtcIm5hbWVcIjpcIkluZGVwZW5kZW5jZSBEYXlcIixcImRhdGVcIjpcIjYvMjhcIn0se1wibmFtZVwiOlwiTGFib3IgRGF5XCIsXCJkYXRlXCI6XCI4LzNcIn0se1wibmFtZVwiOlwiQ29sdW1idXMgRGF5XCIsXCJkYXRlXCI6XCI5LzhcIn0se1wibmFtZVwiOlwiVmV0ZXJhbnMgRGF5XCIsXCJkYXRlXCI6XCIxMC8xMlwifSx7XCJuYW1lXCI6XCJUaGFua3NnaXZpbmcgRGF5XCIsXCJkYXRlXCI6XCIxMC8yMlwifSx7XCJuYW1lXCI6XCJDaHJpc3RtYXMgRGF5XCIsXCJkYXRlXCI6XCIxMS8yNVwifV19LFxuXHRcdHtcImNvZGVcIjpcIkVDXCIsXCJob2xpZGF5c1wiOlt7XCJuYW1lXCI6XCJOZXcgWWVhciBEYXlcIixcImRhdGVcIjpcIjAvMVwifSx7XCJuYW1lXCI6XCJDYXJuaXZhbFwiLFwiZGF0ZVwiOlwiMS8xMlwifSx7XCJuYW1lXCI6XCJDYXJuaXZhbFwiLFwiZGF0ZVwiOlwiMS8xM1wifSx7XCJuYW1lXCI6XCJHb29kIEZyaWRheVwiLFwiZGF0ZVwiOlwiMi8zMFwifSx7XCJuYW1lXCI6XCJFYXN0ZXIgRGF5XCIsXCJkYXRlXCI6XCIzLzFcIn0se1wibmFtZVwiOlwiTGFib3VyIERheVwiLFwiZGF0ZVwiOlwiNC8xXCJ9LHtcIm5hbWVcIjpcIkJhdHRsZSBvZiBQaWNoaW5jaGFcIixcImRhdGVcIjpcIjQvMjRcIn0se1wibmFtZVwiOlwiSW5kZXBlbmRlbmNlIERheVwiLFwiZGF0ZVwiOlwiNy8xMFwifSx7XCJuYW1lXCI6XCJJbmRlcGVuZGVuY2Ugb2YgR3VheWFxdWlsXCIsXCJkYXRlXCI6XCI5LzlcIn0se1wibmFtZVwiOlwiQWxsIFNvdWxzIERheVwiLFwiZGF0ZVwiOlwiMTAvMlwifSx7XCJuYW1lXCI6XCJJbmRlcGVuZGVuY2Ugb2YgQ3VlbmNhXCIsXCJkYXRlXCI6XCIxMC8zXCJ9LHtcIm5hbWVcIjpcIkZvdW5kYXRpb24gb2YgUXVpdG9cIixcImRhdGVcIjpcIjExLzZcIn0se1wibmFtZVwiOlwiQ2hyaXN0bWFzIERheVwiLFwiZGF0ZVwiOlwiMTEvMjVcIn1dfVxuXHRdO1xuXHR2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcblx0dmFyIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpO1xuXHR2YXIgZGF5T2ZNb250aCA9IGRhdGUuZ2V0RGF0ZSgpO1xuXHR2YXIgZGF5T2ZXZWVrID0gZGF0ZS5nZXREYXkoKTtcblx0dmFyIGNvdW50cnkgPSBnZXRDb3VudHJ5QnlDb2RlKGhvbGlkYXlzLGNvZGUpO1xuXG5cdGlmKGRhdGUgPT0gXCJJbnZhbGlkIERhdGVcIiB8fCBudW1iZXIgPD0wKXtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbGVuZGFyXCIpLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImludmFsaWQtZGF0YVwiPkludmFsaWQgRGF0YTwvcD4nO1xuXHR9XG5cdGVsc2V7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYWxlbmRhclwiKS5pbm5lckhUTUwgPSBidWlsZENhbGVuZGFyKCk7XG5cdH1cblx0XG5cdGZ1bmN0aW9uIGJ1aWxkQ2FsZW5kYXIoKSB7XG5cdFx0dmFyIHJlc3VsdCA9IFwiXCI7XG5cdFx0dmFyIGkgPSAxO1xuXHRcdHZhciBpRGF5ID0gMTtcblx0XHR2YXIgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuXHRcdHZhciBwb3NpdGlvbkRheSA9IDA7XG5cblx0XHRyZXN1bHQrPSBzZXRNb250aChtb250aHNbbW9udGhdLHllYXIpO1xuXG5cdFx0d2hpbGUoaTw9bnVtYmVyKXtcblx0XHRcdGlmKGlEYXklNyA8PSAxKXtcblx0XHRcdFx0dmFyIGNsYXNzRGF5ID0gXCJ3ZWVrZW5kXCI7XG5cdFx0XHR9XG5cdFx0XHRlbHNle1xuXHRcdFx0XHR2YXIgY2xhc3NEYXkgPSBcIndlZWstZGF5XCI7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHBvc2l0aW9uRGF5ID49IGRheU9mV2Vlayl7XG5cdFx0XHRcdHJlc3VsdCs9ICc8c3BhbiBjbGFzcz1cImRheSAnKyBjbGFzc0RheTtcblxuXHRcdFx0XHRpZihjb3VudHJ5Lmxlbmd0aD4wKXtcblx0XHRcdFx0XHR2YXIgc2VhcmNoID0gbW9udGgrXCIvXCIrZGF5T2ZNb250aDtcblx0XHRcdFx0XHR2YXIgaG9saWRheSA9IGdldEhvbGlkYXkoY291bnRyeVswXS5ob2xpZGF5cyxzZWFyY2gpO1xuXHRcdFx0XHRcdHJlc3VsdCs9IGhvbGlkYXkubGVuZ3RoPjAgPyAnIGhvbGlkYXknOiAnJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlc3VsdCs9ICdcIj4nKyBkYXlPZk1vbnRoICsgJzwvc3Bhbj4nO1xuXG5cdFx0XHRcdGkrKztcblx0XHRcdFx0ZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgMSk7XG5cdFx0XHRcdGlmKG1vbnRoICE9IGRhdGUuZ2V0TW9udGgoKSAmJiBwb3NpdGlvbkRheSU3IT0wKXtcblx0XHRcdFx0XHRwb3NpdGlvbkRheSsrO1xuXHRcdFx0XHRcdHJlc3VsdCs9IGZpbGxEaXNhYmxlZChwb3NpdGlvbkRheSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdHJlc3VsdCs9ICc8c3BhbiBjbGFzcz1cImRheSBkaXNhYmxlZC1kYXlcIj4gPC9zcGFuPic7XHRcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0ZGF5T2ZXZWVrID0gZGF0ZS5nZXREYXkoKTtcblx0XHRcdGRheU9mTW9udGggPSBkYXRlLmdldERhdGUoKTtcblx0XHRcdHBvc2l0aW9uRGF5Kys7XG5cblx0XHRcdGlmKG1vbnRoICE9IGRhdGUuZ2V0TW9udGgoKSl7XG5cdFx0XHRcdG1vbnRoID0gZGF0ZS5nZXRNb250aCgpO1xuXHRcdFx0XHR5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXHRcdFx0XHRyZXN1bHQrPSBzZXRNb250aChtb250aHNbbW9udGhdLHllYXIpO1xuXHRcdFx0XHRpRGF5ID0gMDtcblx0XHRcdFx0cG9zaXRpb25EYXkgPSAwO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRpRGF5Kys7XG5cdFx0fVxuXG5cdFx0aWYocG9zaXRpb25EYXklNyE9MCl7XG5cdFx0XHRyZXN1bHQrPSBmaWxsRGlzYWJsZWQocG9zaXRpb25EYXkpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0gXG5cblx0ZnVuY3Rpb24gc2V0TW9udGgobW9udGgsIHllYXIpe1xuXHRcdHZhciBoZWFkZXIgPSAnPGhlYWRlcj48c3BhbiBjbGFzcz1cIm1vbnRoLWhlYWRlclwiPicrIG1vbnRoICsnICcrIHllYXIgKyc8L3NwYW4+PC9oZWFkZXI+Jztcblx0XHRoZWFkZXIgPSBoZWFkZXIgKyAnPGRpdiBjbGFzcz1cImRheXMtbGluZVwiPjxzcGFuIGNsYXNzPVwiZGF5LWhlYWRlclwiPlM8L3NwYW4+PHNwYW4gY2xhc3M9XCJkYXktaGVhZGVyXCI+TTwvc3Bhbj48c3BhbiBjbGFzcz1cImRheS1oZWFkZXJcIj5UPC9zcGFuPjxzcGFuIGNsYXNzPVwiZGF5LWhlYWRlclwiPlc8L3NwYW4+PHNwYW4gY2xhc3M9XCJkYXktaGVhZGVyXCI+VDwvc3Bhbj48c3BhbiBjbGFzcz1cImRheS1oZWFkZXJcIj5GPC9zcGFuPjxzcGFuIGNsYXNzPVwiZGF5LWhlYWRlclwiPlM8L3NwYW4+PC9kaXY+Jztcblx0XHRyZXR1cm4gaGVhZGVyO1xuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0Q291bnRyeUJ5Q29kZShkYXRhLCBjb2RlKSB7XG5cdCAgcmV0dXJuIGRhdGEuZmlsdGVyKFxuICAgICAgZnVuY3Rpb24oZGF0YSl7IHJldHVybiBkYXRhLmNvZGUgPT0gY29kZSB9XG5cdCAgKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGdldEhvbGlkYXkoZGF0YSwgZGF0ZSkge1xuXHQgIHJldHVybiBkYXRhLmZpbHRlcihcbiAgICAgIGZ1bmN0aW9uKGRhdGEpeyByZXR1cm4gZGF0YS5kYXRlID09IGRhdGUgfVxuXHQgICk7XG5cdH1cblxuXHRmdW5jdGlvbiBmaWxsRGlzYWJsZWQocG9zKXtcblx0XHR2YXIgZGlzYWJsZWQgPSBcIlwiO1xuXHRcdHdoaWxlKHBvcyU3IT0wKXtcblx0XHRcdGRpc2FibGVkKz0gJzxzcGFuIGNsYXNzPVwiZGF5IGRpc2FibGVkLWRheVwiPiA8L3NwYW4+JztcdFxuXHRcdFx0cG9zKys7XG5cdFx0fVxuXHRcdHJldHVybiBkaXNhYmxlZDtcblx0fVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jYWxlbmRhci5qcyJdLCJzb3VyY2VSb290IjoiIn0=