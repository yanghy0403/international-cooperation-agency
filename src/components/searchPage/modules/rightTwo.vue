<template>
  <div class="subsidize">
    <div v-if="change">
      <div class="indexTitleDiv">
        <div class="titleName">{{titleName}}</div>
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
      </div>
      <div id="subsidizeList" ref="myTableImg" v-show="!isShowChart">
        <table>
          <thead>
          <tr>
            <th>年份</th>
            <th>香港联合实验室</th>
            <th>中外联合研究单元</th>
          </tr>
          </thead>
          <tbody v-if="tableData1 != undefined">
          <tr v-for="(item,i) in tableData1" :key="i">
            <td>{{item['year']}}</td>
            <td>{{item['hkJointLab']}}</td>
            <td>{{item['sinoForeignUnit']}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <transition name="bounce" mode="out-in">
      <div class="fullFcreen"  v-if="!change">
        <div class="indexTitleDiv">
          <div class="titleName">{{titleName}}</div>
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
        <div id="subsidizeList" ref="myTableImg" v-show="!isShowChart">
          <table>
            <thead>
            <tr>
              <th>年份</th>
              <th>香港联合实验室</th>
              <th>中外联合研究单元</th>
            </tr>
            </thead>
            <tbody v-if="tableData1 != undefined">
            <tr v-for="(item,i) in tableData1" :key="i">
              <td>{{item['year']}}</td>
              <td>{{item['hkJointLab']}}</td>
              <td>{{item['sinoForeignUnit']}}</td>
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
        titleName: "历年合建平台",
        tableData1: [],
        isShowChart: true,
        tabNum: "",
        myChart:null,
        fullFcreenHeight:'',
        fullFcreenLeft:'',
      };
    },
    props: ["data","mode",'headerHeight','asideHeight'],
    watch: {
      data: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          this.foundingData = val;
          this.tableData1 = val.table
          this.$nextTick(() => {
            this.handleSubsidizeChart();
          });
        }
      },
      headerHeight: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          this.fullFcreenHeight = document.documentElement.clientHeight - val + 'px'
        }
      },
      asideHeight: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          this.fullFcreenLeft =  val + 'px'
        }
      },
      mode(e) {
        this.tabNum = e;
      }
    },
    mounted() {
      this.clientHeight = `${document.documentElement.clientHeight}`; //获取浏览器可视区域高度
      let that = this;
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
        $a.setAttribute("download", this.titleName+".png");
        $a.click();
      },
      // 下载table
      downloadTable() {
        let self = this;
        let refs = self.$refs.myTableImg
        let imgName = `${this.titleName}`
        setTimeout(function () {
          visitFun.downloadImg(refs,imgName)
        },500)
      },
      handleSubsidizeChart() {
        let _this = this;
        _this.myChart = this.$echarts.init(this.$refs.mySubsidizeChart)
        _this.myChart.showLoading();
        let data1 = [
          {
            name:'香港联合实验室',
          },
          {
            name:'中外联合研究单元',
          }
        ]
        let data2 = [
          {
            name:'中外联合研究单元',
          }
        ]
        let legendData = _this.foundingData.hkJointLab?data1:data2
        let option  = {
          color: ['#5c80b7', '#ff3a25'],
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'none' }
          },
          grid : {
            left : '160 ',
            right : '0',
            bottom : '20 ',
            top : 30,
            containLabel : true
          },

          legend: {
            orient: 'vertical',
            left: 'left',
            top:'center',
            data:legendData
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
              data: _this.foundingData.year
            }
          ],
          yAxis: [
            {
              type: 'value',
              minInterval:1,
              axisTick: {show: false},
              axisLine: {show: false},
              axisLabel:{
                color:'#191919',
              },
            }
          ],
          series: [
            {
              name: '香港联合实验室',
              type: 'line',
              data: _this.foundingData.hkJointLab,
              itemStyle: {
                borderType: 'dotted',
                  normal: {
                  color: '#ff3a25',
                    lineStyle: {
                    color: "#ff3a25",
                      width: 1
                  },
                  areaStyle: {
                    //color: '#94C9EC'
                    color: {
                      type: 'linear',
                        x: 0,
                        y: 1,
                        x2: 0,
                        y2: 0,
                        colorStops: [{
                        offset: 0, color: '#fff' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#ff3a25' // 100% 处的颜色


                      }],
                        global: false // 缺省为 false
                    }
                  }
                }
              },

            },
            {
              name: '中外联合研究单元',
              type: 'line',
              data: _this.foundingData.sinoForeignUnit,
              itemStyle: {
                borderType: 'dotted',
                normal: {
                  color: '#5c80b7',
                  lineStyle: {
                    color: "#5c80b7",
                    width: 1
                  },
                  areaStyle: {
                    //color: '#94C9EC'
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 1,
                      x2: 0,
                      y2: 0,
                      colorStops: [{
                        offset: 0, color: '#fff' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#5c80b7' // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                    }
                  }
                }
              },
            },
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
      bottom: 0px;
      left: 0px;
      /*width: 1430px;*/
      width: 100%;
      height: 100%;
      padding: 5%;
      background: #fff;
      z-index: 10;
      box-sizing: border-box;
      border: 1px solid #cacfd5;
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
