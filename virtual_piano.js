document.addEventListener('DOMContentLoaded', () => {
    const pianoKeys = document.querySelectorAll('.key');
    const recordButton = document.getElementById('recordButton');
    const stopButton = document.getElementById('stopButton');
    const saveButton = document.getElementById('saveButton');
  
    let isRecording = false;
    let recordedNotes = [];
  
    const synth = new Tone.Synth().toDestination();
    const recorder = new Tone.Recorder();
  
    pianoKeys.forEach((key) => {
      key.addEventListener('mousedown', () => {
        if (isRecording) {
          recordedNotes.push({ note: key.dataset.note, time: Tone.now() });
        }
        synth.triggerAttackRelease(key.dataset.note, '8n');
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