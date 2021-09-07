<template>
  <div class="details">
    <!-- 左侧 -->
    <div class="details-fl">
      <div class="fl-logo" @click="goHome">
        <img src="../../assets/images/国际人才/页面固定内容/logo.png" alt />
        <p>中国科学院国际合作</p>
        <p>数据汇交与分析平台</p>
      </div>
      <div class="fl-info">
        <div class="imgDiv">
          <img :src="personDetails.imgUrl?`http://10.0.90.42:8088/${realPersonImg}`:personImg" alt />
        </div>
        <p class="personName" >{{personDetails.name?personDetails.name:'暂无数据'}}</p>
        <p class="personNationality">{{personDetails.nationality}}(籍)</p>
        <div class="education">
          <p class="line"></p>
          <p class>{{personDetails.profesTitle}}·{{personDetails.subject?personDetails.subject:''}}</p>
          <p class>{{personDetails.highestDegName?personDetails.highestDegName:''}}</p>
          <p class="line"></p>
        </div>
        <p class="orgName orgZH">
          <label>机构：</label>
          <span>{{personDetails.instName?personDetails.instName:'暂无数据'}}</span>
        </p>
      </div>
      <div class="Influence" ref="radarDiv">
        <influence :personUniqueId="personUniqueId" />
      </div>
      <div class="fl-btm" style="width: 220px;"  @click="handleClose">
        <div class="iconfontClose">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="closeName">返回上一页</div>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="details-fr">
      <div v-show="showDownload" class="bagshadow">
        <div class="bagLeft"></div>
        <div class="bagRight">
          <div class="row1">
            <span>人员报告信息下载</span>
            <span @click="toDownload(1)"><img src="../../assets/images/exchange/close.png" alt=""></span>
          </div>
          <div class="row2"><input v-model="filename" type="text"></div>
          <div class="row3" @click="fillName">使用系统规则自动命名</div>
          <div class="row4">
            <div class="selectDiv">
              <div>已选（{{selectEdNum}}）</div>
              <div><span @click="choseAll(0)">全选</span> | <span @click="choseAll(1)">取消</span></div>
            </div>

            <ul class="downloadUl">
              <li @click="choseItem(index)" class="item" v-for="(item,index) in downloadData" :key="index">
                <div>
                  <img v-if="item.selected" src="../../assets/images/exchange/selected.png" alt="">
                  <img v-else src="../../assets/images/exchange/selectDefault.png" alt="">
                </div>
                <div><img src="../../assets/images/exchange/toRight.png" alt=""></div>
                <div>{{item.label}}</div>
              </li>
            </ul>
          </div>
          <div class="row5">
            <div class="titleDiv">格式</div>
            <div @click="chooseType(1)" class="itemDiv">
              PDF
              <img v-if="typeNum == 1" src="../../assets/images/exchange/selected.png" alt="">
              <img v-else src="../../assets/images/exchange/selectDefault.png" alt="">
            </div>
            <div @click="chooseType(2)" class="itemDiv">
              Word
              <img  v-if="typeNum == 2" src="../../assets/images/exchange/selected.png" alt="">
              <img v-else src="../../assets/images/exchange/selectDefault.png" alt="">
            </div>
            <div @click="chooseType(3)" class="itemDiv">
              XLS
              <img  v-if="typeNum == 3" src="../../assets/images/exchange/selected.png" alt="">
              <img v-else src="../../assets/images/exchange/selectDefault.png" alt="">
            </div>
          </div>
          <div class="row6">
            <div @click="download">下载</div>
          </div>
        </div>
      </div>
      <div class="fr-header">
        <div class="header-fl">
          <ul>
            <li>
              <lable>国际合作度</lable>
              <span>{{topData.internationalCooperation}}</span>
            </li>
            <li>
              <lable>合作论文（篇）</lable>
              <span>{{topData.paperSize}}</span>
            </li>
            <li>
              <lable>出访（次）</lable>
              <span>{{topData.visitOutSize}}</span>
            </li>
          </ul>
        </div>
        <div class="header-fr">
          <ul>
            <li @click="toDownload(0)" class="li1"></li>
            <li class="li2" @click="favorites"></li>
            <li class="li3"></li>
          </ul>
          <Login />
        </div>
      </div>
      <div class="scrollDiv">
        <div class="container_1">
          <div class="chart CooperationTrack" ref="traceDiv">
            <cooperationTrack :detailData="cooperationdetailData"  :linksData="linksData"/>
          </div>
          <div class="chart personRelated" ref="networkDiv" >
            <personRelatedModule  :personImg="realPersonImg"  :relatedData="relatedData" :isRelatedChage="isRelatedChage"/>
          </div>
        </div>
        <div class="container_2" >
          <div class="interflow" ref="mapDiv" >
            <interflowModule :exchangetable="communicationData"/>
          </div>
        </div>
        <div class="container_3">
          <div ref="picture7" :style="{'width':dataNum==1?'97%':'48%'}" v-if="JSON.stringify(internationalOrgData.chart) != '[]'&& dataNum!=0" class="chart Learn">
            <internationalOrg :internationalOrgData="internationalOrgData" />
          </div>
          <div ref="picture3" :style="{'width':dataNum==1?'97%':'48%'}" v-if="JSON.stringify(talentData.chart) != '[]'&& dataNum!=0"   class="chart Learn">
            <talentModule :talentData="talentData"/>
          </div>
          <div ref="picture4" :style="{'width':dataNum==1?'97%':'48%'}" v-if="JSON.stringify(projectData.chart) != '[]'&& dataNum!=0" class="chart Learn">
            <projectModule :projectData="projectData" />
          </div>
          <div ref="picture8" :style="{'width':dataNum==1?'97%':'48%'}" v-if="JSON.stringify(platformData.chart) != '[]'&& dataNum!=0"  class="chart work">
            <platformModule :platformData="platformData"></platformModule>
          </div>
          <div ref="picture5" :style="{'width':dataNum==1?'97%':'48%'}" v-if="JSON.stringify(awardData.chart) != '[]'&& dataNum!=0"  class="chart work">
            <rewardModule :rewardData="awardData" />
          </div>
          <div ref="picture6" :style="{'width':dataNum%2==1?'97%':'48%'}" v-if="JSON.stringify(produceData.table) != '[]'&& dataNum!=0"  class="chart Learn">
            <outputModule :produceData="produceData" />
          </div>
        </div>
      </div>
      <div class="record-info">
        <span>中国科学院国际合作局 版权所有</span>
        <span class="line">|</span>
        <span>技术支持：中国科学院计算机网络信息中心</span>
      </div>
    </div>
  </div>
