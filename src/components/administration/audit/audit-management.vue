<template>
  <div class="system">
    <div class="application-fl">
      <div class="app-logo" @click="handleClose">
        <img src="../../../assets/images/国际人才/页面固定内容/logo.png" alt />
        <p>中国科学院国际合作</p>
        <p>数据汇交与分析平台</p>
      </div>
      <div class="appTitle">安全审计</div>
      <!-- <div class="app-nav">
        <div>
          <router-link tag="li" to="/system-environment">硬件环境</router-link>
        </div>
        <div class="navActive">
          <router-link tag="li" to="/audit-management">系统日志</router-link>
        </div>
      </div> -->
      <div class="app-btm" @click="lastPage">
        <div class="iconfontClose">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="closeName">返回上一页</div>
      </div>
    </div>
    <div class="application-fr">
      <div class="breadcrumb">
        <ul>
          <li>安全审计</li>
          <li class="line">/</li>
          <li>系统日志</li>
        </ul>
      </div>
      <div class="fr-header">
        <div class="titleName">系统日志</div>
        <Login style="float: right" />
      </div>
      <div class="list">
        <Tabs animated="false">
          <TabPane label="操作日志" icon="ios-paper" class="operate">
            <el-row>
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  <label>操作者：</label>
                  <el-input
                    placeholder="请输入操作者"
                    v-model="personName"
                    clearable
                  ></el-input></div
              ></el-col>
              <el-col :span="8"
                ><div class="grid-content bg-purple-light">
                  <label>时间：</label>
                  <el-tooltip
                    class="item"
                    effect="light"
                    content="连续年份请用 - 隔开,例如：2010-2019;不连续年份请用;隔开，例如:2010;2019"
                    placement="top"
                  >
                    <el-input
                      v-model="yearSelect"
                      placeholder="请输入年份"
                      clearable
                    ></el-input>
                  </el-tooltip></div
              ></el-col>
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  <el-button @click="handleLogList">查询</el-button
                  ><el-button @click="handleEmptyVal">清空</el-button>
                </div></el-col
              >
            </el-row>
            <div
              class="listDiv"
              v-loading="loading"
              element-loading-text="加载中..."
            >
              <p>检索到 {{ logList.count }} 条日志</p>
              <Table
                height="630"
                border
                :columns="columns1"
                :data="logList.detail"
              ></Table>
            </div>

            <Page
            class="pageStyle"
              :total="logList.count"
              :page-size="limit"
              :current.sync="currentPage"
              @on-change="changePage"
            />
          </TabPane>
          <TabPane label="日志统计" icon="ios-paper" class="logStatistics">
            <div class="tableList">
              <Table
                height="700"
                border
                :columns="columns2"
                :data="userLoginInfo"
              ></Table>
            </div>
            <div class="useDiv">
              <div class="useRatio" ref="useRatio"></div>
            </div>
          </TabPane>
        </Tabs>
      </div>
      <div class="footerInfo">
        <span>中国科学院国际合作局 版权所有</span>
        <span class="line">|</span>
        <span>技术支持：中国科学院计算机网络信息中心</span>
      </div>
    </div>
  </div>
</template>

