<template>
  <div class="projectDiv">
    <div class="application-fl">
      <div class="app-logo" @click="handlePathIndex">
        <img src="../../assets/images/国际人才/页面固定内容/logo.png" alt />
        <p>中国科学院国际合作</p>
        <p>数据汇交与分析平台</p>
      </div>
      <div class="appTitle">合作项目</div>
      <div class="app-nav">
        <div>
          <router-link tag="li" to="/partner">国际伙伴计划</router-link>
        </div>
        <div>
          <router-link tag="li" to="/projects">科技部国际合作项目</router-link>
        </div>
        <div class="navActive">
          <router-link tag="li" to="/intelligenceProject"
            >外专局引智项目</router-link
          >
        </div>
      </div>
      <div class="app-btm" @click="lastPage">
        <div class="iconfontClose">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="closeName">返回上一页</div>
      </div>
    </div>
    <div class="ex-right" v-show="isSlide">
      <div class="fr-reel fr-reel-detail">
        <div class="fr-reel-left">
          <div class="fr-reelHeader">
            <div class="reel-filterCondition_1">
              <ul>
                <li class="reel-filterCondition_1_li">
                  <el-tooltip
                    class="item"
                    effect="light"
                    content="连续年份请用 - 隔开,例如：2010-2019;不连续年份请用;隔开，例如:2010;2019"
                    placement="top"
                  >
                    <el-input
                      v-model="params['yearSelect']"
                      placeholder="请输入年份"
                      clearable
                    ></el-input>
                  </el-tooltip>
                </li>
                <li class="reel-filterCondition_1_li">
                  <el-select
                    clearable
                    filterable
                    v-model="params['orgSelect']"
                    placeholder="请选择院内机构"
                  >
                    <el-option
                      v-for="item in orgAll"
                      :key="item.index"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </li>
                <li class="reel-filterCondition_1_li">
                  <el-select
                    clearable
                    filterable
                    v-model="params['projectClassSelect']"
                    placeholder="请选择项目类别"
                  >
                    <el-option
                      v-for="item in projectClassAll"
                      :key="item.index"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </li>
                <li class="reel-filterCondition_1_li">
                  <el-select
                    clearable
                    filterable
                    v-model="params['isExecuteSelect']"
                    placeholder="请选择执行状态"
                  >
                    <el-option
                      v-for="item in isExecuteAll"
                      :key="item.index"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </li>
              </ul>
            </div>
            <div
              v-if="
                params['yearSelect'] != '' ||
                params['orgSelect'] != '' ||
                params['projectClassSelect'] != '' ||
                params['isExecuteSelect'] != ''
              "
              class="reel-filterBtns"
              @click="handleProjectListSearch(1)"
            >
              <img :src="searchIconActive" alt="" />
            </div>
            <div
              v-else
              class="reel-filterBtn"
              @mouseenter="clickHover(1)"
              @mouseleave="clickHover(2)"
            >
              <img :src="searchIcon" alt="" />
            </div>

            <div
              v-if="
                params['yearSelect'] != '' ||
                params['orgSelect'] != '' ||
                params['projectClassSelect'] != '' ||
                params['isExecuteSelect'] != ''
              "
              @click="handleEmptysProject(1)"
              class="reel-empty iconfont icon-fanhui1"
            ></div>
            <div v-else class="reel-emptys iconfont icon-fanhui1"></div>
            <div
              v-if="
                params['yearSelect'] != '' ||
                params['orgSelect'] != '' ||
                params['projectClassSelect'] != '' ||
                params['isExecuteSelect'] != ''
              "
              class="reel-DownloadAll reel-DownloadAllsDetail iconfont icon-xiazai"
              @click="handlePdfDownload"
            ></div>
            <div
              v-else
              class="reel-DownloadAlls reel-DownloadAllsDetail iconfont icon-xiazai"
            ></div>
          </div>
          <div class="fr-reelCenter newScrollbar">
            <div class="reelCentent">
              <div class="moduleDiv" ref="projectNumDiv">
                <projectNum
                  :data="projectNumberData"
                  v-loading="loading"
                  element-loading-text="加载中..."
                />
              </div>
              <div class="moduleDiv" ref="fundingMoneryDiv">
                <fundingMonery
                  :data="grantsData"
                  v-loading="loading"
                  element-loading-text="加载中..."
                />
              </div>
            </div>
            <div class="reelBottom" style="margin-top: 10px" ref="orgRankingDiv">
              <orgRanking
                :data="institutesGrantsData"
                v-loading="loading"
                element-loading-text="加载中..."
              />
            </div>

            <div class="reelBottom" ref="institutesMapDiv">
              <institutesMap
                :data="foreignInstitutesMapData"
                v-loading="loading"
                element-loading-text="加载中..."
              />
            </div>
          </div>
        </div>
        <div class="fr-reel-center">
          <div class="iconDiv" @click="handleShutdown">
            <div class="left-icon iconfont icon-shuangjiantouzuo"></div>
            <div class="text">查看详细数据</div>
          </div>
        </div>
        <div class="fr-reel-right"></div>
      </div>
    </div>
    <div class="fr-reel-close">
      <div class="right-icon" @click="handleOpenUp">
        <p>查<br />看<br />统<br />计<br />图<br />表</p>
        <div class="Icon iconfont icon-shuangjiantouyou"></div>
      </div>
    </div>
    <div class="fr-list">
      <div class="breadcrumb">
        <span>合作项目</span>
        <span class="line">/</span>
        <span>外专局引智项目</span>
      </div>
      <div class="ProjectHeader">
        <div class="header-a">
          <h3 class="projectTitleName">外专局引智项目</h3>
          <div class="searchDiv">
            <div class="header_ipt">
              <input
                type="text"
                class="ipt"
                placeholder="请输入项目名称"
                v-model="projectNameVal"
                @input="handlefocus()"
              />
              <div class="searchPersion" @click="handleSearchProject">
                <Icon type="md-search" size="28" />
              </div>
            </div>
            <div class="select-list">
              <div class="ivu-poptip-inner scrollbar" v-show="selectname">
                <ul v-if="result.length !== 0" class="resultdata">
                  <li
                    class="ivu-poptip-body"
                    v-for="(item, k) in result"
                    :key="k + 'x'"
                    @click="handleClickQuery(item)"
                  >
                    <p>
                      <span>{{ item.projectName }}</span>
                    </p>
                  </li>
                </ul>
                <ul v-else>
                  <span class="ivu-poptip-body-content-inner"
                    >暂无匹配数据</span
                  >
                </ul>
              </div>
            </div>
            <Login />
          </div>
        </div>
        <div class="header-b">
          <ul>
            <li>
              <el-tooltip
                class="item"
                effect="light"
                content="连续年份请用 - 隔开,例如：2010-2019;不连续年份请用;隔开，例如:2010;2019"
                placement="top"
              >
                <el-input
                  v-model="params2['yearSelect']"
                  placeholder="请输入年份"
                  clearable
                ></el-input>
              </el-tooltip>
            </li>
            <li>
              <el-select
                clearable
                filterable
                v-model="params2['orgSelect']"
                placeholder="请选择院内机构"
              >
                <el-option
                  v-for="item in orgAll"
                  :key="item.index"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </li>
            <li>
              <el-select
                clearable
                filterable
                v-model="params2['projectClassSelect']"
                placeholder="请选择项目类别"
              >
                <el-option
                  v-for="item in projectClassAll"
                  :key="item.index"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </li>
            <li>
              <el-select
                clearable
                filterable
                v-model="params2['isExecuteSelect']"
                placeholder="请选择执行状态"
              >
                <el-option
                  v-for="item in isExecuteAll"
                  :key="item.index"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </li>
          </ul>
          <div
            v-if="
              params2['yearSelect'] != '' ||
              params2['orgSelect'] != '' ||
              params2['projectClassSelect'] != '' ||
              params2['isExecuteSelect'] != ''
            "
            class="personSearchBTNs"
            @click="handleProjectListSearch(2)"
          ></div>
          <div v-else class="personSearchBTN"></div>
          <div
            @click="handleEmptysProject(2)"
            v-if="
              params2['yearSelect'] != '' ||
              params2['orgSelect'] != '' ||
              params2['projectClassSelect'] != '' ||
              params2['isExecuteSelect'] != ''
            "
            class="reel-empty iconfont icon-fanhui1"
          ></div>
          <div
            v-else
            class="reel-emptys iconfont icon-fanhui1"
            @click="handleEmptysProject(2)"
          ></div>
          <div
            v-if="
              params2['yearSelect'] != '' ||
              params2['orgSelect'] != '' ||
              params2['projectClassSelect'] != '' ||
              params2['isExecuteSelect'] != ''
            "
            @click="handelDownloadExcel"
            class="DownloadLists iconfont icon-xiazai"
          ></div>
          <div v-else class="DownloadList iconfont icon-xiazai" @click="handelDownloadExcel"></div>
        </div>
      </div>
      <div class="count">
        检索到 <span>{{ projectListData.count }}</span
        >条结果
      </div>
      <div
        class="prjectList"
        v-loading="loading"
        element-loading-text="加载中..."
      >
        <Table
          border
          height="680"
          :columns="columns1"
          :data="projectListData.personList"
        ></Table>
      </div>
      <div class="pagination">
        <div class="record-info">
          <span>中国科学院国际合作局 版权所有</span>
          <span class="line">|</span>
          <span>技术支持：中国科学院计算机网络信息中心</span>
        </div>
        <div class="PaginationDiv">
          <Page
            :total="projectListData.count"
            :page-size="params2.limit"
            :current.sync="currentPage"
            @on-change="changePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import visitFun from "@/assets/js/visit.js";

