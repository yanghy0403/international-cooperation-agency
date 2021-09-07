<template>
  <div>
    <div class="titleDiv2">
      <div class="titleName">奖励</div>
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
          if(item.source == '中科院国际科技合作奖') {
            item.tableTitleArr = [
            {
              label: "届次",
              prop: "period",
            },
            {
              label: "年度",
              prop: "awardYear",
            },
            {
              label: "姓名（中）",
              prop: "zhName",
            },
            {
              label: "姓名（英）",
              prop: "enName",
            },
            {
              label: "职称",
              prop: "title",
            },
            {
              label: "学历",
              prop: "education",
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
              label: "推荐单位",
              prop: "instName",
            },
            {
              label: "国外单位",
              prop: "foreignWorkOrg",
            },
            {
              label: "学科一级",
              prop: "subject",
            },
            {
              label: "学科二级",
              prop: "subSubject",
            },
          ];
          }
          if(item.source == '中科院青年科学家国际合作伙伴奖') {
            item.tableTitleArr = [
              {
              label: "年份",
              prop: "awardYear",
            },
            {
              label: "推荐单位",
              prop: "instName",
            },
            {
              label: "外国科学家姓名（中）",
              prop: "foreignPersonZhName",
            },
            {
              label: "外国科学家姓名（英）",
              prop: "enRecommendedPerson",
            },
            {
              label: "外国科学家国籍",
              prop: "foreignPersonNationality",
            },
            {
              label: "外国科学家性别",
              prop: "foreignPersonSex",
            },
            {
              label: "外国科学家出生日期",
              prop: "foreignPersonBirthday",
            },
            {
              label: "外国科学家学历学位",
              prop: "foreignPersonEducation",
            },
            {
              label: "外国科学家专业",
              prop: "foreignPersonMajor",
            },
            {
              label: "外国科学家职务",
              prop: "foreignPersonTitle",
            },
            {
              label: "外国科学家国外工作单位（英）",
              prop: "foreignPersonEnWorkOrg",
            },
            {
              label: "外国科学家国外工作单位（中）",
              prop: "foreignPersonZhWorkOrg",
            },
            {
              label: "外国科学家国内工作单位",
              prop: "foreignPersonWorkOrgInChina",
            },
            {
              label: "我院科学家姓名（中）",
              prop: "oursPersonZhName",
            },
            {
              label: "我院科学家姓名（英）",
              prop: "oursPersonEnName",
            }
            ,
            {
              label: "我院专家国籍",
              prop: "oursPersonNationality",
            },
            {
              label: "我院专家性别",
              prop: "oursPersonSex",
            },
            {
              label: "我院专家出生日期",
              prop: "oursPersonBirthday",
            },
            {
              label: "我院专家专业",
              prop: "oursPersonMajor",
            },
            {
              label: "我院专家职务",
              prop: "oursPersonTitle",
            },
            {
              label: "我院专家学历",
              prop: "oursPersonEducation",
            },
            {
              label: "我院科学家国外工作单位",
              prop: "oursPersonForeignWorkOrg",
            },
            {
              label: "我院科学家国内工作单位",
              prop: "instName",
            },
            
            ]
          }
          if(item.source == '国家国际科技合作奖') {
            item.tableTitleArr =[
              {
              label: "年度",
              prop: "awardYear",
            },
            {
              label: "姓名（中）",
              prop: "zhName",
            },
            {
              label: "姓名（英）",
              prop: "enName",
            },
            {
              label: "职称",
              prop: "title",
            },
            {
              label: "学历",
              prop: "education",
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
              label: "推荐单位",
              prop: "instName",
            },
            {
              label: "国外单位",
              prop: "foreignWorkOrg",
            },
            {
              label: "学科一级",
              prop: "subject",
            },
            {
              label: "学科二级",
              prop: "subSubject",
            },
          ];
          }
          if(item.source == '中国政府“友谊奖”') {
            item.tableTitleArr =[
            {
              label: "年度",
              prop: "awardYear",
            },
            {
              label: "姓名（中）",
              prop: "zhName",
            },
            {
              label: "姓名（英）",
              prop: "enName",
            },
            {
              label: "职称",
              prop: "title",
            },
            {
              label: "学历",
              prop: "education",
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
              label: "推荐单位",
              prop: "instName",
            },
            {
              label: "国外单位",
              prop: "foreignWorkOrg",
            },
            {
              label: "学科一级",
              prop: "subject",
            },
            {
              label: "学科二级",
              prop: "subSubject",
            },
            {
              label: "中科院外籍院士",
              prop: "foreignAcademic",
            },
            {
              label: "合作起始年份",
              prop: "cooperationStartYear",
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
          color: #84a0c9;
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
        color: #84a0c9;
        border-color: #84a0c9;
      }
      .ivu-timeline-item-head {
        width: 10px;
        height: 10px;
        margin-top: 3px;
      }
      .ivu-timeline-item-tail {
        border-left: 0.005208rem solid #84a0c9;
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
