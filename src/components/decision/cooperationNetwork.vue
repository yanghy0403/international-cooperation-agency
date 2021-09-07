<template>
  <div
    class="graph"
    v-loading="loading"
    element-loading-text="正在加载图谱..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.2)"
  >
    <div class="bg-class" v-show="isshow" @click="handleBgClose"></div>
    <div class="default">
      <div class="search" v-if="iconindex == 1">
        <el-input
          v-model="personName"
          @input="handlefocus()"
          placeholder="请输入科研人员姓名"
          clearable
        ></el-input>
        <button @click="handleApply(1)">生成合作网络</button>
      </div>
      <div class="select-list">
        <div class="ivu-poptip-inner scrollbar" v-show="selectname">
          <ul v-if="personData.length !== 0" class="resultdata">
            <li
              class="ivu-poptip-body"
              v-for="(item, k) in personData"
              :key="k + 'x'"
              @click="handleClickQuery(item)"
            >
              <p v-if="item.source == 'zh'">
                <span>{{ item.zhName }}</span
                ><span>{{ item.title }}</span
                ><span>{{ item.unit }}</span>
              </p>
              <p v-if="item.source == 'en'">
                <span>{{ item.enName == "" ? item.zhName : item.enName }}</span>
                <span>{{ item.title }}</span>
                <span>{{ item.unit }}</span>
              </p>
            </li>
          </ul>
          <ul v-else>
            <span class="ivu-poptip-body-content-inner">暂无匹配数据</span>
          </ul>
        </div>
      </div>
      <div class="oper">
        <div class="icon upload" @click="downloadImg"></div>
        <div
          class="icon photo"
          :class="isphoto ? 'photoing' : ''"
          @click="handleClick(1)"
        ></div>
        <div
          class="icon table"
          :class="istable ? 'tableing' : ''"
          @click="handleClick(2)"
        ></div>
        <div class="icon fade" @click="handleFade"></div>
      </div>
      <div class="comment" v-if="iconindex == 1">
        <ul>
          <li>*注:</li>
          <li>
            <p>1.人员外圆直径越大,表示与搜索人的关系越近</p>
            <p>2.人员的论文超过50篇,图谱只显示引用频次最高的前50篇</p>
            <p>3.论文作者超过10位,只显示前10位作者</p>
          </li>
        </ul>
      </div>
      <div class="module">
        <div id="graph" ref="chart" class="atlas" v-show="iconindex == 1"></div>
        <div class="table" v-show="iconindex == 2">
          <Table height="650" :columns="columns1" :data="tableData"></Table>
        </div>
      </div>
    </div>
    <div class="fullescn" v-if="isfade">
      <div class="column columned">
        <div class="oper oper1">
          <div class="icon upload"></div>
          <div
            class="icon photo1"
            :class="isphoto ? 'photoing' : ''"
            @click="handleClick1(1)"
          ></div>
          <div
            class="icon table1"
            :class="istable ? 'tableing' : ''"
            @click="handleClick1(2)"
          ></div>
          <div class="icon shrink" @click="handleshrink"></div>
        </div>
        <div class="comment" v-if="iconindex == 1">
          <ul>
            <li>*注:</li>
            <li>
              <p>1.人员外圆直径越大,表示与搜索人的关系越近</p>
              <p>2.人员的论文超过50篇,图谱只显示引用频次最高的前50篇</p>
              <p>3.论文作者超过10位,只显示前10位作者</p>
            </li>
          </ul>
        </div>
        <div class="module">
          <div style="width: 100%; height: 100%" v-show="iconindex == 1">
            <div id="graph1" class="atlas"></div>
          </div>
          <div class="table" v-show="iconindex == 2">
            <Table height="650" :columns="columns1" :data="tableData"></Table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import visitFun from "@/assets/js/visit.js";
import html2canvas from 'html2canvas';

