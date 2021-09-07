<template>
  <div class="areas">
    <div v-if="change" style="height: 100%;">
      <div class="indexTitleDiv">
        <div class="titleName">合作论文学科分布及热词</div>
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
      <div class="areasCharts" ref="areasCharts" v-show="isShowChart" style="display: flex">
        <div style="width: 50%;height: 100%;position: relative">
          <div class="areasChart" style="width: 100%;height:  100%;" ref="mySubsidizeChart"></div>
        </div>
        <div  style="width: 50%;height: 100%;border-radius: 2000px;display: flex;justify-content: center;align-items: center;position: relative">
          <div ><img :src="worldBag" alt=""></div>
          <div class="areasChart"  style="width: 100%;height: 100%;"  ref="mySubsidizeChart2"></div>
        </div>
      </div>
      <div ref="myTableImg"  class="subjectAreasList" v-show="!isShowChart">
        <table>
          <thead>
          <tr>
            <th>学科名称</th>
            <th>数量</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,i) in tableData" :key="i">
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
          <div class="titleName">合作论文学科分布及热词</div>
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
        <div class="areasCharts" ref="areasCharts" v-show="isShowChart" style="display: flex">
          <div style="width: 50%;height: 100%;position: relative">
            <div class="areasChart"  style="width: 100%;height: 100%;" ref="mySubsidizeChart"></div>

          </div>
          <div  style="width: 50%;height: 100%;border-radius: 2000px;display: flex;justify-content: center;align-items: center;position: relative">
            <div style="width: 300px;height: 100%;display: flex;justify-content: center;align-items: center"><img style="width: 300px;;height: 300px;" :src="worldBag300" alt=""></div>
            <div class="areasChart"  style="width: 100%;height: 100%;"  ref="mySubsidizeChart2"></div>
          </div>

        </div>
        <div ref="myTableImg"  class="subjectAreasList" v-show="!isShowChart">
          <table>
            <thead>
              <tr>
                <th>学科名称</th>
                <th>数量</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) in tableData" :key="i">
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
      worldBag: require("../../../assets/images/paper/wroldCloudBag.png"),
      worldBag300: require("../../../assets/images/paper/word300.png"),

      change: true,
      chart: 0,
      clientHeight: "",
      subjectData: {},
      dataName: "",
      twoSubjectData: [],
      MaxName: "",
      MaxCount: "",
      colorVal: "#899ab3",
      data2: [],
      tableData: [],
      isShowChart: true,
      tabNum: "",
      firstData: [],
      subjectSelectVal: "",
      subEcharts:null,
      subjectEcharts:null,
      seriesData:[],
    };
  },
  props: ["data", "mode", "subjectSelect","visitType"],
  watch: {
    data: {
      deep: true, // 深度监听
      immediate: true, // 监听到后，立即执行 handler方法
      handler (val) {
        let that = this
        if(val.subjectData){
          this.subjectData = JSON.parse(JSON.stringify(val));
          this.tableData = val.subjectData;
          this.$nextTick(() => {
            that.handleSubjectAreas();
            that.handleSubjectAreas2();
            setTimeout(()=>{
              that.handleSubjectAreas2();
            },1000)
          });
        }

      }
    },
    mode(e) {
      this.tabNum = e;
    },
    subjectSelect(e) {
      this.subjectSelectVal = e;
    },
  },
  mounted() {
    // this.subjectData = this.data;
    this.clientHeight = `${document.documentElement.clientHeight}`; //获取浏览器可视区域高度
    let that = this;
    window.onresize = function () {
      that.clientHeight = `${document.documentElement.clientHeight}`;
    };
  },
  methods: {
    iconClick(val) {
      let that = this
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
        // setTimeout(()=>{
          that.$nextTick(() => {
            that.handleSubjectAreas();
            that.handleSubjectAreas2();
          })
        // },200)
      } else if (val == 3) {
        this.icon1 = this.icon3;
        this.icon2 = this.icon4;
        this.isShowChart = false;
      } else if (val == 4) {
        this.handleChange();
      }
    },
    // 放大
    handleChange() {
      let that = this
      that.change = !that.change;
      let time = setTimeout(() => {
        if (!that.change) {
          that.$refs.mySubsidizeChart.style.height = that.clientHeight - 250 + "px";
          that.$refs.mySubsidizeChart2.style.height = that.clientHeight - 250 + "px";
        }
        // else if(that.change) {
        //   that.$refs.mySubsidizeChart.style.height = 350 + "px";
        //   that.$refs.mySubsidizeChart2.style.height = 350 + "px";
        // }
        if(that.isShowChart){
          that.handleSubjectAreas();
          that.handleSubjectAreas2();
        }
        clearTimeout(time);
      }, 100);
    },
    // 下载图片
    download() {
      let self = this;
      let refs = self.$refs.areasCharts
      let imgName = `合作论文学科分布及热词`
      setTimeout(function () {
        visitFun.downloadImg(refs,imgName)
      },500)
    },
    // 下载table
    downloadTable() {
      let self = this;
      let refs = self.$refs.myTableImg
      let imgName = `合作论文学科分布及热词`
      setTimeout(function () {
        visitFun.downloadImg(refs,imgName)
      },500)
    },
    handleSubjectAreas() {
      let  _this = this;
      _this.subjectEcharts = this.$echarts.init(this.$refs.mySubsidizeChart)

      // 一级学科处理
      let firstSubjectData = this.subjectData.subjectData;
      if (firstSubjectData != undefined) {
        firstSubjectData.pop();
      }
      _this.subjectEcharts.showLoading();
      // 二级学科处理
      let twoSubjectData = this.subjectData.subjectTWO;
      if (twoSubjectData != undefined) {
        twoSubjectData.forEach((item, i) => {
          this.data2.push({
            name: item.name,
            value: item.value,
            itemStyle: {
              normal: {
                color: this.colorVal,
                opacity:
                  (twoSubjectData.length - i) * (1 / twoSubjectData.length),
              },
            },
            labelLine: {
              normal: {
                show: true,
                length: 5,
                length2: 5,
                lineStyle: {
                  color: "#6f6f6f",
                },
              },
            },
          });
        });
      }
      let total = 0;
      if (firstSubjectData != undefined) {
        firstSubjectData.forEach((item) => {
          total = total + item.value;
        });
      }
      if (firstSubjectData != undefined) {
        firstSubjectData.forEach((item, i) => {
          // item.name = item.name;
          // item.value = item.count;
          item.labelLine = {
            normal: {
              show: item.value / total > 0.08,
              length: 2,
              length2: 5,
              // smooth: true,
              lineStyle: {
                color: "#6f6f6f",
              },
            },
            length: 2,
            length2: 5,
            // smooth: true,
            lineStyle: {
              color: "#6f6f6f",
            },
          };

          if (!this.subjectSelectVal) {
            firstSubjectData[0].selected = true;
            firstSubjectData[0].labelLine = {
              normal: {
                show: true,
                length: 10,
                length2: 5,
                // smooth: true,
                color: "#6f6f6f",
              },
            };
            firstSubjectData[0].label = {
              show: true,
              normal: {
                position: "outside",
                fontSize: 12,
                color: "#6f6f6f",
              },
            };
          } else if (item.name === this.subjectSelectVal) {
            item.selected = true;
            item.labelLine = {
              normal: {
                show: true,
                length: 2,
                length2: 5,
                // smooth: true,
                color: "#6f6f6f",
              },
            };
            item.label = {
              show: true,
              normal: {
                position: "outside",
                fontSize: 12,
                color: "#6f6f6f",
              },
            };
          }
        });
      }
      var seriesData = [
        {
          name: "",
          type: "pie",
          radius: "75%",
          selectedMode: "single",
          center: ["50%", "50%"],
          label: {
            show: true,
            formatter: function (params) {
              if (params.percent > 8) {
                return params.data.name + params.percent + "%";
              } else {
                return "";
              }
            },
            borderWidth: 1,
            color: "#6f6f6f",
            fontSize: 12,
          },
          color: [
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
          data: firstSubjectData,
        },

      ];
      if (seriesData.length > 2) {
        seriesData.pop();
      }
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} {b} : {c} ({d}%)",
        },
        series: seriesData,
      };
      _this.subjectEcharts.setOption(option, true);
      _this.subjectEcharts.hideLoading();
      _this.subjectEcharts.off("click");
      _this.subjectEcharts.on("click", function (params) {
        let  name2 = params.data.name;
        _this.handleSubjectAreas3(name2)
      });
    },
    handleSubjectAreas2() {
      let  _this = this
      // _this.subEcharts = null
      _this.subEcharts = this.$echarts.init(this.$refs.mySubsidizeChart2)
      // 二级学科处理
      let twoSubjectData = this.subjectData.subjectTWO;
      if (twoSubjectData != undefined) {
        this.data2 = []
        twoSubjectData.forEach((item, i) => {
          this.data2.push({
            name: item.name,
            value: item.value,
            itemStyle: {
              normal: {
                color: this.colorVal,
                opacity:
                  (twoSubjectData.length - i) * (1 / twoSubjectData.length),
              },
            },
            labelLine: {
              normal: {
                show: true,
                length: 5,
                length2: 5,
                lineStyle: {
                  color: "#6f6f6f",
                },
              },
            },
          });
        });
      }
      let color = [
        '#a5c949',
        '#d84646',
        '#0684c5',
        '#9193e6',
        '#c66cb1',
        '#b99541',
        '#eabc4c',
        '#299884',
        '#9edd9b',
        '#3c86ad',
      ]

      let bagImg= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjg4RjlBQ0NGOTgxMTFFQUJERkVDNDZFRTk5ODBGMEEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjg4RjlBQ0RGOTgxMTFFQUJERkVDNDZFRTk5ODBGMEEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGODhGOUFDQUY5ODExMUVBQkRGRUM0NkVFOTk4MEYwQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGODhGOUFDQkY5ODExMUVBQkRGRUM0NkVFOTk4MEYwQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoGfQ6YAAAytSURBVHja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'
      let bagImg2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAACXBIWXMAAAsTAAALEwEAmpwYAAA5lmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAyMC0xMC0xOVQxNzoyNzo1NiswODowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDIwLTEwLTE5VDE3OjMxOjU0KzA4OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyMC0xMC0xOVQxNzozMTo1NCswODowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDoxZDgyZDE5Zi00ZTdmLTg5NGYtOTNkNC03MmIwMWI4YWUwMmM8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPnhtcC5kaWQ6Rjg4RjlBQ0RGOTgxMTFFQUJERkVDNDZFRTk5ODBGMEE8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpEZXJpdmVkRnJvbSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgIDxzdFJlZjppbnN0YW5jZUlEPnhtcC5paWQ6Rjg4RjlBQ0FGOTgxMTFFQUJERkVDNDZFRTk5ODBGMEE8L3N0UmVmOmluc3RhbmNlSUQ+CiAgICAgICAgICAgIDxzdFJlZjpkb2N1bWVudElEPnhtcC5kaWQ6Rjg4RjlBQ0JGOTgxMTFFQUJERkVDNDZFRTk5ODBGMEE8L3N0UmVmOmRvY3VtZW50SUQ+CiAgICAgICAgIDwveG1wTU06RGVyaXZlZEZyb20+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDpGODhGOUFDREY5ODExMUVBQkRGRUM0NkVFOTk4MEYwQTwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6MWQ4MmQxOWYtNGU3Zi04OTRmLTkzZDQtNzJiMDFiOGFlMDJjPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDIwLTEwLTE5VDE3OjMxOjU0KzA4OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4zMDA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MzAwPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz74gQfbAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAABsBSURBVHja7N3pl1zVee/xb5daU3draiEhNKAJJCFkZtuxDR4uxkCS5Tg3g4kd3yEv8i/dtXJXnJXYJg7YjmOvGDCOJwIYLraxDGhCQkKoNSC1JKRuTS3pvnieWiqUllTVXcM5Vd/PWme1JER31a5zftp7n2fv03fwyCjqGTOuOir5dRBYBCzOYzh/vwAYyv9+9TELmAnMze9R/f6z888BLgDngIv5+4vAmfzz88DYJMdp4CRwHBgFjuVxPP/7ReBSfq091AP6bYKe+ZyHM4wW1YTTwgyk6jEvj2pIDQBzMoSu/toP9E3x9VwGJjLMzk7ydbwmvE7lcbrmOFETYsfz16P5PWVgqSSqPZ6BPOZmOC0FlgMrgFuAZfn7mzO0ZrX5dfbla52Z4Viv8xlWh4ER4BBwEDiQX49kgI3ncSa/XvDU6A59Dgm7JqiWA6uBNcC6PFZlT2pOTc9odk1PqcyqPbJzNT2zs9nb2g/syWMvsC8DzuCyh6UOuCnDaFX2mm7OY2key/IY6uI2mHOd0B3LHtfhPI7U/PpABtp+4Kinkj0sNb/3VDu3tBxYD2zOY0MO8/zH5/omMsR2Am/l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'
      let maskImage = new Image();
      // maskImage.src = bagImg
      maskImage.src = _this.change == true?bagImg:bagImg2
      _this.seriesData = [
        {
          type: "wordCloud",
          center: ["50%", "50%"],
          // 网格大小，各项之间间距
          gridSize: 10,
          maskImage: maskImage,
          // 形状 circle 圆，cardioid  心， diamond 菱形，
          // triangle-forward 、triangle 三角，star五角星
          shape: 'circle',
          // 字体大小范围
          sizeRange: [10, 20],
          // 文字旋转角度范围
          rotationRange: [0, 1],
          // 旋转步值
          rotationStep: 90,
          // 自定义图形
          // maskImage: maskImage,
          left: _this.change?'center':'center',
          top: _this.change?'center':'center',
          right: null,
          bottom: null,
          // 画布宽
          width: _this.change?'220':'320',
          // 画布高
          height: _this.change?'220':'320',
          // 是否渲染超出画布的文字
          drawOutOfBound: false,
          textStyle: {
            normal: {
              color: function(val) {
                let colors = [
                    "#b84765",
                    "#d3b8a5",
                    "#6d8398",
                    "#7caba5",
                    "#bbdacb",
                    "#9fb898",
                    "#8f8fb1",
                    "#6a6e71",
                    "#9fbfbc",
                    "#6a6b6f",
                    "#a1c4c0",
                    "#bdc1c4",
                    "#b2c7cc",
                    "#afb3b6",
                    "#db89ab",
                    "#dbce89",
                    "#6ccdaa",
                  ]
                  return colors[val.dataIndex];
                // return 'rgb(' + [
                //   Math.round(Math.random() * 200 + 55),
                //   Math.round(Math.random() * 200 + 55),
                //   Math.round(Math.random() * 200 + 55)
                // ].join(',') + ')';
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#2ac'
            }
          },
          data: _this.data2
        }

      ];

      if (_this.seriesData.length > 2) {
        _this.seriesData.pop();
      }
      let option = {
        backgroundColor:'rgba(0,0,0,0)',
        tooltip: {

          confine: true ,
          trigger: "item",
          formatter: "热词： <br/>{b} : {c} ",
        },
        series: _this.seriesData,
      };
      _this.subEcharts.setOption(option,true);
      _this.subEcharts.resize();
    },
    handleSubjectAreas3(val) {
      let _this = this
      _this.subEcharts = null
      _this.subEcharts = this.$echarts.init(this.$refs.mySubsidizeChart2)
      // 二级学科处理
      let city = _this.subjectData.city,
        continent = _this.subjectData.continent,
        country = _this.subjectData.country,
        enOrg = _this.subjectData.enOrg,
        type = _this.subjectData.type,
        year = _this.subjectData.year,
        zhOrg = _this.subjectData.zhOrg,
        subject = val;
      _this.axios( {
        method: 'POST',
          url: '/paper/statistic/cloud',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: [
            function () {
              let params = {
                'mq_organizations.city': city,
                'mq_organizations.continent': continent,
                'mq_organizations.country': country,
                'mq_organizations.enOrgName': enOrg,
                'mq_year': year,
                'mq_organizations.zhOrgName': zhOrg,
                'mq_researchFields': subject,
                'limit':'15'
              }
              let ret = ''
              for (let it in params) {
                ret +=
                  encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
              }
              return ret
            }
          ]
        })
        .then((res) => {
          if (res.data.code == 200) {
            let  subSubject = res.data.data;
            let arr = []
            if (subSubject != []) {
              subSubject.forEach((item, i) => {
                arr.push({
                  name: item.name,
                  value: item.value,
                  itemStyle: {
                    normal: {
                      color: _this.colorVal,
                      opacity:
                      (subSubject.length - i) * (1 / subSubject.length),
                    },
                  },
                  labelLine: {
                    normal: {
                      show: true,
                      length: 5,
                      length2: 5,
                      lineStyle: {
                        color: "#6f6f6f",
                      },
                    },
                  },
                });
              });
            }
            let bagImg= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjg4RjlBQ0NGOTgxMTFFQUJERkVDNDZFRTk5ODBGMEEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjg4RjlBQ0RGOTgxMTFFQUJERkVDNDZFRTk5ODBGMEEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGODhGOUFDQUY5ODExMUVBQkRGRUM0NkVFOTk4MEYwQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGODhGOUFDQkY5ODExMUVBQkRGRUM0NkVFOTk4MEYwQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoGfQ6YAAAytSURBVHja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'
            let bagImg2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAACXBIWXMAAAsTAAALEwEAmpwYAAA5lmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAyMC0xMC0xOVQxNzoyNzo1NiswODowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDIwLTEwLTE5VDE3OjMxOjU0KzA4OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyMC0xMC0xOVQxNzozMTo1NCswODowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDoxZDgyZDE5Zi00ZTdmLTg5NGYtOTNkNC03MmIwMWI4YWUwMmM8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPnhtcC5kaWQ6Rjg4RjlBQ0RGOTgxMTFFQUJERkVDNDZFRTk5ODBGMEE8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpEZXJpdmVkRnJvbSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgIDxzdFJlZjppbnN0YW5jZUlEPnhtcC5paWQ6Rjg4RjlBQ0FGOTgxMTFFQUJERkVDNDZFRTk5ODBGMEE8L3N0UmVmOmluc3RhbmNlSUQ+CiAgICAgICAgICAgIDxzdFJlZjpkb2N1bWVudElEPnhtcC5kaWQ6Rjg4RjlBQ0JGOTgxMTFFQUJERkVDNDZFRTk5ODBGMEE8L3N0UmVmOmRvY3VtZW50SUQ+CiAgICAgICAgIDwveG1wTU06RGVyaXZlZEZyb20+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDpGODhGOUFDREY5ODExMUVBQkRGRUM0NkVFOTk4MEYwQTwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6MWQ4MmQxOWYtNGU3Zi04OTRmLTkzZDQtNzJiMDFiOGFlMDJjPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDIwLTEwLTE5VDE3OjMxOjU0KzA4OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4zMDA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MzAwPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz74gQfbAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAABsBSURBVHja7N3pl1zVee/xb5daU3draiEhNKAJJCFkZtuxDR4uxkCS5Tg3g4kd3yEv8i/dtXJXnJXYJg7YjmOvGDCOJwIYLraxDGhCQkKoNSC1JKRuTS3pvnieWiqUllTVXcM5Vd/PWme1JER31a5zftp7n2fv03fwyCjqGTOuOir5dRBYBCzOYzh/vwAYyv9+9TELmAnMze9R/f6z888BLgDngIv5+4vAmfzz88DYJMdp4CRwHBgFjuVxPP/7ReBSfq091AP6bYKe+ZyHM4wW1YTTwgyk6jEvj2pIDQBzMoSu/toP9E3x9VwGJjLMzk7ydbwmvE7lcbrmOFETYsfz16P5PWVgqSSqPZ6BPOZmOC0FlgMrgFuAZfn7mzO0ZrX5dfbla52Z4Viv8xlWh4ER4BBwEDiQX49kgI3ncSa/XvDU6A59Dgm7JqiWA6uBNcC6PFZlT2pOTc9odk1PqcyqPbJzNT2zs9nb2g/syWMvsC8DzuCyh6UOuCnDaFX2mm7OY2key/IY6uI2mHOd0B3LHtfhPI7U/PpABtp+4Kinkj0sNb/3VDu3tBxYD2zOY0MO8/zH5/omMsR2Am/l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'
            let maskImage = new Image();
            maskImage.src = _this.change == true?bagImg:bagImg2

            _this.seriesData = []
            _this.seriesData = [(
                {
                  type: "wordCloud",
                  center: ["50%", "50%"],
                  // 网格大小，各项之间间距
                  gridSize: 10,
                  maskImage: maskImage,
                  // 形状 circle 圆，cardioid  心， diamond 菱形，
                  // triangle-forward 、triangle 三角，star五角星
                  shape: 'circle',
                  // 字体大小范围
                  sizeRange: [10, 20],
                  // 文字旋转角度范围
                  rotationRange: [0, 1],
                  // 旋转步值
                  rotationStep: 90,
                  // 自定义图形
                  // maskImage: maskImage,
                  left: _this.change?'center':'center',
                  top: _this.change?'center':'center',
                  right: null,
                  bottom: null,
                  // 画布宽
                  width: _this.change?'220':'320',
                  // 画布高
                  height: _this.change?'220':'320',
                  // 是否渲染超出画布的文字
                  drawOutOfBound: false,
                  textStyle: {
                    normal: {
                      color: function(val) {
                        // return 'rgb(' + [
                        //   Math.round(Math.random() * 200 + 55),
                        //   Math.round(Math.random() * 200 + 55),
                        //   Math.round(Math.random() * 200 + 55)
                        // ].join(',') + ')';
                        let colors = [
                          "#b84765",
                          "#d3b8a5",
                          "#6d8398",
                          "#7caba5",
                          "#bbdacb",
                          "#9fb898",
                          "#8f8fb1",
                          "#6a6e71",
                          "#9fbfbc",
                          "#6a6b6f",
                          "#a1c4c0",
                          "#bdc1c4",
                          "#b2c7cc",
                          "#afb3b6",
                          "#db89ab",
                          "#dbce89",
                          "#6ccdaa",
                        ]
                        return colors[val.dataIndex];
                      }
                    },
                    emphasis: {
                      shadowBlur: 10,
                      shadowColor: '#2ac'
                    }
                  },
                  data: arr
                }
              )];
            if (_this.seriesData.length > 2) {
              _this.seriesData.pop();
            }
            let option = {
              backgroundColor:'rgba(0,0,0,0)',
              tooltip: {
                confine: true ,
                trigger: "item",
                formatter: "热词： <br/>{b} : {c} ",
              },
              series: _this.seriesData,
            };
            _this.subEcharts.setOption(option,true);
            _this.subEcharts.resize();
          }
        });
    },
    beforeDestory(){
      this.$echarts.dispose(this.subjectEcharts);
      this.$echarts.dispose(this.subEcharts);
      this.subjectEcharts = null;
      this.subEcharts = null;
    }
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/titlecss.less";

.areas {
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  .areasCharts {
    position: relative;
    width: 100%;
    height: 320px;
    border: 1px solid #d3d6dd;
    /*background: url("../../../assets/images/paper/wroldCloudBag.png");*/
    .areasChart {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }
    .markDiv {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(255, 255, 255, 0);
    }
  }
  .subjectAreasList {
    // margin-top: 20px;
    width: 100%;
    overflow-y: auto;
    height: 330px;
    border: 1px solid #ccc;
    table {
      width: 100%;
      thead {
        tr {
          height: 35px;
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
  .subjectAreasList::-webkit-scrollbar {
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .subjectAreasList::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    background: #ff3a25;
  }
  .subjectAreasList::-webkit-scrollbar-track {
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
    .areasCharts {
      border: none;
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
    .areasCharts {
      position: relative;
      width: 100%;
      height: 100%;
      margin-top: 30px;
      .areasChart {
        float: left;
        width: 100%;
        height: 100%;
      }
      .markDiv {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(255, 255, 255, 0);
      }
    }
    .subjectAreasList {
      margin-top: 20px;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      border: 1px solid #ccc;
      table {
        width: 100%;
        thead {
          tr {
            height: 60px;
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
            height: 80px;
            line-height: 0px;
            td {
              width: 10%;
              text-align: center;
            }
          }
        }
      }
    }
    .subjectAreasList::-webkit-scrollbar {
      width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    .subjectAreasList::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      background: #ff3a25;
    }
    .subjectAreasList::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      background: #d3d6dd;
    }
  }
}
</style>
