const { exec } = require('child_process');

// Fungsi untuk mengkonversi file audio menggunakan ffmpeg
function convertAudioToMP3(inputFile, outputFile) {
  return new Promise((resolve, reject) => {
    const command = `ffmpeg -i ${inputFile} -codec:a libmp3lame -qscale:a 2 ${outputFile}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        reject(stderr);
      }
      console.log(`stdout: ${stdout}`);
      resolve(outputFile);
    });
  });
}

// Contoh penggunaan fungsi untuk mengkonversi file audio WAV ke MP3
// ...