</template>

<script>
  import influence from "./detailModules/Influence";
  import cooperationTrack from "./detailModules/CooperationTrack";
  import personRelatedModule from "./detailModules/personRelatedModule";
  import interflowModule from "./detailModules/interflowModule";
  import talentModule from "./detailModules/talentModule";
  import platformModule from "./detailModules/platformModule";
  import projectModule from "./detailModules/projectModule";
  import learnModule from "./detailModules/learnModule";
  import rewardModule from "./detailModules/rewardModule";
  import outputModule from "./detailModules/outputModule";
  import internationalOrg from "./detailModules/internationalOrg";
  import visitFun from '@/assets/js/visit.js'

  export default {
    components: {
      influence,
      cooperationTrack,
      personRelatedModule,
      interflowModule,
      talentModule,
      platformModule,
      projectModule,
      learnModule,
      rewardModule,
      outputModule,
      internationalOrg,
    },
    data() {
      return {
        personImg:require('../../assets/images/国际人才/defaultPerson.png'),
        realPersonImg:'',
        iconData:{
          icon1:require('../../assets/images/国际人才/details/下载-默认状态.png'),
          icon1Hover:require('../../assets/images/国际人才/details/下载-选中状态.png'),
          icon2:require('../../assets/images/国际人才/details/收藏-默认状态.png'),
          icon2Hover:require('../../assets/images/国际人才/details/收藏-选中状态.png'),
          icon3:require('../../assets/images/国际人才/details/分享-默认状态.png'),
          icon3Hover:require('../../assets/images/国际人才/details/分享-选中状态.png'),
        },
        personName:'',
        personUniqueId:'',
        statisticsData:{

        },
        personDetails:{},
        paperData:[],
        linksData:[],
        cooperationdetailData:[],
        workData:[],
        studyData:{},
        awardData:{},
        exchang:{},
        exchangetable:{},
        relatedData:{}, //关联网络数据
        studytable:{},
        dataNum:0,
        isRelatedChage:true,
        topData:{},
        talentData:{},   //人才
        platformData:{},   //平台
        projectData:{},   //项目
        produceData:{},   //论文
        communicationData:{},   //交流
        internationalOrgData:{},   //国际组织
        showDownload:false,
        selectEdNum:0,
        typeNum:0,
        filename:'',
        alldownloadData:[
          {
            name:'trace',
            label:'参与国际合作轨迹',
            selected:false,
            exist:false,
            img:'',
          },  {
            name:'network',
            label:'关联网络',
            selected:false,
            exist:false,
            img:'',
          },  {
            name:'communication',
            label:'交流',
            selected:false,
            exist:false,
            img:'',
          },  {
            name:'talent',
            label:'人才',
            selected:false,
            exist:false,
            img:'',
          },  {
            name:'project',
            label:'项目',
            selected:false,
            exist:false,
            img:'',
          },  {
            name:'award',
            label:'奖励',
            selected:false,
            exist:false,
            img:'',
          },  {
            name:'produce',
            label:'产出',
            selected:false,
            exist:false,
            img:'',
          },  {
            name:'organization',
            label:'国际组织',
            selected:false,
            img:'',
          },  {
            name:'platform',
            label:'平台',
            selected:false,
            exist:false,
            img:'',
          },
        ],

      };
    },
    computed:{
      downloadData(){
        let newData = []
        this.alldownloadData.forEach((item,index)=>{
          if(item.exist == true){
            newData.push(item)
          }
        })
        return newData
      },
    },
    created(){
      this.personUniqueId = this.$route.query.id
      // 此处为测试id
      // this.personUniqueId = '8d6aaf2f328472884c7bd92c03de61a6  '   //  人员详情和雷达测试id   参与国际合作轨迹  人员关联网络
      // this.personUniqueId = 'fe1db1bf97aa2e717bcb8860c358942f  '   //  奖励
      // this.personUniqueId = '88736a8c372bfa3929e239f751993dd9  '   //  人才
      // this.personUniqueId = '3031e32d2fb0f6d3d0dbd04df1ac613e  '   //  平台
      // this.personUniqueId = '14a6399dafc1c6ea9a638cb5a3900a76  '   //  项目
      // this.personUniqueId = '1a1cf1523663a56b6b18d4c7f76655b2  '   //  项目
      // this.personUniqueId = 'c1de237c27606ecff87a156f940cbc31  '   //  交流
      this.getDetail()
      this.getTop()
      this.getCooperation()
      this.getNetwork()
      this.getTalent()
      this.getPlatform()
      this.getProject()
      this.getProduce()
      this.getCommunication()
      this.getinternationalOrgData()
      this.getAward()
      let that = this
    },
    mounted() {},
    methods: {
      //收藏
      favorites(){
        let userId = 'admin'
        let type = '人员'
        let content = `国内人才-${this.personDetails.nationality}-${this.personDetails.name}@domesticPersonnelInfor-${this.personUniqueId}`
        visitFun.favoritesFun(userId,type,content)
      },
      // 打开关闭下载页
      toDownload(val){
        if(val == 0){
          this.showDownload = true
        }else{
          this.showDownload = false
          this.downloadData.forEach((item,index)=>{
            item.selected = false
            this.selectEdNum = 0
          })
        }
      },
      // 选择单个
      choseItem(val){
        this.downloadData[val].selected = !this.downloadData[val].selected
        if(this.downloadData[val].selected == true){
          this.selectEdNum = this.selectEdNum + 1
        }else{
          this.selectEdNum = this.selectEdNum - 1
        }
      },
      // 全选 ，全部取消
      choseAll(val){
        if(val == 0){
          this.downloadData.forEach((item,index)=>{
            item.selected = true
          })
          this.selectEdNum = this.downloadData.length
        }else{
          this.downloadData.forEach((item,index)=>{
            item.selected = false
          })
          this.selectEdNum = 0
        }
      },
      chooseType(val){
        this.typeNum = val
      },
      //填充名称
      fillName(){
       let name = this.personDetails.name
        this.filename = `${name}的个人主页`
      },
      //下载
      download(){
        let _this = this
        if(this.filename == ''){
          alert('青输入文件名称！')
        }else{
          if( this.typeNum == 1){ // pef格式
            this.downloadfile('/domestic/pdf')
          }else if(this.typeNum == 3){
            let selections = []
            this.downloadData.forEach((item,index)=>{
              if(item.selected){
                selections.push(item.name)
              }
            })
            let newselections = JSON.stringify(selections)
            window.open(`http://10.0.90.42:8088/domestic/export?fileName=${this.filename}&selections=${newselections}&uniqueId=${this.personUniqueId}`)
          }else if(this.typeNum == 2){
            this.downloadfile('/domestic/word')
          }else{
            alert('请选择要下载的格式')
          }
        }
      },

      downloadfile(fileUrl){
        let _this = this
        let params ={
          fileName:this.filename,
          map:'',
          network:'',
          personId:this.personUniqueId,
          radar:'',
          trace:'',
          paper:'',
          picture5:'',
          picture6:'',
          picture7:'',
          picture8:'',
          picture9:'',
          // picture10:'',
        }

        let p1 = new Promise((resolve,reject)=> {
          let traceDiv = _this.$refs.traceDiv
          visitFun.getImgBase64(traceDiv).then((res)=>{
            params.trace = res.split(',')[1]
            resolve(true)
          })
        })

        let p2 = new Promise((resolve,reject)=> {
          let networkDiv = _this.$refs.networkDiv
          visitFun.getImgBase64(networkDiv).then((res)=>{
            params.network = res.split(',')[1]
            resolve(true)
          })
        })

        let p3 = new Promise((resolve,reject)=> {
          let mapDiv = _this.$refs.mapDiv
          visitFun.getImgBase64(mapDiv).then((res)=>{
            params.map = res.split(',')[1]
            resolve(true)
          })
        })

        let p4 = new Promise((resolve,reject)=> {
          let radarDiv = _this.$refs.radarDiv
          visitFun.getImgBase64(radarDiv).then((res)=>{
            params.radar = res.split(',')[1]
            resolve(true)
          })
        })

        //7,3,4,8,5,6
        let arrImg = []

        let p5 = new Promise((resolve,reject)=> {
          if(this.alldownloadData[7].exist){
            let picture7 = _this.$refs.picture7
            visitFun.getImgBase64(picture7).then((res)=>{
              arrImg.push(res.split(',')[1])
              resolve(true)
            })
          }else{
            resolve(true)
          }
        })
        let p6 = new Promise((resolve,reject)=> {
          if(this.alldownloadData[3].exist){
            let data = _this.$refs.picture3
            visitFun.getImgBase64(data).then((res)=>{
              arrImg.push(res.split(',')[1])
              resolve(true)
            })
          }else{
            resolve(true)
          }
        })
        let p7= new Promise((resolve,reject)=> {
          if(this.alldownloadData[4].exist){
            let data = _this.$refs.picture4
            visitFun.getImgBase64(data).then((res)=>{
              arrImg.push(res.split(',')[1])
              resolve(true)
            })
          }else{
            resolve(true)
          }
        })

        let p8= new Promise((resolve,reject)=> {
          if(this.alldownloadData[8].exist){
            let data = _this.$refs.picture8
            visitFun.getImgBase64(data).then((res)=>{
              arrImg.push(res.split(',')[1])
              resolve(true)
            })
          }else{
            resolve(true)
          }
        })

        let p9= new Promise((resolve,reject)=> {
          if(this.alldownloadData[5].exist){
            let data = _this.$refs.picture5
            visitFun.getImgBase64(data).then((res)=>{
              arrImg.push(res.split(',')[1])
              resolve(true)
            })
          }else{
            resolve(true)
          }
        })

        let p10= new Promise((resolve,reject)=> {
          if(this.alldownloadData[6].exist){
            let data = _this.$refs.picture6
            visitFun.getImgBase64(data).then((res)=>{
              params.paper = res.split(',')[1]
              resolve(true)
            })
          }else{
            resolve(true)
          }
        })

        Promise.all([p1,p2,p3,p4,p5,p6,p7,p8,p9,p10]).then(()=> {
          if(JSON.stringify(arrImg) != '[]'){
            arrImg.forEach((item,index)=>{
              let key = `picture${index+5}`
              params[key] = item
            })
          }
          _this.axios(visitFun.settingParameters('post',fileUrl,params)).then((res) => {
            if (res.data.code == 200) {
              window.open(res.data.data.fileDownUrl)
            }
          });
        })
      },

      // 人员详情接口
      getDetail(){
        let params = this.personUniqueId
        this.axios.get(`/domestic/detail/${params}`)
          .then(res => {
            if (res.data.code == 200) {
              this.personDetails = (res.data.data)
              this.realPersonImg = this.personDetails.imgUrl
            }
          });
      },

      // 顶层指标
      getTop(){
        let params = this.personUniqueId
        this.axios.get(`/domestic/top/${params}`)
          .then(res => {
            if (res.data.code == 200) {
              this.topData = (res.data.data)
            }
          });
      },

      // 参与国际合作轨迹
      getCooperation(){
        let params = this.personUniqueId
        this.axios.get(`/domestic/cooperation/${params}`)
          .then(res => {
            if (res.data.code == 200) {
              this.linksData = res.data.data.links
              this.cooperationdetailData = res.data.data.detail
              this.alldownloadData[0].exist = true
            }
          });
      },

      // 人员关联网络
      getNetwork(){
        let params = this.personUniqueId
        this.axios.get(`/domestic/network/${params}`)
          .then(res => {
            if (res.data.code == 200) {
              this.relatedData = res.data.data
              this.isRelatedChage = !this.isRelatedChage
              this.alldownloadData[1].exist = true
            }
          });
      },

      // 奖励
      getAward(){
        let params = this.personUniqueId
        this.axios.get(`/domestic/award/${params}`)
          .then(res => {
            if (res.data.code == 200) {
              this.awardData = res.data.data
              if(JSON.stringify(this.awardData.chart) != "[]"){
                this.dataNum += 1
                this.alldownloadData[5].exist = true
              }
            }
          });
      },

      // 人才
      getTalent(){
        let params = this.personUniqueId
        this.axios.get(`/domestic/talent/${params}`)
          .then(res => {
            if (res.data.code == 200) {
              this.talentData = res.data.data
              if(JSON.stringify(this.talentData.chart) != "[]"){
                this.dataNum += 1
                this.alldownloadData[3].exist = true
              }
            }
          });
      },

      // 平台
      getPlatform(){
        let params = this.personUniqueId
        this.axios.get(`/domestic/platform/${params}`)
          .then(res => {
            if (res.data.code == 200) {
              this.platformData = res.data.data
              if(JSON.stringify(this.platformData.chart) != "[]"){
                this.dataNum += 1
                this.alldownloadData[8].exist = true
              }
            }
          });
      },

      // 项目
      getProject(){
        let params = this.personUniqueId
        this.axios.get(`/domestic/project/${params}`)
          .then(res => {
            if (res.data.code == 200) {
              this.projectData = res.data.data
              if(JSON.stringify(this.projectData.chart) != "[]"){
                this.dataNum += 1
                this.alldownloadData[4].exist = true
              }
            }
          });
      },
      // 国际组织
      getinternationalOrgData(){
        let params = this.personUniqueId
        this.axios.get(`/domestic/international/${params}`)
          .then(res => {
            if (res.data.code == 200) {
              this.internationalOrgData = res.data.data
              if(JSON.stringify(this.internationalOrgData.chart) != "[]"){
                this.dataNum += 1
                this.alldownloadData[7].exist = true
              }
            }

          });
      },

      // 论文
      getProduce(){
        let params = this.personUniqueId
        this.axios.get(`/domestic/produce/${params}`)
          .then(res => {
            if (res.data.code == 200) {
              this.produceData = res.data.data
              if(JSON.stringify(this.produceData.table) != "[]"){
                this.dataNum += 1
                this.alldownloadData[6].exist = true
              }
            }
          });
      },

      // 交流
      getCommunication(){
        let params = this.personUniqueId
        this.axios.get(`/domestic/communication/${params}`)
          .then(res => {
            if (res.data.code == 200) {
              this.communicationData = res.data.data
              this.alldownloadData[2].exist = true
            }
          });
      },




      // 返回首页
      handleClose() {
        this.$router.go(-1);
      },
      // 返回首页
      goHome() {
        this.$router.push({ path: "/" });
      },
    }
  };
