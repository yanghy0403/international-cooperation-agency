<template>
  <div class="conDiv">
    <div v-if="newPersonImg && (newPersonImg!= 'null') "  ref="itemImg" class="itemImg">
      <img  :src=" 'http://10.0.90.42:8088/'+newPersonImg" alt />
    </div>
    <div v-else ref="itemImg" class="itemImg">
      <div >暂无</div>
      <div >头像</div>
    </div>
    <div class="item item0" @mouseenter="enter()" @mouseleave="leave()">
      <div class="ballPoint" style="left:48.25502516487458%;top:0.96954135095477%">
        <div class="ballDiv" v-if="personData[0]">
          <div class="ballText"><span>{{personData[0]?personData[0]:''}}</span></div>
          <div class="ball"></div>
        </div>
      </div>
    </div>
    <div class="item item1" @mouseenter="enter()" @mouseleave="leave()">
      <div class="ballPoint" style="left:3.1359005254057237%;top:67.42860236609155%">
        <div class="ballDiv" v-if="personData[1]">
          <div class="ballText"><span>{{personData[1]?personData[1]:''}}</span></div>
          <div class="ball"></div>
        </div>
      </div>
    </div>
    <div class="item item2" @mouseenter="enter()" @mouseleave="leave()">
      <div class="ballPoint" style="left:38.75244728280675%;top:98.71850323926176%">
        <div class="ballDiv" v-if="personData[2]">
          <div class="ballText"><span>{{personData[2]?personData[2]:''}}</span></div>
          <div class="ball"></div>
        </div>
      </div>
    </div>
    <div class="item item3" @mouseenter="enter()" @mouseleave="leave()">
      <div class="ballPoint" style="left:84.22735529643458%;top:86.44843137107044%">
        <div class="ballDiv" v-if="personData[3]">
          <div class="ballText"><span>{{personData[3]?personData[3]:''}}</span></div>
          <div class="ball"></div>
        </div>
      </div>
    </div>
    <div class="item item4" @mouseenter="enter()" @mouseleave="leave()">
      <div class="ballPoint" style="left:99.29980185352524%;top:41.66156266419484%">
        <div class="ballDiv" v-if="personData[4]">
          <div class="ballText"><span>{{personData[4]?personData[4]:''}}</span></div>
          <div class="ball"></div>
        </div>
      </div>
    </div>
    <div class="item item5" @mouseenter="enter()" @mouseleave="leave()">
      <div class="ballPoint" style="left:69.69709547954754%;top:4.0432330372382665%">
        <div class="ballDiv" v-if="personData[5]">
          <div class="ballText"><span>{{personData[5]?personData[5]:''}}</span></div>
          <div class="ball"></div>
        </div>
      </div>
    </div>

    <!--:style="{'left':styleArr2[index]['left'],'top':styleArr2[index]['top']}"-->
    <!--<div class="item" :class="'item'+index" @mouseenter="enter()" @mouseleave="leave()" v-for="(item,index) in personData" :key="index">-->
      <!--<div class="ballPoint" :style="[styleArr[index]]">-->
        <!--<div class="ballDiv" >-->
          <!--<div class="ballText">{{item.name}}</div>-->
          <!--<div class="ball"></div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>
