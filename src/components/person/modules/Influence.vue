<template>
  <div class="InfluenceChartDiv">
    <div class="InfluenceChart" ref="InfluenceChart"></div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      chartsData:{},
      toolTipData:[],
      toolflashback:[],
      sunburstData:[],
    };
  },
  props:['personName' , 'personUniqueId'],
  mounted() {
    this.$nextTick(() => {
      this.handleInfluence();
      // this.getData()
    });
  },
  methods: {
    getData(){
      return new Promise((resolve,reject)=>{
        let params =
          'name='+this.personName +
          '&uniqueId='+this.personUniqueId
        this.axios.get(`/person/international/leida?${params}`)
          .then(res => {
            if (res.data.code == 200) {
              this.chartsData  = (res.data.data)
              this.toolTipData = this.chartsData.indicator.map(item =>{return item.name})
              let toolflashback = this.chartsData.indicator.map(item =>{return item.name})
              let arr1 =  toolflashback.slice(0,1)
              let arr2 =  toolflashback.slice(1,6).reverse()
              let newArr = arr1.concat(arr2);
              this.toolflashback =  newArr
              this.toolflashback.forEach((item,index)=>{
                let sunburstItem = {}
                sunburstItem =  {
                    name: item,
                    value: 4,
                    label: {
                      position: 'inside',
                      rotate: 'tangential',
                      color:'#5b6e8a'
                    },
                    itemStyle: {
                      color: '#0e1d32',
                      borderColor :'#0e1d32'
                    }
                  }
                  this.sunburstData.push(sunburstItem)
              })
              resolve(true)
            }
          }).catch((err) => {
          reject(err)
        });
      })
    },

    async handleInfluence() {
      let that = this
      let result = await that.getData()
      if(result){
        let myChart = this.$echarts.init(this.$refs.InfluenceChart),
             _this = this;
        myChart.showLoading();
        let option = {
          backgroundColor: '#1f2e45',
          tooltip: {
            trigger:'item',
            position:'right',
            axisPointer:{
              type:'line',
              lineStyle:{color:'#333',}
            },
            backgroundColor:'rgba(51,51,51,0.7)',
            formatter:function(params){
              let index = (params.seriesIndex)
              if(index ==0){
                // let valueData = ['交流','产出','工作','奖励','项目','学习',]
                let valueData = _this.toolTipData
                let subData = ''
                params.data.forEach((item,index)=>{
                  subData += `<div  style="text-align: left;line-height:25px;font-size: 12px;">
                                ${valueData[index]}：${item}
                              </div>`
                })
                let data = `
              <div style="padding: 15px">
                <!--<div style="text-align: left;line-height:30px;font-size: 14px;">人员影响力:</div>-->
                ${subData}
              </div>

            `
                return data;
              }
            },
          },
          legend: {
            show: false
          },
          radar: {
            center: ["50%", "50%"],
            radius: "40",
            startAngle: 90,
            splitNumber: 5,
            shape: "circle",
            splitArea: {
              areaStyle: {
                color: ["transparent"]
              }
            },
            axisLabel: {
              show: false,
              fontSize: 12,
              color: "#5b6e8a",
              fontStyle: "normal",
              fontWeight: "normal"
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#5b6e8a",

              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#5b6e8a"
              }
            },
            indicator:_this.chartsData.indicator,
            // indicator:
            //   [
            //   {
            //     name: "交流",
            //     max: 100
            //   },
            //   {
            //     name: "产出",
            //     max: 100
            //   },
            //   {
            //     name: "工作",
            //     max: 100
            //   },
            //   {
            //     name: "奖励",
            //     max: 100
            //   },
            //   {
            //     name: "项目",
            //     max: 100
            //   },
            //   {
            //     name: "学习",
            //     max: 100
            //   }
            // ],
            name:{
              textStyle:{color:'rgba(0,0,0,0)'}
            }
          },
          series: [
            {
              name: "",
              type: "radar",
              symbol: "circle",
              symbolSize: 5,
              areaStyle: {
                normal: {
                  color: "rgba(255,58,37, 0.4)"
                }
              },
              // data: [[70, 0, 0, 50, 0, 100]]
              data: _this.chartsData.indicatorData
            },
            {
              type: 'sunburst',
              center: ['50%', '50%'],
              nodeClick: false,
              highlightPolicy: 'none',
              startAngle:120, //起始角度
              levels: [{},
                {
                  r0: '65%',
                  r: '100%',
                }
              ],
              data:_this.sunburstData
              // data: [
              //   {
              //   name: '交流',
              //   value: 4,
              //   label: {
              //     position: 'top',
              //     rotate: 'tangential',
              //     color:'#5b6e8a',
              //   },
              //   itemStyle: {
              //     color: '#0e1d32',
              //     borderColor :'#0e1d32'
              //   },
              //   emphasis:{
              //     label:{
              //       show:false
              //     }
              //   }
              // },
              //   {
              //     name: '产出',
              //     value: 4,
              //     label: {
              //       position: 'inside',
              //       rotate: 'tangential',
              //       color:'#5b6e8a'
              //     },
              //     itemStyle: {
              //       color: '#0e1d32',
              //       borderColor :'#0e1d32'
              //     }
              //   },
              //   {
              //     name: '工作',
              //     value: 4,
              //     label: {
              //       position: 'inside',
              //       rotate: 'tangential',
              //       color:'#5b6e8a'
              //     },
              //     itemStyle: {
              //       color: '#0e1d32',
              //       borderColor :'#0e1d32'
              //     }
              //   },
              //   {
              //     name: '奖励',
              //     value: 4,
              //     label: {
              //       position: 'inside',
              //       rotate: 'tangential',
              //       color:'#5b6e8a'
              //     },
              //     itemStyle: {
              //       color: '#0e1d32',
              //       borderColor :'#0e1d32'
              //     }
              //   },     {
              //     name: '项目',
              //     value: 4,
              //     label: {
              //       position: 'inside',
              //       rotate: 'tangential',
              //       color:'#5b6e8a'
              //     },
              //     itemStyle: {
              //       color: '#0e1d32',
              //       borderColor :'#0e1d32'
              //     }
              //   },     {
              //     name: '学习',
              //     value: 4,
              //     label: {
              //       position: 'inside',
              //       rotate: 'tangential',
              //       color:'#5b6e8a'
              //     },
              //     itemStyle: {
              //       color: '#0e1d32',
              //       borderColor :'#0e1d32'
              //     }
              //   },
              // ],

            }
          ]
        };
        myChart.setOption(option, true);
        myChart.hideLoading();
      }

    }
  }
};
</script>

<style lang="less" scoped>
  .InfluenceChartDiv{
    width: 100%;
    height: 100%;
    background: #0f1d33;
    border-radius: 160px;
    .InfluenceChart {
      width: 100%;
      height: 100%;

    }
  }

</style>