</script>

<style lang="less" scoped>
  @import "../../assets/css/Details.less";
  /*@import "../../assets/css/exchange/index.less";*/

  .fl-info {
    margin-top: 18px;
    .imgDiv{
      width: 220px;
      height: 220px;
      display: flex;
      justify-content: flex-start;
      img{
        height: 220px;
        width: auto;
        max-width:220px;
      }
    }
    .personName {
      margin-top: 26px;
      font-size: 24px;
      color: #ff3925;
      width: 100%;

      word-break:break-all;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .personNationality {
      //  margin-top: 10px;
      font-size: 16px;
      color: #ff3925;
    }
    .education {
      color: #d3d3d3;
      .line {
        width: 77px;
        height: 2px;
        background: #49586e;
        margin: 16px 0;
      }
      p {
        font-size: 14px;
        line-height: 20px;
      }
    }
    .orgName {
      color: #d3d3d3;
      font-size: 14px;
      line-height: 24px;

      word-break:break-all;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .orgZH {
      margin-top: 20px;
    }
  }
  .Influence {
    width: 160px;
    height: 160px;
    margin-top: 40px;
    // border: 1px solid #fff;
  }
  .scrollDiv {
    margin-top: 110px;
  }
  .container_1 {
    width: 100%;
    display: flex;
    .chart {
      width: 48%;
      height: 400px;
      margin-left: 1%;
      background: #f4f5f7;
    }
  }
  .container_2 {
    width: 100%;
    margin-top: 1%;
    .interflow {
      width: 97%;
      height: 530px;
      margin-left: 1%;
      background: #f4f5f7;
    }
  }
  .container_3 {
    width: 100%;
    display: flex;
    margin-top: 10px;
    flex-wrap: wrap;
    .chart {
      margin-bottom: 10px;
      width: 48%;
      height: 400px;
      margin-left: 1%;
      background: #f4f5f7;
    }
  }
  .container_4 {
    width: 100%;
    display: flex;
    margin-top: 1%;
    .chart {
      width: 48%;
      height: 400px;
      margin-left: 1%;
      background: #f4f5f7;
    }
  }
  .record-info {
    margin: 22px 0 38px 88px;
    img {
      width: 12px;
      height: 16px;
      margin-right: 8px;
    }
    .line {
      margin: 0 10px;
    }
    span {
      font-size: 12px;
    }
  }
</style>
