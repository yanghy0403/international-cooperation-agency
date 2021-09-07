<template>
  <div class="areas">

    <div v-if="change">
      <div class="indexTitleDiv">
        <div class="titleName">{{visitType}}学科分布</div>
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
      <div class="areasCharts" v-show="isShowChart">
        <div class="areasChart" ref="mySubsidizeChart"></div>
      </div>
      <div ref="myTableImg"  id="subjectAreasList" v-show="!isShowChart">
        <table>
          <thead>
          <tr>
            <th>学科名称</th>
            <th>数量</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,i) in tableData" :key="i">
            <td>{{item.name}}</td>
            <td>{{item.value}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <transition name="bounce" mode="out-in">
      <div class="fullFcreen" v-if="!change">
        <div class="indexTitleDiv">
          <div class="titleName">{{visitType}}学科分布</div>
          <div class="operating">
            <div @click.stop="iconClick(1)" class="downloadNew iconDiv"></div>
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
          <div class="areasChart" ref="mySubsidizeChart"></div>
        </div>
        <div ref="myTableImg"  id="subjectAreasList" v-show="!isShowChart">
          <table>
            <thead>
            <tr>
              <th>学科名称</th>
              <th>数量</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,i) in tableData" :key="i">
              <td>{{item.name}}</td>
              <td>{{item.value}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import visitFun from '@/assets/js/visit.js'
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
        visitType:'出、来访',
        myChart:null,
      };
    },
    props: ["data", "mode", "subjectSelect"],
    watch: {
      data: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          if(val.subjectData){
            this.subjectData = JSON.parse(JSON.stringify(val));
            this.tableData = val.subjectData;
            this.$nextTick(() => {
              this.handleSubjectAreas();
            });
          }

        }
      },
      mode(e) {
        this.tabNum = e;
      },
      subjectSelect(e) {
        this.subjectSelectVal = e;
      },
    },
    mounted() {
      // this.subjectData = this.data;
      this.clientHeight = `${document.documentElement.clientHeight}`; //获取浏览器可视区域高度
      let that = this;
      window.onresize = function () {
        that.clientHeight = `${document.documentElement.clientHeight}`;
      };
      this.myChart = this.$echarts.init(this.$refs.mySubsidizeChart)
      this.myChart.showLoading();

    },
    methods: {
      iconClick(val) {
        let _this = this
        if (val == 1) {
          if(this.isShowChart){
            this.download();
          }else{
            this.downloadTable();
          }
        } else if (val == 2) {
          this.icon1 = this.icon5;
          this.icon2 = this.icon6;
          this.isShowChart = true;
          setTimeout(()=>{
            _this.handleSubjectAreas();
          },100)
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
        let _this = this
        _this.change = !_this.change;
        let time = setTimeout(() => {
          if (!_this.change) {
            _this.$refs.mySubsidizeChart.style.height =
              _this.clientHeight - 250 + "px";
          }
          // else {
          //   _this.$refs.mySubsidizeChart.style.height = 350 + "px";
          // }
          if(_this.isShowChart){
            _this.handleSubjectAreas();
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
        $a.setAttribute("download", this.visitType+"学科分布.png");
        $a.click();
      },
      // 下载table
      downloadTable() {
        let self = this;
        let refs = self.$refs.myTableImg
        let imgName = `${this.visitType}+"学科分布`
        setTimeout(function () {
          visitFun.downloadImg(refs,imgName)
        },500)
      },
      handleSubjectAreas() {
        let _this = this
        _this.myChart = this.$echarts.init(this.$refs.mySubsidizeChart)
        // 一级学科处理
        let firstSubjectData = this.subjectData.subjectData;
        if (firstSubjectData != undefined) {
          firstSubjectData.pop();
        }
        _this.myChart.showLoading();

        // 二级学科处理
        let twoSubjectData = this.subjectData.subjectTWO.value;
        if (twoSubjectData != undefined) {
          this.data2 = []
          twoSubjectData.forEach((item, i) => {
            this.data2.push({
              name: item.name,
              value: item.value,
              itemStyle: {
                normal: {
                  color: this.colorVal,
                  opacity:
                  (twoSubjectData.length - i) * (1 / twoSubjectData.length),
                },
              },
              labelLine: {
                normal: {
                  show: true,
                  length: 5,
                  length2: 5,
                  lineStyle: {
                    color: "#6f6f6f",
                  },
                },
              },
            });
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
            // item.name = item.name;
            // item.value = item.count;
            item.labelLine = {
              normal: {
                show: item.value / total > 0.08,
                length: 2,
                length2: 5,
                // smooth: true,
                lineStyle: {
                  color: "#6f6f6f",
                },
              },
              length: 2,
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
                  length: 10,
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
            } else if (item.name === this.subjectSelectVal) {
              item.selected = true;
              item.labelLine = {
                normal: {
                  show: true,
                  length: 2,
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
              fontSize: 12,
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
            center: ["80%", "50%"],
            label: {
              show: true,
              formatter: function (params) {
                return params.data.name + params.percent + "%";
              },
              borderWidth: 1,
              color: "#6f6f6f",
              fontSize: 8,
            },
            data: this.data2,
          },
        ];
        if (seriesData.length > 2) {
          seriesData.pop();
        }
        let option = {
          tooltip: {
            trigger: "item",
            formatter: "{a} {b} : {c} ({d}%)",
          },
          series: seriesData,
        };
        _this.myChart.setOption(option, true);
        _this.myChart.hideLoading();
        let that = this;
        _this.myChart.off("click");
        _this.myChart.on("click", function (params) {
          _this.myChart.showLoading();
          var name2 = params.data.name;
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

          var city = that.subjectData.city,
            continent = that.subjectData.continent,
            country = that.subjectData.country,
            enOrg = that.subjectData.enOrg,
            type = that.subjectData.type,
            year = that.subjectData.year,
            zhOrg = that.subjectData.zhOrg,
            subject = name2;
          that.axios
            .get("/communication/exchangeVists/secondSubject", {
              params: {
                city: city,
                continent: continent,
                country: country,
                enOrg: enOrg,
                type: type,
                year: year,
                zhOrg: zhOrg,
                subject: subject,
                offset:1,
                limit:100,
              },
            })
            .then((res) => {
              if (res.data.code == 200) {
                var subSubject = res.data.data.secondSubjectNumber.SecondSubject[0].value;
                if (seriesData.length >= 2) {
                  seriesData.splice(1, 1);
                }
                if (subSubject != undefined) {
                  var newsubSubject = subSubject.map((item, i) => {
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
                    center: ["80%", "50%"],
                    data: newsubSubject,
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
                _this.myChart.setOption(option, true);
                _this.myChart.hideLoading();
              }
            });
        });
      },

    },
    beforeDestory(){
      this.$echarts.dispose(this.myChart);
      this.myChart = null;
    }
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
        width: 100%;
        height: 100%;
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
      width: 1450px;
      height: 91.5%;
      padding: 5%;
      background: #fff;
      z-index: 10;
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
        width: 100%;
        height: 100%;
        margin-top: 30px;
        .areasChart {
          float: left;
          width: 100%;
          height: 100%;
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
