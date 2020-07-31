'use strict'

var container = document.getElementById( 'container' );

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, .1, 1000 );
camera.position.set( 0, 0, -200 );


// var camera = new THREE.OrthographicCamera(
// 	-window.innerWidth /2, 
// 	window.innerWidth /2,
// 	window.innerHeight /2,
// 	-window.innerHeight /2, .1, 1000
// );

// var camera = new THREE.OrthographicCamera(
// 	-400, 
// 	400,
// 	200,
// 	-200, .1, 1000
// );
// camera.position.set( 0, 0, -500 );



var renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true });
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
	// this.circles = false;
	this.amount = 10;
	// this.lineWidth = 0.5;
	this.lineWidth = Math.random(0,1);

	this.dashArray = 0.1;
	this.dashOffset = 0;
	this.dashRatio = 0.5;
	// this.taper = 'parabolic';
	this.taper = 'none';
	this.strokes = false;
	this.sizeAttenuation = true;
	// this.animateWidth = false;
	this.spread = false;
	// this.autoRotate = true;
	this.autoUpdate = true;
	// this.animateVisibility = false;
	this.animateDashOffset = true;
	this.update = function() {
		clearLines();
		createLines();
	}
};


var params = new Params();
var gui = new dat.GUI();

window.addEventListener( 'load', function() {

	function update() {
		if( params.autoUpdate ) {
			clearLines();
			createLines();
		}
	}

	gui.add( params, 'curves' ).onChange( update );
	// gui.add( params, 'circles' ).onChange( update );
	gui.add( params, 'amount', 1, 100 ).onChange( update );
	// gui.add( params, 'lineWidth', 0.01, 5 ).onChange( update );
	gui.add( params, 'dashArray', 0, 3 ).onChange( update );
	gui.add( params, 'dashRatio', 0, 1 ).onChange( update );
	// gui.add( params, 'taper', [ 'none', 'linear', 'parabolic', 'wavy' ] ).onChange( update );
	
	// gui.add( params, 'autoUpdate' ).onChange( update );
	gui.add( params, 'update' );
	gui.add( params, 'strokes' ).onChange( update );
	// gui.add( params, 'sizeAttenuation' ).onChange( update );
	// gui.add( params, 'animateWidth' );
	gui.add( params, 'spread' );
	// gui.add( params, 'autoRotate' );
	// gui.add( params, 'animateVisibility' );
	// gui.add( params, 'animateDashOffset' );

	// var loader = new THREE.TextureLoader();
	// loader.load( 'assets/stroke.png', function( texture ) {
	// 	strokeTexture = texture;
		init()
	// } );

} );



function createCurve(wid) {

 	var geometry = new THREE.Geometry();
	for( var i = 0; i < 2; i++ ) {
		geometry.vertices.push( new THREE.Vector3( 10*wid, window.innerHeight*i, 0));
	}
	return geometry;

}

// function createCurve() {

// 	var geometry = new THREE.Geometry();
//    for( var i = 0; i < 2; i++ ) {
// 	   geometry.vertices.push( new THREE.Vector3( 0, -350*i, 0));
//    }
//    return geometry;

// }

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
	console.log(wid);
	lineWidths.push(wid);
}

var dashOffsets = [];
for(let i =0; i< params.amount; i++){
	let offs= (~~(Math.random()*60))*0.01;
	console.log(offs);
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
		// color: new THREE.Color(colors[0]),
		opacity: 1,
		dashArray: params.dashArray,
		// dashArray: dashOffsets[ ~~Maf.randomInRange( 0, dashOffsets.length ) ],
		dashOffset: params.dashOffset,
		// dashOffset: dashOffsets[ ~~Maf.randomInRange( 0, dashOffsets.length ) ]*0.01,
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


	// let meshGroup = new THREE.Group();
	// for(let i ; i < params.amount; i++){
	// 	var mesh = new THREE.Mesh( g.geometry, material );
	// 	mesh.position.set( 10*i, 0, 0);
	// 	meshGroup.add(mesh);
	// }
	// scene.add(meshGroup);



	// if( params.spread || params.circles ) {
	// 	var r = 50;
	// 	mesh.position.set( Maf.randomInRange( -r, r ), Maf.randomInRange( -r, r ), Maf.randomInRange( -r, r ) );
	// 	var s = 10 + 10 * Math.random();
	// 	mesh.scale.set( s,s,s );
	// 	mesh.rotation.set( Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI );
	// }
	scene.add( mesh );

	lines.push( mesh );

}

function init() {

	createLines();
	onWindowResize();
	render();

}

function createLine(j) {
	// if( params.circles ) makeLine( hexagonGeometry );
	if( params.curves ) makeLine( createCurve(j) );
	//makeLine( makeVerticalLine() );
	//makeLine( makeSquare() );
}

function createLines() {
	for( var j = 0; j < params.amount; j++ ) {
		createLine(j);
	}
}

// function makeVerticalLine() {
// 	var g = new THREE.Geometry()
// 	var x = ( .5 - Math.random() ) * 100;
// 	g.vertices.push( new THREE.Vector3( x, -10, 0 ) );
// 	g.vertices.push( new THREE.Vector3( x, 10, 0 ) );
// 	return g;
// }

// function makeSquare() {
// 	var g = new THREE.Geometry()
// 	var x = ( .5 - Math.random() ) * 100;
// 	g.vertices.push( new THREE.Vector3( -1, -1, 0 ) );
// 	g.vertices.push( new THREE.Vector3( 1, -1, 0 ) );
// 	g.vertices.push( new THREE.Vector3( 1, 1, 0 ) );
// 	g.vertices.push( new THREE.Vector3( -1, 1, 0 ) );
// 	g.vertices.push( new THREE.Vector3( -1, -1, 0 ) );
// 	return g;
// }

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

	var delta = clock.getDelta();
	var t = clock.getElapsedTime();
	lines.forEach( function( l, i ) {
		// if( params.animateWidth ) l.material.uniforms.lineWidth.value = params.lineWidth * ( 1 + .5 * Math.sin( 5 * t + i ) );
		// if( params.autoRotate ) l.rotation.y += .125 * delta;
		// 	l.material.uniforms.visibility.value= params.animateVisibility ? (time/3000) % 1.0 : 1.0;
			
		l.material.uniforms.dashOffset.value += params.animateDashOffset ? 0.001 : 0;
	} );

	renderer.render( scene, camera );

}
