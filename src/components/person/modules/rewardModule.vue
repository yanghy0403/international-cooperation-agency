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
    <div class="workExperience" v-if="isShowChart">
      <div class="ulLeftDiv"></div>

      <ul data-v-e8d02020 class="ivu-timeline">
        <li v-if="newData.length != 0" data-v-e8d02020 class="ivu-timeline-item" style="min-height: 31px!important;">
          <div class="ivu-timeline-item-tail" style="height: 29px!important;top: 0px;"></div>
        </li>
        <li data-v-e8d02020 class="ivu-timeline-item" v-for="(item,index) in newData.count" :key="index">
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
              min-width="220"
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
        tableDetaultTitle:[
          {
            source:'中科院国际科技合作奖',
            titleList:[
              '届次',
              '年度',
              '姓名（中文）',
              '姓名（英文）',
              '职称',
              '学历',
              '国籍',
              '出生日期',
              '推荐单位',
              '国外单位',
              '学科一级',
              '学科二级',
            ],
          },          {
            source:'中科院青年科学家国际合作伙伴奖',
            titleList:[
              '年度',
              '推荐单位',
              '外国科学家姓名（中）',
              '外国科学家姓名（英）',
              '外国科学家国籍',
              '外国科学家性别',
              '外国科学家出生日期',
              '外国科学家学历学位',
              '外国科学家专业',
              '外国科学家职务',
              '外国科学家国外工作单位（英）',
              '外国科学家国外工作单位（中）',
              '外国科学家国内工作单位',
              '我院科学家姓名（中）',
              '我院科学家姓名（英）',
              '我院专家国籍',
              '我院专家性别',
              '我院专家出生日期',
              '我院专家专业',
              '我院专家职务',
              '我院专家学历',
              '我院科学家国外工作单位',
              '我院科学家国内工作单位',
            ],
          },        {
            source:'国家国际科技合作奖',
            titleList:[
              '年度',
              '姓名（中）',
              '姓名（英）',
              '职称',
              '学历',
              '国籍',
              '出生日期',
              '推荐单位',
              '国外单位',
              '学科一级',
              '学科二级',
            ],
          },      {
            source:'中国政府“友谊奖”',
            titleList:[
              '年度',
              '姓名（中文）',
              '姓名（英文）',
              '职称',
              '学历',
              '国籍',
              '出生日期',
              '推荐单位',
              '国外单位',
              '学科一级',
              '学科二级',
              '别国院士',
              '中科院外籍院士',
              '合作起始年份',
            ],
          },

        ],

        newData:[],
        tableTitleArr:[],
        tableDataArr:[],
      }
    },
    props:{
      itemData: {
        default: []
      },
    },
    watch:{
      itemData(val){
        this.newData = val
      },
    },
    mounted(){
      this.newData = this.itemData

      let newTableData = this.newData.detail

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
          source:'',
        }
        this.tableDataArr.push(itemData)
      })
      newTableData.forEach((item,index)=>{
        let  indexOf = (this.tableTitleArr || []).findIndex((subitem) => subitem == item.title);
        this.tableDataArr[indexOf].itemTableBody.push(item.list[0])
        this.tableDataArr[indexOf].itemTableTitle = item.title
        this.tableDataArr[indexOf].source = item.source
      })


      this.tableDataArr.forEach((item,index)=>{
        item.itemTableHead = this.tableDetaultTitle.filter(subItem=>subItem.source == item.source)[0].titleList
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
  margin-right:40px;
  height:310px;
  display: flex;
  align-items: center;
  .ulLeftDiv{
    width: 120px;
    height: 100%;
  }
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
          color: #d3be92;
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
        color: #d3be92;
        border-color: #d3be92;
      }
      .ivu-timeline-item-head {
        width: 10px;
        height: 10px;
        margin-top: 3px;
      }
      .ivu-timeline-item-tail {
        border-left: 0.005208rem solid #d3be92;
        opacity: 0.1;
        left: 5px;
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
