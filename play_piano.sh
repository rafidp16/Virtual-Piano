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
C_note="c.wav"
D_note="d.wav"
E_note="e.wav"
F_note="f.wav"
G_note="g.wav"
A_note="a.wav"
B_note="b.wav"
