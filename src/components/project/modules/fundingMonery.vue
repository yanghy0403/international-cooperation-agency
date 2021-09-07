<template>
  <div class="subsidize">
    <div class="indexTitleDiv">
      <div class="titleName">{{ componentTitle }}</div>
      <div class="operating">
        <div @click.stop="iconClick(1)" class="downloadNew iconDiv"></div>
        <div @click.stop="iconClick(2)" class="visualization iconDiv">
          <img :src="icon1" alt />
        </div>
        <div @click.stop="iconClick(3)" class="visualizationList iconDiv">
          <img :src="icon2" alt />
        </div>
        <div @click.stop="iconClick(4)" class="fullScreen iconDiv"></div>
      </div>
    </div>
    <div class="subsidizeCharts" v-show="isShowChart">
      <div class="subsidizeChart" ref="mySubsidizeChart"></div>
      <div v-if="tabNum == 1" class="maskDiV"></div>
    </div>
    <div id="subsidizeList" v-show="!isShowChart">
      <table>
        <thead>
          <tr>
            <th v-for="(item, index) in tableTitle" :key="index">{{ item }}</th>
          </tr>
        </thead>
        <tbody v-if="foundingData != undefined">
          <tr v-for="(item, i) in foundingData.table" :key="i">
            <td>{{item.year}}</td>
            <td>{{Math.ceil(item.number)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <transition name="bounce" mode="out-in">
      <div class="fullFcreen" v-if="!change">
        <div class="indexTitleDiv">
          <div class="titleName">{{ componentTitle }}</div>
          <div class="operating">
            <div @click.stop="iconClick(1)" class="downloadNew iconDiv"></div>
            <div @click.stop="iconClick(2)" class="visualization iconDiv">
              <img :src="icon1" alt />
            </div>
            <div @click.stop="iconClick(3)" class="visualizationList iconDiv">
              <img :src="icon2" alt />
            </div>
            <div
              @click.stop="iconClick(4)"
              class="fullScreensPlus iconDiv"
            ></div>
          </div>
        </div>
        <div class="subsidizeCharts" v-show="isShowChart">
          <div class="subsidizeChart" ref="mySubsidizeChart"></div>
          <div v-if="tabNum == 1" class="maskDiV"></div>
        </div>
        <div id="subsidizeList" v-show="!isShowChart">
          <table>
        <thead>
          <tr>
            <th v-for="(item, index) in tableTitle" :key="index">{{ item }}</th>
          </tr>
        </thead>
        <tbody v-if="foundingData != undefined">
          <tr v-for="(item, i) in foundingData.table" :key="i">
            <td>{{item.year}}</td>
            <td>{{Math.ceil(item.number)}}</td>
          </tr>
        </tbody>
      </table>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icon1: require("../../../assets/images/国际人才/index/图表选中.png"),
      icon2: require("../../../assets/images/国际人才/index/图标列表默认.png"),
      icon3: require("../../../assets/images/国际人才/index/图表默认.png"),
      icon4: require("../../../assets/images/国际人才/index/图表列表选中.png"),
      icon5: require("../../../assets/images/国际人才/index/图表选中.png"),
      icon6: require("../../../assets/images/国际人才/index/图标列表默认.png"),
      change: true,
      chart: 0,
      show: false,
      clientHeight: "",
      foundingData: [],
      mySubsidizeChart: null,
      tableData1: [],
      tableTitle: ["年份","数量"],
      componentTitle: "历年合作项目资助金额",
      isShowChart: true,
      tabNum: "",
      totalArr: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
    };
  },
  props: ["data", "mode"],
  watch: {
    data: {
      deep: true, // 深度监听
      immediate: true, // 监听到后，立即执行 handler方法
      handler(val) {
        this.foundingData = val;
        this.$nextTick(() => {
          this.handleSubsidizeChart();
        });
      },
    },
    mode(e) {
      this.tabNum = e;
    },
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`; //获取浏览器可视区域高度
    let that = this;
    window.onresize = function () {
      that.clientHeight = `${document.documentElement.clientHeight}`;
    };
    this.handleSubsidizeChart();
  },
  methods: {
    iconClick(val) {
      if (val == 1) {
        this.download();
      } else if (val == 2) {
        this.icon1 = this.icon5;
        this.icon2 = this.icon6;
        this.isShowChart = true;
      } else if (val == 3) {
        this.icon1 = this.icon3;
        this.icon2 = this.icon4;
        this.isShowChart = false;
      } else if (val == 4) {
        this.handleChange();
      }
    },
    handleChange() {
      this.change = !this.change;
      let time = setTimeout(() => {
        if (!this.change) {
          this.$refs.mySubsidizeChart.style.height =
            this.clientHeight - 250 + "px";
        } else {
          this.$refs.mySubsidizeChart.style.height = 300 + "px";
        }
        this.handleSubsidizeChart();
        clearTimeout(time);
      }, 100);
    },
    // 下载图片
    download() {
      var myChart = this.$echarts.init(this.$refs.mySubsidizeChart);
      var i = myChart.getDataURL({
        type: "png",
        backgroundColor: "white",
        pixelRatio: 2,
        // 导出的图片分辨率比例，默认为 1。
        //pixelRatio: number,
      });
      var $a = document.createElement("a");
      $a.setAttribute("href", i);
      $a.setAttribute("download", this.componentTitle + ".png");
      $a.click();
    },
    handleSubsidizeChart() {
      let myChart = this.$echarts.init(this.$refs.mySubsidizeChart),
        _this = this;
      myChart.showLoading();

      // var datas = this.foundingData.折线图
      if (this.foundingData.value != undefined) {
        var values = this.foundingData.value.map((item) => {
          return Math.ceil(item);
        });
      }

      let option = {
        tooltip: {
          trigger: "axis",
          formatter:function(params) {
              return params[0].name + '合作项目资助金额：' + params[0].data + '(万元)'
            }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#d3d6dd",
              },
            },
            axisLabel: {
              color: "#191919",
            },
            data: this.foundingData.year,
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: {
              color: "#191919",
            },
          },
        ],
        series: [
          {
            name: "2018",
            type: "line",
            label: {
              normal: {
                color: "#000000",
                show: true,
                position: [0, "-24px"],
                textStyle: {
                  fontSize: 12,
                },
              },
            },
            itemStyle: {
              normal: {
                color: "#5a80b7",
                lineStyle: {
                  color: "#5a80b7",
                  width: 1,
                },
                areaStyle: {
                  color: new _this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "#f1f3f6",
                    },
                    {
                      offset: 1,
                      color: "#5a80b7",
                    },
                  ]),
                },
              },
            },
            data: values,
          },
        ],
      };

      myChart.setOption(option, true);
      myChart.hideLoading();
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/titlecss.less";

.subsidize {
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  .subsidizeCharts {
    position: relative;
    width: 100%;
    height: 330px;
    .subsidizeChart {
      width: 100%;
      height: 100%;
    }
    .maskDiV {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(255, 255, 255, 0);
    }
  }
  #subsidizeList {
    // margin-top: 20px;
    width: 100%;
    height: 330px;
    border: 1px solid #ccc;
    overflow-y: scroll;
    table {
      width: 100%;
      thead {
        tr {
          height: 30px;
          line-height: 0px;
          th {
            font-size: 12px;
            width: 10%;
            text-align: center;
          }
        }
      }
      tbody {
        tr {
          border-top: 1px solid #ccc;
          height: 35px;
          line-height: 0px;
          td {
            width: 10%;
            font-size: 12px;
            text-align: center;
          }
        }
      }
    }
  }
  #subsidizeList::-webkit-scrollbar {
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  #subsidizeList::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    background: #ff3a25;
  }
  #subsidizeList::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    background: #d3d6dd;
  }
  .fullFcreen {
    position: absolute;
    top: 40px;
    left: 20px;
    width: 1430px;
    height: 91%;
    padding: 5%;
    background: #fff;
    z-index: 10;
    .subsidizeCharts {
      position: relative;
      // width: 100%;
      // height: 91%;
      .subsidizeChart {
        width: 1300px;
        height: 700px;
      }
      .maskDiV {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(255, 255, 255, 0);
      }
    }
    #subsidizeList {
      margin-top: 20px;
      width: 100%;
      height: 91%;
      border: 1px solid #ccc;
      table {
        width: 100%;
        thead {
          tr {
            height: 50px;
            line-height: 0px;
            th {
              font-size: 12px;
              width: 10%;
              text-align: center;
            }
          }
        }
        tbody {
          tr {
            border-top: 1px solid #ccc;
            height: 50px;
            line-height: 0px;
            td {
              width: 10%;
              text-align: center;
            }
          }
        }
      }
    }

    .bounce-enter-active {
      animation: bounce-in 6s;
    }
    .bounce-leave-active {
      animation: bounce-in 6s reverse;
    }
    @keyframes bounce-in {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(1);
      }
    }
    .subsidizeList {
      width: 100%;
    }
  }
}
</style>
