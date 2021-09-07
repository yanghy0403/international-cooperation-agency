<template>
  <div class="subsidize">
    <div class="indexTitleDiv">
      <div class="titleName">历年人员数量</div>
      <div class="operating">
        <div @click.stop="iconClick(1)" class="download iconDiv"></div>
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
      <div v-if="tabNum == 1" class="maskDiv"></div>
    </div>
    <div id="subsidizeList" v-show="!isShowChart">
      <table>
        <thead>
          <tr>
            <th>年份</th>
            <th>全职人员</th>
            <th>短期人员</th>
            <th>客座/兼职</th>
            <th>博士</th>
            <th>硕士</th>
            <th>总计</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in foundingData.tableData" :key="i">
            <td>{{ item.year }}</td>
            <td>{{ item.全职人员 }}</td>
            <td>{{ item.短期访问人员 }}</td>
            <td>{{ item.客座兼职人员 }}</td>
            <td>{{ item.博士 }}</td>
            <td>{{ item.硕士 }}</td>
            <td>{{ item.总计 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <transition name="bounce" mode="out-in">
      <div class="fullFcreen" v-if="!change">
        <div class="indexTitleDiv">
          <div class="titleName">历年人员数量</div>
          <div class="operating">
            <div @click.stop="iconClick(1)" class="download iconDiv"></div>
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
        </div>
        <div id="subsidizeList" v-show="!isShowChart">
          <table>
            <thead>
              <tr>
                <th>年份</th>
                <th>全职人员</th>
                <th>短期人员</th>
                <th>客座/兼职</th>
                <th>博士</th>
                <th>硕士</th>
                <th>总计</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in foundingData.tableData" :key="i">
                <td>{{ item.year }}</td>
                <td>{{ item.全职人员 }}</td>
                <td>{{ item.短期访问人员 }}</td>
                <td>{{ item.客座兼职人员 }}</td>
                <td>{{ item.博士 }}</td>
                <td>{{ item.硕士 }}</td>
                <td>{{ item.总计 }}</td>
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
      isShowChart: true,
      tabNum: "",
      // handleSubsidizeList: true
    };
  },
  props: ["data", "mode"],
  watch: {
    chart(val) {
      if (val == 0) {
        this.$nextTick(() => {
          this.handleSubsidizeChart();
        });
      }
    },
    data(vals) {
      this.foundingData = vals;
      this.$nextTick(() => {
        this.handleSubsidizeChart();
      });
    },
    mode(e) {
      this.tabNum = e;
    },
  },
  mounted() {
    this.foundingData = this.data;
    this.clientHeight = `${document.documentElement.clientHeight}`; //获取浏览器可视区域高度
    let that = this;
    window.onresize = function () {
      that.clientHeight = `${document.documentElement.clientHeight}`;
    };
    this.$nextTick(() => {
      this.myChart = this.$echarts.init(this.$refs.mySubsidizeChart);
      this.handleSubsidizeChart();
    });
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
    // 放大
    handleChange() {
      this.change = !this.change;
      let _this = this;
      let time = setTimeout(() => {
        if (!_this.change) {
          _this.$refs.mySubsidizeChart.style.height =
            _this.clientHeight - 250 + "px";
        } else {
          _this.$refs.mySubsidizeChart.style.height = 350 + "px";
        }
        if (_this.isShowChart) {
          _this.handleSubsidizeChart();
        }
        clearTimeout(time);
      }, 100);
    },
    // 下载图片
    download() {
      var i = this.myChart.getDataURL({
        type: "png",
        backgroundColor: "white",
        pixelRatio: 2,
        // 导出的图片分辨率比例，默认为 1。
        //pixelRatio: number,
      });
      var $a = document.createElement("a");
      $a.setAttribute("href", i);
      $a.setAttribute("download", "历年人员数量.png");
      $a.click();
    },
    handleSubsidizeChart() {
      let _this = this;
      _this.myChart = this.$echarts.init(this.$refs.mySubsidizeChart);
      _this.myChart.showLoading();
      var newVal = this.foundingData;
      var seriesData = [];

      let yAxisData = this.foundingData.yAxisData;
      var result = [];
      for (var i = 0; i < yAxisData.length; i++) {
        yAxisData[i].forEach(function (value, index) {
          if (result[index] == null || result[index] == "") {
            result[index] = 0;
          }
          result[index] += parseInt(value);
        });
      }

      if (newVal.listmonth) {
        for (var i = 0; i < newVal.listmonth.length; i++) {
          seriesData.push({
            name: newVal.legendData[i],
            type: "bar",
            barMaxWidth: 25,
            stack: "总量",
            itemStyle: {
              normal: {
                barBorderRadius: 0,
              },
            },
            label: {
              normal: {
                color: "#000000",
                show: false,
                position: [0, "-24px"],
                textStyle: {
                  fontSize: 12,
                },
              },
            },
            data: newVal.yAxisData[i],
          });
        }
      }

      seriesData.unshift({
        type: "bar",
        barMaxWidth: 25,
        barGap: "-95%", // 左移100%，stack不再与上面两个在一列
        label: {
          normal: {
            show: true,
            position: "top", //  位置设为top
            formatter: "{c}",
            textStyle: { color: "#000" },
          },
        },
        itemStyle: {
          normal: {
            color: "rgba(128, 128, 128, 0)", // 仍为透明
          },
        },
        data: result,
      });

      let option = {
        color: ["#475c7b", "#6a7f9e", "#8f94d2", "#80bdc4", "#bfcea5"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            textStyle: {
              color: "#fff",
            },
          },
        },
        grid: {
          left: 150,
          top: 30,
          right: 5,
          bottom: 20,
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          left: "0",
          itemGap: 24,
          align: "left",
          top: "middle",
          itemWidth: 12,
          itemHeight: 6,
          textStyle: {
            color: "#191919",
          },
          // data: ["全职人员(含博士后)", "短期访问人员", "客座/兼职人员", "博士", "硕士"]
        },

        calculable: true,
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#90979c",
                fontSize: 6,
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            axisLabel: {
              interval: 0,
            },
            data: newVal.listmonth,
          },
        ],
        yAxis: {
          type: "value",
          minInterval: 1,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#262626",
            },
          },
          splitLine: {
            show: true,
            // lineStyle: {
            //   color: "#262626"
            // }
          },
          axisLabel: {},
        },
        series: seriesData,
      };
      this.myChart.setOption(option, true);
      this.myChart.hideLoading();
    },
  },
  beforeDestroy() {
    if (this.myChart) {
      this.myChart.clear();
    }
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
    // width: 100%;
    // height: 330px;
    .subsidizeChart {
      width: 670px;
      height: 330px;
    }
    .maskDiv {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(255, 255, 255, 0);
    }
  }
  #subsidizeList {
    width: 100%;
    height: 330px;
    overflow-y: auto;
    border: 1px solid #ccc;
    table {
      width: 100%;
      thead {
        tr {
          height: 35px;
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
            text-align: center;
            font-size: 12px;
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
    z-index: 2;
    .subsidizeCharts {
      // width: 100%;
      // height: 91%;
      .subsidizeChart {
        width: 1300px;
        height: 700px;
      }
    }
    #subsidizeList {
      margin-top: 20px;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      border: 1px solid #ccc;
      table {
        width: 100%;
        thead {
          tr {
            height: 60px;
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
            height: 80px;
            line-height: 0px;
            td {
              width: 10%;
              text-align: center;
              font-size: 12px;
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