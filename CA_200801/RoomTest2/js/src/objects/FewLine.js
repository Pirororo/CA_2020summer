// import * as THREE from '../../libs/three.module.js';
// import * as THREE from '../../libs/three.js';
// import {} from '../../libs/THREE.MeshLine.js';

/**
 *　ラインクラスです。
 */
export default class ManyLine extends THREE.Object3D {
　　 /**
    * コンストラクターです。
    * @constructor
    */
    constructor(){

        super();

        this.init = this.init.bind(this);
        this.makeLine = this.makeLine.bind(this);
        this.makeGeo = this.makeGeo.bind(this);

        this.frame = 0;
        this.meshList = [];//mesh
        this.gList = [];//meshline
        this.geoList = [];//vec3配列
        this.targetLinePosList = [];
        this.nowLinePosList = [];

        this.nowLinePos = [];
        this.targetLinePos = [];

        var Params = function(){
            this.curves = true;
            this.opacity = 1;
            this.amount = 5;
            this.lineWidth = 2;

            // this.dashArray = 0.1;
            // this.dashOffset = 0;
            // this.dashRatio = 0.7;
            this.taper = 'none';
            this.strokes = false;
        };

        this.params = new Params();
        window.addEventListener( 'load', this.init());

    }



    init() {
        for( var j = 0; j < this.params.amount; j++ ) {
            if( this.params.curves ) this.makeLine( this.makeGeo(j), j );
        }
    }
    
    makeLine( geo, j ) {

        this.g = new MeshLine();
        this.gList.push(this.g);

        switch( this.params.taper ) {
            case 'none': this.g.setGeometry( geo ); break;
        }

        var dashArrays = [];
        for(let i =0; i< this.params.amount; i++){
            let arrays= 0.1+((~~(Math.random()*60))*0.01);
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
            useMap: this.params.strokes,
            color: new THREE.Color( 0xffffff),
            opacity: this.params.opacity,
            // dashArray: dashArrays[ ~~Maf.randomInRange( 0, dashArrays.length ) ],
            // dashOffset: dashOffsets[ ~~Maf.randomInRange( 0, dashOffsets.length ) ],
            // dashRatio: this.params.dashRatio,
            lineWidth: this.params.lineWidth,
            transparent: true,
            side: THREE.DoubleSide
        });

        this.mesh = new THREE.Mesh( this.gList[j].geometry, material );
        // this.mesh.geo = geo;
        // this.mesh.g = g;

        this.add( this.mesh );
        this.meshList.push( this.mesh );


    }

    makeGeo(j) {

        // ここからnow, targetの初期値設定

        // positions
        for( var i = 0; i < 2; i++ ) {
            // 現在のpositions
            this.nowLinePos.push(
                j*30,
                -window.innerHeight/4+ window.innerHeight*i,
                0
            );

            // // ターゲットのpositions
            // this.targetLinePos.push(this.nowLinePos[(3 * (j+i))+ 0]);
            // this.targetLinePos.push(-window.innerHeight/8+ window.innerHeight*i);
            // this.targetLinePos.push(this.nowLinePos[(3 * (j+i))+ 2]);
        }

        // this.nowLinePosList.push(this.nowLinePos);
        // this.targetLinePosList.push(this.targetLinePos);

        // console.log(this.nowLinePosList[0].length);

        this.geometry = new THREE.Geometry();
        // for( var i = 0; i < 2; i++ ) {
            this.geometry.vertices.push( new THREE.Vector3(
                this.nowLinePos[ 3*2 * j + 0],
                this.nowLinePos[ 3*2 * j + 1],
                this.nowLinePos[ 3*2 * j + 2]
            ));
            this.geometry.vertices.push( new THREE.Vector3(
                this.nowLinePos[ 3*2 * j + 3],
                this.nowLinePos[ 3*2 * j + 4],
                this.nowLinePos[ 3*2 * j + 5]
            ));
            // geometry.vertices.push( new THREE.Vector3( -window.innerWidth/5 +(20*wid), window.innerHeight*i, 0));
        // }

        this.geoList.push( this.geometry );
        return this.geometry;
    }



    update(){

        // //イージング
        // for(let i =0; i< this.params.amount; i++){
        // this.nowLinePos[i] += (this.targetLinePos[i]-this.nowLinePos[i]) *0.1;
        // }

        // //ターゲットの決定
        // this.frame += 1;

        // if(this.frame%5 == 0){

        //     this.listNum += 1;
        //     if(this.listNum > this.params.amount){
        //         this.listNum = 0;
        //     }

        //     // for( var i = 0; i < 2; i++ ) {
        //         for(let j =this.listNum; j< this.listNum+1; j++){
        //                 this.targetLinePos[ 3 * j + 0 ] = j*10;
        //                 this.targetLinePos[ 3 * j + 1 ] = -window.innerHeight/2+ window.innerHeight*0;
        //                 this.targetLinePos[ 3 * j + 2 ] = 0;
        //                 this.targetLinePos[ 3 * j + 4 ] = j*10;
        //                 this.targetLinePos[ 3 * j + 5 ] = -window.innerHeight/2+ window.innerHeight*1;
        //                 this.targetLinePos[ 3 * j + 6 ] = 0;
        //         }
        //     // }

        // }

        //draw
        for(let j = 0; j< this.params.amount; j++){
            // for( var i = 0; i < 2; i++ ) {
                this.geoList[j].vertices[0].set(
                    this.nowLinePos[ 3*2 * j + 0 ],
                    this.nowLinePos[ 3*2 * j + 1 ],
                    this.nowLinePos[ 3*2 * j + 2 ]
                );
                this.geoList[j].vertices[1].set(
                    this.nowLinePos[ 3*2 * j + 3 ],
                    this.nowLinePos[ 3*2 * j + 4 ],
                    this.nowLinePos[ 3*2 * j + 5 ]
                );
            // }
            this.gList[j].setGeometry( this.geoList[j] );
        }
    }


}


