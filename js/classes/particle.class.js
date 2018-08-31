var V2 = vec2.create();

class Particle {
	constructor(context, options){
		this.context = context;
		
		this.position = vec2.create();
		this.velocity = vec2.create();
		this.size = vec2.create();

		this.position[0] = options.position.x || 0
		this.position[1] = options.position.y || 0

		this.velocity[0] = options.velocity.x || 0
		this.velocity[1] = options.velocity.y || 0

		this.size = options.size || 10

		this.color = options.color || "#fff"

		this.note = options.note || 220
	}

	update() {

		vec2.add( this.position, this.position, this.velocity)
		//vec2.add( this.position, this.position, vec2.scale(V2, this.velocity, Math.max(1, deltaTime/16)) )

		//console.log(V2, this.velocity);

		// left border
		if(this.position[0] < 0){
			this.velocity[0] = -this.velocity[0]
			playNote(oscillators.borderLeft, this.note);
		}

		// right border
		if(this.position[0] + this.size > canvasWidth){
			this.velocity[0] = -this.velocity[0]
			playNote(oscillators.borderRight, this.note);	
		}

		// top border
		if(this.position[1] < 0){
			this.velocity[1] = -this.velocity[1]
			playNote(oscillators.borderTop, this.note);
		}

		// bottom border
		if(this.position[1] + this.size > canvasHeight){
			this.velocity[1] = -this.velocity[1]
			playNote(oscillators.borderBottom, this.note);
		}
	}

	draw() {
		var ctx = this.context;
		ctx.save();

		ctx.translate( this.position[0], this.position[1] )
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(0, 0, this.size, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();

		ctx.restore();
	}

}