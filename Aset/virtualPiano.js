const chords = ["c", "d", "e", "f", "G", "a", "B"];
    const note = document.getElementById("note");
    const recordBtn = document.getElementById("recordBtn");
    const stopBtn = document.getElementById("stopBtn");
    const saveBtn = document.getElementById("saveBtn");
    const recordingStatus = document.getElementById("recordingStatus"); // Mengambil elemen status rekaman

    let audioChunks = [];
    let mediaRecorder;
    let volume = 1; // Initial volume

    // Fungsi untuk memperbarui status rekaman
    function updateRecordingStatus(status) {
      recordingStatus.textContent = status;
    }

    chords.forEach(chord => {
      const audio = document.createElement("audio");
      audio.src = `${chord}.wav`;
      audio.volume = volume;
      note.appendChild(audio);

      const button = document.createElement("button");
      button.innerText = chord;

      button.addEventListener("click", () => {
        audio.currentTime = 0;
        audio.play();
      });

      note.appendChild(button);
    });

    function updateRecordingStatus(status) {
      recordingStatus.textContent = status;
    }

    function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const audioElements = note.getElementsByTagName("audio");
        const tracks = Array.from(audioElements).map(audio => audio.captureStream().getAudioTracks()[0]);

        const audioContext = new AudioContext();
        const audioDestination = audioContext.createMediaStreamDestination();
        tracks.forEach(track => {
          audioContext.createMediaStreamSource(track).connect(audioDestination);
        });

        mediaRecorder = new MediaRecorder(audioDestination.stream);

        mediaRecorder.ondataavailable = event => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          audio.volume = volume;
          audio.play();
          saveBtn.disabled = false;
          recordBtn.disabled = false;
          stopBtn.disabled = true;
          updateRecordingStatus('Recording stopped');
        };

        mediaRecorder.start();
        recordBtn.disabled = true;
        stopBtn.disabled = false;
        updateRecordingStatus('Recording');
      })
      .catch(error => console.error('Error accessing microphone:', error));
  }

  // Fungsi untuk menghentikan perekaman
  function stopRecording() {
    mediaRecorder.stop();
    recordBtn.disabled = false;
    stopBtn.disabled = true;
    saveBtn.disabled = false; // Aktifkan tombol save setelah perekaman berhenti
    updateRecordingStatus('Recording stopped');
  }

  // Fungsi untuk menyimpan rekaman yang sudah direkam
  function saveRecording() {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const url = URL.createObjectURL(audioBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'recording.wav';
    downloadLink.style.display = 'none';

    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);
  }

  // Event listener untuk tombol record, stop, dan save
  recordBtn.addEventListener("click", startRecording);
  stopBtn.addEventListener("click", stopRecording);
  saveBtn.addEventListener("click", saveRecording);