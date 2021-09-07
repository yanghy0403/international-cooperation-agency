<template>
  <div>
    <div class="titleDiv2">
      <div class="titleName">人才</div>
      <div class="operating">
        <div class="centerDiv centerDiv1">
          <img :src="bagImg" alt="">
        </div>
        <div @click.stop="iconClick(1)" class="centerLeftDiv"></div>
        <div @click.stop="iconClick(2)" class="centerRightDiv"></div>
      </div>
    </div>
    <div class="workExperience " v-if="isShowChart">
      <div v-if="chartData.length<=2" style="height: 60px;"></div>

      <ul data-v-e8d02020 class="ivu-timeline">
        <li v-if="chartData.length != 0" data-v-e8d02020 class="ivu-timeline-item" style="min-height: 31px!important;">
          <div class="ivu-timeline-item-tail" style="height: 29px!important;top: 0px;"></div>
        </li>
        <li data-v-e8d02020 class="ivu-timeline-item" v-for="(item,index) in chartData" :key="index">
          <div class="ivu-timeline-item-tail"></div>
          <div class="ivu-timeline-item-head ivu-timeline-item-head-blue"></div>
          <div class="ivu-timeline-item-content">
            <p data-v-e8d02020 class="time">{{item.year}}</p>
            <p data-v-e8d02020 class="content" v-for="(subItem,subIndex) in item.content" :key="subIndex">{{subItem}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="workExperience2" v-else>
      <div class="tabDIv newTable2 newScrollbargray">
        <div v-if="internationtableDataArr.length != 0">
          <div class="tabletitle">国际人才</div>
          <el-table
            :data="internationtableDataArr"
            style="width: 98%;">
            <el-table-column
              v-for="(subitem,subindex) in tableDetaultTitle[0]['titleList']"
              key="subindex"
              align="center"
              :prop="subitem"
              :label="subitem"
              min-width="150"
            >
            </el-table-column>
          </el-table>
        </div>

        <div v-if="taiWantableDataArr.length != 0">
          <div class="tabletitle">台湾青年人才</div>
          <el-table
            :data="taiWantableDataArr"
            style="width: 98%">
            <el-table-column
              v-for="(subitem,subindex) in tableDetaultTitle[1]['titleList']"
              key="subindex"
              align="center"
              :prop="subitem"
              :label="subitem"
              min-width="150"
            >
            </el-table-column>
          </el-table>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        icon1:require('../../../assets/images/国际人才/图表模式.png'),
        icon2:require('../../../assets/images/国际人才/表格模式.png'),
        bagImg:require('../../../assets/images/国际人才/图表模式.png'),
        isShowChart:true,
        data2:[
          {
            years:'2019',
            value:'由中国科学院合肥物质科学研究院推荐，申请获得国际人才计划立项，类别为访问学者',
          },{
            years:'2018',
            value:'以实验室主任身份参与中国科学院南京土壤研究所与香港浸会大学合建的土壤与环境联合开放实验室 由中国科学院计算机网络信息中心推荐，申请获得台湾青年人才计划立项'
          },{
            years:'2017',
            value:'在中国科学院合肥物质科学研究院工作过2个月'
          },{
            years:'2016',
            value:'在中国科学院合肥物质科学研究院工作过6个月'
          },
        ],
        tableDetaultTitle:[
          {
            source:'国际人才',
            index:0,
            titleList:[],
          },
          {
            source:'台湾青年人才',
            index:1,
            titleList:[],
          },
        ],
        newworkData:[],
        tableTitleArr:[],
        taiWantableDataArr:[],   //台湾人才
        internationtableDataArr:[],  //国际人才
        chartData:[],  //图标人才
      }
    },
    props:{
      talentData: {
        default: {}
      },
    },
    watch:{
      talentData:{
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          this.newworkData = val
          let originChartData = (this.newworkData.chart)
          //处理chart数据
          let yearArr = []
          let chartData = []
          originChartData.forEach((item,index)=>{
            yearArr.push(item.year)
          })
          yearArr = [...new Set(yearArr)]
          yearArr.reverse()
          yearArr.forEach((item,index)=>{
            let newdata = []
            originChartData.forEach((subItem,subIndex)=>{
              if(subItem.year == item){
                newdata.push(subItem)
              }
            })
            let dataArr = []
            newdata.forEach((thirditem,thirdindex)=>{
              dataArr.push(thirditem.content)
            })
            chartData.push({
              year:item,
              content:dataArr
            })
          })
          this.chartData = chartData

          //    处理table数据
          if(this.newworkData.table.internationPerson){
            this.newworkData.table.internationPerson.forEach((item,index)=>{
              this.internationtableDataArr.push(item.detail)
            })
            for(let item in this.internationtableDataArr[0]){
              this.tableDetaultTitle[0].titleList.push(item)
            }

          }
          if(this.newworkData.table.taiWanPerson){
            this.newworkData.table.taiWanPerson.forEach((item,index)=>{
              this.taiWantableDataArr.push(item.detail)
            })

            for(let item in this.taiWantableDataArr[0]){
              this.tableDetaultTitle[1].titleList.push(item)
            }
          }
        }
      },
    },
    mounted(){


    },



    methods:{
      iconClick(val){
        if(val == 1){
          this.bagImg = this.icon1
          this.isShowChart = true
        }else{
          this.bagImg = this.icon2
          this.isShowChart = false
        }
      },
    },
  }
</script>

<style lang="less" scoped>
@import "../../../assets/css/titlecss.less";
@import "../../../assets/css/exchange/details.less";

</style>
