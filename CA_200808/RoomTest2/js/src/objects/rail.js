// import {MeshLine, MeshLineMaterial} from "three.meshline";
// import * as THREE from "three";


export default class Line extends THREE.Object3D {

    /**
    * コンストラクターです。
    * @constructor
    */
    constructor(){
        super();
        this.frame = 0;
        this.J = 0;

        this.prepareMesh = this.prepareMesh.bind(this);
        this.checkIntersection = this.checkIntersection.bind(this);
        this.getDistortion = this.getDistortion.bind(this);

        let Params = function(){
            this.curves = true;
            this.amount = 20;
            this.lineWidth = Maf.randomInRange( 0.1, 0.6);
            this.opacity = 1.0;
            this.dashArray = Maf.randomInRange(0.7, 1.1);
            this.dashOffset = Maf.randomInRange(0.0, 1.0);//(~~(Math.random()*60))*0.0001;
            this.dashRatio = 0.4;
            this.taper = 'none';
            this.strokes = false;
            this.sizeAttenuation = true;
            this.spread = false;
            // this.autoUpdate = true;//これ、DATでいれた値を反映させるのに大事！！！
            // this.animateVisibility = false;
            this.animateDashOffset = true;
        };

        this.params = new Params();

        this.prepareMesh();
    }



    prepareMesh() {

        var geo = new Float32Array( 200 * 3 );//点は100個
        for( var j = 0; j < geo.length; j += 3 ) {//最初の点の位置。全部いれてる
            let distortion  = this.getDistortion(j/geo.length);
            geo[ j ] = distortion.x;
            geo[ j + 1 ] = distortion.y; 
            geo[ j + 2 ] = j/3*5;
        }

        var g = new MeshLine();
        g.setGeometry( geo, function( p ) { return p; } );//function( p ) 

        let material = new MeshLineMaterial( {
            // color: new THREE.Color( colors[ ~~Maf.randomInRange( 0, colors.length ) ] ),
            color: new THREE.Color( 0xffffff),//4CFFCF//2734F2//67FFFF水色
            opacity: this.params.opacity,
            dashArray: this.params.dashArray,
            dashOffset: this.params.dashOffset,
            dashRatio: this.params.dashRatio,
            lineWidth: this.params.lineWidth,
            transparent: true,
            side: THREE.DoubleSide
        });

        this.mesh = new THREE.Mesh( g.geometry, material );//.geometry = new THREE.BufferGeometry()
        this.mesh.geo = geo;
        this.mesh.g = g;

        this.add( this.mesh );

        // return this.mesh;
    }

    checkIntersection(){

        var geo = this.mesh.geo;
        var g = this.mesh.g;

        //これがないと生えていかない。
        for( var j = 0; j < geo.length; j+= 3 ) {
          geo[ j ] = geo[ j + 3 ] * 1.0;//0.9したらだんだん0になって直線になった
          geo[ j + 1 ] = geo[ j + 4 ] * 1.0;//0.9したらだんだん0になって直線になった
          geo[ j + 2 ] = geo[ j + 2 ] ;
        }

        let distortion  = this.getDistortion((geo.length+this.J)/geo.length);
        geo[ geo.length - 3 ] = distortion.x;
        geo[ geo.length - 2 ] = distortion.y; 
        geo[ geo.length - 1 ] = geo[ geo.length - 1 ];
        this.J += 3;

        g.setGeometry( geo );

    }

    getDistortion(progress){

        let uDistortionX = new THREE.Vector2(80, 2);
        let uDistortionY = new THREE.Vector2(-40, 3.5);

        let xAmp = uDistortionX.x;
        let xFreq = uDistortionX.y;
        let yAmp = uDistortionY.x;
        let yFreq = uDistortionY.y;

        return new THREE.Vector3( 
            xAmp * Math.sin(progress* Math.PI *xFreq*1) ,
            yAmp * Math.sin(progress* Math.PI *yFreq*1) ,
            0.
        );
    }


    update(){

            this.frame += 1;
            // if(this.frame% 2 == 0){
                this.checkIntersection(); 
                this.mesh.material.uniforms.dashOffset.value += 0.003;
            // }

    }

}

// const distortion_uniforms = {
// uDistortionX: new THREE.Uniform(new THREE.Vector2(80, 3)),
// uDistortionY: new THREE.Uniform(new THREE.Vector2(-40, 2.5))
// };

// const distortion_vertex = `
// #define PI 3.14159265358979
// uniform vec2 uDistortionX;
// uniform vec2 uDistortionY;

//     float nsin(float val){
//         return sin(val) * 0.5+0.5;
//     }
//     vec3 getDistortion(float progress){
//         progress = clamp(progress, 0.,1.);
//         float xAmp = uDistortionX.r;
//         float xFreq = uDistortionX.g;
//         float yAmp = uDistortionY.r;
//         float yFreq = uDistortionY.g;
//         return vec3( 
//             xAmp * nsin(progress* PI * xFreq   - PI / 2. ) ,
//             yAmp * nsin(progress * PI *yFreq - PI / 2.  ) ,
//             0.
//         );
//     }
// `;
  
