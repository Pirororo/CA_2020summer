// import * as THREE from '../../libs/three.module.js';

/**
 *カークラスです。
 */
export default class Triangle extends THREE.Object3D {
  /**
   * コンストラクターです。
   * @constructor
   */
  constructor() {

    super();

    this.frame = 0;
    // this.scene = 0;
    this.listNum = 0;

    //普通の三角
    this.geoCirc = new THREE.CircleGeometry(10, 3);
    this.matCirc = new THREE.MeshBasicMaterial({
        color: 0xcccccc,
        opacity: Maf.randomInRange( 0.3, 1.0 ),
        transparent: true
    });

    this.meshCirc = new THREE.Mesh(
      this.geoCirc,
      this.matCirc
    );

    this.meshCirc.position.y = -50;
    this.meshCirc.rotation.z = 180 * Math.PI / 180;
    this.add(this.meshCirc);


            //BOX
            this.NUM = 20;
            this.boxList = [];
            this.nowBoxPos = [];
            this.nowBoxRot=[];
            this.nowBoxScl=[];
            this.targetBoxPos = [];
            this.boxGroup = new THREE.Group();
    
            for (let i = 0; i < this.NUM; i++) {
            
                // this.floorsize = 60;
                // this.geometry = new THREE.PlaneBufferGeometry(this.floorsize, this.floorsize,3,3);
    
                // this.hue = Math.random()*200/360;
                // this.boxColor = new THREE.Color();
                // this.boxColor.setHSL(this.hue, 0.8, 0.6);
                // const material = new THREE.MeshBasicMaterial({
                //     color: this.boxColor,
                //     wireframe: true
                // });
    
                // this.box = new THREE.Mesh(this.geometry, material);
                // this.box.position.set(33*i, 0, 0);
                // this.box.rotation.x = 90 * Math.PI / 180;
                // this.boxGroup.add(this.box);


                //中抜き三角
                this.geoRing = new THREE.RingGeometry(7, 10, 3, 1);
                this.matRing = new THREE.MeshBasicMaterial({
                    color: 0xcccccc,
                    opacity: Maf.randomInRange( 0.3, 1.0 ),
                    transparent: true
                });
                this.matRing.needsUpdate = true;
                this.meshRing = new THREE.Mesh(
                    this.geoRing,
                    this.matRing
                );

                this.meshRing.position.set(
                    Maf.randomInRange( -window.innerWidth/8, window.innerWidth/8),
                    Maf.randomInRange( -window.innerHeight/8, window.innerHeight/8),
                    0
                );
                this.meshRing.rotation.z = 0 * Math.PI / 180;
                this.add(this.meshRing);

                // 個々のmeshをリスト化して保存
                this.boxList.push(this.meshRing);
    
                // 現在のpositions
                this.nowBoxPos.push(this.meshRing.position.x, this.meshRing.position.y, this.meshRing.position.z);
    
                // ターゲット位置のpositions
                // this.targetBoxPos.push(0, 0, 0);
                // for(let i =0; i< this.NUM; i++){
                  let Randomselect = Math.random();
                  let lineLength = Maf.randomInRange(100, 150);
                  if(Randomselect >0.5){
                      if(this.nowBoxPos[3 * i + 0]> window.innerWidth/8 && lineLength>0){lineLength *= -1;}
                      if(this.nowBoxPos[3 * i + 0]< -window.innerWidth/8&& lineLength<0){lineLength *= -1;}
                      this.targetBoxPos.push(this.nowBoxPos[3 * i + 0]+lineLength);
                      this.targetBoxPos.push(this.nowBoxPos[3 * i + 1]);
                      this.targetBoxPos.push(this.nowBoxPos[3 * i + 2]);
                  }else{
                      if(this.nowBoxPos[3 * i + 0]> window.innerHeight/8 && lineLength>0){lineLength *= -1;}
                      if(this.nowBoxPos[3 * i + 0]< -window.innerHeight/8 && lineLength<0){lineLength *= -1;}
                      this.targetBoxPos.push(this.nowBoxPos[3 * i + 0]);
                      this.targetBoxPos.push(this.nowBoxPos[3 * i + 1]+lineLength);
                      this.targetBoxPos.push(this.nowBoxPos[3 * i + 2]);
                  }
                // }
            }

            // this.add(this.boxGroup);

  }

    /**
     * フレーム毎の更新をします。
     */
  update() {

      //box
      for(let i =0; i< this.NUM*3; i++){
          this.nowBoxPos[i] += (this.targetBoxPos[i]-this.nowBoxPos[i]) *0.1;
      }

      this.frame += 1;

      if(this.frame%5 == 0){

          // this.scene += 1;
          // if(this.scene >= 2){
          //     this.scene = 1;
          // }
          // if(this.scene == 1){

          this.listNum += 1;
          if(this.listNum >= this.NUM){
              this.listNum = 0;
          }

              // for(let i =0; i< this.NUM; i++){
                let Randomselect = Math.random();
                let PlusMinus = Math.random();
                let lineLength = Maf.randomInRange(100, 150) ;
                if(PlusMinus >0.5){ lineLength *= -1 }

                if(Randomselect >0.5){
                    if(this.targetBoxPos[3 * this.listNum + 0]> window.innerWidth/8 && lineLength>0){lineLength *= -1;}
                    if(this.targetBoxPos[3 * this.listNum + 0]< -window.innerWidth/8 && lineLength<0){lineLength *= -1;}
                    this.targetBoxPos[3 * this.listNum + 0] = this.targetBoxPos[3 * this.listNum + 0]+lineLength;
                    this.targetBoxPos[3 * this.listNum + 1] = this.targetBoxPos[3 * this.listNum + 1];
                    this.targetBoxPos[3 * this.listNum + 2] = this.targetBoxPos[3 * this.listNum + 2];
                }else{
                    if(this.targetBoxPos[3 * this.listNum + 1]> window.innerHeight/8 && lineLength>0){lineLength *= -1;}
                    if(this.targetBoxPos[3 * this.listNum + 1]< -window.innerHeight/8 && lineLength<0){lineLength *= -1;}
                    this.targetBoxPos[3 * this.listNum + 0] = this.targetBoxPos[3 * this.listNum + 0];
                    this.targetBoxPos[3 * this.listNum + 1] = this.targetBoxPos[3 * this.listNum + 1]+lineLength;
                    this.targetBoxPos[3 * this.listNum + 2] = this.targetBoxPos[3 * this.listNum + 2];
                }
              // }

      }

    // // ばらばらにmaterialのopacity設定するにはmaterialもListにておかないとだめ
    // this.matCirc.opacity -= 0.001;
    // console.log(this.matCirc.opacity);

    // console.log(this.g.parameters.innerRadius);
    // this.g.parameters.innerRadius += 1;



    //box
    for(let i =0; i< this.NUM; i++){
        this.boxList[i].position.x = this.nowBoxPos[3 * i + 0];
        this.boxList[i].position.y = this.nowBoxPos[3 * i + 1];
        this.boxList[i].position.z = this.nowBoxPos[3 * i + 2];

        // this.boxList[i].rotate.z = this.nowBoxRot[i];
        // this.boxList[i].scale = this.nowBoxScl[i];
    }

  }

  draw(){
      
  }
}
