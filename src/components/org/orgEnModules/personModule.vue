<template>
  <div>
    <div class="titleDiv2">
      <div class="titleName">人才</div>
      <div class="operating">
        <div class="centerDiv centerDiv1">
          <img :src="bagImg" alt="" />
        </div>
        <div @click.stop="iconClick(1)" class="centerLeftDiv"></div>
        <div @click.stop="iconClick(2)" class="centerRightDiv"></div>
      </div>
    </div>
    <div class="workExperience" v-if="isShowChart">
      <div class="ulLeftDiv"></div>

      <ul data-v-e8d02020 class="ivu-timeline">
        <li
          data-v-e8d02020
          class="ivu-timeline-item"
          style="min-height: 31px !important"
        >
          <div
            class="ivu-timeline-item-tail"
            style="height: 29px !important; top: 0px"
          ></div>
        </li>
        <li
          data-v-e8d02020
          class="ivu-timeline-item"
          v-for="(item, index) in newworkData"
          :key="index"
        >
          <div class="ivu-timeline-item-tail"></div>
          <div class="ivu-timeline-item-head ivu-timeline-item-head-blue"></div>
          <div class="ivu-timeline-item-content">
            <p data-v-e8d02020 class="time">{{ item.year }}</p>
            <p
              data-v-e8d02020
              class="content"
              v-for="(subItem, subIndex) in item.content"
              :key="subIndex"
            >
              {{ subItem }}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="workExperience2" v-else>
      <div class="tabDIv newTable2 newScrollbargray">
        <div v-for="(item, index) in tableDataArr" :key="index">
          <div class="tabletitle">{{ item.title }}</div>
          <el-table :data="item.detailArr" style="width: 98%">
            <template>
              <el-table-column
                v-for="itemSubItem in item.tableTitleArr"
                :key="itemSubItem.key"
                align="center"
                :prop="itemSubItem.prop"
                :label="itemSubItem.label"
                min-width="150"
              >
              </el-table-column>
            </template>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icon1: require("../../../assets/images/国际人才/图表模式.png"),
      icon2: require("../../../assets/images/国际人才/表格模式.png"),
      bagImg: require("../../../assets/images/国际人才/图表模式.png"),
      isShowChart: true,
      newStudythisData: [],

      newworkData: [],
      tableTitleArr: [],
      tableDataArr: [],

      newArr: [],
      itemTableTitle: [],
    };
  },
  props: ["data"],
  watch: {
    data: {
      deep: true, // 深度监听
      immediate: true, // 监听到后，立即执行 handler方法
      handler(val) {
        this.newworkData = val.count;
        this.itemTableTitle = val.detail;
        if(this.itemTableTitle != undefined) {
          let newArr = this.itemTableTitle.map((item) => {
          let detailArr = [];
          detailArr.push(item.detail);
          item.detailArr = detailArr;
          if(item.source == '国际人才') {
            item.tableTitleArr = [
            {
              label: "年度",
              prop: "year",
            },
            {
              label: "项目编号",
              prop: "projectNo",
            },
            {
              label: "推荐单位",
              prop: "instName",
            },
            {
              label: "中方合作者",
              prop: "zhOperator",
            },
            {
              label: "外国专家姓名",
              prop: "name",
            },
            {
              label: "国籍",
              prop: "nationality",
            },
            {
              label: "出生日期",
              prop: "birthday",
            },
            {
              label: "国外机构",
              prop: "foreignWorkOrg",
            },
            {
              label: "专业",
              prop: "major",
            },
            {
              label: "职位及职务",
              prop: "title",
            },
            {
              label: "类别",
              prop: "perType",
            },
            {
              label: "实际在华时长（月）",
              prop: "actualTimeLenInChina",
            },
            {
              label: "批复金额（万元）",
              prop: "approvedAmount",
            },
            {
              label: "核销金额（万元）",
              prop: "writeOffAmount",
            },
            {
              label: "剩余金额（万元）",
              prop: "remainAmount",
            }
          ];

          }
          
          if(item.source == '台湾青年人才计划') {
            item.tableTitleArr = [
              {
              label: "年度",
              prop: "beginYear",
            },
            {
              label: "推荐单位名称",
              prop: "recommendOrg",
            },
            {
              label: "台湾学者姓名",
              prop: "name",
            },
            {
              label: "性别",
              prop: "sex",
            },
            {
              label: "出生日期",
              prop: "birthday",
            },
            {
              label: "户籍地",
              prop: "address",
            },
            {
              label: "获得博士学位时间",
              prop: "getDoctorDegreeDate",
            },
            {
              label: "职务/职称",
              prop: "position",
            },
            {
              label: "工作单位",
              prop: "workOrg",
            },
            {
              label: "开始时间",
              prop: "beginDate",
            },
            {
              label: "结束时间",
              prop: "endDate",
            },
            {
              label: "申请类别",
              prop: "applicationType",
            },
            {
              label: "组别",
              prop: "groupType",
            },
            {
              label: "合作者姓名",
              prop: "contactsName",
            },
            {
              label: "合作者性别",
              prop: "contactsSex",
            },
            
            {
              label: "合作者职务职称",
              prop: "contactsTitle",
            },
            {
              label: "合作者研究领域",
              prop: "contactsResearchField",
            }
            ]
          }
          return item;
        });
        this.tableDataArr = newArr;
        }
        
      },
    },
  },
  mounted() {
    this.newworkData = this.data.count;
    this.itemTableTitle = this.data.detail;

  },
  methods: {
    iconClick(val) {
      if (val == 1) {
        this.bagImg = this.icon1;
        this.isShowChart = true;
      } else {
        this.bagImg = this.icon2;
        this.isShowChart = false;
      }
    },
  },
};
</script>
<style lang="less">
</style>
<style lang="less" scoped>
@import "../../../assets/css/titlecss.less";
.workExperience {
  overflow-y: auto !important;
  margin-right: 40px;
  height: 310px;
  display: flex;
  align-items: center;
  .ulLeftDiv {
    width: 120px;
    height: 100%;
  }
  ul {
    height: 100%;
    // overflow: auto;
    li {
      position: relative;
      padding: 0 0 12px;
      margin-left: 62px;
      min-height: 63px;
      .ivu-timeline-item-content {
        .time {
          position: absolute;
          left: -60px;
          top: 0;
          color: #475c7b;
          font-weight: bold;
        }
        .content {
          color: #6f6f6f;
          font-size: 14px;
          line-height: 22px;
        }
        p:nth-of-type(1) {
          margin-top: 0px;
        }
        p:nth-of-type(2) {
          margin-top: 0px;
        }
        p {
          margin-top: 10px;
        }
      }
      .ivu-timeline-item-head-blue {
        color: #475c7b;
        border-color: #475c7b;
      }
      .ivu-timeline-item-head {
        width: 10px;
        height: 10px;
        margin-top: 3px;
      }
      .ivu-timeline-item-tail {
        border-left: 0.005208rem solid #475c7b;
        left: 5px;
        opacity: 0.1;
      }
    }
    /deep/ .ivu-timeline-item:last-child .ivu-timeline-item-tail {
      height: 39px !important;
      display: block !important;
    }
  }
}
.workExperience::-webkit-scrollbar {
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.workExperience::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  background: #ff3925;
}
.workExperience::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  background: #ededed;
}

.workExperience2 {
  margin: 0 20px;
  height: 330px;
  .tabDIv {
    height: 310px;
    width: 100%;
    overflow: auto;
    .tabletitle {
      line-height: 29px;
      font-size: 15px;
      font-weight: 600;
      margin: 15px 0 5px;
    }
  }
}
</style>
