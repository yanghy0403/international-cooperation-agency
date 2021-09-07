<template>
  <div class="application">
    <div class="application-fl">
      <div class="app-logo" @click="handleClose">
        <img src="../../assets/images/国际人才/页面固定内容/logo.png" alt />
        <p>中国科学院国际合作</p>
        <p>数据汇交与分析平台</p>
      </div>
      <div class="appTitle">应用助手</div>
      <div class="app-nav">
        <div>
          <router-link tag="li" to="/briefing">国际合作态势简报</router-link>
        </div>
        <div>
          <router-link tag="li" to="/summary">机构合作数据摘要</router-link>
        </div>
        <div>
          <router-link tag="li" to="/statistics">国际合作统计手册</router-link>
        </div>
        <div>
          <router-link tag="li" to="/yearbook">国际合作统计年鉴</router-link>
        </div>
        <div class="navActive">
          <router-link tag="li" to="/bulletin">国际合作统计公报</router-link>
        </div>
      </div>
      <div class="app-btm" @click="lastPage">
        <div class="iconfontClose">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="closeName">返回上一页</div>
      </div>
    </div>
    <div class="application-fr">
      <div class="fr-header">
        <div class="condition">
          <div class="country">
            <DatePicker type="year" @on-change="handleyear" :start-date="new Date(2010,1,0)" placeholder="请选择年份"></DatePicker>
          </div>
          <div v-if="yearSelect != ''" class="header-report-active" @click="handleTempletData">生成报告</div>
          <div v-else class="header-report">生成报告</div>
          <div v-if="yearSelect != ''" class="DownloadAlls-active iconfont icon-xiazai" @click="handleDownloadReport"></div>
          <div v-else class="DownloadAlls iconfont icon-xiazai"></div>
        </div>
        <div class="header-fr">
          <ul>
            <li class="li1" @click="favorites"></li>
            <li class="li2"></li>
          </ul>
          <Login />
        </div>
      </div>
      <div class="reportDiv">
        <div class="container" v-loading="loading"
              element-loading-text="加载中...">
          <div class="report-info">
            <div class="logo">
              <img src="../../assets/images/应用助手/app_img.png" alt />
            </div>
            <div class="title-info">
              {{templetData.name}}
              <!-- <span>(模板)</span> -->
            </div>
            <div class="containerDiv">
              <h2>{{templetData.secondLevelTitle}}</h2>
              <div class="line"></div>
              <div class="contentDiv">
                <p>{{templetData.visitIn}}</p>
                <p>{{templetData.visitOut}}</p>
                <p>{{templetData.pifiplan}}</p>
                <p>{{templetData.awardCASTWAS}}</p>
                <p>{{templetData.taiwanYouth}}{{templetData.awardOtherOne}}</p>
              </div>
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
  import visitFun from '@/assets/js/visit.js'

  export default {
  data() {
    return {
      yearSelect: "",
      templetData: [],
      filePath: "",
      loading: false,
    };
  },
   watch: {
    yearSelect(val) {
      if(val == null) {
        this.yearSelect = "";
        this.handleTempletData()
      }
    }
  },
  mounted() {
    this.yearSelect = sessionStorage.getItem("bulletin")
    this.handleTempletData();
  },
  methods: {
    //收藏
    favorites(){
      let userId = 'admin'
      let type = '应用助手'
      let content = `应用助手-国际合作统计公报-${this.yearSelect}`
      visitFun.favoritesFun(userId,type,content)
    },
    handleClose() {
      this.$router.push("/");
      sessionStorage.clear();
    },
    lastPage(){
        visitFun.lastPage()
      },
    // 获取选中的年份
    handleyear(val) {
      this.yearSelect = val;
    },
    // 生成报告
    handleTempletData() {
      sessionStorage.clear();
      if(this.yearSelect != ""&& this.yearSelect != null) {
        var yearSelect= this.yearSelect
      }else {
        var yearSelect = "";
      }
      this.axios.get("/assistant/getStatisReportData",{params: {year: yearSelect}}).then((res) => {
        if (res.data.code == 200) {
          this.templetData = res.data.data;
        }
      });
    },
    // 下载报告
    handleDownloadReport() {
      this.loading = true;
      if(this.yearSelect != ""&& this.yearSelect != null) {
        var yearSelect= this.yearSelect
      }else {
        var yearSelect = "";
      }
      this.axios.get("/assistant/generateStatisReport",{params: {year: yearSelect}}).then(res => {
        if(res.data.code == 200) {
          this.loading = false;
          window.location.href = res.data.data.fileDownUrl;
        }
      })
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/application/appFl.less";
.application-fr {
  .fr-header {
    .country {
      /deep/ .ivu-date-picker {
        width: 360px;
      }
      /deep/ .ivu-input-with-suffix {
        height: 40px;
        text-align: center;
        background: #e2e6ed;
        border-radius: 0;
        color: #727272;
      }
      /deep/ .ivu-input-with-suffix::-webkit-input-placeholder {
        color: #727272;
      }

      /deep/ .ivu-input-with-suffix::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #727272;
      }

      /deep/ .ivu-input-with-suffix:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #727272;
      }

      /deep/ .ivu-input-with-suffix:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #727272;
      }
      /deep/ .ivu-input:hover {
        border: #e2e6ed;
      }
      /deep/ .ivu-date-picker-focused input {
        border: #e2e6ed;
        box-shadow:none;
      }
      /deep/ .ivu-input:focus {
        border: #e2e6ed;
        box-shadow:none;
      }
      /deep/ .ivu-input-suffix i {
        line-height: 40px;
      }
    }
  }
  .reportDiv {
    margin: 10px 20px;
    border: 1px dashed #d9dde4;
    background: #fafafa;
    .container {
      width: 1430px;
      height: 750px;
      margin: 0 auto;
      /deep/ .el-loading-spinner .path {
          stroke: #ff3a25;
        }

        /deep/ .el-loading-spinner .el-loading-text {
          color: #ff3a25;
        }
      .report-info {
        .logo {
          text-align: center;
          margin: 40px 0 20px 0;
        }
        .title-info {
          text-align: center;
          font-size: 30px;
          color: #393939;
          font-weight: bold;
        }
      }
      .containerDiv {
        margin-top: 40px;
        h2 {
          text-align: center;
          font-size: 20px;
          color: #5a78a1;
          // border-bottom: 1px solid #333;
        }
        .line {
          border-bottom: 1px solid #5a78a1;
          margin-top: 10px;
        }
        .contentDiv {
          margin: 20px 0;
          p {
            // text-indent: 2em;
            font-size: 16px;
            color: #4b4b4b;
            line-height: 40px;
          }
        }
      }
    }
  }
}
</style>
