const debug = false;

let synthOptions = {
	reverb: 6,
	bpm: 160,
	numberOfNotes: 12,
	beat: false,
	attack: 0.1,
	decay: 0.2,
	sustain: 0.0,
	release: 0.8,
	isPlaying: false
}

synthOptions.bpm = Math.min(350, parseInt( synthOptions.numberOfNotes * 13 ));

let rendererOptions = {
	enabled: true,
	keyboard: 'azerty'
}

// --- UI ---

const menu = document.querySelector('.menu-burger');
const controls = document.querySelector('.controls');
const statsContainer = document.querySelector('.stats-container');

menu.addEventListener('click', function(){
	this.classList.toggle('menu-burger--is-active');
	controls.classList.toggle('visible');
});

// --- SCENE ---

// --- variables ---
var gui = new dat.GUI();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 500 );
camera.position.z = 25;
camera.position.y = 25;

var renderer = new THREE.WebGLRenderer( { antialias: false } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xFCFCFC, 1 );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
document.body.appendChild( renderer.domElement );

var stats = new Stats();
statsContainer.appendChild( stats.dom );

var orbit = new THREE.OrbitControls( camera, renderer.domElement );

var directionalLight = new THREE.DirectionalLight( 0xffffff, 5 );
directionalLight.position.set( 0, 1, 0.3 );
directionalLight.castShadow = true; 
scene.add( directionalLight );

// var light = new THREE.AmbientLight( 0xffffff ); // soft white light
// scene.add( light );


