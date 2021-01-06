const debug = false;

let synthOptions = {
	oscillatorType: 'sine',
	modulatorType: 'square',
	harmonicity: 0.5,
	portamento: 2.01,
	roomSize: 1,
	dampening: 600,
	reverb: 50,
	beatReverb: 40,
	bpm: 160,
	numberOfNotes: 16,
	beat: false,
	attack: 1.1,
	decay: 1,
	sustain: 1.7,
	release: 2.8,
	isPlaying: false
}

const bpmMultiplier = 25;
// synthOptions.bpm = Math.min(350, parseInt( synthOptions.numberOfNotes * bpmMultiplier ));

let rendererOptions = {
	enabled: true,
	keyboard: 'azerty'
}

const oscillatorTypes = [
	'pwm',
	'fatsine',
	'amsine',
	'fmsine',
	'pulse',
	'sine', 'sine1', 'sine2', 'sine3', 'sine8', 
	'sawtooth', 'sawtooth1', 'sawtooth2', 'sawtooth3', 'sawtooth8',
	'triangle', 'triangle1', 'triangle2', 'triangle3', 'triangle8',
	'square', 'square1', 'square2', 'square3', 'square8'
];
const modulatorTypes = [
	'sine',
	'sawtooth',
	'triangle',
	'square'
];