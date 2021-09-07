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
        <img src="../../assets/images/国际人才/defaultPerson.png" alt />
        <p class="personName" >《{{paperDetails.source}}》</p>
        <p class="personNationality">期刊名称</p>
        <div class="education">
          <p class="line"></p>
          <p class>ISSN:{{paperDetails.issn}}</p>
          <p class>ISSN:{{paperDetails.eissn}}</p>
          <p class="line"></p>
          <p class>卷：{{paperDetails.volume}}</p>
          <p class>期：{{paperDetails.issue}}</p>
          <p class>页：{{paperDetails.pageBegin}} - {{paperDetails.pageEnd}} </p>
        </div>
      </div>
      <div class="Influence">
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
              <lable>论文详情</lable>
            </li>

          </ul>
        </div>
        <div class="header-fr">
          <ul>
            <li class="li1" @click="download"></li>
            <li class="li2" @click="favorites"></li>
            <li class="li3"></li>
          </ul>
          <Login />
        </div>
      </div>
      <div class="scrollDiv" :style="{height:scrollstyle}" style="overflow: hidden" >
        <div class="container_1">
          <div class="chart content" >
            <div class="title">{{paperDetails.title}}</div>
            <div class="item">
              <label>作者：</label>
              <div style="display: flex;flex-wrap: wrap">
                <p @click="toAuthorDetail(item.flag,item.psnId)" style="margin-right: 15px;" v-for="(item,index) in paperDetails.authors" :key="index" :class="item.psnId == '-'?'':'hoverP'">{{index==0? item.zhName:',  '+item.zhName }}</p>
              </div>
            </div>
            <div class="item2">
              <label>机构：</label>
              <div >
                <p @click="handleOrgPath(item.flag,item.orgId)"  v-for="(item,index) in paperDetails.organizations" :key="index" :class="item.orgId == '-'?'':'hoverP'">{{item.text}}</p>
              </div>
            </div>

            <!--<div class="item">-->
              <!--<label>机构：</label>-->
              <!--<div style="display: flex;flex-wrap: wrap">-->
                <!--<p style="margin-right: 15px;" v-for="(item,index) in paperDetails.organizations" :key="index" :class="item.orgId == '-'?'':'hoverP'">{{item.text}}</p>-->
              <!--</div>-->
            <!--</div>-->

            <div class="item">
              <label>DOI：</label>
              <span>{{paperDetails.doi}}</span>
            </div>

            <div class="item">
              <label>期刊：</label>
              <span>{{paperDetails.source}}</span>
            </div>
            <div class="item">
              <label>发表时间：</label>
              <span>{{paperDetails.date}}</span>
            </div>
            <div class="item">
              <label>学科领域：</label>
              <span>{{paperDetails.researchField}}</span>
            </div>
            <div class="item">
              <label>关键词：</label>
              <div style="display: flex;flex-wrap: wrap">
                <p style="margin-right: 15px;" v-for="(item,index) in paperDetails.keyword" :key="index" >{{index==0? item:',    '+item}}</p>
              </div>
            </div>
            <div class="item">
              <label>摘要：</label>
              <span>{{paperDetails.abstract}}</span>
            </div>
            <div class="item2">
              <label>参考文献：</label>
              <div>
                <span v-for="(item,index) in paperDetails.reference" :key="index">{{item}}</span>
              </div>

            </div>

            <div class="item2">
              <label>基金资助：</label>
              <div>
                <span v-for="(item,index) in paperDetails.found" :key="index">{{item}}</span>
              </div>

            </div>

          </div>
          <div class="chart chartDiv" >
            <div class=" itemChart chart1">
              <hitsComponent @changeWindow="changeWindow"  :data="clickData"></hitsComponent>
            </div>
            <div class="itemChart chart2">
              <atlasComponent @changeWindow="changeWindow" @changePaper="changePaper" :data="AtlasData"></atlasComponent>
            </div>

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

  import atlasComponent from "./modules/atlas"; // 图库
  import hitsComponent from "./modules/hits"; // 图库
  import visitFun from '@/assets/js/visit.js'

  export default {
    components:{
      atlasComponent,
      hitsComponent,
    },
    data() {
      return {
        contentHeight:window.innerHeight-210 +'px',
        iconData:{
          icon1:require('../../assets/images/国际人才/details/下载-默认状态.png'),
          icon1Hover:require('../../assets/images/国际人才/details/下载-选中状态.png'),
          icon2:require('../../assets/images/国际人才/details/收藏-默认状态.png'),
          icon2Hover:require('../../assets/images/国际人才/details/收藏-选中状态.png'),
          icon3:require('../../assets/images/国际人才/details/分享-默认状态.png'),
          icon3Hover:require('../../assets/images/国际人才/details/分享-选中状态.png'),
        },
        paperId:'',
        paperDetails:{},
        clickData:{},
        AtlasData:[],
        isShow:false,
      };
    },
    computed:{
      scrollstyle(){
        if(this.isShow){
          return this.contentHeight
        }else{
          return ''
        }
      },

    },
    created(){

    },
    mounted() {
      // this.paperId = 'AXUM3ipURWYZUdqfSUSR'
      this.paperId =  this.$route.query.id
      this.getclick()
      this.getAtlas()
      // this.getDetails()
    },
    methods: {
      //收藏
      favorites(){
        let userId = 'admin'
        let type = '论文'
        let content = `论文-${this.paperDetails.title}@paperDetails-${this.paperId}`
        visitFun.favoritesFun(userId,type,content)
      },
      download(){
        let params = {
          paperId:this.paperId
        }
        this.axios(visitFun.settingParameters('post',"/paper/word",params)).then((res) => {
            if (res.data.code == 200) {
              if(res.data.data.fileDownUrl){
                window.location.href=res.data.data.fileDownUrl;
              }
            }
        });
      },

      // 机构跳转
      handleOrgPath(flag,id) {
        //console.log(flag,id)
        if(flag == "in") {
          this.$router.push({ path: "organizationZH", query: { id } });
        } else {
          this.$router.push({ path: "organizationEN", query: { id } });
        }
      },

      getDetails(){
        return new Promise((resolve,reject)=>{
          let params = this.paperId
          this.axios.get(`/paper/detail/${params}`)
            .then(res => {
              if (res.data.code == 200) {
                this.paperDetails = res.data.data
                resolve(true)
              }
            });
        })
      },

      getclick(){
        let params = this.paperId
        this.axios.get(`/paper/detail/click/${params}`)
          .then(res => {
            if (res.data.code == 200) {
              this.paperDetails = res.data.data
              this.clickData = res.data.data
            }

          });
      },


      async getAtlas(){
        let result = await this.getDetails()
        if(result){
          let params = `?paperId=${this.paperId}&paperTitle=${this.paperDetails.title}`
          this.axios.get(`/paper/detail/graph${params}`)
            .then(res => {
              if (res.data.code == 200) {
                this.AtlasData = res.data.data
              }
            });
        }


      },
      toAuthorDetail(flag,psnId){
        if(psnId != '-'){
          if(flag == 'out'){
            this.$router.push({
              path: "/PersonDetails",
              query: { id: psnId },
            });
          }else if(flag == 'in'){
            this.$router.push({
              path: "/domesticPersonnelInfor",
              query: { id: psnId },
            });
          }
        }

      },
      changePaper(id,name){
        this.paperId =  id
        this.getclick()
        this.getAtlas()

      },
      changeWindow(val){
        if(val == '1'){
          this.isShow = true
        }else if(val == '2'){
          this.isShow = false
        }
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
    img {
      width: 220px;
      height: 220px;
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
      -webkit-line-clamp: 10;
      line-clamp: 10;
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
    min-height: 500px;
    overflow: hidden;
  }
  .container_1 {
    width: 100%;
    display: flex;
    position: relative;

    .chart {
      min-height: 400px;
      margin-left: 1%;
      background: #f4f5f7;
    }
    .content{
      flex: 1;
      background: #fafafa;
      .title{
        margin: 50px 0 50px;
        /*height: 151px;*/
        width: 100%;
        text-align: center;
        /*line-height: 151px;*/
        color: #393939;
        font-weight: bold;
        font-size: 25px;

      }
      .item{
        width: 100%;
        padding: 0 48px 40px 53px;
        box-sizing: border-box;
        display: flex;
        label{
          font-size: 14px;
          color: #4b4b4b;
          width: 70px;
          text-align: left;
          display: block;
          font-weight: bold;
        }
        span{
          flex: 1;
          font-size: 14px;
          color: #6f6f6f;
          text-align: left;
          display: block;
        }
        div{
          flex: 1;
          font-size: 14px;
          color: #6f6f6f;
          text-align: left;
          /*display: block;*/
          display: flex;
          flex-wrap: wrap;
          .hoverP{
            cursor: pointer;
            /*color: #ff3925;*/
          }
          .hoverP:hover{
            color: #ff3925;

          }

        }
      }
      .item2{
        width: 100%;
        padding: 0 48px 40px 53px;
        box-sizing: border-box;
        display: flex;
        label{
          font-size: 14px;
          color: #4b4b4b;
          width: 70px;
          text-align: left;
          display: block;
          font-weight: bold;
        }
        span{
          flex: 1;
          font-size: 14px;
          color: #6f6f6f;
          text-align: left;
          display: block;
        }
        div{
          flex: 1;
          font-size: 14px;
          color: #6f6f6f;
          text-align: left;
          .hoverP{
            cursor: pointer;
            /*color: #ff3925;*/
          }
          .hoverP:hover{
            color: #ff3925;

          }

        }
      }


    }
    .chartDiv{
      width: 450px;
      background: #e1e5ec;
      margin-right: 35px;
      .itemChart{
        height: 400px;
        width: 450px;
        background: #f4f5f7;
      }
      .chart2{
        margin-top: 10px;
      }
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
