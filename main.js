import { PitchDetector } from 'pitchy';

const NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const NOTE_POSITIONS = {
    'C': 170, 'D': 160, 'E': 150, 'F': 140, 'G': 130, 'A': 120, 'B': 110
};
const NOTE_FREQUENCIES = {
    'C': 261.63, 'D': 293.66, 'E': 329.63, 'F': 349.23, 'G': 392.00, 'A': 440.00, 'B': 493.88
};

let currentNote;
let audioContext;
let analyser;
let detector;
let isListening = false;

function displayNote() {
    currentNote = NOTES[Math.floor(Math.random() * NOTES.length)];
    const noteElement = document.getElementById('note');
    noteElement.style.top = `${NOTE_POSITIONS[currentNote]}px`;
    document.getElementById('feedback').textContent = `Play this note: ${currentNote}`;
}

function startListening() {
    if (isListening) return;

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    detector = PitchDetector.forFloat32Array(analyser.fftSize);

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            audioContext.createMediaStreamSource(stream).connect(analyser);
            isListening = true;
            document.getElementById('start-button').textContent = 'Listening...';
            displayNote();
            requestAnimationFrame(updatePitch);
        })
        .catch(err => {
            console.error('Error accessing microphone:', err);
            document.getElementById('feedback').textContent = 'Error accessing microphone. Please check your settings and try again.';
        });
}

function updatePitch() {
    const float32Array = new Float32Array(analyser.fftSize);
    analyser.getFloatTimeDomainData(float32Array);
    const [pitch, clarity] = detector.findPitch(float32Array, audioContext.sampleRate);

    if (pitch && clarity > 0.9) {  // Only consider pitches with high clarity
        const detectedNote = getNoteFromFrequency(pitch);
        checkNote(detectedNote);
        document.getElementById('debug').textContent = `Detected: ${detectedNote} (${pitch.toFixed(2)} Hz, Clarity: ${clarity.toFixed(2)})`;
    } else {
        document.getElementById('debug').textContent = 'No clear pitch detected';
    }

    if (isListening) {
        requestAnimationFrame(updatePitch);
    }
}

function getNoteFromFrequency(frequency) {
    let minDiff = Infinity;
    let closestNote = '';

    for (const [note, noteFreq] of Object.entries(NOTE_FREQUENCIES)) {
        const diff = Math.abs(frequency - noteFreq);
        if (diff < minDiff) {
            minDiff = diff;
            closestNote = note;
        }
    }

    return closestNote;
}

function checkNote(detectedNote) {
    const feedback = document.getElementById('feedback');
    if (detectedNote === currentNote) {
        feedback.textContent = 'Correct! Well done!';
        setTimeout(() => {
            displayNote();
        }, 1500);
    } else {
        feedback.textContent = `Play this note: ${currentNote}`;
    }
}

document.getElementById('start-button').addEventListener('click', startListening);

displayNote();