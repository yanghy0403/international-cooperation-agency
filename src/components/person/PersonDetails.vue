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
          <img :src="personDetails.detail.imageUrl?`http://10.0.90.42:8088/${realPersonImg}`:personImg" alt />
        </div>
        <p class="personName" >{{personDetails.detail.name == ''?personDetails.detail.enName:personDetails.detail.name}}</p>
        <p class="personNationality">{{personDetails.detail.nationality}}(籍)</p>
        <div class="education">
          <p class="line"></p>
          <p class>{{personDetails.detail.title}}·{{personDetails.detail.subject?personDetails.detail.subject:''}}</p>
          <p class>{{personDetails.detail.edu?personDetails.detail.edu:''}}</p>
          <p class="line"></p>
        </div>
        <p class="orgName orgEN">
          <label>机构(英)：</label>
          <span>{{personDetails.detail.unitEn?personDetails.detail.unitEn:'暂无数据'}}</span>
        </p>
        <p class="orgName orgZH">
          <label>机构(中)：</label>
          <span>{{personDetails.detail.unitZh?personDetails.detail.unitZh:'暂无数据'}}</span>
        </p>
      </div>
      <div class="Influence">
        <influence :personUniqueId="personUniqueId" :personName="personName" />
      </div>
      <div class="fl-btm"  @click="handleClose">
        <div class="iconfontClose">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="closeName">返回上一页</div>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="details-fr">
      <div class="fr-header">
        <div class="header-fl">
          <ul>
            <li>
              <lable>与中科院亲密度</lable>
              <span>{{statisticsData.relation}}</span>
            </li>
            <li>
              <lable>个人影响力</lable>
              <span>{{statisticsData.effect}}</span>
            </li>
            <li>
              <lable>合作论文(篇)</lable>
              <span>{{statisticsData.paper}}</span>
            </li>
            <li>
              <lable>到访(次)</lable>
              <span>{{statisticsData.visit}}</span>
            </li>
          </ul>
        </div>
        <div class="header-fr">
          <ul>
            <li class="li1"></li>
            <li class="li2" @click="favorites"></li>
            <li class="li3"></li>
          </ul>
          <Login />
        </div>
      </div>
      <div class="scrollDiv">
        <div class="container_1">
          <div class="chart CooperationTrack" :style="{'width':JSON.stringify(relatedData.orgDetail) == '[]' && JSON.stringify(relatedData.personDetail) == '[]'?'97%':'48%'}">
            <cooperationTrack :detailData="cooperationdetailData"  :linksData="linksData"/>
          </div>
          <div class="chart personRelated" v-if="JSON.stringify(relatedData.orgDetail) != '[]' || JSON.stringify(relatedData.personDetail) != '[]'">
            <personRelatedModule :personImg="realPersonImg" :relatedData="relatedData" :isRelatedChage="isRelatedChage" />
          </div>
        </div>
        <div class="container_2" >
          <div class="interflow" v-if="JSON.stringify(exchang) != '{}'" >
            <interflowModule :exchang="exchang" :exchangetable="exchangetable"/>
          </div>
        </div>
        <div class="container_3">
          <div :style="{'width':dataNum==1?'97%':'48%'}" v-if="JSON.stringify(workData) != '{}'" class="chart work">
            <workmodule :workData="workData" />
          </div>
          <div :style="{'width':dataNum==1?'97%':'48%'}" v-if="JSON.stringify(studyData) != '[]'"  class="chart Learn">
            <learnModule :learnData="studyData" :studytable="studytable"/>
          </div>
          <div :style="{'width':dataNum==1?'97%':'48%'}" v-if="JSON.stringify(awardData) != '{}'" class="chart work">
            <rewardModule :itemData="awardData" />
          </div>
          <div :style="{'width':dataNum%2==1?'97%':'48%'}" v-if="JSON.stringify(paperData) != '[]'" class="chart Learn">
            <outputModule :paperData="paperData" />
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
  import visitFun from '@/assets/js/visit.js'
  import influence from "./modules/Influence";
  import cooperationTrack from "./modules/CooperationTrack";
  import personRelatedModule from "./modules/personRelatedModule";
  import interflowModule from "./modules/interflowModule";
  import workmodule from "./modules/workModule";
  import learnModule from "./modules/learnModule";
  import rewardModule from "./modules/rewardModule";
  import outputModule from "./modules/outputModule";
export default {
  components: {
    influence,
    cooperationTrack,
    personRelatedModule,
    interflowModule,
    workmodule,
    learnModule,
    rewardModule,
    outputModule,
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

    };
  },
  created(){
    this.personUniqueId = this.$route.query.id
    this.getInfluence()
    this.getDetails()
    this.getRelatedData()
    this.getPaper()
  },
  mounted() {},
  methods: {

    favorites(){
      let userId = 'admin'
      let type = '人员'
      let content = `国外人才-${this.personDetails.detail.nationality}-${this.personDetails.detail.name}@PersonDetails-${this.personUniqueId}`
      visitFun.favoritesFun(userId,type,content)
    },

    //影响力
    getInfluence(){
      let params =
        'uniqueId='+this.personUniqueId
      this.axios.get(`/person/detail/count?${params}`)
        .then(res => {
          if (res.data.code == 200) {
            this.statisticsData = (res.data.data)
          }
        });
    },

    getDetails(){
      let params =
        'name='+this.personName +
        // '&uniqueId=cd7fead64039d067a4386c86250bd5cb'
        '&uniqueId='+this.personUniqueId
      this.axios.get(`/person/international/detail?${params}`)
        .then(res => {
          if (res.data.code == 200) {
            this.personDetails = (res.data.data)
            this.realPersonImg = `${this.personDetails.detail.imageUrl}`
            this.linksData = this.personDetails.cooperateWithZky.links
            this.cooperationdetailData = this.personDetails.cooperateWithZky.detail
            this.workData = (res.data.data.work)
            this.studyData = res.data.data.study
            this.studytable = res.data.data.studytable
            this.awardData = res.data.data.award
            this.exchang = res.data.data.exchang
            this.exchangetable = res.data.data.exchangetable
            this.dataNum = 0
            if(  JSON.stringify(this.workData) != "{}"){
              this.dataNum += 1
            }
            if( JSON.stringify(this.studyData) != "[]"){
              this.dataNum += 1
            }
            if(JSON.stringify(this.awardData) != "{}"){
              this.dataNum += 1
            }
          }
        });
    },

    getPaper(){
      let params =
        'name='+this.personName +
        // '&uniqueId=f4faabda7ac47675bd2fcfeec67e9414'
        '&uniqueId='+this.personUniqueId

      this.axios.get(`/person/international/paperDetail?${params}`)
        .then(res => {
          if (res.data.code == 200) {
            this.paperData = (res.data.data)
            this.dataNum += 1
          }
        });
    },
    getRelatedData(){
      let params =
        'name='+this.personName +
        '&uniqueId='+this.personUniqueId

      this.axios.get(`/person/international/personNet?${params}`)
        .then(res => {
          if (res.data.code == 200) {

            if(this.relatedData != null){
              this.isRelatedChage = !this.isRelatedChage
              this.relatedData = (res.data.data)
            }else{
              alert('获取关联网络失败！')
              this.relatedData = {}
            }
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
