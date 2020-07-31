'use strict'

var container = document.getElementById( 'WebGL-output' );

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, .1, 1000 );
camera.position.set( 0, 0, 200 );



var renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true });
renderer.setClearColor ( 0xffffff, 1.0 );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
container.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls( camera, renderer.domElement );



var clock = new THREE.Clock();

var lines = [];
var resolution = new THREE.Vector2( window.innerWidth, window.innerHeight );
var strokeTexture;

var Params = function() {
	this.curves = true;
	this.amount = 50;
	this.lineWidth = Math.random(0,2);

	// this.dashArray = 0.1;
	this.dashOffset = 0;
	this.dashRatio = 0.7;
	this.taper = 'none';
	this.strokes = false;
	this.sizeAttenuation = true;
	// this.animateWidth = false;
	this.spread = false;
	// this.autoUpdate = true;
	// this.animateVisibility = false;
	this.animateDashOffset = true;
};


window.addEventListener( 'load', function() {
	init();
} );

var params = new Params();

function createCurve(wid) {

	let randomWid = Math.random()*window.innerWidth*0.6;
	console.log(window.innerWidth);
	
	var geometry = new THREE.Geometry();
	for( var i = 0; i < 2; i++ ) {
		geometry.vertices.push( new THREE.Vector3(
			 -window.innerWidth/4+ randomWid,
			 -window.innerHeight/2+ window.innerHeight*i, 0
		));
		// geometry.vertices.push( new THREE.Vector3( -window.innerWidth/5 +(20*wid), window.innerHeight*i, 0));
	}
	return geometry;

}

var colors = [
	0xed6a5a,
	0xf4f1bb,
	0x9bc1bc,
	0x5ca4a9,
	0xe6ebe0,
	0xf0b67f,
	0xfe5f55,
	0xd6d1b1,
	0xc7efcf,
	0xeef5db,
	0x50514f,
	0xf25f5c,
	0xffe066,
	0x247ba0,
	0x70c1b3
];

var lineWidths = [];
for(let i =0; i< params.amount; i++){
	let wid = (~~(Math.random()*10))*0.1;
	// console.log(wid);
	lineWidths.push(wid);
}

var dashArrays = [];
for(let i =0; i< params.amount; i++){
	let arrays= 0.3+((~~(Math.random()*60))*0.01);
	console.log(arrays);
	dashArrays.push(arrays);
}


var dashOffsets = [];
for(let i =0; i< params.amount; i++){
	let offs= (~~(Math.random()*60))*0.0001;
	// console.log(offs);
	dashOffsets.push(offs);
}


function clearLines() {

	lines.forEach( function( l ) {
		scene.remove( l );
	} );
	lines = [];

}

function makeLine( geo ) {

	var g = new MeshLine();

	switch( params.taper ) {
		case 'none': g.setGeometry( geo ); break;
	}

	var material = new MeshLineMaterial( {
		// map: strokeTexture,
		useMap: params.strokes,
		color: new THREE.Color( colors[ ~~Maf.randomInRange( 0, colors.length ) ] ),
		opacity: 1,
		dashArray: dashArrays[ ~~Maf.randomInRange( 0, dashArrays.length ) ],
		dashOffset: dashOffsets[ ~~Maf.randomInRange( 0, dashOffsets.length ) ],
		dashRatio: params.dashRatio,
		// resolution: resolution,
		// sizeAttenuation: params.sizeAttenuation,
		// lineWidth: params.lineWidth,
		lineWidth: lineWidths[ ~~Maf.randomInRange( 0, lineWidths.length ) ],
		// near: camera.near,
		// far: camera.far,
		// depthWrite: false,
		// depthTest: !params.strokes,
		// alphaTest: params.strokes ? .5 : 0,
		transparent: true,
		side: THREE.DoubleSide
	});

	var mesh = new THREE.Mesh( g.geometry, material );


	scene.add( mesh );

	lines.push( mesh );

}

function init() {

	createLines();
	onWindowResize();
	render();

}

function createLine(j) {
	if( params.curves ) makeLine( createCurve(j) );
}

function createLines() {
	for( var j = 0; j < params.amount; j++ ) {
		createLine(j);
	}
}


function onWindowResize() {

	var w = container.clientWidth;
	var h = container.clientHeight;

	camera.aspect = w / h;
	camera.updateProjectionMatrix();

	renderer.setSize( w, h );

	resolution.set( w, h );

}

window.addEventListener( 'resize', onWindowResize );

var tmpVector = new THREE.Vector3();

function render(time) {

	requestAnimationFrame( render );
	controls.update();

	// var delta = clock.getDelta();
	// var t = clock.getElapsedTime();
	lines.forEach( function( l, i ) {
		// if( params.animateWidth ) l.material.uniforms.lineWidth.value = params.lineWidth * ( 1 + .5 * Math.sin( 5 * t + i ) );
		// if( params.autoRotate ) l.rotation.y += .125 * delta;
		// 	l.material.uniforms.visibility.value= params.animateVisibility ? (time/3000) % 1.0 : 1.0;
			
		l.material.uniforms.dashOffset.value += params.animateDashOffset ? 0.01 : 0;
	} );

	renderer.render( scene, camera );

}
