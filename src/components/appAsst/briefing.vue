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
        <div class="navActive">
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
            <el-select
              v-model="countrySelect"
              clearable
              filterable
              placeholder="请选择国家或地区"
            >
              <el-option
                v-for="item in countriesData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div
            v-if="countrySelect != ''"
            class="header-report-active"
            @click="handleBriefingData"
          >
            生成报告
          </div>
          <div v-else class="header-report">生成报告</div>
          <div
            v-if="countrySelect != ''"
            @click="handleChartBase"
            class="DownloadAlls-active iconfont icon-xiazai"
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
        <div
          class="container"
          v-loading="loading"
          element-loading-text="加载中..."
        >
          <div class="report-info">
            <div class="logo">
              <img src="../../assets/images/应用助手/app_img.png" alt />
            </div>
            <div class="title-info">
              {{ BriefingData.name }}
              <!-- 中国科学院- -->
              <!-- <span>阿根廷</span>合作态势简报 -->
              <!-- <span v-if="isShow">(模板)</span> -->
            </div>
            <div class="Introduction">{{ BriefingData.summary }}</div>
          </div>
          <div class="containerDiv">
            <h2>合作论文概况（基于Web of Science数据库统计）</h2>
            <div class="line"></div>
            <div
              class="tableDiv"
              v-if="BriefingData.coopePaperData != undefined"
            >
              <p>{{ BriefingData.coopePaperData.summary }}</p>
              <!-- <Table border :columns="columns1" :data="BriefingData.coopePaperData.coopePaperTable"></Table> -->
              <Table
                row-key="id"
                :columns="columns1"
                :data="BriefingData.coopePaperData.coopePaperTable"
                border
              ></Table>
            </div>
            <div
              class="tableDiv"
              v-if="BriefingData.coopePaperOrgData != undefined"
            >
              <p>{{ BriefingData.coopePaperOrgData.summary }}</p>
              <!-- <Table
                border
                :columns="columns2"
                :data="BriefingData.coopePaperOrgData.coopePaperTable"
              ></Table> -->
              <Table
                row-key="id"
                :columns="columns2"
                :data="BriefingData.coopePaperOrgData.coopePaperTable"
                border
              ></Table>
            </div>
          </div>
          <div class="chartDiv">
            <h2>
              热点获批出访机构排名TOP10（数据来自ARP国际合作系统因公出国批件获批记录）
            </h2>
            <div class="line"></div>
            <div class="chartBox" ref="VisitOrgTop"></div>
          </div>
          <div class="chartDiv">
            <h2>热点访问单位排名TOP10</h2>
            <div class="line"></div>
            <div class="chartBox" ref="AccessOrgTop"></div>
          </div>
          <div class="chartDiv">
            <h2>热点合作学科排名TOP10</h2>
            <div class="line"></div>
            <div class="chartBox" ref="SubjectTop"></div>
          </div>
          <div class="containerDiv">
            <h2>{{ BriefingData.awardAboutCASTWAS.title }}</h2>
            <div class="line"></div>
            <div
              class="tableDiv"
              v-if="BriefingData.awardAboutCASTWAS != undefined"
            >
              <p>{{ BriefingData.awardAboutCASTWAS.summary }}</p>
              <!-- <Table
                border
                :columns="columns3"
                :data="BriefingData.awardAboutCASTWAS.awardTableData"
              ></Table> -->
              <Table
                row-key="id"
                :columns="columns3"
                :data="BriefingData.awardAboutCASTWAS.awardTableData"
                border
              >
              <template slot-scope="{ row }" slot="name">
                <span  @click="handleperson(row.personId)" style="cursor: pointer;">{{
                  row.name
                }}</span>
              </template>
              <template slot-scope="{ row }" slot="reseInstit">
                <span  @click="handleorg(row.reseInstitId)" style="cursor: pointer;">{{
                  row.reseInstit
                }}</span>
              </template>
              </Table>
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
import visitFun from "@/assets/js/visit.js";
export default {
  data() {
    return {
      countrySelect: "",
      visitOutOrgBase64: "",
      visitedOrgBase64: "",
      coopSubjectBase64: "",
      countriesData: [],
      columns1: [
        { title: "序号", type: "index", align: "center" },
        {
          title: "领域",
          key: "field",
          align: "center",
        },
        {
          title: "与我院合作论文数",
          key: "coopPaperCountWithCAS",
          align: "center",
          tree: true,
        },
      ],
      columns2: [],
      columns3: [
        { title: "序号", type: "index", align: "center", width: 100 },
        {
          title: "学生姓名",
          slot: "name",
          align: "center",
        },
        {
          title: "研究所名称",
          slot: "reseInstit",
          align: "center",
        },
        {
          title: "研究内容",
          key: "reseContent",
          align: "center",
          tree: true,
        },
      ],
      BriefingData: [],

      visitOutOrgData: [],
      visitedOrgForeignData: [],
      subjectData: [],
      awardAboutCASTWAS: [],
      country: "",
      countryName: "",
      loading: false,
    };
  },
  // watch: {
  //   visitOutOrgData(val) {
  //     if (val) {
  //       this.handleVisitOrgTop10();
  //     }
  //   },
  //   visitedOrgForeignData(val) {
  //     if (val) {
  //       this.handleAccessOrgTop10();
  //     }
  //   },
  //   subjectData(val) {
  //     if (val) {
  //       this.handleSubjectTop10();
  //     }
  //   },
  // },
  mounted() {
    this.countrySelect = this.$route.query.country;
    this.handleCountry();
    this.handleBriefingData();
    // this.$nextTick(() => {
    //   this.handleVisitOrgTop10();
    //   this.handleAccessOrgTop10();
    //   this.handleSubjectTop10();
    // });
  },
  methods: {
    //收藏
    favorites() {
      let userId = "admin";
      let type = "应用助手";
      let content = `应用助手-国际合作态势简报@${this.countrySelect}`;
      visitFun.favoritesFun(userId, type, content);
    },

    handleClose() {
      this.$router.push("/");
    },
    lastPage() {
      visitFun.lastPage();
    },
    handleperson(id) {
      console.log(id);
      this.$router.push({
        path: "/PersonDetails",
        query: { id: id },
      });
    },
    handleorg(id) {
      this.$router.push({
        path: "/organizationZH",
        query: { id: id },
      });
    },
    //  国家
    handleCountry() {
      this.axios
        .get("/index/country/autoTip", {
          params: {
            city: "",
            continent: "",
            countrySimpleZhName: "",
            language: "",
            source: "",
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            var data = res.data.data.name;
            var countries = res.data.data.countries;
            this.countriesData = data.map((item) => {
              return {
                value: item,
                label: item,
              };
            });
          }
        });
    },

    // 热点获批出访机构排名TOP10
    handleVisitOrgTop10() {
      var visitOutOrgData = this.visitOutOrgData;
      let myEcharts = this.$echarts;
      let myChart = this.$echarts.init(this.$refs.VisitOrgTop);
      myChart.showLoading();

      let option = {
        tooltip: {},
        //     toolbox: {
        //     show: true,
        //     feature: {
        //         saveAsImage: {}
        //     }
        // },
        grid: {
          // containLabel: true,
          left: 300,
          right: "10%",
          // "bottom": 10,
          // "top": 40
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          inverse: true,
          zlevel: 1,
          data: visitOutOrgData.name,
          axisLabel: {
            fontSize: 16,
          },
        },
        series: [
          {
            name: "",
            type: "bar",
            stack: "总量",
            // barWidth: 30,
            animation: false,
            itemStyle: {
              borderWidth: 10,
              normal: {
                color: new myEcharts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "rgb(241,243,246,1)",
                  },
                  {
                    offset: 1,
                    color: "rgb(92,128,183,1)",
                  },
                ]),
              },
            },
            label: {
              normal: {
                show: true,
                position: "right",
              },
            },
            z: 10,
            data: visitOutOrgData.value,
          },
        ],
      };
      myChart.setOption(option, true);
      myChart.hideLoading();
      let _this = this;
      myChart.on("dblclick", function (params) {
        console.log(params);
        _this.$router.push({
          path: "/organizationZH",
          query: { id: params.data.id },
        });
      });
      let chartBase64 = myChart.getDataURL({
        pixelRatio: 5,
        backgroundColor: "#fff",
      });
      var Base = encodeURIComponent(chartBase64);
      this.visitOutOrgBase64 = chartBase64.split(",")[1];
    },
    // 热点访问单位排名TOP10
    handleAccessOrgTop10() {
      let myEcharts = this.$echarts;
      let myChart = this.$echarts.init(this.$refs.AccessOrgTop);
      myChart.showLoading();
      var visitedOrgForeignData = this.visitedOrgForeignData;
      let option = {
        tooltip: {},
        //     toolbox: {
        //     show: true,
        //     feature: {
        //         saveAsImage: {}
        //     }
        // },
        grid: {
          // containLabel: true,
          left: 300,
          right: "10%",
          // "bottom": 10,
          // "top": 40
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          inverse: true,
          zlevel: 1,
          data: visitedOrgForeignData.name,
          axisLabel: {
            fontSize: 16,
          },
        },
        series: [
          {
            name: "",
            type: "bar",
            stack: "总量",
            // barWidth: 30,
            animation: false,
            itemStyle: {
              normal: {
                color: new myEcharts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "rgb(241,243,246,1)",
                  },
                  {
                    offset: 1,
                    color: "rgb(92,128,183,1)",
                  },
                ]),
              },
            },
            label: {
              normal: {
                show: true,
                position: "right",
              },
            },
            z: 10,
            data: visitedOrgForeignData.value,
          },
        ],
      };
      myChart.setOption(option, true);
      myChart.hideLoading();
      let _this = this;
      myChart.on("dblclick", function (params) {
        console.log(params);
        _this.$router.push({
          path: "/organizationEN",
          query: { id: params.data.id },
        });
      });
      let chartBase64 = myChart.getDataURL({
        pixelRatio: 2,
        backgroundColor: "#fff",
      });
      this.visitedOrgBase64 = chartBase64.split(",")[1];
    },
    // 热点合作学科排名TOP10
    handleSubjectTop10() {
      let myEcharts = this.$echarts;
      let myChart = this.$echarts.init(this.$refs.SubjectTop);
      myChart.showLoading();
      var subjectData = this.subjectData;
      let option = {
        tooltip: {},
        grid: {
          // containLabel: true,
          left: 300,
          right: "10%",
          // "bottom": 10,
          // "top": 40
        },
        //     toolbox: {
        //     show: true,
        //     feature: {
        //         saveAsImage: {}
        //     }
        // },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          inverse: true,
          zlevel: 1,
          data: subjectData.name,
          axisLabel: {
            fontSize: 16,
          },
        },
        series: [
          {
            name: "",
            type: "bar",
            stack: "总量",
            // barWidth: 30,
            animation: false,
            itemStyle: {
              normal: {
                color: new myEcharts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "rgb(241,243,246,1)",
                  },
                  {
                    offset: 1,
                    color: "rgb(92,128,183,1)",
                  },
                ]),
              },
            },
            label: {
              normal: {
                show: true,
                position: "right",
              },
            },
            z: 10,
            data: subjectData.value,
          },
        ],
      };
      myChart.setOption(option, true);
      myChart.hideLoading();
      let chartBase64 = myChart.getDataURL({
        pixelRatio: 2,
        backgroundColor: "#fff",
      });
      this.coopSubjectBase64 = chartBase64.split(",")[1];
    },

    // 生成
    handleBriefingData() {
      this.loading = true;
      sessionStorage.clear();
      if (this.countrySelect != "") {
        var countrySelect = (this.countrySelect || "").split("/")[0];
        // this.countryName = countrySelect
        var columns2 = [
          { title: "序号", type: "index", align: "center" },
          {
            title: "研究所名称",
            key: "coopeReseInstit",
            align: "center",
          },
          {
            title: "与" + countrySelect + "合作论文数量",
            key: "coopPaperCountWithReseInstit",
            align: "center",
            tree: true,
          },
        ];
        this.columns2 = columns2;
      } else {
        var countrySelect = "";
        var columns2 = [
          { title: "序号", type: "index", align: "center" },
          {
            title: "研究所名称",
            key: "coopeReseInstit",
            align: "center",
          },
          {
            title: "与阿根廷合作论文数量",
            key: "coopPaperCountWithReseInstit",
            align: "center",
            tree: true,
          },
        ];
        this.columns2 = columns2;
      }

      this.axios
        .get("/assistant/getCoopeBriefingData", {
          params: { countryName: countrySelect },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.loading = false;
            this.BriefingData = res.data.data;
            this.visitOutOrgData = this.BriefingData.visitOutOrgData;
            this.visitedOrgForeignData = this.BriefingData.visitedOrgForeignData;
            this.subjectData = this.BriefingData.subjectData;

            let time = setTimeout(() => {
              this.handleVisitOrgTop10();
              this.handleAccessOrgTop10();
              this.handleSubjectTop10();
            }, 1000);
          }
        });
    },
    // 下载
    handleChartBase() {
      var countrySelect = (this.countrySelect || "").split("/")[0];
      var data = {
        countryName: countrySelect,
        visitOutOrgBase64: this.visitOutOrgBase64,
        visitedOrgBase64: this.visitedOrgBase64,
        coopSubjectBase64: this.coopSubjectBase64,
      };
      // console.log(data)
      // let time = setTimeout(()=>{
      // this.axios.post("/assistant/generateCoopeBriefing", this.$qs.stringify(data))
      // .then((res) => {
      //   if (res.data.code == 200) {
      //     window.clearInterval(time);
      //     window.location.href = res.data.data.fileDownUrl;
      //   }
      // });

      this.axios({
        url: "/assistant/generateCoopeBriefing",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          window.location.href = res.data.data.fileDownUrl;
        }
      });
      // },2000)
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/application/appFl.less";
.application {
  .application-fr {
    .reportDiv {
      margin: 10px 20px;
      border: 1px dashed #d9dde4;
      background: #fafafa;
      .container {
        width: 1430px;
        margin: 0 auto;
        /deep/ .el-loading-spinner .path {
          stroke: #ff3a25;
        }

        /deep/ .el-loading-spinner .el-loading-text {
          color: #ff3a25;
        }

        /deep/ .el-loading-spinner {
          top: 10%;
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
          .Introduction {
            text-indent: 2em;
            color: #6f6f6f;
            font-size: 14px;
            margin: 30px 0;
            line-height: 28px;
          }
        }
        .containerDiv {
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
          .tableDiv {
            margin: 20px;
            p {
              font-size: 16px;
              color: #4b4b4b;
              line-height: 50px;
            }
          }
        }
        .chartDiv {
          margin-top: 30px;
          h2 {
            text-align: center;
            font-size: 20px;
            color: #5a78a1;
          }
          .line {
            border-bottom: 1px solid #5a78a1;
            margin-top: 10px;
          }
          .chartBox {
            width: 100%;
            height: 500px;
          }
        }
      }
    }
  }
}
</style>
