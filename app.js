// app.js

document.addEventListener('DOMContentLoaded', () => {
  const pianoKeys = document.querySelectorAll('.key');
  const recordButton = document.getElementById('recordButton');
  const stopButton = document.getElementById('stopButton');
  const saveButton = document.getElementById('saveButton');

  let isRecording = false;
  let recordedNotes = [];

  const synth = new Tone.Synth().toDestination();
  const recorder = new Tone.Recorder();

  function playSound(note) {
    const sound = new Audio(`path_to_your_sound_files/${note}.wav`);
    sound.play();
    if (isRecording) {
      recordedNotes.push({ note: note, time: Tone.now() });
    }
    synth.triggerAttackRelease(note, '8n');
  }

  pianoKeys.forEach((key) => {
    key.addEventListener('mousedown', () => {
      playSound(key.dataset.note);
    });
  });

  recordButton.addEventListener('click', () => {
    isRecording = true;
    recordedNotes = [];
    Tone.Transport.start();
    recorder.start();
    recordButton.disabled = true;
    stopButton.disabled = false;
    saveButton.disabled = true;
  });

  stopButton.addEventListener('click', () => {
    isRecording = false;
    Tone.Transport.stop();
    recorder.stop();
    recordButton.disabled = false;
    stopButton.disabled = true;
    saveButton.disabled = false;
  });

  saveButton.addEventListener('click', () => {
    recorder.exportWAV((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      a.href = url;
      a.download = 'recorded-piano.mp3';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  });
});
