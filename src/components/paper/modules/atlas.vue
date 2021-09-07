<template>
  <div class="subsidize">
    <div class="indexTitleDiv">
      <div class="titleName">{{componentTitle}}</div>
      <div class="operating">
        <div @click.stop="iconClick(1)" class="downloadNew iconDiv"></div>
        <div @click.stop="iconClick(2)" class="visualization iconDiv">
          <img :src="icon1" alt />
        </div>
        <!--<div @click.stop="iconClick(3)" class="visualizationList iconDiv">-->
          <!--<img :src="icon2" alt />-->
        <!--</div>-->
        <div @click.stop="iconClick(4)" class="fullScreen iconDiv"></div>
      </div>
    </div>
    <div class="subsidizeCharts">
      <div class="subsidizeChart" ref="mySubsidizeChart"></div>
    </div>
    <transition name="bounce" mode="out-in">
      <div class="fullFcreen" ref="fullFcreen" v-if="!change">
        <div class="indexTitleDiv">
          <div class="titleName">{{componentTitle}}</div>
          <div class="operating">
            <div @click.stop="iconClick(1)" class="downloadNew iconDiv"></div>
            <div @click.stop="iconClick(2)" class="visualization iconDiv">
              <img :src="icon1" alt />
            </div>
            <!--<div @click.stop="iconClick(3)" class="visualizationList iconDiv">-->
              <!--<img :src="icon2" alt />-->
            <!--</div>-->
            <div @click.stop="iconClick(4)" class="fullScreensPlus iconDiv"></div>
          </div>
        </div>
        <div class="subsidizeCharts">
          <div class="subsidizeChart2" ref="mySubsidizeChart"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        height:window.innerHeight-800 + 'px',
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
        titleName: "历年出访人数",
        tableData1: [],
        tableTitle:[],
        componentTitle:'论文人员网络图谱',
        isShowChart: true,
        tabNum: "",
        totalArr:[100,200,300,400,500,600,700,800,900,1000],
        table:[
          {
            name:'被点击',
            value:90
          }, {
            name:'被点击',
            value:90
          }, {
            name:'被点击',
            value:90
          },
        ],
        myChart:null,
        AtlasData:{}
      };
    },
    props: ["data","mode","visitType"],
    watch: {
      data: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          this.AtlasData = val;
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
        if (val == 1) {
          this.download();
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
      handleChange() {
        this.change = !this.change;
        if(!this.change){
          this.$emit('changeWindow', '1')   // 打开
        }else{
          this.$emit('changeWindow', '2')  // 关闭
        }
        let time = setTimeout(() => {
          if (!this.change) {
            this.$refs.mySubsidizeChart.style.height = window.innerHeight - 250 + "px";
            this.$refs.fullFcreen.style.height = window.innerHeight - 100 + "px";
          } else {
            this.$refs.mySubsidizeChart.style.height = 300 + "px";
          }
          this.handleSubsidizeChart();
          clearTimeout(time);
        }, 100);
      },
      // 下载图片
      download() {
        let _this = this
        var i = _this.myChart.getDataURL({
          type: "png",
          backgroundColor: "white",
          pixelRatio: 2,
          // 导出的图片分辨率比例，默认为 1。
          //pixelRatio: number,
        });
        var $a = document.createElement("a");
        $a.setAttribute("href", i);
        $a.setAttribute("download", this.componentTitle+".png");
        $a.click();
      },
      handleSubsidizeChart() {
        let _this = this
        _this.myChart = this.$echarts.init(this.$refs.mySubsidizeChart)
        _this.myChart.showLoading();
        let data = []
        data.push({
          "name":_this.AtlasData.centralNode.paperId  ,
          // "id":_this.AtlasData.centralNode.paperId  ,
          "x": '150',
          'y': '150',
          "symbolSize": _this.AtlasData.centralNode.value,
          "draggable": "true",
          "value": _this.AtlasData.centralNode.value,
          "realTitle":_this.AtlasData.centralNode.title,
          // 'fixed':true,
          "type":'paper',
          "label":{
            'normal':{
              show:true,
              color:'#fff',
              fontSize: '16' ,
              formatter:_this.AtlasData.centralNode.titleSimple,
            }
          },
          "itemStyle": {
            "normal": {
              "color": '#ff3a25'
            }
          }
        })
        _this.AtlasData.personNodes.forEach((item,index)=>{
          data.push({
            "name": item.personId,
            // 'id':item.personId,
            "value": item.value,
            "symbolSize": item.value,
            "realTitle":item.personName,
            "flag":item.flag,
            "type":'person',
            "draggable": "true",
            "label":{
              'normal':{
                show:true,
                color:'#fff',
                formatter:item.personName,
              }
            },
            "itemStyle": {
            "normal": {
              "color": '#1f2e45'
            }
          }

          })
        })

        _this.AtlasData.paperNodes.forEach((item,index)=>{
          if(_this.AtlasData.centralNode.paperId != item.paperId){
            let num = 0
            if(item.value>200){
              num = 1
            }else if(item.value>150 && item.value<= 200){
              num = 0.9
            }
            else if(item.value>100 && item.value<= 150){
              num = 0.8
            }
             else if(item.value>80 && item.value<= 100){
              num = 0.7
            } else if(item.value>40 && item.value<= 80){
              num = 0.6
            }else if(item.value>=20 && item.value<= 40){
              num = 0.5
            }else if(item.value< 20){
              num = 0.4
            }


            data.push({
              "name": item.paperId,
              // 'id':item.paperId,
              "value": item.value,
              "symbolSize": item.value,
              "draggable": "true",
              "realTitle":item.title,
              "type":'paper',
              "label":{
                'normal':{
                  show:true,
                  // position: 'top',
                  color:'#191919',
                  formatter:item.titleSimple,
                }
              },
              "itemStyle": {
                "normal": {
                  "color": `rgba(255,58,37,${num
                  })`
                }
              }
            } )
          }


        })
        let option = option = {
          backgroundColor: 'rgba(0,0,0,0)',
          tooltip: {
            show:true,
            position:'top',
              formatter: (params) => {
              if(params.dataType == 'node'){
                return `${params.data.realTitle}`;

              }
              },
          },
          animationDuration: 3000,
          animationEasingUpdate: 'quinticInOut',
          radar: {
            radius: '20%',

          },
          series: [{
            name: '论文关系图',
            type: 'graph',
            layout: 'force',

            force: {
              repulsion: _this.change?400:1600
            },
            // data: [
            //   {
            //   "name": "李达舜",
            //   // "x": 0,
            //   // y: 0,
            //   "symbolSize": 80,
            //   "draggable": "true",
            //   "value": 20,
            //     "label":{
            //       'normal':{
            //         color:'#fff',
            //         fontSize: '16' ,
            //       }
            //     },
            //     "itemStyle": {
            //       "normal": {
            //         "color": '#ff3a25'
            //       }
            //     }
            // }, {
            //   "name": "高苏伟",
            //   "value": 10,
            //   "symbolSize": 40,
            //   "category": "李达舜",
            //   "draggable": "true",
            //   "label":{
            //       'normal':{
            //         position: 'top',
            //         color:'#191919'
            //     }
            //   },
            //     "itemStyle": {
            //       "normal": {
            //
            //         "color": '#1f2e45'
            //       }
            //     }
            // }, {
            //   "name": "张三",
            //   "symbolSize": 5,
            //   "category": "李达舜",
            //   "draggable": "true",
            //   "value": 1,
            //     "label":{
            //       'normal':{
            //         position: 'top',
            //         color:'#191919'
            //       }
            //     },
            //     "itemStyle": {
            //       "normal": {
            //
            //         "color": '#1f2e45'
            //       }
            //     }
            // },
            // {
            //   "name": "李四",
            //   "symbolSize": 30,
            //   "category": "李达舜",
            //   "draggable": "true",
            //   "value": 1,
            //   "label":{
            //     'normal':{
            //       position: 'top',
            //       color:'#191919'
            //     }
            //   },
            //   "itemStyle": {
            //     "normal": {
            //
            //       "color": '#1f2e45'
            //     }
            //   }
            // },
            // {
            //   "name": "苏大强",
            //   "symbolSize": 15,
            //   "category": "李达舜",
            //   "draggable": "true",
            //   "value": 1,
            //   "label":{
            //     'normal':{
            //       position: 'top',
            //       color:'#191919'
            //     }
            //   },
            //   "itemStyle": {
            //     "normal": {
            //
            //       "color": '#1f2e45'
            //     }
            //   }
            // },
            // {
            //   "name": "高苏伟2",
            //   "value": 6,
            //   "symbolSize": 30,
            //   "category": "李达舜",
            //   "draggable": "true",
            //   "label":{
            //     'normal':{
            //       position: 'top',
            //       color:'#191919'
            //     }
            //   },
            //   "itemStyle": {
            //     "normal": {
            //
            //       "color": '#1f2e45'
            //     }
            //   }
            // },
            // {
            //   "name": "高苏伟3",
            //   "symbolSize": 25,
            //   "category": "李达舜",
            //   "draggable": "true",
            //   "value": 1,
            //   "label":{
            //     'normal':{
            //       position: 'top',
            //       color:'#191919'
            //     }
            //   },
            //   "itemStyle": {
            //     "normal": {
            //
            //       "color": '#1f2e45'
            //     }
            //   }
            // },
            // {
            //   "name": "论文1",
            //   "symbolSize": 40,
            //   "category": "source",
            //   "draggable": "true",
            //   "value": 1,
            //   "label":{
            //     'normal':{
            //       position: 'top',
            //       color:'#191919'
            //     }
            //   },
            //   "itemStyle": {
            //     "normal": {
            //
            //       "color": 'rgba(255,58,37,0.9)'
            //     }
            //   }
            // },
            // {
            //   "name": "论文2",
            //   "symbolSize": 35,
            //   "category": "source",
            //   "draggable": "true",
            //   "value": 1,
            //   "label":{
            //     'normal':{
            //       position: 'top',
            //       color:'#191919'
            //     }
            //   },
            //   "itemStyle": {
            //     "normal": {
            //
            //       "color": 'rgba(255,58,37,0.8)'
            //     }
            //   }
            // },
            // {
            //   "name": "论文3",
            //   "symbolSize": 30,
            //   "category": "高苏伟",
            //   "draggable": "true",
            //   "value": 1,
            //   "label":{
            //     'normal':{
            //       position: 'top',
            //       color:'#191919'
            //     }
            //   },
            //   "itemStyle": {
            //     "normal": {
            //
            //       "color": 'rgba(255,58,37,0.7)'
            //     }
            //   }
            // },
            // {
            //   "name": "论文4",
            //   "symbolSize": 25,
            //   "category": "高苏伟",
            //   "draggable": "true",
            //   "value": 1,
            //   "label":{
            //     'normal':{
            //       position: 'top',
            //       color:'#191919'
            //     }
            //   },
            //   "itemStyle": {
            //     "normal": {
            //
            //       "color": 'rgba(255,58,37,0.6)'
            //     }
            //   }
            // },
            // {
            //   "name": "论文5",
            //   "symbolSize": 20,
            //   "category": "高苏伟2",
            //   "draggable": "true",
            //   "value": 1,
            //   "label":{
            //     'normal':{
            //       position: 'top',
            //       color:'#191919'
            //     }
            //   },
            //   "itemStyle": {
            //     "normal": {
            //
            //       "color": 'rgba(255,58,37,0.5)'
            //     }
            //   }
            // },
            // {
            //   "name": "论文6",
            //   "symbolSize": 15,
            //   "category": "高苏伟3",
            //   "draggable": "true",
            //   "value": 1,
            //   "label":{
            //     'normal':{
            //       position: 'top',
            //       color:'#191919'
            //     }
            //   },
            //   "itemStyle": {
            //     "normal": {
            //       "color": 'rgba(255,58,37,0.4)'
            //     }
            //   }
            // }],
            data:data,
            links:_this.AtlasData.links,

            // links: [
            //   {
            //   "source": "李达舜",
            //   "target": "高苏伟"
            // }, {
            //   "source": "李达舜",
            //   "target": "苏大强"
            // }, {
            //   "source": "李达舜",
            //   "target": "张三"
            // }, {
            //   "source": "李达舜",
            //   "target": "李四"
            // },{
            //   "source": "李达舜",
            //   "target": "高苏伟2"
            // }, {
            //   "source": "李达舜",
            //   "target": "高苏伟3"
            // },
            //   {
            //   "source": "张三",
            //   "target": "论文1"
            // },{
            //   "source": "张三",
            //   "target": "论文2"
            // }, {
            //   "source": "高苏伟",
            //   "target": "论文3"
            // }, {
            //   "source": "高苏伟",
            //   "target": "论文4"
            // }, {
            //   "source": "高苏伟2",
            //   "target": "论文5"
            // },{
            //   "source": "高苏伟3",
            //   "target": "论文6"
            // }, ],
            // categories: [
            //   {
            //   'name': '李达舜'
            // }, {
            //   'name': '高苏伟'
            // }, {
            //   'name': '张三'
            // }, {
            //   'name': '李四'
            // }, {
            //   'name': '苏大强'
            // }, {
            //   'name': '高苏伟2'
            // }, {
            //   'name': '高苏伟3'
            // },{
            //   'name': '论文1'
            // }, {
            //   'name': '论文2'
            // }, {
            //   'name': '论文3'
            // },{
            //   'name': '论文4'
            // }, {
            //   'name': '论文5'
            // }, {
            //   'name': '论文6'
            // }],
            focusNodeAdjacency: true,
            roam: true,
            label: {
              normal: {

                show: true,
                // position: 'top',

              }
            },
            lineStyle: {
              normal: {
                color: '#ff3a25',
                curveness: 0,
                type: "solid"
              }
            }
          }]
        };
        _this.myChart.setOption(option, true);
        _this.myChart.hideLoading();
        _this.myChart.off("click");
        _this.myChart.on("click", function (params) {
          let type = params.data.type;

          let id = params.data.name
          if(type == 'paper'){
            let paperTitle = params.data.realTitle
            _this.$emit("changePaper",id,paperTitle);
          }else if(type == 'person'){
            if(params.data.flag == 'in'){
              _this.$router.push({
                path: "/domesticPersonnelInfor",
                query: { id: id },
              });
            }else if(params.data.flag == 'out'){
              _this.$router.push({
                path: "/PersonDetails",
                query: { id: id },
              });
            }else{
              alert('获取不到人员类型，跳转失败！')
            }
          }
        });
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
      height: 330px;
      .subsidizeChart {
        width: 100%;
        height: 90%;
        margin-top: 5%;
        border: 1px solid #d3d6dd;
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
      top: 0px;
      left: 0px;
      width: 1560px;
      min-height: 500px;
      /*height: 91%;*/
      padding: 5%;
      background: #fff;
      z-index: 10;
      .subsidizeCharts {
        position: relative;
        width: 100%;
        height: 91%;
        .subsidizeChart2 {
          width: 100%;
          height: 90%;
          /*margin-top: 5%;*/
          border: 1px solid #d3d6dd;
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
