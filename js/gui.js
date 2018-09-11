// synth folder
const gui = new dat.GUI();
const synthFolder = gui.addFolder('Synth theme');

const isPlayingController = synthFolder.add(synthOptions, 'isPlaying');
const oscillatorTypeController = synthFolder.add(synthOptions, 'oscillatorType', oscillatorTypes);
const reverbController = synthFolder.add(synthOptions, 'reverb', 0, 10);
const numbersOfNotesController = synthFolder.add(synthOptions, 'numberOfNotes', 2, 150, 1);
const bpmController = synthFolder.add(synthOptions, 'bpm', 90, 800);
const beatController = synthFolder.add(synthOptions, 'beat');
const attackController = synthFolder.add(synthOptions, 'attack', 0.0, 3.0);
const decayController = synthFolder.add(synthOptions, 'decay', 0.0, 3.0);
const sustainController = synthFolder.add(synthOptions, 'sustain', 0.0, 3.0);
const releaseController = synthFolder.add(synthOptions, 'release', 0.0, 3.0);

oscillatorTypeController.onChange( (value) => {
	console.log(value)
	resetMainTheme();
});

reverbController.onChange( (value) => {
	reverb.disconnect();
	reverb.dispose();

	reverb = new Tone.Reverb( synthOptions.reverb );
	env.connect(reverb);
	reverb.generate();
	reverb.toMaster();
});

numbersOfNotesController.onChange( (value) => {
	resetMainTheme();
});

bpmController.onChange( (value) => {
	Tone.Transport.bpm.value = value;
});
bpmController.listen();
synthFolder.open()

beatController.onChange( (value) => {
	if (synthOptions.beat) {
		createBeat();
	} else {
		console.log(beatSynth)
		if (beatSynth) {
			beatSynth.dispose();
			beatLoop.stop();
			beatLoop.dispose();
		}
	}
});

attackController.onChange( updateSynth );
decayController.onChange( updateSynth );
sustainController.onChange( updateSynth );
releaseController.onChange( updateSynth );
isPlayingController.onChange( toggleSynth );

function updateSynth() {
	console.log(synthOptions);
	if (synthOptions.isPlaying) {
		stopMainTheme();
	}
	createMainTheme();
}


function toggleSynthGui(shouldPlay) {
	const parentNode = isPlayingController.domElement.closest('li.cr').parentNode;
	const nextLiList = parentNode.querySelectorAll('li.cr');

	for(let i = 1; i < nextLiList.length; i++) {
		nextLiList[i].classList.toggle('disabled', !shouldPlay);
	}
}

function toggleSynth(shouldPlay) {

	toggleSynthGui(shouldPlay);

	if (shouldPlay) {
		createMainTheme();
	} else {
		stopMainTheme();
	}

}

synthFolder.open()
toggleSynthGui();

// scene folder

const sceneFolder = gui.addFolder('Scene');
const renderController = sceneFolder.add(rendererOptions, 'enabled');
const keyboardController = sceneFolder.add(rendererOptions, 'keyboard', [ 'azerty', 'qwerty' ] );

keyboardController.onChange(function(value) {
	keyboardNotes = getKeyboardCodes();
});

sceneFolder.open()