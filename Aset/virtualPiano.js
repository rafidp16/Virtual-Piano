const chords = ["c", "d", "e", "f", "G", "a", "B"];
const note = document.getElementById("note");
const recordingStatus = document.getElementById("recordingStatus");

let mediaRecorder;
let audioChunks = []; // Menggunakan audioChunks agar konsisten dengan variabel

chords.forEach(chord => {
    const audio = document.createElement("audio");
    audio.src = `${chord}.wav`;
    audio.volume = 1;
    note.appendChild(audio);

    const button = document.createElement("button");
    button.innerText = chord;

    button.addEventListener("click", () => {
        audio.currentTime = 0;
        audio.play();
    });

    note.appendChild(button);
});

function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = function (e) {
                audioChunks.push(e.data); // Menggunakan audioChunks
            };
            mediaRecorder.start();
            recordingStatus.textContent = 'Recording...';
        })
        .catch(function (err) {
            console.error('Unable to access microphone:', err);
        });
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        mediaRecorder.onstop = function () {
            const blob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = audioUrl;
            downloadLink.download = 'recorded_audio.wav';
            downloadLink.click();
            audioChunks = []; // Reset audioChunks setelah diunduh
            recordingStatus.textContent = 'Ready to record';
        };
    }
}

document.getElementById('startRecordingBtn').addEventListener('click', startRecording);
document.getElementById('stopRecordingBtn').addEventListener('click', stopRecording);
