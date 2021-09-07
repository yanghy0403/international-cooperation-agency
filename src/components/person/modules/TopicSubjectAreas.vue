<template>
  <div class="areas">
    <div class="indexTitleDiv">
      <div class="titleName">学科领域分布</div>
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
    <div class="areasCharts" v-show="isShowChart">
      <p class="subjectName" style="font-size: 14px;margin: 5px 10px;">当前选中的学科：<span style="font-weight: bold;">{{subjectName}}</span></p>
      <div class="areasChart" ref="mySubsidizeChart"></div>
      <div v-if="tabNum == 1" class="markDiv"></div>
    </div>
    <div id="subjectAreasList" v-show="!isShowChart">
      <table>
        <thead>
          <tr>
            <th>学科名称</th>
            <th>数量</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in tableData" :key="i">
            <td>{{item.major}}</td>
            <td>{{item.count}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <transition name="bounce" mode="out-in">
      <div class="fullFcreen" v-if="!change">
        <div class="indexTitleDiv">
          <div class="titleName">学科领域分布</div>
          <div class="operating">
            <div @click.stop="iconClick(1)" class="download iconDiv"></div>
            <div @click.stop="iconClick(2)" class="visualization iconDiv">
              <img :src="icon1" alt />
            </div>
            <div @click.stop="iconClick(3)" class="visualizationList iconDiv">
              <img :src="icon2" alt />
            </div>
            <div @click.stop="iconClick(4)" class="fullScreensPlus iconDiv"></div>
          </div>
        </div>
        <div class="areasCharts" v-show="isShowChart">
          <p class="subjectName" style="font-size: 14px;margin: 5px 10px;">当前选中的学科：<span style="font-weight: bold;">{{subjectName}}</span></p>
          <div class="areasChart" ref="mySubsidizeChart"></div>
          <div v-if="tabNum == 1" class="markDiv"></div>
        </div>
        <div id="subjectAreasList" v-show="!isShowChart">
          <table>
            <thead>
              <tr>
                <th>学科名称</th>
                <th>数量</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) in tableData" :key="i">
                <td>{{item.major}}</td>
                <td>{{item.count}}</td>
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
      clientHeight: "",
      subjectData: {},
      dataName: "",
      sourceVal: "internationalPerson",
      twoSubjectData: [],
      MaxName: "",
      MaxCount: "",
      colorVal: "#899ab3",
      data2: [],
      tableData: [],
      isShowChart: true,
      tabNum: "",
      firstData: [],
      subjectSelectVal: "",
      textVal: "",
      subjectName: "",
    };
  },
  props: ["data", "type", "mode", "subjectSelect"],
  watch: {
    chart(val) {
      if (val == 0) {
        this.$nextTick(() => {
          this.handleSubjectAreas();
        });
      }
    },
    data(val) {
      this.subjectData = val;
      this.tableData = val.subjectData;
      this.handleSubjectAreas();
    },
    type(typeVal) {
      this.sourceVal = typeVal;
    },
    mode(e) {
      this.tabNum = e;
    },
    subjectSelect(e) {
      this.subjectSelectVal = e;
    },
  },
  mounted() {
    this.subjectData = this.data;
    this.clientHeight = `${document.documentElement.clientHeight}`; //获取浏览器可视区域高度
    let that = this;
    window.onresize = function () {
      that.clientHeight = `${document.documentElement.clientHeight}`;
    };
    this.$nextTick(() => {
      this.handleSubjectAreas();
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
      let time = setTimeout(() => {
        if (!this.change) {
          this.$refs.mySubsidizeChart.style.height =
            this.clientHeight - 250 + "px";
        } else {
          this.$refs.mySubsidizeChart.style.height = 300 + "px";
        }
        this.handleSubjectAreas();
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
      $a.setAttribute("download", "学科领域.png");
      $a.click();
    },
    handleSubjectAreas() {
      var myChart = this.$echarts.init(this.$refs.mySubsidizeChart),
        _this = this;
      myChart.showLoading();
      // 一级学科处理
      var firstSubjectData = this.subjectData.subjectData;
      if (firstSubjectData != undefined) {
        firstSubjectData.pop();
        this.subjectName = firstSubjectData[0].major
      }

      // 二级学科处理
      var twoSubjectData = this.subjectData.subjectTWO;
      if (twoSubjectData != undefined) {
        twoSubjectData.forEach((item, i) => {
          item.name = item.name;
          item.value = item.value;
          item.itemStyle = {
            normal: {
              color: this.colorVal,
              opacity:
                (twoSubjectData.length - i) * (1 / twoSubjectData.length),
            },
          };
          item.labelLine = {
            normal: {
              show: true,
              length: 5,
              length2: 5,
              lineStyle: {
                color: "#6f6f6f",
              },
            },
          };
        });
      }

      let total = 0;
      if (firstSubjectData != undefined) {
        firstSubjectData.forEach((item) => {
          total = total + item.value;
        });
      }

      if (firstSubjectData != undefined) {
        firstSubjectData.forEach((item, i) => {
          item.name = item.major;
          item.value = item.count;
          item.labelLine = {
            normal: {
              show: item.value / total > 0.08,
              length: 5,
              length2: 5,
              // smooth: true,
              lineStyle: {
                color: "#6f6f6f",
              },
            },
            length: 5,
            length2: 5,
            // smooth: true,
            lineStyle: {
              color: "#6f6f6f",
            },
          };

          if (!this.subjectSelectVal) {
            firstSubjectData[0].selected = true;
            firstSubjectData[0].labelLine = {
              normal: {
                show: true,
                length: 5,
                length2: 5,
                // smooth: true,
                color: "#6f6f6f",
              },
            };
            firstSubjectData[0].label = {
              show: true,
              normal: {
                position: "outside",
                fontSize: 12,
                color: "#6f6f6f",
              },
            };
          } else if (item.major === this.subjectSelectVal) {
            item.selected = true;
            item.labelLine = {
              normal: {
                show: true,
                length: 5,
                length2: 5,
                // smooth: true,
                color: "#6f6f6f",
              },
            };
            item.label = {
              show: true,
              normal: {
                position: "outside",
                fontSize: 20,
                color: "#6f6f6f",
              },
            };
          }
        });
      }
      var seriesData = [
        {
          name: "",
          type: "pie",
          radius: "75%",
          selectedMode: "single",
          center: ["25%", "50%"],
          label: {
            show: true,
            formatter: function (params) {
              if (params.percent > 8) {
                return params.data.name + params.percent + "%";
              } else {
                return "";
              }
            },
            borderWidth: 1,
            color: "#6f6f6f",
            fontSize: 10,
          },
          color: [
            "#899ab3",
            "#9eaec7",
            "#627796",
            "#89a4b3",
            "#9dcecf",
            "#9fb898",
            "#a698b8",
            "#dbcfb4",
            "#dbbab4",
            "#d79494",
            "#8b9eb9",
            "#b6dbe7",
            "#7a779c",
            "#89c3db",
            "#db89ab",
            "#dbce89",
            "#536689",
            "#6ccdaa",
            "#c9e0fd",
            "#b5937b",
            "#89b3b3",
          ],
          data: firstSubjectData,
        },
        {
          name: "",
          type: "pie",
          radius: "50%",
          center: ["80%", "40%"],
          label: {
            show: true,
            formatter: function (params) {
              return params.data.name + params.percent + "%";
            },
            borderWidth: 1,
            color: "#6f6f6f",
            fontSize: 8,
          },
          data: twoSubjectData,
        },
      ];
      if (seriesData.length > 2) {
        seriesData.pop();
      }
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: seriesData,
      };
      myChart.setOption(option, true);
      myChart.hideLoading();
      let that = this;
      myChart.off("click");
      myChart.on("click", function (params) {
        that.subjectName = params.data.name
        var name2 = params.data.name;
        this.textVal = params.name
        this.colorVal = params.color;
        if (firstSubjectData) {
          firstSubjectData.forEach((item, i) => {
            if (params.dataIndex == i) {
              item.selected = true;
            } else {
              item.selected = false;
            }
          });
        }

        that.axios
          .get("/international/topic/subSubject", {
            params: {
              year: that.subjectData.params.yearSelect,
              continent: that.subjectData.params.continentSelect,
              country: that.subjectData.params.countrySelect,
              city:that.subjectData.params.citySelect,
              personType: that.subjectData.params.personTypeSelect,
              source: that.subjectData.params.source,
              type: that.subjectData.params.type,
              subject: name2,
            },
          })
          .then((res) => {
            if (res.data.code == 200) {
              if(that.sourceVal == 'internationalPerson') {
                var subSubject = res.data.data.data;
              }else {
                var subSubject = res.data.data;
              }
              
                if (seriesData.length >= 2) {
                seriesData.splice(1, 1);
              }
              if (subSubject !=undefined) {
                var subSubject = subSubject.map((item, i) => {
                  return {
                    name: item.name,
                    value: item.value,
                    itemStyle: {
                      normal: {
                        color: this.colorVal,
                        opacity:
                          (twoSubjectData.length - i) *
                          (1 / twoSubjectData.length),
                      },
                    },
                  };
                });
                seriesData.push({
                  name: "",
                  type: "pie",
                  radius: "50%",
                  center: ["80%", "40%"],
                  data: subSubject,
                  label: {
                    show: true,
                    formatter: function (params) {
                      return params.data.name + params.percent + "%";
                    },
                    borderWidth: 1,
                    color: "#6f6f6f",
                    fontSize: 8,
                  },
                  labelLine: {
                    normal: {
                      show: true,
                      length: 5,
                      length2: 10,
                      color: "#6f6f6f",
                      lineStyle: {
                        color: "#6f6f6f",
                      },
                    },
                  },
                });
              }
              myChart.setOption(option, true);
            }
          });
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/titlecss.less";

.areas {
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  .areasCharts {
    position: relative;
    width: 100%;
    height: 320px;
    border: 1px solid #d3d6dd;
    .areasChart {
      float: left;
      width: 670px;
      height: 280px;
    }
    .markDiv {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(255, 255, 255, 0);
    }
  }
  #subjectAreasList {
    // margin-top: 20px;
    width: 100%;
    overflow-y: auto;
    height: 330px;
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
            font-size: 12px;
            text-align: center;
          }
        }
      }
    }
  }
  #subjectAreasList::-webkit-scrollbar {
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  #subjectAreasList::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    background: #ff3a25;
  }
  #subjectAreasList::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    background: #d3d6dd;
  }
  .fullFcreen {
    position: absolute;
    top: 40px;
    left: 20px;
    width: 1430px;
    height: 90%;
    padding: 5%;
    background: #fff;
    z-index: 2;
    .areasCharts {
      border: none;
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
    .areasCharts {
      position: relative;
      // width: 100%;
      // height: 100%;
      margin-top: 30px;
      .areasChart {
        float: left;
        width: 1300px;
        height: 700px;
      }
      .markDiv {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(255, 255, 255, 0);
      }
    }
    #subjectAreasList {
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
            }
          }
        }
      }
    }
    #subjectAreasList::-webkit-scrollbar {
      width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    #subjectAreasList::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      background: #ff3a25;
    }
    #subjectAreasList::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      background: #d3d6dd;
    }
  }
}
</style>