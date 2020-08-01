// import * as THREE from '../../libs/three.module.js';
// import {Camera, RoomCamera, MoveCamera} from '../camera/camera.js';
import {Camera} from '../camera/camera.js';
import ManyLine from '../objects/ManyLine.js';

/**
 * シーンクラス：カメラとライト
 */
export class Scene extends THREE.Scene {

    constructor(){

        super();

        this.camera = new Camera();//thisにすること！！！最終的にはgame2.jsでsceneにaddする

        // 環境光源
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        // this.add(ambientLight);

        // 平行光源
        // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        // this.add(directionalLight);

        //スポットライト
        // add spotlight for the shadows
        var spotLight = new THREE.SpotLight(0xffffff);
        // spotLight.castShadow = true;
        spotLight.position.set(80, 60, 50);
        spotLight.intensity = 1;
        // spotLight.shadow.mapSize.width = 2048;
        // spotLight.shadow.mapSize.height = 2048;
        // spotLight.shadow.camera.fov = 120;
        // spotLight.shadow.camera.near = 1;
        // spotLight.shadow.camera.far = 1000;
        // this.add(spotLight);

        //シェーダーのエフェクトをマスクするためシーン２種類にわけた
        this.scene1 = new Scene1();
        this.add(this.scene1);

        this.scene2 = new Scene2();
        // this.scene2.add(ambientLight);
        // // this.scene2.add(directionalLight);
        // this.scene2.add(spotLight);
        this.add(this.scene2);

        

    }

    update(){
        // TWEEN.update();
        // this.camera.update();//lookAtで中心みてる
        this.scene1.update();
        this.scene2.update();
    }

}

export class Scene1 extends THREE.Scene {

    constructor(){

        super();


        // //ライン
        // this._line = new Line();
        // this._line.position.set(0,0,0);
        // this.add(this._line);


        // //BOX
        // this.body = new THREE.Mesh(
        // new THREE.BoxGeometry(10, 10, 10),
        // new THREE.MeshLambertMaterial({
        //     color: 0xff0000,
        // })
        // );
        // this.body.position.set(0,0,0);
        // this.add(this.body);

    }
    
    update(){
        // this._line.update();
    }

}

export class Scene2 extends THREE.Scene {

    constructor(){

        super();

        //複数線
        this._manyLine = new ManyLine();
        // this._manyLine.set(0,0,0);
        this.add(this._manyLine);

    }

    update(){
        this._manyLine.update();
    }
}