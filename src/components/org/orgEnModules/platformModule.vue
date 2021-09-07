<template>
  <div>
    <div class="titleDiv2">
      <div class="titleName">平台</div>
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
                v-for="(itemSubItem, key) in item.tableTitleArr"
                :key="key"
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
        if (this.itemTableTitle != undefined) {
          let newArr = this.itemTableTitle.map((item) => {
            let detailArr = [];
            detailArr.push(item.detail);
            item.detailArr = detailArr;
            if (item.source == "香港联合实验室") {
              item.tableTitleArr = [
                {
                  label: "联合实验室名称",
                  prop: "jointLabName",
                },
                {
                  label: "中科院所属单位",
                  prop: "instName",
                },
                {
                  label: "姓名",
                  prop: "name",
                },
                {
                  label: "实验室职务",
                  prop: "duty",
                },
                {
                  label: "实验室地址",
                  prop: "orgAdress",
                },
                {
                  label: "实验室主任（中科院）",
                  prop: "zkyDirector",
                },
                {
                  label: "实验室主任（香港）",
                  prop: "hkDirector",
                },
              ];
            } else if (item.source == "中外联合研究单元") {
              item.tableTitleArr = [
                {
                  label: "年度",
                  prop: "year",
                },
                {
                  label: "中方单位名称",
                  prop: "instName",
                },
                {
                  label: "联合机构名称（中文）",
                  prop: "jointInstZh",
                },
                {
                  label: "外方机构名称（中文）",
                  prop: "foreignInstZh",
                },
                {
                  label: "负责人（中方）",
                  prop: "zhPrincipal",
                },
                {
                  label: "成立日期",
                  prop: "beginDate",
                },
                {
                  label: "终止日期",
                  prop: "endDate",
                },
                {
                  label: "联合机构地址",
                  prop: "jointInstAddress",
                },
                {
                  label: "联合机构名称（英文）",
                  prop: "jointInstEn",
                },
                {
                  label: "外方机构名称（英文）",
                  prop: "foreignInstEn",
                },
                {
                  label: "负责人（外方）",
                  prop: "enPrincipal",
                },
                {
                  label: "协议名称",
                  prop: "agreement",
                },
                {
                  label: "级别",
                  prop: "level",
                },
                {
                  label: "联系人姓名",
                  prop: "contacts",
                },
                {
                  label: "所里任职职务",
                  prop: "unitTitle",
                },
                {
                  label: "该机构任职职务",
                  prop: "jointInstTitle",
                },
                {
                  label: "联系人所在实验室",
                  prop: "contactsUnit",
                },
                {
                  label: "中方单位类型",
                  prop: "zhInstType",
                },
                {
                  label: "外方单位类型",
                  prop: "enInstType",
                },
                {
                  label: "中外联合研究单元法人类型",
                  prop: "zhEnPersonType",
                },
                {
                  label: "执行期限",
                  prop: "performDeadline",
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

    // console.log(this.tableDataArr);
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
          color: #80bdc4;
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
        color: #80bdc4;
        border-color: #80bdc4;
      }
      .ivu-timeline-item-head {
        width: 10px;
        height: 10px;
        margin-top: 3px;
      }
      .ivu-timeline-item-tail {
        border-left: 0.005208rem solid #80bdc4;
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
