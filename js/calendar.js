export default function calendar(date, number, code){
	
	var date = new Date(date);
	var number = parseInt(number);

	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	var days = ["S", "M", "T", "W", "T", "F", "S"];
	var holidays = [
		{"code":"US","holidays":[{"name":"New Year Day","date":"0/1"},{"name":"Martin Luther King, Jr. Day","date":"0/15"},{"name":"George Washington’s Birthday","date":"1/19"},{"name":"Memorial Day","date":"4/28"},{"name":"Independence Day","date":"6/28"},{"name":"Labor Day","date":"8/3"},{"name":"Columbus Day","date":"9/8"},{"name":"Veterans Day","date":"10/12"},{"name":"Thanksgiving Day","date":"10/22"},{"name":"Christmas Day","date":"11/25"}]},
		{"code":"EC","holidays":[{"name":"New Year Day","date":"0/1"},{"name":"Carnival","date":"1/12"},{"name":"Carnival","date":"1/13"},{"name":"Good Friday","date":"2/30"},{"name":"Easter Day","date":"3/1"},{"name":"Labour Day","date":"4/1"},{"name":"Battle of Pichincha","date":"4/24"},{"name":"Independence Day","date":"7/10"},{"name":"Independence of Guayaquil","date":"9/9"},{"name":"All Souls Day","date":"10/2"},{"name":"Independence of Cuenca","date":"10/3"},{"name":"Foundation of Quito","date":"11/6"},{"name":"Christmas Day","date":"11/25"}]}
	];
	var year = date.getFullYear();
	var month = date.getMonth();
	var dayOfMonth = date.getDate();
	var dayOfWeek = date.getDay();
	var country = getCountryByCode(holidays,code);

	if(date == "Invalid Date" || number <=0){
		document.getElementById("calendar").innerHTML = '<p class="invalid-data">Invalid Data</p>';
	}
	else{
		document.getElementById("calendar").innerHTML = buildCalendar();
	}
	
	function buildCalendar() {
		var result = "";
		var i = 1;
		var iDay = 1;
		var newDate = new Date(date);
		var positionDay = 0;

		result+= setMonth(months[month],year);

		while(i<=number){
			if(iDay%7 <= 1){
				var classDay = "weekend";
			}
			else{
				var classDay = "week-day";
			}

			if(positionDay >= dayOfWeek){
				result+= '<span class="day '+ classDay;

				if(country.length>0){
					var search = month+"/"+dayOfMonth;
					var holiday = getHoliday(country[0].holidays,search);
					result+= holiday.length>0 ? ' holiday': '';
				}

				result+= '">'+ dayOfMonth + '</span>';

				i++;
				date.setDate(date.getDate() + 1);
				if(month != date.getMonth() && positionDay%7!=0){
					positionDay++;
					result+= fillDisabled(positionDay);
				}
			}
			else{
				result+= '<span class="day disabled-day"> </span>';	
			}
			
			dayOfWeek = date.getDay();
			dayOfMonth = date.getDate();
			positionDay++;

			if(month != date.getMonth()){
				month = date.getMonth();
				year = date.getFullYear();
				result+= setMonth(months[month],year);
				iDay = 0;
				positionDay = 0;
			}
			
			iDay++;
		}

		if(positionDay%7!=0){
			result+= fillDisabled(positionDay);
		}

		return result;
	} 

	function setMonth(month, year){
		var header = '<header><span class="month-header">'+ month +' '+ year +'</span></header>';
		header = header + '<div class="days-line"><span class="day-header">S</span><span class="day-header">M</span><span class="day-header">T</span><span class="day-header">W</span><span class="day-header">T</span><span class="day-header">F</span><span class="day-header">S</span></div>';
		return header;
	}

	function getCountryByCode(data, code) {
	  return data.filter(
      function(data){ return data.code == code }
	  );
	}

	function getHoliday(data, date) {
	  return data.filter(
      function(data){ return data.date == date }
	  );
	}

	function fillDisabled(pos){
		var disabled = "";
		while(pos%7!=0){
			disabled+= '<span class="day disabled-day"> </span>';	
			pos++;
		}
		return disabled;
	}
}

