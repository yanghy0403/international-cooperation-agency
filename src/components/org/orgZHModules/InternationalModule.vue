<template>
  <div>
    <div class="titleDiv2">
      <div class="titleName">国际组织</div>
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
          if(item.source == '国际组织高端任职情况') {
            item.tableTitleArr = [
            {
              label: "年度",
              prop: "year",
            },
            {
              label: "单位名称",
              prop: "instName",
            },
            {
              label: "姓名",
              prop: "name",
            },
            {
              label: "国际组织",
              prop: "internationalOrg",
            },
            {
              label: "担任职务",
              prop: "duty",
            },
          ];

          } else if(item.source == '国际组织任职人员参加国际会议资助计划') {
            item.tableTitleArr = [
            {
              label: "项目编号",
              prop: "projectNumber",
            },
            {
              label: "申请单位",
              prop: "instName",
            },
            {
              label: "申请人姓名",
              prop: "applicantName",
            },
            {
              label: "会议名称",
              prop: "conferenceTitle",
            },
            {
              label: "会议开始时间",
              prop: "beginDate",
            },
            {
              label: "会议结束时间",
              prop: "endDate",
            },
            {
              label: "参会任务",
              prop: "attendMeetTask",
            },
            {
              label: "在何国际组织",
              prop: "internationalOrg",
            },
            {
              label: "任何职",
              prop: "duty",
            },
            {
              label: "会议地点（国家）",
              prop: "conferenceCountry",
            },
            {
              label: "会议地点（城市）",
              prop: "conferenceCity",
            },
            {
              label: "资助金额",
              prop: "foreignLivingExpense",
            },
          ];
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
    width: 440px;
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
          color: #bfcea5;
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
        color: #bfcea5;
        border-color: #bfcea5;
      }
      .ivu-timeline-item-head {
        width: 10px;
        height: 10px;
        margin-top: 3px;
      }
      .ivu-timeline-item-tail {
        border-left: 0.005208rem solid #bfcea5;
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
