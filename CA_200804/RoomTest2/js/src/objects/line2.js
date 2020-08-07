// import {MeshLine, MeshLineMaterial} from "three.meshline";
// import * as THREE from "three";


export default class Line extends THREE.Object3D {

    /**
    * コンストラクターです。
    * @constructor
    */
    constructor(where,inout){
        super();
        
        this.frame = 0;
        this.updateBool = false;


        //シェーダー用
        this.matTime = 0;
        this.matTimeSpeed = 3;

        // var strokeTexture;

        this.createLines = this.createLines.bind(this);
        this.prepareMesh = this.prepareMesh.bind(this);
        this.checkIntersection = this.checkIntersection.bind(this);
        // this.createMeshMaterial_Grade = this.createMeshMaterial_Grade.bind(this);
        // this.getlineLength = this.getlineLength.bind(this);


        // this.lineLength = 0;
        this.angle = 0;

        let Params = function(){
            this.strokes = false;
            this.curves = true;
            this.amount = 20;
            this.lineWidth = Maf.randomInRange( 0.2, 1.3);
            // this.opacity = Maf.randomInRange( 0.6, 1.0);
            this.opacity = 1.0;
            
            this.dashArray = Maf.randomInRange(0.8, 1.5);
            this.dashOffset = Maf.randomInRange(0.0, 1.0);//(~~(Math.random()*60))*0.0001;
            this.dashRatio = 0.2;
            this.taper = 'none';
            this.strokes = false;
            this.sizeAttenuation = true;
            
            // this.animateWidth = false;
            this.spread = false;
            // this.autoUpdate = true;//これ、DATでいれた値を反映させるのに大事！！！
            // this.animateVisibility = false;
            this.animateDashOffset = true;
        };

        this.params = new Params();

        // this.createMeshMaterial_Grade();
        this.createLines();

    }

    createLines() {
            this.prepareMesh();
    }


    prepareMesh() {

        var geo = new Float32Array( 50 * 3 );//点は200個
        for( var j = 0; j < geo.length; j += 3 ) {
            geo[ j ] = geo[ j + 1 ] = geo[ j + 2 ] = 0;//最初の点の位置。全部いれてる
        }

        var g = new MeshLine();
        g.setGeometry( geo, function( p ) { return p; } );//function( p ) 


        var lineWidths = [];
        for(let i =0; i< this.params.amount; i++){
            let wid = Maf.randomInRange( 0.9, 1.0);
            lineWidths.push(wid);
        }

        
        let material = new MeshLineMaterial( {
            // depthTest: false,//これがないと隠れちゃって描画されなかった。。。

            stroke: this.params.strokes,
            // color: new THREE.Color( colors[ ~~Maf.randomInRange( 0, colors.length ) ] ),
            color: new THREE.Color( 0xffffff),
            opacity: this.params.opacity,
            dashArray: this.params.dashArray,
            dashOffset: this.params.dashOffset,
            dashRatio: this.params.dashRatio,
            lineWidth: this.params.lineWidth,
            // near: camera.near,
            // far: camera.far,
            // depthWrite: false,
            // depthTest: !params.strokes,
            // alphaTest: params.strokes ? .5 : 0,
            transparent: true,
            side: THREE.DoubleSide

        });

        
        this.mesh = new THREE.Mesh( g.geometry, material );//.geometry = new THREE.BufferGeometry()
        // this.mesh = new THREE.Mesh( g.geometry, this.meshMatGrade );
        this.mesh.geo = geo;
        this.mesh.g = g;

        this.add( this.mesh );

        this.updateBool = true;

        // return this.mesh;
    }


    checkIntersection(){

        var geo = this.mesh.geo;
        var g = this.mesh.g;

        this.angle+=1;
        if(this.angle >360){this.angle = 0;}

        var d = 30;
        // var d = 1;

        // //これがないと生えていかない。
        // for( var j = 0; j < geo.length; j+= 3 ) {
        //   geo[ j ] = geo[ j + 3 ] * 1.001;
        //   geo[ j + 1 ] = geo[ j + 4 ] * 1.001;
        //   geo[ j + 2 ] = geo[ j + 5 ] * 1.001;
        // }

        // geo[ geo.length - 3 ] = d * Math.cos( this.angle );
        // // geo[ geo.length - 2 ] = intersects[ 0 ].point.y;
        // geo[ geo.length - 2 ] = -this.angle*1;
        // geo[ geo.length - 1 ] = d * Math.sin( this.angle );

        for( var j = 0; j < geo.length; j+= 3 ) {
          geo[ j ] = d * Math.sin( (this.angle +(j/3))*8*Math.PI/180);
          geo[ j + 1 ] = 0;
          geo[ j + 2 ] = j/3 *20;
        }

        g.setGeometry( geo );

    }


    update(){
        console.log(this.updateBool);
        if(this.updateBool == true){
            this.frame += 1;
            if(this.frame% 4 == 0){
                // for( var i in this.mesheList ) { this.checkIntersection(i); }
                this.checkIntersection(); 

                this.mesh.material.uniforms.dashOffset.value += 0.06;
            }


            // this.matTime += this.matTimeSpeed;
            // if(this.matTime > 1000 ){this.matTime = 0;}

            // const sec = this.matTime/1000;
            // this.meshMatGrade.uniforms.uTime.value = sec;// シェーダーに渡す時間を更新
        }

    }


