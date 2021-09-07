<template>
  <div class="exchangeCon">
    <div class="ex-left">
      <div class="ex-logo">
        <img src="../../assets/images/国际人才/页面固定内容/logo.png" alt />
        <p>中国科学院国际合作</p>
        <p>数据汇交与分析平台</p>
      </div>
      <div class="exTitle">人员交流</div>
      <div class="ex-nav">
        <div  class="navActive"><router-link tag="li" to="/exchange">查询与检索</router-link></div>
        <div><router-link tag="li" to="/mutualVisits">互访</router-link></div>
        <div><router-link tag="li" to="/importVisit">出访</router-link></div>
        <div><router-link tag="li" to="/exportVisit">来访</router-link></div>
      </div>
      <div class="ex-btm" @click="handleClose">
        <div class="iconfontClose">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="closeName">返回首页</div>
      </div>
    </div>
    <div class="ex-right">
      <div class="fr-reel fr-reel-index" >
        <div class="fr-reel-left" style="width: 100%;">
          <div class="fr-reelHeader">
            <div class="reel-tabs">
              <p @click="mode=0" :class="{modeActive:mode==0}">自由模式</p>
              <p @click="mode=1" :class="{modeActive:mode==1}">条件模式</p>
              <div class="lock">
                <img v-if="mode==0" src="../../assets/images/国际人才/自由模式示意符.png" alt />
                <img v-else style="width:12px;" src="../../assets/images/国际人才/条件模式示意符.png" alt />
              </div>
            </div>
            <div class="reel-filterCondition_0" v-show="mode==0">
              <ul>
                <li>
                  院内机构
                  <i class="iconfont icon-iconfontjiantou"></i>
                </li>
                <li>
                  全年份
                  <i class="iconfont icon-iconfontjiantou"></i>
                </li>
                <li>
                  大洲
                  <i class="iconfont icon-iconfontjiantou"></i>
                </li>
                <li>
                  国家
                  <i class="iconfont icon-iconfontjiantou"></i>
                </li>
                <li>
                  城市
                  <i class="iconfont icon-iconfontjiantou"></i>
                </li>
                <li>
                  国外机构
                  <i class="iconfont icon-iconfontjiantou"></i>
                </li>
                <li>
                  学科
                  <i class="iconfont icon-iconfontjiantou"></i>
                </li>
                <li>
                  交流类型
                  <i class="iconfont icon-iconfontjiantou"></i>
                </li>
                <li>
                  人员
                  <i class="iconfont icon-iconfontjiantou"></i>
                </li>
              </ul>
            </div>
            <div class="reel-filterCondition_1" v-show="mode==1">
              <ul>
                <li class="reel-filterCondition_1_li">
                  <Select
                    v-model="params['orgSelect']"
                    multiple
                    tag="2"
                    placeholder="院内机构"
                    @on-change="handleChange(1)"
                  >
                    <Option
                      v-for="item in orgAll"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </li>
                <li class="reel-filterCondition_1_li">
                  <Select
                    v-model="params['yearSelect']"
                    multiple
                    tag="2"
                    placeholder="全年份"
                    @on-change="handleChange(2)"
                  >
                    <Option
                      v-for="item in yearAll"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </li>
                <li class="reel-filterCondition_1_li">
                  <Select
                    v-model="params['continentSelect']"
                    @on-change="handleChange(3)"
                    clearable
                    filterable
                    placeholder="大洲"
                  >
                    <Option
                      v-for="item in continentAll"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </li>
                <li class="reel-filterCondition_1_li">
                  <Select
                    v-model="params['countrySelect']"
                    @on-change="handleChange(4)"
                    clearable
                    filterable
                    placeholder="国家"
                  >
                    <Option
                      v-for="item in countriesAll"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </li>
                <li class="reel-filterCondition_1_li">
                  <Select
                    v-model="params['citySelect']"
                    @on-change="handleChange(5)"
                    clearable
                    filterable
                    placeholder="城市"
                  >
                    <Option
                      v-for="item in cityAll"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </li>
                <li class="reel-filterCondition_1_li">
                  <Select
                    v-model="params['foreignOrgSelect']"
                    @on-change="handleChange(6)"
                    clearable
                    filterable
                    placeholder="国外机构"
                  >
                    <Option
                      v-for="item in foreignOrgAll"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </li>
                <li class="reel-filterCondition_1_li">
                  <Select
                    v-model="params['subjectSelect']"
                    @on-change="handleChange(7)"
                    clearable
                    filterable
                    placeholder="学科"
                  >
                    <Option
                      v-for="item in subjectAll"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </li>
                <li class="reel-filterCondition_1_li">
                  <Select
                    v-model="params['communicationTypeSelect']"
                    @on-change="handleChange(8)"
                    clearable
                    filterable
                    placeholder="交流类型"
                  >
                    <Option
                      v-for="item in communicationTypeAll"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </li>
                <li class="reel-filterCondition_1_li">
                  <Select
                    v-model="params['personSelect']"
                    @on-change="handleChange(9)"
                    clearable
                    filterable
                    placeholder="人员"
                  >
                    <Option
                      v-for="item in personAll"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </li>
              </ul>
            </div>

            <div  class="reel-filterBtns">筛选</div>

            <div @click="handleTopicEmptys"  class="reel-emptys iconfont icon-fanhui1"></div>

            <div  class="reel-DownloadAlls iconfont icon-xiazai"></div>
          </div>
          <div class="exchange-center">
            <div ref="mapDiv" class="mapDiv" :style="{background:toShowMap?'#a4aec2':'#fff'}">
              <div class="mapTitle">
                <div class="titleNavDiv">
                  <div class="navCon">
                    <div @click="changeType(1)">出访模式</div>
                    <div @click="changeType(2)">互访模式</div>
                    <div @click="changeType(3)">来访模式</div>
                  </div>
                  <div :style="{left: typeSelectLeft+'px'}"  class="selectDiv">{{typeSelectVal}}</div>
                </div>
                <div class="rightIcon">
                  <div v-if="toShowMap" class="bag bag1"><img :src="iconMap" alt=""></div>
                  <div v-else class="bag bag2"><img :src="iconTable" alt=""></div>
                  <div class="clickIcon clickLeft" @click="showMap(1)"></div>
                  <div class="clickIcon clickRight" @click="showMap(2)"></div>
                </div>
              </div>
              <div class="mapCenter" :style="{height:mapCenterHeight+'px'}" v-show="toShowMap">
                <div ref="worldMap" id="mapChart" style="width: 100%;height: 100%;"></div>
                <!--<div class="mapPoint mapPoint1" :style="pointStyle1" ></div>-->
                <!--<div class="mapPoint mapPoint2" :style="pointStyle2"></div>-->
              </div>
              <div class="mapCenter" :style="{height:mapCenterHeight+'px'}"  v-show="!toShowMap">
                <div class="tableDiv newScrollbar">
                  <table>
                    <thead>
                    <tr>
                      <th v-for="(item,index) in tableTitle" :key="index">{{item}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,i) in tableData" :key="i">
                      <td v-for="(value,key,index) in item" :key="index">{{value}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="mapBottom">
                <div class="mapBottomCenter">
                  <div>年份：2011-2019</div>
                  <div>全院互访累计人次：298618</div>
                  <div>项目累计：17673</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import "@/assets/js/world_old";
  import mapData from '@/assets/css/exchange/china.json'
  import linksData from '@/assets/css/exchange/linesData.json'
  import tableData from '@/assets/json/exchange/indexTable.json'
  export default {
    data(){
      return{
        mode:0,
        typeSelectLeft:100,
        typeSelectVal:'互访模式',
        toShowMap:true,
        iconMap:require('@/assets/images/国际人才/图表模式.png'),
        iconTable:require('@/assets/images/国际人才/表格模式.png'),
        params:{
          orgSelect:'',  //院内机构
          yearSelect:'', //年份
          continentSelect:'', //大洲
          countrySelect:'', //国家
          citySelect:'', //城市
          foreignOrgSelect:'', //国外机构
          subjectSelect:'', //学科
          communicationTypeSelect:'', //交流类型
          personSelect:'', //人员
        },
        tooltipData:{},
        pointStyle1:'',
        pointStyle2:'',
        yearAll:[
          {
            value:2010,
            label:2010,
          }, {
            value:2011,
            label:2011,
          },
        ],
        orgAll:[
          {
            value:'机构1',
            label:'机构1',
          }, {
            value:'机构2',
            label:'机构2',
          },
        ],
        continentAll:[
          {
            value:'亚洲',
            label:'亚洲',
          }, {
            value:'非洲',
            label:'非洲',
          }, {
            value:'北美洲',
            label:'北美洲',
          }, {
            value:'南美洲',
            label:'南美洲',
          }, {
            value:'欧洲',
            label:'欧洲',
          }, {
            value:'南极洲',
            label:'南极洲',
          }, {
            value:'大洋洲',
            label:'大洋洲',
          },
        ],
        countriesAll:[
          {
            value:'中国',
            label:'中国',
          }, {
            value:'美国',
            label:'美国',
          }, {
            value:'德国',
            label:'德国',
          }
        ],
        cityAll:[
          {
            value:'北京',
            label:'北京',
          }, {
            value:'上海',
            label:'上海',
          }, {
            value:'香港',
            label:'香港',
          }
        ],
        foreignOrgAll:[
          {
            value:'牛津大学',
            label:'牛津大学',
          }, {
            value:'麻省理工大学',
            label:'麻省理工大学',
          },
        ],
        subjectAll:[
          {
            value:'电子信息',
            label:'电子信息',
          }, {
            value:'地球科学',
            label:'地球科学',
          },
        ],
        communicationTypeAll:[
          {
            value:'国际人才',
            label:'国际人才',
          }, {
            value:'劳务派遣',
            label:'劳务派遣',
          },
        ],
        personAll:[
          {
            value:'高级人才',
            label:'高级人才',
          }, {
            value:'长江学者',
            label:'长江学者',
          },
        ],

        tableData:tableData,  //table的数据
        tableTitle:['key1','key2','key3','key4','key5','key6','key7','key8',],
        mapCenterHeight:'',
      }
    },
    mounted(){
      this.handleWorldMap()
      let height = this.$refs.mapDiv.clientHeight
      this.mapCenterHeight = height-105
    },
    computed:{

    },
    methods:{
      handleChange(val){

      },
      changeType(val){
        if(val == 1){
          this.typeSelectLeft = 0
          this.typeSelectVal = '出访模式'
        }else if(val == 2){
          this.typeSelectLeft = 100
          this.typeSelectVal = '互访模式'
        }else if(val == 3){
          this.typeSelectLeft = 200
          this.typeSelectVal = '来访模式'
        }
      },
      showMap(val){
        if(val == 1 && this.toShowMap == false){
          this.toShowMap = true
          //console.log('改变模式成功')
        }
        if(val == 2 && this.toShowMap == true){
          this.toShowMap = false
          //console.log('改变模式成功')
        }
      },

      handleWorldMap(){
        var myChart = this.$echarts.init(this.$refs.worldMap),
          that = this;
        myChart.showLoading();
        let series = [];
        let data = mapData
        data.forEach((item,index)=>{
          series.push(
            {
              type: 'lines',
              zlevel: 2,
              tooltip: {
                show:true,
                backgroundColor: "rgba(255,255,255,0)",

              },
              hoverAnimation: true ,
              lineStyle: {
                normal: {
                  width:1, //尾迹线条宽度
                  opacity: .5, //尾迹线条透明度
                  curveness: 0.2, //尾迹线条曲直度
                  color: function(params) { //圆环显示文字
                    return '#ff3a25'
                  },
                },
                color: 'red'
              },
              data: item
            },
          );

        })


        let option = {
          backgroundColor: "#a4aec2",
          tooltip: {
            backgroundColor: "rgba(255,255,255,0)",
            formatter: (params) => {
              //(params)
              let mapTop = 92.9
              let mapLeft = -64.4
              let mapDivWidth = this.$refs.worldMap.clientWidth
              let mapDivHeight= this.$refs.worldMap.clientHeight
              let point1Left = (Number(params.data.coords[0][0])-(mapLeft))/451.9*mapDivWidth
              let point1Top = ((mapTop)-Number(params.data.coords[0][1]))/158.2*mapDivHeight
              that.pointStyle1 = `left:${point1Left}px;top:${point1Top}px`

              let point2Left = (Number(params.data.coords[1][0])-(mapLeft))/451.9*mapDivWidth
              let point2Top = ((mapTop)-Number(params.data.coords[1][1]))/158.2*mapDivHeight
              that.pointStyle2 = `left:${point2Left}px;top:${point2Top}px`


              let tooltipData = linksData.filter(item=>item.id == params.data.id)[0]
              that.tooltipData = tooltipData
              let tipHtml =
                "<div style='padding:26px;background:#48546d; opacity: 0.85;border-radius: 12px;'>"+tooltipData.content[0]+"</div>";
              return tipHtml;
            },
          },
          geo: [
            {
              map: "world_old",
              zoom: 1.1,
              label: {
                emphasis: {
                  show: true,
                },
              },
              // center: [133.126178,-23.106448],
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
                  areaColor: "#bcc3d1",
                  // opacity: 0.5,
                },
              },
            },
          ],
          series:[...series] ,
        };
        myChart.setOption(option, true);
        myChart.hideLoading();
      },


      //条件清空
      handleTopicEmptys(){
        this.params = {
          orgSelect:'',  //院内机构
          yearSelect:'', //年份
          continentSelect:'', //大洲
          countrySelect:'', //国家
          citySelect:'', //城市
          foreignOrgSelect:'', //国外机构
          subjectSelect:'', //学科
          communicationTypeSelect:'', //交流类型
          personSelect:'', //人员
        }
      },

      // 返回首页
      handleClose() {
        this.$router.push({ path: "/" });
      },
    },
  }
