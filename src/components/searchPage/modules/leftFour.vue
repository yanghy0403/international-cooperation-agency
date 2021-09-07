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
            <th>数量</th>
          </tr>
          </thead>
          <tbody v-if="tableData1 != undefined">
          <tr v-for="(item,i) in tableData1" :key="i">
            <td>{{item['year']}}</td>
            <td>{{item['paper']}}</td>

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
              <th>数量</th>
            </tr>
            </thead>
            <tbody v-if="tableData1 != undefined">
            <tr v-for="(item,i) in tableData1" :key="i">
              <td>{{item['year']}}</td>
              <td>{{item['paper']}}</td>
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
        titleName: "历年合作论文",
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

      getGraph() {
        // clearTimeout(this.time);
        let echarts = this.$echarts.init(this.$refs.mySubsidizeChart),
          _this = this;
        // var date = new Date().getFullYear();
        echarts.showLoading();
        // if (this.data.content) {
        let option = {
          backgroundColor: "#0E204A",
          tooltip: {
            trigger: "axis",
            axisPointer: {
              lineStyle: {
                width:10,
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(255,255,255,0)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(255,255,255,1)" // 100% 处的颜色
                    },
                    // {
                    //   offset: 1,
                    //   color: "rgba(255,255,255,0)" // 100% 处的颜色
                    // }
                  ],
                  global: false // 缺省为 false
                }
              }
            }
          },
          grid: {
            top: "18%",
            // left: "1%",
            right: "1%",
            bottom: "25%"
            // containLabel: true
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: true,
              axisLine: {
                //坐标轴轴线相关设置。数学上的x轴
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,0.4)"
                }
              },
              axisLabel: {
                //坐标轴刻度标签的相关设置
                textStyle: {
                  color: "#d1e6eb",
                  margin: 15
                }
              },
              axisTick: {
                show: false
              },
              data: [1000,2000,3000,4000,5000]
            }
          ],
          yAxis: [
            {
              type: "value",
              min: 0,
              // max: 140,
              splitNumber: 4,
              splitLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,0.1)"
                }
              },
              axisLine: {
                show: false
              },
              axisLabel: {
                show: false,
                margin: 20,
                textStyle: {
                  color: "#d1e6eb"
                }
              },
              axisTick: {
                show: false
              }
            }
          ],
          series: [
            {
              name: "注册总量",
              type: "line",
              // smooth: true, //是否平滑曲线显示
              // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
              showAllSymbol: true,
              // symbol: 'image://./static/images/guang-circle.png',
              symbolSize: 8,
              lineStyle: {
                normal: {
                  color: "#53fdfe" // 线条颜色
                },
                borderColor: "#f0f"
              },
              label: {
                show: true,
                position: "top",
                textStyle: {
                  color: "#fff"
                }
              },
              itemStyle: {
                normal: {
                  color: "rgba(255,255,255,0.1)"
                }
              },
              tooltip: {
                show: false
              },
              areaStyle: {
                //区域填充样式
                normal: {
                  //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                  shadowColor: "rgba(53,142,215, 0.9)", //阴影颜色
                  shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                }
              },
              data: [200,300,100,500,600]
            }
          ]
        };

        echarts.setOption(option, true);
        echarts.hideLoading();
      },

      handleSubsidizeChart() {
        let _this = this;
        _this.myChart = this.$echarts.init(this.$refs.mySubsidizeChart)
        _this.myChart.showLoading();
        let option  = {
          color: ['#5c80b7', '#ff3a25'],
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'none' }
          },
          grid : {
            left : '150',
            right : '0',
            bottom : '20 ',
            top : 30,
            containLabel : true
          },

          legend: {
            orient: 'vertical',
            left: 'left',
            top:'center',
            data: [
              {
                name:'合作论文',
              }
            ]
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
              data:  _this.foundingData.year,
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
              name: '合作论文',
              type: 'line',
              data: _this.foundingData.paper,
              itemStyle: {
                borderType: 'dotted',
                normal: {
                  color: '#55bdad',
                  lineStyle: {
                    color: "#55bdad",
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
                        offset: 1, color: '#55bdad' // 100% 处的颜色


                      }],
                      global: false // 缺省为 false
                    }
                  }
                }
              },

            },
            {
              data:_this.foundingData.paper,
              type: 'bar',
              showBackground: false,
              barWidth:'15',
              itemStyle: {
                borderType: 'dotted',
                normal: {
                  color: 'rgba(0,0,0,0)',
                  lineStyle: {
                    color: "#55bdad",
                    width: 1
                  },
                  areaStyle: {
                    //color: '#94C9EC'
                    color: 'rgba(0,0,0,0)'
                  }
                },
                emphasis:{//鼠标移上去的样式
                  color:new this.$echarts.graphic.LinearGradient(

                    0,0,0,1,
                    [{offset:0,color:'#55bdad'},{offset:1,color:'#fff'},]
                  )
                }
              },
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

      table {
        width: 100%;
        overflow-y: scroll;
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
