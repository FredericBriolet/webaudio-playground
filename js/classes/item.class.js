class Item {
	constructor(options = {}) {
		this.mesh = null;	
		this.note = options.note || 220;
		this.animation = {
			durationIn: options.duration || .4,
			durationOut: options.duration || 1,
			easeIn: options.ease || Expo.easeOut,
			easeOut: options.ease || Elastic.easeOut.config(1, 0.4)
		}

		this._color = options.color || 0xfefefe
		this._position = options.position || {x: 0, y: 0, z: 0};
		this._dimensions = options.dimensions || {x: 1, y: 1, z: 1};
		this.geometry = options.geometry || new THREE.BoxGeometry( this._dimensions.x, this._dimensions.y, this._dimensions.z );
		this.material = options.material || new THREE.MeshStandardMaterial( {color: this._color} );

		this._tweens = {
			positionIn: null,
			positionOut: null,
			scaleIn: null,
			scaleOut: null,
			rotationIn: null,
			rotationOut: null
		}

		this._init();
	}

	// --- public ---

	play() {
		// return;
		this._tweens.positionIn = TweenMax.to(this.mesh.position, this.animation.durationIn, {y: "+=2", ease: this.animation.easeIn})
		this._tweens.positionOut = TweenMax.to(this.mesh.position, this.animation.durationOut, {y: "-=2", delay: this.animation.durationIn, ease: this.animation.easeOut})

		// this._tweens.scaleIn = TweenMax.to(this.mesh.scale, this.animation.durationIn, {x: 1.2, y: 1.2, z: 1.2, ease: this.animation.easeIn})
		// this._tweens.scaleOut = TweenMax.to(this.mesh.scale, this.animation.durationOut, {x: 1, y: 1, z: 1, delay: this.animation.durationIn, ease: this.animation.easeOut})

		this._tweens.rotationIn = TweenMax.fromTo(
			this.mesh.rotation,
			this.animation.durationIn,
			{z: 0, ease: this.animation.easeIn},
			{z: Math.PI/2, ease: this.animation.easeIn}
		);
		this._tweens.rotationOut = TweenMax.fromTo(
			this.mesh.rotation,
			this.animation.durationOut,
			{z: Math.PI/2, delay: this.animation.durationIn, ease: this.animation.easeOut},
			{z: Math.PI, delay: this.animation.durationIn, ease: this.animation.easeOut}
		);
	}

	destroy(scene) {
		scene.remove(this.mesh);
	}

	update() {

	}


	// --- private ---
	_init() {
		this.mesh = new THREE.Mesh( this.geometry, this.material );
		this.mesh.position.set(this._position.x, this._position.y, this._position.z);
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
	}
}