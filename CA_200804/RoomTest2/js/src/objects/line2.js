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
        this.Times = 0;

        this.createLines = this.createLines.bind(this);
        this.prepareMesh = this.prepareMesh.bind(this);
        this.checkIntersection = this.checkIntersection.bind(this);
        this.getlineLength = this.getlineLength.bind(this);


        this.lineLength = 0;
        this.angle = 0;

        let Params = function(){
            this.curves = true;
            this.amount = 20;
            this.lineWidth = Maf.randomInRange( 0.1, 1.0);
            this.opasity = Maf.randomInRange( 0.6, 1.0);
            
            this.dashArray = Maf.randomInRange(0.1, 5);
            this.dashOffset = (~~(Math.random()*60))*0.0001;
            this.dashRatio = 0.1;
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
            // color: 0xffffff,
            // depthTest: false,//これがないと隠れちゃって描画されなかった。。。

            useMap: this.params.strokes,
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
        this.mesh.geo = geo;
        this.mesh.g = g;

        this.add( this.mesh );


        // return this.mesh;
    }


    checkIntersection(){

        var geo = this.mesh.geo;
        var g = this.mesh.g;

        this.angle+=1;
        if(this.angle >360){this.angle = 0;}

        var d = 50;

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
          geo[ j + 2 ] = j/3 *4;
        }

        g.setGeometry( geo );

    }


    update(){
        this.frame += 1;
        if(this.frame% 4 == 0){
            // for( var i in this.mesheList ) { this.checkIntersection(i); }
            this.checkIntersection(); 

            // this.meshList.forEach( function( l, i ) {
            //     // if( params.animateWidth ) l.material.uniforms.lineWidth.value = params.lineWidth * ( 1 + .5 * Math.sin( 5 * t + i ) );
            //     l.material.uniforms.dashOffset.value += 0.03;
            // } );
            this.mesh.material.uniforms.dashOffset.value += 0.03;
        }


    }


    getlineLength(){

            return this.lineLength;

    }

}

