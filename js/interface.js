const menu = document.querySelector('.menu-burger');
const controls = document.querySelector('.controls');
const statsContainer = document.querySelector('.stats-container');

menu.addEventListener('click', function(){
	this.classList.toggle('menu-burger--is-active');
	controls.classList.toggle('visible');
});