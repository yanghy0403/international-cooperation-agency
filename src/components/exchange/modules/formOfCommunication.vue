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
      <div ref="myTableImg"  id="subsidizeList" v-show="!isShowChart">
        <table>
          <thead>
          <tr>
            <th>交流形式</th>
            <th>数量</th>
          </tr>
          </thead>
          <tbody v-if="tableData1 != undefined">
          <tr v-for="(item,i) in foundingData" :key="i">
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
        <div ref="myTableImg"  id="subsidizeList" v-show="!isShowChart">
          <table>
            <thead>
            <tr>
              <th>交流形式</th>
              <th>数量</th>
            </tr>
            </thead>
            <tbody v-if="tableData1 != undefined">
            <tr v-for="(item,i) in foundingData" :key="i">
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
        show: false,
        clientHeight: "",
        foundingData: [],
        foundingDataTitle: [],
        foundingDataNumber: 0,
        mySubsidizeChart: null,
        titleName: "出、来访交流形式",
        tableData1: [],
        isShowChart: true,
        tabNum: "",
        myChart:null,
      };
    },
    props: {
      data:{
        default: []
      },
      mode:{

      }
    },
    // props: ["data","mode"],
    watch: {
      chart(val) {
        if (val !== 1) {
          this.$nextTick(() => {
            this.handleSubsidizeChart();
          });
        }
      },
      data: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          this.foundingDataNumber = 0
          if(JSON.stringify(val) != "[]"){
            this.foundingData = val;
            this.$nextTick(() => {
              this.handleSubsidizeChart();
            });
            val.forEach((item,index)=>{
              this.foundingDataTitle.push(item.name)
              this.foundingDataNumber += item.value
            })
          }

        }
      },
      mode(e) {
        this.tabNum = e;
      }
    },
    created(){

    },
    mounted() {
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
        let _this = this
        _this.myChart = this.$echarts.init(this.$refs.mySubsidizeChart)


        _this.myChart.showLoading();
        let option = {
          color: [

            "#4b5f7e",
            "#6a7f9e",
            "#8f94d2",
            "#80bdc4",
            "#bfcea5",
            "#ceafa5",
            "#e8c66b",
            "#db89ab",
            "#7a779c",
          ],
          legend: {
            orient: 'vertical',
            left: 'left',
            top:'center',
            // data: _this.foundingDataTitle
          },
          graphic: [
            {
              type: 'group',
              top: 'middle',
              left: '56%',
              // center: ["80%", "50%"],
              id: 'data',
              children: [
                {
                  type: 'text',
                  id: 'current',
                  top: 40,
                  style: {
                    text: _this.foundingDataNumber,
                    font: 'bolder 4em "Microsoft YaHei", sans-serif',
                    fill: '#000000',
                    textAlign: 'center',
                    fontSize:20,
                  }
                },
                {
                  type: 'text',
                  id: 'all',
                  top: 80,
                  style: {
                    text: '总量',
                    font: 'bolder 2em "Microsoft YaHei", sans-serif',
                    fill: '#000000',
                    textAlign: 'center',
                    fontSize:20,
                  }
                }
              ]
            }
          ],
          series: [
            {
              name: '轮次',
              type: 'pie',
              center: ["60%", "50%"],
              radius: ['50%', '75%'],
              avoidLabelOverlap: true,
              label: {
                show: true,
                position: 'outside',
                color:'#6f6f6f',
                borderColor:'#6f6f6f',
                borderWidth: 1 ,
                padding:3,
                align:'left',
                lineHeight:10,
                verticalAlign:'middle',
                formatter: '{c}次  {d}%'
                // formatter: (params) => {
                //   return `${params.percent}%`
                // }
              },
              labelLine: {
                show: true,
                lineStyle:{
                  type:'solid',
                  color:'#6f6f6f',
                }
              },
              // emphasis: {
              //   label: {
              //     show: true,
              //     fontSize: '16',
              //     fontWeight: 'bold'
              //   }
              // },
              data: _this.foundingData
            }
          ]
        };
        _this.myChart.hideLoading();
        _this.myChart.setOption(option, true);

      },
      beforeDestory(){
        this.$echarts.dispose(this.myChart);
        this.myChart = null;
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
      width: 100%;
      height: 350px;
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
