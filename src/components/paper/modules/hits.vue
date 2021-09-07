<template>
  <div class="subsidize">
    <div class="indexTitleDiv">
      <div class="titleName">{{componentTitle}}</div>
      <div class="operating">
        <div @click.stop="iconClick(1)" class="downloadNew iconDiv"></div>
        <div @click.stop="iconClick(2)" class="visualization iconDiv">
          <img :src="icon1" alt />
        </div>
        <!--<div @click.stop="iconClick(3)" class="visualizationList iconDiv">-->
          <!--<img :src="icon2" alt />-->
        <!--</div>-->
        <div @click.stop="iconClick(4)" class="fullScreen iconDiv"></div>
      </div>
    </div>
    <div class="subsidizeCharts">
      <div class="subsidizeChart" ref="mySubsidizeChart" id="mySubsidizeChart"></div>
    </div>

    <transition name="bounce" mode="out-in">
      <div class="fullFcreen" ref="fullFcreen" v-if="!change">
        <div class="indexTitleDiv">
          <div class="titleName">{{componentTitle}}</div>
          <div class="operating">
            <div @click.stop="iconClick(1)" class="downloadNew iconDiv"></div>
            <div @click.stop="iconClick(2)" class="visualization iconDiv">
              <img :src="icon1" alt />
            </div>
            <!--<div @click.stop="iconClick(3)" class="visualizationList iconDiv">-->
              <!--<img :src="icon2" alt />-->
            <!--</div>-->
            <div @click.stop="iconClick(4)" class="fullScreensPlus iconDiv"></div>
          </div>
        </div>
        <div class="subsidizeCharts">
          <div class="subsidizeChart" ref="mySubsidizeChart" id="mySubsidizeChart"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        height:window.innerHeight-800 + 'px',
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
        clientWidth: "",
        foundingData: {},
        mySubsidizeChart: null,
        titleName: "历年出访人数",
        tableData1: [],
        tableTitle:[],
        componentTitle:'点击与引文网络',
        isShowChart: true,
        tabNum: "",
        totalArr:[100,200,300,400,500,600,700,800,900,1000],
        table:[
          {
            name:'被点击',
            value:90
          }, {
            name:'被引用',
            value:90
          }, {
            name:'引用的参考文献',
            value:90
          },
        ],
        clickData:{},
        myChart:null,

      };
    },
    props: ["data","mode","visitType"],
    watch: {
      data: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          this.clickData = val;
          this.$nextTick(() => {
            this.handleSubsidizeChart();
          });
        }
      },
    },
    mounted() {
      this.clientHeight = `${document.documentElement.clientHeight}`; //获取浏览器可视区域高度
      this.clientWidth = `${document.documentElement.clientWidth}`; //获取浏览器可视区域高度
      let that = this;
      window.onresize = function () {
        that.clientHeight = `${document.documentElement.clientHeight}`;
      };

      // this.handleSubsidizeChart()
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
        if(!this.change){
          this.$emit('changeWindow', '1')   // 打开
        }else{
          this.$emit('changeWindow', '2')  // 关闭
        }
        let time = setTimeout(() => {
          if (!this.change) {
            this.$refs.mySubsidizeChart.style.height = window.innerHeight - 250 + "px";
            this.$refs.fullFcreen.style.height = window.innerHeight - 100 + "px";
          } else {
            this.$refs.mySubsidizeChart.style.height = 300 + "px";
          }
          this.handleSubsidizeChart();
          clearTimeout(time);
        }, 100);
      },
      // 下载图片
      download() {
        let _this = this
        let i = _this.myChart.getDataURL({
          type: "png",
          backgroundColor: "white",
          pixelRatio: 2,
          // 导出的图片分辨率比例，默认为 1。
          //pixelRatio: number,
        });
        let $a = document.createElement("a");
        $a.setAttribute("href", i);
        $a.setAttribute("download", this.componentTitle+".png");
        $a.click();
      },
      handleSubsidizeChart() {
        let _this = this
        _this.myChart  = this.$echarts.init(this.$refs.mySubsidizeChart)
        _this.myChart.showLoading();


        let option = {
          backgroundColor: "rgba(0,0,0,0)",
          title: {
            text: _this.clientWidth>1700?'说明：数据来自Web of Science 核心合集，截至2019年7月':'说明：数据来自Web of Science 核心合集，\n截至2019年7月',
            // text: '说明：数据来自Web of Science 核心合集，截止2019年7月',
            textStyle: {
              align: 'center',
              color: '#393939',
              fontSize: 12,
            },
            bottom: _this.change?'0':'100',
            left: '0',
          },
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0,0,0,0.9)',
            formatter: "{b}:{c}",
          },
          grid: {
            right: 10,
            left: 20,
            top: 40,
            bottom: _this.change?60:160,
          },
          yAxis: [
            {
              type: 'value',
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
            } ,          {
              type: 'value',
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
            }
          ],
          xAxis: [{
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
            data: _this.clientWidth>1900?['被点击数','被引用数',`引用的参考文献数`]:['被点击数','被引用数',`引用的参考\n文献数`]
            // data: _this.clickData.label
          }],
          series: [{
            type: 'pictorialBar',
            symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
            data: _this.clickData.data,
            barWidth: '150%',
            symbolOffset: [0, 0],
            z: 1,
            label: {
              show: true,
              formatter: "{c} ",
              position: 'top',
              color: '#ff3a25',
            },
            itemStyle: {
              normal: {
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 10,
                shadowOffsetY: -5,
                shadowOffsetX: 0,
                color: new _this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#f1f3f6'
                }, {
                  offset: 1,
                  color: '#ff3a25'
                }],),
              },
              emphasis: {
                opacity: 1
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
      top: 0px;
      left: 0px;
      /*position: fixed;*/
      /*bottom: 20px;*/
      /*right: 52px;*/
      width: 1560px;
      min-height: 600px;
      /*height: 94%;*/
      /*height: 91%;*/
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
