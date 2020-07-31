import * as THREE from '../libs/three.module.js';
// import {Camera} from '../camera/camera.js';
import Line from '../objects/manyLine.js';

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

        //ライン
        this.line = new Line();
        this.add(this.line);


    }

    update(){


        //カメラ
        // this.camera.update();
        this.camera.lookAt(new THREE.Vector3(0,0,0));

        //ライン
        this.line.update();


    }

    draw(){



    }

}



// var clock = new THREE.Clock();

// var lines = [];
// var resolution = new THREE.Vector2( window.innerWidth, window.innerHeight );
// var strokeTexture;

// var Params = function() {
//     this.curves = true;
//     this.amount = 50;
//     this.lineWidth = Math.random(0,2);

//     // this.dashArray = 0.1;
//     this.dashOffset = 0;
//     this.dashRatio = 0.7;
//     this.taper = 'none';
//     this.strokes = false;
//     this.sizeAttenuation = true;
//     // this.animateWidth = false;
//     this.spread = false;
//     // this.autoUpdate = true;
//     // this.animateVisibility = false;
//     this.animateDashOffset = true;
// };





// this.params = new Params();

// window.addEventListener( 'load', function() {

// init();
// } );


// function createCurve(wid) {

// let randomWid = Math.random()*window.innerWidth*0.6;
// console.log(window.innerWidth);

// var geometry = new THREE.Geometry();
// for( var i = 0; i < 2; i++ ) {
//     geometry.vertices.push( new THREE.Vector3(
//         -window.innerWidth/4+ randomWid,
//         -window.innerHeight/2+ window.innerHeight*i, 0
//     ));
//     // geometry.vertices.push( new THREE.Vector3( -window.innerWidth/5 +(20*wid), window.innerHeight*i, 0));
// }
// return geometry;

// }

// var colors = [
// 0xed6a5a,
// 0xf4f1bb,
// 0x9bc1bc,
// 0x5ca4a9,
// 0xe6ebe0,
// 0xf0b67f,
// 0xfe5f55,
// 0xd6d1b1,
// 0xc7efcf,
// 0xeef5db,
// 0x50514f,
// 0xf25f5c,
// 0xffe066,
// 0x247ba0,
// 0x70c1b3
// ];

// var lineWidths = [];
// for(let i =0; i< this.params.amount; i++){
// let wid = (~~(Math.random()*10))*0.1;
// // console.log(wid);
// lineWidths.push(wid);
// }

// var dashArrays = [];
// for(let i =0; i< this.params.amount; i++){
// let arrays= 0.3+((~~(Math.random()*60))*0.01);
// console.log(arrays);
// dashArrays.push(arrays);
// }


// var dashOffsets = [];
// for(let i =0; i< this.params.amount; i++){
// let offs= (~~(Math.random()*60))*0.0001;
// // console.log(offs);
// dashOffsets.push(offs);
// }


// function clearLines() {

// this.lines.forEach( function( l ) {
//     scene.remove( l );
// } );
// this.lines = [];

// }

// function makeLine( geo ) {

// var g = new MeshLine();

// switch( this.params.taper ) {
//     case 'none': g.setGeometry( geo ); break;
// }

// var material = new MeshLineMaterial( {
//     // map: strokeTexture,
//     useMap: this.params.strokes,
//     color: new THREE.Color( colors[ ~~Maf.randomInRange( 0, colors.length ) ] ),
//     opacity: 1,
//     dashArray: dashArrays[ ~~Maf.randomInRange( 0, dashArrays.length ) ],
//     dashOffset: dashOffsets[ ~~Maf.randomInRange( 0, dashOffsets.length ) ],
//     dashRatio: this.params.dashRatio,
//     // resolution: resolution,
//     // sizeAttenuation: this.params.sizeAttenuation,
//     // lineWidth: this.params.lineWidth,
//     lineWidth: lineWidths[ ~~Maf.randomInRange( 0, lineWidths.length ) ],
//     // near: camera.near,
//     // far: camera.far,
//     // depthWrite: false,
//     // depthTest: !this.params.strokes,
//     // alphaTest: this.params.strokes ? .5 : 0,
//     transparent: true,
//     side: THREE.DoubleSide
// });

// var mesh = new THREE.Mesh( g.geometry, material );


// scene.add( mesh );

// this.lines.push( mesh );

// }

// function init() {

// createLines();
// onWindowResize();
// render();

// }

// function createLine(j) {
// if( this.params.curves ) makeLine( createCurve(j) );
// }

// function createLines() {
// for( var j = 0; j < this.params.amount; j++ ) {
//     createLine(j);
// }
// }


// var tmpVector = new THREE.Vector3();






// this.lines.forEach( function( l, i ) {
//     // if( this.params.animateWidth ) l.material.uniforms.lineWidth.value = this.params.lineWidth * ( 1 + .5 * Math.sin( 5 * t + i ) );
//     // if( this.params.autoRotate ) l.rotation.y += .125 * delta;
//     // 	l.material.uniforms.visibility.value= this.params.animateVisibility ? (time/3000) % 1.0 : 1.0;
        
//     l.material.uniforms.dashOffset.value += this.params.animateDashOffset ? 0.01 : 0;
// } );
