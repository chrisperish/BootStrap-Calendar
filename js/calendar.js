var currentYear = 0;
var currentMonth = 0;

function PopulateCalendarDates(year, month){
	currentMonth = month;
	currentYear = year;
	var startDate = new Date(year, month, 01);
	var countDay = startDate.getDay() + 1;
	var countRow = 1;
	var day = 1;
	var maxDay = startDate;
	maxDay.setMonth(startDate.getMonth() + 1);
	maxDay.setDate(maxDay.getDate() - 1);
	var endDay = maxDay.getDate();
	//Set Month, Year label
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	$("#year-header h1").html(monthNames[startDate.getMonth()] + " " + startDate.getFullYear());
	//Remove last row(s) if unneeded
	if (endDay + countDay < 30)
		$(".CalCell-5-1").parent().hide();
	else
		$(".CalCell-5-1").parent().show();
	if (endDay + countDay < 37)
		$(".CalCell-6-1").parent().hide();
	else
		$(".CalCell-6-1").parent().show();

	// Populate days in calendar
	if (countDay )
	for (j = countRow; j < 7; j++)
	{
		for (i = countDay; i < 8; i++) {
			if (day <= endDay){
				$(".CalCell-" + j + "-" + i + " div").html(day);
				$(".CalCell-" + j + "-" + i).attr('id', currentYear + "_" + (currentMonth + 1) + "_" + day);
	    		day++;
			}
		}
		countDay = 1;
	}
	var todaysDate = new Date();
	HighlightDate(todaysDate);
}

function NextMonth(){
	CleanForm();
	if (currentMonth == 11)
	{
		currentMonth = 0;
		currentYear++;
	}
	else
	{
		currentMonth++;	
	}
	PopulateCalendarDates(currentYear, currentMonth);
}

function PreviousMonth(){
	CleanForm();
	if (currentMonth == 0){
		currentMonth = 11;
		currentYear --;
	}
	else
	{
		currentMonth--;
	}
	PopulateCalendarDates(currentYear, currentMonth);
}

function HighlightDate(date){
	$("#" + date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getDate()).addClass("highlighted-yellow");
}

function CleanForm(){
	$(".calendar-container .row div div").html("");
	$(".calendar-container .row div").removeClass("highlighted-yellow");
}

//Ready
$(document).ready(function (){
	var todaysDate = new Date();
	PopulateCalendarDates(todaysDate.getFullYear(), todaysDate.getMonth());
	$("#nextMonth").click(function(){NextMonth();});
	$("#previousMonth").click(function(){PreviousMonth();});
	
});