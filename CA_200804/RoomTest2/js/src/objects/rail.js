import * as THREE from '../../libs/three.module.js';

// 'use strict'

/**
 *　レールクラスです。
 */
export default class Rail extends THREE.Object3D {


    constructor() {
        super();
        
        this.prepareMesh = this.prepareMesh.bind(this);
        this.init = this.init.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseEnd = this.onMouseEnd.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onTouchMove= this.onTouchMove.bind(this);
        this.checkIntersection = this.checkIntersection.bind(this);
        this.check = this.check.bind(this);
        
        this.userInteracting = false;
        
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

        // var loader = new THREE.TextureLoader();
        // var strokeTexture;
        // loader.load( 'assets/stroke.png', function( texture ) {
        // 	strokeTexture = texture;
        // 	strokeTexture.wrapS = strokeTexture.wrapT = THREE.RepeatWrapping;
        this.init(); 
        // } );

        var resolution = new THREE.Vector2( window.innerWidth, window.innerHeight );
        var geo = [];

        var raycaster = new THREE.Raycaster();
        var mouse = {};
        var nMouse = {};
        this.tmpVector = new THREE.Vector2();
        // this.tmpVector = new THREE.Vector3();
        var angle = 0;
        var meshes = {}, plane;
        var material;
        var center = new THREE.Vector2( .5, .5 );
    }

    prepareMesh() {

      var geo = new Float32Array( 200 * 3 );
      for( var j = 0; j < geo.length; j += 3 ) {
        geo[ j ] = geo[ j + 1 ] = geo[ j + 2 ] = 0;
      }

      var g = new MeshLine();
      g.setGeometry( geo, function( p ) { return p; } );

      material = new MeshLineMaterial( {
        useMap: true,
        map: strokeTexture,
        color: new THREE.Color( new THREE.Color( colors[ ~~Maf.randomInRange( 0, colors.length ) ] ) ),
        opacity: 1,
        resolution: resolution,
        sizeAttenuation: true,
        lineWidth: 5,
        near: camera.near,
        far: camera.far,
        depthTest: false,
        blending: THREE.NormalBlending,
        transparent: true,
        repeat: new THREE.Vector2( 1,2 )
      });

      var mesh = new THREE.Mesh( g.geometry, material );
      mesh.geo = geo;
      mesh.g = g;

      scene.add( mesh );

      return mesh;

    }

    init() {

      this.plane = new THREE.Mesh( new THREE.PlaneBufferGeometry( 1000, 1000 ), new THREE.MeshNormalMaterial( { side: THREE.DoubleSide,  } ) );
      this.plane.material.visible = true;
      scene.add( plane );

      window.addEventListener( 'mousemove', onMouseMove );
      window.addEventListener( 'touchmove', onTouchMove );
      window.addEventListener( 'mousedown', onMouseDown );
      window.addEventListener( 'touchstart', onTouchStart );
      window.addEventListener( 'mouseup', onMouseEnd );
      // window.addEventListener( 'mouseout', onMouseEnd );
      window.addEventListener( 'touchend', onTouchEnd );
      window.addEventListener( 'touchcancel', onTouchEnd );

      // window.addEventListener( 'resize', onWindowResize );


      // render();

    }

    onMouseDown( e ) {

      directions.style.opacity = 0;

      if( !meshes[ 0 ] ) {
        meshes[ 0 ] = this.prepareMesh();
        // nMouse[ 0 ] = new THREE.Vector2();
        // mouse[ 0 ] = new THREE.Vector2();
      }

      this.userInteracting = true;

      e.preventDefault();

    }


    onTouchStart( e ) {

      directions.style.opacity = 0;

      for( var j = 0; j < e.touches.length; j++ ) {
        if( !meshes[ e.touches[ j ].identifier ] ) {
          meshes[ e.touches[ j ].identifier ] = prepareMesh();
          // nMouse[ e.touches[ j ].identifier ] = new THREE.Vector2();
          // mouse[ e.touches[ j ].identifier ] = new THREE.Vector2();
        }
      }

      e.preventDefault();

    }

    onTouchEnd( e ) {

      userInteracting = false;

      for( var j = 0; j < e.changedTouches.length; j++ ) {
        var id = e.changedTouches[ j ].identifier;
        var m = meshes[ id ];
        scene.remove( m );
        delete meshes[ id ];
        // delete nMouse[ id ];
        // delete mouse[ id ];
      }

      e.preventDefault();

    }


