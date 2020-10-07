// import * as THREE from '../../libs/three.module.js';
// import * as THREE from '../../libs/three.js';
// import {} from '../../libs/THREE.MeshLine.js';

/**
 *　ラインクラスです。
 */
export default class Overpaint extends THREE.Object3D {
　　 /**
    * コンストラクターです。
    * @constructor
    */
    constructor(){

        super();
        this.init = this.init.bind(this);
        this.createLines = this.createLines.bind(this);
        this.createLine = this.createLine.bind(this);
        this.makeLine = this.makeLine.bind(this);
        this.createCurve = this.createCurve.bind(this);

        //  console.log(positions);//30000個の中身全部[]
        // console.log(positions.length);//30000


        this.lines = [];
        this.time = 0;
        this.clock = THREE.Clock();

        var Params = function(){
            // this.curves = true;
            this.circles = true;
            this.amount = 50;
            // this.lineWidth = Math.random();
            
            this.dashArray = 0.1;
            this.dashOffset = 10.0;
            this.dashRatio = 0.5;
            this.taper = 'none';
            this.strokes = false;
            this.sizeAttenuation = true;
            // this.animateWidth = false;
            this.spread = false;
            // this.autoUpdate = true;//これ、DATでいれた値を反映させるのに大事！！！
            this.animateVisibility = true;
            this.animateDashOffset = true;
            // this.strokes = true;
        };

        this.params = new Params();

        var TAU = 2 * Math.PI/2;
        this.hexagonGeometry = new THREE.Geometry();
        for( var j = 0; j < TAU - .1; j += TAU / 100/2 ) {
            var v = new THREE.Vector3();
            v.set( Math.cos( j+(Math.PI/180*180) ), Math.sin( j+(Math.PI/180*180) ), 0 );
            this.hexagonGeometry.vertices.push( v );
        }
        this.hexagonGeometry.vertices.push( this.hexagonGeometry.vertices[ 0 ].clone() );

        window.addEventListener( 'load', this.init());

    }



    init() {
        this.createLines();
    }

    createLines() {
        for( var j = 0; j < this.params.amount; j++ ) {
            this.createLine(j);
        }
    }
    
    createLine(j) {
        if( this.params.circles ) this.makeLine( this.hexagonGeometry );
        if( this.params.curves ) this.makeLine( this.createCurve(j) );
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
            // 0xFFEDE1,//siro
            0x70c1b3,//midori
            0xBE63F2,
            0x6965DB,
            0x3DA1F5,
            0x93EDE1,
            // 0xf4f1bb,//
	        0x7B31F0,//
        ];

        var opacitys = [];
        for(let i =0; i< this.params.amount; i++){
            let opc = Maf.randomInRange( 0.3, 0.9);
            // console.log(opc);
            opacitys.push(opc);
        }

        var lineWidths = [];
        for(let i =0; i< this.params.amount; i++){
            let wid = Maf.randomInRange( 8, 15);
            // console.log(wid);
            lineWidths.push(wid);
        }
        
        var dashArrays = [];
        for(let i =0; i< this.params.amount; i++){
            let arrays= Maf.randomInRange(0.2, 4);
            // console.log(arrays);
            dashArrays.push(arrays);
        }
        
        var dashOffsets = [];
        for(let i =0; i< this.params.amount; i++){
            let offs= (~~(Math.random()*60));
            // console.log(offs);
            dashOffsets.push(offs);
        }


        var material = new MeshLineMaterial( {
            // map: strokeTexture,
            useMap: this.params.strokes,
            color: new THREE.Color( colors[ ~~Maf.randomInRange( 0, colors.length ) ] ),
            // color: new THREE.Color( 0xffffff),
            opacity: opacitys[ ~~Maf.randomInRange( 0, opacitys.length ) ],
            dashArray: dashArrays[ ~~Maf.randomInRange( 0, dashArrays.length ) ],
            dashOffset: dashOffsets[ ~~Maf.randomInRange( 0, dashOffsets.length ) ],
            // dashRatio: this.params.dashRatio,
            dashRatio: 0.0,
            // resolution: resolution,
            // sizeAttenuation: params.sizeAttenuation,
            // lineWidth: this.params.lineWidth,
            // lineWidth: 22,
            lineWidth: lineWidths[ ~~Maf.randomInRange( 0, lineWidths.length ) ],
            // near: camera.near,
            // far: camera.far,
            // depthWrite: false,
            // depthTest: !this.params.strokes,
            depthTest: false,
            // alphaTest: this.params.strokes ? .5 : 0.0,
            transparent: true,
            side: THREE.DoubleSide
        });