<script>
  export default {
    data(){
      return{
        centerImg:require("@/assets/images/国际人才/person.png"),
        personData:[ ],
        style0:'',
        style1:'',
        style2:'',
        style3:'',
        style4:'',
        style5:'',
        style6:'',

        angle0 : 270,
        angle1 : 270,
        angle2 : 270,
        angle3 : 270,
        angle4 : 270,
        angle5 : 270,
        angle6 : 270,
        styleArr:['','','','','','',''],
        styleArr3:['','','','','','',''],
        styleArr4:['','','','','','',''],
        styleArr2:[
          {
            left:'',
            top:'',
          },{
            left:'',
            top:'',
          },{
            left:'',
            top:'',
          },{
            left:'',
            top:'',
          },{
            left:'',
            top:'',
          },{
            left:'',
            top:'',
          },{
            left:'',
            top:'',
          },
        ],
        angleArr:[270,270,270,270,270,270,270],
        angleRange:[0.2,0.4,0.6,0.8,1,1.2,1.4],
        myTimer:null,
        timeRank:20,
        // newPersonImg:'',
      }
    },
    props:['personDataVal','personImg'],
    computed:{
      newPersonImg:{
        get(){
          //console.log(this.personImg && (this.personImg!= null))
          //console.log(this.personImg)
          //console.log(this.personImg == 'null')

          return this.personImg
        }

      } ,
    },
    watch:{
      personDataVal:{
        deep: true, // 深度监听
          immediate: true, // 监听到后，立即执行 handler方法
          handler (val) {
            let that = this
            let arr = ['张三','张三2','张三3','张三4','张三5','张三6',]


            this.personData = val


            this.angle0 = 270
            this.angle1= 270
            this.angle2 = 270
            this.angle3 = 270
            this.angle4 = 270
            this.angle5 = 270
            this.angle6 = 270
          }
      },
    },
    created(){
      // this.ballTurn()

    },
    mounted(){

    },
    methods:{
      enter(){
//         clearInterval(this.myTimer);
//         this.myTimer = null
//       },
//       leave(){
// //        clearInterval(this.myTimer);
//         this.ballTurn()
      },

      ballTurn(){
        let that = this

        this.myTimer = setInterval( ()=> {
          that.cycleProcess()
        }, that.timeRank);

      },



      cycleProcess(){
        let that = this
        //起始位置
        let initLeft = 50;
        let initTop = 0;
        //半径
        let r = 50;

        // console.log( (new Date()).valueOf())

        that.angle0 = that.angle0 + 0.2;
        if(that.angle0>360){that.angle0 = 0}

        that.angle1 = that.angle1+0.4;
        if(that.angle1>360){that.angle1 = 0}

        that.angle2 = that.angle2+0.6;
        if(that.angle2>360){that.angle2 = 0}

        that.angle3 = that.angle3+0.8;
        if(that.angle3>360){that.angle3 = 0}

        that.angle4 = that.angle4+1;
        if(that.angle4>360){that.angle4 = 0}

        that.angle5 = that.angle5+1.2;
        if(that.angle5>360){that.angle5 = 0}

        that.angle6 = that.angle6+1.4;
        if(that.angle6>360){that.angle6 = 0}

        // that.style6 = 'left:'+(initLeft + r * Math.sin(that.angle0 / 180 * Math.PI)) + '%;'+'top:'+(initTop + (r - r * Math.cos(that.angle0 / 180 * Math.PI))) + '%'
        that.style5 = 'left:'+(initLeft + r * Math.sin(that.angle1 / 180 * Math.PI)) + '%;'+'top:'+(initTop + (r - r * Math.cos(that.angle1 / 180 * Math.PI))) + '%'
        that.style4 = 'left:'+(initLeft + r * Math.sin(that.angle2 / 180 * Math.PI)) + '%;'+'top:'+(initTop + (r - r * Math.cos(that.angle2 / 180 * Math.PI))) + '%'
        that.style3 = 'left:'+(initLeft + r * Math.sin(that.angle3 / 180 * Math.PI)) + '%;'+'top:'+(initTop + (r - r * Math.cos(that.angle3 / 180 * Math.PI))) + '%'
        that.style2 = 'left:'+(initLeft + r * Math.sin(that.angle4 / 180 * Math.PI)) + '%;'+'top:'+(initTop + (r - r * Math.cos(that.angle4 / 180 * Math.PI))) + '%'
        that.style1 = 'left:'+(initLeft + r * Math.sin(that.angle5 / 180 * Math.PI)) + '%;'+'top:'+(initTop + (r - r * Math.cos(that.angle5 / 180 * Math.PI))) + '%'
        that.style0 = 'left:'+(initLeft + r * Math.sin(that.angle6 / 180 * Math.PI)) + '%;'+'top:'+(initTop + (r - r * Math.cos(that.angle6 / 180 * Math.PI))) + '%'

        // console.log(1, that.style1 )
        // console.log(2, that.style2)
        // console.log(3, that.style3 )
        // console.log(4, that.style4 )
        // console.log(5, that.style5 )
      },
    },
    beforeDestroy() {
      //清除定时器
      if(this.myTimer){
        clearInterval(this.myTimer);
        this.myTimer = null;
      }
    },
  }
</script>
<style scoped lang="less">
  .conDiv{
    width:100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .item{

      border-radius: 500px;
      position: absolute;
      .ballPoint{
        position: absolute;
        width:1px;
        height:1px;
        left: 0%;
        top:50%;
        .ballDiv{
          width:28px;
          height:28px;
          position: absolute;
          border-radius: 28px;
          left: -14px;
          top:-14px;
          background: rgba(252,24,2,0);
          display: flex;
          justify-content: center;
          align-items: center;
          .ballText{
            position: absolute;
            bottom:20px;
            /*top:-15px;*/
            width:100px;
            text-align: center;
            color: #7c90a9;
            font-size: 12px;
            span{
              /*background: #fff;*/
              text-shadow:-1px 0 white,0 1px white,1px 0 white,0 -1px white;
            }
          }
          .ball{
            width:12px;
            height:12px;
            border-radius: 30px;
            background: #7c90a9;
          }
        }
      }


    }
    .item:hover{
      border:1px solid #fe5d49;
      .ballDiv{
        z-index: 10000000;
        background: rgba(252,24,2,0.2);
        .ball{
          background: #fe5d49;
        }
        .ballText{
          color: #fe5d49;
          font-size: 14px;

        }
      }
    }
    .itemImg{
      width:28%;
      height:28%;
      left:36%;
      top:36%;
      border:12px solid #d9dee4;
      border-radius: 500px;
      position: absolute;
      z-index:1;
      div{
        width:100%;
        height:50%;
        font-size: 16px;
        text-align: center;
        background: #d9dee4;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      img{
        width:100%;
        height:100%;
        float: left;
        border-radius: 500px;
      }
    }
    .item0{
      width:30%;
      height:30%;
      left:35%;
      top:35%;
      z-index:120;
      border:1px solid rgba(124,144,169,1);
    }
    .item1{
      width:42%;
      height:42%;
      left:29%;
      top:29%;
      z-index:90;
      border:1px solid rgba(124,144,169,0.9);
    }
    .item2{
      width:54%;
      height:54%;
      left:23%;
      top:23%;
      z-index:80;
      border:1px solid rgba(124,144,169,0.8);
    }
    .item3{
      width:66%;
      height:66%;
      left:17%;
      top:17%;
      z-index:70;
      border:1px solid rgba(124,144,169,0.7);
    }
    .item4{
      width:78%;
      height:78%;
      left:11%;
      top:11%;
      z-index:60;
      border:1px solid rgba(124,144,169,0.6);
    }
    .item5{
      width:90%;
      height:90%;
      left:5%;
      top:5%;
      z-index:50;
      border:1px solid rgba(124,144,169,0.5);
    }
    .item6{
      width:90%;
      height:90%;
      left:5%;
      top:5%;
      z-index:40;
      border:1px solid rgba(124,144,169,0.4);
    }

  }
</style>
