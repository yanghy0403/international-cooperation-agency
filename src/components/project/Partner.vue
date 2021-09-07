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
        <div class="navActive">
          <router-link tag="li" to="/partner">国际伙伴计划</router-link>
        </div>
        <div>
          <router-link tag="li" to="/projects">科技部国际合作项目</router-link>
        </div>
        <div>
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
                  <el-cascader
                    :options="areaoptions"
                    v-model="globalArea"
                    :show-all-levels="false"
                    placeholder="请选择地区"
                    filterable
                    clearable
                    :props="areaProps"
                  >
                  </el-cascader>
                </li>
                <li class="reel-filterCondition_1_li">
                  <el-select
                    clearable
                    filterable
                    v-model="params['foreignOrgSelect']"
                    placeholder="请选择国外机构"
                  >
                    <el-option
                      v-for="item in foreignOrgAll"
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
                    v-model="params['subjectSelect']"
                    placeholder="请选择项目学科"
                  >
                    <el-option
                      v-for="item in subjectAll"
                      :key="item.index"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </li>
                <li class="reel-filterCondition_1_li">
                  <el-select
                    clearable
                    filterable
                    v-model="params['executeYearSelect']"
                    placeholder="请选择执行年限"
                  >
                    <el-option
                      v-for="item in executeYearAll"
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
                    v-model="params['executeStateSelect']"
                    placeholder="请选择执行状态"
                  >
                    <el-option
                      v-for="item in executeStateAll"
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
                globalArea != '' ||
                params['foreignOrgSelect'] != '' ||
                params['projectClassSelect'] != '' ||
                params['subjectSelect'] != '' ||
                params['executeYearSelect'] != '' ||
                params['executeStateSelect'] != ''
              "
              class="reel-filterBtns"
              @click="handleReelCondition(1)"
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
                globalArea != '' ||
                params['foreignOrgSelect'] != '' ||
                params['projectClassSelect'] != '' ||
                params['subjectSelect'] != '' ||
                params['executeYearSelect'] != '' ||
                params['executeStateSelect'] != ''
              "
              @click="handleEmptysProject(1)"
              class="reel-empty iconfont icon-fanhui1"
            ></div>
            <div v-else class="reel-emptys iconfont icon-fanhui1"></div>
            <div
              v-if="
                params['yearSelect'] != '' ||
                params['orgSelect'] != '' ||
                globalArea != '' ||
                params['foreignOrgSelect'] != '' ||
                params['projectClassSelect'] != '' ||
                params['subjectSelect'] != '' ||
                params['executeYearSelect'] != '' ||
                params['executeStateSelect'] != ''
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
              <div class="moduleDiv" ref="subjectAreasDiv">
                <subjectAreas
                  :data="subjectData"
                  :subjectSelect="params['subjectSelect']"
                  v-loading="loading"
                  element-loading-text="加载中..."
                />
              </div>
            </div>
            <div class="reelCentent" style="margin-top: 10px">
              <div class="moduleDiv" ref="fundingMoneryDiv">
                <fundingMonery
                  :data="fundingMoneryData"
                  v-loading="loading"
                  element-loading-text="加载中..."
                />
              </div>
              <div class="moduleDiv" ref="orgRankingDiv">
                <orgRanking
                  :data="fundingMonerynIstitutesMapData"
                  v-loading="loading"
                  element-loading-text="加载中..."
                />
              </div>
            </div>

            <div class="reelBottom" ref="partnerGlobalMapDiv">
              <partnerGlobalMap
                :data="GlobalData"
                :InstituteData="institutesData"
                :mark="markName"
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
        <span>国际伙伴计划</span>
      </div>
      <div class="ProjectHeader">
        <div class="header-a">
          <h3 class="projectTitleName">国际伙伴计划</h3>
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
            <li class="reel-filterCondition_1_li">
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
            <li class="reel-filterCondition_1_li">
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
            <li class="reel-filterCondition_1_li">
              <el-cascader
                :options="areaoptions"
                v-model="globalArea2"
                :show-all-levels="false"
                placeholder="请选择地区"
                filterable
                clearable
                :props="areaProps"
              >
              </el-cascader>
            </li>
            <li class="reel-filterCondition_1_li">
              <el-select
                clearable
                filterable
                v-model="params2['foreignOrgSelect']"
                placeholder="请选择国外机构"
              >
                <el-option
                  v-for="item in foreignOrgAll"
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
            <li class="reel-filterCondition_1_li">
              <el-select
                clearable
                filterable
                v-model="params2['subjectSelect']"
                placeholder="请选择项目学科"
              >
                <el-option
                  v-for="item in subjectAll"
                  :key="item.index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </li>
            <li class="reel-filterCondition_1_li">
              <el-select
                clearable
                filterable
                v-model="params2['executeYearSelect']"
                placeholder="请选择执行年限"
              >
                <el-option
                  v-for="item in executeYearAll"
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
                v-model="params2['executeStateSelect']"
                placeholder="请选择执行状态"
              >
                <el-option
                  v-for="item in executeStateAll"
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
              globalArea2 != '' ||
              params2['foreignOrgSelect'] != '' ||
              params2['projectClassSelect'] != '' ||
              params2['subjectSelect'] != '' ||
              params2['executeYearSelect'] != '' ||
              params2['executeStateSelect'] != ''
            "
            class="personSearchBTNs"
            @click="handleReelCondition(2)"
          ></div>
          <div v-else class="personSearchBTN"></div>
          <div
            @click="handleEmptysProject(2)"
            v-if="
              params2['yearSelect'] != '' ||
              params2['orgSelect'] != '' ||
              globalArea2 != '' ||
              params2['foreignOrgSelect'] != '' ||
              params2['projectClassSelect'] != '' ||
              params2['subjectSelect'] != '' ||
              params2['executeYearSelect'] != '' ||
              params2['executeStateSelect'] != ''
            "
            class="reel-empty iconfont icon-fanhui1"
          ></div>
          <div v-else class="reel-emptys iconfont icon-fanhui1"></div>
          <div
            v-if="
              params2['yearSelect'] != '' ||
              params2['orgSelect'] != '' ||
              globalArea2 != '' ||
              params2['foreignOrgSelect'] != '' ||
              params2['projectClassSelect'] != '' ||
              params2['subjectSelect'] != '' ||
              params2['executeYearSelect'] != '' ||
              params2['executeStateSelect'] != ''
            "
            class="DownloadLists iconfont icon-xiazai"
          ></div>
          <div
            v-else
            class="DownloadList iconfont icon-xiazai"
            @click="handelDownloadExcel"
          ></div>
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
          height="620"
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
import Axios from "axios";

