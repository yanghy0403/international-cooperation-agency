<template>
  <div class="situationalCon">
    <div class="container">
      <div class="leftCon">
        <div>
          <leftTop
            v-loading="leftTopLoading"
            element-loading-background="rgba(0, 0, 0, 0)"
            :data="leftTopData"
            element-loading-text="加载中..."
          ></leftTop>
        </div>
        <div></div>
        <div>
          <leftCenter
            v-loading="leftOneLoading"
            element-loading-background="rgba(0, 0, 0, 0)"
            :data="leftOneData"
            element-loading-text="加载中..."
          ></leftCenter>
        </div>
      </div>
      <div class="centerCon">
        <centerMap
          v-loading="leftTopLoading"
          element-loading-background="rgba(0, 0, 0, 0)"
          :data="mapData"
          :countryData="countryData"
          @changeType="changeType"
          @changeYear="changeYear"
          @openTimer="openTimer"
          element-loading-text="加载中..."
        ></centerMap>
      </div>
      <div class="rightCon">
        <div>
          <rightTop
            v-loading="rightTopLoading"
            element-loading-background="rgba(0, 0, 0, 0)"
            :data="rightTopData"
            element-loading-text="加载中..."
          ></rightTop>
        </div>
        <div></div>
        <div>
          <rightCenter
            v-loading="rightCenterLoading"
            element-loading-background="rgba(0, 0, 0, 0)"
            :data="rightCenterData"
            element-loading-text="加载中..."
          ></rightCenter>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import visitFun from '@/assets/js/visit.js'
  import leftCenter from "./situationalModules/talent";
  import leftTop from "./situationalModules/communication";
  import rightTop from "./situationalModules/project";
  import rightCenter from "./situationalModules/paper";
  import centerMap from "./situationalModules/map";
  export default {
    components:{
      leftCenter,
      leftTop,
      rightTop,
      rightCenter,
      centerMap,
    },
    data(){
      return{
        leftOneLoading:false,
        leftTopLoading:false,
        rightTopLoading:false,
        rightCenterLoading:false,
        leftOneData:{},
        leftTopData:{},
        rightTopData:{},
        rightCenterData:{},
        countryData:{},
        mapData:{
          data:[],
          geoCoordMap:{}
        },
        params:{
          type:'',
          mq_year:'',
        },
        openTimer:0,

      }
    },
    mounted(){
      this.getLeftCenterData()
      this.getLeftTopData()
      this.getRightTopData()
      this.getRightCenterData()
      this.getcountryData()
      this.getMapData()
    },
    methods:{
      //左中
      getLeftCenterData(){
        this.leftOneLoading = true
        this.axios.get('/situation/talent').then((res) => {
          if (res.data.code == 200) {
            this.leftOneData = res.data.data
            this.leftOneLoading = false
          }
        });
      },

      //左上
      getLeftTopData(){
        this.leftTopLoading = true
        this.axios.get('/situation/communication').then((res) => {
          if (res.data.code == 200) {
            this.leftTopData = res.data.data
            this.leftTopLoading = false
          }
        });
      },

      //右上
      getRightTopData(){
        this.rightTopLoading = true
        this.axios.get('/situation/project').then((res) => {
          if (res.data.code == 200) {
            this.rightTopData = res.data.data
            this.rightTopLoading = false
          }
        });
      },

      //右中
      getRightCenterData(){
        this.rightCenterLoading = true
        this.axios.get('/situation/paper').then((res) => {
          if (res.data.code == 200) {
            this.rightCenterData = res.data.data.data
            this.rightCenterLoading = false
          }
        });
      },

      //国家
      getcountryData(){
        let params = `?mq_year=${this.params.mq_year}&type=${this.params.type}`
        this.axios.get(`/situation/country${params}`).then((res) => {
          if (res.data.code == 200) {
            this.countryData = res.data.data
          }
        });
      },

      //国家
      getMapData(){
        let params = `?mq_year=${this.params.mq_year}&type=${this.params.type}`
        this.axios.get(`/situation/map${params}`).then((res) => {
          if (res.data.code == 200) {
            this.mapData ={
              data:[],
              geoCoordMap:{},
              maxData:res.data.data.max,
              talentMax:res.data.data.talentMax,
              paperMax:res.data.data.paperMax,
              communicationMax:res.data.data.communicationMax,
              projectMax:res.data.data.projectMax,
            }

            res.data.data.content.forEach((item,index)=>{
              this.mapData.data.push({
                name:item.country,
                value:item.value,
              })
              this.mapData.geoCoordMap[item.country] = item.location
            })
          }
        });
      },

      changeType(type,num){
        this.params.type = type
        if(num == 1){
          this.params.mq_year = ''
        }
        this.getcountryData()
        this.getMapData()
      },
      changeYear(year){
        this.params.mq_year = year
        this.getcountryData()
        this.getMapData()
      },
      openTimer(val){
      },
    },
  }
</script>
<style scoped lang="less">
  .situationalCon{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    .container{
      width: 1840px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      .leftCon{
        width: 460px;
        height: 100% ;
        display: flex;
        flex-direction: column;


        div:nth-of-type(1){
          width: 100%;
          flex: 1;
          background: rgba(14,25,41,0.5);
          /*opacity: 0.5;*/
          box-sizing: border-box;
          border: 1px solid rgba(255,255,255,0.1);
        }
        div:nth-of-type(2){
          width: 100%;
          height: 9px;
        }
        div:nth-of-type(3){
          width: 100%;
          flex: 1;
          background: rgba(14,25,41,0.5);
          box-sizing: border-box;
          border: 1px solid rgba(255,255,255,0.1);
        }
      }
      .centerCon{
        width: 900px;
        height: 100% ;
        background: rgba(14,25,41,0.5);
        box-sizing: border-box;
        border: 1px solid rgba(255,255,255,0.1);
      }
      .rightCon {
        width: 460px;
        height: 100% ;
        display: flex;
        flex-direction: column;
        div:nth-of-type(1){
          width: 100%;
          flex: 1;
          background: rgba(14,25,41,0.5);
          box-sizing: border-box;
          border: 1px solid rgba(255,255,255,0.1);
        }
        div:nth-of-type(2){
          width: 100%;
          height: 9px;
        }
        div:nth-of-type(3){
          width: 100%;
          flex: 1;
          background: rgba(14,25,41,0.5);
          box-sizing: border-box;
          border: 1px solid rgba(255,255,255,0.1);
        }
      }
    }
  }
</style>
