<template>
  <div>
    <div class="titleDiv2">
      <div class="titleName">工作</div>
      <div class="operating">
        <div class="centerDiv centerDiv1">
          <img :src="bagImg" alt="">
        </div>
        <div @click.stop="iconClick(1)" class="centerLeftDiv"></div>
        <div @click.stop="iconClick(2)" class="centerRightDiv"></div>
      </div>
    </div>
    <div class="workExperience " v-if="isShowChart">
      <div class="ulLeftDiv"></div>
      <ul data-v-e8d02020 class="ivu-timeline">
        <li v-if="newworkData.length != 0" data-v-e8d02020 class="ivu-timeline-item" style="min-height: 31px!important;">
          <div class="ivu-timeline-item-tail" style="height: 29px!important;top: 0px;"></div>
        </li>
        <li data-v-e8d02020 class="ivu-timeline-item" v-for="(item,index) in newworkData.count" :key="index">
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
            titleList:[
              '年度',
              '项目编号',
              '推荐单位',
              '专家姓名',
              '出生日期',
              '中方合作者',
              '类别',
              '是否是延续项目',
              '计划来华时间',
              '计划离华时间',
              '实际在华时长（月）',
              '批复金额（万元）',
              '核销金额（万元）',
              '剩余金额（万元）',
            ],
          },
          {
            source:'香港联合实验室',
            index:1,
            titleList:[
              '联合实验室名称',
              '中科院所属单位',
              '香港所属单位',
              '实验室职务',
              '实验室成立时间',
              '开始在联合实验室工作时间',
              '工作结束时间',
            ],
          },          {
            source:'台湾青年人才计划',
            index:2,
            titleList:[
              '推荐单位名称',
              '被推荐学者姓名',
              '性别',
              '出生日期',
              '户籍地',
              '获得博士学位时间',
              '开始时间',
              '结束时间',
              '申请类别',
              '组别',
              '联系姓名',
              '联系人性别',
              '职务职称',
              '联系人研究领域',
            ],
          },          {
            source:'薪资系统',
            index:3,
            titleList:[
              '单位名称',
              '工作年份',
              '工作月份',
              '数据来源',
            ],
          },
          {
            source:'劳务系统',
            index:4,
            titleList:[
              '单位名称',
              '工作年份',
              '工作月份',
              '数据来源',
            ],
          },
        ],
        newworkData:[],
        tableTitleArr:[],
        tableDataArr:[],
      }
    },
    props:{
      workData: {
        default: []
      },
    },
    watch:{
      workData(newval,oldVal){
        this.newworkData = newval
      },
    },
    mounted(){
      this.newworkData = this.workData
      let newTableData = this.workData.detail

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
  /*margin-left: 120px;*/
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
        position: relative;
        .time {
          position: absolute;
          left: -60px;
          top: 0;
          color: #ff3925;
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
        color: #ff3925;
        border-color: #ff3925;
      }
      .ivu-timeline-item-head {
        width: 10px;
        height: 10px;
        margin-top: 3px;
      }
      .ivu-timeline-item-tail {
        border-left: 0.005208rem solid #ff3925;
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
