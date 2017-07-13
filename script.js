//Ian's script

var workTime = 1500;
var breakTime = 300;
var count = workTime;
var interval;
var work = false;
var rest = false;
var paused = false;
var tick_tock = false;
var alarm = new Audio('whistle.mp3');

$(document).ready(function() {
	startTime();
	showTime();
})

function startTime() {
	setWork();
	setBreak();
	$('#wktimeplus').on('click', function() {
	setWork('plus');
	});
	$('#wktimeminus').on('click', function() {
	 setWork('minus');
	});
	$('#bktimeminus').on('click', function() {
	setBreak('minus');
	});
	$('#bktimeplus').on('click', function() {
	    setBreak('plus');
	});
	$('#start').on('click', function() {
	if (rest == false && work == false) {
		work = true;
		count = workTime;
	} else if (tick_tock == true) {
		tick_tock = false;
		paused = true;
		clearTimeout(interval);
		$('#start').text("Resume");
		$('#title').text("Pomodoro Timer Paused");
		return;
	} 
    $('#start').text("Pause");
    tick_tock = true;
    clearTimeout(interval);
    counter();
  });
}

function counter() {
	interval = setInterval(timer, 1000);
}

function timer() {
	if (count <= 0) {
		if (rest == true) {
			alarm.play();
			rest = false;
			work = true;
			count = workTime;
			$('#timer').css("background", "#dd6700");
	 	} else if (work == true) {
			alarm.play();
			rest = true;
			work = false;
			count = breakTime;
			$('#timer').css("background", "#95c623");
		}
		showTime()
		return;
		//tick_tock = false;  //un-comment if you want it to stop between work time and break time (so you have to hit the button)
	} else if (tick_tock == true) {
		count -= 1;
		showTime();
	}
}

function showTime() {
	var minutes = Math.floor(count / 60);
	var seconds = count % 60;
	var descriptor = "";
	if (seconds < 10) {
		seconds = "0" + seconds;
	}

	if (tick_tock == true) {
		if (work == true) {
			descriptor = "Work time!";
		} else if (rest == true) {
			descriptor = "Break!";
		} else {
			descriptor = "";
		}
		$('#title').text(minutes + ":" + seconds + " " + descriptor);
	}

	$('#timer').text(minutes + ":" + seconds);
}

function setWork(param) {
	if (param == "plus") {
		workTime += 60;
	} else if (param == "minus") {
		if (workTime - 60 == 0) {
			alert("Cannot set a timer for 0 minutes, bro.")
			return;
		}
		workTime -= 60;
	}
	var w = workTime / 60;
	if (w < 10) {
		w = "0" + w;
	}
	$('#workTime').text(w + " min");

	if (tick_tock == false) {
		count = workTime;
		showTime();
		work = true;
		rest = false;
		$('#start').text("Start");
		$('#timer').css("background", "#dd6700");
	}
}

function setBreak(param) {
  if (tick_tock == false && rest == true) {
  	alert("Sorry, I won't let you mod your break time during your break.")
  	return;
  }
  if (param == "plus") {
    breakTime += 60;
  } else if (param == "minus") {
    if (breakTime - 60 == 0) {
      alert("Cannot set a timer for 0 minutes, bro.")
      return;
    }
    breakTime -= 60;
  }
  var r = breakTime / 60;
  if (r < 10) {
  	r = "0" + r;
  }
  $('#breakTime').text(r + " min");
}