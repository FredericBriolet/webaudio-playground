var tremolo = new Tone.Tremolo(0.1, 1000.75).toMaster().start();

// --- theme --- 

// variables
let osc = null;
let env = null;
let reverb = null;

let noteIndex = 0;
let pattern = null;

let beatSynth = null;
let beatLoop = null;

function createMainTheme() {
	osc = new Tone.OmniOscillator('C4', synthOptions.oscillatorType);
	osc.volume.value = -6;

	// if (synthOptions.tremolo )
	osc.connect(tremolo);

	if (synthOptions.isPlaying) {
		osc.start();
	}
	
	env = new Tone.AmplitudeEnvelope(synthOptions);
	osc.connect(env);
	env.toMaster();
	
	if (synthOptions.isPlaying) {
		osc.start();
		env.triggerAttack();
	}
	
	reverb = new Tone.Reverb( synthOptions.reverb );
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
		osc.frequency.value = note;
		env.triggerAttackRelease(note, "+0", 0.6, 0.5);
		noteIndex = noteIndex === synthOptions.numberOfNotes-1 ? 0 : noteIndex + 1;
	}, notes);
	
	pattern.start(0);
}

function createBeat() {
	beatSynth = new Tone.MembraneSynth().toMaster()
	beatSynth.sync();
	beatLoop = new Tone.Loop(function(time){
		beatSynth.triggerAttackRelease("C1", "8n", time)
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