// import * as THREE from '../libs/three.module.js';

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
      //この中からconstructer外部のmethodを呼び出すためにはbindする必要がある
      this._update = this._update.bind(this);
      this._resize = this._resize.bind(this);
  
      // シーン
      this._scene = sceneInstance;
  
      //レンダラー
      this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this._renderer.setClearColor(new THREE.Color(0xffffff), 1.0);
      this._renderer.setSize(window.innerWidth, window.innerHeight);
      this._renderer.setPixelRatio(1);
  
      // DOMを追加
      this._wrapper = document.getElementById('WebGL-output').appendChild(this._renderer.domElement);

      this.control = new THREE.OrbitControls(this._scene.camera);
  
      // リサイズ
      this._resize();
      window.addEventListener('resize', this._resize);
  
  
      // フレーム毎の更新
      this._update();
  
    }
  
  
    /**
    * フレーム毎の更新をします。
    */
    _update() {
  
      this._renderer.autoClear = false;//これ大事〜！trueだと色が毎回背景白にクリアされちゃう
  
      // シーンの更新
      this._scene.update();
      // this._scene.draw();
  
      requestAnimationFrame(this._update);
      this._renderer.render(this._scene, this._scene.camera);
  
    }
  
    /**
     * リサイズ
     */
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


