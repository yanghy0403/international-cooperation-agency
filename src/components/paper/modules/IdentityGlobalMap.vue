<template>
  <div class="globalMap">
    <div class="indexTitleDiv">
      <div class="titleName">
        <span @click.stop="selectedCur=0" :class="{selectAcitve:selectedCur==0}">合作论文全球分布</span>
        <img src="../../../assets/images/国际人才/wangfandijia.png" alt />
        <span @click.stop="selectedCur=1" :class="{selectAcitve:selectedCur==1}">院所分布</span>
      </div>
      <div class="operating">
        <div @click.stop="iconClick(1)" class="downloadNew iconDiv"></div>
        <div @click.stop="iconClick(2)" class="fullScreen iconDiv"></div>
      </div>
    </div>
    <div class="mapDiv" ref="downloadImgDIv">
      <div class="divBox"  v-show="selectedCur==0">
        <div class="worldMapBox">
          <div class="worldMap1" ref="worldMap1" ></div>
          <div class="worldtooltipBarIdBox" v-show="isTooltipShow">
            <div  ref="worldtooltipBarId" id="worldtooltipBarId" style="width:345px;height: 194px;background:#48546d; opacity: 0.85;border-radius: 12px;"></div>
            <div @click="cloneTooltip" class="iconDiv" style=""><i class="el-icon-close"></i></div>
          </div>

        </div>
        <div class="personDiv">
          <div class="personTitle">论文国家分布</div>
          <div class="titleName">
            <span>国家</span>
            <span>论文数</span>
          </div>
          <div ref="personCountry" class="personCountry scrollbar personCountryFold">
            <ul>
              <li style="cursor: pointer" @click="handleCountryLinkage(item)" v-for="(item,i) in countryData" :key="i" >
                <div :style="{color:item.highlight?'red':'black'}" class="nameVal">{{item.name}}</div>
                <div :style="{color:item.highlight?'red':'black'}" class="vals">{{item.value}}</div>
                <div class="schedule" ref="schedule">
                  <div  class="long" :style="{width:item.count , background:item.highlight?'red':'#a4aec2'}"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="divBox" v-show="selectedCur==1">
        <div class="chainaMap" ref="chainaMap" ></div>
        <div class="personDiv">
          <div class="titleName">
            <span style="width: 185px;margin-left: 15px;">院所</span>
            <span>论文数</span>
          </div>
          <div class="InstituteChart scrollbar">
            <ul>
              <li v-for="(item,i) in IDcountryData" :key="i">
                <div style="width: 185px;padding-left: 15px;" class="nameVal" :title="item.name">{{item.name}}</div>
                <div class="vals">{{item.value}}</div>
                <div class="schedule" ref="schedule">
                  <div class="long" :style="item.count"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <transition name="bounce" mode="out-in">
      <div class="fullFcreen" v-if="!change">
        <div class="indexTitleDiv">
          <div class="titleName">
            <span @click.stop="selectedCur=0" :class="{selectAcitve:selectedCur==0}">合作论文全球分布</span>
            <img src="../../../assets/images/国际人才/wangfandijia.png" alt />
            <span @click.stop="selectedCur=1" :class="{selectAcitve:selectedCur==1}">院所分布</span>
          </div>
          <div class="operating">
            <div @click.stop="iconClick(1)" class="downloadNew iconDiv"></div>
            <div @click.stop="iconClick(2)" class="fullScreen iconDiv"></div>
          </div>
        </div>
        <div class="mapDiv" style="background: #a4aec2;" ref="downloadImgDIv">
          <div class="divBox" v-show="selectedCur==0">
            <div class="worldMap1" style="background: #a4aec2;" ref="worldMap1" ></div>
            <div class="personDiv" style="background: #fff;flex: 1;" >
              <div class="personTitle">论文国家分布</div>
              <div class="titleName">
                <span style="margin-left: 15px">国家</span>
                <span>论文数</span>
              </div>
              <div ref="personCountry" style="background: #fff;"  class="personCountry scrollbar personCountryUnfold">
                <ul>
                  <li  @click="handleCountryLinkage(item)" v-for="(item,i) in countryData" :key="i">
                    <div style="" :style="{color:item.highlight?'red':'black'}" class="nameVal">{{item.name}}</div>
                    <div :style="{color:item.highlight?'red':'black'}" class="vals">{{item.value}}</div>
                    <div class="schedule" ref="schedule">
                      <div class="long" :style="{width:item.count , background:item.highlight?'red':'#a4aec2'}"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="divBox" v-show="selectedCur==1">
            <div class="chainaMap" style="" ref="chainaMap" ></div>
            <div class="personDiv" style="background: #fff;flex: 1;" >
              <div class="titleName">
                <span style="width: 185px;margin-left: 15px;">院所</span>
                <span>论文数</span>
              </div>
              <div class="InstituteChart scrollbar" >
                <ul>
                  <li v-for="(item,i) in IDcountryData" :key="i">
                    <div style="width: 185px;padding-left: 15px;" class="nameVal" :title="item.name">{{item.name}}</div>
                    <div class="vals">{{item.value}}</div>
                    <div class="schedule" ref="schedule">
                      <div class="long" :style="item.count"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import word from "../../../assets/js/world";
  import "../../../../node_modules/echarts/map/js/china";
  import visitFun from '@/assets/js/visit.js'

  export default {
    data() {
      return {
        change: true,
        clientHeight: "",
        selectedCur: 0,
        GlobalDataData: [],
        countryData: [],
        countryName: "",
        IDcountryData: [],
        tabNum: "",
        isfold:true,
        coordinate:[187.858697, 20.031559],
        layoutSize: "180%",
        selectCountry:'',
        isTooltipShow:false,
        tooltipName:'',
        newInstituteData:{},
        globalEchart:null,
        countryEchart:null,
      };
    },
    props: ["InstituteData","data", "mode","visitType"],
    watch: {
      data(val) {
        this.GlobalDataData = val;
        this.$nextTick(() => {
          this.handleWorldMap();
          this.handlePersonCountry();
          // this.handleCHWWorldMap();
          // this.handleInstituteChart();
        });
      },
      InstituteData: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          this.newInstituteData = val.data;
          let arrs = []
          if (this.newInstituteData.org) {
            this.newInstituteData.org.forEach((item) => {
              arrs.push(item.value);
            });
            let max = Math.max(...arrs);
            let total = 150 / max;
            let countrys = this.newInstituteData.org.map((item) => {
              return {
                name: item.name,
                value: item.value,
                source: item.source,
                count: "width:" + (item.value/max)*100 + "%",
              };
            });
            this.IDcountryData = countrys;
          }else{
            this.IDcountryData = []
          }
          this.$nextTick(() => {
            this.handleCHWWorldMap();
          });
        }


      },
      mode(e) {
        this.tabNum = e;
      },
    },
    mounted() {
      this.GlobalDataData = this.data;
      this.clientHeight = `${document.documentElement.clientHeight}`; //获取浏览器可视区域高度
      let that = this;
      window.onresize = function () {
        that.clientHeight = `${document.documentElement.clientHeight}`;
      };
      this.$nextTick(() => {
        this.handleWorldMap();
        this.handlePersonCountry();
        // this.handleCHWWorldMap();
        // this.handleInstituteChart();
      });

    },
    methods: {
      iconClick(val) {
        this.layoutSize = "180%"
        this.coordinate = [187.858697, 20.031559]
        if (val == 1) {
          // alert('我关闭了')
          this.download();
          this.isfold = true
        } else if (val == 2) {
          // alert('我打开了')
          this.handleChange();
          this.isfold = false
        }
      },

      // 下载图片
      download() {
        let self = this;
        let refs = self.$refs.downloadImgDIv
        let imgName = this.selectedCur==0?`合作论文全球分布`:'院所分布'
        setTimeout(function () {
          visitFun.downloadImg(refs,imgName)
        },500)
      },
      handleChange() {
        this.change = !this.change;
        let time = setTimeout(() => {
          if (!this.change) {
            this.$refs.worldMap1.style.height = this.clientHeight - 250 + "px";
          } else {
            this.$refs.worldMap1.style.height = 300 + "px";
          }
          this.handleWorldMap();
          this.handleCHWWorldMap();
          clearTimeout(time);
        }, 100);
      },
      // 加载地图
      handleWorldMap() {
        let _this = this;

        _this.globalEchart = this.$echarts.init(this.$refs.worldMap1)

        _this.globalEchart.showLoading();
        var data = this.GlobalDataData.data;
        var geoCoordMap = this.GlobalDataData.geoCoordMap;
        var convertData = function (data) {
          if (data != undefined) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
              var geoCoord = geoCoordMap[data[i].name];
              if (geoCoord) {
                res.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value).concat(data[i].normalize),
                });
              }
            }
            return res;
          }
        };

        let option = {
          backgroundColor: "#a4aec2",
          tooltip: {
            formatter: (params) => {
              return `${params.data.name}：${params.data.value[2]}`;
            },
          },
          geo: {
            map: "world_old",
            zoom: _this.change?1.1:0.6,
            label: {
              emphasis: {
                show: true,
              },
            },
            center: this.coordinate,
            layoutCenter: ["50%", "50%"], //地图位置
            layoutSize: this.layoutSize,
            roam: true,
            itemStyle: {
              normal: {
                areaColor: "#bcc3d1",
                borderColor: "#75808f",
              },
              emphasis: {
                areaColor: "#ff3a25",
                opacity: 0.5,
              },
            },

            regions: [{
              name: this.selectCountry,
              itemStyle: {
                areaColor: '#d27474',
                color: '#ff3a25'
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
                return params[3]*4 > 25? 26 : params[3]*4;
                // return Math.ceil(Math.log(val[2]));
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
        _this.globalEchart.hideLoading();

      },

      cloneTooltip(){
        this.isTooltipShow = false
      },

      // 右侧列表交互
      handleCountryLinkage(val) {
        this.countryData.forEach((item,index)=>{item.highlight = false})
        this.countryData.forEach((item,index)=>{
          if(item.name == val.name){
            item.highlight = true
          }
        })

        let longAndLat = []
        for(let item in this.GlobalDataData.geoCoordMap){
          if(item == val.name){
            longAndLat = this.GlobalDataData.geoCoordMap[item]
          }
        }
        if (this.coordinate.length >= 2) {
          this.coordinate.splice(0, 2);
          this.coordinate = [...longAndLat];
        } else {
          this.coordinate = [...longAndLat];
        }
        this.layoutSize = "800%";
        this.selectCountry = val.name
        // this.convertData.forEach((item) => {
        //   if (item.name == val.name) {
        //     item.selected = true;
        //   }
        // });
//        this.tooltipName = `${val.name}:共${val.value}人次`
//        this.countryName = val.name
//        this.isTooltipShow = true
//        this.pieChart('worldtooltipBarId')

        this.handleWorldMap();
      },


      // 悬停显示饼图
      handleTooltipPie() {
        let val = 'tooltipBarId'
        this.pieChart(val)
      },
      pieChart(val){
        let that = this
        this.axios
          .get("/communication/global/detail", {
            params: {
              city: this.GlobalDataData.city,
              continent: this.GlobalDataData.continent,
              country: this.countryName,
              personType: this.GlobalDataData.personType,
              source: this.GlobalDataData.source,
              subject: this.GlobalDataData.subject,
              type: this.GlobalDataData.type,
              year: this.GlobalDataData.year,
            },
          })
          .then((res) => {
            if (res.data.code == 200) {
              var datas = res.data.data;
              var myChart1 = this.$echarts.init(
                document.getElementById(val)
                // document.getElementById("tooltipBarId")
              );
              let option = {
                title:{
                  text: that.tooltipName,
                  textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                    fontSize: 12,
                    "color": "#fff"
                  },
                },
                tooltip: {},
                legend: {
                  orient: "vertical",
                  left: "left",
                  icon: "circle",
                  top: "20",
                  textStyle: {
                    color: "#f1f3f6",
                  },
                  itemWidth: 7,
                  itemHeight: 7,
                  borderColor: "#fff",
                  // data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
                },
                series: [
                  {
                    name: "访问形式",
                    type: "pie",
                    radius: "80%",
                    center: ["70%", "50%"],
                    color: [
                      // "#d76459",
                      // "#98c5a7",
                      // "#89c3db",
                      // "#db89ab",
                      // "#dbce89",
                      // "#536689",
                      // "#6ccdaa",
                      // "#c9e0fd",
                      // "#899ab3",
                      // "#496081",
                      // "#c5aa9a",

                      "#899ab3",
                      "#9eaec7",
                      "#627796",
                      "#89a4b3",
                      "#9dcecf",
                      "#9fb898",
                      "#a698b8",
                      "#dbcfb4",
                      "#dbbab4",
                      "#d79494",
                      "#8b9eb9",
                      "#b6dbe7",
                      "#7a779c",
                      "#89c3db",
                      "#db89ab",
                      "#dbce89",
                      "#536689",
                      "#6ccdaa",
                      "#c9e0fd",
                      "#b5937b",
                      "#89b3b3",
                    ],
                    label: {
                      position: "inside",
                      formatter: function (params) {
                        return params.data.value;
                      },
                      color: "#000000",
                      fontSize:12,


                      textBorderColor: '#ffffff'
                    },
                    data: datas,
                  },
                ],
              };
              myChart1.setOption(option);
            }
          });
      },


      // 国籍分布右侧
      handlePersonCountry() {
        var data = this.GlobalDataData.data;
        var arr = [];
        if (data != undefined) {
          data.forEach((item) => {
            arr.push(item.value);
          });
          var max = Math.max(...arr);

          var total = 140 / max;
          var countrys = data.map((item) => {
            return {
              name: item.name,
              value: item.value,
              count: (item.value/max)*100 + "%",
              highlight:false,
            };
          });
          this.countryData = countrys;
        }
      },


      handleCHWWorldMap() {
        let _this = this
        _this.countryEchart = this.$echarts.init(this.$refs.chainaMap);
        _this.countryEchart .showLoading();
        var data = this.newInstituteData.cityCount

        var geoCoordMap = this.newInstituteData.cityLongAndLat[0]
        // var geoCoordMap = {
        //   齐齐哈尔: [123.97, 47.33],
        //   重庆市: [108.384366, 30.439702],
        //   北京市: [116.4551, 40.2539],
        //   安徽: [117.17, 31.52, 14],
        //   河北: [114.3, 38.02, 8],
        //   山东: [117.0, 36.4, 8],
        //   陕西: [108.57, 34.17],
        //   山西: [112.33, 37.54],
        // };

        var convertData = function (data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            let maxSize = data[0].value
            let size = (data[i].value/maxSize)*9+1
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value).concat(size),

              });
            }
          }
          return res;
        };

        let option = {
          backgroundColor: "#a4aec2",
          tooltip: {
            formatter: (params) => {
              return `${params.name}：${params.data.value[2]}`;
            },
          },
          geo: {
            map: "china",
            zoom: _this.change?0.7:0.5,
            layoutCenter: ["55%", "45%"], //地图位置
            layoutSize: "230%",
            label: {
              normal: {
                show: true,
                color: "#030303",
              },
              emphasis: {
                show: false,
                color: "#292929",
              },
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: "#bcc3d1",
                borderColor: "#75808f",
              },
              emphasis: {
                areaColor: "#ff3a25",
                opacity: 0.5,
              },
            },
          },
          series: [
            {
              name: "论文数",
              type: "effectScatter",
              coordinateSystem: "geo",
              data: convertData(data),
              symbolSize: function (params) {
                return params[3]*8 > 30? 31 : params[3]*8;
              },
              showEffectOn: "render",
              rippleEffect: {
                scale: 0,
                brushType: "stroke",
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
                  show: true,
                  color: "#ff3a25",
                  shadowBlur: 5,
                  shadowColor: "#000",
                  opacity: 0.8,
                },
              },
            },
            {
              type: "map",
              mapType: "china",
              geoIndex: 0,
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    color: "#030303",
                  },
                },
                emphasis: {
                  label: {
                    show: true,
                  },
                },
              },

              data: data,
            },
          ],
        };

        _this.countryEchart .setOption(option, true);
        window.onresize = () => {
          _this.countryEchart .resize();
        };
        _this.countryEchart .hideLoading();
      },
      handleInstituteChart() {
        this.axios
          .get("/international/topic/personIdentityCity", {
            params: {
              city: this.GlobalDataData.city,
              continent: this.GlobalDataData.continent,
              country: this.countryName,
              personType: this.GlobalDataData.personType,
              source: this.GlobalDataData.source,
              subject: this.GlobalDataData.subject,
              type: this.GlobalDataData.type,
              year: this.GlobalDataData.year,
            },
          })
          .then((res) => {
            if (res.data.code == 200) {
              var datas = res.data.data;
              var arrs = [];
              if (datas != undefined) {
                datas.forEach((item) => {
                  arrs.push(item.count);
                });
                var max = Math.max(...arrs);
                var total = 150 / max;
                var countrys = datas.map((item) => {
                  return {
                    name: item.instName,
                    value: item.count,
                    count: "width:" + Math.ceil(total * item.count) + "px",
                  };
                });
                this.IDcountryData = countrys;
              }
            }
          });
      },
      beforeDestory(){
        this.$echarts.dispose(this.globalEchart);
        this.$echarts.dispose(this.countryEchart);
        this.globalEchart = null;
        this.countryEchart = null;
      }
    },
  };
