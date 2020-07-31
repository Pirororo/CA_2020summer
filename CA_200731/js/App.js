'use strict'
import * as THREE from './libs/three.module.js';
/**
 * メインアプリクラスです。
 */

export class App{
//  export default class App{
    /**
   * @constructor
   * @param sceneInstance
   */
	constructor(sceneInstance){


		this._update = this._update.bind(this);
		this._resize = this._resize.bind(this);
	
		// DOM
		this._wrapper = document.getElementById('WebGL-output');//あれ？#いらない？canvasじゃなくてdivタグにかいてるのはなぜ？
	
		// // マウス座標管理用のベクトルを作成
		// this.mouse = new THREE.Vector2();
		
		// シーン
		this._scene = sceneInstance;
	
		//レンダラー
		this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		this._renderer.setClearColor(0xffffff, 1.0 );
		this._renderer.setSize( window.innerWidth, window.innerHeight );
		this._renderer.setPixelRatio( window.devicePixelRatio );
		// this._renderer.setPixelRatio(1);
		this._wrapper.appendChild(this._renderer.domElement);//'app'のタグ内にレンダラーのdomElementを追加する

		// //カメラ
		// this.orbitControls = new THREE.OrbitControls(this._scene.camera, this._renderer.domElement);

		// リサイズ
		this._resize();
		window.addEventListener('resize', this._resize);


	

	this.params = new Params();

	window.addEventListener( 'load', function() {
		
		init();
	} );

	
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
	for(let i =0; i< this.params.amount; i++){
		let wid = (~~(Math.random()*10))*0.1;
		// console.log(wid);
		lineWidths.push(wid);
	}

	var dashArrays = [];
	for(let i =0; i< this.params.amount; i++){
		let arrays= 0.3+((~~(Math.random()*60))*0.01);
		console.log(arrays);
		dashArrays.push(arrays);
	}


	var dashOffsets = [];
	for(let i =0; i< this.params.amount; i++){
		let offs= (~~(Math.random()*60))*0.0001;
		// console.log(offs);
		dashOffsets.push(offs);
	}


	function clearLines() {

		this.lines.forEach( function( l ) {
			scene.remove( l );
		} );
		this.lines = [];

	}

	function makeLine( geo ) {

		var g = new MeshLine();

		switch( this.params.taper ) {
			case 'none': g.setGeometry( geo ); break;
		}

		var material = new MeshLineMaterial( {
			// map: strokeTexture,
			useMap: this.params.strokes,
			color: new THREE.Color( colors[ ~~Maf.randomInRange( 0, colors.length ) ] ),
			opacity: 1,
			dashArray: dashArrays[ ~~Maf.randomInRange( 0, dashArrays.length ) ],
			dashOffset: dashOffsets[ ~~Maf.randomInRange( 0, dashOffsets.length ) ],
			dashRatio: this.params.dashRatio,
			// resolution: resolution,
			// sizeAttenuation: this.params.sizeAttenuation,
			// lineWidth: this.params.lineWidth,
			lineWidth: lineWidths[ ~~Maf.randomInRange( 0, lineWidths.length ) ],
			// near: camera.near,
			// far: camera.far,
			// depthWrite: false,
			// depthTest: !this.params.strokes,
			// alphaTest: this.params.strokes ? .5 : 0,
			transparent: true,
			side: THREE.DoubleSide
		});

		var mesh = new THREE.Mesh( g.geometry, material );


		scene.add( mesh );

		this.lines.push( mesh );

	}

	function init() {

		createLines();
		onWindowResize();
		render();

	}

	function createLine(j) {
		if( this.params.curves ) makeLine( createCurve(j) );
	}

	function createLines() {
		for( var j = 0; j < this.params.amount; j++ ) {
			createLine(j);
		}
	}



	window.addEventListener( 'resize', this._resize );

	var tmpVector = new THREE.Vector3();

	this._update();

	}



	_update() {

		requestAnimationFrame(this._update);
		// シーンの更新
		this._scene.update();
		// 描画
		
		// if(this.camSwitch == "mainCam"){
		this._renderer.render(this._scene, this._scene.camera);
		// }else if(this.camSwitch == "roomCam"){
		//   this._renderer.render(this._scene, this._scene.roomCamera);
		// }else if(this.camSwitch == "moveCam"){
		//   this._renderer.render(this._scene, this._scene.moveCamera);
		// }

		// var delta = this.clock.getDelta();
		// this.orbitControls.update(delta);




		// var delta = clock.getDelta();
		// var t = clock.getElapsedTime();
		this.lines.forEach( function( l, i ) {
			// if( this.params.animateWidth ) l.material.uniforms.lineWidth.value = this.params.lineWidth * ( 1 + .5 * Math.sin( 5 * t + i ) );
			// if( this.params.autoRotate ) l.rotation.y += .125 * delta;
			// 	l.material.uniforms.visibility.value= this.params.animateVisibility ? (time/3000) % 1.0 : 1.0;
				
			l.material.uniforms.dashOffset.value += this.params.animateDashOffset ? 0.01 : 0;
		} );

	}

	_resize() {
		const width = this._wrapper.clientWidth;
		const height = this._wrapper.clientHeight;
		this._renderer.domElement.setAttribute('width', String(width));
		this._renderer.domElement.setAttribute('height', String(height));
		this._renderer.setPixelRatio(window.devicePixelRatio || 1.0);
		this._renderer.setSize(width, height);
		this._scene.camera.aspect = width / height;
		this._scene.camera.updateProjectionMatrix();
	}

}