// --- notes ---
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
const numbers = ['3', '4', '5']
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
			'65': {
				note: keyboardNotesArray[0],
				isPlaying: false
			},
			'90': {
				note: keyboardNotesArray[1],
				isPlaying: false
			},
			'69': {
				note: keyboardNotesArray[2],
				isPlaying: false
			},
			'82': {
				note: keyboardNotesArray[3],
				isPlaying: false
			},
			'84': {
				note: keyboardNotesArray[4],
				isPlaying: false
			},
			'89': {
				note: keyboardNotesArray[5],
				isPlaying: false
			},
			'85': {
				note: keyboardNotesArray[6],
				isPlaying: false
			},
			'73': {
				note: keyboardNotesArray[7],
				isPlaying: false
			},
			'79': {
				note: keyboardNotesArray[8],
				isPlaying: false
			},
			'80': {
				note: keyboardNotesArray[9],
				isPlaying: false
			},
		}
	} else {
		return {
			'81': {
				note: keyboardNotesArray[0],
				isPlaying: false
			},
			'87': {
				note: keyboardNotesArray[1],
				isPlaying: false
			},
			'69': {
				note: keyboardNotesArray[2],
				isPlaying: false
			},
			'82': {
				note: keyboardNotesArray[3],
				isPlaying: false
			},
			'84': {
				note: keyboardNotesArray[4],
				isPlaying: false
			},
			'89': {
				note: keyboardNotesArray[5],
				isPlaying: false
			},
			'85': {
				note: keyboardNotesArray[6],
				isPlaying: false
			},
			'73': {
				note: keyboardNotesArray[7],
				isPlaying: false
			},
			'79': {
				note: keyboardNotesArray[8],
				isPlaying: false
			},
			'80': {
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
	// if (!debug && notes.includes(note) ) {
		// return createRandomNote();
	// } else {
		return note;
	// }
}

// --- meshes ---

// plane
let geometry = new THREE.PlaneGeometry( 1, 45, 32 );
let material = new THREE.MeshLambertMaterial( {color: 0xF1F1F1, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
plane.receiveShadow = true;
plane.rotation.x = Math.PI/2;
plane.position.y = -0.5;
plane.position.z = -7;

plane.scale.x = synthOptions.numberOfNotes * 2.5;

scene.add( plane );

var colors = [
	// new THREE.Color(0xffffff),
	// new THREE.Color(0xfcfcfc),
	// new THREE.Color(0xf9f9f9),
	// new THREE.Color(0xf7f7f7),
	// new THREE.Color(0xf4f4f4),
	new THREE.Color(0x63090f),
	new THREE.Color(0x9f1e26),
	new THREE.Color(0x092641),
	new THREE.Color(0x119da4),
	new THREE.Color(0x75dddd)
]

let materials = [
	new THREE.MeshStandardMaterial({color: colors[0]}),
	new THREE.MeshStandardMaterial({color: colors[1]}),
	new THREE.MeshStandardMaterial({color: colors[2]}),
	new THREE.MeshStandardMaterial({color: colors[3]}),
	new THREE.MeshStandardMaterial({color: colors[4]})
]

// cubes
let items = []
let dimensions = {x: 1, y: 1, z: 5};
geometry = new THREE.BoxGeometry( dimensions.x, dimensions.y, dimensions.z );
// material = new THREE.MeshStandardMaterial()

createsCubes();

function createsCubes() {
	const offsets = {x: 2, y: 0, z: 0}
	const middleX = (offsets.x * (notes.length - 1)) / 2
	let item = positionX = positionZ = positionY = note = null

	for (let i = 0, l = notes.length; i < l; i++) {

		note = notes[ i ]
		positionX = (i * offsets.x) - middleX

		const letter = note.slice(0, -1);
		const number = parseInt(note.substr(1));


		positionZ = (-number * 7 - lettersInNumbers[letter] ) + 24;
		positionY = 0;
		// console.log({note, number, letter, positionZ})

		// material.color = colors[ Math.floor(Math.random()*colors.length) ]
		material = materials[ Math.floor(Math.random()*materials.length) ]

		item = new Item({
			geometry,
			material,
			note,
			position: { x: positionX, y: positionY, z: positionZ },
			color: material.color
		});

		// items[ note ] = item;
		items.push(item);

		scene.add( item.mesh );
	}
}

console.log(notes)
console.log(items)

// --- SOUNDS --

// var tremolo = new Tone.Tremolo(9, .75).toMaster().start();


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
	osc = new Tone.OmniOscillator();
	osc.frequency.value = "C4";
	osc.volume.value = -6;
	// osc.connect(tremolo);

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
	const key = keyboardNotes[ event.keyCode ];
	if (key && !key.isPlaying) {
		keyboardSynth.triggerAttack(key.note);
		key.isPlaying = true;
	}
})

document.addEventListener('keyup', (event) => {
	const key = keyboardNotes[ event.keyCode ];
	if (key && key.isPlaying) {
		keyboardSynth.triggerRelease(key.note);
		key.isPlaying = false;
	}
})



// --- gui ---

// synth folder
const synthFolder = gui.addFolder('Synth theme');

const isPlayingController = synthFolder.add(synthOptions, 'isPlaying');
const reverbController = synthFolder.add(synthOptions, 'reverb', 0, 10);
const numbersOfNotesController = synthFolder.add(synthOptions, 'numberOfNotes', 2, 150, 1);
const bpmController = synthFolder.add(synthOptions, 'bpm', 90, 800);
const beatController = synthFolder.add(synthOptions, 'beat');
const attackController = synthFolder.add(synthOptions, 'attack', 0.0, 3.0);
const decayController = synthFolder.add(synthOptions, 'decay', 0.0, 3.0);
const sustainController = synthFolder.add(synthOptions, 'sustain', 0.0, 3.0);
const releaseController = synthFolder.add(synthOptions, 'release', 0.0, 3.0);

reverbController.onChange(function(value) {
	reverb.disconnect();
	reverb.dispose();

	reverb = new Tone.Reverb( synthOptions.reverb );
	env.connect(reverb);
	reverb.generate();
	reverb.toMaster();
});

numbersOfNotesController.onChange(function(value) {
	// remove
	notes = [];
	pattern.stop();
	for (let i = 0, l = items.length; i < l; i++) {
		items[ i ].destroy(scene);
	}
	items = [];

	// repopulate
	synthOptions.numberOfNotes = value;
	for (let i = 0, l = synthOptions.numberOfNotes; i < l; i++) {
		notes.push( createRandomNote() );
	}
	createsCubes();
	createPattern(notes);

	plane.scale.x = synthOptions.numberOfNotes * 2.5;

	const newBpm = Math.min(350, parseInt( synthOptions.numberOfNotes * 13 ));
	synthOptions.bpm = newBpm;
	Tone.Transport.bpm.value = newBpm;
});

bpmController.onChange(function(value) {
	Tone.Transport.bpm.value = value;
});
bpmController.listen();
synthFolder.open()

beatController.onChange(function(value) {
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


// --- scene events ---
window.addEventListener( 'resize', function () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

// --- render ---
function render() {
	stats.begin();

	if (rendererOptions.enabled) {
		renderer.render( scene, camera );
	}

	stats.end();
	requestAnimationFrame( render );
};
render();