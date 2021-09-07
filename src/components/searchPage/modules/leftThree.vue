<template>
  <div class="subsidize">
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
        <div @click.stop="iconClick(4)" class="fullScreen iconDiv"></div>
      </div>
    </div>
    <div class="subsidizeCharts" v-show="isShowChart">
      <div class="subsidizeChart" ref="mySubsidizeChart"></div>
    </div>
    <div style="overflow-x: scroll"  ref="myTableImg" class="subsidizeList" v-show="!isShowChart">
      <table>
        <thead>
        <tr style="height: 60px;line-height: 30px;">
          <th>年份</th>
          <th>所级合作协议</th>
          <th>院级合作协议</th>
        </tr>
        </thead>
        <tbody v-if="tableData1 != undefined">
        <tr v-for="(item,i) in tableData1" :key="i">
          <td>{{item.year}}</td>
          <td>{{item.agreement}}</td>
          <td>{{item.collegeAgreement}}</td>
        </tr>
        </tbody>
      </table>
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
        <div class="subsidizeList" ref="myTableImg" v-show="!isShowChart">
          <table>
            <thead>
            <tr>
              <th>年份</th>
              <th>所级合作协议</th>
              <th>院级合作协议</th>
            </tr>
            </thead>
            <tbody v-if="tableData1 != undefined">
            <tr style="width: 100px;"  v-for="(item,i) in tableData1" :key="i">
              <td>{{item.year}}</td>
              <td>{{item.agreement}}</td>
              <td>{{item.collegeAgreement}}</td>
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
        tableData1: [],
        tableTitle:[],
        componentTitle:'历年签署协议 ',
        isShowChart: true,
        tabNum: "",
        totalArr:[100,200,300,400,500,600,700,800,900,1000],
        myChart:null,
        newData:[],
        // newData:[
        //   {"yAxisData": [
        //       ["159","199","251","150","201","196","242","239","280","259","209","174"],
        //
        //       ["5","5","5","5","5","5","5","5","5","5","5","5"],
        //       ],
        //     "legendData":["访问学者"],
        //     "listmonth":[2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],
        //     "stack":'name1',
        //   } ,
        //   {"yAxisData": [
        //       ["100","20","40","50","60","70","50","55","300","400","200","200"],
        //
        //       ["5","5","5","5","5","5","5","5","5","5","5","5"],
        //
        //       ],
        //     "legendData":["博士后",],
        //     "listmonth":[2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],
        //     "stack":'name2',
        //   } ,
        // ]
      };
    },
    props: ["data","mode","visitType"],
    watch: {
      data: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          let arr = []
          val.agreement.forEach((item)=>{
            arr.push('0')
          })


          this.newData = [
            {
              "yAxisData": [
                [...val.agreement],
                [...arr],
              ],
              "legendData":['',"所级合作协议"],
              "listmonth":[...val.year],
              "stack":'name1',
            } ,
            {
              "yAxisData": [
                [...val.collegeAgreement],
                [...arr],
              ],
              "legendData":['',"院级合作协议",],
              "listmonth":[...val.year],
              "stack":'name2',
            } ,
          ]
          this.foundingData = this.newData;

          this.tableData1 = []
          this.tableTitle = []
          this.tableData1 = val.table;
          // for(let item in this.tableData1[0]){
          //   this.tableTitle.push(item)
          // }
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
        this.change = !this.change;
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
        $a.setAttribute("download", '历年签署协议'+".png");
        $a.click();
      },
      // 下载table
      downloadTable() {
        let self = this;
        let refs = self.$refs.myTableImg
        let imgName = `历年签署协议`
        setTimeout(function () {
          visitFun.downloadImg(refs,imgName)
        },500)
      },
      handleSubsidizeChart() {
        let _this = this;
        _this.myChart = this.$echarts.init(this.$refs.mySubsidizeChart)

        var newVal = this.foundingData
        var series = [];
        let mySubsidizeChartHeight = this.$refs.mySubsidizeChart.offsetHeight;
        this.totalArr = []
        let ydata = (this.foundingData[0].yAxisData)
        if(JSON.stringify(ydata) != "[]"){
          let length1 = ydata[0].length
          let length2 = ydata.length
          for(let i = 0;i <length1 ; i++ ){
            let a = 0
            for(let j = 0;j < length2;j++ ){
              a = a + Number(ydata[j][i])
            }
            this.totalArr.push(a)
          }
        }
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
                  name: newVal[i].legendData[j],
                  type: "bar",
                  // barGap: "1%",
                  barMaxWidth: 20,
                  stack: newVal[i].stack,
                  barGap: 0,
                  itemStyle: {
                    normal: {
                      barBorderRadius: 0,
                      color:j == 0?i == 0?new this.$echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#e24e51'},{offset:1,color:'#fff'},]):new this.$echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#5e87c3'},{offset:1,color:'#fff'},]):i == 0?'#e24e51':'#5e87c3',
                      // color:j == 1?i == 0?'#e24e51':'#5e87c3' :'rgba(0,0,0,0)',
                      label: {
                        show: true,
                        fontSize: 6,
                        position: "inside",
                        formatter: function (p) {
                          return p.value > 0 ? p.value : "";
                        },
                      },
                    },
                    emphasis:{//鼠标移上去的样式
                      color: j == 0?i == 0?new this.$echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#e24e51'},{offset:1,color:'#fff'},]):new this.$echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#5e87c3'},{offset:1,color:'#fff'},]):i == 0?'#e24e51':'#5e87c3',
                    }
                  },
                  label: {
                    normal: {
                      color: '#000000',
                      show: true,
                      position: [0, '-24px'],
                      textStyle: {
                        fontSize: 12
                      },
                      formatter: function (a, b) {
                        if(a.seriesName == '特需人才'){
                          return _this.totalArr[a.dataIndex]
                        }else{
                          return ''
                        }
                        // return a.name
                      }
                    }
                  },
                  data: newVal[i].yAxisData[j],
                });
              }
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
            formatter:function (params) {
              let year = params[0].axisValue
              let data1 = params[0].data
              let data3 = params[2].data
              return `${year}<br/>所级合作协议：${data1}<br/>院级合作协议：${data3}`

            }
          },
          grid: {
            left: '170',
            top: 15,
            right: 5,
            bottom: "18%",
            containLabel : true
          },
          legend: {
            type: "scroll",
            orient: "vertical",
            left: "0",
            // itemGap: 24,
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
            // min:20,
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
    .subsidizeList {
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
    .subsidizeList::-webkit-scrollbar {
      width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    .subsidizeList::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      background: #ff3a25;
    }
    .subsidizeList::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      background: #d3d6dd;
    }
    .fullFcreen {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
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
      .subsidizeList {
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
