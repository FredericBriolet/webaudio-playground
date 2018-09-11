const debug = false;

let synthOptions = {
	oscillatorType: 'pwm',
	reverb: 6,
	bpm: 160,
	numberOfNotes: 8,
	beat: false,
	attack: 0.1,
	decay: 0.2,
	sustain: 0.0,
	release: 0.8,
	isPlaying: false
}

const bpmMultiplier = 25;
synthOptions.bpm = Math.min(350, parseInt( synthOptions.numberOfNotes * bpmMultiplier ));

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