import team from "../../assets/js/team.json";
import personBig from "../../assets/images/decision/personBig.png";
import personSmall from "../../assets/images/decision/personSmall.png";
import orgImg from "../../assets/images/decision/org.png";
import { log } from "util";
export default {
  name: "tightness",
  data() {
    return {
      personName: "",
      selectname: false,
      isphoto: true, //图形图标是否选中
      istable: false, //表格图标是否选中
      iconindex: 1, //默认展示图形
      iconindex1: 1, //默认展示图形(放大)
      isfade: false, //控制放大图形的出现
      nodes: [],
      links: [],
      categorys: [],
      columns1: [
        {
          title: "排名",
          key: "rank",
          align: "center",
        },
        {
          title: "科研人员姓名",
          key: "name",
          align: "center",
        },
        {
          title: "来源",
          key: "source",
          align: "center",
        },
        {
          title: "关联值",
          key: "value",
          align: "center",
        },
      ],
      tableData: [],
      personData: [],
      personId: "",
      loading: false,
      isshow: false,
      titleName: "国际合作网络图谱",
      //    nodelogo:require('../../assets/images/decision/logo.png')
    };
  },
  watch: {
    personName(val) {
      if (this.personName) {
        this.handlePersonAutoTip(val);
      }
    },
  },
  mounted() {
    // this.applyGraph(document.getElementById("graph"));
    this.handleDefaultGraph();
  },
  methods: {
    handleRouter(path, index) {
      this.curnavindex = index;
      this.$router.push(path);
    },
    // 人员匹配
    async handlePersonAutoTip() {
      this.axios
        .get("/index/person/autoTip", { params: { name: this.personName } })
        .then((res) => {
          if (res.data.code == 200) {
            this.personData = res.data.data;
          }
        });
    },
    handleClickQuery(val) {
      if (val.source == "zh") {
        this.personName = val.zhName + " " + val.title + " " + val.unit;
        this.sourceVal = val.source;
        this.personId = val.uniqueId;
        this.selectname = false;
        this.isshow = false;
      }
      if (val.source == "en") {
        if (val.enName != "") {
          this.personName = val.enName + " " + val.title + " " + val.unit;
        } else {
          this.personName = val.zhName + " " + val.title + " " + val.unit;
        }
        this.sourceVal = val.source;
        this.personId = val.uniqueId;
        this.selectname = false;
        this.isshow = false;
      }
    },
    handlefocus() {
      this.isshow = true;
      this.selectname = true;
    },
    handleBgClose() {
      this.selectname = false;
      this.isshow = false;
    },

    //生成图谱
    handleApply(val) {
      if (val == 1) {
        this.handleInternationalCooperNet();
      } else {
        this.handleDefaultGraph();
      }
    },

    handleInternationalCooperNet() {
      this.loading = true;
      this.axios
        .get("/overview/internationalCooperNet", {
          params: { uniqueId: this.personId },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.loading = false;
            this.nodes = res.data.data.data.node;
            this.links = res.data.data.data.link;
            this.categorys = res.data.data.data.category;
            this.tableData = res.data.data.data.table;
            this.applyGraph(document.getElementById("graph"));
          } else {
            this.loading = false;
            this.$Message.error({
              background: true,
              content: "合作网络图谱加载失败！",
            });
          }
        });
    },
    // 默认数据
    handleDefaultGraph() {
      var data = team;
      this.nodes = data.node;
      this.links = data.link;
      this.categorys = this.categorys;
      this.tableData = data.table;
      this.applyGraph(document.getElementById("graph"));
    },
    //图谱渲染
    applyGraph(node) {
      var mychart = this.$echarts.init(node);
      mychart.showLoading();

      this.ele = this.$refs.chart;
      // 动态获取盒子宽和高
      let width = this.ele.clientWidth || this.ele.offsetWidth;
      let height = this.ele.clientHeight || this.ele.offsetHeight;

      let nodes = this.nodes;
      let links = this.links;
      let categorys = this.categorys;

      var color = [
        "#ff3a25",
        "#ffc067",
        "#ff7575",
        "#66c284",
        "#667ec2",
        "#89defe",
        "#e5dfcb",
        "#3241ad",
        "#ad3280",
      ];

      nodes = nodes.map((item) => {
        if (item.group == "1") {
          if (item.center == "yes") {
            return {
              name: item.name,
              id: item.id,
              category: "院内人员",
              group: item.group,
              center: item.center,
              symbol: "image://" + personBig,
              symbolSize: 80,
              x: width - 800,
              y: height - 300,
              // fixed: true,
              label: {
                show: true,
                position: "top",
                color: "#fff",
                width: 300,
              },
              //   itemStyle: {
              //   color: color[0],
              // },
            };
          } else {
            return {
              name: item.name,
              id: item.id,
              category: "院内人员",
              value: item.value,
              group: item.group,
              flag: item.flag,
              type: item.type,
              symbol: "image://" + personSmall,
              symbolSize: item.value / 2,
              label: {
                show: true,
                position: "top",
                color: "#fff",
                width: 300,
              },
              //   itemStyle: {
              //   color: color[0],
              // },
            };
          }
        } else if (item.group == "2") {
          return {
            name: item.name,
            id: item.id,
            category: "国外人员",
            value: item.value,
            group: item.group,
            flag: item.flag,
            type: item.type,
            symbol: "image://" + orgImg,
            symbolSize: item.value,
            // itemStyle: {
            //   color: color[1],
            // },
          };
        } else if (item.group == "3") {
          return {
            name: item.name,
            id: item.id,
            category: "交流",
            group: item.group,
            symbolSize: 15,
            itemStyle: {
              color: color[2],
            },
          };
        } else if (item.group == "4") {
          return {
            name: item.name,
            id: item.id,
            category: "国际组织",
            group: item.group,
            symbolSize: 15,
            itemStyle: {
              color: color[3],
            },
          };
        } else if (item.group == "5") {
          return {
            name: item.name,
            id: item.id,
            category: "项目",
            group: item.group,
            symbolSize: 15,
            itemStyle: {
              color: color[4],
            },
          };
        } else if (item.group == "6") {
          return {
            name: item.name,
            id: item.id,
            category: "平台",
            group: item.group,
            symbolSize: 15,
            itemStyle: {
              color: color[5],
            },
          };
        } else if (item.group == "7") {
          return {
            name: item.name,
            id: item.id,
            category: "奖励",
            group: item.group,
            symbolSize: 15,
            itemStyle: {
              color: color[6],
            },
          };
        } else if (item.group == "8") {
          return {
            name: item.name,
            id: item.id,
            category: "论文",
            group: item.group,
            symbolSize: 15,
            itemStyle: {
              color: color[7],
            },
          };
        } else if (item.group == "9") {
          return {
            name: item.name,
            id: item.id,
            category: "协议",
            group: item.group,
            symbolSize: 15,
            itemStyle: {
              color: color[8],
            },
          };
        }
      });

      links.forEach((link) => {
        link.label = {
          align: "center",
          fontSize: 12,
        };
        link.lineStyle = {
          color: "#dadada",
          width: 0.5,
          opacity: 0.2,
        };
      });

      let categories = [
        {
          name: "院内人员",
          itemStyle: {
            color: color[0],
          },
        },
        {
          name: "国外人员",
          itemStyle: {
            color: color[1],
          },
        },
        {
          name: "交流",
          itemStyle: {
            color: color[2],
          },
        },
        {
          name: "国际组织",
          itemStyle: {
            color: color[3],
          },
        },
        {
          name: "项目",
          itemStyle: {
            color: color[4],
          },
        },
        {
          name: "平台",
          itemStyle: {
            color: color[5],
          },
        },
        {
          name: "奖励",
          itemStyle: {
            color: color[6],
          },
        },
        {
          name: "论文",
          itemStyle: {
            color: color[7],
          },
        },
        {
          name: "协议",
          itemStyle: {
            color: color[8],
          },
        },
      ];

      let option = {
        tooltip: {
          trigger: "item",
          show: true,
          position: "top",
          formatter: function (params) {
            // console.log(params);
            if (
              params.data.category == "院内人员" ||
              params.data.category == "国外人员"
            ) {
              if (params.data.center == "yes") {
                return params.data.name;
              } else {
                return params.data.name + "关联值：" + params.data.value;
              }
            } else {
              return params.data.name;
            }
          },
        },
        legend: [
          {
            data: categories.map((x) => x.name),
            orient: "vertical",
            left: "50",
            bottom: "160",
            icon: "circle",
            height: 90,
            width: 110,
            itemGap: 20, // 设置间距
            textStyle: {
              color: "#8f949f",
              fontSize: 14,
            },
          },
        ],
        series: [
          {
            type: "graph",
            layout: "force",
            draggable: false,
            roam: true,
            zoom: 0.3,
            focusNodeAdjacency: true,
            categories: categories,
            animation: false,
            animationDurationUpdate: 500,
            // label: {
            //   show: false,
            //   formatter: function (params) {
            //     return;
            //   },
            // },
            label: {
              formatter: function (params) {
                return;
              },
              show: true,
              position: "top",
              color: "#fff",
              width: 300,
            },
            force: {
              repulsion: 800,
              edgeLength: [10, 120],
              // friction : 0.6,
              gravity: 0.4,
              // layoutAnimation: false,
            },
            data: nodes,
            links: links,
            color: color,
          },
        ],
      };

      mychart.hideLoading();
      mychart.setOption(option);
      var that = this;
      mychart.on("dblclick", function (params) {
        //console.log(params);
        if (params.data.category == "院内人员") {
          if (params.data.center == "yes") {
            that.$router.push({
              path: "/domesticPersonnelInfor",
              query: { id: params.data.id },
            });
          }
          if (params.data.flag == true) {
            if (params.data.type == "zh") {
              that.$router.push({
                path: "/domesticPersonnelInfor",
                query: { id: params.data.id },
              });
            }
          }
        } else if (params.data.category == "国外人员") {
          if (params.data.flag == true) {
            if (params.data.type == "en") {
              that.$router.push({
                path: "/personDetails",
                query: { id: params.data.id },
              });
            }
          }
        }
      });
      // }
      // });
    },
    //切换图标内容
    handleClick(num) {
      this.iconindex = num;
      this.iconindex1 = num;
      if (num == 1) {
        this.istable = false;
        this.isphoto = true;
        setTimeout(() => {
          this.applyGraph(document.getElementById("graph"));
        }, 100);
      } else if (num == 2) {
        this.isphoto = false;
        this.istable = true;
      }
    },
    //切换图标内容
    handleClick1(num) {
      this.iconindex = num;
      this.iconindex1 = num;
      if (num == 1) {
        this.istable = false;
        this.isphoto = true;
        this.$nextTick(() => {
          this.applyGraph(document.getElementById("graph1"));
        });
      } else if (num == 2) {
        this.isphoto = false;
        this.istable = true;
      }
    },

    //图形放大
    handleFade() {
      this.isfade = true;

      this.$nextTick(() => {
        var height = document.querySelector(".columned").clientHeight;
        var height1 = document.querySelector(".oper1").clientHeight;
        var width =
          document.documentElement.clientWidth || document.body.clientWidth;
        document.getElementById("graph1").style.width = width + "px";
        document.getElementById("graph1").style.height =
          height - height1 + "px";
        this.applyGraph(document.getElementById("graph1"));
      });
    },
    //图形收缩
    handleshrink() {
      this.isfade = false;
      this.$nextTick(() => {
        this.applyGraph(document.getElementById("graph"));
      });
    },
    // 下载图片
    downloadImg() {
      var node = this.$refs.chart
      node.style.background = "rgba(0,0,0,0.7)";

      html2canvas(node).then((canvas) => {
        node.style.background = "none";
        let saveUrl = canvas.toDataURL("image/png");
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.href = saveUrl;
        a.download = "国际合作网络图谱";
        a.click();
        a.parentNode.removeChild(a);
      });
    },
  },
};
</script>

