<template>
  <div>
    <div class="titleDiv2">
      <div class="titleName">交流</div>
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
          <el-table :data="item.list" style="width: 98%" v-if="item.source == '交流'">
            <el-table-column align="center" prop="year" label="年份">
            </el-table-column>
            <el-table-column align="center" prop="zhper" label="出访人次">
            </el-table-column>
            <el-table-column align="center" prop="zhpro" label="出访项目">
            </el-table-column>
            <el-table-column align="center" prop="enper" label="来访人次">
            </el-table-column>
            <el-table-column align="center" prop="enpro" label="来访项目">
            </el-table-column>
            <!-- <template>
              <el-table-column
                v-for="itemSubItem in item.tableTitleArr"
                :key="itemSubItem.key"
                align="center"
                :prop="itemSubItem.prop"
                :label="itemSubItem.label"
                min-width="150"
              >
              </el-table-column>
            </template> -->
          </el-table>
          <el-table :data="item.detailArr" style="width: 98%" v-else>
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
        this.handletable();
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
    handletable() {
      if (this.itemTableTitle != undefined) {
        let newArr = this.itemTableTitle.map((item) => {
          let detailArr = [];
          detailArr.push(item.list);
          item.detailArr = detailArr;
          if (item.source == "樱花计划") {
            item.tableTitleArr = [
              {
                label: "申请年份",
                prop: "applicationYear",
              },
              {
                label: "批次",
                prop: "batch",
              },
              {
                label: "领域",
                prop: "domain",
              },
              {
                label: "申请单位",
                prop: "instName",
              },
              {
                label: "访问单位",
                prop: "visitUnit",
              },
              {
                label: "团长",
                prop: "tzName",
              },
              {
                label: "代表团人数",
                prop: "teamNum",
              },
              {
                label: "出访开始时间",
                prop: "beginDate",
              },
              {
                label: "出访结束时间",
                prop: "endDate",
              },
              {
                label: "访问天数",
                prop: "visitDays",
              },
            ];
          } else if (item.source == "海峡两岸") {
            item.tableTitleArr = [
              {
                label: "年度",
                prop: "year",
              },
              {
                label: "申请单位",
                prop: "instName",
              },
              {
                label: "会议名称",
                prop: "conferenceTitle",
              },
              {
                label: "负责人",
                prop: "name",
              },
              {
                label: "会议举办地点",
                prop: "conferenceAddr",
              },
              {
                label: "举办地所属省",
                prop: "addrProvince",
              },
              {
                label: "举办地所属市",
                prop: "addrCity",
              },
              {
                label: "联系人",
                prop: "contacts",
              },
              {
                label: "会议开始日期",
                prop: "beginDate",
              },
              {
                label: "结束日期",
                prop: "endDate",
              },
              {
                label: "参会总人数",
                prop: "peopleNum",
              },
              {
                label: "台湾代表人数",
                prop: "taiwanRepNum",
              },
              {
                label: "台方团长姓名",
                prop: "taiwanTzName",
              },
              {
                label: "台方团长工作单位",
                prop: "taiwanTzUnit",
              },
              {
                label: "台方团长职务",
                prop: "taiwanTzDuty",
              },
            ];
          } else if (item.source == "在华国际会议") {
            item.tableTitleArr = [
              {
                label: "年度",
                prop: "year",
              },
              {
                label: "申请单位",
                prop: "instName",
              },
              {
                label: "会议名称（中文）",
                prop: "conferenceZhTitle",
              },
              {
                label: "会议名称（英文）",
                prop: "conferenceEnTitle",
              },
              {
                label: "会议主办单位",
                prop: "conferenceHostUnit",
              },
              {
                label: "会议承办单位",
                prop: "conferenceOrganizer",
              },
              {
                label: "会议批准文号",
                prop: "conferenceApprovalNumber",
              },
              {
                label: "会议类别",
                prop: "meetingCategory",
              },
              {
                label: "会议开始日期",
                prop: "beginDate",
              },
              {
                label: "会议结束日期",
                prop: "endDate",
              },
              {
                label: "国内与会代表人数",
                prop: "projectClass",
              },
              {
                label: "国外与会代表人数",
                prop: "domesticNum",
              },
              {
                label: "会议地点",
                prop: "conferenceAddress",
              },
              {
                label: "是否为国际组织系列会议",
                prop: "isInternationalConference",
              },
              {
                label: "会议主席姓名",
                prop: "conferenceChairman",
              },
              {
                label: "秘书长姓名",
                prop: "secretaryGeneral",
              },
              // {
              //   label: "国内资助单位",
              //   prop: "cooperatorCountry",
              // },
              // {
              //   label: "国内资助金额",
              //   prop: "cooperatorOrg",
              // },
              // {
              //   label: "国外资助单位",
              //   prop: "cooperatorOrg",
              // },
              // {
              //   label: "国外资助金额",
              //   prop: "cooperatorOrg",
              // },
              {
                label: "主办单位提供经费",
                prop: "hostUnitFunding",
              },
              {
                label: "拟申请资助金额（万元）",
                prop: "amountPatronage",
              },
            ];
          } else if (item.source == "特别交流计划") {
            item.tableTitleArr = [
              {
                label: "年度",
                prop: "year",
              },
              {
                label: "申请单位",
                prop: "instName",
              },
              {
                label: "负责人",
                prop: "executor",
              },
              {
                label: "项目名称",
                prop: "projectName",
              },
              {
                label: "合作单位",
                prop: "cooperatorOrg",
              },
              {
                label: "资金额度",
                prop: "fundingLines",
              },
              {
                label: "资助金额(万元)",
                prop: "fundingMonery",
              },
              {
                label: "合作国家",
                prop: "cooperatorCountry",
              },
              {
                label: "实际资助金额",
                prop: "practicalFundingMonery",
              },
              {
                label: "执行情况",
                prop: "performanceCircs",
              },
              {
                label: "类别",
                prop: "projectClass",
              },
            ];
          } else if (item.source == "国际会议") {
            item.tableTitleArr = [
              {
                label: "年度",
                prop: "year",
              },
              {
                label: "申请单位",
                prop: "projectNumber",
              },
              {
                label: "会议名称",
                prop: "name",
              },
              {
                label: "会议举办日期",
                prop: "sex",
              },
              {
                label: "会议天数",
                prop: "dateOfBirth",
              },
              {
                label: "会议举办城市",
                prop: "title",
              },
              {
                label: "会议规模",
                prop: "unit",
              },
              {
                label: "境外代表人数",
                prop: "personNationality",
              },
              {
                label: "经费情况",
                prop: "instName",
              },
              {
                label: "会议批复日期",
                prop: "inviterName",
              },
            ];
          } else if (item.source == "发展中国家培训班") {
            item.tableTitleArr = [
              {
                label: "年度",
                prop: "year",
              },
              {
                label: "项目名称",
                prop: "projectNumber",
              },
              {
                label: "承办单位",
                prop: "name",
              },
              {
                label: "项目负责人",
                prop: "sex",
              },
              {
                label: "培训对象（含拟邀请国别、地区、机构、人数）",
                prop: "dateOfBirth",
              },
              {
                label: "培训时间",
                prop: "title",
              },
              {
                label: "培训地点",
                prop: "unit",
              },
              {
                label: "资助金额（万）",
                prop: "personNationality",
              },
            ];
          }
          return item;
        });
        this.tableDataArr = newArr;
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
    width: 240px;
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