        var mesh = new THREE.Mesh( this.g.geometry, material );

        if( this.params.circles ) {
            var r = 150;
            
            mesh.position.set( 0, Maf.randomInRange( -r, r )+450, 170 );
            // mesh.position.set( 0,0,0 );
            var s = 500 + 10 * Math.random();
            mesh.scale.set( s,s,s );
            // mesh.rotation.set( Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI );
            mesh.rotation.set(10 *Math.PI/180, 15 *Math.PI/180, 0 );
            
        }

        this.add( mesh );
        this.lines.push( mesh );

    }

    createCurve(wid) {

        var s = new THREE.ConstantSpline();
        var rMin = 10;
        var rMax = 300;
        var origin = new THREE.Vector3( Maf.randomInRange( -rMin, rMin ), Maf.randomInRange( -rMin, rMin ), Maf.randomInRange( -rMin, rMin ) );
    
        s.inc = 0.01;
        // s.p0 = new THREE.Vector3( .5 - Math.random(), .5 - Math.random(), .5 - Math.random() );
        s.p0.set( 0, 0, 0 );
        // s.p1 = s.p0.clone().add( new THREE.Vector3( 1.0 + Math.random(), 0.2 - Math.random(), 0.1) );
        // s.p2 = s.p1.clone().add( new THREE.Vector3( 1.0 + Math.random(), 0.0 + Math.random(), 0.1) );
        // s.p3 = s.p2.clone().add( new THREE.Vector3( 1, 1.5 + Math.random(), 0.1) );

        s.p1 = s.p0.clone().add( new THREE.Vector3( 0.2 + Math.random(), - Math.random(), 0.0001) );
        s.p2 = s.p1.clone().add( new THREE.Vector3( 0.2 + Math.random(), 0.0 + Math.random(), 0.0001) );
        s.p3 = new THREE.Vector3( 5, 5, 0.1) ;
        s.p0.multiplyScalar( rMin + Math.random() * rMax );
        s.p1.multiplyScalar( rMin + Math.random() * rMax );
        s.p2.multiplyScalar( rMin + Math.random() * rMax );
        s.p3.multiplyScalar( rMin + Math.random() * rMax );
    
        s.calculate();
        var geometry = new THREE.Geometry();
        s.calculateDistances();
        //s.reticulate( { distancePerStep: .1 });
        s.reticulate( { steps: 500 } );
         var geometry = new THREE.Geometry();
    
        for( var j = 0; j < s.lPoints.length - 1; j++ ) {
            geometry.vertices.push( s.lPoints[ j ].clone() );
        }
    
        return geometry;



        // // let randomWid = Math.random()*window.innerWidth*0.2;
        // // // console.log(window.innerWidth);//1440
        // // var geometry = new THREE.Geometry();
        // // for( var i = 0; i < 2; i++ ) {
        // //     geometry.vertices.push( new THREE.Vector3(
        // //         -window.innerWidth/10+ randomWid,
        // //         window.innerHeight/4- window.innerHeight/4*i,
        // //         0
        // //     ));
        // //     // geometry.vertices.push( new THREE.Vector3( -window.innerWidth/5 +(20*wid), window.innerHeight*i, 0));
        // // }

        // let randomX = Maf.randomInRange(-150, 150);
        // let randomZ = Maf.randomInRange(-150, 150);
        // // console.log(window.innerWidth);//1440
        // var geometry = new THREE.Geometry();
        // for( var i = 0; i < 2; i++ ) {
        //     geometry.vertices.push( new THREE.Vector3(
        //         randomX,
        //         -150+ (300*i),
        //         randomZ
        //         // Maf.randomInRange(-150, 150)
        //     ));
        // }

        // return geometry;
    }


    update(){
        // var delta = clock.getDelta();
        // var t = this.clock.getElapsedTime();
        // this.time += 1.0;
        this.lines.forEach( function( l, i ) {
            // if( params.opacity ) l.material.uniforms.lineWidth.value = params.lineWidth * ( 1 + .5 * Math.sin( 5 * t + i ) );
            // if( params.autoRotate ) l.rotation.y += .125 * delta;
            // l.material.uniforms.visibility.value = this.params.animateVisibility ? (this.time/3000) % 1.0 : 1.0;
            // l.material.uniforms.opacity.value= t* 0.5;
            l.material.uniforms.dashOffset.value -= 0.006;
        } );

    // console.log(this.lines.length);

    }

}

