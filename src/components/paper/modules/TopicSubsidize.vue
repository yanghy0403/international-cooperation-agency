<template>
  <div class="subsidize">

    <div v-if="change">
      <div class="indexTitleDiv">
        <div class="titleName">{{componentTitle}}</div>
        <div class="operating">
          <div @click.stop="iconClick(1)"  class="downloadNew iconDiv" > </div>
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
      </div>
      <div id="subsidizeList" ref="myTableImg"  v-show="!isShowChart">
        <table>
          <thead>
          <tr>
            <th v-for="(item,index) in tableTitle" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody v-if="tableData1 != undefined">
          <tr v-for="(item,i) in tableData1" :key="i">
            <td v-for="(subItem,subIndex) in tableTitle" :key="subIndex">{{item[subItem]}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <transition name="bounce" mode="out-in">
      <div class="fullFcreen" v-if="!change">
        <div class="indexTitleDiv">
          <div class="titleName">{{componentTitle}}</div>
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
        <div class="subsidizeCharts" v-show="isShowChart">
          <div class="subsidizeChart" ref="mySubsidizeChart"></div>
        </div>
        <div id="subsidizeList" ref="myTableImg"  v-show="!isShowChart">
          <table>
            <thead>
            <tr>
              <th v-for="(item,index) in tableTitle" :key="index">{{item}}</th>
            </tr>
            </thead>
            <tbody v-if="tableData1 != undefined">
            <tr v-for="(item,i) in tableData1" :key="i">
              <td v-for="(subItem,subIndex) in tableTitle" :key="subIndex">{{item[subItem]}}</td>
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
        show: false,
        clientHeight: "",
        foundingData: {},
        mySubsidizeChart: null,
        titleName: "历年合作人次",
        tableData1: [],
        tableTitle:[
          '年份',
          '数量',
        ],
        componentTitle:'历年合作论文篇数',
        isShowChart: true,
        tabNum: "",
        totalArr:[100,200,300,400,500,600,700,800,900,1000],
        myChart:null,
      };
    },
    props: ["data","mode","visitType"],
    watch: {
      data: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          this.foundingData = val;
          this.foundingData.xData.forEach((item,index)=>{
            this.tableData1.push({
              '年份':item,
              '数量':this.foundingData.seriesData[index],
            })
          })
          this.$nextTick(() => {
            this.handleSubsidizeChart();
          });
        }
      },
      mode(e) {
        this.tabNum = e;
      }
    },
    mounted() {
      let that = this;
      this.clientHeight = `${document.documentElement.clientHeight}`; //获取浏览器可视区域高度
      window.onresize = function () {
        that.clientHeight = `${document.documentElement.clientHeight}`;
      };
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
            _this.handleSubsidizeChart();
          },100)
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
        let _this = this
        let time = setTimeout(() => {
          if (!_this.change) {
            _this.$refs.mySubsidizeChart.style.height =
              _this.clientHeight - 250 + "px";
          }
          // else {
          //   _this.$refs.mySubsidizeChart.style.height = 350 + "px";
          // }
          if(_this.isShowChart){
            _this.handleSubsidizeChart();
          }
          clearTimeout(time);
        }, 100);
      },
      // 下载图片
      download() {
        let _this = this
        var i = _this.myChart.getDataURL({
          type: "png",
          backgroundColor: "white",
          pixelRatio: 2,
          // 导出的图片分辨率比例，默认为 1。
          //pixelRatio: number,
        });
        var $a = document.createElement("a");
        $a.setAttribute("href", i);
        $a.setAttribute("download", this.componentTitle+".png");
        $a.click();
      },
      // 下载table
      downloadTable() {
        let self = this;
        let refs = self.$refs.myTableImg
        let imgName = `${this.componentTitle}`
        setTimeout(function () {
          visitFun.downloadImg(refs,imgName)
        },500)
      },
      handleSubsidizeChart() {
        let _this = this;
        _this.myChart = this.$echarts.init(this.$refs.mySubsidizeChart)
        _this.myChart.showLoading();
        let option = {
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {show: false},
              axisLine: {
                show: true,
                lineStyle:{
                  color:'#d3d6dd'
                }
              },
              axisLabel:{
                color:'#191919',
              },
              data: _this.foundingData.xData,
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisTick: {show: false},
              axisLine: {show: false},
              axisLabel:{
                color:'#191919',
              },
            }
          ],
          series: [
            {
              name: '2018',
              type: 'line',
              label: {
                normal: {
                  color: '#000000',
                  show: true,
                  position: [0, '-24px'],
                  textStyle: {
                    fontSize: 12
                  },
                }
              },
              itemStyle: {
                normal: {
                  color:'#ff3a25',
                  lineStyle: {
                    color: "#ff3a25",
                    width:1
                  },
                  areaStyle: {
                    color: new _this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                      offset: 0,
                      color: '#f1f3f6'
                    }, {
                      offset: 1,
                      color: '#ff3a25'
                    }]),
                  }
                }
              },
              data: _this.foundingData.seriesData
            }
          ]
        };

        _this.myChart.setOption(option, true);
        _this.myChart.hideLoading();
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
        background: rgba(255,255,255,0);
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
      width: 1450px;
      height: 91.5%;
      padding: 5%;
      background: #fff;
      z-index: 10;
      .subsidizeCharts {
        position: relative;
        width: 100%;
        height: 91%;
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
          background: rgba(255,255,255,0);
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