<script>
import visitFun from "@/assets/js/visit.js";
export default {
  data() {
    return {
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 100,
        },
        {
          title: "访问模块",
          key: "title",
          align: "center",
        },
        {
          title: "操作者",
          key: "operName",
          align: "center",
        },
        {
          title: "操作IP",
          key: "operIp",
          align: "center",
        },
        {
          title: "操作时间",
          key: "operTime",
          align: "center",
        },
        {
          title: "在线时长",
          key: "name",
          align: "center",
        },
        // {
        //   title: "操作对应的请求",
        //   key: "name",
        //   align: "center",
        // },
        {
          title: "操作者类型",
          key: "operatorType",
          align: "center",
        },
        {
          title: "具体查询的参数",
          key: "operParam",
          align: "center",
        },
        {
          title: "执行状态",
          key: "status",
          align: "center",
        },
      ],
      columns2: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 80,
        },
        {
          title: "用户名",
          key: "name",
          align: "center",
        },
        {
          title: "访问时间",
          key: "",
          align: "time",
        },
        {
          title: "登录次数",
          key: "count",
          align: "center",
        },
      ],
      personName: "",
      yearSelect: "",
      data1: [],
      logList: [],
      userLoginInfo: [],
      offset: 0,
      limit: 100,
      currentPage: 1,
      loading: false,
    };
  },
  mounted() {
    this.handleLogList();
    this.handleModules();
    this.handleuserLoginList();
  },
  methods: {
    handleClose() {
      this.$router.push("/");
    },

    lastPage() {
      visitFun.lastPage();
    },
    // 操作日志
    handleLogList() {
      this.loading = true;
      let data = {
        offset: this.offset,
        limit: this.limit,
        time: this.yearSelect,
        userName: this.personName,
      };
      this.axios.get("/log/detail/info", { params: data }).then((res) => {
        if (res.data.code == 200) {
          this.loading = false;
          this.logList = res.data.data;
        }
      });
    },
    // f分页
    changePage(event) {
      this.loading = true;
      this.offset = event - 1;
      this.handleLogList();
    },
    //清空数据
    handleEmptyVal() {
      this.yearSelect = "";
      this.personName = "";
      this.handleLogList();
    },

    // 用户登录日志列表
    handleuserLoginList() {
      this.axios.get("/log/detail/userLogin/info").then((res) => {
        if (res.data.code == 200) {
          this.userLoginInfo = res.data.data;
        }
      });
    },

    // 模块占比
    handleModules() {
      let myChart = this.$echarts.init(this.$refs.useRatio),
        _this = this;

      this.axios.get("/log/detail/module/info").then((res) => {
        if (res.data.code == 200) {
          let data = res.data.data;
          let option = {
            color: [
              "#89c3db",
              "#db89ab",
              "#dbce89",
              "#536689",
              "#6ccdaa",
              "#c9e0fd",
              "#b5937b",
              "#89b3b3",
            ],
            title: {
              text: "模块访问分析",
              left: "center",
            },
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c}" + "次" + " ({d}%)",
            },
            series: [
              {
                name: "模块访问分析",
                type: "pie",
                radius: "50%",
                center: ["50%", "50%"],
                label: {
                  formatter: (params) => {
                    console.log(params)
                    return params.data.name + '：' + params.data.value + '次'
                  },
                  color: "#000",
                },
                data: data,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                  },
                },
              },
            ],
          };

          myChart.setOption(option, true);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/system/system.less";
.list {
  .operate {
    .listDiv {
      p {
        line-height: 38px;
        font-size: 14px;
        font-weight: bold;
      }
    }
    .grid-content {
      display: flex;
      label {
        width: 15%;
        line-height: 38px;
        display: block;
        text-align: center;
      }
      /deep/ .el-input {
        width: 60% !important;
      }
    }
  }
  .logStatistics {
    display: flex;
    .tableList {
      width: 50%;
    }
    .useDiv {
      width: 50%;
      height: 700px;
      // border: 1px solid #000;
      .useRatio {
        width: 100%;
        height: 100%;
      }
    }
  }

  /deep/ .el-loading-spinner .path {
    stroke: #ff3a25;
  }

  /deep/ .el-loading-spinner .el-loading-text {
    color: #ff3a25;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 8px;
    background-color: #fff;
  }

  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    border-radius: 0px;
    width: 6px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ff3925;
    border-radius: 100px !important;
  }
  .pageStyle {
        float: right;
        margin: 1%;

        /deep/ .ivu-page-item-active {
          border: none !important;
          background-color: #ff3925 !important;
          color: #fff;
          width: 40px;
          height: 40px;
          line-height: 40px;
          border-radius: 0px;
        }

        /deep/ .ivu-page-item {
          width: 40px;
          height: 40px;
          line-height: 40px;
          border-radius: 0px;
        }

        /deep/ .ivu-page-disabled,
        /deep/ .ivu-page-prev,
        /deep/ .ivu-page-next,
        .ivu-page-prev {
          width: 40px;
          height: 40px;
          line-height: 40px;
          border-radius: 0px;
        }

        /deep/ .ivu-page-item:hover {
          color: #ff3925 !important;
          border-color: #ff3925 !important;
        }

        /deep/ .ivu-page-item:hover a {
          color: #ff3925 !important;
        }

        .ivu-page-item:hover a {
          color: #515a6e !important;
        }

        /deep/ .ivu-page-item-active a,
        .ivu-page-item-active:hover a {
          color: #fff;
        }
      }
}
</style>
