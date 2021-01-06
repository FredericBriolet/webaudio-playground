var tremolo = new Tone.Tremolo(0.1, 1000.75).toMaster().start();

// --- theme --- 

// variables
let osc = null;
let env = null;
let reverb = null;

let noteIndex = 0;
let pattern = null;

let synth = null;
let beatSynth = null;
let beatLoop = null;

function createMainTheme() {
	// var master = new Tone.Master();
	Tone.Master.volume.value = -12;

	osc = new Tone.OmniOscillator('D4', synthOptions.oscillatorType);
	// osc.volume.value = -10;

	// if (synthOptions.tremolo )
	osc.connect(tremolo);

	if (synthOptions.isPlaying) {
		// osc.start();
	}
	
	env = new Tone.AmplitudeEnvelope(synthOptions);
	osc.connect(env);
	env.toMaster();
	
	if (synthOptions.isPlaying) {
		// osc.start();
		env.triggerAttack();
	}

	// var vol = new Tone.Volume(-120);
	// osc.connect(vol);
	// osc.chain(vol, Tone.Master);
	// vol.toMaster();
	
	reverb = new Tone.Reverb( synthOptions.reverb );
	// reverb = new Tone.Freeverb({
	// 	roomSize: synthOptions.roomSize,
	// 	dampening: synthOptions.dampening
	// });

	synth = new Tone.MonoSynth({
		"oscillator": {
			"harmonicity" : synthOptions.harmonicity,
			"type" : synthOptions.oscillatorType,
			"modulationType" : synthOptions.modulatorType
		},
		"envelope": {
			attack  : synthOptions.attack,
			decay  : synthOptions.decay,
			sustain  : synthOptions.sustain,
			release  : synthOptions.release
		},
		// "filterEnvelope": {
		// 	attack: 0.06,
		// 	decay: 0.2,
		// 	sustain: 0.5,
		// 	release: 2,
		// 	baseFrequency: 800,
		// 	octaves: 7,
		// 	exponent: 1.2
		// },
		"portamento" : synthOptions.portamento,
	}).toMaster();
	synth.volume.value = 1;
	synth.connect(reverb);

	env.connect(reverb);
	reverb.generate();
	reverb.toMaster();
	
	if (synthOptions.beat) {
		createBeat();
	}

	if (synthOptions.isPlaying) {
		createPattern(notes);
	}

	Tone.Transport.bpm.value = synthOptions.bpm;

	if (synthOptions.isPlaying) {
		Tone.Transport.start();
	}
}

function stopMainTheme() {
	osc.dispose();
	env.dispose();
	reverb.dispose();
	pattern.stop();
	pattern.dispose();

	if (beatLoop) {
		beatLoop.stop();
		beatLoop.dispose();
	}

	Tone.Transport.stop();
}

function createPattern(notes) {
	noteIndex = 0;

	pattern = new Tone.Pattern(function(time, note){
		if(debug) console.log(note);
		// console.log(noteIndex, synthOptions.numberOfNotes)
		items[ noteIndex ].play();
		// osc.frequency.value = note;
		// env.triggerAttackRelease(note, "+0", 0.6, 0.5);

		// let randomNote = items[Math.floor(Math.random() * items.length)];
		// synth.triggerAttackRelease(randomNote.note, Math.random() * 0.1 + 0.01);

		// setTimeout(()=>{
		// 	randomNote.play();
		// 	osc.frequency.value = randomNote.note;
		// 	env.triggerAttackRelease(randomNote.note, "+0", 0.6, 0.5);
			synth.triggerAttackRelease(items[ noteIndex ].note, Math.random() * 0.1 + 0.01);
		// }, 500);

		noteIndex = noteIndex === synthOptions.numberOfNotes-1 ? 0 : noteIndex + 1;
	}, notes);
	
	pattern.start(0);

	if (beatSynth) {
		beatSynth.sync();
	}
}

function createBeat() {
	let beatReverb = new Tone.Reverb( synthOptions.beatReverb );
	env.connect(beatReverb);
	beatReverb.generate();
	beatReverb.toMaster();

	beatSynth = new Tone.MembraneSynth({
		pitchDecay: 0.05,
		octaves: 10,
		oscillator: {
			type : 'sine'
		},
		envelope : {
			attack : 0.008,
			decay : 0.4,
			sustain : 0.01,
			release : 1.4,
			attackCurve : 'exponential'
		}
	}).toMaster();
	beatSynth.volume.value = -10;
	beatSynth.connect(beatReverb)
	beatSynth.sync();
	beatLoop = new Tone.Loop(function(time){
		beatSynth.triggerAttackRelease("A0", "1n", time)
	}, "2n");
	beatLoop.start(0);
}

function resetMainTheme() {
	// remove
	notes = [];
	pattern.stop();
	for (let i = 0, l = items.length; i < l; i++) {
		items[ i ].destroy(scene);
	}
	items = [];

	osc.dispose();
	osc = new Tone.OmniOscillator('C4', synthOptions.oscillatorType);

	// repopulate
	// synthOptions.numberOfNotes = value;
	for (let i = 0, l = synthOptions.numberOfNotes; i < l; i++) {
		notes.push( createRandomNote() );
	}
	createCubes();
	createPattern(notes);

	plane.scale.x = synthOptions.numberOfNotes * 2.5;

	const newBpm = Math.min(350, parseInt( synthOptions.numberOfNotes * bpmMultiplier ));
	synthOptions.bpm = newBpm;
	Tone.Transport.bpm.value = newBpm;

	osc.start();
	osc.toMaster();
}

createMainTheme();



// --- interactive ---

const keyboardSynth = new Tone.PolySynth(6, Tone.MonoSynth).toMaster();
keyboardSynth.set({
	"oscillator" : {
		"type" : "sine"
	},
	"envelope" : {
		"attack" : 0.5
	}
});
// const keyboardSynth = new Tone.MonoSynth({
// 	"oscillator" : {
// 		"type" : "sine1"
//  },
//  "envelope" : {
//  	"attack" : 0.9
//  }
// }).toMaster();

// var keyboardOsc = new Tone.OmniOscillator();
// keyboardOsc.frequency.value = "C4";
// // osc.connect(tremolo);
// keyboardOsc.start().stop("+8n");

// var keyboardEnv = new Tone.AmplitudeEnvelope();
// keyboardOsc.connect(keyboardEnv);
// keyboardEnv.toMaster();

// keyboardOsc.start();
// keyboardEnv.triggerAttack();

// var keyboardReverb = new Tone.Reverb( synthOptions.reverb - 3 );
// keyboardSynth.connect(keyboardReverb);
// keyboardReverb.generate();
// keyboardReverb.toMaster();


document.addEventListener('keydown', (event) => {
	const key = keyboardNotes[ ' ' + event.keyCode ];
	if (key && !key.isPlaying) {
		keyboardSynth.triggerAttack(key.note);
		key.isPlaying = true;
		key.item.keydown();
	}
})

document.addEventListener('keyup', (event) => {
	const key = keyboardNotes[ ' ' + event.keyCode ];
	if (key && key.isPlaying) {
		keyboardSynth.triggerRelease(key.note);
		key.isPlaying = false;
		key.item.keyup();
	}
})