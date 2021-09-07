<template>
  <div>
    <div class="titleDiv">
      <div class="titleName">交流</div>
      <div class="operating">
        <div class="centerDiv centerDiv1">
          <img :src="bagImg" alt="">
        </div>
        <div @click.stop="iconClick(1)" class="centerLeftDiv"></div>
        <div @click.stop="iconClick(2)" class="centerRightDiv"></div>
      </div>
    </div>
    <div class="communicateContent">
      <div style="width: 100%;height: 100%;display: flex" v-show="isShowMap">
        <div class="leftCon">
          <div class="topCon">
            <div class="visitsNum">{{totalNum}}</div>
            <div class="visits">来访次数</div>
          </div>

          <div class="communicateTimes">
            <div class="communicateItem" v-for="(item,index) in communicateData" :key="index">
              <div class="communicateTitle">{{item.name}}</div>
              <div class="communicatenum">{{item.num}}</div>
              <div class="chartLength">
                <div :style="{width:(Number(item.num)/totalNum)*100+'%'}"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="rightCon">
          <div class="worldMap" ref="chainaMap" id="mapDiv"></div>
        </div>
      </div>
      <div class="tableDiv newTable newTablePerson newScrollbargray" v-show="!isShowMap"  style="">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            v-for="(item,index) in tableDataHead"
            :key="index"
            :prop="tableDetaultTitle[index].name"
            :label="tableDetaultTitle[index].name"
            :min-width="JSON.stringify(tableDetaultTitle[index].width)"
            align="center"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import "../../../assets/js/world_old";
  import "../../../../node_modules/echarts/map/js/china";

  const wordData = {"continent":"","geoCoordMap":{"泰国":["100.35","13.45"],"巴西":["312.45","-15.47"],"多哥":["1.2","6.09"],"斯威士兰":["31.06","-26.18"],"委内瑞拉":["293.42","10.3"],"克罗地亚":["15.58","45.5"],"尼日利亚":["7.32","9.05"],"新西兰":["174.46","-41.19"],"约旦":["35.52","31.57"],"朝鲜":["125.3","39.09"],"布隆迪":["29.18","-3.16"],"贝宁":["2.42","6.23"],"伊拉克":["44.3","33.2"],"挪威":["10.45","59.55"],"科特迪瓦":["-5.17","6.49"],"越南":["105.55","21.05"],"阿根廷":["300.0","-36.3"],"美国":["282.97818","38.53707"],"肯尼亚":["36.48","-1.17"],"乌兹别克斯坦":["69.1","41.2"],"韩国":["126.58","37.31"],"哥伦比亚":["286.0","4.34"],"德国":["13.25","52.3"],"吉尔吉斯斯坦":["74.46","42.54"],"埃塞俄比亚":["38.42","9.02"],"老挝":["102.36","17.58"],"印度":["77.13","28.37"],"英国":["-0.05","51.36"],"瑞士":["7.28","46.57"],"伊朗":["51.3","35.44"],"奥地利":["16.22","48.12"],"意大利":["12.29","41.54"],"白俄罗斯":["27.3","53.52"],"科摩罗":["43.16","-11.4"],"土耳其":["32.54","39.57"],"芬兰":["25.03","60.15"],"斯洛伐克":["17.07","48.1"],"阿尔及利亚":["3.08","36.42"],"比利时":["4.21","50.51"],"也门":["44.14","15.23"],"埃及":["31.14","30.01"],"尼日尔":["2.06","13.27"],"叙利亚":["36.19","33.3"],"拉脱维亚":["24.08","56.53"],"喀麦隆":["11.35","3.5"],"爱尔兰":["-6.15","53.21"],"澳大利亚":["149.08","-35.15"],"蒙古":["106.53","47.55"],"坦桑尼亚":["35.45","-6.08"],"丹麦":["12.34","55.41"],"塞尔维亚":["20.28","44.49"],"巴勒斯坦":["35.13","31.47"],"阿曼":["58.36","23.37"],"巴基斯坦":["73.1","33.4"],"古巴":["277.78","23.08"],"黎巴嫩":["35.31","33.53"],"尼泊尔":["85.2","27.45"],"罗马尼亚":["26.1","44.27"],"卢旺达":["30.04","-1.59"],"秘鲁":["283.0","-12.0"],"南苏丹":["31.36","4.51"],"厄瓜多尔":["281.65","-0.15"],"北马其顿":["21.26","42.01"],"以色列":["35.12","31.47"],"墨西哥":["260.9","19.2"],"希腊":["23.46","37.58"],"阿富汗":["69.11","34.28"],"亚美尼亚":["44.31","40.1"],"捷克":["14.25","50.05"],"保加利亚":["23.2","42.45"],"匈牙利":["19.05","47.29"],"刚果(金)":["15.18","4.18"],"圣马力诺":["12.3","43.55"],"波兰":["21.0","52.13"],"中国香港":["114.15","22.15"],"法国":["2.2","48.5"],"不丹":["89.45","27.31"],"俄罗斯":["37.35","55.45"],"斯里兰卡":["79.52","6.55"],"荷兰":["4.54","52.23"],"哈萨克斯坦":["71.3","51.1"],"塞拉利昂":["-13.17","8.3"],"斯洛文尼亚":["14.33","46.04"],"瑞典":["18.03","59.2"],"摩洛哥":["6.51","34.02"],"西班牙":["-3.45","40.25"],"缅甸":["96.2","16.45"],"乌克兰":["30.28","50.3"],"冰岛":["-21.57","64.1"],"智利":["289.6","-33.24"],"突尼斯":["10.11","36.5"],"塔吉克斯坦":["68.48","38.33"],"乌干达":["32.3","0.2"],"加拿大":["284.58","45.27"],"日本":["139.69","35.68"],"南非":["28.21101","-25.74068"],"爱沙尼亚":["24.48","59.22"],"马达加斯加":["47.31","-18.55"],"马来西亚":["101.41","3.09"],"葡萄牙":["-9.1","38.42"],"新加坡":["103.45","1.22"],"津巴布韦":["31.02","-17.43"],"孟加拉国":["90.26","23.43"]},"data":[{"name":"美国","value":636},{"name":"德国","value":270},{"name":"印度","value":242},{"name":"巴基斯坦","value":236},{"name":"英国","value":220},{"name":"法国","value":210},{"name":"日本","value":177},{"name":"俄罗斯","value":164},{"name":"澳大利亚","value":136},{"name":"意大利","value":117},{"name":"加拿大","value":110},{"name":"伊朗","value":56},{"name":"西班牙","value":56},{"name":"荷兰","value":55},{"name":"韩国","value":50},{"name":"埃及","value":46},{"name":"尼日利亚","value":43},{"name":"瑞典","value":42},{"name":"乌兹别克斯坦","value":40},{"name":"尼泊尔","value":40},{"name":"孟加拉国","value":35},{"name":"瑞士","value":33},{"name":"以色列","value":32},{"name":"比利时","value":31},{"name":"丹麦","value":27},{"name":"波兰","value":25},{"name":"泰国","value":24},{"name":"马来西亚","value":24},{"name":"巴西","value":21},{"name":"乌克兰","value":19},{"name":"新西兰","value":17},{"name":"希腊","value":15},{"name":"匈牙利","value":13},{"name":"埃塞俄比亚","value":13},{"name":"越南","value":13},{"name":"捷克","value":12},{"name":"新加坡","value":11},{"name":"罗马尼亚","value":11},{"name":"阿根廷","value":11},{"name":"土耳其","value":10},{"name":"奥地利","value":10},{"name":"斯里兰卡","value":10},{"name":"芬兰","value":10},{"name":"塔吉克斯坦","value":9},{"name":"摩洛哥","value":9},{"name":"葡萄牙","value":9},{"name":"克罗地亚","value":8},{"name":"喀麦隆","value":8},{"name":"南非","value":7},{"name":"哈萨克斯坦","value":7},{"name":"哥伦比亚","value":7},{"name":"墨西哥","value":7},{"name":"爱尔兰","value":7},{"name":"肯尼亚","value":7},{"name":"贝宁","value":6},{"name":"保加利亚","value":5},{"name":"智利","value":5},{"name":"白俄罗斯","value":5},{"name":"蒙古","value":5},{"name":"叙利亚","value":4},{"name":"古巴","value":4},{"name":"塞尔维亚","value":4},{"name":"委内瑞拉","value":4},{"name":"挪威","value":4},{"name":"斯洛伐克","value":4},{"name":"斯洛文尼亚","value":4},{"name":"秘鲁","value":4},{"name":"也门","value":3},{"name":"亚美尼亚","value":3},{"name":"坦桑尼亚","value":3},{"name":"塞拉利昂","value":3},{"name":"突尼斯","value":3},{"name":"缅甸","value":3},{"name":"冰岛","value":2},{"name":"卢旺达","value":2},{"name":"吉尔吉斯斯坦","value":2},{"name":"尼日尔","value":2},{"name":"斯洛伐克共和国","value":2},{"name":"津巴布韦","value":2},{"name":"苏丹","value":2},{"name":"不丹","value":1},{"name":"中国香港","value":1},{"name":"乌干达","value":1},{"name":"伊拉克","value":1},{"name":"刚果(金)","value":1},{"name":"北马其顿","value":1},{"name":"厄瓜多尔","value":1},{"name":"圣马力诺","value":1},{"name":"多哥","value":1},{"name":"巴勒斯坦","value":1},{"name":"布隆迪","value":1},{"name":"拉脱维亚","value":1},{"name":"斯威士兰","value":1},{"name":"朝鲜","value":1},{"name":"爱沙尼亚","value":1},{"name":"科摩罗","value":1},{"name":"科特迪瓦","value":1},{"name":"约旦","value":1},{"name":"老挝","value":1},{"name":"阿富汗","value":1},{"name":"阿尔及利亚","value":1},{"name":"阿曼","value":1},{"name":"马达加斯加","value":1},{"name":"黎巴嫩","value":1}],"continentLocation":{"亚洲":["89.45","27.31"],"大洋洲":["144.75485","13.47129"],"南美洲":["303.89","-34.53"],"非洲":["18.37","4.23"],"欧洲":["12.34","55.41"],"北美洲":["271.7","17.18"]},"offset":1,"pageSize":10,"year":"","source":"internationalPerson","type":null,"city":"","country":"","personType":"","subject":""}
  export default {
    data(){
      return{
        icon1:require('../../../assets/images/国际人才/图表模式.png'),
        icon2:require('../../../assets/images/国际人才/表格模式.png'),
        bagImg:require('../../../assets/images/国际人才/图表模式.png'),
        communicateData:[],
        isShowMap:true,
        tableData:[],
        tableDataHead:[],
        totalNum:0,
        chartData:[],
        chartgeoCoordMap:[],
        tableDetaultTitle:[
          {
            name:'年度',
            width:6,
          },{
            name:'项目编号',
            width:8,
          },{
            name:'被邀请人外文姓名',
            width:8,
          },{
            name:'性别',
            width:5,
          },{
            name:'出生日期',
            width:8,
          },{
            name:'到访机构',
            width:10,
          },{
            name:'邀请人姓名',
            width:6,
          },{
            name:'团组名称',
            width:12,
          },{
            name:'学科类别',
            width:8,
          },{
            name:'交流形式',
            width:6,
          },{
            name:'来访团组所属国别',
            width:8,
          },{
            name:'团长姓名',
            width:8,
          },{
            name:'团组人数',
            width:4,
          },{
            name:'拟在中科院访问日期',
            width:10,
          },
        ],
      }
    },
    props:{
      exchang:{
        default :{}
      },
      exchangetable:{
        default :{}
      },
    },
    watch:{
      exchang:{
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          this.$nextTick(()=>{
            this.getChangeData()
          })
        }
      },
    },
    mounted(){

    },
    methods:{
      getChangeData(){
        this.totalNum = 0
        this.communicateData = []
        if(this.exchang.data1){
          for(let i in this.exchang.data1){
            this.totalNum += Number(this.exchang.data1[i])
            this.communicateData.push({
              name:i,
              num:Number(this.exchang.data1[i])
            })
          }
        }
        if(this.exchang.data2){
          this.exchang.data2.forEach((item,index)=>{
            let num = 0
            item.dataInfo.forEach((subItem,subIndex)=>{
              subItem.list.forEach((subSubItem,subSubIndex)=>{
                num += Number(subSubItem.value)
              })
            })
            item.totalNum = num
            this.chartData.push({
              name:item.name,
              value:num
            })
            this.chartgeoCoordMap.push({
              name:item.name,
              value:item.latandlog
            })
          })
        }

        if(this.exchangetable.detail.length != 0){
          this.exchangetable.detail.forEach((item,index)=>{
            this.tableData.push(item.list[0])
          })
          let headData = this.exchangetable.detail[0].list[0]
          for(let subItem in headData){
            this.tableDataHead.push(subItem)
          }
        }
        this.$nextTick(() => {
          this.handleCHWWorldMap();
        });
      },

      iconClick(val){
        if(val == 1){
          this.bagImg = this.icon1
          this.isShowMap = true
        }else{
          this.bagImg = this.icon2
          this.isShowMap = false
        }
      },
      handleCHWWorldMap() {
        let that = this
        var myChart_s = this.$echarts.init(this.$refs.chainaMap);
        myChart_s.showLoading();
        let data = this.chartData
        let  geoCoordMap = this.chartgeoCoordMap
        var convertData = function(data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            // var geoCoord = geoCoordMap[data[i].name];
            var geoCoord = geoCoordMap.filter(item=>item.name == data[i].name)[0].value
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
                symbolSize:data[i].value*8>30?30:data[i].value*8,
              });
            }
          }
          return res;
        };
        let option = {
          backgroundColor: "#d9dbdf",
//          backgroundColor: "#a4aec2",
          tooltip: {
            trigger:'item',
            position:'left',
            alwaysShowContent: true,
            axisPointer:{
              type:'line',
              lineStyle:{color:'#6d788d',}
            },
            backgroundColor:'rgba(217,219,223,0.85)',
            formatter:function(params){
              let index = (params.seriesIndex)
              if(index ==0){
                let valueData = that.exchang.data2.filter(item=>item.name == params.data.name)[0].dataInfo
                let subData = ''
                valueData.forEach((item,index)=>{
                  let itemVal = ``
                  item.list.forEach((subItem,subIndex)=>{
                    itemVal+=  "<div style='display: flex;width: 140px;line-height: 18px;'>"+
                                  "<span style='width: 126px;text-align: left;word-break:break-all;white-space:pre-wrap'>"+subItem.name+"</span><br/>"+
                                  "<div style='width: 14px;text-align: right;'>"+subItem.value+"</div><br/>"+
                                "</div>"
                  })
                  subData += `<div  style="display:flex;font-size: 10px;width: 208px;">
                                <div style="width: 66px">${item.name}</div>
                                <div style="width: 140px;">
                                  ${itemVal}
                                </div>
                              </div>
                              `
                })
                let data = `
                            <div style="padding: 15px;color:#6d788d">
                              ${subData}
                            </div>
                          `
                return data;
              }
            },
          },
          geo: {
            map: "china",
            zoom: 1.2,
            layoutCenter: ["45%", "45%"], //地图位置
            layoutSize: "230%",
            label: {
              normal: {
                show: true,
                color: "#030303"
              },
              emphasis: {
                show: false,
                color: "#292929"
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: "#f8f9f8",
//                areaColor: "#bcc3d1",
                borderColor: "#c2c7cd",
                borderWidth:1,
              },
              emphasis: {
                areaColor: "#f8f9f8",
                opacity: 1
              }
            }
          },
          series: [
            {
              name: "供需占比",
              type: "effectScatter",
              coordinateSystem: "geo",
              data: convertData(data),
              symbolSize: 12,
              showEffectOn: "render",
              rippleEffect: {
                scale: 5,
                brushType: "stroke"
              },
              label: {
                normal: {
                  formatter: "{b}",
                  position: "right",
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  show: true,
                  color: "#ff3925",
                  shadowBlur: 5,
                  shadowColor: "#000",
                  opacity: 0.8
                }
              }
            },
            {
              type: "map",
              mapType: "china",
              geoIndex: 0,
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    color: "#030303"
                  }
                },
                emphasis: {
                  label: {
                    show: true
                  }
                }
              },

              data: data
            }
          ]
        };

        myChart_s.setOption(option, true);
        window.onresize = () => {
          myChart_s.resize();
        };
        myChart_s.hideLoading();
      },
    },
  }
