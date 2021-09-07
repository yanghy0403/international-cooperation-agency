<template>
  <div class="globalMap">
    <div class="indexTitleDiv">
      <div class="titleName">院所分布</div>
      <div class="operating">
        <div @click.stop="iconClick(1)" class="downloadNew iconDiv"></div>
        <div @click.stop="iconClick(2)" class="fullScreen iconDiv"></div>
      </div>
    </div>
    <div class="mapDiv">
      <div class="divBox" >
        <div class="chainaMap" ref="chainaMap" id="mapDiv2"></div>
        <div class="personDiv">
          <div class="titleName">
            <span>院所</span>
            <span>项目/数量</span>
          </div>
          <div class="InstituteChart scrollbar">
            <ul>
              <li v-for="(item,i) in IDcountryData" :key="i">
                <div class="nameVal">{{item.name}}</div>
                <div class="vals">{{item.value}}</div>
                <div class="schedule" ref="schedule">
                  <div class="long" :style="item.count"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="tabNum==1" class="maskDiv"></div>
    </div>
    <transition name="bounce" mode="out-in">
      <div class="fullFcreen" v-if="!change">
        <div class="indexTitleDiv">
          <div class="titleName">院所分布</div>
          <div class="operating">
            <div @click.stop="iconClick(1)" class="downloadNew iconDiv"></div>
            <div @click.stop="iconClick(2)" class="fullScreen iconDiv"></div>
          </div>
        </div>
        <div class="mapDiv">

          <div class="divBox">
            <div class="chainaMap" ref="chainaMap" id="mapDiv2"></div>
            <div class="personDiv">
              <div class="titleName">
                <span>院所</span>
                <span>项目/数量</span>
              </div>
              <div class="InstituteChart scrollbar">
                <ul>
                  <li v-for="(item,i) in IDcountryData" :key="i">
                    <div class="nameVal">{{item.name}}</div>
                    <div class="vals">{{item.value}}</div>
                    <div class="schedule" ref="schedule">
                      <div class="long" :style="item.count"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-if="tabNum==1" class="maskDiv"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import word from "../../../assets/js/world";
  import "../../../../node_modules/echarts/map/js/china";
  export default {
    data() {
      return {
        change: true,
        clientHeight: "",
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
        cityName:"",
      };
    },
    props: ["data", "mode"],
    watch: {

      data: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          this.newInstituteData = val.data;
          let arrs = []
          if (this.newInstituteData != undefined) {
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
                count: "width:" + Math.ceil(total * item.value) + "px",
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
            this.handleCHWWorldMap();
      });

    },
    methods: {
      iconClick(val) {
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
      handleChange() {
        this.change = !this.change;
        let time = setTimeout(() => {
          if (!this.change) {
            this.$refs.chainaMap.style.height = this.clientHeight - 250 + "px";
          } else {
            this.$refs.chainaMap.style.height = 300 + "px";
          }
          this.handleCHWWorldMap();
          clearTimeout(time);
        }, 100);
      },

      handleCHWWorldMap() {
        var myChart = this.$echarts.init(this.$refs.chainaMap);
        myChart.showLoading();
        let _this = this
        if(this.newInstituteData != undefined) {
          var data = this.newInstituteData.cityCount

        var geoCoordMap = this.newInstituteData.cityLongAndLat[0]
        var convertData = function (data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];

            let max = data[0].value
            let size=  (data[i].value/max)*9+1
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
            backgroundColor: "rgba(255,255,255,0)",
            formatter: (params) => {
              if(params.seriesType== "effectScatter") {
                _this.cityName = params.data.name;
              // this.tooltipCityName = `${params.data.name}:共计${params.data.value[2]}`;
              var tipHtmlCity =
                '<div id="tooltipBarCityId" style="width:200px;height: 120px;background:#48546d; opacity: 0.85;border-radius: 12px;"></div>';
              // '<div id="tooltipBarId" style="width:345px;height: 194px;background:#48546d; opacity: 0.85;border-radius: 12px;"></div>';
              setTimeout(function () {
                _this.handleFloatInstitutes();
              }, 100);
              return tipHtmlCity;
              }
              
            },
          },
          geo: {
            map: "china",
            zoom: 1.5,
            layoutCenter: ["50%", "55%"], //地图位置
            layoutSize: "90%",
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
              name: "供需占比",
              type: "effectScatter",
              coordinateSystem: "geo",
              data: convertData(data),
              symbolSize: function (params) {
                return params[3]*6 > 30? 31 : params[3]*6;
              },
              showEffectOn: "render",
              rippleEffect: {
                scale: 5,
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

        myChart.setOption(option, true);
        window.onresize = () => {
          myChart.resize();
        };
        myChart.hideLoading();
        }
        


        
      },

      //  院所地图悬浮
      handleFloatInstitutes() {
      this.axios.get("/cooperativeProject/foreign/floatInstitutes",{params:{
        limit: this.newInstituteData.params.limit,
        offset: this.newInstituteData.params.offset,
        year: this.newInstituteData.params.yearSelect,
        instName: this.newInstituteData.params.orgSelect,
        projectClass: this.newInstituteData.params.projectClassSelect,
        isExecute: this.newInstituteData.params.isExecuteSelect,
        city: this.cityName
      }}).then(res => {
        if(res.data.code== 200) {
          var datas = res.data.data.foreignFloatInstNameMap;
          var myChartCity = this.$echarts.init(document.getElementById('tooltipBarCityId'));
            let option = {
              title: {
                text: this.tooltipCityName,
                textStyle: {
                  //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                  fontSize: 12,
                  color: "#fff",
                },
              },
              tooltip: {},
              legend: {
                // type: "scroll",
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
                textStyle: {
                  fontFamily: "PingFang SC Regular",
                  color: "rgba(255,255,255,1)",
                  fontSize: 12,
                },
                pageIconColor: "rgba(255,255,255,1)",
                pageTextStyle: {
                  color: "rgba(255,255,255,1)",
                },
                // data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
              },
              series: [
                {
                  name: "",
                  type: "pie",
                  radius: "60%",
                  center: ["70%", "50%"],
                  color: [
                    "#9eaec7",
                    "#89a4b3",
                    "#9dcecf",
                    "#a698b8",
                    "#dbcfb4",
                    "#d79494",
                    "#db89ab",
                    "#dbce89",
                  ],
                  label: {
                    position: "inside",
                    formatter: function (params) {
                      return params.data.value;
                    },
                    color: "#000000",
                    fontSize: 12,

                    textBorderColor: "#ffffff",
                  },
                  data: datas.instName,
                },
              ],
            };
            myChartCity.setOption(option);
        }
      })
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
        .worldMap1,
        .chainaMap {
          float: left;
          width: 955px;
          height: 365px;

        }
        .worldMapBox{
          width: 955px;
          height: 365px;
          float: left;
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
            width: 190px;
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
                width: 200px;
                padding-left: 15px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
              .vals {
                width: 50px;
                text-align: center;
              }
              .schedule {
                width: 200px;
                height: 20px;
                margin: auto;
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
      width: 1430px;
      height: 880px;
      padding: 2%;
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
          height: 720px;
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
              width: 40%;
              margin-left: 20px;
            }
          }
          .personCountry,
          .InstituteChart {
            width: 100%;
            height: 100%;
            overflow-y: scroll;
            ul {
              li {
                display: flex;
                height: 30px;
                line-height: 30px;
                font-size: 14px;
                color: #6f6f6f;
                .nameVal {
                  width: 200px;
                  padding-left: 15px;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                }
                .vals {
                  width: 50px;
                  text-align: center;
                }
                .schedule {
                  width: 200px;
                  height: 20px;
                  margin: auto;
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
            height: 100%;
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
