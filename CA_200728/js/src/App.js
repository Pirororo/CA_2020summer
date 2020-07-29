import * as THREE from '../libs/three.module.js';
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
    // this.cameraChange = this.cameraChange.bind(this);
    // this.handleMouseMove = this.handleMouseMove.bind(this);
    this._resize = this._resize.bind(this);

    // DOM
    this._wrapper = document.getElementById('WebGL-output');//あれ？#いらない？canvasじゃなくてdivタグにかいてるのはなぜ？

    // マウス座標管理用のベクトルを作成
    this.mouse = new THREE.Vector2();
    
    // シーン
    this._scene = sceneInstance;

    //カメラ
    this.orbitControls = new THREE.OrbitControls(this._scene.camera);
    this.orbitControls.autoRotate = false;

    //レンダラー
    this._renderer = new THREE.WebGLRenderer({ antialias: false });//？
    this._renderer.setClearColor(0x000000);
    this._renderer.setPixelRatio(1);
    this._wrapper.appendChild(this._renderer.domElement);//'app'のタグ内にレンダラーのdomElementを追加する

    // リサイズ
    this._resize();
    window.addEventListener('resize', this._resize);


    // ////カラーチェンジ：[box]と[car] 成功。meshListをroomBasic内でつくることに成功。
    // // // マウスとの交差を調べたいものは配列に格納する
    // this.meshList = this._scene._roombasic.meshList;
    // this.meshList.push(this._scene._car.body);
    // this.meshList.push(this._scene._car2.body);
    // // this.meshList.push(this._scene._car3.body);
    // console.log(this.meshList.length);//22個


    // // レイキャストを作成
    // this.raycaster = new THREE.Raycaster();


    // window.addEventListener('mousemove', this.handleMouseMove);

    // window.addEventListener('click', this.cameraChange, false);

    // フレーム毎の更新
    this._update();

    console.log("ok");



    // this.camSwitch = "mainCam";

  }




  /**
     * フレーム毎の更新をします。
     */
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

    var delta = this.clock.getDelta();
    this.orbitControls.update(delta);



    // // レイキャスト = マウス位置からまっすぐに伸びる光線ベクトルを生成
    // this.raycaster.setFromCamera(this.mouse, this._scene.camera);

    // // その光線とぶつかったオブジェクトを得る
    // const intersects = this.raycaster.intersectObjects(this.meshList);
    // console.log(intersects.length);


    // this.meshList.map(mesh => {
    //   // 交差しているオブジェクトが1つ以上存在し、
    //   // 交差しているオブジェクトの1番目(最前面)のものだったら
    //   if (intersects.length > 0 && mesh === intersects[0].object) {
    //     mesh.material.transparent = true;
    //     mesh.material.opacity = 0.8;
    //   } else {
    //     mesh.material.transparent = true;
    //     mesh.material.opacity = 0.4;
    //   }
    // });

  }

  /**
  * マウスイベント
  */
  // handleMouseMove( event ) {
  //   // calculate mouse position in normalized device coordinates
  //   // (-1 to +1) for both components
  //   this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  //   this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  // }

  // cameraChange() {

  //   console.log("okClick");

  //   if(this.camSwitch == "mainCam"){
  //     // レイキャスト = マウス位置からまっすぐに伸びる光線ベクトルを生成
  //     this.raycaster.setFromCamera(this.mouse, this._scene.camera);

  //     // その光線とぶつかったオブジェクトを得る
  //     const intersects = this.raycaster.intersectObjects(this.meshList);
  //     console.log(intersects.length);


  //     this.meshList.map( mesh => {
  //       // 交差しているオブジェクトが1つ以上存在し、
  //       // 交差しているオブジェクトの1番目(最前面)のものだったら
  //       if (intersects.length > 0 && mesh === intersects[0].object) {

  //         if (mesh == this._scene._car.body){

  //           this.camSwitch = "moveCam";

  //         }else{

  //           this.camSwitch = "roomCam";

  //           // this._scene.roomCamera.position.copy(intersects[0].object);
  //           // //上のやつをsetつかうときは下のように取り出してかく
  //           this._scene.roomCamera.position.set(
  //             intersects[0].object.getWorldPosition().x,
  //             intersects[0].object.getWorldPosition().y,
  //             intersects[0].object.getWorldPosition().z
  //           );

  //           this._scene.roomCamera.position.y += 5;
  //           // this._scene.roomCamera.position.z += 15;

  //           // this._scene.roomCamera.lookAt(
  //           //   new THREE.Vector3(intersects[0].object.maru)
  //           // );
  //           this._scene.roomCamera.lookAt(new THREE.Vector3(0,0,0));

  //           // this._scene.roomCamera.lookAt(
  //           //   intersects[0].object.position.x,
  //           //   intersects[0].object.position.y,
  //           //   intersects[0].object.position.z
  //           // );

  //         }

  //         console.log("okCamera");
  //       }
  //     });

  //   }else{

  //     this.camSwitch = "mainCam";
  //   }
  
  // }

  // // ワールド座標を取得
  // const world = targetMesh.getWorldPosition();

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


