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
      <div ref="subsidizeCharts" class="subsidizeCharts globaltableScroll" v-show="isShowChart">
        <div v-if="chartData.length<=3" style="height: 60px;"></div>
        <ul data-v-e8d02020 class="ivu-timeline">
          <li v-if="chartData.length != 0" data-v-e8d02020 class="ivu-timeline-item" style="min-height: 31px!important;">
            <div class="ivu-timeline-item-tail" style="height: 29px!important;top: 0px;"></div>
          </li>
          <li data-v-e8d02020 class="ivu-timeline-item" v-for="(item,index) in chartData" :key="index">
            <div class="ivu-timeline-item-tail"></div>
            <div class="ivu-timeline-item-head ivu-timeline-item-head-blue"></div>
            <div class="ivu-timeline-item-content">
              <p data-v-e8d02020 class="time">NO.{{item.index >9?item.index : '0'+item.index }}</p>
              <div class="img"><img :src="item.head?baseUrl+item.head:head" alt=""></div>
              <div class="textDiv">
                <p @click="toPersonDetail(item.personId)"  data-v-e8d02020 style="font-size: 16px;font-weight: 600;color: #393939;cursor: pointer" class="content" >{{item.name}}</p>
                <p data-v-e8d02020 style="font-size: 12px;color: #6f6f6f;" class="content" >{{item.award}}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="subsidizeList" ref="myTableImg" v-show="!isShowChart">
        <table>
          <thead>
          <tr>
            <th style="width: 30%;">姓名</th>
            <th style="width: 10%;">奖励次数</th>
            <th style="width: 60%;">奖励详情</th>
          </tr>
          </thead>
          <tbody v-if="tableData1 != undefined">
          <tr v-for="(item,i) in tableData1" :key="i">
            <td style="width: 30%;">{{item['name']}}</td>
            <td style="width: 10%;">{{item['count']}}</td>
            <td style="width: 60%;">{{item['award']}}</td>
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
        <div ref="subsidizeCharts" class="subsidizeCharts" v-show="isShowChart">
          <div v-if="chartData.length<=3" style="height: 60px;"></div>

          <ul data-v-e8d02020 class="ivu-timeline">
            <li v-if="chartData.length != 0" data-v-e8d02020 class="ivu-timeline-item" style="min-height: 31px!important;">
              <div class="ivu-timeline-item-tail" style="height: 29px!important;top: 0px;"></div>
            </li>
            <li data-v-e8d02020 class="ivu-timeline-item" v-for="(item,index) in chartData" :key="index">
              <div class="ivu-timeline-item-tail"></div>
              <div class="ivu-timeline-item-head ivu-timeline-item-head-blue"></div>
              <div class="ivu-timeline-item-content">
                <p data-v-e8d02020 class="time">NO.{{item.index >9?item.index : '0'+item.index }}</p>
                <div class="img"><img :src="item.head? baseUrl +item.head:head" alt=""></div>
                <div class="textDiv">
                  <p @click="toPersonDetail(item.personId)" data-v-e8d02020 style="font-size: 16px;font-weight: 600;color: #393939;cursor: pointer" class="content" >{{item.name}}</p>
                  <p data-v-e8d02020 style="font-size: 12px;color: #6f6f6f;" class="content" >{{item.award}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="subsidizeList" ref="myTableImg" v-show="!isShowChart">
          <table>
            <thead>
            <tr>
              <th>姓名</th>
              <th>奖励次数</th>
              <th>奖励详情</th>
            </tr>
            </thead>
            <tbody v-if="tableData1 != undefined">
            <tr v-for="(item,i) in tableData1" :key="i">
              <td>{{item['name']}}</td>
              <td>{{item['count']}}</td>
              <td>{{item['award']}}</td>
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
        head: require("../../../assets/images/searchPage/head.png"),
        change: true,
        chart: 0,
        show: false,
        clientHeight: "",
        foundingData: {},
        mySubsidizeChart: null,
        titleName: "获得合作奖人员",
        tableData1: [],
        isShowChart: true,
        tabNum: "",
        myChart:null,
        fullFcreenHeight:'',
        fullFcreenLeft:'',
        chartData:[],
        baseUrl:visitFun.setUrl
      };
    },
    props: ["data","mode",'headerHeight','asideHeight'],
    watch: {
      data: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          this.chartData = val;
          this.tableData1 = val
          this.$nextTick(() => {
            // this.handleSubsidizeChart();
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
        } else if (val == 3) {
          this.icon1 = this.icon3;
          this.icon2 = this.icon4;
          this.isShowChart = false;
        } else if (val == 4) {
          this.handleChange();
        }
      },
      toPersonDetail(id){
        if(id){
          this.$router.push({
            path: "/PersonDetails",
            query: { id: id },
          });
        }else{
          alert('获取人物id不成功，跳转失败！')
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
          clearTimeout(time);
        }, 100);
      },
      // 下载图片
      download() {
        let self = this;
        // let refs = document.getElementById('subsidizeCharts')
        let refs = self.$refs.subsidizeCharts
        let imgName = `${this.titleName}`
        setTimeout(function () {
          visitFun.downloadImg(refs,imgName)
        },500)
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
    },
    beforeDestory(){
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
    .subsidizeCharts::-webkit-scrollbar {
      width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    .subsidizeCharts::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      background: #ff3a25;
    }
    .subsidizeCharts::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      background: #d3d6dd;
    }
    .subsidizeCharts {
      position: relative;
      width: 100%;
      height: 330px;
      overflow-y: scroll;
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

      ul {
        margin-left: 120px;
        li {
          /*margin-bottom: 12px;*/
          position: relative;
          padding: 0 0 24px;
          margin-left: 62px;
          min-height: 63px;
          display: flex;
          align-items: center;
          .ivu-timeline-item-content{
            padding-bottom: 0px;
            display: flex;
            align-items: center;
            .time {
              position: absolute;
              left: -60px;
              top: 0px;
              color: #ff3925;
              font-weight: bold;
              height: 100%;
              display: flex;
              align-items: center;
            }
            .img{
              width: 50px;
              height: 50px;
              margin-right: 12px;
              img{
                width: 50px;
                height: 50px;
                float: left;
              }
            }
            .textDiv{
              .content{
                color: #6f6f6f;
                font-size: 14px;
                /*line-height:22px;*/
              }
              p:nth-of-type(1){
                margin-top:0px;
              }
              p:nth-of-type(2){
                margin-top:0px;
              }
              p{
                margin-top:10px;
              }
            }

          }


          .ivu-timeline-item-head-blue {
            color: #ff3925;
            border-color: #ff3925;
          }
          .ivu-timeline-item-head {
            width: 10px;
            height: 10px;
            /*margin-top: 18px;*/
          }
          .ivu-timeline-item-tail {
            border-left: 0.005208rem solid #ff3925;
            opacity: 0.1;
            left: 5px;
          }
        }
        /deep/ .ivu-timeline-item:last-child .ivu-timeline-item-tail {
          height:39px!important;
          display:block!important;
        }
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
            height: 70px;
            line-height: 0px;
            td {
              width: 10%;
              height: 70px;
              font-size: 12px;
              line-height: 35px;
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
