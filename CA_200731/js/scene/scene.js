// import * as THREE from '../../libs/three.module.js';
// import {Camera} from '../camera/camera.js';
// import Line from '../objects/line2.js';

/**
 * シーンクラス：カメラとbox
 */
export class Scene extends THREE.Scene {

    constructor(){

        super();

        this.frame = 0;
        this.scene = 0;

        //ライト
        // 環境光源
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
        this.add(ambientLight);

        // //カメラ
        // this.camera = new Camera();//thisにすること！！！最終的にはgame2.jsでsceneにaddする
        // this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

        this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, .1, 1000 );
        this.camera.position.set( 0, 0, 200 );

        // this.nowCamPos = new THREE.Vector3(0, 0, 100);
        // this.position.set(this.nowCamPos.x, this.nowCamPos.y, this.nowCamPos.z);
        // this.nowCamLook = new THREE.Vector3(0, 0, 0);
        // this.lookAt(this.nowCamLook.x, this.nowCamLook.y, this.nowCamLook.z);

        // //ライン
        // this.line = new Line();
        // this.add(this.line);


    }

    update(){


        //カメラ
        // this.camera.update();
        this.camera.lookAt(new THREE.Vector3(0,0,0));

        // //ライン
        // this.line.update();


    }

    draw(){



    }

}