// import * as THREE from '../libs/three.module.js';
// /**
//  *　ラインクラスです。
//  */
// export default class Line extends THREE.Object3D {
//     　　 /**
//         * コンストラクターです。
//         * @constructor
//         */
//         constructor() {
//             super();
            
//             this.frame = 0;
    
//             //この中からconstructer外部のmethodを呼び出すためにはbindする必要がある
//             // this.init = this.init.bind(this);
//             // this.check = this.check.bind(this);
//             this.prepareMesh = this.prepareMesh.bind(this);
//             this.checkIntersection = this.checkIntersection.bind(this);
    
//             this.meshes = {};//planeけしてみた
    
//             // var colors = [
//             //     0xed6a5a,
//             //     0x70c1b3
//             // ];
    
//             if( !this.meshes[ 0 ] ) { this.meshes[ 0 ] = this.prepareMesh(); }
    
//             // this.check();
//         }
    
    
//         // check() {
//         //     for( var i in this.meshes ) { this.checkIntersection( i ); }
//         //     setTimeout( this.check, 80 );//ここの時間ごとに次の点が打たれて更新される
//         // }
    
//         prepareMesh() {
    
//             var geo = new Float32Array( 1 * 3 );//点は200個
//             for( var j = 0; j < geo.length; j += 3 ) {
//                 geo[ j ] = geo[ j + 1 ] = geo[ j + 2 ] = 0;//最初の点の位置。全部いれてる
//             }
    
//             var g = new MeshLine();
//             g.setGeometry( geo, function( p ) { return p; } );//function( p ) { return p; }はgeometryのwidthに関与、materialでlinewidth決めてるから気にしなくていい。
    
//             let material = new MeshLineMaterial( {
    
//                 // color: 0x70c1b3,
//                 color: 0xffff00,
//                 // color: new THREE.Color( new THREE.Color( colors[ ~~Maf.randomInRange( 0, colors.length ) ] ) ),
//                 opacity: 0.8,
//                 lineWidth: 1.5,
//                 depthTest: false,//これがないと隠れちゃって描画されなかった。。。
//                 // blending: THREE.AddBlending,
//                 transparent: true,
//             });
    
            
//             this.mesh = new THREE.Mesh( g.geometry, material );//.geometry = new THREE.BufferGeometry()
//             this.mesh.geo = geo;
//             this.mesh.g = g;
    
//             this.add( this.mesh );
    
//             return this.mesh;
//         }
    
    
//         checkIntersection(){
    
//             this.mesh = this.meshes[ 0 ];
//             var geo = this.mesh.geo;
//             var g = this.mesh.g;
    
//             //これがないと生えていかない。
//             //点の座標を配列の一個まえの点の座標にずらす、geo[ geo.length + 3 ]+4,+5 が空く
//             for( var j = 0; j < geo.length; j+= 3 ) {
//                 geo[ j ] = geo[ j + 3 ] * 1.0;
//                 geo[ j + 1 ] = geo[ j + 4 ] * 1.0;
//                 geo[ j + 2 ] = geo[ j + 5 ] * 1.0;
//             }
    
//             let Randomselect = Math.random();
//             // let lineLength = 150 * (Math.random()-0.5) ;
//             let lineLength = 200

//             if(Randomselect >0.5){	

//                 if(geo[ geo.length - 6 ]>150 && lineLength>0){lineLength *= -1;}
//                 if(geo[ geo.length - 6 ]<-150&& lineLength<0){lineLength *= -1;}
//                 geo[ geo.length - 3 ] = geo[ geo.length - 6 ] +lineLength;
//                 geo[ geo.length - 2 ] = geo[ geo.length - 5 ];
//                 geo[ geo.length - 1 ] = geo[ geo.length - 4 ];

//             }else{

//                 if(geo[ geo.length - 5 ]>150 && lineLength>0){lineLength *= -1;}
//                 if(geo[ geo.length - 5 ]<-150&& lineLength<0){lineLength *= -1;}
//                 geo[ geo.length - 3 ] = geo[ geo.length - 6 ];
//                 geo[ geo.length - 2 ] = geo[ geo.length - 5 ];
//                 geo[ geo.length - 1 ] = geo[ geo.length - 4 ]+lineLength;

//             }

//             g.setGeometry( geo );
//         }
    
    
//         update(){
    
//             this.frame += 1;
//             if(this.frame% 2 == 0){for( var i in this.meshes ) { this.checkIntersection( i ); }}
            
//         }
    
//     }
    
