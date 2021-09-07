<template>
  <div class="system">
        <div class="application-fl">
      <div class="app-logo" @click="handleClose">
        <img src="../../../assets/images/国际人才/页面固定内容/logo.png" alt />
        <p>中国科学院国际合作</p>
        <p>数据汇交与分析平台</p>
      </div>
      <div class="appTitle">系统管理</div>
      <div class="app-nav">
        <p class="smallTitle">用户管理</p>
        <div>
          <router-link tag="li" to="/authority-management"
            >用户权限管理</router-link
          >
        </div>
        <div>
          <router-link tag="li" to="/permission-assignment"
            >用户权限分配</router-link
          >
        </div>
      </div>
      <div class="app-nav">
        <p class="smallTitle">环境配置</p>
        <div class="navActive">
          <router-link tag="li" to="/system-environment">硬件环境</router-link>
        </div>
      </div>
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
          <li>硬件环境</li>
        </ul>
      </div>
      <div class="fr-header">
        <div class="titleName">硬件环境</div>
        <Login style="float: right;" />
      </div>
      <div class="list">
        <Table border :columns="columns1" :data="environmentData"></Table>
        <div class="chart">
          <div class="Disk" ref="DiskDiv"></div>
          <div class="RAM" ref="RAMDiv"></div>
          <div class="CPU" ref="CPUDiv"></div>
        </div>
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
import echarts from "echarts";
import "echarts-liquidfill";
import visitFun from '@/assets/js/visit.js'
export default {
  data() {
    return {
      newData: ["磁盘", "CPU", "内存"],
      columns1: [
        {
          title: "名称",
          key: "name",
          align: "center",
        },
        {
          title: "总量",
          key: "total",
          align: "center",
        },
        {
          title: "使用情况",
          key: "used",
          align: "center",
        },
      ],
      environmentData: [],
      datas: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleClose() {
      this.$router.push("/");
    },
    lastPage(){
        visitFun.lastPage()
      },
    getData() {
      this.axios.get("/log/detail/computer/info").then((res) => {
        // if (res.data.code == 200) {
        this.datas = res.data.data;
        let data = res.data.data;
        this.environmentData = [];
        data.disk.name = "磁盘";
        data.memory.name = "内存";
        data.cpu.name = "CPU";
        for (var i in data) {
          this.environmentData.push(data[i]);
        }

        let time = setTimeout(() => {
          this.handleCPUPercentage();
          this.handleRAMPercentage();
          this.handleDISKPercentage();
        }, 500);
        // }
      });
    },
    // 磁盘占比
    handleDISKPercentage() {
      let myChart = this.$echarts.init(this.$refs.DiskDiv),
        _this = this;
      var total = _this.datas.disk.total;
      var used = _this.datas.disk.used;
      var value = (used / total).toFixed(2);
      var data = [value, value, value];
      var color = "#5a80b7";
      if (value >= 0.85) {
        color = "#ff3a25";
      }
      let option = {
        title: {
          text: "磁盘使用情况",
          textStyle: {
            fontSize: 25,
            fontFamily: "Microsoft Yahei",
            fontWeight: "normal",
            color: color,
          },
          x: "center",
          y: "90%",
        },
        series: [
          {
            type: "liquidFill",
            radius: "70%",
            center: ["50%", "50%"],
            color: [color, color, color], //水波
            data: data, // data个数代表波浪数
            backgroundStyle: {
              borderWidth: 1,
              color: "transparent",
            },
            outline: {
              show: true,
              itemStyle: {
                borderColor: color,
                borderWidth: 5,
              },
              borderDistance: 3,
            },
          },
        ],
      };

      myChart.setOption(option, true);
    },
    // cpu占比
    handleCPUPercentage() {
      let myChart = this.$echarts.init(this.$refs.CPUDiv),
        _this = this;
      var total = _this.datas.cpu.total;
      var used = _this.datas.cpu.used;
      var value = (used / total).toFixed(2);
      var data = [value, value, value];
      var color = "#5a80b7";
      if (value >= 0.85) {
        color = "#ff3a25";
      }
      let option = {
        title: {
          text: "CPU使用情况",
          textStyle: {
            fontSize: 25,
            fontFamily: "Microsoft Yahei",
            fontWeight: "normal",
            color: color,
          },
          x: "center",
          y: "90%",
        },
        series: [
          {
            type: "liquidFill",
            radius: "70%",
            center: ["50%", "50%"],
            color: [color, color, color], //水波
            data: data, // data个数代表波浪数
            backgroundStyle: {
              borderWidth: 1,
              color: "transparent",
            },
            outline: {
              show: true,
              itemStyle: {
                borderColor: color,
                borderWidth: 5,
              },
              borderDistance: 3,
            },
          },
        ],
      };

      myChart.setOption(option, true);
    },
    // 内存占比
    handleRAMPercentage() {
      let myChart = this.$echarts.init(this.$refs.RAMDiv),
        _this = this;
      var total = _this.datas.memory.total;
      var used = _this.datas.memory.used;
      var value = (used / total).toFixed(2);
      var data = [value, value, value];
      var color = "#5a80b7";
      if (value >= 0.85) {
        color = "#ff3a25";
      }
      let option = {
        title: {
          text: "内存使用情况",
          textStyle: {
            fontSize: 25,
            fontFamily: "Microsoft Yahei",
            fontWeight: "normal",
            color: color,
          },
          x: "center",
          y: "90%",
        },
        series: [
          {
            type: "liquidFill",
            radius: "70%",
            center: ["50%", "50%"],
            color: [color, color, color], //水波
            data: data, // data个数代表波浪数
            backgroundStyle: {
              borderWidth: 1,
              color: "transparent",
            },
            outline: {
              show: true,
              itemStyle: {
                borderColor: color,
                borderWidth: 5,
              },
              borderDistance: 3,
            },
          },
        ],
      };

      myChart.setOption(option, true);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/system/system.less";
.list {
  margin-top: 30px;
  width: 100%;
  height: 500px;
  .chart {
    display: flex;
    height: 100%;
    .CPU,
    .RAM,
    .Disk {
      width: 33.333%;
      height: 500px;
      // border: 1px solid #000;
    }
  }
}
</style>
