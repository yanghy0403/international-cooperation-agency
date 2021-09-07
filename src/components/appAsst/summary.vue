<template>
  <div class="application">
    <div class="application-fl">
      <div class="app-logo" @click="handleClose">
        <img src="../../assets/images/国际人才/页面固定内容/logo.png" alt />
        <p>中国科学院国际合作</p>
        <p>数据汇交与分析平台</p>
      </div>
      <div class="appTitle">应用助手</div>
      <div class="app-nav">
        <div>
          <router-link tag="li" to="/briefing">国际合作态势简报</router-link>
        </div>
        <div class="navActive">
          <router-link tag="li" to="/summary">机构合作数据摘要</router-link>
        </div>
        <div>
          <router-link tag="li" to="/statistics">国际合作统计手册</router-link>
        </div>
        <div>
          <router-link tag="li" to="/yearbook">国际合作统计年鉴</router-link>
        </div>
        <div>
          <router-link tag="li" to="/bulletin">国际合作统计公报</router-link>
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
      <div class="fr-header">
        <div class="condition">
          <div class="country">
            <Select v-model="OrgSelect" @on-query-change="handleSearch" @on-change="handleOrgDel" clearable filterable placeholder="请选择机构">
              <Option
                v-for="item in orgData"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </div>
          <div v-if="OrgSelect != ''" class="header-report-active" @click="handleCoopeDataAbstract">生成报告</div>
          <div v-else class="header-report">生成报告</div>
          <div v-if="OrgSelect != ''" class="DownloadAlls-active iconfont icon-xiazai" @click="handleDownloadReport"></div>
          <div v-else class="DownloadAlls iconfont icon-xiazai"></div>
        </div>
        <div class="header-fr">
          <ul>
            <li class="li1" @click="favorites"></li>
            <li class="li2"></li>
          </ul>
          <Login />
        </div>
      </div>
      <div class="reportDiv">
        <div class="container" v-loading="loading"
              element-loading-text="加载中...">
          <div class="report-info">
            <div class="logo">
              <img src="../../assets/images/应用助手/app_img.png" alt />
            </div>
            <div class="title-info">{{CoopeDataAbstractData.name}}
            </div>
          </div>
          <div class="containerDiv">
            <h2>一、{{CoopeDataAbstractData.dataSource}}</h2>
            <div class="tableDiv" v-if="CoopeDataAbstractData.coopePaperData != undefined">
              <p>{{CoopeDataAbstractData.coopePaperData.summary}}</p>
              <Table border :columns="columns1" :data="CoopeDataAbstractData.coopePaperData.coopePaperTable"></Table>
            </div>
            <!-- <div class="tableDiv" v-if="CoopeDataAbstractData.coopePaperOrgData != undefined">
              <p>{{CoopeDataAbstractData.coopePaperOrgData.summary}}</p>
              <Table border :columns="columns2" :data="CoopeDataAbstractData.coopePaperOrgData.coopePaperTable"></Table>
            </div> -->
          </div>
          <div class="containerDiv">
            <h2>二、合作项目数据（数据来自国际合作局国际伙伴计划立项信息）</h2>
            <p>{{CoopeDataAbstractData.coopProjectMsg}}</p>
          </div>
          <div class="containerDiv">
            <h2>三、 发展中国家科技培训班数据（数据来自国际合作局国际组织处）</h2>
            <p>{{CoopeDataAbstractData.scienceTechTrainingMsg}}</p>
          </div>
          <div class="containerDiv">
            <h2>四、出访数据（数据来自ARP国际合作系统因公出国批件获批记录）</h2>
            <p>{{CoopeDataAbstractData.visitOutDataMsg}}</p>
          </div>
          <div class="containerDiv">
            <h2>五、PIFI数据（来自国际合作局国际人才计划立项信息）</h2>
            <p>{{CoopeDataAbstractData.pifidataMsg}}</p>
          </div>
          <div class="annexDiv">
            <p class="annexName">附：</p>
            <h1>{{orgName}}</h1>
            <div class="annexContainer" v-if="CoopeDataAbstractData.coopPaperAppendix != undefined">
              <h2>{{CoopeDataAbstractData.coopPaperAppendix.name}}{{CoopeDataAbstractData.coopPaperAppendix.dataSource}}</h2>
              <div class="line"></div>
              <div class="annexContent">
                <p>{{CoopeDataAbstractData.coopPaperAppendix.summary}}</p>
                <ul>
                  <li v-for="(item,index) in CoopeDataAbstractData.coopPaperAppendix.contentList" :key="index">{{index+1 + '.'}}{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="annexContainer" v-if="CoopeDataAbstractData.coopProjectAppendix != undefined">
              <h2>{{CoopeDataAbstractData.coopProjectAppendix.name}}{{CoopeDataAbstractData.coopProjectAppendix.dataSource}}</h2>
              <div class="line"></div>
              <div class="annexContent">
                <p>{{CoopeDataAbstractData.coopProjectAppendix.summary}}</p>
                <ul>
                  <li v-for="(item,index) in CoopeDataAbstractData.coopProjectAppendix.contentList" :key="index">{{index + 1 + '.'}}{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="annexContainer" v-if="CoopeDataAbstractData.scienceTechTrainingAppendix != undefined">
              <h2>{{CoopeDataAbstractData.scienceTechTrainingAppendix.name}}{{CoopeDataAbstractData.scienceTechTrainingAppendix.dataSource}}</h2>
              <div class="line"></div>
              <div class="annexContent">
                <p>{{CoopeDataAbstractData.scienceTechTrainingAppendix.summary}}</p>
                <ul>
                  <li v-for="(item,index) in CoopeDataAbstractData.scienceTechTrainingAppendix.contentList" :key="index">{{index + 1 + '.'}}{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="annexContainer" v-if="CoopeDataAbstractData.scienceTechTrainingAppendix != undefined">
              <h2>{{CoopeDataAbstractData.visitOutDataAppendix.name}}{{CoopeDataAbstractData.visitOutDataAppendix.dataSource}}</h2>
              <div class="line"></div>
              <div class="annexContent">
                <p>{{CoopeDataAbstractData.visitOutDataAppendix.summary}}</p>
                <ul>
                  <li v-for="(item,index) in CoopeDataAbstractData.visitOutDataAppendix.contentList" :key="index">{{index + 1 + '.'}}{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="annexContainer" v-if="CoopeDataAbstractData.pifiDataAppendix != undefined">
              <h2>{{CoopeDataAbstractData.pifiDataAppendix.name}}{{CoopeDataAbstractData.pifiDataAppendix.dataSource}}</h2>
              <div class="line"></div>
              <div class="annexContent">
                <p>{{CoopeDataAbstractData.pifiDataAppendix.summary}}</p>
                <ul>
                  <li v-for="(item,index) in CoopeDataAbstractData.pifiDataAppendix.contentList" :key="index">{{index + 1 + '.'}}{{item}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="record-info">
        <span>中国科学院国际合作局 版权所有</span>
        <span class="line">|</span>
        <span>技术支持：中国科学院计算机网络信息中心</span>
      </div>
    </div>
  </div>
</template>

<script>
  import visitFun from '@/assets/js/visit.js'

  export default {
  data() {
    return {
      OrgSelect: "",
      orgData:[],
      columns1: [
        {
          title: "领域",
          key: "field",
          align: 'center',
          // width: 200
        },
        {
          title: "与我院合作论文数量",
          key: "coopPaperCountWithCAS",
          align: 'center',
          // width: 200
        },
        {
          title: "主要合作研究所",
          key: "coopeReseInstit",
          align: 'center',
          // width: 200
        },
        {
          title: "研究所合作论文数量",
          key: "coopPaperCountWithReseInstit",
          align: 'center',
          // width: 200
        },
        {
          title: "中外合作双方姓名",
          key: "coopePersonNames",
          // width: 500,
          render: (h, params) => {
            var data = params.row.coopePersonNames;
            var newArr = [];
            data.forEach(item => {
              newArr.push(h('div',[h('span',item)]))

            })
            return h('div',newArr)
          },
        },
      ],
      columns2: [
        {
          title: "领域",
          key: "field",
          align: 'center',
          // width: 200
        },
        {
          title: "外方论文总数",
          key: "coopPaperCountWithCAS",
          align: 'center',
          // width: 200
          render: (h, params) => {
            if(params.row.coopPaperCountWithCAS != "") {
              return h("span",params.row.coopPaperCountWithCAS)
            }else {
              return h("span","-")
            }
          },
        },
        {
          title: "与我院合作论文数量",
          key: "coopPaperCountWithReseInstit",
          align: 'center',
          // width: 200
          render: (h, params) => {
            if(params.row.coopPaperCountWithReseInstit != "") {
              return h("span",params.row.coopPaperCountWithReseInstit)
            }else {
              return h("span","-")
            }
          },
        },
        {
          title: "主要合作研究所",
          key: "coopeReseInstit",
          align: 'center',
          // width: 300
        },
        {
          title: "研究所合作论文数量",
          key: "foreignPaperCount",
          align: 'center',
          // width: 200
          render: (h, params) => {
            if(params.row.foreignPaperCount != "") {
              return h("span",params.row.foreignPaperCount)
            }else {
              return h("span","-")
            }
          },

        },
        {
          title: "中外合作双方姓名",
          key: "coopePersonNames",
          render: (h, params) => {
            var data = params.row.coopePersonNames;
            var newArr = [];
            data.forEach(item => {
              newArr.push(h('div',[h('span',item)]))

            })
            return h('div',newArr)
          },
        },
      ],
      CoopeDataAbstractData: [],
      loading: false,
      orgName: "澳大利亚联邦科学与工业研究组织",
      orgId: ""
    };
  },
watch: {
    OrgSelect(val) {
      if(val == null) {
        this.OrgSelect = "";
        this.handleCoopeDataAbstract()
      }
    }
  },
  mounted () {
    this.OrgSelect = this.$route.query.orgName;
    this.handleOrg()
    this.handleCoopeDataAbstract()
  },
  methods: {
    //收藏
    favorites(){
      let userId = 'admin'
      let type = '应用助手'
      let content = `应用助手-机构合作数据摘要@${this.OrgSelect}`
      visitFun.favoritesFun(userId,type,content)
    },
    handleClose() {
      this.$router.push("/");
      sessionStorage.clear()
    },
    lastPage(){
        visitFun.lastPage()
      },
    // 机构下拉数据
    handleOrg() {
      this.axios.get("/index/org/autoTipDetail",{params:{query_name: this.orgName}}).then(res => {
        if(res.data.code == 200) {
          var data = res.data.data
          this.orgData = data.map((item) => {
              return {
                value: item.orgId,
                label: item.name,
              };
            });
        }
      })
    },

    // 监听输入的内容
    handleSearch(val) {
      this.orgName = val.split("/")[0];
      // this.orgNameData = val.split("/")[1]
      this.handleOrg()
    },
    // 清除条件
    handleOrgDel(val) {
      this.orgId = val;
      if(this.OrgSelect == undefined) {
        this.OrgSelect = "";
      }
    },
    // 生成报告
    handleCoopeDataAbstract () {
      this.loading = true;
      sessionStorage.clear()
      this.axios.get("/assistant/getCoopeDataAbstract",{params: {orgId: this.orgId}}).then(res => {
        if(res.data.code == 200) {
          this.loading = false;
          this.CoopeDataAbstractData = res.data.data
        }
      })
    },
    // 下载报告
    handleDownloadReport() {
      this.axios.get("/assistant/generateCoopeDataAbstract",{params:{orgId: this.orgId}}).then(res => {

        if(res.data.code == 200) {
          window.location.href = res.data.data.fileDownUrl
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/application/appFl.less";
.application-fr {
  .reportDiv {
    margin: 10px 20px;
    border: 1px dashed #d9dde4;
    background: #fafafa;
    .container {
      width: 1430px;
      margin: 0 auto;
      /deep/ .el-loading-spinner .path {
          stroke: #ff3a25;
        }

        /deep/ .el-loading-spinner .el-loading-text {
          color: #ff3a25;
        }

        /deep/ .el-loading-spinner {
          top: 10%;
        }
      .report-info {
        .logo {
          text-align: center;
          margin: 40px 0 20px 0;
        }
        .title-info {
          text-align: center;
          font-size: 30px;
          color: #393939;
          font-weight: bold;
        }
      }
      .containerDiv {
        margin-top: 20px;
        h2 {
          font-weight: 500;
          font-size: 20px;
          color: #5a78a1;
        }
        p {
          font-size: 18px;
          color: #4b4b4b;
          line-height: 30px;
        }
        // .line {
        //   border-bottom: 1px solid #5a78a1;
        //   margin-top: 10px;
        // }
        .tableDiv {
          margin: 10px;
          p {
            font-size: 16px;
            color: #4b4b4b;
            line-height: 50px;
          }
        }
      }
      .annexDiv {
        margin-top: 50px;
        .annexName {
          font-size: 20px;
          color: #4b4b4b;
        }
        h1 {
          text-align: center;
          font-size: 30px;
          line-height: 60px;
        }
        .annexContainer {
          margin-bottom: 30px;
          h2 {
            font-weight: 500;
            font-size: 20px;
            color: #5a78a1;
            text-align: center;
          }
          .line {
            border-bottom: 1px solid #5a78a1;
            margin-top: 10px;
          }
          .annexContent {
            p {
              font-size: 16px;
              color: #4b4b4b;
              line-height: 50px;
            }
            ul {
              li {
                font-size: 15px;
                line-height: 30px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
