<template>
  <div class="subsidize">
    <div class="indexTitleDiv">
      <div class="titleName">全院{{visitType}}人次访问机构排名</div>
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
    <div class="subsidizeCharts" id="orgChartImg1" v-show="isShowChart"  >
      <div class="subsidizeChart"  ref="mySubsidizeChart" style="width: 100%;height: 100%;">
        <div style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" ref="mySubsidizeChartHover"></div>
          <div class="rankTitle" style="height: 20px;">
            <div class="rangeLeftDiv"></div>
            <div class="rangeRightDiv" ref="rangeItemRef">
              <div  class="rangeItem" v-for="(item,index) in rankRange" :key="index">{{item}}</div>
            </div>
          </div>
          <div class="rankCon" :style="{height:rankConrHeight}">
            <div ref="rankConBoxDiv">
              <div class="topHeight"></div>
              <div class="conItem" v-for="(item,index) in foundingData['chartData']" :key="index">
                <div class="conLeft" :title="item.name">{{item.name}}</div>
                <div class="conRight">
                  <div :name="item.value"  class="colorDiv" :style="{width:((Number(item.value)/Number(rankRange[6])*(13/14))*100+'%') , marginLeft:((rangeItemWidth/2)+'px')}"></div>
                  <div class="textDiv">{{item.value}}</div>
                </div>
              </div>
            </div>

            <div class="lineDiv" :style="{width:(rangeItemWidth*7)+'px',height:rankConBoxDivHeight+'px'}">
              <div  :style="{width:(rangeItemWidth)+'px',height:rankConBoxDivHeight+'px'}"  class="lineItem" v-for="(item,index) in 7" :key="index">
                <div class="line" :style="{width:'1px',height:rankConBoxDivHeight+'px'}"></div>
              </div>
            </div>
          </div>

      </div>
      <div v-if="tabNum == 1" class="maskDiV"></div>
    </div>
    <div id="subsidizeList" ref="myTableImg" v-show="!isShowChart">
      <table>
        <thead>
        <tr>
          <th style="width: 70%;text-align: left;text-indent: 100px">机构名称</th>
          <th style="width: 30%;text-align: left">人次</th>
        </tr>
        </thead>
        <tbody v-if="tableData1 != undefined">
        <tr v-for="(item,i) in tableData1" :key="i">
          <td style="width: 70%;text-align: left;text-indent: 100px">{{item.name}}</td>
          <td style="width: 30%;text-align: left">{{item.value}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <transition name="bounce" mode="out-in">
      <div class="fullFcreen" v-if="!change">
        <div class="indexTitleDiv">
          <div class="titleName">全院{{visitType}}人次访问机构排名</div>
          <div class="operating">
            <div @click.stop="iconClick(12)" class="downloadNew iconDiv"></div>
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
          <div class="subsidizeChart" id="orgChartImg2" ref="mySubsidizeChart mySubsidizeChart2">
            <div class="rankTitle" style="height: 20px;">
              <div class="rangeLeftDiv" style="width: 400px;"></div>
              <div class="rangeRightDiv" ref="rangeItemRef2">
                <div  class="rangeItem" v-for="(item,index) in rankRange" :key="index">{{item}}</div>
              </div>
            </div>
            <div class="rankCon" style="height: 100%;">
              <div ref="rankConBoxDiv2">
                <div class="topHeight"></div>
                <div class="conItem" v-for="(item,index) in foundingData['chartData']" :key="index">
                  <div class="conLeft" style="width: 400px;">{{item.name}}</div>
                  <div class="conRight">
                    <div  class="colorDiv" :style="{width:((Number(item.value)/Number(rankRange[6])*(12/13))*100+'%') , marginLeft:((rangeItemWidth2/2)+'px')}"></div>
                    <div class="textDiv">{{item.value}}</div>
                  </div>
                </div>
              </div>

              <div class="lineDiv" :style="{width:(rangeItemWidth2*7)+'px',height:rankConBoxDivHeight2+'px'}">
                <div  :style="{width:(rangeItemWidth2)+'px',height:rankConBoxDivHeight2+'px'}"  class="lineItem" v-for="(item,index) in 7" :key="index">
                  <div class="line" :style="{width:'1px',height:rankConBoxDivHeight2+'px'}"></div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="tabNum == 1" class="maskDiV"></div>
        </div>
        <div id="subsidizeList" ref="myTableImg" v-show="!isShowChart">
          <table>
            <thead>
            <tr>
              <th style="width: 70%;text-align: left;text-indent: 100px">机构名称</th>
              <th style="width: 30%;text-align: left">人次</th>
            </tr>
            </thead>
            <tbody v-if="tableData1 != undefined">
            <tr v-for="(item,i) in tableData1" :key="i">
              <td style="width: 70%;text-align: left;text-indent: 100px">{{item.name}}</td>
              <td style="width: 30%;text-align: left">{{item.value}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  //引入js
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
        foundingData: [],
        mySubsidizeChart: null,
        titleName: "全院出访人次访问机构排名",
        tableData1: [],
        isShowChart: true,
        tabNum: "",
        rankRange:['0','2000','4000','6000','8000','10000','12000'],
        maxNum:'12000',

        rankConrHeight:'',
        rangeItemWidth:'',
        rangeItemWidth2:'',
        rankConBoxDivHeight:'',
        rankConBoxDivHeight2:'',
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
          this.tableData1 = val.chartData;
          this.$nextTick(() => {
            this.rankConrHeight = (this.$refs.mySubsidizeChart.clientHeight-20)+'px'
            this.rangeItemWidth = (this.$refs.rangeItemRef.clientWidth)/7
            this.rankConBoxDivHeight = (this.$refs.rankConBoxDiv.clientHeight)
          });


          if(val.chartData){
            let arr = visitFun.getRangeType(val.chartData[0].value)
            this.rankRange = arr
          }

        }
      },
      mode: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          this.tabNum = val;
        }
      },
      change: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          let that = this
          if(val == true){
            this.rangeItemWidth2 = (this.$refs.rangeItemRef2.clientWidth)/7
            this.rankConBoxDivHeight2 = (this.$refs.rankConBoxDiv2.clientHeight)
          }else{
            that.getFullWidth()
          }
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
      getFullWidth(){
        this.$nextTick(() => {
          this.rangeItemWidth2 = (this.$refs.rangeItemRef2.clientWidth)/7
          this.rankConBoxDivHeight2 = (this.$refs.rankConBoxDiv2.clientHeight)
        });
      },


      iconClick(val) {
        if (val == 1) {
          if(this.isShowChart){
            this.download();
          }else{
            this.downloadTable();
          }
        } else if (val == 12) {
          if(this.isShowChart){
            this.download2();
          }else{
            this.downloadTable();
          }
        } else if (val == 2) {
          this.icon1 = this.icon5;
          this.icon2 = this.icon6;
          this.isShowChart = true;
          this.getFullWidth()

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
          clearTimeout(time);
        }, 100);
      },
      // 下载图片
      download() {
        let self = this;
        let refs = document.getElementById('orgChartImg1')
        let imgName = `全院${self.visitType}人次访问机构排名`
        setTimeout(function () {
          visitFun.newdownloadImg(refs,imgName)
        },500)
      },
      // 下载图片
      download2() {
        let self = this;
        // let refs = self.$refs.mySubsidizeChart
        let refs = document.getElementById('orgChartImg2')
        let imgName = `全院${self.visitType}人次访问机构排名`
        setTimeout(function () {
          visitFun.newdownloadImg(refs,imgName)
        },500)
      },
      // 下载table
      downloadTable() {
        let self = this;
        let refs = self.$refs.myTableImg
        let imgName = `全院${self.visitType}人次访问机构排名`
        setTimeout(function () {
          visitFun.downewdownloadImgnloadImg(refs,imgName)
        },500)
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
  .subsidizeChart{
    width: 100%;
    height: 100%;
    z-index: 5;
    position: relative;
    .rankTitle{
      width: 100%;
      height: 20px;
      background: #ede2e2;
      display: flex;
      .rangeLeftDiv{
        width: 300px;
      }
      .rangeRightDiv{
        flex: 1;
        display: flex;
        .rangeItem{
          flex: 1;
          text-align: center;
          color: #8f949f;
          font-size: 10px;
          line-height: 20px;
        }
      }
    }
    .rankCon{
      /*display: flex;*/
      overflow-y: scroll;
      position: relative;
      .topHeight{
        width: 100%;
        height: 10px;
      }
      .conItem{
        display: flex;
        height: 32px;
        line-height: 32px;
        width: 100%;
        .conLeft{
          width: 300px;
          text-align: right;
          font-size: 12px;
          color: #6f6f6f;
          cursor: pointer;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .conRight{
          flex: 1;
          display: flex;
          align-items: center;
          .colorDiv{
            height: 6px;
            z-index: 6;
            /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#f1f3f6+1,ff3a25+100 */
            background: #f1f3f6; /* Old browsers */
            background: -moz-linear-gradient(left,  #f1f3f6 1%, #5a80b7 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(left,  #f1f3f6 1%,#5a80b7 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to right,  #f1f3f6 1%,#5a80b7 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f1f3f6', endColorstr='#ff3a25',GradientType=1 ); /* IE6-9 */
          }
          .textDiv{
            margin-left: 10px;
            height: 32px;
            line-height: 32px;
            color: #8f949f;
            font-size: 10px;
          }
        }
      }
      .conItem:hover{
        .colorDiv{
          height: 12px;
        }
        .textDiv{
          color: #5a80b7;font-weight: 600;
        }
        .conLeft{
          color: #5a80b7;font-weight: 600;
        }
      }
      .lineDiv{
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        /*z-index: 0;*/

        height: 100%;
        .lineItem{
          display: flex;
          justify-content: center;
          .line{
            background: #d3d6dd;
            margin-left: 10px;
          }
        }
        .lineItem:first-child{
          background: transparent;
          z-index: 8;
          .line{
            z-index: 8;
          }
        }
      }
    }
    .rankCon::-webkit-scrollbar {
      width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    .rankCon::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      background: #adbacd;
    }
    .rankCon::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      background: #d3d6dd;
    }
    .rankCon::-webkit-scrollbar-thumb:hover {
      background: #ff3925 !important;
    }
  }



  .subsidize {
    width: 100%;
    height: 100%;
    padding: 10px 20px;
    .subsidizeCharts {
      position: relative;
      width: 670px;
      height: 330px;
      .subsidizeChart
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
        .subsidizeChart
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
