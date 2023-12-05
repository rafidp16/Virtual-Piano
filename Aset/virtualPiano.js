const chords = ["c", "d", "e", "f", "G", "a", "B"];
const note = document.getElementById("note");
const recordingStatus = document.getElementById("recordingStatus");
const keyMappings = {
  'KeyZ': 'c',
  'KeyX': 'd',
  'KeyC': 'e',
  'KeyV': 'f',
  'KeyB': 'G',
  'KeyN': 'a',
  'KeyM': 'B'
};

document.addEventListener('keydown', function(event) {
  // Periksa apakah tombol yang ditekan ada dalam mapping
  if (event.code in keyMappings) {
      // Dapatkan nada yang sesuai dengan tombol yang ditekan
      const soundToPlay = keyMappings[event.code];
      // Panggil fungsi playSound dengan nada yang sesuai
      playSound(soundToPlay);
  }
});

// Fungsi playSound untuk memainkan suara berdasarkan input nada
function playSound(chord) {
  const audio = new Audio(`${chord}.wav`);
  audio.volume = 0.5;
  audio.currentTime = 0;
  audio.play();
}

let mediaRecorder;
let audioChunks = []; // Menggunakan audioChunks agar konsisten dengan variabel

chords.forEach(chord => {
    const audio = document.createElement("audio");
    audio.src = `${chord}.wav`;
    audio.volume = 0.5;
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
            downloadLink.download = 'Nih Hasil Rekamannya.wav';
            downloadLink.click();
            audioChunks = []; // Reset audioChunks setelah diunduh
            recordingStatus.textContent = 'Ready to record';
        };
    }
}

document.getElementById('startRecordingBtn').addEventListener('click', startRecording);
document.getElementById('stopRecordingBtn').addEventListener('click', stopRecording);
