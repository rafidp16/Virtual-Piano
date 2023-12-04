from flask import Flask, render_template, request, jsonify, url_for
from pydub import AudioSegment

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save_recording', methods=['POST'])
def save_recording():
    data = request.get_json()
    recording = data['recording']

    audio = AudioSegment.silent()
    for note in recording:
        audio += AudioSegment.from_wav(f'static/sounds/{note}.wav')

    audio.export('static/recordings/recorded_song.mp3', format='mp3')

    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
