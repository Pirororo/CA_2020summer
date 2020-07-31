'use strict'
import * as THREE from './libss/three.module.js';
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
	
		// マウス座標管理用のベクトルを作成
		this.mouse = new THREE.Vector2();
		
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


		// this.controls = new THREE.OrbitControls( this._scene.camera, this._renderer.domElement );


		this._update();




	}



	_update() {

		requestAnimationFrame(this._update);
		// シーンの更新
		this._scene.update();
		// 描画
		
	
		this._renderer.render(this._scene, this._scene.camera);
		// var delta = this.clock.getDelta();
		// this.orbitControls.update(delta);
		// this.controls.update();


		// var delta = clock.getDelta();
		// var t = clock.getElapsedTime();

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