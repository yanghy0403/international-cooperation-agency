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
        <div class="navActive">
          <router-link tag="li" to="/yearbook">国际合作统计年鉴</router-link>
        </div>
        <div>
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
            <DatePicker
              type="year"
              @on-change="handleyear"
              :start-date="new Date(2010, 1, 0)"
              placeholder="请选择年份"
            ></DatePicker>
          </div>
          <div
            v-if="yearSelect != ''"
            class="header-report-active"
            @click="handleGetStatisticYearbook"
          >
            生成报告
          </div>
          <div v-else class="header-report">生成报告</div>
          <div
            v-if="yearSelect != ''"
            class="DownloadAlls-active iconfont icon-xiazai"
            @click="handleDownloadYearbook"
          ></div>
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
          <div class="contents">
            <ul>
              <li
                v-for="(item, i) in contentsList"
                :key="i"
                :class="{ active: iscur == i }"
                @click="handleContentsTab(i)"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div class="detail">
            <div class="titleDiv" v-show="iscur == 0">
              <h1>十二、国际合作、港澳台地区交流</h1>
              <p>
                INTERNATIONAL COOPERATION, AND EXCHANGES WITH HONG KONG, MACAO
                AND TAIWAN REGIONS
              </p>
            </div>
            <div class="containerDiv" v-show="iscur == 1">
              <h2>12-1 国际合作、港澳台地区交流情况</h2>
              <p>
                International Cooperation , and Exchanges with Hong Kong, Macao
                and Taiwan Regions
              </p>
              <div class="line"></div>
              <div class="tableDiv">
                <p>
                  <span>单位：人次</span>
                  <span>(person·time)</span>
                </p>
                <Table
                  width="1000"
                  border
                  :columns="columns1"
                  :data="StatisticYearbook.one"
                ></Table>
              </div>
            </div>
            <div class="containerDiv" v-show="iscur == 2">
              <h2>
                12-2 国际合作、港澳台地区交流邀请 项目按类型分类（2019年）
              </h2>
              <p>
                Statistics of Visitors Hosted by CAS, by Type of Exchange: 2019
              </p>
              <div class="line"></div>
              <div class="tableDiv">
                <p>
                  <span>单位：人次</span>
                  <span>(person·time)</span>
                </p>
                <Table
                  width="1000"
                  border
                  :columns="columns2"
                  :data="StatisticYearbook.two"
                ></Table>
              </div>
            </div>
            <div class="containerDiv" v-show="iscur == 3">
              <h2>
                12-3 国际合作、港澳台地区交流派出项目 按类型分类（2019年）
              </h2>
              <p>
                Statistics of CAS Staff Sent Overseas, by Type of Exchange: 2019
              </p>
              <div class="line"></div>
              <div class="tableDiv">
                <p>
                  <span>单位：人次</span>
                  <span>(person·time)</span>
                </p>
                <Table
                  width="1000"
                  border
                  :columns="columns3"
                  :data="StatisticYearbook.three"
                ></Table>
              </div>
            </div>
            <div class="containerDiv" v-show="iscur == 4">
              <h2>12-4 在国际组织任职人员情况 （2018年）</h2>
              <p>
                Statistics of CAS Professionals Holding Posts in Various
                International Organizations: 2018
              </p>
              <div class="line"></div>
              <div class="tableDiv">
                <Table
                  width="1000"
                  border
                  :columns="columns4"
                  :data="StatisticYearbook.four"
                ></Table>
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
      iscur: 0,
      yearSelect: "",
      contentsList: [
        {
          name: "12 首页",
        },
        {
          name: "12-1 国际合作、港澳台地区交流情况",
        },
        {
          name: "12-2  国际合作、港澳台地区交流邀请",
        },
        {
          name: "12-3  国际合作、港澳台地区交流派出项目",
        },
        {
          name: "12-4  在国际组织任职人员情况",
        },
      ],

      columns1: [
        {
          title: "年份",
          key: "year",
          align: "center",
        },
        {
          title: "派出",
          key: "visitOutCount",
          align: "center",
        },
        {
          title: "邀请",
          key: "visitInCount",
          align: "center",
        },
      ],

      columns2: [
        {
          title: "国家和地区",
          key: "area",
          align: "center",
          width: 150,
          render: (h, params) => {
            if (params.row.setStyle == 1) {
              return h(
                "span",
                {
                  style: { fontWeight: "bold" },
                },
                params.row.area
              );
            } else {
              return h(
                "span",
                {
                  style: { fontWeight: "normal" },
                },
                params.row.area
              );
            }
          },
        },
        {
          title: "按交流形式分类统计",
          align: "center",
          children: [
            { title: "小计", key: "totalCount", align: "center" },
            { title: "学术访问", key: "academicVisitCount", align: "center" },
            { title: "合作研究", key: "coopResearchCount", align: "center" },
            { title: "国际会议和海峡", key: "meetingCount", align: "center" },
            { title: "培训", key: "trainingCount", align: "center" },
            { title: "科技展览", key: "exhibitionCount", align: "center" },
            { title: "其 他", key: "othersCount", align: "center" },
          ],
        },
      ],
      columns3: [
        { title: "国家和地区", key: "area", align: "center", width: 150,render: (h, params) => {
            if (params.row.setStyle == 1) {
              return h("span", {
                style: {fontWeight: 'bold'}
              },params.row.area);
            } else {
              return h("span", {
                style: {fontWeight: 'normal'}
              },params.row.area);
            }
          }, },
        {
          title: "按交流形式分类统计",
          align: "center",
          children: [
            { title: "小计", key: "totalCount", align: "center" },
            { title: "学术访问", key: "academicVisitCount", align: "center" },
            { title: "合作研究", key: "coopResearchCount", align: "center" },
            { title: "国际会议和海峡", key: "meetingCount", align: "center" },
            { title: "培训", key: "trainingCount", align: "center" },
            { title: "科技展览", key: "exhibitionCount", align: "center" },
            { title: "其 他", key: "othersCount", align: "center" },
          ],
        },
      ],
      columns4: [
        {
          title: "国际机构名称",
          key: "internationalOrgName",
          // align: "center"
          width: 800
        },
        {
          title: "任职人数",
          key: "personCount",
          align: "center",
        },
      ],
      StatisticYearbook: [],
      loading: false
    };
  },
  watch: {
    yearSelect(val) {
      if (val == null) {
        this.yearSelect = "";
        this.handleGetStatisticYearbook();
      }
    },
  },
  mounted() {
    this.yearSelect = sessionStorage.getItem("yearbook");
    this.handleGetStatisticYearbook();
  },
  methods: {
    //收藏
    favorites(){
      let userId = 'admin'
      let type = '应用助手'
      let content = `应用助手-国际合作统计年鉴-${this.yearSelect}`
      visitFun.favoritesFun(userId,type,content)
    },
    handleClose() {
      this.$router.push("/");
      sessionStorage.clear();
    },
    lastPage(){
        visitFun.lastPage()
      },
    // 获取选中年份
    handleyear(val) {
      this.yearSelect = val;
    },
    handleContentsTab(val) {
      this.iscur = val;
    },
    // 生成报告
    handleGetStatisticYearbook() {
      this.loading = true;
      sessionStorage.clear();
      if (this.yearSelect != "" && this.yearSelect != null) {
        var yearSelect = this.yearSelect;
      } else {
        var yearSelect = "";
      }
      this.axios
        .get("/assistant/getStatisticYearbook", {
          params: { year: yearSelect },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.loading = false;
            this.StatisticYearbook = res.data.data;
          }
        });
    },
    // 下载报告
    handleDownloadYearbook() {
      this.axios
        .get("/assistant/generateStatisticYearbook", {
          params: { year: this.yearSelect },
        })
        .then((res) => {
          if (res.data.code == 200) {
            window.location.href = res.data.data.fileDownUrl;
          }
        });
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
        box-shadow: none;
      }
      /deep/ .ivu-input:focus {
        border: #e2e6ed;
        box-shadow: none;
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
      margin: 20px auto;
      display: flex;
      /deep/ .el-loading-spinner .path {
          stroke: #ff3a25;
        }

        /deep/ .el-loading-spinner .el-loading-text {
          color: #ff3a25;
        }
      .contents {
        border-right: 1px dashed #333;
        width: 400px;
        ul {
          li {
            cursor: pointer;
            font-size: 16px;
            line-height: 34px;
            font-weight: 600;
            margin-left: 40px;
          }
          .active {
            color: #ff3a25;
            position: relative;
          }
          .active:before {
            content: " ";
            position: absolute;
            top: 5px;
            left: -35px;
            display: block;
            height: 25px;
            width: 25px;
            background: url("../../assets/images/应用助手/hand.png") no-repeat;
            background-size: 100%;
          }
        }
      }
      .detail {
        width: 1200px;
        height: 750px;
        // border: 1px dashed #333;
        // border-left: none;
        .titleDiv {
          margin: 150px auto;
          width: 800px;
          text-align: center;
          h1 {
            font-size: 50px;
          }
          p {
            font-size: 25px;
          }
        }
        .containerDiv {
          h2 {
            font-size: 28px;
            color: #5a78a1;
            text-align: center;
          }
          p {
            font-size: 20px;
            color: #4b4b4b;
            text-align: center;
          }
          .line {
            border-bottom: 1px solid #5a78a1;
            width: 90%;
            margin: 10px auto;
          }
          .tableDiv {
            // margin: 0 auto;
            overflow: auto;
            height: 618px;
            /deep/ .ivu-table-tip {
              overflow-x: hidden;
            }
            /deep/ .ivu-table-wrapper-with-border {
              margin: 0 auto;
            }
            p {
              span:first-child {
                float: left;
                margin-left: 40px;
                font-size: 16px;
              }
              span:last-child {
                float: right;
                margin-right: 40px;
                font-size: 16px;
              }
            }
          }
          .tableDiv::-webkit-scrollbar {
            width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
            height: 1px;
          }
          .tableDiv::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            background: #c5c9cf;
          }
          .tableDiv::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            background: #ededed;
          }
        }
      }
    }
  }
}
</style>
