// --- main theme ---

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
const numbers = ['3', '4']
const lettersInNumbers = {
	"C": 0,
	"D": 1,
	"E": 2,
	"F": 3,
	"G": 4,
	"A": 5,
	"B": 6
}
let notes = [];

for (let i = 0, l = synthOptions.numberOfNotes; i < l; i++) {
	notes.push( createRandomNote() );
}
// notes = ['C1', 'D1', 'E1', 'F1', 'G1', 'A1', 'B1', 'C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6', 'D6']


// --- keyboard --- 

const keyboardNotesArray = [
	'A3',
	'B3',
	'C4',
	'D4',
	'E4',
	'F4',
	'G4',
	'A4',
	'B4',
	'C5'
];
const keyboardNotes = getKeyboardCodes();

function getKeyboardCodes() {
	if (rendererOptions.keyboard === 'azerty') {
		return {
			' 65': {
				note: keyboardNotesArray[0],
				isPlaying: false
			},
			' 90': {
				note: keyboardNotesArray[1],
				isPlaying: false
			},
			' 69': {
				note: keyboardNotesArray[2],
				isPlaying: false
			},
			' 82': {
				note: keyboardNotesArray[3],
				isPlaying: false
			},
			' 84': {
				note: keyboardNotesArray[4],
				isPlaying: false
			},
			' 89': {
				note: keyboardNotesArray[5],
				isPlaying: false
			},
			' 85': {
				note: keyboardNotesArray[6],
				isPlaying: false
			},
			' 73': {
				note: keyboardNotesArray[7],
				isPlaying: false
			},
			' 79': {
				note: keyboardNotesArray[8],
				isPlaying: false
			},
			' 80': {
				note: keyboardNotesArray[9],
				isPlaying: false
			},
		}
	} else {
		return {
			' 81': {
				note: keyboardNotesArray[0],
				isPlaying: false
			},
			' 87': {
				note: keyboardNotesArray[1],
				isPlaying: false
			},
			' 69': {
				note: keyboardNotesArray[2],
				isPlaying: false
			},
			' 82': {
				note: keyboardNotesArray[3],
				isPlaying: false
			},
			' 84': {
				note: keyboardNotesArray[4],
				isPlaying: false
			},
			' 89': {
				note: keyboardNotesArray[5],
				isPlaying: false
			},
			' 85': {
				note: keyboardNotesArray[6],
				isPlaying: false
			},
			' 73': {
				note: keyboardNotesArray[7],
				isPlaying: false
			},
			' 79': {
				note: keyboardNotesArray[8],
				isPlaying: false
			},
			' 80': {
				note: keyboardNotesArray[9],
				isPlaying: false
			},
		}
	}
}

function createRandomNote() {
	const letter = letters[Math.floor(Math.random()*letters.length)];
	const number = numbers[Math.floor(Math.random()*numbers.length)];

	const note = `${letter}${number}`;
	return note;
}