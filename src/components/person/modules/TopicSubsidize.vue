<template>
  <div class="subsidize">
    <div class="indexTitleDiv">
      <div class="titleName">{{ titleName }}</div>
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
      <div v-if="tabNum == 1" class="maskDiV"></div>
    </div>
    <div id="subsidizeList" v-show="!isShowChart">
      <table v-if="markNum == 0">
        <thead>
          <tr>
            <th>年份</th>
            <th>博士后</th>
            <th>访问学者</th>
            <th>杰出学者</th>
            <th>特需人才</th>
            <th>外国青年学者</th>
            <th>总计</th>
          </tr>
        </thead>
        <tbody v-if="tableData1 != undefined">
          <tr v-for="(item, i) in tableData1" :key="i">
            <td>{{ item.year }}</td>
            <td>{{ item.博士后 }}</td>
            <td>{{ item.访问学者 }}</td>
            <td>{{ item.杰出学者 }}</td>
            <td>{{ item.特需人才 }}</td>
            <td>{{ item.外国青年学者 }}</td>
            <td>{{ item.总计 }}</td>
          </tr>
        </tbody>
      </table>
      <table v-else>
        <thead>
          <tr>
            <th>年份</th>
            <th>数量</th>
          </tr>
        </thead>
        <tbody v-if="foundingData[0] != undefined">
          <tr v-for="(item, i) in foundingData[0].tableData" :key="i">
            <td>{{ item.year }}</td>
            <td>{{ item.year }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <transition name="bounce" mode="out-in">
      <div class="fullFcreen" v-if="!change">
        <div class="indexTitleDiv">
          <div class="titleName">{{ titleName }}</div>
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
          <div v-if="tabNum == 1" class="maskDiV"></div>
        </div>
        <div id="subsidizeList" v-show="!isShowChart">
          <table v-if="markNum == 0">
            <thead>
              <tr>
                <th>年份</th>
                <th>博士后</th>
                <th>访问学者</th>
                <th>杰出学者</th>
                <th>特需人才</th>
                <th>外国青年学者</th>
                <th>总计</th>
              </tr>
            </thead>
            <tbody v-if="tableData1 != undefined">
              <tr v-for="(item, i) in tableData1" :key="i">
                <td>{{ item.year }}</td>
                <td>{{ item.博士后 }}</td>
                <td>{{ item.访问学者 }}</td>
                <td>{{ item.杰出学者 }}</td>
                <td>{{ item.特需人才 }}</td>
                <td>{{ item.外国青年学者 }}</td>
                <td>{{ item.总计 }}</td>
              </tr>
            </tbody>
          </table>
          <table v-else>
            <thead>
              <tr>
                <th>年份</th>
                <th>数量</th>
              </tr>
            </thead>
            <tbody v-if="foundingData[0] != undefined">
              <tr v-for="(item, i) in foundingData[0].tableData" :key="i">
                <td>{{ item.year }}</td>
                <td>{{ item.year }}</td>
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
      titleName: "历年资助情况",
      markNum: 0,
      foundingData1: [],
      tableData1: [],
      isShowChart: true,
      tabNum: "",
      totalArr: [],
      yearArr: [],
    };
  },
  props: ["data", "mark", "datas", "mode"],
  watch: {
    chart(val) {
      if (val !== 1) {
        this.$nextTick(() => {
          this.handleSubsidizeChart();
        });
      }
    },
    mark(num) {
      this.markNum = num;
      if (num <= 3) {
        this.titleName = "历年资助情况";
      }
      if (num > 3) {
        this.titleName = "历年获奖情况";
      }
      this.handleSubsidizeChart();
    },
    data(val) {
      this.foundingData = val;
      this.tableData1 = val[0].tableData;
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
      $a.setAttribute("download", "历年资助.png");
      $a.click();
    },
    handleSubsidizeChart() {
      var myChart = this.$echarts.init(this.$refs.mySubsidizeChart),
        _this = this;
      // myChart.showLoading();
      var newVal = this.foundingData;
      var series = [];
      let mySubsidizeChartHeight = this.$refs.mySubsidizeChart.offsetHeight;
      let yAxisData = this.foundingData[0].yAxisData;
      var result = [];
      for (var i = 0; i < yAxisData.length; i++) {
        yAxisData[i].forEach(function (value, index) {
          if (result[index] == null || result[index] == "") {
            result[index] = 0;
          }
          result[index] += parseInt(value);
        });
      }
      this.totalArr = result;
      if (newVal != undefined) {
        for (var i = 0; i < newVal.length; i++) {
          if (newVal[i].listmonth != undefined) {
            var listmonth = newVal[0].listmonth;
            if (
              newVal[i].listmonth.length > 7 &&
              mySubsidizeChartHeight < 360
            ) {
              var dataZoom = [
                {
                  show: true,
                  height: 10,
                  xAxisIndex: [0],
                  bottom: "4%",
                  start: 30,
                  end: 100,
                  handleStyle: {
                    color: "#d3dee5",
                  },
                  textStyle: {
                    color: "#90979c",
                  },
                  borderColor: "#d3dee5",
                  //  backgroundColor: "#ed2424"
                },
              ];
            } else {
              var dataZoom = [
                {
                  show: false,
                },
              ];
            }
            for (var j = 0; j < newVal[0].listmonth.length; j++) {
              series.push({
                name: newVal[0].legendData[j],
                type: "bar",
                // barGap: "1%",
                barMaxWidth: 25,
                stack: "总量",
                itemStyle: {
                  normal: {
                    barBorderRadius: 0,
                    label: {
                      show: true,
                      fontSize: 6,
                      position: "inside",
                      formatter: function (p) {
                        return p.value > 0 ? p.value : "";
                      },
                    },
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
                data: newVal[0].yAxisData[j],
              });
            }
            series.unshift({
              type: "bar",
              barMaxWidth: 25,
              barGap: "-95%", // 左移100%，stack不再与上面两个在一列
              label: {
                normal: {
                  show: true,
                  position: [0, "-15px"],
                  // formatter: "{c}",
                  textStyle: { color: "#000", fontSize: 12 },
                },
              },
              itemStyle: {
                normal: {
                  color: "rgba(128, 128, 128, 0)", // 仍为透明
                },
              },
              data: result,
            });
          }
        }
      }

      let option = {
        color: ["#496081", "#899ab3", "#c5aa9a", "#d76459", "#89b397"],
        tooltip: {
          trigger: "axis",

          axisPointer: {
            type: "none",
            textStyle: {
              color: "#fff",
            },
          },
          textStyle: {
            fontSize: 10,
          },
        },
        grid: {
          left: 150,
          top: 15,
          right: 5,
          bottom: "18%",
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
          // data: this.foundingData.legendData
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
            data: listmonth,
          },
        ],
        yAxis: {
          // interval: 50,
          minInterval: 1,
          type: "value",
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
        dataZoom: dataZoom,
        series: series,
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
    z-index: 2;
    .subsidizeCharts {
      // position: relative;
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
