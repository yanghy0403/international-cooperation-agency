<template>
  <div class="subsidize">
    <div v-if="change" class="subsidizeCon">
      <div class="indexTitleDivNewCenter">
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

          <div @click.stop="iconClick(4)" class="fullScreen iconDiv"></div>
        </div>
      </div>
      <div class="subsidizeChartsMap" ref="chartDiv" v-show="isShowChart">
        <div class="mapDiv">
          <div class="mapChart" ref="mapChart"></div>
          <div class="typeDiv">
            <div v-for="(item,index) in typeData" :key="index" @click="changeType(index)">
              <img :src="item.selected?selectedType:defaultType" alt="">
              <span :style="{color:item.selected?'#ffffff':'#8f949f'}">{{item.name}}</span>
            </div>
          </div>
          <div class="yearDiv">
            <div class="yearCon">
              <div @click="changeYear(1)" class="switchDiv">
                <img :src="openTimer==0?turnOff:open" alt="">
              </div>
              <div class="toLeft" @click="changeYear(2)"><img :src="toLeft" alt=""></div>
              <div class="yearItemCon">
                <!--<div class="yearSubCon">-->
                  <div :style="{color:item.selected?'#ff3a25':'#8f949f'}" class="yearItem" v-for="(item,index) in yearData" @click="changeYear(3,index)" :key="index">
                    <img v-if="item.selected" class="cursorOn" :src="cursorOn" alt="">
                    <img v-if="item.selected" class="underCursor" :src="underCursor" alt="">
                    {{item.year}}
                  </div>
                <!--</div>-->
              </div>
              <div @click="changeYear(4)" class="toRight"><img :src="toRight" alt=""></div>
            </div>
          </div>
        </div>
        <div class="lineDiv">
          <div class="subsidizeChart" ref="mySubsidizeChart"></div>
        </div>
      </div>
      <div class="subsidizeList" ref="myTableImg" v-show="!isShowChart">
        <div class="tableDiv">
          <table>
            <thead>
            <tr>
              <th>国家</th>
              <th>数量</th>
            </tr>
            </thead>
            <tbody v-if="tableData1 != undefined">
            <tr v-for="(item,i) in tableData1" :key="i">
              <td>{{item['name']}}</td>
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
        <div class="subsidizeChartsMap" ref="chartDiv" v-show="isShowChart">
          <div class="mapDiv">
            <div class="mapChart" ref="mapChart"></div>
            <div class="typeDiv">
              <div v-for="(item,index) in typeData" :key="index" @click="changeType(index)">
                <img :src="item.selected?selectedType:defaultType" alt="">
                <span :style="{color:item.selected?'#ffffff':'#8f949f'}">{{item.name}}</span>
              </div>
            </div>
            <div class="yearDiv">
              <div class="yearCon">
                <div @click="changeYear(1)" class="switchDiv">
                  <img :src="openTimer==0?turnOff:open" alt="">
                </div>
                <div class="toLeft" @click="changeYear(2)"><img :src="toLeft" alt=""></div>
                <div class="yearItemCon">
                  <!--<div class="yearSubCon">-->
                  <div :style="{color:item.selected?'#ff3a25':'#8f949f'}" class="yearItem" v-for="(item,index) in yearData" @click="changeYear(3,index)" :key="index">
                    <img v-if="item.selected" class="cursorOn" :src="cursorOn" alt="">
                    <img v-if="item.selected" class="underCursor" :src="underCursor" alt="">
                    {{item.year}}
                  </div>
                  <!--</div>-->
                </div>
                <div @click="changeYear(4)" class="toRight"><img :src="toRight" alt=""></div>
              </div>
            </div>
          </div>
          <div class="lineDiv">
            <div style="width: 100%;height: 100%!important;" class="subsidizeChart" ref="mySubsidizeChart"></div>
          </div>
        </div>
        <div class="subsidizeList" ref="myTableImg" v-show="!isShowChart">
          <div class="tableDiv">
            <table>
              <thead>
              <tr>
                <th>国家</th>
                <th>数量</th>
              </tr>
              </thead>
              <tbody v-if="tableData1 != undefined">
              <tr v-for="(item,i) in tableData1" :key="i">
                <td>{{item['name']}}</td>
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
  let allYearData =
      [
        {
    year:'2010',
    selected:false,
  }, {
    year:'2011',
    selected:false,
  }, {
    year:'2012',
    selected:false,
  }, {
    year:'2013',
    selected:false,
  }, {
    year:'2014',
    selected:false,
  }, {
    year:'2015',
    selected:false,
  }, {
    year:'2016',
    selected:false,
  }, {
    year:'2017',
    selected:false,
  }, {
    year:'2018',
    selected:false,
  }, {
    year:'2019',
    selected:false,
  }, {
    year:'2020',
    selected:false,
  },] ,

    communicateYearData =
      [
        {
    year:'2010',
    selected:false,
  }, {
    year:'2011',
    selected:false,
  }, {
    year:'2012',
    selected:false,
  }, {
    year:'2013',
    selected:false,
  }, {
    year:'2014',
    selected:false,
  }, {
    year:'2015',
    selected:false,
  }, {
    year:'2016',
    selected:false,
  }, {
    year:'2017',
    selected:false,
  }, {
    year:'2018',
    selected:false,
  }, {
    year:'2019',
    selected:false,
  }, ],

    talentYearData =
      [
      {
    year:'2009',
    selected:false,
  },   {
    year:'2010',
    selected:false,
  }, {
    year:'2011',
    selected:false,
  }, {
    year:'2012',
    selected:false,
  }, {
    year:'2013',
    selected:false,
  }, {
    year:'2014',
    selected:false,
  }, {
    year:'2015',
    selected:false,
  }, {
    year:'2016',
    selected:false,
  }, {
    year:'2017',
    selected:false,
  }, {
    year:'2018',
    selected:false,
  }, {
    year:'2019',
    selected:false,
  }, {
    year:'2020',
    selected:false,
  }, ],

    projectYearData =
      [
      {
    year:'2006',
    selected:false,
  },{
    year:'2007',
    selected:false,
  },{
    year:'2008',
    selected:false,
  },{
    year:'2009',
    selected:false,
  },   {
    year:'2010',
    selected:false,
  }, {
    year:'2011',
    selected:false,
  }, {
    year:'2012',
    selected:false,
  }, {
    year:'2013',
    selected:false,
  }, {
    year:'2014',
    selected:false,
  }, {
    year:'2015',
    selected:false,
  }, {
    year:'2016',
    selected:false,
  }, {
    year:'2017',
    selected:false,
  }, {
    year:'2018',
    selected:false,
  }, {
    year:'2019',
    selected:false,
  }, {
    year:'2020',
    selected:false,
  }, ],

    paperYearData =
      [
     {
    year:'2015',
    selected:false,
  }, {
    year:'2016',
    selected:false,
  }, {
    year:'2017',
    selected:false,
  }, {
    year:'2018',
    selected:false,
  }, {
    year:'2019',
    selected:false,
  }, ]
  export default {
    data() {
      return {
        icon1: require("../../../assets/images/国际人才/index/图表选中.png"),
        icon3: require("../../../assets/images/国际人才/index/decisionicon2.png"),
        icon5: require("../../../assets/images/国际人才/index/图表选中.png"),
        icon2: require("../../../assets/images/国际人才/index/decisionicon1.png"),
        icon4: require("../../../assets/images/国际人才/index/图表列表选中.png"),
        icon6: require("../../../assets/images/国际人才/index/decisionicon1.png"),
        defaultType: require("../../../assets/images/decision/defaultType.png"),
        selectedType: require("../../../assets/images/decision/selectedType.png"),
        open: require("../../../assets/images/decision/暂停.png"),
        turnOff: require("../../../assets/images/decision/播放.png"),
        toLeft: require("../../../assets/images/decision/年份箭头左.png"),
        toRight: require("../../../assets/images/decision/年份箭头右.png"),
        cursorOn: require("../../../assets/images/decision/cursorOn.png"),
        underCursor: require("../../../assets/images/decision/underCursor.png"),

        change: true,
        chart: 0,
        show: false,
        clientHeight: "",
        foundingData: {},
        GlobalDataData: {},
        mySubsidizeChart: null,
        titleName: "国家或地区排名",
        tableData1: [],
        isShowChart: true,
        tabNum: "",
        myChart:null,
        fullFcreenHeight:'',
        fullFcreenLeft:'',
        typeData:[
          {
            name:'综合态势',
            selected:true,
            value:'all',
          },  {
            name:'人员交流',
            selected:false,
            value:'communication',
          }, {
            name:'国际人才',
            selected:false,
            value:'talent',
          }, {
            name:'合作项目',
            selected:false,
            value:'project',
          }, {
            name:'合作论文',
            selected:false,
            value:'paper',
          },
        ],
        yearData:[
          {
            year:'2010',
            selected:false,
          }, {
            year:'2011',
            selected:false,
          }, {
            year:'2012',
            selected:false,
          }, {
            year:'2013',
            selected:false,
          }, {
            year:'2014',
            selected:false,
          }, {
            year:'2015',
            selected:false,
          }, {
            year:'2016',
            selected:false,
          }, {
            year:'2017',
            selected:false,
          }, {
            year:'2018',
            selected:false,
          }, {
            year:'2019',
            selected:false,
          }, {
            year:'2020',
            selected:false,
          },
        ],

        typeValue:'',
        yearIndex:null,
        timer :null,
        openTimer:0,
        selectedMax:0,
      };
    },
    props: ["data","countryData","mode",'headerHeight','asideHeight'],
    watch: {
      data: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          this.GlobalDataData = val;
          // this.selectedMax = this.GlobalDataData.maxData

          if(this.typeData[0].selected == true){
            this.selectedMax = this.GlobalDataData.maxData
          }else if(this.typeData[1].selected == true){
            this.selectedMax = this.GlobalDataData.communicationMax
          }else if(this.typeData[2].selected == true){
            this.selectedMax = this.GlobalDataData.talentMax
          }else if(this.typeData[3].selected == true){
            this.selectedMax = this.GlobalDataData.projectMax
          }else if(this.typeData[4].selected == true){
            this.selectedMax = this.GlobalDataData.paperMax
          }
          this.tableData1 = val.data
          this.$nextTick(() => {
            this.handleWorldMap();
          });
        }
      },
      countryData: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          this.foundingData = val;
          this.$nextTick(() => {
            this.handleSubsidizeChart();
            // this.handleWorldMap();
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
            _this.handleWorldMap();

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
          if(_this.isShowChart){
            _this.handleSubsidizeChart();
            _this.handleWorldMap();
          }
          clearTimeout(time);
        }, 100);
      },
      // 下载图片
      download() {
        let self = this;
        let refs = self.$refs.chartDiv
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
      handleSubsidizeChart() {
        let _this = this;
        _this.myChart = this.$echarts.init(this.$refs.mySubsidizeChart)
        let option  = {
          color: ['#5c80b7', '#ff3a25'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none',
              lineStyle: {
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
                      offset: 0.5,
                      color: "rgba(255,255,255,1)" // 100% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(255,255,255,0)" // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            }
          },
          grid : {
            left : '0 ',
            right : '5',
            bottom : '15 ',
            top : 20,
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
              },
              data:  _this.foundingData.xData,
              axisLabel:{
                interval: 0,
                color:'#8f949f',
                fontSize:12,
                formatter: function (value) {
                  //x轴的文字改为竖版显示
                  var str = value.split("").slice(0,4);
                  return str.join("\n");
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              max:_this.foundingData.yData[0],

              axisTick: {show: false},
              axisLine: {show: true,

                lineStyle:{
                  color:'#2e394a'
                }
              },
              axisLabel:{
                color:'#8f949f',
              },
              splitLine: {//分割线配置
                show: true,
                lineStyle: {
                  color: "#2e394a",
                }
              }
            },
          ],
          dataZoom: [
            // {
            //   show: true,
            //   realtime: true,
            //   start: 0,
            //   end: 50
            // },
            {
              type: 'slider',
              realtime: true,
              start: 0,
              end: 18,
              height:5,
              bottom:'0',
              backgroundColor:'#3d4657',
              textStyle: {
                color: "rgba(0,0,0,0)",
              },
              borderColor: "rgba(0,0,0,0)",
            }
          ],
          series: [
            {
              name: '',
              type: 'line',
              data: _this.foundingData.yData,

              itemStyle: {
                borderType: 'dotted',
                normal: {
                  color: '#ffffff',
                  lineStyle: {
                    color: "#ffffff",
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
                        offset: 0, color: 'rgba(0,0,0,0)' // 0% 处的颜色
                      }, {
                        offset: 1, color: 'rgba(255,255,255,0.8)' // 100% 处的颜色
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
      },

      handleWorldMap() {
        let _this = this;
        _this.globalEchart = this.$echarts.init(this.$refs.mapChart)
        let data = this.GlobalDataData.data;
        let geoCoordMap = visitFun.correctLocation(this.GlobalDataData.geoCoordMap)
        // let maxNum = data[0].value
        let maxNum = this.selectedMax
        //console.log(maxNum)
        var convertData = function (data) {
          if (data != undefined) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
              let normalize = (((data[i].value)/maxNum)*10)
              var geoCoord = geoCoordMap[data[i].name];
              if (geoCoord) {
                res.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value).concat(normalize),
                });
              }
            }
            return res;
          }
        };

        let option = {
          backgroundColor: "rgba(14,25,41,0.6)",
          tooltip: {
            formatter: (params) => {
              return `${params.data.name}：${params.data.value[2]}`;
            },
          },
          geo: {
            map: "world_old",
            zoom: _this.change?1.1:1,
            label: {
              emphasis: {
                show: false,
              },
            },
            center: this.coordinate,
            layoutCenter: ["50%", "50%"], //地图位置
            layoutSize: this.layoutSize,
            roam: true,
            itemStyle: {
              normal: {
                areaColor: "rgba(52,62,78,0.8)",
                borderColor: "rgba(14,25,41,0.6)",
                // borderWidth:0.5
              },
              emphasis: {
                areaColor: "rgba(52,62,78,0.8)",
                // opacity: 0.5,
              },
            },

            regions: [{
              name: this.selectCountry,
              itemStyle: {
                areaColor: '#d27474',
                color: '#fff'
              }
            }]
          },
          series: [
            {
              type: "scatter",
              map: "world_old",
              coordinateSystem: "geo",
              // data: convertData(data),
              rippleEffect: {
                period: 4, //动画时间，值越小速度越快
                brushType: "stroke", //波纹绘制方式 stroke, fill
                scale: 3, //波纹圆环最大限制，值越大波纹越大
              },
              symbolSize: function (val) {
                return val[2] / 200;
              },
              label: {
                normal: {
                  formatter: "{b}",
                  position: "right",
                  show: false,
                },
                emphasis: {
                  show: true,
                },
              },
              itemStyle: {
                normal: {
                  color: "#ff3a25",
                  shadowBlur: 5,
                  shadowColor: "#333",
                  opacity: 0.8,
                },
              },
            },
            {
              type: "effectScatter",
              coordinateSystem: "geo",
              data: convertData(data),
              symbol: "circle",
              symbolSize: function (params) {
                if(_this.typeData[3].selected == true ){
                  if(_this.yearIndex == null ){
                    //console.log(params[3])
                    if(params[3]*4 < 2){
                      return 2
                    }else{
                      return params[3]*4 > 35? 35 : params[3]*4;
                    }
                  }else{
                    if(params[3]*20 < 2){
                      return 2
                    }else{
                      return params[3]*20 > 32? 32 : params[3]*20;
                    }
                  }
                }else{
                  if(_this.yearIndex == null ){
                    if(params[3]*8 < 2){
                      return 2
                    }else{
                      return params[3]*8 > 35? 35 : params[3]*8;
                    }
                  }else{
                    if(params[3]*20 < 2){
                      return 2
                    }else{
                      return params[3]*20 > 32? 32 : params[3]*20;
                    }
                  }
                }
              },
              showEffectOn: "render",
              rippleEffect: {
                period: 4, //动画时间，值越小速度越快
                brushType: "stroke", //波纹绘制方式 stroke, fill
                scale: 0, //波纹圆环最大限制，值越大波纹越大
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: "{b}",
                  position: "bottom",
                  show: false,
                },
              },
              itemStyle: {
                normal: {
                  color: "#ff3a25",
                  shadowBlur: 5,
                  shadowColor: "#333",
                  opacity: 0.8,
                },
              },
              zlevel: 1,
            },
          ],
        };
        _this.globalEchart.setOption(option, true);

      },

      changeYearData(val){
        if(val == 0){
          this.yearData =JSON.parse(JSON.stringify(allYearData))
        }else if(val == 1){
          this.yearData = JSON.parse(JSON.stringify(communicateYearData))
        }else if(val == 2){
          this.yearData = JSON.parse(JSON.stringify(talentYearData))
        }else if(val == 3){
          this.yearData = JSON.parse(JSON.stringify(projectYearData))
        }else if(val == 4){
          this.yearData = JSON.parse(JSON.stringify(paperYearData))
        }
      },
      changeType(val){
        this.changeYearData(val)
        this.yearIndex = null
        this.typeData.forEach((item,index)=>{
          item.selected = false
          if(val == index){
            item.selected = true
          }
        })
        clearInterval(this.timer);
        this.openTimer = 0
        let params = this.typeData[val].value
        this.$emit('changeType', params ,1)
      },

      changeYear(num,val){
        let _this = this
        if(num == 1){
          if(this.openTimer == 0){
            _this.setYaerSelected(0)
            _this.yearIndex = 0
            let params = _this.yearData[_this.yearIndex].year
            _this.$emit('changeYear', params)
            this.timer = setInterval(function () {
              if(_this.yearIndex != null){
                if(_this.yearIndex == (_this.yearData.length-1)){
                  _this.setYaerSelected(0)
                  _this.yearIndex = 0
                }else{
                  _this.setYaerSelected(_this.yearIndex+1)
                  _this.yearIndex = _this.yearIndex + 1
                }
              }else{
                _this.setYaerSelected(0)
                _this.yearIndex = 0
              }
              let params = _this.yearData[_this.yearIndex].year
              _this.$emit('changeYear', params)
            },3000)
            this.openTimer = 1
            _this.$emit('openTimer', 1)

          }else{
            this.openTimer = 0
            clearInterval(this.timer);
            _this.$emit('openTimer', 0)
          }

        }else if(num == 2){
          clearInterval(this.timer);
          if(this.yearIndex != null){
            if(this.yearIndex == 0){
              this.setYaerSelected(10)
              this.yearIndex = 10
            }else{
              this.setYaerSelected(this.yearIndex-1)
              this.yearIndex = this.yearIndex - 1
            }
          }else{
            this.setYaerSelected(0)
            this.yearIndex = 0
          }

          let params = this.yearData[this.yearIndex].year
          this.$emit('changeYear', params)
        }else if(num == 3){
          clearInterval(this.timer);
          this.setYaerSelected(val)
          this.yearIndex = val
          let params = this.yearData[val].year
          this.$emit('changeYear', params)
        }else if(num == 4){
          clearInterval(this.timer);
          if(this.yearIndex != null){
            if(this.yearIndex == 10){
              this.setYaerSelected(0)
              this.yearIndex = 0
            }else{
              this.setYaerSelected(this.yearIndex+1)
              this.yearIndex = this.yearIndex + 1
            }
          }else{
            this.setYaerSelected(0)
            this.yearIndex = 0
          }
          let params = this.yearData[this.yearIndex].year
          this.$emit('changeYear', params)
        }
      },
      setYaerSelected(val){
        this.yearData.forEach((item,index)=>{
          item.selected = false
          if(val == index){
            item.selected = true
          }
        })
      },

    },
    beforeDestory(){
      this.$echarts.dispose(this.myChart);
      this.myChart = null;
      clearInterval(this.timer);
    }
  };
</script>

<style lang="less" scoped>
  @import "../../../assets/css/titlecss.less";
  @import "./modules.less";

</style>
