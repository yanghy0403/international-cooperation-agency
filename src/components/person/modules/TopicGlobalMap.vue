<template>
  <div class="globalMap">
    <div class="indexTitleDiv">
      <div class="titleName">全球地域分布</div>
      <div class="operating">
        <div @click.stop="iconClick(1)" class="download iconDiv"></div>
        <div @click.stop="iconClick(2)" class="fullScreen iconDiv"></div>
      </div>
    </div>
    <div class="mapDiv">
      <div class="divBox">
        <div class="worldMapBox">
          <div class="worldMap1" ref="worldMap1"></div>
          <div class="worldtooltipBarIdBox" v-show="isTooltipShow">
            <div
              ref="worldtooltipBarId"
              id="worldtooltipBarId"
              style="
                width: 345px;
                height: 194px;
                background: #48546d;
                opacity: 0.85;
                border-radius: 12px;
              "
            ></div>
            <div @click="cloneTooltip" class="iconDiv" style="">
              <i class="el-icon-close"></i>
            </div>
          </div>
        </div>
        <div class="personDiv">
          <div class="personTitle">人员国家分布</div>
          <div class="titleName">
            <span>国家</span>
            <span>数量/人</span>
          </div>
          <div
            ref="personCountry"
            class="personCountry scrollbar personCountryFold"
          >
            <ul>
              <li
                style="cursor: pointer"
                v-for="(item, i) in countryData"
                :key="i"
                @click.stop="handleCountryLinkage(item)"
              >
                <div
                  :style="{ color: item.highlight ? 'red' : 'black' }"
                  class="nameVal"
                >
                  {{ item.name }}
                </div>
                <div
                  :style="{ color: item.highlight ? 'red' : 'black' }"
                  class="vals"
                >
                  {{ item.value }}
                </div>
                <div class="schedule" ref="schedule">
                  <div
                    class="long"
                    :style="{
                      width: item.count,
                      background: item.highlight ? 'red' : '#a4aec2',
                    }"
                  ></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="tabNum == 1" class="maskDiv"></div>
    </div>
    <transition name="bounce" mode="out-in">
      <div class="fullFcreen" v-if="!change">
        <div class="indexTitleDiv">
          <div class="titleName">
            <span
              @click.stop="selectedCur = 0"
              :class="{ selectAcitve: selectedCur == 0 }"
              >全球地域分布</span
            >
            <!-- <img src="../../../assets/images/国际人才/wangfandijia.png" alt />
            <span
              @click.stop="selectedCur = 1"
              :class="{ selectAcitve: selectedCur == 1 }"
              >院所分布</span
            > -->
          </div>
          <div class="operating">
            <div @click.stop="iconClick(1)" class="download iconDiv"></div>
            <div @click.stop="iconClick(2)" class="fullScreen iconDiv"></div>
          </div>
        </div>
        <div class="mapDiv">
          <div class="divBox" v-show="selectedCur == 0">
            <div class="worldMap1" ref="worldMap1"></div>
            <div class="personDiv">
              <div class="personTitle">人员国家分布</div>
              <div class="titleName">
                <span>国家</span>
                <span>数量/人</span>
              </div>
              <div
                ref="personCountry"
                class="personCountry scrollbar personCountryUnfold"
              >
                <ul>
                  <li v-for="(item, i) in countryData" :key="i">
                    <div
                      :style="{ color: item.highlight ? 'red' : 'black' }"
                      class="nameVal"
                    >
                      {{ item.name }}
                    </div>
                    <div
                      :style="{ color: item.highlight ? 'red' : 'black' }"
                      class="vals"
                    >
                      {{ item.value }}
                    </div>
                    <div class="schedule" ref="schedule">
                      <div
                        class="long"
                        :style="{
                          width: item.count,
                          background: item.highlight ? 'red' : '#a4aec2',
                        }"
                      ></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="divBox" v-show="selectedCur == 1">
            <div class="chainaMap" ref="chainaMap" id="mapDiv2"></div>
            <div class="personDiv">
              <div class="titleName">
                <span>院所</span>
                <span>外籍/人</span>
              </div>
              <div class="InstituteChart scrollbar">
                <ul>
                  <li v-for="(item, i) in IDcountryData" :key="i">
                    <div class="nameVal">{{ item.name }}</div>
                    <div class="vals">{{ item.value }}</div>
                    <div class="schedule" ref="schedule">
                      <div class="long" :style="item.count"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-if="tabNum == 1" class="maskDiv"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import "../../../assets/js/world_old";
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
      isfold: true,
      coordinate: [187.858697, 20.031559],
      layoutSize: "180%",
      selectCountry: "",
      isTooltipShow: false,
      tooltipName: "",
      newInstituteData: {},
    };
  },
  props: ["InstituteData", "data", "mode"],
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
      if (val == 1) {
        // alert('我关闭了')
        this.download();
        this.isfold = true;
      } else if (val == 2) {
        // alert('我打开了')
        this.handleChange();
        this.handleWorldMap();
        this.handleTooltipPie();
        this.isfold = false;
      }
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
        clearTimeout(time);
      }, 100);
    },
    // 加载地图
    handleWorldMap() {
      var myChart = this.$echarts.init(this.$refs.worldMap1),
        _this = this;
      myChart.showLoading();
      if(this.GlobalDataData.data != undefined) {
      var data = this.GlobalDataData.data.data;

      }
      if(this.GlobalDataData != undefined) {
      var geoCoordMap = this.GlobalDataData.geoCoordMap;

      }
      var convertData = function (data) {
        if (data != undefined) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            let maxSize = data[0].value;
            let size = (data[i].value/maxSize)*9+1;
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value).concat(size),
              });
            }
          }
          return res;
        }
      };
      let zoom = 1.1;
      if(!this.change) {
        zoom = 0.7;
      }else {
        zoom = 1;
      }

      let option = {
        backgroundColor: "#a4aec2",
        tooltip: {
          backgroundColor: "rgba(255,255,255,0)",
          formatter: (params) => {
            this.countryName = params.data.name;
            this.tooltipName = params.data.name;
            var tipHtml =
              '<div id="tooltipBarId" style="width:230px;height: 150px;background:#48546d; opacity: 0.85;border-radius: 12px;"></div>';
            // '<div id="tooltipBarId" style="width:345px;height: 194px;background:#48546d; opacity: 0.85;border-radius: 12px;"></div>';
            setTimeout(function () {
              _this.handleTooltipPie();
            }, 100);
            return tipHtml;
          },
        },
        geo: {
          map: "world_old",
          zoom: zoom,
          label: {
            emphasis: {
              show: true,
            },
          },
          center: this.coordinate,
          layoutCenter: ["55%", "48%"], //地图位置
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

          regions: [
            {
              name: this.selectCountry,
              itemStyle: {
                areaColor: "#d27474",
                color: "#ff3a25",
              },
            },
          ],
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
              return Math.ceil(Math.log(val[2]));
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
              return params[3]*4>35?20: params[3]*2
            },
            showEffectOn: "render",
            rippleEffect: {
              period: 4, //动画时间，值越小速度越快
              brushType: "stroke", //波纹绘制方式 stroke, fill
              scale: 3, //波纹圆环最大限制，值越大波纹越大
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
      myChart.setOption(option, true);
      myChart.hideLoading();
      myChart.on("mouseover", function (params) {
        // if()
        if (params.componentType == "series") {
          _this.isTooltipShow = false;
        }
      });
      myChart.off("click");
      myChart.on("click", function (params) {
        let name = params.data.name;
        _this.getCountryScrollTop(name);
      });
    },

    // 点击地图上的点的事件
    getCountryScrollTop(val) {
      let indexOfVal = 0;
      this.countryData.forEach((item, index) => {
        item.highlight = false;
      });
      this.countryData.forEach((item, index) => {
        if (item.name == val) {
          item.highlight = true;
          indexOfVal = index;
        }
      });
      let diff = (indexOfVal - 2) * 30 + 10;
      this.selectCountry = val;

      if (diff > 0) {
        if (this.isfold) {
          this.$el.querySelector(".personCountryFold").scrollTop = diff; //缩小是的scrollTop
        } else {
          this.$el.querySelector(".personCountryUnfold").scrollTop = diff; //放大时的scrollTop
        }
      } else {
        if (this.isfold) {
          this.$el.querySelector(".personCountryFold").scrollTop = 0; //缩小是的scrollTop
        } else {
          this.$el.querySelector(".personCountryUnfold").scrollTop = 0; //放大时的scrollTop
        }
      }
      let longAndLat = [];
      for (let item in this.GlobalDataData.geoCoordMap) {
        if (item == val) {
          longAndLat = this.GlobalDataData.geoCoordMap[item];
        }
      }
      if (this.coordinate.length >= 2) {
        this.coordinate.splice(0, 2);
        this.coordinate = [...longAndLat];
      } else {
        this.coordinate = [...longAndLat];
      }
      // this.selectCountry = ''
      this.handleWorldMap();

      this.tooltipName = val;
      this.isTooltipShow = true;
      this.pieChart("worldtooltipBarId");
    },
    cloneTooltip() {
      this.isTooltipShow = false;
    },

    // 右侧列表交互
    handleCountryLinkage(val) {
      this.countryData.forEach((item, index) => {
        item.highlight = false;
      });
      this.countryData.forEach((item, index) => {
        if (item.name == val.name) {
          item.highlight = true;
        }
      });

      let longAndLat = [];
      for (let item in this.GlobalDataData.geoCoordMap) {
        if (item == val.name) {
          longAndLat = this.GlobalDataData.geoCoordMap[item];
        }
      }
      if (this.coordinate.length >= 2) {
        this.coordinate.splice(0, 2);
        this.coordinate = [...longAndLat];
      } else {
        this.coordinate = [...longAndLat];
      }
      this.layoutSize = "800%";
      this.selectCountry = val.name;
      // this.convertData.forEach((item) => {
      //   if (item.name == val.name) {
      //     item.selected = true;
      //   }
      // });
      this.tooltipName = val.name;
      this.countryName = val.name;
      this.isTooltipShow = true;
      this.pieChart("worldtooltipBarId");

      this.handleWorldMap();
    },

    // 悬停显示饼图
    handleTooltipPie() {
      let val = "tooltipBarId";
      this.pieChart(val);
    },
    pieChart(val) {
      let that = this;
      this.axios
        .get("/international/topic/globalCityMap/detail", {
          params: {
            city: this.GlobalDataData.params.citySelect,
            continent: this.GlobalDataData.params.continentSelect,
            country: this.countryName,
            personType: this.GlobalDataData.params.personTypeSelect,
            source: this.GlobalDataData.params.source,
            subject: this.GlobalDataData.params.subjectSelect,
            type: this.GlobalDataData.params.type,
            year: this.GlobalDataData.params.yearSelect,
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
              title: {
                text: that.tooltipName,
                textStyle: {
                  //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                  // fontSize: 12,
                  color: "#fff",
                },
              },
              tooltip: {},
              legend: {
                orient: "vertical",
                left: "left",
                icon: "circle",
                top: "30",
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
                    "#d76459",
                    "#98c5a7",
                    "#89c3db",
                    "#db89ab",
                    "#dbce89",
                    "#536689",
                    "#6ccdaa",
                    "#c9e0fd",
                    "#899ab3",
                    "#496081",
                    "#c5aa9a",
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
        data.data.forEach((item) => {
          arr.push(item.value);
        });
        var max = Math.max(...arr);

        var total = 140 / max;
        var countrys = data.data.map((item) => {
          return {
            name: item.name,
            value: item.value,
            count: Math.ceil(total * item.value) + "px",
            highlight: false,
          };
        });
        this.countryData = countrys;
      }
    },
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
      .worldMapBox {
        width: 955px;
        height: 365px;
        float: left;
        position: relative;
        .worldtooltipBarIdBox {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 100;
          .iconDiv {
            position: absolute;
            width: 15px;
            height: 15px;
            top: 3px;
            cursor: pointer;
            right: 3px;
            color: #fff;
            i {
              color: #fff;
            }
          }
          #worldtooltipBarId {
          }
        }

        .worldMap1 {
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
        height: 295px;
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
            width: 25%;
            margin-left: 20px;
          }
        }
        .personCountry,
        .InstituteChart {
          width: 100%;
          height: 650px;
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
