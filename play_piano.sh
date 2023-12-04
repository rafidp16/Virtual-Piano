#!/bin/bash

# Function to play a single note
play_note() {
    note_file=$1
    duration=$2
    ffmpeg -i "$note_file" -t "$duration" -hide_banner -loglevel panic -f wav -
}

# Function to play a chord
play_chord() {
    chord_file=$1
    duration=$2
    ffmpeg -i "$chord_file" -t "$duration" -hide_banner -loglevel panic -f wav -
}

# Define file paths for notes and chords
C_note="C.wav"
D_note="D.wav"
E_note="E.wav"
F_note="F.wav"
G_note="G.wav"
A_note="A.wav"
B_note="B.wav"