import projectNum from "./modules/projectNum";
import fundingMonery from "./modules/fundingMonery";
import subjectAreas from "./modules/IdentitySubjectAreas";
import orgRanking from "./modules/orgRanking";
import partnerGlobalMap from "./modules/partnerGlobalMap";
export default {
  name:'Partner',
  components: {
    projectNum,
    fundingMonery,
    subjectAreas,
    orgRanking,
    partnerGlobalMap,
  },
  data() {
    return {
      mode: 0,
      markName: "国际伙伴计划",
      params: {
        limit: "60", // 每页显示条数
        offset: "1", // 页码
        yearSelect: "",
        continentSelect: "", //大洲
        countrySelect: "", //国家
        citySelect: "", //城市
        orgSelect: "",
        foreignOrgSelect: "",
        projectClassSelect: "",
        executeYearSelect: "",
        subjectSelect: "",
        executeStateSelect: "",
      },
      params2: {
        limit: 60, // 每页显示条数
        offset: 0, // 页码
        yearSelect: "",
        projectNameVal: "",
        continentSelect: "", //大洲
        countrySelect: "", //国家
        citySelect: "", //城市
        orgSelect: "",
        foreignOrgSelect: "",
        projectClassSelect: "",
        executeYearSelect: "",
        subjectSelect: "",
        executeStateSelect: "",
      },
      projectNameVal: "",
      searchIcon: require("../../assets/images/exchange/筛选4.png"),
      searchImg: require("../../assets/images/exchange/筛选4.png"),
      searchIconActive: require("../../assets/images/exchange/筛选.png"),
      orgAll: [],
      foreignOrgAll: [],
      subjectAll: [],
      projectClassAll: [],
      executeYearAll: [],
      executeStateAll: ["未执行", "执行中", "执行完"],
      selectname: false,
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
          title: "承担单位",
          key: "instName",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.instName !== "") {
              return h("span", params.row.instName);
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
          title: "项目负责人",
          key: "principal",
          width: 150,
          align: "center",
          render: (h, params) => {
            if (params.row.principal !== "") {
              return h("span", params.row.principal);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "项目类别",
          key: "instProjectClass",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.instProjectClass !== "") {
              return h("span", params.row.instProjectClass);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "合作机构",
          key: "cooperationInstArr",
          width: 300,
          align: "center",
          render: (h, params) => {
            var data = params.row.cooperationInstArr;

            var newArr = [];
            data.forEach((item) => {
              newArr.push(h("div", [h("span", item)]));
            });
            return h("div", newArr);
          },
        },
        {
          title: "合作国别",
          key: "cooperationCountryArr",
          width: 200,
          align: "center",
          render: (h, params) => {
            var data = params.row.cooperationCountryArr;

            var newArr = [];
            data.forEach((item) => {
              newArr.push(h("div", [h("span", item)]));
            });
            return h("div", newArr);
          },
        },
        {
          title: "合作城市",
          key: "cooperationCityArr",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.cooperationCityArr != []) {
              var data = params.row.cooperationCityArr;
              var newArr = [];
              data.forEach((item) => {
                newArr.push(h("div", [h("span", item)]));
              });
              return h("div", newArr);
            } else {
              return h("span", "—");
            }
          },
        },
        // {
        //   title: "执行年限",
        //   key: "address",
        //   width: 200,
        //   align: "center",
        // },
        {
          title: "开始时间",
          key: "beginDate",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.beginDate !== "") {
              return h("span", params.row.beginDate);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "结束时间",
          key: "endDate",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.endDate !== "") {
              return h("span", params.row.endDate);
            } else {
              return h("span", "—");
            }
          },
        },
        // {
        //   title: "执行状态",
        //   key: "address",
        //   width: 200,
        //   align: "center",
        // },
        {
          title: "所属学科",
          key: "instSubject",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.instSubject !== "") {
              return h("span", params.row.instSubject);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "资助金额（万元）",
          key: "fundingMonery",
          width: 250,
          align: "center",
          render: (h, params) => {
            if (params.row.fundingMonery !== "") {
              return h("span", params.row.fundingMonery);
            } else {
              return h("span", "—");
            }
          },
        },
        // {
        //   title: "填表时间",
        //   key: "age",
        //   width: 200,
        //   align: "center",
        // },
      ],

      isSlide: true,
      loading: false,

      globalArea: "",
      globalArea2: "",
      areaoptions: [
        {
          value: "1-亚洲",
          label: "亚洲",
        },
        {
          value: "1-非洲",
          label: "非洲",
        },
        {
          value: "1-北美洲",
          label: "北美洲",
        },
        {
          value: "1-南美洲",
          label: "南美洲",
        },
        {
          value: "1-欧洲",
          label: "欧洲",
        },
        {
          value: "1-南极洲",
          label: "南极洲",
        },
        {
          value: "1-大洋洲",
          label: "大洋洲",
        },
      ],
      areaProps: {
        lazy: true,
        checkStrictly: true,
        lazyLoad(node, resolve) {
          let that = this;
          const { level } = node;
          let nodeIndex = node.level; //  第几级，1代表1一级，2代表第二级，以此类推
          let label = node.label;
          if (nodeIndex == 1) {
            Axios.get("/index/country/autoTip", {
              params: {
                city: "",
                continent: label,
                countrySimpleZhName: "",
                language: "",
                source: "",
              },
            }).then((res) => {
              if (res.data.code == 200) {
                let data = res.data.data.name;
                let newCountryData = [];
                data.forEach((item, index) => {
                  newCountryData.push({
                    value: `2-${item}`,
                    label: item,
                  });
                });
                resolve(newCountryData);
              }
            });
          } else if (nodeIndex == 2) {
            Axios.get("/index/city/autoTip", {
              params: {
                city: "",
                continent: "",
                country: label,
                language: "",
                source: "",
              },
            }).then((res) => {
              if (res.data.code == 200) {
                let data = res.data.data;
                let newCountryData = [];
                data.forEach((item, index) => {
                  newCountryData.push({
                    value: `3-${item}`,
                    label: item,
                    leaf: level >= 2,
                  });
                });
                resolve(newCountryData);
              }
            });
          } else {
            resolve(true);
          }
          // 通过调用resolve将子节点数据返回，通知组件数据加载完成
        },
      },

      currentPage: 1,
      projectNumberData: [], // 历年合作项目数
      fundingMoneryData: [],
      subjectData: {},
      fundingMonerynIstitutesMapData: [],
      projectListData: [],
      GlobalData: {},
      institutesData: {},

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
    // visitFun.getInstitutionsInTheHospitalOut((data) => {
    //   this.foreignOrgAll = data;
    // });
    // 项目类别
    visitFun.handleProjectClass((data) => {
      this.projectClassAll = data;
    });
    visitFun.handleSubject((data) => {
      this.subjectAll = data;
    });
    this.handleForeignOrg();
    this.handleExecuteYear();
    this.handleProjectNumber();
    this.handleSubjectList();
    this.handleFundingMonery();
    this.handleFundingMonerynIstitutes();
    this.handleGlobalMap();
    this.handleInstitutesMap();
    this.handleProjectLiist();
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

    //  执行年限
    handleExecuteYear() {
      this.axios
        .get("/cooperativeProject/internationalPartners/executeYear/searching")
        .then((res) => {
          if (res.data.code == 200) {
            this.executeYearAll = res.data.data;
          }
        });
    },

    // 国外机构
    handleForeignOrg() {
      this.axios
        .get(
          "/cooperativeProject/internationalPartners/cooperationInst/searching"
        )
        .then((res) => {
          if (res.data.code == 200) {
            this.foreignOrgAll = res.data.data;
          }
        });
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
      var countrySelect = this.params.countrySelect.split("/")[0];
      var data = {
        continent: this.params.continentSelect,
        cooperationCity: this.params.citySelect,
        cooperationCountry: countrySelect,
        cooperationInst: this.params.foreignOrgSelect,
        instName: this.params.orgSelect,
        limit: this.params.limit,
        offset: this.params.offset,
        projectClass: this.params.projectClassSelect,
        subject: this.params.subjectSelect,
        year: this.params.yearSelect,
        executeYear: this.params.executeYearSelect,
        executeState: this.params.executeStateSelect,
      };
      this.axios
        .get("/cooperativeProject/internationalPartners/projectNumber", {
          params: data,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.loading = false;
            this.projectNumberData = res.data.data.ProjectNumberMap;
          }
        });
    },

    // 合作项目学科分布
    handleSubjectList() {
      this.loading = true;
      var countrySelect = this.params.countrySelect.split("/")[0];
      var data = {
        continent: this.params.continentSelect,
        cooperationCity: this.params.citySelect,
        cooperationCountry: countrySelect,
        cooperationInst: this.params.foreignOrgSelect,
        instName: this.params.orgSelect,
        limit: this.params.limit,
        offset: this.params.offset,
        projectClass: this.params.projectClassSelect,
        subject: this.params.subjectSelect,
        year: this.params.yearSelect,
        executeYear: this.params.executeYearSelect,
        executeState: this.params.executeStateSelect,
      };
      this.axios
        .get("/cooperativeProject/internationalPartners/subject", {
          params: data,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.loading = false;
            let newParams = JSON.parse(JSON.stringify(this.params));
            this.subjectData = {
              subject: res.data.data.subjectMap.subject,
              subSubject: res.data.data.subjectMap.subSubject.value,
              continent: this.params.continentSelect,
              cooperationCity: this.params.citySelect,
              cooperationCountry: countrySelect,
              cooperationInst: this.params.foreignOrgSelect,
              instName: this.params.orgSelect,
              limit: this.params.limit,
              offset: this.params.offset,
              projectClass: this.params.projectClassSelect,
              subjectSelect: this.params.subjectSelect,
              year: this.params.yearSelect,
              executeYear: this.params.executeYearSelect,
              executeState: this.params.executeStateSelect,
            };
          }
        });
    },

    //  历年合作项目资助金额
    handleFundingMonery() {
      this.loading = true;
      var countrySelect = this.params.countrySelect.split("/")[0];
      var data = {
        continent: this.params.continentSelect,
        cooperationCity: this.params.citySelect,
        cooperationCountry: countrySelect,
        cooperationInst: this.params.foreignOrgSelect,
        instName: this.params.orgSelect,
        limit: this.params.limit,
        offset: this.params.offset,
        projectClass: this.params.projectClassSelect,
        subject: this.params.subjectSelect,
        year: this.params.yearSelect,
        executeYear: this.params.executeYearSelect,
        executeState: this.params.executeStateSelect,
      };
      this.axios
        .get("/cooperativeProject/internationalPartners/fundingMonery", {
          params: data,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.loading = false;
            this.fundingMoneryData = res.data.data.fundingMoneryMap;
          }
        });
    },

    // 合作项目资助金额全院机构排名
    handleFundingMonerynIstitutes() {
      this.loading = true;
      var countrySelect = this.params.countrySelect.split("/")[0];
      var data = {
        continent: this.params.continentSelect,
        cooperationCity: this.params.citySelect,
        cooperationCountry: countrySelect,
        cooperationInst: this.params.foreignOrgSelect,
        instName: this.params.orgSelect,
        limit: this.params.limit,
        offset: this.params.offset,
        projectClass: this.params.projectClassSelect,
        subject: this.params.subjectSelect,
        year: this.params.yearSelect,
        executeYear: this.params.executeYearSelect,
        executeState: this.params.executeStateSelect,
      };
      this.axios
        .get(
          "/cooperativeProject/internationalPartners/fundingMonerynIstitutes",
          { params: data }
        )
        .then((res) => {
          if (res.data.code == 200) {
            this.loading = false;
            this.fundingMonerynIstitutesMapData =
              res.data.data.fundingMonerynIstitutesMap;
          }
        });
    },

    // 全球分布
    handleGlobalMap() {
      this.loading = true;
      var countrySelect = this.params.countrySelect.split("/")[0];
      var data = {
        continent: this.params.continentSelect,
        cooperationCity: this.params.citySelect,
        cooperationCountry: countrySelect,
        cooperationInst: this.params.foreignOrgSelect,
        instName: this.params.orgSelect,
        limit: this.params.limit,
        offset: this.params.offset,
        projectClass: this.params.projectClassSelect,
        subject: this.params.subjectSelect,
        year: this.params.yearSelect,
        executeYear: this.params.executeYearSelect,
        executeState: this.params.executeStateSelect,
      };
      this.axios
        .get("/cooperativeProject/internationalPartners/global", {
          params: data,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.loading = false;
            this.GlobalData = {
              geoCoordMap: res.data.data.globalMap.jw,
              continentData: res.data.data.globalMap.country,
              continent: this.params.continentSelect,
              cooperationCity: this.params.citySelect,
              cooperationCountry: countrySelect,
              cooperationInst: this.params.foreignOrgSelect,
              instName: this.params.orgSelect,
              limit: this.params.limit,
              offset: this.params.offset,
              projectClass: this.params.projectClassSelect,
              subjectSelect: this.params.subjectSelect,
              year: this.params.yearSelect,
              executeYear: this.params.executeYearSelect,
              executeState: this.params.executeStateSelect,
            };
          }
        });
    },
    //院所分布
    handleInstitutesMap() {
      this.loading = true;
      var countrySelect = this.params.countrySelect.split("/")[0];
      var data = {
        continent: this.params.continentSelect,
        cooperationCity: this.params.citySelect,
        cooperationCountry: countrySelect,
        cooperationInst: this.params.foreignOrgSelect,
        instName: this.params.orgSelect,
        limit: this.params.limit,
        offset: this.params.offset,
        projectClass: this.params.projectClassSelect,
        subject: this.params.subjectSelect,
        year: this.params.yearSelect,
        executeYear: this.params.executeYearSelect,
        executeState: this.params.executeStateSelect,
      };
      this.axios
        .get("/cooperativeProject/internationalPartners/institutes", {
          params: data,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.loading = false;
            this.institutesData = {
              data: {
                org: {},
                cityCount: {},
                cityLongAndLat: [],
              },
            };
            this.institutesData.data.org = res.data.data.institutesMap.org;
            this.institutesData.data.cityCount =
              res.data.data.institutesMap.mapData;
            this.institutesData.data.cityLongAndLat.push(
              res.data.data.institutesMap.city
            );
          }
        });
    },

    // 项目列表
    handleProjectLiist() {
      this.loading = true;
      var countrySelect = this.params.countrySelect.split("/")[0];
      this.axios
        .get("/cooperativeProject/internationalPartners/personList", {
          params: {
            continent: this.params2.continentSelect,
            cooperationCity: this.params2.citySelect,
            cooperationCountry: countrySelect,
            cooperationInst: this.params2.foreignOrgSelect,
            instName: this.params2.orgSelect,
            limit: this.params2.limit,
            offset: this.params2.offset,
            projectClass: this.params2.projectClassSelect,
            subject: this.params2.subjectSelect,
            year: this.params2.yearSelect,
            executeYear: this.params2.executeYearSelect,
            executeState: this.params2.executeStateSelect,
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.loading = false;
            this.projectListData = res.data.data.personListMap;
          }
        });
    },

    // 分页
    changePage(event) {
      this.loading = true;
      this.params2.offset = event - 1;
      this.handleProjectLiist();
    },

    // 卷轴图谱条件筛选
    handleReelCondition(val) {
      if (val == 1) {
        if (this.globalArea != "") {
          this.params["continentSelect"] = "";
          this.params["countrySelect"] = "";
          this.params["citySelect"] = "";
          let length = this.globalArea.length;
          if (length == 1) {
            this.params["continentSelect"] = this.globalArea[length - 1].split(
              "-"
            )[1];
          } else if (length == 2) {
            this.params["countrySelect"] = this.globalArea[length - 1].split(
              "-"
            )[1];
          } else if (length == 3) {
            this.params["citySelect"] = this.globalArea[length - 1].split(
              "-"
            )[1];
          }
        }
        this.secondLevelSearch();
      } else if (val == 2) {
        if (this.globalArea2 != "") {
          this.params2["continentSelect"] = "";
          this.params2["countrySelect"] = "";
          this.params2["citySelect"] = "";
          let length = this.globalArea2.length;
          if (length == 1) {
            this.params2["continentSelect"] = this.globalArea2[
              length - 1
            ].split("-")[1];
          } else if (length == 2) {
            this.params2["countrySelect"] = this.globalArea2[length - 1].split(
              "-"
            )[1];
          } else if (length == 3) {
            this.params2["citySelect"] = this.globalArea2[length - 1].split(
              "-"
            )[1];
          }
        }
        this.handleProjectLiist();
      }
    },

    secondLevelSearch() {
      this.handleProjectNumber();
      this.handleSubjectList();
      this.handleFundingMonery();
      this.handleFundingMonerynIstitutes();
      this.handleGlobalMap();
      this.handleInstitutesMap();
    },

    handleEmptysProject(val) {
      if (val == 1) {
        this.globalArea = "";
        this.params = {
          limit: "60", // 每页显示条数
          offset: "1", // 页码
          yearSelect: "",
          continentSelect: "", //大洲
          countrySelect: "", //国家
          citySelect: "", //城市
          orgSelect: "",
          foreignOrgSelect: "",
          projectClassSelect: "",
          executeYearSelect: "",
          subjectSelect: "",
          executeStateSelect: "",
        };
        this.secondLevelSearch();
      }
      if (val == 2) {
        this.globalArea2 = "";
        this.params2 = {
          limit: "60", // 每页显示条数
          offset: "1", // 页码
          yearSelect: "",
          continentSelect: "", //大洲
          countrySelect: "", //国家
          citySelect: "", //城市
          orgSelect: "",
          foreignOrgSelect: "",
          projectClassSelect: "",
          executeYearSelect: "",
          subjectSelect: "",
          executeStateSelect: "",
        };
        this.handleProjectLiist();
      }
    },

    // 项目搜索
    async handleProjectName(val) {
      this.axios
        .get("/cooperativeProject/internationalPartners/personSearch", {
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
        this.handleProjectLiist();
      }
    },

    // 导出excel
    handelDownloadExcel() {
      var countrySelect = this.params.countrySelect.split("/")[0];
      this.axios
        .get("/cooperativeProject/internationalPartners/export/personList", {
          params: {
            continent: this.params2.continentSelect,
            cooperationCity: this.params2.citySelect,
            cooperationCountry: countrySelect,
            cooperationInst: this.params2.foreignOrgSelect,
            instName: this.params2.orgSelect,
            limit: 1000,
            offset: this.params2.offset,
            projectClass: this.params2.projectClassSelect,
            subject: this.params2.subjectSelect,
            year: this.params2.yearSelect,
            executeYear: this.params2.executeYearSelect,
            executeState: this.params2.executeStateSelect,
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            window.open(res.data.data.fileDownUrl);
          }
        });
    },

    // 导出pdf
    handlePdfDownload () {
      let _this = this;
      let param = "";
        if(this.params.yearSelect != "") {
          param += this.params.yearSelect
        }
        if(this.params.continentSelect != "") {
          param += '-' + this.params.continentSelect
        }
        if(this.params.countrySelect != "") {
          param += '-' + this.params.countrySelect
        }
        if(this.params.citySelect != "") {
          param += '-' + this.params.citySelect
        }
        if(this.params.orgSelect != "") {
          param += '-' + this.params.orgSelect
        }
        if(this.params.foreignOrgSelect != "") {
          param += '-' + this.params.foreignOrgSelect
        }
        if(this.params.projectClassSelect != "") {
          param += '-' + this.params.projectClassSelect
        }
        if(this.params.executeYearSelect != "") {
          param += '-' + this.params.executeYearSelect
        }
        if(this.params.subjectSelect != "") {
          param += '-' + this.params.subjectSelect
        }
        if(this.params.executeStateSelect != "") {
          param += '-' + this.params.executeStateSelect
        }



      let data = {
        param: param,
        source: "合作项目",
        type: "国际伙伴计划",
        barchartImage: "",
        piechartImage: "",
        org1Image: "",
        org2Image: "",
        mapImage: "",
      };
      let p1 = new Promise((resolve, reject) => {
        let projectNumDiv = _this.$refs.projectNumDiv;
        visitFun.getImgBase64(projectNumDiv).then((res) => {
          data.barchartImage = res;
          resolve(true);
        });
      });
      let p2 = new Promise((resolve, reject) => {
        let subjectAreasDiv = _this.$refs.subjectAreasDiv;
        visitFun.getImgBase64(subjectAreasDiv).then((res) => {
          data.piechartImage = res;
          resolve(true);
        });
      });
      let p3 = new Promise((resolve, reject) => {
        let fundingMoneryDiv = _this.$refs.fundingMoneryDiv;
        visitFun.getImgBase64(fundingMoneryDiv).then((res) => {
          data.org1Image = res;
          resolve(true);
        });
      });
      let p4 = new Promise((resolve, reject) => {
        let orgRankingDiv = _this.$refs.orgRankingDiv;
        visitFun.getImgBase64(orgRankingDiv).then((res) => {
          data.org2Image = res;
          resolve(true);
        });
      });
      let p5 = new Promise((resolve, reject) => {
        let partnerGlobalMapDiv = _this.$refs.partnerGlobalMapDiv;
        visitFun.getImgBase64(partnerGlobalMapDiv).then((res) => {
          data.mapImage = res;
          resolve(true);
        });
      });

      let time = setTimeout(() => {
        _this.axios
        .post("/communication/pdfDownload", this.$qs.stringify(data))
        .then((res) => {
          //console.log(res);
          if(res.data.code == 200) {
            window.clearInterval(time)
           window.open(res.data.data.fileDownUrl)
          }

        });
      },8000)
    }
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/project/index.less";
.reel-tabs {
  margin: 20px;
}

.reel-filterCondition_1 {
  width: 85%;
  ul {
    overflow: hidden;
    .reel-filterCondition_1_li {
      // border-top: 1px solid #d9dde4;
      // border-left: 1px solid #d9dde4;
      // border-bottom: 1px solid #d9dde4;
    }
    .reel-filterCondition_1_li:last-child {
      border-right: 1px solid #d9dde4;
    }
    li {
      float: left;
      width: 300px;
      /deep/ .el-scrollbar__wrap {
        max-width: 500px;
      }

      /deep/ .el-cascader-node.in-active-path,
      .el-cascader-node.is-active,
      .el-cascader-node.is-selectable.in-checked-path {
        color: #ff3a25 !important;
      }
      /deep/ .el-input {
        width: 300px;

        /deep/ .el-radio__inner {
        border-color: #ff3a25 !important;
        background: #ff3a25 !important;
      }

        input {
          text-align: center;
          border-radius: 0;
          border-color: #d9dde4;
          // border-right: 1px solid #d9dde4;
          border-right: 0;
        }

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
  margin-top: 20px;
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
  margin-top: 20px;

  &:hover {
    background: #ff3a25;
    color: #fff;
  }
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
  margin-right: 120px;
  cursor: pointer;
  margin-top: 20px;
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
  margin-right: 120px;
  cursor: pointer;
  margin-top: 20px;

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
  margin-top: 20px;
}

.reel-DownloadAlls {
  position: absolute;
  right: 0;
  //float: right;
  width: 40px;
  height: 40px;
  background: #f1f3f6;
  border-radius: 10px;
  line-height: 40px;
  font-size: 20px;
  color: #727272;
  text-align: center;
  margin-top: 20px;

  &:hover {
    background: #ff3a25;
    color: #fff;
  }
}

.personSearchBTN,
.personSearchBTNs,
.DownloadList,
.DownloadLists {
  margin-top: 20px;
}
.reel-empty,
.reel-emptys {
  margin: 20px;
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
    // margin: 0 10px;
    cursor: pointer;
    background: url("../../assets/images/国际人才/筛选1.png") no-repeat;
    background-size: 100% 100%;
    margin-top: 20px;
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