    // getlineLength(){
    //     return this.lineLength;
    // }


//**************************************************:


// //     import * as THREE from "three";
// // import { ShaderMaterial } from 'three';

// export default class LightBar extends THREE.Object3D {

//     /**
//     * コンストラクターです。
//     * @constructor
//     */
//     constructor(){
//         super();
//         this.createMeshMaterial_Grade = this.createMeshMaterial_Grade.bind(this);
//         this.createMeshMaterial_Grade();

//         // 平面をつくる（幅, 高さ, 横分割数, 縦分割数）
//         const geo = new THREE.CylinderGeometry(600,600,400,64);
//         var mat = [ this.meshMatGrade,this.meshMatRing, this.meshMatRing];

//         this.lightBarmesh = new THREE.Mesh(geo, mat); 
//         this.lightBarmesh.position.set(160, 200, 160);
//         this.lightBarmesh.rotation.x = 0* Math.PI/180;

//         this.add(this.lightBarmesh);

//     }


    createMeshMaterial_Grade(){
        
        // uniform変数を定義
        this.uniforms = {
            // uAspect: { value: this.w / this.h},
            uAspect:    { value: 1 / 1 },
            uTime:    { value: 100.0 },
            color:    { value: new THREE.Color(0x734ca4) },
            color2:    { value: new THREE.Color(0x4ea78e) },//0x4ea78
            // alpha:    {},
            resolution:    { value: new THREE.Vector2()} 
        };

        this.uniforms.resolution.value.x = 100;
        this.uniforms.resolution.value.y = 100;


        // 頂点シェーダーのソース
        const vertexSource = `
        varying vec2 vUv;
        uniform float uAspect;

        void main() {
            // vUv = uv;

            vec3 pos = position;
            gl_Position = vec4(pos, 1.0);

            // gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
        `;

        // ピクセルシェーダーのソース
        const fragmentSource = `
        varying vec2 vUv;
        uniform float uAspect;
        uniform float uTime;
        uniform vec3 color;
        uniform vec3 color2;

        void main() {


            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0 );
            
            // vec2 uv = vec2( vUv.x * uAspect, vUv.y );
            // vec2 center = vec2( 0.5 * uAspect, 0.0 );
            // vec2  p = uv - center;
            
            //グラデ
            // // vec2 q = mod(p, 0.142857) - 0.0;
            // // float f = 0.2 / abs(q.x) ; 
            // // vec3 gradate  = color2 /(f) ; 
            // vec3 gradate = color * uv.x + color2 * (1.0 - uv.x);
            // gl_FragColor = vec4(gradate, 1.0 );

            // //輪っか
            // vec2 uv = vec2( vUv.x * uAspect, vUv.y );
            // vec2 center = vec2( .5 * uAspect, .5 );
            // vec2  p = uv - center;
            // float radius = uTime;// 時間で半径をアニメーションさせる
            // float lightness = 0.0002/ abs(length(p)- radius);
            // float radius2 = uTime - 0.35;// 時間で半径をアニメーションさせる
            // float lightness2 = 0.0002/ abs(length(p)- radius2);
            // float radius3 = uTime - 0.4;// 時間で半径をアニメーションさせる
            // float lightness3 = 0.0002/ abs(length(p)- radius3);

            // float radiusP = uTime + 0.0;// 時間で半径をアニメーションさせる
            // float lightnessP = 0.0002/ abs(length(p)- radiusP);// 半径を距離で割る

            // vec3 outColor = (lightness + lightness2 + lightness3 +lightnessP)* color2;
            // gl_FragColor = vec4( vec3( outColor ),0.5 );



            // //横ライン
            // // vec2 center = vec2( 0.5 * uAspect, 0.0 );
            // // vec2  p = uv - center;
            // float radius = uTime;// 時間で半径をアニメーションさせる
            // float lightness = 0.0002/ abs(length(p)- radius);
            // float radius2 = uTime - 0.2;// 時間で半径をアニメーションさせる
            // float lightness2 = 0.002/ abs(length(p)- radius2);
            // float radius3 = uTime - 0.4;// 時間で半径をアニメーションさせる
            // float lightness3 = 0.002/ abs(length(p)- radius3);
            // float radius4 = uTime + 0.2;// 時間で半径をアニメーションさせる
            // float lightness4 = 0.002/ abs(length(p)- radius4);
            // vec3 outColor = (lightness + lightness2 + lightness3 + lightness4)* color2;
            // gl_FragColor = vec4( vec3( outColor ),0.5 );
            // // gl_FragColor = vec4( vec3( outColor )+vec3( gradate ),0.5 );
        }
        `;

        // シェーダーソースを渡してマテリアルを作成
        this.meshMatGrade = new THREE.ShaderMaterial({
            vertexShader: vertexSource,
            fragmentShader: fragmentSource,
            // wireframe: true,
            uniforms: this.uniforms,
            transparent: true,
            opacity:1.0,
            // blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
        });

        return this.meshMatGrade;
    }

}
