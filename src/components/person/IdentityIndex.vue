<template>
  <div class="International-talents">
    <div class="fl-l">
      <div class="bgImg">
        <div class="fl-logo" @click="handleClose">
          <img src="../../assets/images/国际人才/页面固定内容/logo.png" alt />
          <p>中国科学院国际合作</p>
          <p>数据汇交与分析平台</p>
        </div>
        <div class="fl-content">
          <div class="titleName">国际人才</div>
          <div class="fl-tabs">
            <div>
              <router-link tag="li" to="/topicIndex">按专题</router-link>
            </div>
            <div class="active">
              <router-link tag="li" to="/identityIndex">按身份</router-link>
            </div>
          </div>
          <div class="fl-info">
            <ul>
              <li>
                <span>全体人员</span>
                <p @click="currentIndex(0)">
                  <label :class="[mark === 0 ? 'on' : '']">概览</label>
                </p>
              </li>
              <li>
                <span>科研人员</span>
                <p @click="currentIndex(1)">
                  <label :class="[mark == 1 ? 'on' : '']"
                    >全职人员(含博士后)</label
                  >
                </p>
                <p @click="currentIndex(2)">
                  <label :class="[mark == 2 ? 'on' : '']"
                    >短期访问人员(&lt;1月/年)</label
                  >
                </p>
                <p @click="currentIndex(3)">
                  <label :class="[mark == 3 ? 'on' : '']">客座/兼职人员</label>
                </p>
              </li>
              <li>
                <span>学生</span>
                <p @click="currentIndex(4)">
                  <label :class="[mark == 4 ? 'on' : '']">博士</label>
                </p>
                <p @click="currentIndex(5)">
                  <label :class="[mark == 5 ? 'on' : '']">硕士</label>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="fl-btm" @click="lastPage">
          <div class="iconfontClose">
            <i class="iconfont icon-fanhui"></i>
          </div>
          <div class="closeName">返回上一页</div>
        </div>
      </div>
    </div>
    <div class="fr-reel" v-show="isSlide">
      <div>
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
                <el-cascader
                  clearable
                  filterable
                  :options="areaoptions"
                  v-model="globalArea"
                  :show-all-levels="false"
                  placeholder="请选择地区"
                  :props="areaProps"
                >
                </el-cascader>
              </li>

              <li class="reel-filterCondition_1_li">
                <el-select
                  clearable
                  filterable
                  v-model="params['subjectSelect']"
                  placeholder="请选择学科"
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
            </ul>
          </div>
          <div
            v-if="
              params['yearSelect'] != '' ||
              globalArea != '' ||
              params['subjectSelect']
            "
            class="reel-filterBtn"
            @click="handleConditionSearch(1)"
          ></div>
          <div v-else class="reel-filterBtns"></div>
          <div
            @click="handleTopicEmptys(1)"
            v-if="
              params['yearSelect'] != '' ||
              globalArea != '' ||
              params['subjectSelect']
            "
            class="reel-empty iconfont icon-fanhui1"
          ></div>
          <div v-else class="reel-emptys iconfont icon-fanhui1"></div>
          <div
            v-if="
              params['yearSelect'] != '' ||
              globalArea != '' ||
              params['subjectSelect']
            "
            class="reel-DownloadAll iconfont icon-xiazai"
            @click="handleDownloadPDF"
          ></div>
          <div
            v-else
            class="reel-DownloadAlls iconfont icon-xiazai"
            @click="handleDownloadPDF"
          ></div>
        </div>
        <div class="reelCentent">
          <div class="moduleDiv" ref="traceDiv">
            <IdentitySubsidize
              :data="IdentityFounding"
              v-loading="loading"
              element-loading-text="加载中..."
            />
          </div>
          <div class="moduleDiv" ref="subjectDiv">
            <IdentitySubjectAreas
              :data="TopicSubject"
              :IDsubjectSelect="params['subjectSelect']"
              v-loading="loading"
              element-loading-text="加载中..."
            />
          </div>
        </div>
        <div class="reelBottom" ref="identityMap">
          <IdentityGlobalMap
            :data="GlobalData"
            :InstituteData="institutesMapData"
            v-loading="loading"
            element-loading-text="加载中..."
          />
        </div>
      </div>
      <div>
        <div @click="handleShutdown" class="left-icon">
          <div class="Icon iconfont icon-shuangjiantouzuo"></div>
          <p>查<br />看<br />详<br />细<br />数<br />据</p>
        </div>
      </div>
    </div>
    <div class="fr-reel-close">
      <div @click="handleOpenUp" class="right-icon">
        <p>查<br />看<br />统<br />计<br />图<br />表</p>
        <div class="Icon iconfont icon-shuangjiantouyou"></div>
      </div>
    </div>
    <div class="personList">
      <div class="breadCrumbs">
        <ul>
          <li>国际人才</li>
          <li class="line">/</li>
          <li>按身份分类</li>
          <li class="line">/</li>
          <li>
            <span v-if="mark == 0">全体人员</span>
            <span v-if="mark >= 1 && mark <= 3">科研人员</span>
            <span v-if="mark >= 4 && mark <= 6">学生</span>
          </li>
          <li class="line">/</li>
          <li>
            <span v-if="mark == 0">概览</span>
            <span v-if="mark == 1">全职人员</span>
            <span v-if="mark == 2">短期访问人员</span>
            <span v-if="mark == 3">客座/兼职人员</span>
            <span v-if="mark == 4">博士</span>
            <span v-if="mark == 5">硕士</span>
          </li>
        </ul>
      </div>
      <div class="personHeader">
        <div class="header_a">
          <h3 class="personTitleName" v-if="mark == 0">概览</h3>
          <h3 class="personTitleName" v-if="mark == 1">全职人员</h3>
          <h3 class="personTitleName" v-if="mark == 2">短期访问人员</h3>
          <h3 class="personTitleName" v-if="mark == 3">客座/兼职人员</h3>
          <h3 class="personTitleName" v-if="mark == 4">博士</h3>
          <h3 class="personTitleName" v-if="mark == 5">硕士</h3>
          <div class="headerSearch">
            <div class="header_ipt">
              <div class="iptDiv">
                <input
                  v-model="persionNameEN"
                  @input="handlefocus()"
                  class="personInput"
                  placeholder="请输入要检索人员姓名"
                  type="text"
                />
                <!-- @click="handleSearchPersion" -->
                <div class="searchPersion" @click="handleSearchPersion">
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
                        <span>{{ item.name }}</span>
                        <span>{{ item.instName }}</span>
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
            </div>
            <Login />
          </div>
        </div>
        <div class="header_b">
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
              <el-cascader
                clearable
                filterable
                :options="areaoptions"
                v-model="globalArea2"
                :show-all-levels="false"
                placeholder="请选择地区"
                :props="areaProps"
              >
              </el-cascader>
            </li>

            <li class="reel-filterCondition_1_li">
              <el-select
                clearable
                filterable
                v-model="params2['subjectSelect']"
                placeholder="请选择学科"
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
            <!-- <li></li> -->
          </ul>
          <div
            v-if="
              params2['yearSelect'] != '' ||
              globalArea2 != '' ||
              params2['subjectSelect'] != ''
            "
            class="personSearchBTNs"
            @click="handleConditionSearch(2)"
          ></div>
          <div v-else class="personSearchBTN"></div>
          <div
            @click="handleTopicEmptys(2)"
            v-if="
              params2['yearSelect'] != '' ||
              globalArea2 != '' ||
              params2['subjectSelect'] != ''
            "
            class="reel-empty iconfont icon-fanhui1"
          ></div>
          <div
            v-else
            class="reel-emptys iconfont icon-fanhui1"
            @click="handleTopicEmptys(2)"
          ></div>
          <div
            v-if="
              params2['yearSelect'] != '' ||
              globalArea2 != '' ||
              params2['subjectSelect'] != ''
            "
            class="DownloadLists iconfont icon-xiazai"
            @click="handelDownloadExcel"
          ></div>
          <div
            v-else
            class="DownloadList iconfont icon-xiazai"
            @click="handelDownloadExcel"
          ></div>
        </div>
      </div>
      <div class="listTabs">
        <p @click="listCur(1)">
          <img :src="imgIcon1" alt />
        </p>
        <p @click="listCur(2)">
          <img :src="imgIcon2" alt />
        </p>
        <p class="personTotal">
          总支持人数
          <label>{{ IdentityPersonList.count }}</label
          >，来自 <label>{{ IdentityPersonList.country }}</label
          >个国家
        </p>
      </div>
      <div
        v-show="isListShow"
        class="arrayList"
        v-loading="loading"
        element-loading-text="加载中..."
      >
        <ul>
          <li v-for="(item, i) in IdentityPersonList.personList" :key="i">
            <div class="avatar">
              <img v-if="item.imgUrl" :src="url + item.imgUrl" alt />
              <img
                v-else
                src="../../assets/images/国际人才/默认头像无头像状态.png"
                alt
              />
            </div>
            <div
              class="personName"
              @click.stop="handleRouter('/PersonDetails', item.uniqueId)"
            >
              {{ item.name }}
            </div>
            <div class="personCountry">
              {{ item.nationality == null ? "—" : item.nationality }}
            </div>
            <div class="line"></div>
            <div class="personSpecialty">
              {{ item.title }}·{{ item.subject }}
            </div>
            <div class="CHunit" v-if="params2.personTypeSelect == ''">
              <label>工作单位：</label>
              <span>{{ item.instName == "" ? "—" : item.instName }}</span>
            </div>
            <div class="ENunit" v-if="params2.personTypeSelect == ''">
              <label>国外单位：</label>
              <span>{{
                item.foreignWorkOrg == null ? "—" : item.foreignWorkOrg
              }}</span>
            </div>
            <div class="CHunit" v-if="params2.personTypeSelect == '全职人员'">
              <label>工作单位：</label>
              <span>{{ item.instName == null ? "—" : item.instName }}</span>
            </div>
            <div class="ENunit" v-if="params2.personTypeSelect == '短期访问'">
              <label>访问单位：</label>
              <span>{{ item.instName == null ? "—" : item.instName }}</span>
            </div>
            <div class="CHunit" v-if="params2.personTypeSelect == '短期访问'">
              <label>国外单位：</label>
              <span>{{
                item.foreignWorkOrg == null ? "—" : item.foreignWorkOrg
              }}</span>
            </div>
            <div class="CHunit" v-if="params2.personTypeSelect == '客座/兼职'">
              <label>工作单位：</label>
              <span>{{ item.instName == null ? "—" : item.instName }}</span>
            </div>
            <div class="CHunit" v-if="params2.personTypeSelect == '客座/兼职'">
              <label>国外单位：</label>
              <span>{{
                item.foreignWorkOrg == null ? "—" : item.foreignWorkOrg
              }}</span>
            </div>
            <div
              class="CHunit"
              v-if="
                params2.personTypeSelect == '博士' ||
                params2.personTypeSelect == '硕士'
              "
            >
              <label>所在单位：</label>
              <span>{{ item.instName == null ? "—" : item.instName }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div
        v-show="!isListShow"
        class="tableList"
        v-loading="loading"
        element-loading-text="加载中..."
      >
        <Table
          v-if="params2.personTypeSelect == ''"
          border
          height="660"
          :columns="IdentityList1"
          :data="IdentityPersonList.personList"
        ></Table>
        <Table
          v-if="
            params2.personTypeSelect == '全职人员' ||
            params2.personTypeSelect == '短期访问人员' ||
            params2.personTypeSelect == '客座/兼职人员'
          "
          border
          height="660"
          :columns="IdentityList2"
          :data="IdentityPersonList.personList"
        ></Table>
        <Table
          v-if="
            params2.personTypeSelect == '博士' ||
            params2.personTypeSelect == '硕士'
          "
          border
          height="660"
          :columns="IdentityList3"
          :data="IdentityPersonList.personList"
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
            :total="IdentityPersonList.count"
            :current.sync="currentPage"
            :page-size="params2.limit"
            @on-change="changePage"
          />
        </div>
      </div>
    </div>
    <div class="bg-class" v-show="isShow" @click="handleBgClose"></div>
  </div>
</template>

<script>
import visitFun from "@/assets/js/visit.js";
import Axios from "axios";

import IdentitySubsidize from "./modules/IdentitySubsidize "; // 历年人员数量
import IdentitySubjectAreas from "./modules/IdentitySubjectAreas"; // 学科领域分布
import IdentityGlobalMap from "./modules/IdentityGlobalMap";

export default {
  name:'identityIndex',
  components: {
    IdentitySubsidize,
    IdentitySubjectAreas,
    IdentityGlobalMap,
  },
  data() {
    return {
      mode: 0,
      mark: 0,
      isListShow: true,
      isSlide: true,
      selectname: false,
      isShow: false,
      persionNameEN: "",
      listIcon1: require("../../assets/images/国际人才/index/默认矩阵.png"),
      listIcon2: require("../../assets/images/国际人才/index/选中列表.png"),
      imgIcon1: require("../../assets/images/国际人才/index/选中矩阵.png"),
      imgIcon2: require("../../assets/images/国际人才/index/默认列表.png"),
      imgIcon3: require("../../assets/images/国际人才/index/选中矩阵.png"),
      imgIcon4: require("../../assets/images/国际人才/index/默认列表.png"),
      params: {
        nowPage: 1,
        limit: 60,
        yearSelect: "",
        continentSelect: "",
        countrySelect: "",
        citySelect: "",
        subjectSelect: "",
        personTypeSelect: "",
      },
      params2: {
        nowPage: 0,
        limit: 60,
        persionNameEN: "",
        yearSelect: "",
        continentSelect: "",
        countrySelect: "",
        citySelect: "",
        subjectSelect: "",
        personTypeSelect: "",
      },
      globalArea: "", // 国家
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

      subjectAll: [],
      IdentityFounding: [],
      TopicSubject: {},
      GlobalData: {},
      institutesMapData: {},
      IdentityPersonList: [],
      isListShow: true,
      loading: false,
      result: [],
      currentPage: 1,
      IdentityList1: [
        {
          title: "姓名",
          key: "name",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.name !== "" && params.row.name !== null) {
              return h("span", params.row.name);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "国籍",
          key: "nationality",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (
              params.row.nationality !== "" &&
              params.row.nationality !== null
            ) {
              return h("span", params.row.nationality);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "职务/职称",
          key: "title",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.title !== "" && params.row.title !== null) {
              return h("span", params.row.title);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "学科一级",
          key: "subject",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.subject !== "" && params.row.subject !== null) {
              return h("span", params.row.subject);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "学科二级",
          key: "subSubject",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              params.row.subSubject !== "" &&
              params.row.subSubject !== null
            ) {
              return h("span", params.row.subSubject);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "工作/访问/所在单位",
          key: "instName",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.instName !== "" && params.row.instName !== null) {
              return h("span", params.row.instName);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "国外单位",
          key: "foreignWorkUnit",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              params.row.foreignWorkUnit !== "" &&
              params.row.foreignWorkUnit !== null
            ) {
              return h("span", params.row.foreignWorkUnit);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "身份",
          key: "arr",
          width: 200,
          align: "center",
          render: (h, params) => {
            var data = params.row.arr;
            var newArr = [];
            data.forEach((item) => {
              newArr.push(
                h("div", [h("span", item.year + "年："), h("span", item.type)])
              );
            });
            return h("div", newArr);
          },
        },
        {
          title: "数据来源",
          key: "source",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.source !== "" && params.row.source !== null) {
              return h("span", params.row.source);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "操作",
          key: "操作",
          width: 150,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                  },
                  style: {
                    width: "90px",
                    height: "22px",
                    background: "#e2e6ed",
                    borderRadius: "11px",
                    color: "#727272",
                    fontSize: "12px",
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/PersonDetails",
                        query: { id: params.row.uniqueId },
                      });
                    },
                  },
                },
                "访问主页"
              ),
            ]);
          },
        },
      ],
      IdentityList2: [
        {
          title: "姓名",
          key: "name",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.name !== "") {
              return h("span", params.row.name);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "国籍",
          key: "nationality",
          width: 150,
          align: "center",
          render: (h, params) => {
            if (params.row.nationality !== "") {
              return h("span", params.row.nationality);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "职务/职称",
          key: "title",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.title !== "") {
              return h("span", params.row.title);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "学科一级",
          key: "subject",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.subject !== "") {
              return h("span", params.row.subject);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "学科二级",
          key: "subSubject",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.subSubject !== "") {
              return h("span", params.row.subSubject);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "工作单位",
          key: "instName",
          width: 250,
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
          title: "国外单位",
          key: "foreignWorkUnit",
          width: 250,
          align: "center",
          render: (h, params) => {
            if (params.row.foreignWorkUnit !== "") {
              return h("span", params.row.foreignWorkUnit);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "数据来源",
          key: "source",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.source !== "") {
              return h("span", params.row.source);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "操作",
          key: "操作",
          width: 150,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                  },
                  style: {
                    width: "90px",
                    height: "22px",
                    background: "#e2e6ed",
                    borderRadius: "11px",
                    color: "#727272",
                    fontSize: "12px",
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/PersonDetails",
                        query: { id: params.row.uniqueId },
                      });
                    },
                  },
                },
                "访问主页"
              ),
            ]);
          },
        },
      ],
      IdentityList3: [
        {
          title: "姓名",
          key: "name",
          // width: 300,
          align: "center",
          render: (h, params) => {
            if (params.row.name !== "") {
              return h("span", params.row.name);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "国籍",
          key: "nationality",
          // width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.nationality !== "") {
              return h("span", params.row.nationality);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "职务/职称",
          key: "title",
          // width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.title !== "") {
              return h("span", params.row.title);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "学科一级",
          key: "subject",
          // width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.subject !== "") {
              return h("span", params.row.subject);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "学科二级",
          key: "subSubject",
          // width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.subSubject !== "") {
              return h("span", params.row.subSubject);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "工作单位",
          key: "instName",
          // width: 250,
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
          title: "数据来源",
          key: "source",
          // width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.source !== "") {
              return h("span", params.row.source);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "操作",
          key: "操作",
          // width: 150,
          align: "center",
          // fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                  },
                  style: {
                    width: "90px",
                    height: "22px",
                    background: "#e2e6ed",
                    borderRadius: "11px",
                    color: "#727272",
                    fontSize: "12px",
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/PersonDetails",
                        query: { id: params.row.uniqueId },
                      });
                    },
                  },
                },
                "访问主页"
              ),
            ]);
          },
        },
      ],
    };
  },
  watch: {
    persionNameEN(val) {
      if (this.persionNameEN) {
        this.handlePersonNameSearch(val);
      }
      if (val.length == 0) {
        this.handlePersonNameSearch();
      }
    },
  },
  mounted() {
    // 学科领域
    visitFun.handleSubject((data) => {
      this.subjectAll = data;
    });

    // 历年人员数量
    this.handleFounding();
    // 学科分布
    this.handleSubjectList();
    //国际分布
    this.handleGlobalIdentity();
    // 院所分布
    this.handleChinaIdentity();
    // 人员列表
    this.handlePersonIdentityList();
  },
  methods: {
    // 返回上一页
    handleClose() {
      this.$router.push({ path: "/" });
    },
    lastPage() {
      visitFun.lastPage();
    },
    handleRouter(path, id) {
      this.$router.push({ path, query: { id } });
    },
    // 打开卷轴
    handleOpenUp() {
      this.isSlide = true;
    },
    // 关闭卷轴
    handleShutdown() {
      this.isSlide = false;
    },
    secondLevelSearch() {
      this.handleFounding();
      this.handleSubjectList();
      this.handleGlobalIdentity();
      this.handlePersonIdentityList();
    },
    // 按身份左侧筛选
    currentIndex(vals) {
      this.mark = vals;
      if (this.mark == 0) {
        this.params.personTypeSelect = "";
        this.params2.personTypeSelect = "";
        this.params = {
          nowPage: 1,
          limit: 60,
          yearSelect: "",
          continentSelect: "",
          countrySelect: "",
          citySelect: "",
          subjectSelect: "",
          personTypeSelect: "",
        };
        this.secondLevelSearch();
      }
      if (this.mark == 1) {
        this.params.personTypeSelect = "全职人员";
        this.params2.personTypeSelect = "全职人员";
        this.params = {
          nowPage: 1,
          limit: 60,
          yearSelect: "",
          continentSelect: "",
          countrySelect: "",
          citySelect: "",
          subjectSelect: "",
          personTypeSelect: "全职人员",
        };
        this.secondLevelSearch();
      }
      if (this.mark == 2) {
        this.params.personTypeSelect = "短期访问人员";
        this.params2.personTypeSelect = "短期访问人员";
        this.params = {
          nowPage: 1,
          limit: 60,
          yearSelect: "",
          continentSelect: "",
          countrySelect: "",
          citySelect: "",
          subjectSelect: "",
          personTypeSelect: "短期访问人员",
        };
        this.secondLevelSearch();
      }
      if (this.mark == 3) {
        this.params.personTypeSelect = "客座/兼职人员";
        this.params2.personTypeSelect = "客座/兼职人员";
        this.params = {
          nowPage: 1,
          limit: 60,
          yearSelect: "",
          continentSelect: "",
          countrySelect: "",
          citySelect: "",
          subjectSelect: "",
          personTypeSelect: "客座/兼职人员",
        };
        this.secondLevelSearch();
      }
      if (this.mark == 4) {
        this.params.personTypeSelect = "博士";
        this.params2.personTypeSelect = "博士";
        this.params = {
          nowPage: 1,
          limit: 60,
          yearSelect: "",
          continentSelect: "",
          countrySelect: "",
          citySelect: "",
          subjectSelect: "",
          personTypeSelect: "博士",
        };
        this.secondLevelSearch();
      }
      if (this.mark == 5) {
        this.params.personTypeSelect = "硕士";
        this.params2.personTypeSelect = "硕士";
        this.params = {
          nowPage: 1,
          limit: 60,
          yearSelect: "",
          continentSelect: "",
          countrySelect: "",
          citySelect: "",
          subjectSelect: "",
          personTypeSelect: "硕士",
        };
        this.secondLevelSearch();
      }
    },
    // 矩形和列表切换
    listCur(val) {
      if (val != 1) {
        this.imgIcon1 = this.listIcon1;
        this.imgIcon2 = this.listIcon2;
        this.isListShow = false;
      } else {
        this.imgIcon1 = this.imgIcon3;
        this.imgIcon2 = this.imgIcon4;
        this.isListShow = true;
      }
    },

    // 历年人员数量
    handleFounding() {
      this.axios
        .get("/international/topic/personIdentity/persons", {
          params: {
            nowPage: this.params.nowPage,
            limit: this.params.limit,
            year: this.params.yearSelect,
            continent: this.params.continentSelect,
            country: this.params.countrySelect,
            city: this.params.citySelect,
            subject: this.params.subjectSelect,
            personType: this.params.personTypeSelect,
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.IdentityFounding = res.data.data.founding;
          }
        });
    },

    // 学科分布
    handleSubjectList() {
      this.axios
        .get("/international/topic/personIdentity/subjectList", {
          params: {
            nowPage: this.params.nowPage,
            limit: this.params.limit,
            year: this.params.yearSelect,
            continent: this.params.continentSelect,
            country: this.params.countrySelect,
            city: this.params.citySelect,
            subject: this.params.subjectSelect,
            personType: this.params.personTypeSelect,
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.TopicSubject = {
              subjectData: res.data.data.subject,
              subjectTWO: res.data.data.subSubject,
              params: this.params,
            };
          }
        });
    },

    // 全球分布
    handleGlobalIdentity() {
      this.axios
        .get("/international/topic/personIdentity/globalIdentity", {
          params: {
            nowPage: this.params.nowPage,
            limit: this.params.limit,
            year: this.params.yearSelect,
            continent: this.params.continentSelect,
            country: this.params.countrySelect,
            city: this.params.citySelect,
            subject: this.params.subjectSelect,
            personType: this.params.personTypeSelect,
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            let newObject = visitFun.correctLocation(
              res.data.data.globalData.geoCoordMap
            );
            this.GlobalData = {
              geoCoordMap: newObject,
              data: res.data.data.globalData.data,
              params: this.params,
            };
          }
        });
    },

    // 院所分布
    handleChinaIdentity() {
      this.axios
        .get("/international/topic/personIdentity/chinaIdentity", {
          params: {
            nowPage: this.params.nowPage,
            limit: this.params.limit,
            year: this.params.yearSelect,
            continent: this.params.continentSelect,
            country: this.params.countrySelect,
            city: this.params.citySelect,
            subject: this.params.subjectSelect,
            personType: this.params.personTypeSelect,
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.institutesMapData = {
              data: {
                org: {},
                cityCount: {},
                cityLongAndLat: [],
              },
            };
            this.institutesMapData.data.org = res.data.data.chinaData.data1;
            this.institutesMapData.data.cityCount =
              res.data.data.chinaData.data2;
            this.institutesMapData.data.cityLongAndLat.push(
              res.data.data.chinaData.jw
            );
          }
        });
    },

    // 人员列表
    handlePersonIdentityList() {
      this.loading = true;
      this.axios
        .get("/international/topic/personIdentity/list", {
          params: {
            nowPage: this.params2.nowPage,
            limit: this.params2.limit,
            name: this.params2.persionNameEN,
            year: this.params2.yearSelect,
            continent: this.params2.continentSelect,
            country: this.params2.countrySelect,
            city: this.params2.citySelect,
            subject: this.params2.subjectSelect,
            personType: this.params2.personTypeSelect,
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.loading = false;
            this.IdentityPersonList = res.data.data;
          }
        });
    },
    // 列表分页
    changePage(event) {
      this.loading = true;
      this.params2.nowPage = event;
      this.handlePersonIdentityList(); //请求数据
    },

    // 条件筛选
    handleConditionSearch(val) {
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
        this.handleFounding();
        this.handleSubjectList();
        this.handleGlobalIdentity();
        this.handleChinaIdentity();
      } else if (val == 2) {
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
        this.handlePersonIdentityList();
      }
    },
    // 清空帅选条件
    handleTopicEmptys(val) {
      if (val == 1) {
        this.globalArea = "";
        this.params = {
          nowPage: 1,
          limit: 60,
          yearSelect: "",
          continentSelect: "",
          countrySelect: "",
          citySelect: "",
          subjectSelect: "",
          personTypeSelect: this.params.personTypeSelect,
        };
        this.handleFounding();
        this.handleSubjectList();
        this.handleGlobalIdentity();
        this.handleChinaIdentity();
      } else if (val == 2) {
        this.globalArea2 = "";
        this.persionNameEN = "";
        this.params2 = {
          nowPage: 1,
          limit: 60,
          yearSelect: "",
          continentSelect: "",
          countrySelect: "",
          citySelect: "",
          subjectSelect: "",
          personTypeSelect: this.params2.personTypeSelect,
        };
        this.handlePersonIdentityList();
      }
    },

    // 人员名称查询
    async handlePersonNameSearch() {
      this.axios
        .get("/international/topic/personIdentity/personSearch", {
          params: {
            limit: this.params2.limit,
            name: this.persionNameEN,
            nowPage: this.params2.nowPage,
            personType: this.params2.personType,
          },
        })
        .then((res) => {
          this.result = res.data.data.personSearchMap.searchVoList;
        });
    },
    handlefocus() {
      this.isShow = true;
      this.selectname = true;
    },
    handleBgClose() {
      this.isShow = false;
      this.selectname = false;
    },
    handleClickQuery(val) {
      this.persionNameEN = val.name;
      this.params2.persionNameEN = this.persionNameEN;
      this.selectname = false;
      this.isShow = false;
    },
    handleSearchPersion() {
      if (!!this.params2.persionNameEN) {
        this.handlePersonIdentityList();
      }
    },

    // PDF下载
    handleDownloadPDF() {
      let _this = this;
      let param = "";
      if (this.params.yearSelect != "") {
        param += this.params.yearSelect;
      }
      if (this.params.continentSelect != "") {
        param += "-" + this.params.continentSelect;
      }
      if (this.params.countrySelect != "") {
        param += "-" + this.params.countrySelect;
      }
      if (this.params.citySelect != "") {
        param += "-" + this.params.citySelect;
      }
      if (this.params.subjectSelect != "") {
        param += "-" + this.params.subjectSelect;
      }
      let data = {
        param: param,
        source: "国际人才计划",
        type: "按身份",
        barchartImage: "",
        piechartImage: "",
        mapImage: "",
      };
      let p1 = new Promise((resolve, reject) => {
        let traceDiv = _this.$refs.traceDiv;
        visitFun.getImgBase64(traceDiv).then((res) => {
          data.barchartImage = res;
          resolve(true);
        });
      });
      let p2 = new Promise((resolve, reject) => {
        let subjectDiv = _this.$refs.subjectDiv;
        visitFun.getImgBase64(subjectDiv).then((res) => {
          data.piechartImage = res;
          resolve(true);
        });
      });
      let p3 = new Promise((resolve, reject) => {
        let identityMap = _this.$refs.identityMap;
        visitFun.getImgBase64(identityMap).then((res) => {
          //console.log(res);
          data.mapImage = res;
          resolve(true);
        });
      });
      // console.log(data)
      let time = setTimeout(() => {
        _this.axios
          .post("/communication/pdfDownload", this.$qs.stringify(data))
          .then((res) => {
            if (res.data.code == 200) {
              window.clearInterval(time);
              window.open(res.data.data.fileDownUrl);
            }
          });
      }, 2000);
    },

    // 导出excel
    handelDownloadExcel() {
      this.axios
        .get("/international/topic/export/personidentity", {
          params: {
            nowPage: this.params2.nowPage,
            limit: 1000,
            name: this.params2.persionNameEN,
            year: this.params2.yearSelect,
            continent: this.params2.continentSelect,
            country: this.params2.countrySelect,
            city: this.params2.citySelect,
            subject: this.params2.subjectSelect,
            personType: this.params2.personTypeSelect,
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            window.open(res.data.data.fileDownUrl);
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/indexCss.less";
.bg-class {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
}
.fr-reelHeader {
  display: flex;
  margin: 40px 0 10px 20px;

  .reel-tabs {
    display: flex;

    p {
      width: 80px;
      height: 40px;
      font-size: 14px;
      color: #737886;
      background: #d3d6dd;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
    }

    p:first-child {
      border-top-left-radius: 9px;
      border-bottom-left-radius: 9px;
    }

    p:nth-child(2) {
      border-top-right-radius: 9px;
      border-bottom-right-radius: 9px;
    }

    .modeActive {
      background: #ff3a25;
      color: #fff;
    }

    .lock {
      line-height: 40px;
      width: 40px;
      margin-left: 8px;

      // margin-right: 28px;
      img {
        width: 20px;
        height: 17px;
      }
    }
  }

  .reel-filterCondition_1 {
    ul {
      display: flex;

      li {
        width: 380px;

        /deep/ .el-input {
          width: 380px;

          input {
            text-align: center;
            border-radius: 0;
            border-color: #d9dde4;
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
    width: 50px;
    height: 40px;
    margin: 0 10px;
    cursor: pointer;
    background: url("../../assets/images/国际人才/筛选1.png") no-repeat;
    background-size: 100% 100%;
  }

  .reel-filterBtns {
    width: 50px;
    height: 40px;
    margin: 0 10px;
    cursor: pointer;
    background: url("../../assets/images/国际人才/筛选0.png") no-repeat;
    background-size: 100% 100%;

    &:hover {
      background: url("../../assets/images/国际人才/筛选1.png") no-repeat;
      background-size: 100% 100%;
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
    float: right;
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
}
.header_b {
  display: flex;
  width: 100%;
  margin-top: 10px;

  ul {
    display: flex;

    li {
      width: 430px;

      /deep/ .el-input {
        width: 430px;

        input {
          text-align: center;
          border-radius: 0;
          border-color: #fff;
          background: #ff3a25;
          border-right: 0;
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
    margin-left: 20px;

    &:hover {
      background: url("../../assets/images/国际人才/筛选1.png") no-repeat;
      background-size: 100% 100%;
    }
  }

  .personSearchBTNs {
    width: 50px;
    height: 40px;
    margin: 0 10px;
    cursor: pointer;
    background: url("../../assets/images/国际人才/筛选1.png") no-repeat;
    background-size: 100% 100%;
    margin-left: 20px;
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
    margin: 0 20px;
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