<style lang='less' scoped>
.graph {
  width: 1840px;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  margin: 0 auto;

  /deep/ .el-loading-spinner i {
    color: #ed2424;
  }
  /deep/ .el-icon-loading:before {
    font-size: 50px;
  }
  /deep/ .el-loading-spinner .el-loading-text {
    color: #ed2424;
    font-size: 25px;
  }

  .bg-class {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0);
    z-index: 9;
  }

  .default {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    .module {
      position: absolute;
      width: 100%;
      height: 100%;
      flex: 1;
    }
  }

  .atlas {
    width: 100%;
    height: 100%;
  }
  .oper {
    display: flex;
    justify-content: flex-end;
    margin-right: 1%;
    padding: 10px 0;
    z-index: 1;
  }

  .search {
    position: absolute;
    left: 40px;
    top: 60px;
    z-index: 10;
    height: 156px;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: space-between;

    button {
      background: #ff3a25;
      width: 160px;
      height: 50px;
      font-size: 18px;
      color: #fff;
      text-align: center;
      line-height: 50px;
      border-radius: 10px;
      margin: 0 auto;
      border: none;
      margin-top: 80px;
      outline: none;
      cursor: pointer;
    }
  }
  .select-list {
    position: absolute;
    top: 15%;
    left: 2%;
    z-index: 99;
    .scrollbar {
      max-height: 300px;
      overflow: auto;
      background-image: linear-gradient(#c9ced4, #c9ced4),
        linear-gradient(#ffffff, #ffffff);
      ul li {
        height: 40px;
        color: #3b3d41;
        cursor: pointer;
        font-size: 14px;
        p span {
          margin-right: 15px;
        }
        &:hover {
          background: linear-gradient(
            to right,
            #b4bbc3 0%,
            #b5bcc4 1%,
            rgba(255, 255, 255, 0) 100%
          );
        }
      }
    }
    .scrollbar::-webkit-scrollbar {
      width: 4px;
      height: 1px;
    }
    .scrollbar::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #ff3a25;
    }
    .scrollbar::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background: #ededed;
    }
  }
  .comment {
    position: absolute;
    bottom: 50px;
    left: 50px;
    z-index: 10;
    ul {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      li:first-child {
        width: 40px;
        line-height: 30px;
        color: #8f949f;
        font-size: 12px;
      }
      li:last-child {
        p {
          font-size: 12px;
          color: #8f949f;
          line-height: 30px;
        }
      }
    }
  }
  .fullescn {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    background: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("../../assets/images/背景/背景大图.jpg") no-repeat;
    background-size: cover;
    .column {
      background: rgba(0, 0, 0, 0.2);
      width: 1840px;
      height: 80%;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      #graph1 {
        width: 100%;
        height: 100%;
      }
      .oper {
        display: flex;
        justify-content: flex-end;
      }
      .module {
        flex: 1;
        .table {
          height: 100%;
          overflow-y: auto;
        }
      }
    }
  }
}