</script>

<style lang="less" scoped>
  @import "../../../assets/css/titlecss.less";
  .globalMap {
    width: 100%;
    height: 100%;
    padding: 10px 20px;
    .selectAcitve {
      color: #ff3a25;
    }
    .titleName {
      cursor: pointer;
    }
    .mapDiv {
      position: relative;
      .divBox {
        height: 100%;
        display: flex;
        .worldMap1,
        .chainaMap {
          /*float: left;*/
          width: 955px;
          height: 365px;

        }
        .worldMapBox{
          /*width: 955px;*/
          flex: 1;
          height: 365px;
          /*float: left;*/
          position: relative;
          .worldtooltipBarIdBox{
            position: absolute;
            top: 20px;
            left: 20px;
            z-index: 100;
            .iconDiv{
              position: absolute;
              width: 15px;
              height:15px;
              top: 3px;
              cursor: pointer;
              right: 3px;
              color: #fff;
              i{
                color: #fff;
              }
            }
            #worldtooltipBarId{

            }

          }

          .worldMap1{
            float: left;
            width: 955px;
            height: 365px;
          }

        }

      }

      .personDiv {
        width: 435px;
        height: 365px;
        overflow: hidden;
        border: solid 1px #d3d6dd;
        .personTitle {
          width: 100%;
          height: 40px;
          background: #e2e6ed;
          text-align: center;
          line-height: 40px;
          color: #191919;
          font-size: 14px;
          border-bottom: solid 1px #d3d6dd;
        }
        .titleName {
          width: 100%;
          height: 30px;
          background: #e8ebef;
          /*margin-bottom: 10px;*/
          span {
            display: inline-block;
            line-height: 30px;
            font-size: 14px;
            color: #6f6f6f;
            font-weight: 600;
          }
          span:first-child {
            width: 137px;
            margin-left: 15px;
          }
        }
        .personCountry,
        .InstituteChart {
          width: 100%;
          height: 280px;
          overflow-y: scroll;
          ul {
            margin-top: 10px;
            li {
              display: flex;
              height: 30px;
              line-height: 30px;
              font-size: 14px;
              color: #6f6f6f;
              .nameVal {
                width: 150px;
                padding-left: 15px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
              .vals {
                width: 50px;
                text-align: right;
                margin-right: 10px;
              }
              .schedule {
                flex: 1;
                height: 20px;
                margin: auto;
                margin-right: 10px;
                .long {
                  width: 100%;
                  height: 100%;
                  background: #a4aec2;
                }
              }
            }
          }
        }
        .scrollbar::-webkit-scrollbar {
          width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
          height: 1px;
        }
        .scrollbar::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          background: #ff3a25;
        }
        .scrollbar::-webkit-scrollbar-track {
          /*滚动条里面轨道*/
          background: #d3d6dd;
        }
        .InstituteChart {
          width: 100%;
          height: 340px;
        }
      }
      .maskDiv {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(255, 255, 255, 0);
      }
    }
    .fullFcreen {
      position: absolute;
      // display: flex;
      top: 40px;
      left: 20px;
      width: 1450px;
      height: 91.5%;
      padding:20px;
      background: #fff;
      z-index: 10;
      .selectAcitve {
        color: #ff3a25;
      }
      .titleName {
        cursor: pointer;
      }
      .mapDiv {
        position: relative;
        height: 800px;
        .divBox {
          height: 100%;
          .worldMap1,
          .chainaMap {
            float: left;
            width: 920px;
            height: 800px;
          }
        }

        .personDiv {
          width: 435px;
          height: 800px;
          overflow: hidden;
          border: solid 1px #d3d6dd;
          .personTitle {
            width: 100%;
            height: 40px;
            background: #e2e6ed;
            text-align: center;
            line-height: 40px;
            color: #191919;
            font-size: 14px;
            border-bottom: solid 1px #d3d6dd;
          }
          .titleName {
            width: 100%;
            height: 30px;
            background: #e8ebef;
            span {
              display: inline-block;
              line-height: 30px;
              font-size: 12px;
              color: #6f6f6f;
            }
            span:first-child {
              width: 25%;
              margin-left: 20px;
            }
          }
          .personCountry,
          .InstituteChart {
            width: 100%;
            height: 760px;
            overflow-y: scroll;
            ul {
              li {
                display: flex;
                height: 30px;
                line-height: 30px;
                font-size: 14px;
                color: #6f6f6f;
                .nameVal {
                  width: 120px;
                  padding-left: 15px;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                }
                .vals {
                  width: 50px;
                }
                .schedule {
                  flex: 1;
                  margin-right: 10px;
                  height: 20px;
                  /*margin: auto;*/
                  .long {
                    width: 100%;
                    height: 100%;
                    background: #a4aec2;
                  }
                }
              }
            }
          }
          .scrollbar::-webkit-scrollbar {
            width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
            height: 1px;
          }
          .scrollbar::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            background: #ff3a25;
          }
          .scrollbar::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            background: #d3d6dd;
          }
          .InstituteChart {
            width: 100%;
            /*height: 340px;*/
          }
        }
        .maskDiv {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: rgba(255, 255, 255, 0);
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
    }
  }
</style>
