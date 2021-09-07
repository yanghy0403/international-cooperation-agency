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
            <div class="active">
              <router-link tag="li" to="/topicIndex">按专题</router-link>
            </div>
            <div>
              <router-link tag="li" to="/identityIndex">按身份</router-link>
            </div>
          </div>
          <div class="fl-info">
            <ul>
              <li>
                <span>人才交流</span>
                <p @click="currentIndex(0)">
                  <label :class="[mark === 0 ? 'on' : '']">国际人才计划</label>
                </p>
              </li>
              <li>
                <span>奖学金计划</span>
                <p @click="currentIndex(1)">
                  <label :class="[mark == 1 ? 'on' : '']"
                    >CAS-TWAS院长奖学金</label
                  >
                </p>
                <p @click="currentIndex(2)">
                  <label :class="[mark == 2 ? 'on' : '']"
                    >“一带一路”硕士生奖</label
                  >
                </p>
                <p>
                  <label style="color: #49586e" :class="[mark == 3 ? 'on' : '']"
                    >ANSO奖学金</label
                  >
                </p>
              </li>
              <li>
                <span>国家/院级奖项</span>
                <p @click="currentIndex(4)">
                  <label :class="[mark == 4 ? 'on' : '']"
                    >中科院国际科技合作奖</label
                  >
                </p>
                <p @click="currentIndex(5)">
                  <label :class="[mark == 5 ? 'on' : '']"
                    >国家国际科技合作奖</label
                  >
                </p>
                <p @click="currentIndex(6)">
                  <label :class="[mark == 6 ? 'on' : '']"
                    >中科院青年科学家国际合作伙伴奖</label
                  >
                </p>
                <p @click="currentIndex(7)">
                  <label :class="[mark == 7 ? 'on' : '']"
                    >中国政府“友谊奖”</label
                  >
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
    <!--  -->
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
              <li class="reel-filterCondition_1_li">
                <el-select
                  clearable
                  filterable
                  v-model="params['personTypeSelect']"
                  placeholder="请选择人员类别"
                >
                  <el-option
                    v-for="item in personTypeAll"
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
              globalArea != '' ||
              params['subjectSelect'] != '' ||
              params['personTypeSelect'] != ''
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
              params['subjectSelect'] != '' ||
              params['personTypeSelect'] != ''
            "
            class="reel-empty iconfont icon-fanhui1"
          ></div>
          <div v-else class="reel-emptys iconfont icon-fanhui1"></div>
          <div
            v-if="
              params['yearSelect'] != '' ||
              globalArea != '' ||
              params['subjectSelect'] != '' ||
              params['personTypeSelect'] != ''
            "
            class="reel-DownloadAll iconfont icon-xiazai"
            @click="handlePdfDownload"
          ></div>
          <div
            v-else
            class="reel-DownloadAlls iconfont icon-xiazai"

          ></div>
        </div>
        <div class="reelCentent">
          <div class="moduleDiv" ref="traceDiv">
            <TopicSubsidize
              :data="TopicFounding"
              :mark="mark"
              v-loading="loading"
              element-loading-text="加载中..."
            />
          </div>
          <div class="moduleDiv" ref="subjectDiv">
            <TopicSubjectAreas
              :data="TopicSubject"
              :type="params['source']"
              :subjectSelect="params['subjectSelect']"
              v-loading="loading"
              element-loading-text="加载中..."
            />
          </div>
        </div>
        <div class="reelBottom" ref="topicMapDiv">
          <TopicGlobalMap
            :data="TopicGlobalData"
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
    <!--  -->
    <div class="fr-reel-close">
      <div @click="handleOpenUp" class="right-icon">
        <p>查<br />看<br />统<br />计<br />图<br />表</p>
        <div class="Icon iconfont icon-shuangjiantouyou"></div>
      </div>
    </div>
    <!--  -->
    <div class="personList">
      <div class="breadCrumbs">
        <ul>
          <li>国际人才</li>
          <li class="line">/</li>
          <li>按专题分类</li>
          <li class="line">/</li>
          <li>
            <span v-if="mark == 0">人才交流</span>
            <span v-if="mark >= 1 && mark <= 3">奖学金计划</span>
            <span v-if="mark >= 4 && mark <= 7">奖项</span>
          </li>
          <li class="line">/</li>
          <li>
            <span v-if="mark == 0">国际人才计划</span>
            <span v-if="mark == 1">CAS-TWAS院长奖学金</span>
            <span v-if="mark == 2">“一带一路”硕士生奖</span>
            <span v-if="mark == 3">ANSO奖学金</span>
            <span v-if="mark == 4">中科院国际科技合作奖</span>
            <span v-if="mark == 5">国家国际科技合作奖</span>
            <span v-if="mark == 6">中科院青年科学家国际合作伙伴奖</span>
            <span v-if="mark == 7">中国政府“友谊奖”</span>
          </li>
        </ul>
      </div>
      <div class="personHeader">
        <div class="header_a">
          <h3 class="personTitleName" v-if="mark == 0">国际人才计划</h3>
          <h3 class="personTitleName" v-if="mark == 1">CAS-TWAS院长奖学金</h3>
          <h3 class="personTitleName" v-if="mark == 2">“一带一路”硕士生奖</h3>
          <h3 class="personTitleName" v-if="mark == 3">ANSO奖学金</h3>
          <h3 class="personTitleName" v-if="mark == 4">中科院国际科技合作奖</h3>
          <h3 class="personTitleName" v-if="mark == 5">国家国际科技合作奖</h3>
          <h3 class="personTitleName" v-if="mark == 6">
            中科院青年科学家国际合作伙伴奖
          </h3>
          <h3 class="personTitleName" v-if="mark == 7">中国政府“友谊奖”</h3>
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
                      <p v-if="params2['source'] == 'internationalPerson'">
                        <span>{{ item.name }}</span>
                        <span>{{ item.instName }}</span>
                      </p>
                      <p v-if="params2['source'] == 'scholarshipPerson'">
                        <span>{{ item.enName }}</span>
                        <span>{{ item.instName }}</span>
                      </p>
                      <p v-if="params2['source'] == 'awardPerson'">
                        <span>{{ item.enName }}</span>
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
                :options="areaoptions"
                v-model="globalArea2"
                :show-all-levels="false"
                filterable
                clearable
                placeholder="请选择国家或地区"
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
            <li class="reel-filterCondition_1_li">
              <el-select
                clearable
                filterable
                v-model="params2['personTypeSelect']"
                placeholder="请选择人员类别"
              >
                <el-option
                  v-for="item in personTypeAll"
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
              globalArea2 != '' ||
              params2['subjectSelect'] != '' ||
              params2['personTypeSelect'] != '' ||
              params2['persionNameEN'] != ''
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
              params2['subjectSelect'] != '' ||
              params2['personTypeSelect'] != '' ||
              params2['persionNameEN'] != ''
            "
            class="reel-empty iconfont icon-fanhui1"
          ></div>
          <div v-else class="reel-emptys iconfont icon-fanhui1"></div>
          <div
            @click="handlePersonListExport"
            v-if="
              params2['yearSelect'] != '' ||
              globalArea2 != '' ||
              params2['subjectSelect'] != '' ||
              params2['personTypeSelect'] != '' ||
              params2['persionNameEN'] != ''
            "
            class="DownloadLists iconfont icon-xiazai"
          ></div>
          <div v-else class="DownloadList iconfont icon-xiazai"></div>
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
          <label>{{ personList.count }}</label
          >，来自 <label>{{ personList.countryCount }}</label
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
          <li v-for="(item, i) in personList.personList" :key="i">
            <!-- 头像 -->
            <div class="avatar">
              <img v-if="item.imgUrl" :src="url + item.imgUrl" alt />
              <img
                v-else
                src="../../assets/images/国际人才/默认头像无头像状态.png"
                alt
              />
            </div>
            <!-- 名字 -->
            <div
              v-if="params2['source'] == 'internationalPerson'"
              class="personName"
              @click.stop="handleRouter('/PersonDetails', item.uniqueId)"
            >
              {{ item.name }}
            </div>
            <div
              v-if="params2['source'] == 'scholarshipPerson'"
              class="personName"
              @click.stop="handleRouter('/PersonDetails', item.uniqueId)"
            >
              {{ item.enName == "" ? item.zhName : item.enName }}
            </div>
            <div
              v-if="params2['source'] == 'awardPerson'"
              class="personName"
              @click.stop="handleRouter('/PersonDetails', item.uniqueId)"
            >
              {{ item.enName == "" ? item.zhName : item.enName }}
            </div>
            <!-- 国家 -->
            <div class="personCountry">{{ item.nationality }}</div>
            <div class="line"></div>
            <!-- 学科 -->
            <div class="personSpecialty">
              {{ item.title }}·{{ item.subject }}
            </div>
            <!-- <div
              class="personSpecialty"
              v-if="params2['source'] == 'scholarshipPerson'"
            >
              {{ item.title }}·{{ item.subject }}
            </div>
            <div
              class="personSpecialty"
              v-if="params2['source'] == 'awardPerson'"
            >
              {{ item.title }}·{{ item.subject }}
            </div> -->
            <!-- 推荐单位 -->
            <div
              class="CHunit"
              v-if="params2['source'] == 'internationalPerson'"
            >
              <label>推荐单位：</label>
              <span>{{ item.instName }}</span>
            </div>
            <div class="CHunit" v-if="params2['source'] == 'scholarshipPerson'">
              <label>所在研究所/院系：</label>
              <span>{{ item.instName }}</span>
            </div>
            <div class="CHunit" v-if="params2['source'] == 'scholarshipPerson'">
              <label>学校：</label>
              <span>{{ item.admitSchool }}</span>
            </div>
            <div class="CHunit" v-if="params2['source'] == 'awardPerson'">
              <label>推荐单位：</label>
              <span>{{ item.instName }}</span>
            </div>
            <!-- 国外单位 -->
            <div
              class="ENunit"
              v-if="params2['source'] == 'internationalPerson'"
            >
              <label>国外单位：</label>
              <span>{{
                item.foreignWorkOrg == "" ? "—" : item.foreignWorkOrg
              }}</span>
            </div>
            <!-- <div class="ENunit" v-if="source =='scholarshipPerson'">
              <label>国外单位：</label>
              <span>{{item.foreignWorkOrg}}</span>
            </div>-->
            <div class="ENunit" v-if="params2['source'] == 'awardPerson'">
              <label>国外单位：</label>
              <span>{{
                item.foreignWorkOrg == "" ? "—" : item.foreignWorkOrg
              }}</span>
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
          v-if="params2['source'] == 'internationalPerson'"
          border
          height="660"
          :columns="columns1"
          :data="personList.personList"
        ></Table>
        <Table
          v-if="params2['source'] == 'scholarshipPerson'"
          border
          height="660"
          :columns="columns2"
          :data="personList.personList"
        ></Table>
        <Table
          v-if="
            params2['source'] == 'awardPerson' &&
            params2['type'] == 'interOperAward'
          "
          border
          height="660"
          :columns="columns3"
          :data="personList.personList"
        ></Table>
        <Table
          v-if="
            params2['source'] == 'awardPerson' &&
            params2['type'] == 'interTechAward'
          "
          border
          height="660"
          :columns="columns4"
          :data="personList.personList"
        ></Table>
        <Table
          v-if="
            params2['source'] == 'awardPerson' &&
            params2['type'] == 'youngAward'
          "
          border
          height="660"
          :columns="columns5"
          :data="personList.personList"
        ></Table>
        <Table
          v-if="
            params2['source'] == 'awardPerson' &&
            params2['type'] == 'friendAward'
          "
          border
          height="660"
          :columns="columns6"
          :data="personList.personList"
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
            :total="personList.count"
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

