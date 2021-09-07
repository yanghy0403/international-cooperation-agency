<template>
  <div>
    <div class="titleDiv2">
      <div class="titleName">学习</div>
      <div class="operating">
        <div class="centerDiv centerDiv1">
          <img :src="bagImg" alt="">
        </div>
        <div @click.stop="iconClick(1)" class="centerLeftDiv"></div>
        <div @click.stop="iconClick(2)" class="centerRightDiv"></div>
      </div>
    </div>
    <div class="workExperience" v-if="isShowChart">
      <div v-if="newStudyData.length<=2" style="height: 60px;"></div>

      <ul data-v-e8d02020 class="ivu-timeline">
        <li v-if="newStudyData.length != 0" data-v-e8d02020 class="ivu-timeline-item" style="min-height: 31px!important;">
          <div class="ivu-timeline-item-tail" style="height: 29px!important;top: 0px;"></div>
        </li>
        <li data-v-e8d02020 class="ivu-timeline-item" v-for="(item,index) in newStudyData" :key="index">
          <div class="ivu-timeline-item-tail"></div>
          <div class="ivu-timeline-item-head ivu-timeline-item-head-blue"></div>
          <div class="ivu-timeline-item-content">
            <p data-v-e8d02020 class="time">{{item.year}}</p>
            <p data-v-e8d02020 class="content" v-for="(subItem,subIndex) in item.content" :key="subIndex">{{subItem.name}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="workExperience2" v-else>
      <div class="tabDIv newTable2 newScrollbargray">
        <div v-for="(item,index) in tableDataArr" key="index">
          <div class="tabletitle">{{item.itemTableTitle}}</div>
          <el-table
            :data="item.itemTableBody"
            style="width: 98%">
            <el-table-column
              v-for="(subitem,subindex) in item.itemTableHead.length"
              key="subindex"
              align="center"
              :prop="item.itemTableHead[subindex]"
              :label="item.itemTableHead[subindex]"
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

        data:[
          {
            years:'2019',
            value:['获得CAS-TWAS院长奖学金'],
          },{
            years:'2018',
            value:['参加由中国科学院微生物研究所举办的“一带一路发展中国家微生物数据管理及应用培训班”' ]
          }
        ],
        data2:[
          {
            years:'2019',
            value:'获得CAS-TWAS院长奖学金',
          },{
            years:'2018',
            value:'参加由中国科学院微生物研究所举办的“一带一路发展中国家微生物数据管理及应用培训班”'
          }
        ],
        newStudyData:[],

        newworkData:[],
        tableTitleArr:[],
        tableDataArr:[],
      }
    },
    props :{
      learnData: {
        default: []
      },
      studytable: {
        default: {}
      },
    },
    watch:{
      learnData(val){
        this.newStudyData = val
      },
    },
    mounted(){
      this.newStudyData = this.learnData


      let newTableData = this.studytable.detail
      let tableTitleArr = []
      newTableData.forEach((item,index)=>{
        tableTitleArr.push(item.title)
      })
      this.tableTitleArr =   [...new Set(tableTitleArr)]
      this.tableTitleArr.forEach((item,index)=>{
        let itemData = {
          itemTableTitle:'',
          itemTableHead:[],
          itemTableBody:[],
        }
        this.tableDataArr.push(itemData)
      })
      newTableData.forEach((item,index)=>{
        let  indexOf = (this.tableTitleArr || []).findIndex((subitem) => subitem == item.title);
        this.tableDataArr[indexOf].itemTableBody.push(item.list[0])
        this.tableDataArr[indexOf].itemTableTitle = item.title
      })


      this.tableDataArr.forEach((item,index)=>{
        let data = item.itemTableBody[0]
        for (let subItem in data){
          item.itemTableHead.push(subItem)
        }
      })
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
<style lang="less">

</style>
<style lang="less" scoped>
@import "../../../assets/css/titlecss.less";
.workExperience{
  overflow-y: scroll !important;

  /*width:10px;*/
  /*height:10px;*/
  /*三角箭头的颜色*/
  scrollbar-arrow-color: rgba(0, 0, 0, 0) !important;
  /*滚动条滑块按钮的颜色*/
  scrollbar-face-color: rgba(0, 0, 0, 0)!important;
  /*滚动条整体颜色*/
  scrollbar-highlight-color: rgba(0, 0, 0, 0)!important;
  /*滚动条阴影*/
  scrollbar-shadow-color: rgba(0, 0, 0, 0)!important;
  /*滚动条轨道颜色*/
  scrollbar-track-color: rgba(0, 0, 0, 0)!important;
  /*滚动条3d亮色阴影边框的外观颜色——左边和上边的阴影色*/
  scrollbar-3dlight-color: rgba(0, 0, 0, 0)!important;
  /*滚动条3d暗色阴影边框的外观颜色——右边和下边的阴影色*/
  scrollbar-darkshadow-color: rgba(0, 0, 0, 0)!important;
  /*滚动条基准颜色*/
  scrollbar-base-color: rgba(0, 0, 0, 0)!important;
}
.workExperience::-webkit-scrollbar {
  width: 1px!important;
  /*height: 10px!important;*/
}

.workExperience::-webkit-scrollbar-track {
  background: rgba(0,0,0,0)!important;
  border-radius: 1px!important;
}

.workExperience::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0)!important;
  /*background: #cfd9e3;*/
  border-radius: 1px!important;
}

.workExperience::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0)!important;
}

.workExperience::-webkit-scrollbar-corner {
  background: rgba(0,0,0,0)!important;
}

.workExperience::-webkit-scrollbar-track {
  background: rgba(0,0,0,0)!important;
}
.workExperience {
  margin-left: 120px;
  margin-right:40px;
  height:310px;
  display: flex;
  align-items: center;
  ul {
    li {
      position: relative;
      padding: 0 0 12px;
      margin-left: 62px;
      min-height: 63px;
      .ivu-timeline-item-content{
        .time {
          position: absolute;
          left: -60px;
          top: 0;
          color: #6a7f9e;
          font-weight: bold;
        }
        .content{
          color: #6f6f6f;
          font-size: 14px;
          line-height:22px;
        }
        p:nth-of-type(1){
          margin-top:0px;
        }
        p:nth-of-type(2){
          margin-top:0px;
        }
        p{
          margin-top:10px;
        }
      }
      .ivu-timeline-item-head-blue {
        color: #6a7f9e;
        border-color: #6a7f9e;
      }
      .ivu-timeline-item-head {
        width: 10px;
        height: 10px;
        margin-top: 3px;

      }
      .ivu-timeline-item-tail {
        border-left: 0.005208rem solid #6a7f9e;
        left: 5px;
        opacity: 0.1;
      }

    }
    /deep/ .ivu-timeline-item:last-child .ivu-timeline-item-tail {
      height:39px!important;
      display:block!important;
    }
  }
}
.workExperience2 {
  margin:0 20px;
  height:330px;
  .tabDIv{
    height:310px;
    width:100%;
    overflow: auto;
    .tabletitle{
      line-height: 29px;
      font-size: 15px;
      font-weight: 600;
      margin:15px 0  5px;
    }
  }
}
</style>