// // import * as THREE from '../libs/three.module.js';

// /**
//  * メインアプリクラスです。
//  */
// export class App{
// //  export default class App{
//     /**
//    * @constructor
//    * @param sceneInstance
//    */
//   constructor(sceneInstance){
//     //この中からconstructer外部のmethodを呼び出すためにはbindする必要がある
//     this._update = this._update.bind(this);
//     this._resize = this._resize.bind(this);

//     // シーン
//     this._scene = sceneInstance;

//     //レンダラー
//     // this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     // this._renderer.setClearColor(new THREE.Color(0x000000));
//     // this._renderer.setSize(window.innerWidth, window.innerHeight);
//     // this._renderer.setPixelRatio(1);

//         // DOM
//         // this._wrapper = document.getElementById('app');
//     this._renderer = new THREE.WebGLRenderer({ antialias: false });//？
//     this._renderer.setClearColor(0x000000);
//     this._renderer.setPixelRatio(1);
//     // this._wrapper.appendChild(this._renderer.domElement);//

//     // DOMを追加
//     this._wrapper = document.getElementById('WebGL-output').appendChild(this._renderer.domElement);

//     // リサイズ
//     this._resize();
//     window.addEventListener('resize', this._resize);

//     // // シェーダー
//     // //レンダーパス
//     // var renderPass = new THREE.RenderPass(this._scene, this._scene.camera);
//     // renderPass.clear = true;//Lineは線が更新されていくのでtrueにする、falseだと線最初から全部のこっちゃう


//     // //出力パス
//     // //コピーパス
//     // var effectCopy = new THREE.ShaderPass(THREE.CopyShader);//コピー
//     // effectCopy.renderToScreen = true;

//     // //コンポーザーの定義
//     // this.composer = new THREE.EffectComposer(this._renderer);
//     // this.composer.renderTarget1.stencilBuffer = true;//?

//     // //コンポーザーに入れていく
//     // this.composer.addPass(renderPass);
//     // this.composer.addPass(effectCopy);


//     // フレーム毎の更新
//     this._update();

//   }


//   /**
//   * フレーム毎の更新をします。
//   */
//   _update() {

//     // this._renderer.autoClear = false;//これ大事〜！trueだと色が毎回背景白にクリアされちゃう

//     // シーンの更新
//     this._scene.update();
//     this._scene.draw();

//     requestAnimationFrame(this._update);
//     this._renderer.render(this._scene, this._scene.camera);
//     // this.composer.render();

//   }

//   /**
//    * リサイズ
//    */
//   _resize() {
//     const width = this._wrapper.clientWidth;
//     const height = this._wrapper.clientHeight;
//     this._renderer.domElement.setAttribute('width', String(width));
//     this._renderer.domElement.setAttribute('height', String(height));
//     this._renderer.setPixelRatio(window.devicePixelRatio || 1.0);
//     this._renderer.setSize(width, height);
//     this._scene.camera.aspect = width / height;
//     this._scene.camera.updateProjectionMatrix();
//   }

// }