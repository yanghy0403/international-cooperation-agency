<template>
  <div class="subsidize">
    <div v-if="change" class="subsidizeCon">
      <div class="indexTitleDivNew2">
        <div class="operating">
          <div @click.stop="iconClick(1)" class="downloadNew iconDiv"></div>
          <div class="centerIcon">
            <div @click.stop="iconClick(2)" class="visualization iconDiv">
              <img :src="icon1" alt />
            </div>
            <div @click.stop="iconClick(3)" class="visualizationList iconDiv">
              <img :src="icon2" alt />
            </div>
          </div>
          <div @click.stop="iconClick(4)" class="fullScreen iconDiv"></div>
        </div>
        <div class="titleName">{{titleName}}</div>

      </div>
      <div class="subsidizeCharts" v-show="isShowChart">
        <div class="subsidizeChart" ref="mySubsidizeChart"></div>
      </div>
      <div class="subsidizeList" ref="myTableImg" v-show="!isShowChart">
        <div class="tableDiv">
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
              <td>{{item['value']}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <transition name="bounce" mode="out-in">
      <div class="fullFcreen"  v-if="!change">
        <div class="indexTitleDivNew">
          <div class="titleName">{{titleName}}</div>
          <div class="operating">
            <div @click.stop="iconClick(1)" class="downloadNew iconDiv"></div>

            <div class="centerIcon">
              <div @click.stop="iconClick(2)" class="visualization iconDiv">
                <img :src="icon1" alt />
              </div>
              <div @click.stop="iconClick(3)" class="visualizationList iconDiv">
                <img :src="icon2" alt />
              </div>
            </div>

            <div @click.stop="iconClick(4)" class="fullScreensPlus iconDiv"></div>
          </div>
        </div>
        <div class="subsidizeCharts" v-show="isShowChart">
          <div style="width: 100%;height: 100%!important;"  class="subsidizeChart" ref="mySubsidizeChart"></div>
        </div>
        <div class="subsidizeList" ref="myTableImg" v-show="!isShowChart">
          <div class="tableDiv">
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
                <td>{{item['value']}}</td>
              </tr>
              </tbody>
            </table>
          </div>

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
        icon3: require("../../../assets/images/国际人才/index/decisionicon2.png"),
        icon5: require("../../../assets/images/国际人才/index/图表选中.png"),


        icon2: require("../../../assets/images/国际人才/index/decisionicon1.png"),
        icon4: require("../../../assets/images/国际人才/index/图表列表选中.png"),
        icon6: require("../../../assets/images/国际人才/index/decisionicon1.png"),
        change: true,
        chart: 0,
        show: false,
        clientHeight: "",
        foundingData: {},
        mySubsidizeChart: null,
        titleName: "合作论文",
        tableData1: [],
        isShowChart: true,
        tabNum: "",
        myChart:null,
        fullFcreenHeight:'',
        fullFcreenLeft:'',
        subyData:[],
      };
    },
    props: ["data","mode",'headerHeight','asideHeight'],
    watch: {
      data: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          this.foundingData = val;
          this.foundingData.seriesData.forEach((item,index)=>{
            this.subyData.push(200)
            this.tableData1.push({
              year:this.foundingData.xData[index],
              value:this.foundingData.seriesData[index]
            })
          })
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
        let option  = {
          color: ['#5c80b7', '#ff3a25'],
          grid : {
            left : '0 ',
            right : '5',
            bottom : '20 ',
            top : 30,
            containLabel : true
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {show: false},
              axisLine: {
                show: true,
                lineStyle:{
                  color:'#2e394a'
                }
              },
              axisLabel:{
                color:'#8f949f',
                fontSize:9,
              },
              data:  _this.foundingData.xData
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisTick: {show: false},
              axisLine: {show: true,
                lineStyle:{
                  color:'#2e394a'
                }
              },
              axisLabel:{
                color:'#8f949f',
                // fontSize:9,
              },
              splitLine: {//分割线配置
                show: true,
                lineStyle: {
                  color: "#2e394a",
                }
              }
            },
            {
              type: 'value',
              axisTick: {show: false},
              axisLine: {show: true,
                lineStyle:{
                  color:'#2e394a'
                }
              },
            }
          ],
          series: [
            {
              name: '合作论文',
              type: 'bar',
              stack: '年份',
              barWidth :30, //柱形的宽度
              itemStyle: {
                normal: {
                  color: 'rgba(255,58,37,0.08)',
                },
                emphasis:{//鼠标移上去的样式
                  color:'#ff3a25',
                  label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示

                    distance: 15,
                    textStyle: { //数值样式
                      color: '#fff',
                      fontSize: 14
                    }
                  }
                }
              },
              data: _this.foundingData.seriesData
            },
            {
              name: '合作项目1',
              type: 'bar',
              stack: '年份',
              barWidth :30, //柱形的宽度
              itemStyle: {
                normal: {
                  color: '#ff3a25',

                },
                emphasis:{//鼠标移上去的样式
                  color:'#fff',
                }
              },
              data: _this.subyData
            },
          ]
        };
        _this.myChart.setOption(option, true);
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
  @import "./modules.less";

</style>