.oper,
.oper1 {
  .icon {
    width: 22px;
    height: 22px;
    margin: 0 3px;
    cursor: pointer;
  }
  .upload {
    background: url(../../assets/images/decision/export.png) no-repeat;
    background-size: 100% 100%;
  }
  .upload:hover {
    background: url(../../assets/images/decision/export1.png) no-repeat;
    background-size: 100% 100%;
  }

  .photo {
    background: url(../../assets/images/decision/图默认.jpg) no-repeat;
    background-size: 100% 100%;
  }
  .photo:hover {
    background: url(../../assets/images/decision/图选中.jpg) no-repeat;
    background-size: 100% 100%;
  }
  .photo.photoing {
    background: url(../../assets/images/decision/图选中.jpg) no-repeat;
    background-size: 100% 100%;
  }
  .photo1 {
    background: url(../../assets/images/decision/图默认.jpg) no-repeat;
    background-size: 100% 100%;
  }
  .photo1:hover {
    //    background: url(../../assets/images/decision/图选中.jpg) no-repeat;
    background: url(../../assets/images/decision/图选中.jpg) no-repeat;
    background-size: 100% 100%;
  }
  .photo1.photoing {
    //    background: url(../../assets/images/decision/图选中.jpg) no-repeat;
    background: url(../../assets/images/decision/图选中.jpg) no-repeat;
    background-size: 100% 100%;
  }
  .table {
    background: url(../../assets/images/decision/表格默认.jpg) no-repeat;
    background-size: 100% 100%;
  }
  .table:hover {
    background: url(../../assets/images/decision/表格选中.jpg) no-repeat;
    background-size: 100% 100%;
  }
  .table.tableing {
    background: url(../../assets/images/decision/表格选中.jpg) no-repeat;
    background-size: 100% 100%;
  }
  .table1 {
    //background: url(../../assets/images/国际人才/index/图标列表默认.png) no-repeat;
    background: url(../../assets/images/decision/表格默认.jpg) no-repeat;
    background-size: 100% 100%;
  }
  .table1:hover {
    // background: url(../../assets/images/decision/表格选中.jpg) no-repeat;
    background: url(../../assets/images/decision/表格选中.jpg) no-repeat;
    background-size: 100% 100%;
  }
  .table1.tableing {
    //background: url(../../assets/images/decision/表格选中.jpg) no-repeat;
    background: url(../../assets/images/decision/表格选中.jpg) no-repeat;
    background-size: 100% 100%;
  }
  .fade {
    background: url(../../assets/images/decision/放大默认.png) no-repeat;
    background-size: 100% 100%;
  }
  .fade:hover {
    background: url(../../assets/images/decision/放大选中.png) no-repeat;
    background-size: 100% 100%;
  }
  .fade.fadeing {
    background: url(../../assets/images/decision/放大选中.png) no-repeat;
    background-size: 100% 100%;
  }
  .shrink {
    background: url(../../assets/images/decision/shrink.png) no-repeat;
    background-size: 100% 100%;
  }
}
.module {
  .table {
    // background: rgba(255,255,255,0.2);
    width: 98%;
    height: 98%;
    margin: 0 auto;
    /deep/ .ivu-table {
      background-color: rgba(0, 0, 0, 0);
      border: 0.005208rem solid hsla(0, 0%, 100%, 0.1);
    }
    /deep/ .ivu-table-overflowY {
      overflow-x: hidden;
    }
    /deep/ .ivu-table td {
      background-color: rgba(0, 0, 0, 0.1);
      border-bottom: 0.005208rem solid hsla(0, 0%, 100%, 0.1);
      color: #8f949f;
    }
    /deep/ .ivu-table th {
      background-color: rgba(0, 0, 0, 0.1);
      border-bottom: 0.005208rem solid hsla(0, 0%, 100%, 0.1);
      color: #8f949f;
    }
    /deep/ .ivu-table:before {
      background: hsla(0, 0%, 100%, 0.1);
    }
    ::-webkit-scrollbar {
      width: 2px;
      height: 8px;
      background-color: #3c4657;
    }

    /* 滚动槽 */
    ::-webkit-scrollbar-track {
      border-radius: 0px;
      width: 6px;
      height: 8px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #8f949f;
      border-radius: 100px !important;
    }
  }
}
</style>
<style lang="less">
.search {
  .el-input__inner {
    height: 64px;
    line-height: 64px;
    width: 400px;
    background: rgba(95, 105, 121, 0.3);
    border: none;
    color: #dadada;
    font-size: 18px;
  }
  .el-input__inner::-webkit-input-placeholder {
    line-height: 64px;
    text-align: center;
  }
}
.content {
  .el-table {
    height: 100%;

    .cell {
      text-align: center;
    }
  }
}
</style>
