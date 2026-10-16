let elapsedTime = 0;
let startTime = 0;
let timer = null;
let isRunning = false;
let lapCount = 0;

const display = document.getElementById("display");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const lapButton = document.getElementById("lap");
const resetButton = document.getElementById("reset");
const status = document.getElementById("status");
const laps = document.getElementById("laps");

function addZero(number) {
    if (number < 10) {
        return "0" + number;
    }

    return String(number);
}

function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor(time / 60000) % 60;
    let seconds = Math.floor(time / 1000) % 60;
    let hundredths = Math.floor((time % 1000) / 10);

    return addZero(hours) + ":" + addZero(minutes) + ":" +
        addZero(seconds) + "." + addZero(hundredths);
}

function updateDisplay() {
    let currentTime = elapsedTime;

    if (isRunning) {
        currentTime = elapsedTime + (Date.now() - startTime);
    }

    display.textContent = formatTime(currentTime);
}

function pauseTimer() {
    if (isRunning) {
        elapsedTime = elapsedTime + (Date.now() - startTime);
        isRunning = false;
        clearInterval(timer);
        updateDisplay();
    }
}

startButton.addEventListener("click", function() {
    if (isRunning) {
        pauseTimer();
        startButton.textContent = "RESUME";
        status.textContent = "PAUSED";
    } else {
        startTime = Date.now();
        isRunning = true;
        timer = setInterval(updateDisplay, 10);
        startButton.textContent = "PAUSE";
        status.textContent = "RUNNING";
    }
});

stopButton.addEventListener("click", function() {
    pauseTimer();

    if (elapsedTime > 0) {
        startButton.textContent = "RESUME";
    } else {
        startButton.textContent = "START";
    }

    status.textContent = "STOPPED";
});

function showEmptyMessage() {
    let emptyMessage = document.createElement("li");
    emptyMessage.id = "empty-message";
    emptyMessage.className = "empty-state";
    emptyMessage.textContent = "No lap times yet";
    laps.appendChild(emptyMessage);
}

lapButton.addEventListener("click", function() {
    if (isRunning) {
        lapCount++;

        if (lapCount === 1) {
            laps.innerHTML = "";
        }

        let lap = document.createElement("li");
        let lapName = document.createElement("span");
        let lapTime = document.createElement("span");

        lapName.textContent = "LAP " + addZero(lapCount);
        lapTime.textContent = display.textContent;
        lap.appendChild(lapName);
        lap.appendChild(lapTime);

        laps.insertBefore(lap, laps.firstChild);
    }
});

resetButton.addEventListener("click", function() {
    clearInterval(timer);
    elapsedTime = 0;
    isRunning = false;
    lapCount = 0;
    startTime = 0;

    display.textContent = "00:00:00.00";
    startButton.textContent = "START";
    status.textContent = "READY";
    laps.innerHTML = "";
    showEmptyMessage();
});