    checkIntersection( id ) {

      // this.tmpVector.copy( nMouse[ id ] ).sub( mouse[ id ] ).multiplyScalar( .1 );
      // Maf.clamp( this.tmpVector.x, -1, 1 );
      // Maf.clamp( this.tmpVector.y, -1, 1 );

      // mouse[ id ].add( this.tmpVector );

      // raycaster.setFromCamera( mouse[ id ], camera );

      // // See if the ray from the camera into the world hits one of our meshes
      // var intersects = raycaster.intersectObject( plane );

      // Toggle rotation bool for meshes that we clicked
      if ( intersects.length > 0 ) {

        var mesh = meshes[ id ];
        var geo = mesh.geo;
        var g = mesh.g;

        var d = intersects[ 0 ].point.x;

        for( var j = 0; j < geo.length; j+= 3 ) {
          geo[ j ] = geo[ j + 3 ] * 1.001;
          geo[ j + 1 ] = geo[ j + 4 ] * 1.001;
          geo[ j + 2 ] = geo[ j + 5 ] * 1.001;
        }

        geo[ geo.length - 3 ] = d * Math.cos( angle );
        geo[ geo.length - 2 ] = intersects[ 0 ].point.y;
        geo[ geo.length - 1 ] = d * Math.sin( angle );

        g.setGeometry( geo );

      }

    }



    check() {

      for( var i in nMouse ) { this.checkIntersection( i ); }
      setTimeout( check, 20 );

    }
    // check();

    update() {

      this.check();//こっちかな？

      angle += .05;

      for( var i in meshes ) {
          var mesh = meshes[ i ];
          mesh.rotation.y = angle;
        }

      /*for( var i in meshes ) {
        var geo = meshes[ i ].geo;
        for( var j = 0; j < geo.length; j+= 3 ) {
          geo[ j ] *= 1.01;
          geo[ j + 1 ] *= 1.01;
          geo[ j + 2 ] *= 1.01;
        }
        meshes[ i ].g.setGeometry( geo );
      }*/


    }
}


// /**
//  *　レールクラスです。
//  */
// export default class Rail extends THREE.Object3D {

//     // /** 頂点情報 */
//     // get points() {
//     //     return this._points;
//     // }


//     // /**
//     //  * コンストラクターです。
//     //  * @constructor
//     //  */
//     constructor() {
//       super();

//       //レールの点 
//       this._points = [];
//       let radius = 20;
//       // const pointNUM = 362;//362は大丈夫なのに360だとだめだった！！！！！！！！！！！！！

//       // for( let i = 0; i<pointNUM; i++){
//       //   const point = new THREE.Vector3();
//       //   point.x = radius * Math.sin(2* i* Math.PI/180);
//       //   point.y = radius/4 * Math.cos(i* Math.PI/180);
//       //   point.z = radius * Math.sin(i* Math.PI/180);
//       //   this._points.push(point);
//       // }

//       //トロッコ遅くしてみた
//       const pointNUM = 722;

//       for( let i = 0; i<pointNUM; i++){
//         const point = new THREE.Vector3();
//         point.x = radius * Math.sin(2* i* Math.PI/180/2);
//         point.y = radius/4 * Math.cos(i* Math.PI/180/2)   + 5;
//         point.z = radius * Math.sin(i* Math.PI/180/2);
//         this._points.push(point);
//       }





//       //こっちの書き方でもいい
//       // for( let i = 0; i<pointNUM; i++){
//       //   let x = radius * Math.sin(2* i* Math.PI/180);
//       //   let y = radius * Math.cos(i* Math.PI/180);
//       //   let z = radius * Math.cos(i* Math.PI/180);
//       //   this._points.push(new THREE.Vector3(x,y,z));
//       // }

//       // const material = new THREE.LineBasicMaterial({
//       const material = new THREE.LineBasicMaterial({
//         color: 0xffff00,
//       });
//       const geometry = new THREE.Geometry();
//       geometry.vertices = this._points;

//       const line = new THREE.Line(geometry, material);
//       this.add(line);//忘れずにかく

//     // もしくはこっち
//       // this.line = new THREE.Line(geometry, material);
//       // this.add(this.line);//これ要る

//     }
  
//     /**
//      * フレーム毎の更新をします。
//      */
//     update() {}
//   }
