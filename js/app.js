'use strict';

import calendar from './calendar.js';

document.getElementById("button").addEventListener("click", function(event) {
    event.preventDefault();
    calendar(document.getElementById("date").value, document.getElementById("days").value, document.getElementById("code").value);
});
