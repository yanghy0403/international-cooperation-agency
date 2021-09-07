<template>
  <div class="CooperationTrackCon">
    <div class="titleDiv">
      <div class="titleName">参与国际合作轨迹</div>
      <div class="operating">
        <div class="centerDiv centerDiv1">
          <img :src="bagImg" alt="">
        </div>
        <div @click.stop="iconClick(1)" class="centerLeftDiv"></div>
        <div @click.stop="iconClick(2)" class="centerRightDiv"></div>
      </div>
    </div>
    <div class="CooperationTrack" v-show='isShowChart'>
      <div class="CooperationTrackChart" ref="CooperationTrackChart"></div>
    </div>
    <div class="CooperationTrack2" v-show='!isShowChart'>
      <div class="tabDIv newTable">
        <el-table
          :data="tableData2"
          style="width: 100%">
          <el-table-column
            prop="year"
            label="年份"
            min-width="6"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="contnet"
            label="合作内容"
            min-width="6"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="value"
            label="数值"
            min-width="6"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="source"
            label="来源"
            min-width="6"
            align="center"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icon1:require('../../../assets/images/国际人才/图表模式.png'),
      icon2:require('../../../assets/images/国际人才/表格模式.png'),
      bagImg:require('../../../assets/images/国际人才/图表模式.png'),
      isShowChart:true,
      tableData2:[ ],
      linksData2:[
        {
          source: "2009",
          target: "交流",
          value: 1,
          lineStyle: {
            color: "rgba(0,0,0,0)",
            opacity: 0.4
          }
        },    {
          source: "2010",
          target: "国际组织",
          value: 1,
          lineStyle: {
            color: "rgba(0,0,0,0)",
            opacity: 0.4
          }
        },    {
          source: "2011",
          target: "人才",
          value: 1,
          lineStyle: {
            color: "rgba(0,0,0,0)",
            opacity: 0.4
          }
        },    {
          source: "2012",
          target: "项目",
          value: 1,
          lineStyle: {
            color: "rgba(0,0,0,0)",
            opacity: 0.4
          }
        },    {
          source: "2013",
          target: "平台",
          value: 1,
          lineStyle: {
            color: "rgba(0,0,0,0)",
            opacity: 0.4
          }
        },    {
          source: "2014",
          target: "奖励",
          value: 1,
          lineStyle: {
            color: "rgba(0,0,0,0)",
            opacity: 0.4
          }
        },

        {
          source: "2015",
          target: "产出",
          value: 1,
          lineStyle: {
            color: "rgba(0,0,0,0)",
            opacity: 0.4
          }
        },    {
          source: "2016",
          target: "交流",
          value: 1,
          lineStyle: {
            color: "rgba(0,0,0,0)",
            opacity: 0.4
          }
        },    {
          source: "2017",
          target: "国际组织",
          value: 1,
          lineStyle: {
            color: "rgba(0,0,0,0)",
            opacity: 0.4
          }
        },    {
          source: "2018",
          target: "人才",
          value: 1,
          lineStyle: {
            color: "rgba(0,0,0,0)",
            opacity: 0.4
          }
        },    {
          source: "2019",
          target: "项目",
          value: 1,
          lineStyle: {
            color: "rgba(0,0,0,0)",
            opacity: 0.4
          }
        },
      ],
    };
  },
  props:{
    linksData: {
      default: []
    },
    detailData: {
      default: []
    },
  },
  watch:{
    detailData:{
      deep: true, // 深度监听
      immediate: true, // 监听到后，立即执行 handler方法
      handler (val) {
        this.tableData2 = val
      }
    },

    linksData:{
      deep: true, // 深度监听
      immediate: true, // 监听到后，立即执行 handler方法
      handler (val) {
        let newVal = JSON.parse(JSON.stringify(val))
        if(newVal.length != 0){
          newVal.forEach((item,index)=>{
            let newSource = item.source
            item.source = item.target
            item.isReal = true
            item.newValue = item.value
            item.target = newSource
            item.lineStyle = {
              color: "source",
              opacity: 0.4
            }
            // if(newSource == '产出'){
            //   if(item.value>1000 && item.value<2000){
            //     item.value = item.value/1000
            //   }else if(item.value>=2000 && item.value<3000){
            //     item.value = item.value/2000
            //   }else if(item.value>3000){
            //     item.value = item.value/3000
            //   }
            // }

            // if(newSource == '交流'){
            //   if(item.value>10 && item.value<50){
            //     item.value = item.value/30
            //   }else if(item.value>=50 && item.value<100){
            //     item.value = item.value/50
            //   }else if(item.value>100){
            //     item.value = item.value/100
            //   }
            // }
            if(item.value > 1) {
              item.value = 1
            }


          })
        }
        this.linksData2.forEach((item,index)=>{
          newVal.forEach((subItem,subIndex)=>{
            if(item.source == subItem.source && item.target == subItem.target){
              this.linksData2.splice(index,1)
            }
          })
        })

        this.linksData2 = [...this.linksData2 , ...newVal]
        this.$nextTick(() => {
          this.handleCooperationTrack();
        });
      }
    },

  },
  mounted() {
    this.bagImg = this.icon1
  },
  methods: {
    iconClick(val){
      if(val == 1){
        this.bagImg = this.icon1
        this.isShowChart = true
      }else{
        this.bagImg = this.icon2
        this.isShowChart = false
      }
    },

    handleCooperationTrack() {
      let that = this
      var myChart = this.$echarts.init(this.$refs.CooperationTrackChart);
      myChart.showLoading();
      let bagColor = ['#dbcfb4','#b5937b','#d79494','#a698b8','#7a779c',
        '#89a4b3','#6a7f9e','#475c7b','#bfcea5','#80bdc4','#edb399','#d3be92','#84a0c9','#e18787','#89b3b3',]
      let option = {
        color:bagColor,
        series: {
          type: "sankey",
          // layout: "none",
          left:'84px',
          right:'76px',
          nodeWidth:30,
          nodeGap : 1,
          // focusNodeAdjacency: "false",
          layoutIterations: 0,
          draggable:false,
          label:{
            fontSize:'12',
            color:'#6f6f6f',
          },
          data: [
            {
              name: "2009",
              itemStyle: {
                color: bagColor[4],
                borderWidth:'0',
              },label:{
                position:'left',
              }
            }, {
              name: "2010",
              itemStyle: {
                color: bagColor[8],
                borderWidth:'0',
              },label:{
                position:'left',
              }
            }, {
              name: "2011",
              itemStyle: {
                color: bagColor[12],
                borderWidth:'0',
              },label:{
                position:'left',
              }
            }, {
              name: "2012",
              itemStyle: {
                color: bagColor[0],
                borderWidth:'0',
              },label:{
                position:'left',
              }
            },
            {
              name: "2013",
              itemStyle: {
                color: bagColor[1],
                borderWidth:'0'
              },
              label:{
                position:'left'
              }
            },
            {
              name: "2014",
              itemStyle: {
                color: bagColor[2],
                borderWidth:'0'
              },
              label:{
                position:'left'
              }
            },
            {
              name: "2015",
              itemStyle: {
                color: bagColor[3],
                borderWidth:'0'
              },
              label:{
                position:'left'
              }
            },            {
              name: "2016",
              itemStyle: {
                color: bagColor[4],
                borderWidth:'0'
              },
              label:{
                position:'left'
              }
            },            {
              name: "2017",
              itemStyle: {
                color: bagColor[5],
                borderWidth:'0'
              },
              label:{
                position:'left'
              }
            },            {
              name: "2018",
              itemStyle: {
                color: bagColor[6],
                borderWidth:'0'
              },
              label:{
                position:'left'
              }
            },            {
              name: "2019",
              itemStyle: {
                color: bagColor[7],
                borderWidth:'0'
              },
              label:{
                position:'left'
              }
            },
            {
              name: "交流",
              itemStyle: {
                color: bagColor[8],
                borderWidth:'0'
              }
            },
            {
              name: "国际组织",
              itemStyle: {
                color: bagColor[9],
                borderWidth:'0'
              }
            },
            {
              name: "人才",
              itemStyle: {
                color: bagColor[10],
                borderWidth:'0'
              }
            },
            {
              name: "项目",
              itemStyle: {
                color: bagColor[11],
                borderWidth:'0'
              }
            },
            {
              name: "平台",
              itemStyle: {
                color: bagColor[12],
                borderWidth:'0'
              }
            },
            {
              name: "奖励",
              itemStyle: {
                color: bagColor[13],
                borderWidth:'0'
              }
            },     {
              name: "产出",
              itemStyle: {
                color: bagColor[14],
                borderWidth:'0'
              }
            }
          ],
          links: that.linksData2
        },
        tooltip: {
          trigger: "item",
          // 2017 -- 交流：2
          formatter:function(params){
            if(params.dataType == 'edge' && params.data.isReal){
              return `${params.data.source} -- ${params.data.target}:${params.data.newValue}`
            }
          },
        }
      };
      myChart.setOption(option, true);
      myChart.hideLoading();
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/titlecss.less";
.CooperationTrackCon{
  height:340px;
  width:100%;
  .CooperationTrack {
    width: 100%;
    height: 320px;
    .CooperationTrackChart {
      width: 100%;
      height: 100%;
    }
  }
  .CooperationTrack2{
    margin:0 20px;
    height:340px;
    .tabDIv{
      height:320px;
      width:100%;
    }
  }
}

</style>