import projectNum from "./modules/projectNum";
import fundingMonery from "./modules/fundingMonery";
import orgRanking from "./modules/orgRanking";
import institutesMap from "./modules/institutesMap";
export default {
  name:'IntelligenceProject',
  components: {
    projectNum,
    fundingMonery,
    orgRanking,
    institutesMap,
  },
  data() {
    return {
      mode: 0,
      params: {
        limit: 60,
        offset: 0,
        yearSelect: "",
        orgSelect: "",
        projectClassSelect: "",
        isExecuteSelect: "",
        citySelect: "",
      },
      params2: {
        limit: 60,
        offset: 0,
        yearSelect: "",
        orgSelect: "",
        projectClassSelect: "",
        isExecuteSelect: "",
        projectNameVal: "",
      },
      projectNameVal: "",
      selectname: false,
      searchIcon: require("../../assets/images/exchange/筛选4.png"),
      searchImg: require("../../assets/images/exchange/筛选4.png"),
      searchIconActive: require("../../assets/images/exchange/筛选.png"),
      currentPage: 1,
      loading: false,
      orgAll: [],
      projectClassAll: [
        "战略科技发展类",
        "战略产业项目",
        "产业技术创新类",
        "农业与乡村振兴类",
        "社会发展项目",
        "其它"
      ],
      isExecuteAll: ["未知", "未执行", "执行完"],
      columns1: [
        {
          title: "年度",
          key: "year",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.year !== "") {
              return h("span", params.row.year);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "项目编号",
          key: "projectNumber",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.projectNumber !== "") {
              return h("span", params.row.projectNumber);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "项目名称",
          key: "projectName",
          width: 400,
          align: "center",
          render: (h, params) => {
            if (params.row.projectName !== "") {
              return h("span", params.row.projectName);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "申报单位",
          key: "applicationUnit",
          width: 300,
          align: "center",
          render: (h, params) => {
            if (params.row.applicationUnit !== "") {
              return h("span", params.row.applicationUnit);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "项目类型",
          key: "projectType",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.projectType !== "") {
              return h("span", params.row.projectType);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "项目类别",
          key: "projectClass",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.projectClass !== "") {
              return h("span", params.row.projectClass);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "行业领域",
          key: "domain",
          width: 150,
          align: "center",
          render: (h, params) => {
            if (params.row.domain !== "") {
              return h("span", params.row.domain);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "资助经费（万元）",
          key: "grants",
          width: 150,
          align: "center",
          render: (h, params) => {
            if (params.row.grants !== "") {
              return h("span", params.row.grants);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "是否执行",
          key: "isExecute",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.isExecute !== "") {
              return h("span", params.row.isExecute);
            } else {
              return h("span", "—");
            }
          },
        },
      ],

      isSlide: true,
      projectNumberData: [],
      grantsData: [],
      institutesGrantsData: [],
      foreignInstitutesMapData: {},
      projectListData: [],
      result: [],
    };
  },
  watch: {
    projectNameVal(val) {
      if (this.projectNameVal) {
        this.handleProjectName(val);
      }
      if (val.length == 0) {
        this.handleProjectName();
      }
    },
  },
  mounted() {
    visitFun.getInstitutionsInTheHospital((data) => {
      this.orgAll = data;
    });
    // visitFun.handleProjectClass((data) => {
    //   this.projectClassAll = data;
    // });
    this.handleProjectNumber();
    this.handleGrants();
    this.handleInstitutesGrants();
    this.handleInstitutesMap();
    this.handlePersonList();
  },
  methods: {
    handlePathIndex() {
      this.$router.push({ path: "/" });
    },
    // 返回上一页
    lastPage(){
        visitFun.lastPage()
      },
    // 关闭卷轴
    handleShutdown() {
      this.isSlide = false;
    },
    //打开卷轴
    handleOpenUp() {
      this.isSlide = true;
    },

    clickHover(val) {
      if (val == 1) {
        this.searchIcon = this.searchIconActive;
      } else {
        this.searchIcon = this.searchImg;
      }
    },

    // 历年合作项目数
    handleProjectNumber() {
      this.loading = true;
      var data = {
        limit: this.params.limit,
        offset: this.params.offset,
        year: this.params.yearSelect,
        instName: this.params.orgSelect,
        projectClass: this.params.projectClassSelect,
        isExecute: this.params.isExecuteSelect,
      };
      this.axios
        .get("/cooperativeProject/foreign/projectNumber", { params: data })
        .then((res) => {
          if (res.data.code == 200) {
            this.loading = false;
            this.projectNumberData = res.data.data.foreignProjectNumberMap;
          }
        });
    },

    // 历年合作项目数
    handleGrants() {
      this.loading = false;
      var data = {
        limit: this.params.limit,
        offset: this.params.offset,
        year: this.params.yearSelect,
        instName: this.params.orgSelect,
        projectClass: this.params.projectClassSelect,
        isExecute: this.params.isExecuteSelect,
      };
      this.axios
        .get("/cooperativeProject/foreign/grants", { params: data })
        .then((res) => {
          if (res.data.code == 200) {
            this.loading = false;
            this.grantsData = res.data.data.foreignGrantsMap;
          }
        });
    },

    // 合作项目资助金额全院机构排名
    handleInstitutesGrants() {
      this.loading = true;
      var data = {
        limit: this.params.limit,
        offset: this.params.offset,
        year: this.params.yearSelect,
        instName: this.params.orgSelect,
        projectClass: this.params.projectClassSelect,
        isExecute: this.params.isExecuteSelect,
      };
      this.axios
        .get("/cooperativeProject/foreign/institutesGrants", {
          params: data,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.loading = false;
            this.institutesGrantsData =
              res.data.data.foreignInstitutesGrantsMap;
          }
        });
    },

    //  院所分布
    handleInstitutesMap() {
      this.loading = true;
      var data = {
        limit: this.params.limit,
        offset: this.params.offset,
        year: this.params.yearSelect,
        instName: this.params.orgSelect,
        projectClass: this.params.projectClassSelect,
        isExecute: this.params.isExecuteSelect,
        city: this.params.citySelect,
      };
      this.axios
        .get("/cooperativeProject/foreign/institutes", { params: data })
        .then((res) => {
          if (res.data.code == 200) {
            this.loading = false;
            this.foreignInstitutesMapData = {
              data: {
                org: {},
                cityCount: {},
                cityLongAndLat: [],
                params: this.params2,
              },
            };
            this.foreignInstitutesMapData.data.org =
              res.data.data.foreignInstitutesMap.org;
            this.foreignInstitutesMapData.data.cityCount =
              res.data.data.foreignInstitutesMap.mapData;
            this.foreignInstitutesMapData.data.cityLongAndLat.push(
              res.data.data.foreignInstitutesMap.city
            );
          }
        });
    },

    // 项目列表
    handlePersonList() {
      this.loading = true;
      this.axios
        .get("/cooperativeProject/foreign/personList", {
          params: {
            limit: this.params2.limit,
            offset: this.params2.offset,
            year: this.params2.yearSelect,
            instName: this.params2.orgSelect,
            projectClass: this.params2.projectClassSelect,
            isExecute: this.params2.isExecuteSelect,
            projectName: this.params2.projectNameVal,
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.loading = false;
            this.projectListData = res.data.data.foreignPersonListMap;
          }
        });
    },
    changePage(event) {
      this.loading = true;
      this.params2.offset = event - 1;
      this.handlePersonList();
    },

    // 项目列表按条件查询
    handleProjectListSearch(val) {
      if (val == 1) {
        this.handleProjectNumber();
        this.handleGrants();
        this.handleInstitutesGrants();
        this.handleInstitutesMap();
      } else if (val == 2) {
        this.handlePersonList();
      }
    },

    // 清空项目列表条件
    handleEmptysProject(val) {
      if (val == 1) {
        this.params = {
          limit: 60,
          offset: 0,
          yearSelect: "",
          orgSelect: "",
          projectClassSelect: "",
          isExecuteSelect: "",
        };
        this.handleProjectNumber();
        this.handleGrants();
        this.handleInstitutesGrants();
        this.handleInstitutesMap();
      } else if (val == 2) {
        this.projectNameVal = "";
        this.params2 = {
          limit: 60,
          offset: 0,
          yearSelect: "",
          orgSelect: "",
          projectClassSelect: "",
          isExecuteSelect: "",
          projectNameVal: "",
        };
        this.handlePersonList();
      }
    },

    // 项目搜索
    async handleProjectName(val) {
      this.axios
        .get("/cooperativeProject/foreign/personSearch", {
          params: {
            limit: this.params2.limit,
            offset: this.params2.offset,
            projectName: this.projectNameVal,
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.result = res.data.data.personSearchMap.searchVoList;
          }
        });
    },
    handlefocus() {
      this.selectname = true;
    },

    handleClickQuery(val) {
      this.projectNameVal = val.projectName;
      this.params2.projectNameVal = this.projectNameVal;
      this.selectname = false;
    },
    handleSearchProject() {
      if (!!this.params2.projectNameVal) {
        this.handlePersonList();
      }
    },

    // 导出excel
    handelDownloadExcel() {
      this.axios
        .get("/cooperativeProject/foreign/export/personList", {
          params: {
            limit: 1000,
            offset: this.params2.offset,
            year: this.params2.yearSelect,
            instName: this.params2.orgSelect,
            projectClass: this.params2.projectClassSelect,
            isExecute: this.params2.isExecuteSelect,
            projectName: this.params2.projectNameVal,
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            window.open(res.data.data.fileDownUrl);
          }
        });
    },

    // pdf导出
    handlePdfDownload () {
      let _this = this;
      let data = {
        year : this.params.yearSelect,
        projectClass: this.params.projectClassSelect,
        instName : this.params.orgSelect,
        isExecute: this.params.isExecuteSelect,
        leftLineChartImage: "",
        rightLineChartImage: "",
        histogram: "",
        mapImage: "",
        source: "合作项目"
      }
      let p1 = new Promise((resolve, reject) => {
        let projectNumDiv = _this.$refs.projectNumDiv;
        visitFun.getImgBase64(projectNumDiv).then((res) => {
          data.leftLineChartImage = res.split(",")[1];
          resolve(true);
        });
      });
      let p2 = new Promise((resolve, reject) => {
        let fundingMoneryDiv = _this.$refs.fundingMoneryDiv;
        visitFun.getImgBase64(fundingMoneryDiv).then((res) => {
          data.rightLineChartImage = res.split(",")[1];
          resolve(true);
        });
      });
      let p3 = new Promise((resolve, reject) => {
        let orgRankingDiv = _this.$refs.orgRankingDiv;
        visitFun.getImgBase64(orgRankingDiv).then((res) => {
          data.histogram = res.split(",")[1];
          resolve(true);
        });
      });
      let p4 = new Promise((resolve, reject) => {
        let institutesMapDiv = _this.$refs.institutesMapDiv;
        visitFun.getImgBase64(institutesMapDiv).then((res) => {
          data.mapImage = res.split(",")[1];
          resolve(true);
        });
      });
      let time = setTimeout(() => {
        this.axios.post("/cooperativeProject/pdfDownload",this.$qs.stringify(data)).then(res => {
          // console.log(res)
        if(res.data.code == 200) {
           window.open(res.data.msg)
          }
      })
      },5000)

    }
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/project/index.less";

.reel-filterCondition_1 {
  width: 85%;
  ul {
    .reel-filterCondition_1_li:last-child {
      border-right: 1px solid #d9dde4;
    }
    li {
      float: left;
      width: 300px;
      /deep/ .el-scrollbar__wrap {
        max-width: 500px;
      }
      /deep/ .el-input {
        width: 300px;

        input {
          text-align: center;
          border-radius: 0;
          border-color: #d9dde4;
          // border-right: 1px solid #d9dde4;
          border-right: 0;
        }
        // input:nth-child(5),input:nth-child(6),input:nth-child(7),input:nth-child(8) {
        //   border-top: none;
        // }

        input::-webkit-input-placeholder {
          color: #737886 !important;
        }

        input::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #737886 !important;
        }

        input:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #737886 !important;
        }

        input:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: #737886 !important;
        }
      }
    }
  }
}
.reel-filterBtn {
  width: 40px;
  height: 40px;
  background: #f1f3f6;
  border-radius: 10px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  margin: 0 10px;
  cursor: pointer;
}

.reel-filterBtns {
  width: 40px;
  height: 40px;
  background: #f1f3f6;
  border-radius: 10px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: #727272;
  margin: 0 10px;
  cursor: pointer;
}

.reel-empty {
  width: 40px;
  height: 40px;
  background: #ff3a25;
  border-radius: 10px;
  line-height: 40px;
  font-size: 20px;
  color: #fff;
  text-align: center;
  margin-right: 70px;
  cursor: pointer;
}

.reel-emptys {
  width: 40px;
  height: 40px;
  background: #f1f3f6;
  border-radius: 10px;
  line-height: 40px;
  font-size: 20px;
  color: #727272;
  text-align: center;
  // margin-right: 120px;
  cursor: pointer;

  &:hover {
    background: #ff3a25;
    color: #fff;
  }
}

.reel-DownloadAll {
  float: right;
  width: 40px;
  height: 40px;
  background: #ff3a25;
  border-radius: 10px;
  line-height: 40px;
  font-size: 20px;
  color: #fff;
  text-align: center;
}

.reel-DownloadAlls {
  position: absolute;
  right: 0;
  width: 40px;
  height: 40px;
  background: #f1f3f6;
  border-radius: 10px;
  line-height: 40px;
  font-size: 20px;
  color: #727272;
  text-align: center;

  &:hover {
    background: #ff3a25;
    color: #fff;
  }
}
.header-b {
  display: flex;
  width: 100%;
  margin-top: 10px;

  ul {
    // display: flex;
    width: 86%;
    overflow: hidden;

    li {
      width: 320px;
      height: 45px;
      float: left;
      // border: 1px solid #ccc;

      /deep/ .el-input {
        width: 320px;

        input {
          text-align: center;
          border-radius: 0;
          border-color: #fff;
          background: #ff3a25;
          border-right: 0;
          height: 45px;
          line-height: 45px;
          color: #fff;
        }

        .el-input__icon {
          color: #fff;
        }

        input::-webkit-input-placeholder {
          color: #fff !important;
        }

        input::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #fff !important;
        }

        input:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #fff !important;
        }

        input:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: #fff !important;
        }
      }
    }
  }

  .personSearchBTN {
    width: 50px;
    height: 40px;
    cursor: pointer;
    border: 1px solid #d9dde4;
    border-radius: 10px;
    background: url("../../assets/images/国际人才/筛选0.png") no-repeat;
    background-size: 100% 100%;

    &:hover {
      background: url("../../assets/images/国际人才/筛选1.png") no-repeat;
      background-size: 100% 100%;
    }
  }

  .personSearchBTNs {
    width: 50px;
    height: 40px;
    cursor: pointer;
    background: url("../../assets/images/国际人才/筛选1.png") no-repeat;
    background-size: 100% 100%;
  }

  .reel-empty {
    width: 40px;
    height: 40px;
    background: #ff3a25;
    border-radius: 10px;
    line-height: 40px;
    font-size: 20px;
    border: 1px solid #d9dde4;
    border-radius: 10px;
    color: #fff;
    text-align: center;
    margin: 0 20px;
    cursor: pointer;
  }

  .reel-emptys {
    width: 40px;
    height: 40px;
    background: #f1f3f6;
    border-radius: 10px;
    line-height: 40px;
    font-size: 20px;
    color: #727272;
    text-align: center;
    cursor: pointer;
    border: 1px solid #d9dde4;
    border-radius: 10px;
    margin: 0 20px;

    &:hover {
      background: #ff3a25;
      color: #fff;
    }
  }

  .DownloadList {
    width: 40px;
    height: 40px;
    background: #f3f5f7;
    color: #727272;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
    border: 1px solid #d9dde4;
    border-radius: 10px;

    &:hover {
      background: #ff3925;
      color: #fff;
    }
  }

  .DownloadLists {
    width: 40px;
    height: 40px;
    background: #ff3925;
    color: #fff;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
    border-radius: 10px;
  }
}
</style>