</script>
<style lang="less" scoped>
  @import "../../assets/css/exchange/index.less";
  .exchangeCon{
    .exchange-center{
      width: 100%;
      flex: 1;
      margin: 10px 0 40px 0;
      .mapDiv{
        height: 100%;
        background: #a4aec2;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        .mapTitle{
          width: 100%;
          height: 63px;
          background: transparent;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          .titleNavDiv{
            width:320px ;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            .navCon{
              height: 30px;
              display: flex;
              div{
                height: 30px;
                width: 100px;
                text-align: center;
                line-height: 30px;
                color: #6e727c;
                font-size: 14px;
                background: #d3d6dd;
                cursor: pointer;
              }
            }
            .selectDiv{
              position: absolute;
              top: 0;
              z-index: 50;
              height: 40px;
              width: 120px;
              color: #fff;
              text-align: center;
              line-height: 40px;
              font-size: 20px;
              background: red;
            }
          }
          .rightIcon{
            position: absolute;
            width: 44px;
            height: 22px;
            top: 25px;
            right: 20px;
            .bag{
              position: absolute;
              left: 0;
              top: 0;
              width: 44px;
              height: 22px;
              z-index: 1;
              img{
                width: 100%;
                height: 100%;
                float: left;
              }
            }
            .clickIcon{
              width: 22px;
              height: 22px;
              position: absolute;
              z-index: 5;
              cursor: pointer;
              top: 0;
            }
            .clickLeft{
              left: 0;
            }
            .clickRight{
              left: 22px;
            }
          }
        }
        .mapCenter{
          flex: 1;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          .tableDiv{
            width: 100%;
            height: 95%;
            overflow-y: scroll;
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
          .mapPoint{
            position: absolute;
            background: red;
            width: 10px;
            height: 10px;
            border-radius: 50px;
          }
          .mapPoint1{
            top: 0;
            left: 0;
          }
          .mapPoint2{
            bottom: 0;
            left: 0;
          }
        }
        .mapBottom{
          height: 42px;
          width: 100%;
          line-height: 42px;
          display: flex;
          justify-content: center;
          .mapBottomCenter{
            width: 520px;
            display: flex;
            div{
              height: 42px;
              line-height: 42px;
              color: #545963;
              font-size: 14px;

            }
            div:nth-of-type(1){
              width: 150px;
              text-align: left;
            }
            div:nth-of-type(2){
              width: 220px;
              text-align: center;
            }
            div:nth-of-type(3){
              width: 150px;
              text-align: right;
            }
          }

        }
      }
    }
  }
</style>
