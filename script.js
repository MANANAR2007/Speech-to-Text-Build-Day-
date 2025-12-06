// SpeechRecognition setup
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

var recognition;

if (window.SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.interimResults = true;
} else {
    alert("Speech Recognition not supported in this browser.");
}

var startBtn = document.getElementById("startBtn");
var stopBtn = document.getElementById("stopBtn");
var saveBtn = document.getElementById("saveBtn");

var textBox = document.getElementById("textBox");
var notesList = document.getElementById("notesList");

// Start Listening
startBtn.addEventListener("click", function () {
    if (!recognition) return;

    recognition.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
});

// Stop Listening
stopBtn.addEventListener("click", function () {
    if (!recognition) return;

    recognition.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

// Live speech → textarea
if (recognition) {
    recognition.onresult = function (e) {
        var text = "";
        for (var i = 0; i < e.results.length; i++) {
            text += e.results[i][0].transcript;
        }
        textBox.value = text;
    };
}

// Save Note
saveBtn.addEventListener("click", function () {
    var note = textBox.value.trim();
    if (note === "") return;

    var li = document.createElement("li");
    li.textContent = note;

    notesList.appendChild(li);
    textBox.value = "";
});
