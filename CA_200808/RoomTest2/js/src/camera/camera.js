// import * as THREE from '../../libs/three.module.js';

export class Camera extends THREE.PerspectiveCamera{
  /**
   * コンストラクターです。
   * @constructor
   */
  constructor() {

    
    // super(45, window.innerWidth / window.innerHeight, 10, 500);
    super(90, window.innerWidth / window.innerHeight, 1, 500);//fov広い方が遠近感出る

    // this._easing = this._easing.bind(this);

    this.camPos = new THREE.Vector3(0, 20, 150);
    // this.camPos = new THREE.Vector3(-14, -16, 443);//真後ろひき
    // this.camPos = new THREE.Vector3(88, -123, 467);//右後方ひき
    // this.camPos = new THREE.Vector3(-184, -84, 39);//左横ひき
    // this.camPos = new THREE.Vector3(11, -78, 86);//下アップ
    // this.camPos = new THREE.Vector3(37, -78, 16);//上アップ

    this.position.set(this.camPos.x,this.camPos.y,this.camPos.z);


    // this.frame =0;

    // // this.camPos = new THREE.Vector3(14, -16, 0);
    // // this.camTarget = new THREE.Vector3(88, -123, 0);

    // this.camPos = new THREE.Vector3(-14, 16, 443);
    // this.camTarget = new THREE.Vector3(-88, 123, 467);

  }



  /**
   * 毎フレームの更新をかけます。
   */
  update() {


    // this.frame += 1;
    // // this.camPos += (this.camTarget - this.camPos)*0.02;
    // this.camPos.x += (this.camTarget.x - this.camPos.x)*0.01;
    // this.camPos.y += (this.camTarget.y - this.camPos.y)*0.01;
    // this.camPos.z += (this.camTarget.z - this.camPos.z)*0.01;

    // this.position.set(this.camPos.x,this.camPos.y,this.camPos.z);


    // // 原点に注目
    // // this.lookAt(new THREE.Vector3(-50, -50, 0));//これ大事！！！！
    this.lookAt(new THREE.Vector3(0, 0, 0));//これ大事！！！！

    // if(this.frame% 300 == 0){
    //   // this.camTarget = new THREE.Vector3(
    //   //   (2*Math.random()-1)*-100,
    //   //   (Math.random())*-100,
    //   //   Maf.randomInRange( 200, -200)
    //   // );//-150~150
    //   // this.camPos = new THREE.Vector3(this.position.x, this.position.y, this.position.z);

    //   this.camTarget = new THREE.Vector3(
    //     (2*Math.random()-1)*100,
    //     (Math.random())*100,
    //     Maf.randomInRange( 400, 700)
    //   );

    //   this.camPos = new THREE.Vector3(this.position.x, this.position.y, this.position.z);
      
    // }

  }
}