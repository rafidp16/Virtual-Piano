#!/bin/bash

while true; do
    echo "Choose a note to play (or 'exit' to quit):"
    read user_input

    if [ "$user_input" == "exit" ]; then
        break
    fi

    note_file="piano_notes/$user_input.wav"

    if [ -f "$note_file" ]; then
        ffplay -autoexit -nodisp -loglevel quiet "$note_file"
    else
        echo "Invalid note. Try again."
    fi
done