</script>

<style lang="less" scoped>
@import "../../../assets/css/titlecss.less";
.communicateContent{
  height:450px;
  margin: 0 20px;
  display: flex;
  background: #eaebee;
  /*background: #eaebee;*/
  .tableDiv{
    width: 100%;
    height: 450px;
    overflow: auto;
  }
  .leftCon{
    height:450px;
    width:284px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .topCon{
      height: 141px;
      .visitsNum{
        height:51px;
        line-height:51px;
        font-size: 46px;
        font-weight: normal;
        font-stretch: normal;
        color: #ff3925;
        margin-top:58px;
        margin-left: 43px;
        width: 65px;
        text-align: center;
      }
      .visits{
        height:32px;
        line-height:32px;
        margin-left: 43px;
        width: 65px;
        font-size: 16px;
        font-stretch: normal;
        color: #393939;
        font-weight: 600;
      }
    }

    .communicateTimes{
      min-height:192px;
      width:100%;
      /*margin-top:76px;*/
      .communicateItem{
        height:32px;
        width:100%;
        line-height:32px;
        display: flex;
        .communicateTitle{
          width:110px;
          height:32px;
          line-height:32px;
          margin-left: 43px;
          color: #6f6f6f;
          text-align: left;
          font-size: 14px;
        }
        .communicatenum{
          width:20px;
          height:32px;
          line-height:32px;
          color: #6f6f6f;
          text-align: right;
          font-size: 14px;
        }
        .chartLength{
          margin-left:12px;
          margin-right:10px;
          flex:1;
          height:32px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          div{
            height:4px;
            background: #ff3925;
          }
        }
      }
    }
  }
  .rightCon{
    height:450px;
    flex:1;
    .worldMap{
      width:100%;
      height:100%;
    }
  }
}
</style>
