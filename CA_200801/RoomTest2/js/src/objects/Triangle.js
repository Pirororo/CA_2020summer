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

    // //普通の三角
    // this.geoCirc = new THREE.CircleGeometry(10, 3);
    // this.matCirc = new THREE.MeshBasicMaterial({
    //   color: 0xcccccc,
    //   opacity: Maf.randomInRange( 0.3, 1.0 ),
    //   transparent: true
    // });

    // this.meshCirc = new THREE.Mesh(
    //   this.geoCirc,
    //   this.matCirc
    // );

    // this.meshCirc.position.y = -50;
    // this.meshCirc.rotation.z = 180 * Math.PI / 180;
    // this.add(this.meshCirc);


            //BOX
            this.NUM = 40;
            this.boxList = [];

            this.nowBoxPos = [];
            this.targetBoxPos = [];

            this.nowBoxRot=[];
            this.targetBoxRot=[];

            this.nowBoxScl=[];
            this.targetBoxScl=[];

            for (let i = 0; i < this.NUM/2; i++) {

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
                
                this.meshCirc.position.set(
                    Maf.randomInRange( -window.innerWidth/12, window.innerWidth/12),
                    Maf.randomInRange( -window.innerHeight/12, window.innerHeight/12),
                    0
                );
                this.meshCirc.rotation.z = 0 * Math.PI / 180;
                this.meshCirc.scale.set(0,0,0);
                this.add(this.meshCirc);

                // 個々のmeshをリスト化して保存
                this.boxList.push(this.meshCirc);

                // ここからnow, targetの初期値設定
                // positions
                // 現在のpositions
                this.nowBoxPos.push(this.meshCirc.position.x, this.meshCirc.position.y, this.meshCirc.position.z);
    
                // ターゲットのpositions
                // this.targetBoxPos.push(0, 0, 0);
                let Randomselect = Math.random();
                let lineLength = Maf.randomInRange(100, 150);
                if(Randomselect >0.5){
                    if(this.nowBoxPos[3 * i + 0]> window.innerWidth/12 && lineLength>0){lineLength *= -1;}
                    if(this.nowBoxPos[3 * i + 0]< -window.innerWidth/12&& lineLength<0){lineLength *= -1;}
                    this.targetBoxPos.push(this.nowBoxPos[3 * i + 0]+lineLength);
                    this.targetBoxPos.push(this.nowBoxPos[3 * i + 1]);
                    this.targetBoxPos.push(this.nowBoxPos[3 * i + 2]);
                }else{
                    if(this.nowBoxPos[3 * i + 0]> window.innerHeight/12 && lineLength>0){lineLength *= -1;}
                    if(this.nowBoxPos[3 * i + 0]< -window.innerHeight/12 && lineLength<0){lineLength *= -1;}
                    this.targetBoxPos.push(this.nowBoxPos[3 * i + 0]);
                    this.targetBoxPos.push(this.nowBoxPos[3 * i + 1]+lineLength);
                    this.targetBoxPos.push(this.nowBoxPos[3 * i + 2]);
                }

                //rotate
                // 現在のrotate
                this.nowBoxRot.push(this.meshCirc.rotation.z);
                // ターゲットのrotate
                this.targetBoxRot.push((~~(Math.random()*360))*Math.PI/180);

                //scale
                // 現在のscale
                this.nowBoxScl.push(this.meshCirc.scale.x);
                // ターゲットのscale
                this.targetBoxScl.push(Math.random()*2);

            }



            for (let i = 0; i < this.NUM/2; i++) {

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
                    Maf.randomInRange( -window.innerWidth/12, window.innerWidth/12),
                    Maf.randomInRange( -window.innerHeight/12, window.innerHeight/12),
                    0
                );
                this.meshRing.rotation.z = 0 * Math.PI / 180;
                this.meshRing.scale.set(0,0,0);
                this.add(this.meshRing);

                // 個々のmeshをリスト化して保存
                this.boxList.push(this.meshRing);



                // ここからnow, targetの初期値設定
                // positions
                // 現在のpositions
                this.nowBoxPos.push(this.meshRing.position.x, this.meshRing.position.y, this.meshRing.position.z);
    
                // ターゲットのpositions
                // this.targetBoxPos.push(0, 0, 0);
                let Randomselect = Math.random();
                let lineLength = Maf.randomInRange(100, 150);
                if(Randomselect >0.5){
                    if(this.nowBoxPos[3 * i + 0]> window.innerWidth/12 && lineLength>0){lineLength *= -1;}
                    if(this.nowBoxPos[3 * i + 0]< -window.innerWidth/12&& lineLength<0){lineLength *= -1;}
                    this.targetBoxPos.push(this.nowBoxPos[3 * i + 0]+lineLength);
                    this.targetBoxPos.push(this.nowBoxPos[3 * i + 1]);
                    this.targetBoxPos.push(this.nowBoxPos[3 * i + 2]);
                }else{
                    if(this.nowBoxPos[3 * i + 0]> window.innerHeight/12 && lineLength>0){lineLength *= -1;}
                    if(this.nowBoxPos[3 * i + 0]< -window.innerHeight/12 && lineLength<0){lineLength *= -1;}
                    this.targetBoxPos.push(this.nowBoxPos[3 * i + 0]);
                    this.targetBoxPos.push(this.nowBoxPos[3 * i + 1]+lineLength);
                    this.targetBoxPos.push(this.nowBoxPos[3 * i + 2]);
                }

                //rotate
                // 現在のrotate
                this.nowBoxRot.push(this.meshRing.rotation.z);
                // ターゲットのrotate
                this.targetBoxRot.push((~~(Math.random()*360))*Math.PI/180);

                //scale
                // 現在のscale
                this.nowBoxScl.push(this.meshRing.scale.x);
                // ターゲットのscale
                this.targetBoxScl.push(Math.random()*2);

            }

  }

    /**
     * フレーム毎の更新をします。
     */
  update() {

      //box
      //イージング
      //positions
      for(let i =0; i< this.NUM*3; i++){
          this.nowBoxPos[i] += (this.targetBoxPos[i]-this.nowBoxPos[i]) *0.1;
      }

      //rotate //scale
      for(let i =0; i< this.NUM; i++){
        this.nowBoxRot[i] += (this.targetBoxRot[i]-this.nowBoxRot[i]) *0.1;
        this.nowBoxScl[i] += (this.targetBoxScl[i]-this.nowBoxScl[i]) *0.1;
      }



      //ターゲットの決定
      this.frame += 1;

      if(this.frame%5 == 0){

          this.listNum += 1;
          if(this.listNum >= this.NUM){
              this.listNum = 0;
          }

          //positions
          let Randomselect = Math.random();
          let PlusMinus = Math.random();
          let lineLength = Maf.randomInRange(100, 150) ;
          if(PlusMinus >0.5){ lineLength *= -1 }

          if(Randomselect >0.5){
              if(this.targetBoxPos[3 * this.listNum + 0]> window.innerWidth/12 && lineLength>0){lineLength *= -1;}
              if(this.targetBoxPos[3 * this.listNum + 0]< -window.innerWidth/12 && lineLength<0){lineLength *= -1;}
              this.targetBoxPos[3 * this.listNum + 0] = this.targetBoxPos[3 * this.listNum + 0]+lineLength;
              this.targetBoxPos[3 * this.listNum + 1] = this.targetBoxPos[3 * this.listNum + 1];
              this.targetBoxPos[3 * this.listNum + 2] = this.targetBoxPos[3 * this.listNum + 2];
          }else{
              if(this.targetBoxPos[3 * this.listNum + 1]> window.innerHeight/12 && lineLength>0){lineLength *= -1;}
              if(this.targetBoxPos[3 * this.listNum + 1]< -window.innerHeight/12 && lineLength<0){lineLength *= -1;}
              this.targetBoxPos[3 * this.listNum + 0] = this.targetBoxPos[3 * this.listNum + 0];
              this.targetBoxPos[3 * this.listNum + 1] = this.targetBoxPos[3 * this.listNum + 1]+lineLength;
              this.targetBoxPos[3 * this.listNum + 2] = this.targetBoxPos[3 * this.listNum + 2];
          }

          //rotate
          this.targetBoxRot[ this.listNum ] = (~~(Math.random()*360))*5*Math.PI/180;

          //scale
          this.targetBoxScl[ this.listNum ] = Math.random()*2;

      }

    // // ばらばらにmaterialのopacity設定するにはmaterialもListにておかないとだめ
    // this.matCirc.opacity -= 0.001;
    // console.log(this.matCirc.opacity);

    // console.log(this.g.parameters.innerRadius);
    // this.g.parameters.innerRadius += 1;


    //box
    for(let i =0; i< this.NUM; i++){
        //positions
        this.boxList[i].position.x = this.nowBoxPos[3 * i + 0];
        this.boxList[i].position.y = this.nowBoxPos[3 * i + 1];
        this.boxList[i].position.z = this.nowBoxPos[3 * i + 2];

        //rotate
        this.boxList[i].rotation.z = this.nowBoxRot[i];

        //scale
        this.boxList[i].scale.x = this.nowBoxScl[i];
        this.boxList[i].scale.y = this.nowBoxScl[i];
        this.boxList[i].scale.z = this.nowBoxScl[i];

        // console.log(this.nowBoxScl[i]);
    }

  }

  draw(){
      
  }
}
