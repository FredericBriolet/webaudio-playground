const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 500 );
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

// physics
const world = new CANNON.World();
world.gravity.set(0, 0, -9.82); // m/s²



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

createCubes();
createInstrumentCubes();

function createCubes() {
	const offsets = {x: 2, y: 0, z: 0}
	const middleX = (offsets.x * (notes.length - 1)) / 2
	let item = positionX = positionZ = positionY = note = null

	for (let i = 0, l = notes.length; i < l; i++) {

		note = notes[ i ]
		
		const letter = note.slice(0, -1);
		const number = parseInt(note.substr(1));
		
		positionX = (i * offsets.x) - middleX
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

function createInstrumentCubes() {
	const offsets = {x: 2, y: 0, z: 0}
	console.log(Object.keys(keyboardNotes).length);
	const middleX = offsets.x * (Object.keys(keyboardNotes).length - 1) / 2;
	let item = positionX = positionZ = positionY = note = null

	console.log(keyboardNotes);

	let index = 0;

	for (let key in keyboardNotes) {
		let keyboardNote = keyboardNotes[key];

		console.log(keyboardNote);
		note = keyboardNote.note;
		
		const letter = note.slice(0, -1);
		const number = parseInt(note.substr(1));
		
		positionX = (index * offsets.x) - middleX;
		positionZ = 10;
		positionY = 0;

		material = materials[ Math.floor(Math.random()*materials.length) ]
		// material = new THREE.MeshStandardMaterial({color: 0xff0000});

		item = new Item({
			geometry,
			material,
			note,
			position: { x: positionX, y: positionY, z: positionZ },
			color: material.color
		});

		// items[ note ] = item;
		keyboardNote.item = item;

		scene.add( item.mesh );

		index++;
	}
}

console.log(notes)
console.log(items)


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