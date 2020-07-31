// import * as THREE from '../../libs/three.module.js';
// import {Camera, RoomCamera, MoveCamera} from '../camera/camera.js';
import {Camera} from '../camera/camera.js';
import Line from '../objects/line.js';

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
        this.scene2.add(ambientLight);
        // // this.scene2.add(directionalLight);
        // this.scene2.add(spotLight);
        this.add(this.scene2);

        

    }

    update(){
        // TWEEN.update();
        this.camera.update();//lookAtで中心みてる
        this.scene1.update();
        this.scene2.update();
    }

}

export class Scene1 extends THREE.Scene {

    constructor(){

        super();


        //ライン
        this._line = new Line();
        this._line.position.set(0,0,0);
        this.add(this._line);


        //BOX
        this.body = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 10),
        new THREE.MeshLambertMaterial({
            color: 0xff0000,
        })
        );
        this.body.position.set(0,0,0);
        this.add(this.body);

    }
    
    update(){
        this._line.update();
    }

}

export class Scene2 extends THREE.Scene {

    constructor(){

        super();

        this.init = this.init.bind(this);
        this.createLines = this.createLines.bind(this);
        this.createLine = this.createLine.bind(this);
        // this.Params = this.Params.bind(this);
        this.makeLine = this.makeLine.bind(this);
        this.createCurve = this.createCurve.bind(this);



        //  console.log(positions);//30000個の中身全部[]
        // console.log(positions.length);//30000


        this.lines = [];

        var Params = function(){
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

        this.params = new Params();

        window.addEventListener( 'load', this.init());

    }



    init() {
  
        this.createLines();
        // render();
        // this.update();
      
    }
      
    createLine(j) {
        if( this.params.curves ) this.makeLine( this.createCurve(j) );
    }
      
    createLines() {
        for( var j = 0; j < this.params.amount; j++ ) {
            this.createLine(j);
        }
    }
    
    //  clearLines() {
  
    //     this.lines.forEach( function( l ) {
    //       scene.remove( l );
    //     } );
    //     this.lines = [];
      
    //   }
      
    makeLine( geo ) {

        this.g = new MeshLine();

        switch( this.params.taper ) {
            case 'none': this.g.setGeometry( geo ); break;
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
            // console.log(arrays);
            dashArrays.push(arrays);
        }
        
        var dashOffsets = [];
        for(let i =0; i< this.params.amount; i++){
            let offs= (~~(Math.random()*60))*0.0001;
            // console.log(offs);
            dashOffsets.push(offs);
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


        var mesh = new THREE.Mesh( this.g.geometry, material );

        this.add( mesh );
    
        this.lines.push( mesh );

    }

    createCurve(wid) {
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


    update(){
        // var delta = clock.getDelta();
        // var t = clock.getElapsedTime();
        this.lines.forEach( function( l, i ) {
            // if( params.animateWidth ) l.material.uniforms.lineWidth.value = params.lineWidth * ( 1 + .5 * Math.sin( 5 * t + i ) );
            // if( params.autoRotate ) l.rotation.y += .125 * delta;
            // 	l.material.uniforms.visibility.value= params.animateVisibility ? (time/3000) % 1.0 : 1.0;
            
            l.material.uniforms.dashOffset.value += 0.01;
        } );

        // console.log(this.lines.length);

    }

}