import TopicSubsidize from "./modules/TopicSubsidize"; // 历年资助情况
import TopicSubjectAreas from "./modules/TopicSubjectAreas"; // 学科领域分布
import TopicGlobalMap from "./modules/TopicGlobalMap"; // 全球地域分布
export default {
  name:'topicIndex',
  components: {
    TopicSubsidize,
    TopicSubjectAreas,
    TopicGlobalMap,
  },
  data() {
    return {
      mark: 0,
      mode: 0,
      loading: false,
      isSlide: true,
      isShow: false,
      persionNameEN: "",
      url: "http://10.0.90.42:8088/",
      listIcon1: require("../../assets/images/国际人才/index/默认矩阵.png"),
      listIcon2: require("../../assets/images/国际人才/index/选中列表.png"),
      imgIcon1: require("../../assets/images/国际人才/index/选中矩阵.png"),
      imgIcon2: require("../../assets/images/国际人才/index/默认列表.png"),
      imgIcon3: require("../../assets/images/国际人才/index/选中矩阵.png"),
      imgIcon4: require("../../assets/images/国际人才/index/默认列表.png"),
      params: {
        offset: 0,
        limit: 60,
        yearSelect: "",
        continentSelect: "",
        countrySelect: "",
        citySelect: "",
        subjectSelect: "",
        personTypeSelect: "",
        source: "internationalPerson",
        type: "",
      },
      params2: {
        offset: 0,
        limit: 60,
        persionNameEN: "",
        yearSelect: "",
        continentSelect: "",
        countrySelect: "",
        citySelect: "",
        subjectSelect: "",
        personTypeSelect: "",
        source: "internationalPerson",
        type: "",
      },
      subjectAll: [], // 学科
      personTypeAll: [],
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
      result: [],
      TopicFounding: [],
      TopicSubject: {},
      TopicGlobalData: {},
      personList: [], // 人员列表
      currentPage: 1,
      isListShow: true,
      selectname: false,
      columns1: [
        {
          title: "年度",
          key: "perYear",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.perYear !== "") {
              return h("span", params.row.perYear);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "项目编号",
          key: "projectNo",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.projectNo !== "") {
              return h("span", params.row.projectNo);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "推荐单位",
          key: "instName",
          width: 300,
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
          title: "单位编号",
          key: "instCode",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.instCode !== "" && params.row.instCode !== null) {
              return h("span", params.row.instCode);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "专家姓名",
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
          title: "所属洲",
          key: "continent",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.continent !== "") {
              return h("span", params.row.continent);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "双重国籍",
          key: "dualNationality",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.dualNationality !== "") {
              return h("span", params.row.dualNationality);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "护照号",
          key: "passportNo",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.passportNo !== "") {
              return h("span", params.row.passportNo);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "出生日期",
          key: "birthday",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.birthday !== "") {
              return h("span", params.row.birthday);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "国外工作单位",
          key: "foreignWorkOrg",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.foreignWorkOrg !== "") {
              return h("span", params.row.foreignWorkOrg);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "国家",
          key: "counrty",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.counrty !== "") {
              return h("span", params.row.counrty);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "英文一级",
          key: "firstOrgEn",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              params.row.firstOrgEn !== "" &&
              params.row.firstOrgEn !== null
            ) {
              return h("span", params.row.firstOrgEn);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "中文一级",
          key: "firstOrgZh",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.firstOrgZh !== "") {
              return h("span", params.row.firstOrgZh);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "英文二级",
          key: "secOrgEn",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.secOrgEn !== "") {
              return h("span", params.row.secOrgEn);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "中文二级",
          key: "secOrgZh",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.secOrgZh !== "") {
              return h("span", params.row.secOrgZh);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "城市",
          key: "cityNameZh",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.cityNameZh !== "") {
              return h("span", params.row.cityNameZh);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "城市英文名",
          key: "cityNameEn",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.cityNameEn !== "") {
              return h("span", params.row.cityNameEn);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "英文全称",
          key: "orgNormalNameEn",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              params.row.orgNormalNameEn !== "" &&
              params.row.orgNormalNameEn !== null
            ) {
              return h("span", params.row.orgNormalNameEn);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "中文全称",
          key: "orgNormalNameZh",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.orgNormalNameZh !== "") {
              return h("span", params.row.orgNormalNameZh);
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
          width: 300,
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
          title: "职位及职务",
          key: "title",
          width: 120,
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
          title: "访问学者类别",
          key: "visitorType",
          width: 150,
          align: "center",
          render: (h, params) => {
            if (params.row.visitorType !== "") {
              return h("span", params.row.visitorType);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "中方合作者",
          key: "zhOperator",
          width: 120,
          align: "center",
          render: (h, params) => {
            if (params.row.zhOperator !== "") {
              return h("span", params.row.zhOperator);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "中方联系方式",
          key: "zhConcatInformation",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.zhConcatInformation !== "") {
              return h("span", params.row.zhConcatInformation);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "类别",
          key: "perType",
          width: 150,
          align: "center",
          render: (h, params) => {
            if (params.row.perType !== "") {
              return h("span", params.row.perType);
            } else {
              return h("span", "—");
            }
          },
        },
        // {
        //   title: "是否是延续项目",
        //   key: "isOldProject",
        //   width: 200,
        //   align: "center",
        //   render: (h, params) => {
        //     if (params.row.isOldProject !== "") {
        //       return h("span", params.row.isOldProject);
        //     } else {
        //       return h("span", "—");
        //     }
        //   },
        // },
        {
          title: "计划来华时长",
          key: "planTimeLenInChina",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.planTimeLenInChina !== "") {
              return h("span", params.row.planTimeLenInChina);
            } else {
              return h("span", "—");
            }
          },
        },
        // {
        //   title: "计划来华时间",
        //   key: "planTimeInChina",
        //   width: 400,
        //   align: "center",
        //   render: (h, params) => {
        //     if (params.row.planTimeInChina !== "") {
        //       return h("span", params.row.planTimeInChina);
        //     } else {
        //       return h("span", "—");
        //     }
        //   },
        // },
        // {
        //   title: "计划离华时间",
        //   key: "planTimeAwayChina",
        //   width: 400,
        //   align: "center",
        //   render: (h, params) => {
        //     if (params.row.planTimeAwayChina !== "") {
        //       return h("span", params.row.planTimeAwayChina);
        //     } else {
        //       return h("span", "—");
        //     }
        //   },
        // },
        {
          title: "实际在华时长（月）",
          key: "actualTimeLenInChina",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.actualTimeLenInChina !== "") {
              return h("span", params.row.actualTimeLenInChina);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "批复金额（万元）",
          key: "approvedAmount",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.approvedAmount !== "") {
              return h("span", params.row.approvedAmount);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "变更后预算（万元）",
          key: "changedBudget",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.changedBudget !== "") {
              return h("span", params.row.changedBudget);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "核销金额（万元）",
          key: "writeOffAmount",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.writeOffAmount !== "") {
              return h("span", params.row.writeOffAmount);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "剩余金额（万元）",
          key: "remainAmount",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.remainAmount !== "") {
              return h("span", params.row.remainAmount);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "是否变更过",
          key: "hasChanged",
          width: 120,
          align: "center",
          render: (h, params) => {
            if (params.row.hasChanged !== "") {
              return h("span", params.row.hasChanged);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "是否执行",
          key: "isImplement",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.isImplement !== "") {
              return h("span", params.row.isImplement);
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
      columns2: [
        {
          title: "年份",
          key: "scholarshipYear",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (
              params.row.scholarshipYear !== "" &&
              params.row.scholarshipYear !== null
            ) {
              return h("span", params.row.scholarshipYear);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "姓名",
          key: "enName",
          width: 300,
          align: "center",
          render: (h, params) => {
            if (params.row.enName !== "") {
              return h("span", params.row.enName);
            } else {
              return h("span", params.row.zhName);
            }
          },
        },
        {
          title: "国籍",
          key: "nationality",
          width: 200,
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
          title: "性别",
          key: "sex",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.sex !== "") {
              return h("span", params.row.sex);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "出生日期",
          key: "birthday",
          width: 150,
          align: "center",
          render: (h, params) => {
            if (params.row.birthday !== "") {
              return h("span", params.row.birthday);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "学校",
          key: "admitSchool",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              params.row.admitSchool !== "" &&
              params.row.admitSchool !== null
            ) {
              return h("span", params.row.admitSchool);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "所在研究所/院系",
          key: "instName",
          width: 300,
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
          title: "在读情况",
          key: "studentStatus",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.studentStatus !== "") {
              return h("span", params.row.studentStatus);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "学号",
          key: "studentNo",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.studentNo !== "") {
              return h("span", params.row.studentNo);
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
      columns3: [
        {
          title: "届次",
          key: "period",
          width: 100,
          align: "center",
        },
        {
          title: "年度",
          key: "awardYear",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.awardYear !== "" && params.row.awardYear !== null) {
              return h("span", params.row.awardYear);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "姓名（中）",
          key: "zhName",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.zhName !== "" && params.row.zhName !== null) {
              return h("span", params.row.zhName);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "姓名（英）",
          key: "enName",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.enName !== "" && params.row.enName !== null) {
              return h("span", params.row.enName);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "职称",
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
          title: "学历",
          key: "education",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.education !== "" && params.row.education !== null) {
              return h("span", params.row.education);
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
          title: "出生日期",
          key: "birthday",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.birthday !== "" && params.row.birthday !== null) {
              return h("span", params.row.birthday);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "推荐单位",
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
          key: "foreignWorkOrg",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              params.row.foreignWorkOrg !== "" &&
              params.row.foreignWorkOrg !== null
            ) {
              return h("span", params.row.foreignWorkOrg);
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
      columns4: [
        {
          title: "年度",
          key: "awardYear",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.awardYear !== "" && params.row.awardYear !== null) {
              return h("span", params.row.awardYear);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "姓名（中）",
          key: "zhName",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.zhName !== "" && params.row.zhName !== null) {
              return h("span", params.row.zhName);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "姓名（英）",
          key: "enName",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.enName !== "" && params.row.enName !== null) {
              return h("span", params.row.enName);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "职称",
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
          title: "学历",
          key: "education",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.education !== "" && params.row.education !== null) {
              return h("span", params.row.education);
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
          title: "出生日期",
          key: "birthday",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.birthday !== "" && params.row.birthday !== null) {
              return h("span", params.row.birthday);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "推荐单位",
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
          key: "foreignWorkOrg",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              params.row.foreignWorkOrg !== "" &&
              params.row.foreignWorkOrg !== null
            ) {
              return h("span", params.row.foreignWorkOrg);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "学科一级",
          key: "subject",
          width: 300,
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
          width: 300,
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
      columns5: [
        {
          title: "年度",
          key: "awardYear",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.awardYear !== "" && params.row.awardYear !== null) {
              return h("span", params.row.awardYear);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "推荐单位",
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
          title: "外国科学家姓名（中）",
          key: "zhName",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.zhName !== "" && params.row.zhName !== null) {
              return h("span", params.row.zhName);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "外国科学家姓名（英）",
          key: "enName",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.enName !== "" && params.row.enName !== null) {
              return h("span", params.row.enName);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "外国科学家国籍",
          key: "foreignPersonNationality",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              params.row.foreignPersonNationality !== "" &&
              params.row.foreignPersonNationality !== null
            ) {
              return h("span", params.row.foreignPersonNationality);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "外国科学家性别",
          key: "foreignPersonSex",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              params.row.foreignPersonSex !== "" &&
              params.row.foreignPersonSex !== null
            ) {
              return h("span", params.row.foreignPersonSex);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "外国科学家出生日期",
          key: "foreignPersonBirthday",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              params.row.foreignPersonBirthday !== "" &&
              params.row.foreignPersonBirthday !== null
            ) {
              return h("span", params.row.foreignPersonBirthday);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "外国科学家学历学位",
          key: "foreignPersonEducation",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              params.row.foreignPersonEducation !== "" &&
              params.row.foreignPersonEducation !== null
            ) {
              return h("span", params.row.foreignPersonEducation);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "外国科学家职务",
          key: "foreignPersonTitle",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              params.row.foreignPersonTitle !== "" &&
              params.row.foreignPersonTitle !== null
            ) {
              return h("span", params.row.foreignPersonTitle);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "外国科学家国外工作单位（英）",
          key: "foreignPersonEnWorkOrg",
          width: 300,
          align: "center",
          render: (h, params) => {
            if (
              params.row.foreignPersonEnWorkOrg !== "" &&
              params.row.foreignPersonEnWorkOrg !== null
            ) {
              return h("span", params.row.foreignPersonEnWorkOrg);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "外国科学家国外工作单位（中）",
          key: "foreignPersonZhWorkOrg",
          width: 300,
          align: "center",
          render: (h, params) => {
            if (
              params.row.foreignPersonZhWorkOrg !== "" &&
              params.row.foreignPersonZhWorkOrg !== null
            ) {
              return h("span", params.row.foreignPersonZhWorkOrg);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "国外科学家国内工作单位",
          key: "foreignPersonWorkOrgInChina",
          width: 300,
          align: "center",
          render: (h, params) => {
            if (
              params.row.foreignPersonWorkOrgInChina !== "" &&
              params.row.foreignPersonWorkOrgInChina !== null
            ) {
              return h("span", params.row.foreignPersonWorkOrgInChina);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "我院科学家姓名（中）",
          key: "oursPersonZhName",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              params.row.oursPersonZhName !== "" &&
              params.row.oursPersonZhName !== null
            ) {
              return h("span", params.row.oursPersonZhName);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "我院科学家姓名（英）",
          key: "oursPersonEnName",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              params.row.oursPersonEnName !== "" &&
              params.row.oursPersonEnName !== null
            ) {
              return h("span", params.row.oursPersonEnName);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "我院专家国籍",
          key: "oursPersonNationality",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              params.row.oursPersonNationality !== "" &&
              params.row.oursPersonNationality !== null
            ) {
              return h("span", params.row.oursPersonNationality);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "我院专家性别",
          key: "oursPersonSex",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              params.row.oursPersonSex !== "" &&
              params.row.oursPersonSex !== null
            ) {
              return h("span", params.row.oursPersonSex);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "我院专家出生日期",
          key: "oursPersonBirthday",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              params.row.oursPersonBirthday !== "" &&
              params.row.oursPersonBirthday !== null
            ) {
              return h("span", params.row.oursPersonBirthday);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "我院专家专业",
          key: "oursPersonMajor",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              params.row.oursPersonMajor !== "" &&
              params.row.oursPersonMajor !== null
            ) {
              return h("span", params.row.oursPersonMajor);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "我院专家职务",
          key: "oursPersonTitle",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              params.row.oursPersonTitle !== "" &&
              params.row.oursPersonTitle !== null
            ) {
              return h("span", params.row.oursPersonTitle);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "我院专家学历",
          key: "oursPersonEducation",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              params.row.oursPersonEducation !== "" &&
              params.row.oursPersonEducation !== null
            ) {
              return h("span", params.row.oursPersonEducation);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "我院科学家国外工作单位",
          key: "oursPersonForeignWorkOrg",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              params.row.oursPersonForeignWorkOrg !== "" &&
              params.row.oursPersonForeignWorkOrg !== null
            ) {
              return h("span", params.row.oursPersonForeignWorkOrg);
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
      columns6: [
        {
          title: "年度",
          key: "awardYear",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.awardYear !== "" && params.row.awardYear !== null) {
              return h("span", params.row.awardYear);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "姓名（中）",
          key: "zhName",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.zhName !== "" && params.row.zhName !== null) {
              return h("span", params.row.zhName);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "姓名（英）",
          key: "enName",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (params.row.enName !== "" && params.row.enName !== null) {
              return h("span", params.row.enName);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "职称",
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
          title: "学历",
          key: "education",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.education !== "" && params.row.education !== null) {
              return h("span", params.row.education);
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
          title: "出生日期",
          key: "birthday",
          width: 150,
          align: "center",
          render: (h, params) => {
            if (params.row.birthday !== "" && params.row.birthday !== null) {
              return h("span", params.row.birthday);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "推荐单位",
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
          key: "foreignWorkOrg",
          width: 300,
          align: "center",
          render: (h, params) => {
            if (
              params.row.foreignWorkOrg !== "" &&
              params.row.foreignWorkOrg !== null
            ) {
              return h("span", params.row.foreignWorkOrg);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "学科一级",
          key: "subject",
          width: 250,
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
          width: 250,
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
          title: "别国院士",
          key: "otherCountryAcademic",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              params.row.otherCountryAcademic !== "" &&
              params.row.otherCountryAcademic !== null
            ) {
              return h("span", params.row.otherCountryAcademic);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "中科院外籍院士",
          key: "foreignAcademic",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              params.row.foreignAcademic !== "" &&
              params.row.foreignAcademic !== null
            ) {
              return h("span", params.row.foreignAcademic);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "合作起始年份",
          key: "cooperationStartYear",
          width: 150,
          align: "center",
          render: (h, params) => {
            if (
              params.row.cooperationStartYear !== "" &&
              params.row.cooperationStartYear !== null
            ) {
              return h("span", params.row.cooperationStartYear);
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
    // 人员类别下拉
    this.handlePersonType();
    //  历年资质情况
    this.handleInternetFound();
    // 学科分布
    this.handleSubjectList();
    // 全球分布
    this.handleGlobalMap();
    // 人员列表
    this.handlePersonList();
  },
  methods: {
    // 返回上一页
    handleClose() {
      this.$router.push({ path: "/" });
      sessionStorage.clear();
    },

    lastPage(){
        visitFun.lastPage()
      },

    // 跳转详情页
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
    // 人员类别
    handlePersonType() {
      this.axios.get("/international/topic/personType").then((res) => {
        if (res.data.code == 200) {
          this.personTypeAll = res.data.data;
        }
      });
    },
    secondLevelSearch() {
      this.handleInternetFound();
      this.handleSubjectList();
      this.handleGlobalMap();
      this.handlePersonList();
    },
    // 左侧筛选
    currentIndex(val) {
      this.mark = val;
      let obj = {
        mark: this.mark,
        source1: this.params["source"],
        type1: this.params["type"],
        source2: this.params2["source"],
        type2: this.params2["type"],
      };
      let objStr = JSON.stringify(obj);
      sessionStorage.setItem("data", [objStr]);
      switch (this.mark) {
        case 0:
          this.params["source"] = "internationalPerson";
          this.params["type"] = "";
          this.params2["source"] = "internationalPerson";
          this.params2["type"] = "";
          this.params = {
            offset: 0,
            limit: 60,
            yearSelect: "",
            continentSelect: "",
            countrySelect: "",
            citySelect: "",
            subjectSelect: "",
            personTypeSelect: "",
            source: "internationalPerson",
            type: "",
          };
          this.secondLevelSearch();
          break;
        case 1:
          this.params["source"] = "scholarshipPerson";
          this.params["type"] = "CAS-TWAS";
          this.params2["source"] = "scholarshipPerson";
          this.params2["type"] = "CAS-TWAS";
          this.params = {
            offset: 0,
            limit: 60,
            yearSelect: "",
            continentSelect: "",
            countrySelect: "",
            citySelect: "",
            subjectSelect: "",
            personTypeSelect: "",
            source: "scholarshipPerson",
            type: "CAS-TWAS",
          };
          this.secondLevelSearch();
          break;
        case 2:
          this.params["source"] = "scholarshipPerson";
          this.params["type"] = "masterScholarship";
          this.params2["source"] = "scholarshipPerson";
          this.params2["type"] = "masterScholarship";
          this.params = {
            offset: 0,
            limit: 60,
            yearSelect: "",
            continentSelect: "",
            countrySelect: "",
            citySelect: "",
            subjectSelect: "",
            personTypeSelect: "",
            source: "scholarshipPerson",
            type: "masterScholarship",
          };
          this.secondLevelSearch();
          break;
        case 3:
          break;
        case 4:
          this.params["source"] = "awardPerson";
          this.params["type"] = "interOperAward";
          this.params2["source"] = "awardPerson";
          this.params2["type"] = "interOperAward";
          this.params = {
            offset: 0,
            limit: 60,
            yearSelect: "",
            continentSelect: "",
            countrySelect: "",
            citySelect: "",
            subjectSelect: "",
            personTypeSelect: "",
            source: "awardPerson",
            type: "interOperAward",
          };
          this.secondLevelSearch();
          break;
        case 5:
          this.params["source"] = "awardPerson";
          this.params["type"] = "interTechAward";
          this.params2["source"] = "awardPerson";
          this.params2["type"] = "interTechAward";
          this.params = {
            offset: 0,
            limit: 60,
            yearSelect: "",
            continentSelect: "",
            countrySelect: "",
            citySelect: "",
            subjectSelect: "",
            personTypeSelect: "",
            source: "awardPerson",
            type: "interTechAward",
          };
          this.secondLevelSearch();
          break;
        case 6:
          this.params["source"] = "awardPerson";
          this.params["type"] = "youngAward";
          this.params2["source"] = "awardPerson";
          this.params2["type"] = "youngAward";
          this.params = {
            offset: 0,
            limit: 60,
            yearSelect: "",
            continentSelect: "",
            countrySelect: "",
            citySelect: "",
            subjectSelect: "",
            personTypeSelect: "",
            source: "awardPerson",
            type: "youngAward",
          };
          this.secondLevelSearch();
          break;
        case 7:
          this.params["source"] = "awardPerson";
          this.params["type"] = "friendAward";
          this.params2["source"] = "awardPerson";
          this.params2["type"] = "friendAward";
          this.params = {
            offset: 0,
            limit: 60,
            yearSelect: "",
            continentSelect: "",
            countrySelect: "",
            citySelect: "",
            subjectSelect: "",
            personTypeSelect: "",
            source: "awardPerson",
            type: "friendAward",
          };
          this.secondLevelSearch();
          break;
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

    // 历年资助情况
    handleInternetFound() {
      this.axios
        .get("/international/topic/internet/found", {
          params: {
            source: this.params.source,
            type: this.params.type,
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
            this.TopicFounding = res.data.data;
          }
        });
    },

    // 学科分布
    handleSubjectList() {
      this.axios
        .get("/international/topic/internationalPerson", {
          params: {
            limit: this.params.limit,
            nowPage: 0,
            source: this.params.source,
            type: this.params.type,
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
    handleGlobalMap() {
      this.axios
        .get("/international/topic/internationalPerson/global", {
          params: {
            limit: this.params.limit,
            offset: this.params.offset,
            source: this.params.source,
            type: this.params.type,
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
            this.TopicGlobalData = {
              geoCoordMap: res.data.data.geoCoordMap,
              data: res.data.data,
              params: this.params,
            };
          }
        });
    },

    // 人员列表
    handlePersonList() {
      this.loading = true;
      this.axios
        .get("/international/topic/internationalPerson/list", {
          params: {
            offset: this.params2.offset,
            limit: this.params2.limit,
            source: this.params2.source,
            type: this.params2.type,
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
            this.personList = res.data.data;
          }
        });
    },
    // 列表分页
    changePage(event) {
      this.loading = true;
      this.params2.offset = event - 1;
      this.handlePersonList(); //请求数据
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
        this.handleInternetFound();
        this.handleSubjectList();
        this.handleGlobalMap();
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
            this.params["countrySelect"] = this.globalArea2[length - 1].split(
              "-"
            )[1];
          } else if (length == 3) {
            this.params2["citySelect"] = this.globalArea2[length - 1].split(
              "-"
            )[1];
          }
        }
        this.handlePersonList();
      }
    },

    // 清空条件
    handleTopicEmptys(val) {
      if (val == 1) {
        this.globalArea = "";
        this.params = {
          offset: 0,
          limit: 60,
          source: this.params.source,
          type: this.params.type,
          yearSelect: "",
          continentSelect: "",
          countrySelect: "",
          citySelect: "",
          subjectSelect: "",
          personTypeSelect: "",
        };
        this.handleInternetFound();
        this.handleSubjectList();
        this.handleGlobalMap();
      } else if (val == 2) {
        this.globalArea2 = "";
        this.persionNameEN = "";
        this.params2 = {
          offset: 0,
          limit: 60,
          source: this.params.source,
          type: this.params.type,
          yearSelect: "",
          continentSelect: "",
          countrySelect: "",
          citySelect: "",
          subjectSelect: "",
          personTypeSelect: "",
        };
        this.handlePersonList();
      }
    },

    // 按人员列表导出
    handlePersonListExport() {
      this.axios
        .get("/international/topic/export/person", {
          params: {
            offset: this.params2.offset,
            limit: this.params2.limit,
            source: this.params2.source,
            type: this.params2.type,
            year: this.params2.yearSelect,
            continent: this.params2.continentSelect,
            country: this.params2.countrySelect,
            city: this.params2.citySelect,
            subject: this.params2.subjectSelect,
            personType: this.params2.personTypeSelect,
          },
          responseType: "blob",
        })
        .then((res) => {
          let blob = new Blob([res.data], {
            type: "application/vnd.ms-excel",
          }); // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
          let url = window.URL.createObjectURL(blob); // 3.创建一个临时的url指向blob对象

          // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
          let a = document.createElement("a");
          a.href = url;
          a.download = "专题人员列表.xlsx";
          a.click();
          // 5.释放这个临时的对象url
          window.URL.revokeObjectURL(url);
        });
    },

    // 人员名称搜索
    async handlePersonNameSearch(val) {
      this.axios
        .get("/international/topic/internationalPerson/list/like", {
          params: {
            offset: this.params2.offset,
            limit: this.params2.limit,
            source: this.params2.source,
            type: this.params2.type,
            year: this.params2.yearSelect,
            continent: this.params2.continentSelect,
            country: this.params2.countrySelect,
            city: this.params2.citySelect,
            subject: this.params2.subjectSelect,
            personType: this.params2.personTypeSelect,
          },
        })
        .then((res) => {
          this.result = res.data.data.personList;
        });
    },
    handlefocus() {
      this.isShow = true;
      this.selectname = true;
    },
    handleClickQuery(val) {
      if (this.params.source == "internationalPerson") {
        this.persionNameEN = val.name;
      } else {
        this.persionNameEN = val.enName;
      }

      this.params2.persionNameEN = this.persionNameEN;
      this.selectname = false;
    },
    handleSearchPersion() {
      if (!!this.params2.persionNameEN) {
        this.handlePersonList();
      }
    },
    handleBgClose() {
      this.isShow = false;
      this.selectname = false;
    },

    // 导出PDF
    handlePdfDownload() {
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
      if(this.params.subjectSelect != "") {
        param += '-' + this.params.subjectSelect
      }
      if(this.params.personTypeSelect != "") {
        param += '-' + this.params.personTypeSelect
      }
      let data = {
        param: param,
        source: "国际人才计划",
        type: "按专题",
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
        let topicMapDiv = _this.$refs.topicMapDiv;
        visitFun.getImgBase64(topicMapDiv).then((res) => {
          data.mapImage = res;
          resolve(true);
        });
      });
      // console.log(data)
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
      },2000)

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
            width: 290px;

            /deep/ .el-input {
              width: 290px;

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
            width: 320px;

            /deep/ .el-input {
              width: 320px;

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
