<template>
  <div>
    <div class="titleDiv2">
      <div class="titleName">奖励</div>
      <div class="operating">
        <div class="centerDiv centerDiv1">
          <img :src="bagImg" alt="">
        </div>
        <div @click.stop="iconClick(1)" class="centerLeftDiv"></div>
        <div @click.stop="iconClick(2)" class="centerRightDiv"></div>
      </div>
    </div>
    <div  class="workExperience" v-if="isShowChart">
      <div v-if="newData.chart.length<=2" style="height: 60px;"></div>
      <ul data-v-e8d02020 class="ivu-timeline">
        <li v-if="newData.chart.length != 0" data-v-e8d02020 class="ivu-timeline-item" style="min-height: 31px!important;">
          <div class="ivu-timeline-item-tail" style="height: 29px!important;top: 0px;"></div>
        </li>
        <li data-v-e8d02020 class="ivu-timeline-item" v-for="(item,index) in newDataChart" :key="index">
          <div class="ivu-timeline-item-tail"></div>
          <div class="ivu-timeline-item-head ivu-timeline-item-head-blue"></div>
          <div class="ivu-timeline-item-content">
            <p data-v-e8d02020 class="time">{{item.year}}</p>
            <p data-v-e8d02020 class="content">{{item.content}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="workExperience2" v-else>
      <div class="tabDIv newTable2 newScrollbargray">
          <div class="tabletitle">青年科学家国际合作伙伴奖</div>
          <el-table
            :data="tableDataArr"
            style="width: 98%">
            <el-table-column
              v-for="(subitem,subindex) in tableTitleArr"
              :key="subindex"
              align="center"
              :prop="subitem"
              :label="subitem"
              min-width="220"
            >
            </el-table-column>
          </el-table>
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
        tableDetaultTitle:[
          {
            source:'',

          },

        ],

        newData:[],
        newDataChart:[],
        tableTitleArr:[],
        tableDataArr:[],
      }
    },
    props:{
      rewardData: {
        default: {}
      },
    },
    watch:{
      rewardData:{
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          this.newDataChart = JSON.parse(JSON.stringify(val.chart))

          this.newData = JSON.parse(JSON.stringify(val))
          let newTableData = []
          if(this.newData.table.length != 0){
            this.newData.table.forEach((item,index)=>{
              newTableData.push(item.detail)
            })
            this.tableDataArr = newTableData
            for(let item in newTableData[0]){
              this.tableTitleArr.push(item)
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
