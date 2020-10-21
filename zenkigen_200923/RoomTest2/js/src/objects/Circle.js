// import * as THREE from '../../libs/three.module.js';
import { convertCSVtoArray2D, loadCSV } from "../utils/AssetsLoader.js";


/**
 *カークラスです。
 */
export default class Circle extends THREE.Object3D {
  /**
   * コンストラクターです。
   * @constructor
   */
  constructor() {

    super();

    this.frame = -1;
    this.listNum = -1;
    this.createCircle = this.createCircle.bind(this);
    this.startSetting = this.startSetting.bind(this);

    //csvからのデータ取得
    this.getDateValue = this.getDateValue.bind(this);
    this.loadCSVandConvertToArray2D = this.loadCSVandConvertToArray2D.bind(this);
    this.dateValue = 0;
    this.data = [];
    this.TimesList = [1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    this.loadCSVandConvertToArray2D();
    this.DATAisOK = false;

    //データの並べ方
    // _line[]     >1in, 1out,2in, 2out,3in, 3out,4in, 4out
    // where/inout >0/1, 0/2, 1/1, 1/2, 2/1, 2/2, 3/1, 3/2
    // this.data = [
    //     ['0001','50','13','50','13','20','15','20','15'],
    //     ['0002','20','15','20','15','50','13','50','13'],
    //     ['0003','30','42','30','42','20','15','20','15'],
    //     ['0004','50','13','50','13','50','13','50','13'],
    //     ['0005','20','15','20','15','30','42','30','42'],
    //     ['0006','30','42','30','42','30','42','30','42'],
    // ];


    this.NUM = 14;
    this.boxList = [];
    this.boxMatList = [];

    this.boxSpeed = [];//ここに７種のスピード入れる・「丸が大きくなる速さ」で可視化

    this.nowBoxPos = [];
    this.targetBoxPos = [];

    // this.nowBoxRot=[];
    // this.targetBoxRot=[];

    this.nowBoxScl=[];
    this.targetBoxScl=[];

    this.nowBoxOpc=[];
    this.targetBoxOpc=[];

  }


  createCircle(NUM){

    this.colors = [

      // 0x98DEFF,//くすんだ青
      // 0x93EDE1,//シアン
      // 0x7B31F0,//紫
      // 0x4300F5,//青
      // // 0xAA21F5,//うす紫、意外と濃い
      // // 0xC771F5,//うすピンク


      0x51BCE5,
      // 0x51BCE5,

      0x59BFD7,
      // 0x59BFD7,

      // 0x6DD6DA,//ミントフリーん
      // 0x6DD6DA,

      0x1D45B1,//青
      0x2F298E,//紺
      // 0xE0A5CF,
      // 0xD196C9,
      0xB98EC7,//紫ピンク
    ];

    for (let i = 0; i < NUM; i++) {

      //普通の三角
      this.geoCirc = new THREE.SphereGeometry(1, 64,64);
      // this.matCirc = new THREE.MeshBasicMaterial({
      this.matCirc = new THREE.MeshPhongMaterial({
        // color: 0xffffff,
        color: new THREE.Color( this.colors[ ~~Maf.randomInRange( 0, this.colors.length)]),
        // color: new THREE.Color( this.colors[0]),
        // opacity: Maf.randomInRange( 0.3, 1.0 ),
        opacity: 0.8,
        transparent: true,
        side: THREE.DoubleSide,
        // specular: 0x000000,
      });

      this.meshCirc = new THREE.Mesh(
        this.geoCirc,
        this.matCirc
      );

      this.startSetting(this.meshCirc, this.matCirc, i);
    }

  }

  startSetting(mesh, mat, i){

    mesh.position.set(
        // Maf.randomInRange( -350, 350),
        // Maf.randomInRange( -180, 180),
        Maf.randomInRange( -window.innerWidth/2, window.innerWidth/2),
        Maf.randomInRange( -window.innerHeight/2, window.innerHeight/2),
        // Maf.randomInRange( -20, 20)
        -10
    );

    // mesh.rotation.z = 0 * Math.PI / 180;
    // mesh.scale.set(10,10,10);
    mesh.scale.set(1,1,1);

    // mesh.castShadow = true;
    // mesh.receiveShadow = true;
    this.add(mesh);

    // 個々のmeshをリスト化して保存
    this.boxList.push(mesh);
    this.boxMatList.push(mat);


    // ここからnow, targetの初期値設定

    // positions
    // 現在のpositions
    this.nowBoxPos.push(mesh.position.x, mesh.position.y, mesh.position.z);

    // ターゲットのpositions
    // this.targetBoxPos.push(0, 0, 0);
    let Randomselect = Math.random();
    let lineLength = Maf.randomInRange(100, 200);
    if(Randomselect >0.5){
        if(this.nowBoxPos[3 * i + 0]> window.innerWidth/2 -100 && lineLength>0){ lineLength *= -1;}
        if(this.nowBoxPos[3 * i + 0]< -window.innerWidth/2 +100&& lineLength<0){lineLength *= -1;}
        this.targetBoxPos.push(this.nowBoxPos[3 * i + 0]+lineLength);
        this.targetBoxPos.push(this.nowBoxPos[3 * i + 1]+lineLength);
        this.targetBoxPos.push(this.nowBoxPos[3 * i + 2]);
    }else{
        if(this.nowBoxPos[3 * i + 1]> window.innerHeight/2 -100 && lineLength>0){lineLength *= -1;}
        if(this.nowBoxPos[3 * i + 1]< -window.innerHeight/2 +100&& lineLength<0){lineLength *= -1;}
        this.targetBoxPos.push(this.nowBoxPos[3 * i + 0]+lineLength);
        this.targetBoxPos.push(this.nowBoxPos[3 * i + 1]+lineLength);
        this.targetBoxPos.push(this.nowBoxPos[3 * i + 2]);
    }

    //rotate
    // // 現在のrotate
    // this.nowBoxRot.push(mesh.rotation.z);
    // // ターゲットのrotate
    // this.targetBoxRot.push((~~(Math.random()*360))*Math.PI/180);

    //scale
    //scaleが大きくなる大きさ
    this.getDateValue(i);
    // this.boxSpeed.push(this.lineLength);

    // 現在のscale
    this.nowBoxScl.push(mesh.scale.x);

    // ターゲットのscale
    // this.targetBoxScl.push(60);
    // this.targetBoxScl.push(this.dateValue);
    this.targetBoxScl.push(0.9);

    //opacity
    // 現在のopacity
    // this.nowBoxOpc.push(mat.opacity);
    this.nowBoxOpc.push(1.0- (i*0.02));
    // ターゲットのopacity
    this.targetBoxOpc.push(0.0);

  }


  getDateValue(i){
    //https://uxmilk.jp/11586
        //Where: 関東ー北海道 = 0, 関東ー中部 = 1,,,
        //InOut: in=1, out=2;
        // this.lineLength = (this.data[this.Times][i+1]-20)*0.005;//長さ調整
        this.dateValue = (this.data[this.TimesList[i]][i+1])*0.5;
        // console.log(this.data[this.Times][2*this.where + this.inout]*1);
        
        return this.dateValue;
  }

  loadCSVandConvertToArray2D(){
      loadCSV("../RoomTest2/js/src/data/kanto_7area_short.csv", e =>{
          const result = e.result;
          this.data = convertCSVtoArray2D(result);
          
          // console.group();
          // console.log("Data from csv");
          // console.dir(this.data);
          // console.log(this.data[0][0]);
          // console.groupEnd();

          this.DATAisOK = true;
          this.createCircle(this.NUM);
          // this.doSomething();
      });
      // console.log(this.data[0][0]);//これは表示されない
  }



    /**
     * フレーム毎の更新をします。
     */
  update() {

    if(this.DATAisOK ==  true){

      // this.Times += 1;//0行目を題名にする場合は前におく
      //   // console.log(this.Times);//303まで！
      // if(this.Times >= 303){this.Times =0;}


      //box
      //イージング
      //positions
      for(let i =0; i< this.NUM*3; i++){
        this.nowBoxPos[i] += (this.targetBoxPos[i]-this.nowBoxPos[i]) *0.02;
      }
      //rotate //scale //opacity
      for(let i =0; i< this.boxList.length; i++){
        
        // this.nowBoxRot[i] += (this.targetBoxRot[i]-this.nowBoxRot[i]) *0.1;
        // this.nowBoxScl[i] += (this.targetBoxScl[i]-this.nowBoxScl[i]) *0.01;
        
        // this.getlineLength(i);
        // this.boxSpeed[i] = this.lineLength;
        // this.nowBoxScl[i] += this.boxSpeed[i];
        this.nowBoxScl[i] += (this.targetBoxScl[i]-this.nowBoxScl[i]) *0.03;
        this.nowBoxOpc[i] += (this.targetBoxOpc[i]-this.nowBoxOpc[i]) *0.03;
      }

      //box
      this.frame += 1;
      if(this.frame%10 == 0){this.listNum += 1;}
      
      if(this.listNum > this.NUM-1){
          this.listNum = 0;
      }
      // console.log(this.listNum);
      for(let i =this.listNum; i< this.listNum+1; i++){
      // for(let i =0; i< this.boxList.length; i++){
          //rotate
          // this.boxList[i].rotation.y = this.nowBoxRot[i];

          if(this.nowBoxScl[i]>= this.targetBoxScl[i]*0.95){
            // this.boxList[i].position.x = Maf.randomInRange( -350, 350);
            // this.boxList[i].position.y = Maf.randomInRange( -180,180);
            // this.boxList[i].position.z = Maf.randomInRange( -10, 10);

            //positions
            this.nowBoxPos[3 * i + 0] = Maf.randomInRange( -window.innerWidth/2, window.innerWidth/2-100);
            this.nowBoxPos[3 * i + 1] = Maf.randomInRange( -window.innerHeight/2, window.innerHeight/2-100);
            this.nowBoxPos[3 * i + 2] = -10;

            let Randomselect = Math.random();
            let PlusMinus = Math.random();
            let lineLengthX = Maf.randomInRange(100, 200);
            let lineLengthY = Maf.randomInRange(50, 150);
            // if(PlusMinus >0.5){ lineLength *= -1;}

            // if(this.nowBoxPos[3 * i + 0]> window.innerWidth/2 -50){ lineLengthX *= -1;}
            // if(this.nowBoxPos[3 * i + 1]> window.innerHeight/2 -50){lineLengthY *= -1;}
                this.targetBoxPos[3 * i + 0] = this.nowBoxPos[3 * i + 0] +lineLengthX;
                this.targetBoxPos[3 * i + 1] = this.nowBoxPos[3 * i + 1] +lineLengthY;
            

            // if(Randomselect >0.5){
            //     if(this.nowBoxPos[3 * i + 0]> window.innerWidth/2 -0 && lineLength>0){ lineLength *= -1;}
            //     if(this.nowBoxPos[3 * i + 0]< -window.innerWidth/2 +0&& lineLength<0){lineLength *= -1;}
            //     this.targetBoxPos[3 * i + 0] = this.nowBoxPos[3 * i + 0] +lineLength;
            //     this.targetBoxPos[3 * i + 1] = this.nowBoxPos[3 * i + 1] +lineLength;
            // }else{
            //     if(this.nowBoxPos[3 * i + 1]> window.innerHeight/2 -0 && lineLength>0){ lineLength *= -1;}
            //     if(this.nowBoxPos[3 * i + 1]< -window.innerHeight/2 +0&& lineLength<0){lineLength *= -1;}
            //     this.targetBoxPos[3 * i + 0] = this.nowBoxPos[3 * i + 0] +lineLength;
            //     this.targetBoxPos[3 * i + 1] = this.nowBoxPos[3 * i + 1] +lineLength;
            // }
  
            this.nowBoxScl[i] = 5.0;
            this.TimesList[i] += 1;//0行目を題名にする場合は前におく
            // console.log(this.Times);//303まで！
            if(this.TimesList[i] >= 303){this.TimesList[i] =1;}
            this.getDateValue(i);
            this.targetBoxScl[i] = this.dateValue;

            this.nowBoxOpc[i] = 4.0;
            this.targetBoxOpc[i] = 0.0;
          }
      }

      for(let i =0; i< this.boxList.length; i++){
          //positions
          this.boxList[i].position.x = this.nowBoxPos[3 * i + 0];
          this.boxList[i].position.y = this.nowBoxPos[3 * i + 1];
          this.boxList[i].position.z = this.nowBoxPos[3 * i + 2];

          //scale
          this.boxList[i].scale.x = this.nowBoxScl[i];
          this.boxList[i].scale.y = this.nowBoxScl[i];
          // this.boxList[i].scale.z = this.nowBoxScl[i];

          //opacity
          this.boxMatList[i].opacity = this.nowBoxOpc[i];
      }
    }

  }

  draw(){
      
  }
}
