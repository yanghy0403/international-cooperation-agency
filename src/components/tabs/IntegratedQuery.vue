<template>
  <div class="ICA-integratedQuery">
    <div ref="hotSearchDiv" class="integratedQuery-Hot-Search">
      <label>热搜：</label>
      <div class="spanDiv" v-for="(item1, index) in hotSearch" :key="index">
        <div @click="handleHotSearchPath(item1.type,item1.id,item1.language)">
          <el-tooltip
            v-if="item1.showTooltip"
            class="item"
            style="width: 100px !important"
            effect="light"
            :content="item1.val"
            placement="top"
            popper-class="page-login-toolTipClass"
          >
            <span>{{ item1.newVal }}</span>
          </el-tooltip>
          <span v-else>
            {{ item1.val }}
          </span>
        </div>
      </div>
    </div>
    <div class="integratedQuery-search-condition">
      <div class="tabs">
        <ul>
          <li
            :class="{ bgActive: cur == 0 }"
            @mouseenter="mouseoverClick(0)"
            @mouseleave="mouseleaveClick(0)"
          >
            <div class="corners" v-if="this.cur == 0">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
            <img
              style="width: 21px; height: 21px"
              v-if="this.cur != 0"
              src="../../assets/images/综合查询/国家按钮-默认状态.png"
              alt
            />
            <img
              style="width: 71px; height: 71px"
              v-else
              src="../../assets/images/综合查询/国家按钮-选中状态.png"
              alt
            />
          </li>
          <li
            :class="{ bgActive: cur == 1 }"
            @mouseenter="mouseoverClick(1)"
            @mouseleave="mouseleaveClick(1)"
          >
            <div class="corners" v-if="this.cur == 1">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
            <img
              style="width: 18px; height: 22px"
              v-if="this.cur != 1"
              src="../../assets/images/综合查询/城市按钮-默认状态.png"
              alt
            />
            <img
              style="width: 59px; height: 71px"
              v-else
              src="../../assets/images/综合查询/城市按钮-选中状态.png"
              alt
            />
          </li>
          <li
            :class="{ bgActive: cur == 2 }"
            @mouseenter="mouseoverClick(2)"
            @mouseleave="mouseleaveClick(2)"
          >
            <div class="corners" v-if="this.cur == 2">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
            <img
              style="width: 21px; height: 21px"
              v-if="this.cur != 2"
              src="../../assets/images/综合查询/机构按钮-默认状态.png"
              alt
            />
            <img
              style="width: 68px; height: 68px"
              v-else
              src="../../assets/images/综合查询/机构按钮-选中状态.png"
              alt
            />
          </li>
          <li
            :class="{ bgActive: cur == 3 }"
            @mouseenter="mouseoverClick(3)"
            @mouseleave="mouseleaveClick(3)"
          >
            <div class="corners" v-if="this.cur == 3">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
            <img
              style="width: 20px; height: 20px"
              v-if="this.cur != 3"
              src="../../assets/images/综合查询/学科按钮-默认状态.png"
              alt
            />
            <img
              style="width: 70px; height: 70px"
              v-else
              src="../../assets/images/综合查询/学科按钮-选中状态.png"
              alt
            />
          </li>
          <li
            :class="{ bgActive: cur == 4 }"
            @mouseenter="mouseoverClick(4)"
            @mouseleave="mouseleaveClick(4)"
          >
            <div class="corners" v-if="this.cur == 4">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
            <img
              style="width: 23px; height: 17px"
              v-if="this.cur != 4"
              src="../../assets/images/综合查询/人员按钮-默认状态.png"
              alt
            />
            <img
              style="width: 80px; height: 59px"
              v-else
              src="../../assets/images/综合查询/人员按钮-选中状态.png"
              alt
            />
          </li>
        </ul>
      </div>
      <div class="conditionList">
        <ul>
          <li
            @click="curClick(0)"
            :class="{ active: cur == 0 }"
            @mouseenter="mouseoverClick(0)"
            @mouseleave="mouseleaveClick(0)"
          >
            <div class="corners" v-if="this.cur == 0 && !isShow">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
            <!-- @click="handleSelectDwon" -->
            <div class="i-select">
              <input
                v-model="valueData[0].name"
                class="i-ipt"
                type="text"
                readonly="readonly"
                placeholder="请选择国家或地区"
                @click.stop="handleSelectDwonInput"
              />
              <i
                v-if="valueData[0].name == ''"
                @click.stop="handleSelectDwon"
                class="el-icon-caret-bottom"
              ></i>
              <i
                v-if="valueData[0].name != '' && this.closeCur == 0"
                style="right: 20px; top: 25px"
                @click.stop="
                  valueData[0].name = '';
                  countryValue = '';
                "
                class="el-icon-circle-close"
              ></i>
            </div>
            <div class="rightLetterBox" v-show="isShow">
              <div class="i-select-option newScrollbar">
                <div style="height: 60px; width: 100%"></div>
                <div class="selectTitle" style="">全部国家</div>
                <ul>
                  <li
                    @click.stop="handleValue(item)"
                    v-for="(item, i) in countryData"
                    :key="i"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
              <div class="inputDivBox">
                <div class="inputDiv">
                  <input
                    placeholder="请输入国家 / country"
                    type="text"
                    v-model="countryValue"
                  />
                </div>
              </div>
            </div>
          </li>
          <div
            style="height: 10px; width: 100%; background: rgba(0, 0, 0, 0)"
            @mouseenter="mouseoverClick(0)"
            @mouseleave="mouseleaveClick(0)"
          ></div>
          <li
            @click="curClick(1)"
            :class="{ active: cur == 1 }"
            @mouseenter="mouseoverClick(1)"
            @mouseleave="mouseleaveClick(1)"
          >
            <div class="corners" v-if="this.cur == 1 && !isShow1">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
            <div class="i-select">
              <input
                v-model="valueData[1].name"
                class="i-ipt"
                type="text"
                readonly="readonly"
                placeholder="请选择城市"
                @click.stop="handleSelectDwon1Input"
              />
              <i
                v-if="valueData[1].name == ''"
                @click.stop="handleSelectDwon1"
                class="el-icon-caret-bottom"
              ></i>
              <i
                v-if="valueData[1].name != '' && this.closeCur == 1"
                style="right: 20px; top: 25px"
                @click.stop="
                  valueData[1].name = '';
                  cityValue = '';
                "
                class="el-icon-circle-close"
              ></i>
            </div>
            <div class="rightLetterBox" v-show="isShow1">
              <div class="i-select-option newScrollbar" style="height: 460px">
                <div style="height: 60px; width: 100%"></div>
                <div class="selectTitle">全部城市</div>
                <ul>
                  <li
                    @click.stop="handleValue1(item)"
                    v-for="(item, i) in CityData"
                    :key="i"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
              <div class="inputDivBox">
                <div class="inputDiv">
                  <input
                    placeholder="请输入城市 / city"
                    type="text"
                    v-model="cityValue"
                  />
                </div>
              </div>
            </div>
          </li>
          <div
            style="height: 10px; width: 100%; background: rgba(0, 0, 0, 0)"
            @mouseenter="mouseoverClick(1)"
            @mouseleave="mouseleaveClick(1)"
          ></div>

          <li
            @click="curClick(2)"
            :class="{ active: cur == 2 }"
            @mouseenter="mouseoverClick(2)"
            @mouseleave="mouseleaveClick(2)"
          >
            <div class="corners" v-if="this.cur == 2 && !isShow2">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
            <div class="i-select">
              <input
                v-model="valueData[2].name"
                class="i-ipt"
                type="text"
                readonly="readonly"
                placeholder="请选择机构"
                @click.stop="handleSelectDwon2Input"
              />
              <i
                v-if="valueData[2].name == ''"
                @click.stop="handleSelectDwon2"
                class="el-icon-caret-bottom"
              ></i>
              <i
                v-if="valueData[2].name != '' && this.closeCur == 2"
                style="right: 20px; top: 25px; z-index: 100"
                @click.stop="
                  valueData[2].name = '';
                  orgValue = '';
                "
                class="el-icon-circle-close"
              ></i>
            </div>
            <div class="rightLetterBoxOrg" v-show="isShow2">
              <div class="i-select-option newScrollbar" style="height: 400px">
                <div style="height: 60px; width: 100%"></div>
                <div class="selectTitle">选择机构</div>
                <ul>
                  <li
                    @click.stop="handleValue2(item)"
                    v-for="(item, i) in orgData"
                    :key="i"
                  >
                    {{ item.name }}
                  </li>
                </ul>
              </div>
              <div class="inputDivBox">
                <div class="inputDiv">
                  <input
                    placeholder="请输入机构 / org"
                    type="text"
                    v-model="orgValue"
                  />
                </div>
              </div>
            </div>
          </li>
          <div
            style="height: 10px; width: 100%; background: rgba(0, 0, 0, 0)"
            @mouseenter="mouseoverClick(2)"
            @mouseleave="mouseleaveClick(2)"
          ></div>

          <li
            @click="curClick(3)"
            :class="{ active: cur == 3 }"
            @mouseenter="mouseoverClick(3)"
            @mouseleave="mouseleaveClick(3)"
          >
            <div class="corners" v-if="this.cur == 3 && !isShow3">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
            <div class="i-select">
              <input
                v-model="valueData[3].name"
                class="i-ipt"
                type="text"
                readonly="readonly"
                placeholder="请选择学科领域"
                @click.stop="handleSelectDwon3Input"
              />
              <i
                v-if="valueData[3].name == ''"
                @click.stop="handleSelectDwon3"
                class="el-icon-caret-bottom"
              ></i>
              <i
                v-if="valueData[3].name != '' && this.closeCur == 3"
                style="right: 20px; top: 25px"
                @click.stop="valueData[3].name = ''"
                class="el-icon-circle-close"
              ></i>
            </div>
            <div class="rightLetterBox">
              <div
                class="i-select-option newScrollbar"
                style="height: 340px"
                v-show="isShow3"
              >
                <div class="selectTitle">选择科学领域</div>
                <ul>
                  <li
                    @click.stop="handleValue3(item)"
                    v-for="(item, i) in subjectData"
                    :key="i"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <div
            style="height: 10px; width: 100%; background: rgba(0, 0, 0, 0)"
            @mouseenter="mouseoverClick(3)"
            @mouseleave="mouseleaveClick(3)"
          ></div>

          <li
            @click="curClick(4)"
            :class="{ active: cur == 4 }"
            @mouseenter="mouseoverClick(4)"
            @mouseleave="mouseleaveClick(4)"
          >
            <div class="corners" v-if="this.cur == 4">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
            <div class="i-select">
              <input
                v-model="persionName"
                @input="handlefocus()"
                class="i-ipt"
                type="text"
                placeholder="请输入科研人员姓名"
              />
              <div class="select-list">
                <div class="ivu-poptip-inner scrollbar" v-show="selectname">
                  <ul v-if="persionData.length !== 0" class="resultdata">
                    <li
                      class="ivu-poptip-body"
                      v-for="(item, k) in persionData"
                      :key="k + 'x'"
                      @click="handleClickQuery(item)"
                    >
                      <p v-if="item.source == 'zh'">
                        <span>{{ item.zhName }}</span
                        ><span>{{ item.title }}</span
                        ><span>{{ item.unit }}</span>
                      </p>
                      <p v-if="item.source == 'en'">
                        <span>{{
                          item.enName == "" ? item.zhName : item.enName
                        }}</span>
                        <span>{{ item.title }}</span>
                        <span>{{ item.unit }}</span>
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
          </li>
          <div
            style="height: 10px; width: 100%; background: rgba(0, 0, 0, 0)"
            @mouseenter="mouseoverClick(4)"
            @mouseleave="mouseleaveClick(4)"
          ></div>
        </ul>
      </div>
      <div class="SelectedStatus">
        <ul>
          <li v-for="(item, index) in valueData" :key="index"></li>
        </ul>
      </div>
      <div class="searchBTN" @click="handleSearch">
        <div class="crossBg1"></div>
        <div class="crossBg2"></div>
        <div class="searchImg">
          <img
            v-if="
              valueData[0].name == '' &&
              valueData[1].name == '' &&
              valueData[2].name == '' &&
              valueData[3].name == '' &&
              persionName == ''
            "
            src="../../assets/images/综合查询/搜索按钮-默认状态.png"
            alt
          />
          <img
            style="cursor: pointer"
            v-else
            src="../../assets/images/综合查询/搜索按钮-选中状态.png"
            alt
          />
        </div>
      </div>
      <!--<div @click="emptyClick" class="Empty">清空</div>-->
    </div>
    <div v-show="isBigBg" class="showBg" @click="handleIsBigBg"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countryValue: "", //国家下拉框中的搜索值
      cityValue: "", //城市下拉框中的搜索值
      orgValue: "", //机构下拉框中的搜索值

      countryParams: {
        countrySimpleZhName: "", //国家简称
        city: "", //城市
        continent: "", //大洲
        language: "", //语言
        source: "", //哪个页面调用该接口
      },

      cityParams: {
        country: "", //国家简称
        city: "", //城市
        continent: "", //大洲
        language: "", //语言
      },
      hotSearch: [
        {
          val: "中国科学院西双版纳热带植物园",
          newVal: "中国科学院...",
          showTooltip: true,
          id: "06d011971cf2d221b2533ee487c959b1",
          type: "org",
          language: "zh"
        },
        {
          val: "郭华东",
          newVal: "郭华东",
          showTooltip: false,
          id: "4084ab76caa3fb1c67241ff78e71f60c",
          type: "person",
          language: "zh"
        },
        {
          val: "美国能源部",
          newVal: "美国能源部",
          showTooltip: false,
          id: "c274c57cb1e2563a1d360bea55c59ae2",
          type: "org",
          language: "en"
        },
        {
          val: "澳大利亚",
          newVal: "澳大利亚",
          showTooltip: false,
          type: "country",
        },
        {
          val: "东京大学",
          newVal: "东京大学",
          showTooltip: false,
          id: "5c839c27ae29aa856c68f5824d1d052a",
          type: "org",
          language: "en"
        },
        {
          val: "Xiaofan Wang",
          newVal: "Xiaofan Wang",
          showTooltip: true,
          id: "0b11a54d1bb9da2f1384d51ef70664ca",
          type: "person",
          language: "en"
        },
      ],
      orgNameParam: "",
      subjectNameParam: "",
      persionName: "",
      cur: 0,
      realcur: 0,
      closeCur: -1,
      isClick: false,
      isShow: false,
      isShow1: false,
      isShow2: false,
      isShow3: false,
      letterWorld: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
      valueData: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      countryData: [],
      CityData: [],
      orgData: [],
      subjectData: [],
      state: "",
      isBigBg: false,
      organs: [
        {
          label: "国立大学",
        },
        {
          label: "加拿大艺术理事会",
        },
        {
          label: "圣博尼法斯大学",
        },
        {
          label: "兰开夏郡教学医院NHS基金会信托",
        },
        {
          label: "东京北田医疗中心",
        },
      ],
      selectname: false,
      persionData: [],
      persionId: "",
      sourceVal: "",
      orgId: "",
      isChinaOrg: "",
    };
  },
  computed: {
    getName: function () {
      return this.persionName;
    },
  },
  watch: {
    countryValue(newval, oldval) {
      this.countryParams.countrySimpleZhName = newval;
      this.getCountryData();
    },
    cityValue(newval, oldval) {
      this.cityParams.city = newval;
      this.getCityData();
    },
    orgValue(newval, oldval) {
      this.orgNameParam = newval;
      this.getOrgData();
    },

    getName: {
      deep: true, // 深度监听
      immediate: true, // 监听到后，立即执行 handler方法
      handler: function (val) {
        if (val != "") {
          this.valueData[0].name = "";
          this.valueData[1].name = "";
          this.valueData[2].name = "";
          this.valueData[3].name = "";
        }
      },
    },
    persionName(val) {
      if (this.persionName) {
        this.handlePersonAutoTip(val);
      }
    },
  },
  mounted() {
    this.getCountryData();
    this.getCityData();
    this.getSubjectData();
    this.getOrgData();
  },
  methods: {
    // 热搜跳转
    handleHotSearchPath(type,id,language) {
      console.log(type,id);
      if(type == "person"&& language == "en") return this.$router.push({path: "/PersonDetails",query: { id: id }});
      if(type == "person"&& language == "zh") return this.$router.push({path: "/domesticPersonnelInfor",query: { id: id }});
      if(type == "org"&& language == "en") return this.$router.push({path: "/organizationEN",query: { id: id }});
      if(type == "org"&& language == "zh") return this.$router.push({path: "/organizationZH",query: { id: id }});
      if(type == "country") return this.$router.push({path: "/searchPage",query: { country: "" }});


      
    },
    // 国家搜索列表
    getCountryData() {
      let params =
        "city=" +
        this.countryParams.city +
        "&continent=" +
        this.countryParams.continent +
        "&countrySimpleZhName=" +
        this.countryParams.countrySimpleZhName +
        "&source=" +
        this.countryParams.source +
        "&language=" +
        this.countryParams.language;
      this.axios.get(`/index/country/autoTip?${params}`).then((res) => {
        if (res.data.code == 200) {
          this.countryData = res.data.data.name;
        }
      });
    },

    // 城市搜索列表
    getCityData() {
      let params =
        "city=" +
        this.cityParams.city +
        "&continent=" +
        this.cityParams.continent +
        "&country=" +
        this.cityParams.country +
        "&language=" +
        this.cityParams.language;
      this.axios.get(`/index/city/autoTip?${params}`).then((res) => {
        if (res.data.code == 200) {
          this.CityData = res.data.data;
        }
      });
    },

    // 机构搜索列表
    getOrgData() {
      let params = "query_name=" + this.orgNameParam;
      this.axios.get(`/index/org/autoTipDetail?${params}`).then((res) => {
        if (res.data.code == 200) {
          //console.log(res)
          this.orgData = res.data.data;
        }
      });
    },

    // 学科搜索列表
    getSubjectData() {
      let params = "query_EQ_subject=" + this.subjectNameParam;
      this.axios.get(`/index/subject/autoTip?${params}`).then((res) => {
        if (res.data.code == 200) {
          this.subjectData = res.data.data.name;
        }
      });
    },
    // 人员匹配
    async handlePersonAutoTip() {
      this.axios
        .get("/index/person/autoTip", { params: { name: this.persionName } })
        .then((res) => {
          if (res.data.code == 200) {
            this.persionData = res.data.data;
          }
        });
    },
    handleClickQuery(val) {
      if (val.source == "zh") {
        this.persionName = val.zhName + " " + val.title + " " + val.unit;
        this.sourceVal = val.source;
        this.persionId = val.uniqueId;
        this.selectname = false;
      }
      if (val.source == "en") {
        if (val.enName != "") {
          this.persionName = val.enName + " " + val.title + " " + val.unit;
        } else {
          this.persionName = val.zhName + " " + val.title + " " + val.unit;
        }
        this.sourceVal = val.source;
        this.persionId = val.uniqueId;
        this.selectname = false;
      }
    },
    handlefocus() {
      this.isBigBg = true;
      this.selectname = true;
    },

    handleIsBigBg() {
      this.isBigBg = false;
      this.showType();
    },
    // 下拉
    handleSelectDwon() {
      if (this.isShow == false) {
        this.showType();
        this.isShow = true;
        this.isBigBg = true;
      } else {
        this.showType();
      }
      this.cur = 0;
      this.isClick = true;
    },
    handleSelectDwonInput() {
      if (this.valueData[0].name != "") {
        this.handleSelectDwon();
      }
    },
    //国家的下拉点击
    handleValue(val) {
      // this.valueData = [
      //   { name: "" },
      //   { name: "" },
      //   { name: "" },
      //   { name: "" },
      //   { name: "" },
      //   { name: "" },
      // ];
      this.valueData[0].name = val;
      this.isShow = false;
      this.isBigBg = false;
    },
    handleSelectDwon1() {
      if (this.isShow1 == false) {
        this.showType();
        this.isBigBg = true;
        this.isShow1 = true;
      } else {
        this.showType();
      }
      this.cur = 1;
      this.isClick = true;
    },
    handleSelectDwon1Input() {
      if (this.valueData[1].name != "") {
        this.handleSelectDwon1();
      }
    },
    handleValue1(val) {
      // this.valueData = [
      //   { name: "" },
      //   { name: "" },
      //   { name: "" },
      //   { name: "" },
      //   { name: "" },
      //   { name: "" },
      // ];
      this.valueData[1].name = val;
      this.isShow1 = false;
      this.isBigBg = false;
    },
    handleSelectDwon2() {
      if (this.isShow2 == false) {
        this.isBigBg = true;
        this.showType();
        this.isShow2 = true;
      } else {
        this.showType();
      }
      this.cur = 2;
      this.isClick = true;
    },
    handleSelectDwon2Input() {
      if (this.valueData[2].name != "") {
        this.handleSelectDwon2();
      }
    },
    handleValue2(val) {
      // this.valueData = [
      //   { name: "" },
      //   { name: "" },
      //   { name: "" },
      //   { name: "" },
      //   { name: "" },
      //   { name: "" },
      // ];
      this.valueData[2].name = val.name;
      this.orgId = val.orgId;
      this.isChinaOrg = val.isChinaOrg;
      this.isShow2 = false;
      this.isBigBg = false;
    },
    handleSelectDwon3() {
      if (this.isShow3 == false) {
        this.isBigBg = true;
        this.showType();
        this.isShow3 = true;
      } else {
        this.showType();
      }
      this.cur = 3;
      this.isClick = true;
    },
    handleSelectDwon3Input() {
      if (this.valueData[3].name != "") {
        this.handleSelectDwon3();
      }
    },
    handleValue3(val) {
      // this.valueData = [
      //   { name: "" },
      //   { name: "" },
      //   { name: "" },
      //   { name: "" },
      //   { name: "" },
      //   { name: "" },
      // ];
      this.valueData[3].name = val;
      this.isShow3 = false;
      this.isBigBg = false;
    },

    showType() {
      this.isShow = false;
      this.isShow1 = false;
      this.isShow2 = false;
      this.isShow3 = false;
      this.selectname = false;
    },

    mouseoverClick(val) {
      this.realcur = this.cur;
      this.cur = val;
      this.closeCur = val;
    },
    mouseleaveClick(val) {
      if (!this.isClick) {
        this.cur = this.realcur;
      }
      this.isClick = false;
      this.closeCur = -1;
    },
    curClick(val) {
      this.cur = val;
      this.isClick = true;
    },

    //一键清空功能
    emptyClick() {
      this.valueData.forEach((item, index) => {
        item.name = "";
      });
    },

    //每一条数据单独清空
    valueDataEmpty(index) {
      this.valueData[index].name = "";
      if (index == 0) {
        let val = "";
        this.getNewCityList(val);
      }
    },

    //城市列表根据国家的改变而条件发生变化
    getNewCityList(val) {
      this.cityParams.country = val;
      this.getCityData();
    },

    // 查询
    handleSearch() {
      if (this.persionName != "") {
        if (this.sourceVal === "zh") {
          this.$router.push({
            path: "/domesticPersonnelInfor",
            query: { id: this.persionId },
          });
        }
        if (this.sourceVal === "en") {
          this.$router.push({
            path: "/PersonDetails",
            query: { id: this.persionId },
          });
        }
      } else if (this.valueData[2].name != "" && this.valueData[3].name == "") {
        if (this.isChinaOrg === "True") {
          this.$router.push({
            path: "/organizationZH",
            query: { id: this.orgId },
          });
        } else {
          this.$router.push({
            path: "/organizationEN",
            query: { id: this.orgId },
          });
        }
      } else {
        this.$router.push({
          name: "searchPage",
          query: {
            country: this.valueData[0].name,
            org: this.valueData[2].name,
            subject: this.valueData[3].name,
            city: this.valueData[1].name,
          },
        });
      }
    },

    // toSearchPage(){
    //   this.$router.push({name:'searchPage'})
    // },
  },
};
</script>
<style lang="less">
.page-login-toolTipClass {
  background-color: rgba(0, 0, 0, 0) !important;
  color: #bdc4cc;
  border: 1px solid rgba(0, 0, 0, 0) !important;
}
</style>
<style lang="less" scope>
@import "../../assets/css/common.less";
.ICA-integratedQuery {
  width: 100%;
  height: 100%;
  .integratedQuery-Hot-Search {
    height: 120px;
    /*overflow: hidden;*/
    display: flex;
    align-items: center;
    position: relative;
    label {
      color: #bdc4cc;
      font-size: 18px;
      margin-left: 60px;
      margin-right: 27px;
      /*float: left;*/
    }
    .spanDiv {
      color: #bdc4cc;
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100px;
      margin-right: 30px;
      /*display: block;*/
      text-align: center;
      cursor: pointer;
      position: relative;
    }

    span:hover {
      color: #fff;
    }
  }
  .integratedQuery-search-condition {
    /*overflow: hidden;*/
    position: relative;
    display: flex;
    /*align-items: center;*/
    .Empty {
      position: absolute;
      bottom: 150px;
      width: 100px;
      height: 25px;
      right: 70px;
      background: rgba(0, 0, 0, 0);

      color: #bdc4cc;
      font-size: 14px;
      // margin-right: 56px;
      /*overflow: hidden;*/
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
      float: left;
      text-align: center;
      cursor: pointer;
    }
    .tabs {
      width: 212px;
      margin-left: 60px;
      margin-right: 28px;
      /*float: left;*/
      ul {
        li {
          width: 100%;
          height: 36px;
          line-height: 30px;
          margin-bottom: 1px;
          background: rgba(132, 139, 150, 0.12);
          text-align: center;
          color: #000;
          cursor: pointer;
        }
        .bgActive {
          position: relative;
          background: rgba(171, 176, 182, 0.3);
          height: 212px;
          line-height: 212px;
          align-items: center;
        }
        li:last-child {
          margin-bottom: 0;
        }
      }
    }
    .conditionList {
      width: 480px;
      /*overflow: hidden;*/
      /*float: left;*/
      z-index: 999;
      ul {
        li {
          height: 64px;
          width: 100%;
          // background: rgba(132, 139, 150, 0.12);
          /*margin-bottom: 10px;*/
          .i-select {
            position: relative;
            width: 100%;
            height: 100%;
            // z-index: 999;
            /deep/ .el-input__inner {
              width: 100%;
              height: 100%;
              border: 0;
              outline: none;
              background: rgba(132, 139, 150, 0.12);
              text-align: center;
              color: #fdfdfd;
              font-size: 18px;
            }

            .i-ipt {
              /*cursor: pointer;*/
              width: 100%;
              height: 100%;
              border: 0;
              outline: none;
              background: rgba(132, 139, 150, 0.12);
              text-align: center;
              color: #fdfdfd;
              font-size: 20px;
              padding: 0 45px 0 20px;
            }
            i {
              position: absolute;
              right: 140px;
              top: 20px;
              font-size: 18px;
              color: #dadada;
              cursor: pointer;
            }
            .i-ipt::-webkit-input-placeholder {
              /* Chrome/Opera/Safari */
              color: #dadada;
              font-size: 20px;
              text-align: center;
            }
            ::-moz-placeholder {
              /* Firefox 19+ */
              color: #dadada;
              font-size: 18px;
              text-align: center;
            }
            :-ms-input-placeholder {
              /* IE 10+ */
              color: #dadada;
              font-size: 18px;
              text-align: center;
            }
            :-moz-placeholder {
              /* Firefox 18- */
              color: #dadada;
              font-size: 18px;
              text-align: center;
            }
            .select-list {
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
          }

          .rightLetterBox {
            position: relative;
            /*/deep/ */
            .inputDivBox {
              height: 65px;
              width: 98%;
              background: #c4c9cf;
              position: relative;
              z-index: 2000;
              .inputDiv {
                position: absolute !important;
                top: 20px;
                z-index: 1000;
                width: 350px;
                left: 70px;
                background: #c4c9cf;
                input {
                  width: 100%;
                  height: 40px;
                  background: #b3bac2;
                  color: #60666d;
                  text-indent: 5px;
                  outline-style: none;
                  outline-width: 0px;
                  border: none;
                  border-style: none;
                  text-shadow: none;
                  -webkit-appearance: none;
                  -webkit-user-select: text;
                  outline-color: transparent;
                  box-shadow: none;
                  font-size: 14px;
                }
                input::-webkit-input-placeholder {
                  /* WebKit browsers 适配谷歌 */
                  color: #60666d;
                }
                input:-moz-placeholder {
                  /* Mozilla Firefox 4 to 18 适配火狐 */
                  color: #60666d;
                }
                input::-moz-placeholder {
                  /* Mozilla Firefox 19+ 适配火狐 */
                  color: #60666d;
                }
                input:-ms-input-placeholder {
                  /* Internet Explorer 10+  适配ie*/
                  color: #60666d;
                }
              }
            }

            .rightLetter {
              position: absolute !important;
              right: 0px;
              top: 0px;
              width: 30px;
              height: 500px;
              background: #c6cbd1;
              z-index: 1000;
              display: flex;
              justify-content: center;
              /*align-items: center*/
              .divBox {
                width: 30px;
                margin-top: 110px;
                div {
                  width: 30px !important;
                  color: #fff;
                  z-index: 1000;
                  text-align: center;
                  line-height: 14px !important;
                  cursor: pointer;
                }
              }
            }
            .i-select-option {
              position: fixed;
              width: 480px;
              height: 500px;
              /*background: #c6cbd1;*/
              z-index: 999;
              overflow-y: auto;
              overflow-x: hidden;
              background-image: linear-gradient(#c9ced4, #c9ced4),
                linear-gradient(#ffffff, #ffffff);
              background-blend-mode: normal, normal;
              opacity: 0.96;
              .selectTitle {
                color: #777e86;
                font-size: 14px;
                width: 100%;
                text-indent: 74px;
                line-height: 36px;
                margin-top: 9px;
                margin-bottom: 4px;
              }
              ul {
                margin-bottom: 40px;
                li {
                  color: #3b3d41;
                  font-size: 18px;
                  height: 36px;
                  line-height: 36px;
                  padding-left: 74px;
                  cursor: pointer;
                }
                li:hover {
                  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#1e5799+0,b4bbc3+0,ffffff+100&1+1,0+100 */
                  background: -moz-linear-gradient(
                    left,
                    rgba(180, 187, 195, 1) 0%,
                    rgba(181, 188, 196, 1) 1%,
                    rgba(255, 255, 255, 0) 100%
                  ); /* FF3.6-15 */
                  background: -webkit-linear-gradient(
                    left,
                    rgba(180, 187, 195, 1) 0%,
                    rgba(181, 188, 196, 1) 1%,
                    rgba(255, 255, 255, 0) 100%
                  ); /* Chrome10-25,Safari5.1-6 */
                  background: linear-gradient(
                    to right,
                    rgba(180, 187, 195, 1) 0%,
                    rgba(181, 188, 196, 1) 1%,
                    rgba(255, 255, 255, 0) 100%
                  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#b4bbc3', endColorstr='#00ffffff',GradientType=1 ); /* IE6-9 */
                }
              }
            }
            .i-select-option::-webkit-scrollbar {
              width: 10px;
              height: 1px;
            }
            .i-select-option::-webkit-scrollbar-thumb {
              border-radius: 10px;
              box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
              background: #bbb;
            }
            .i-select-option::-webkit-scrollbar-track {
              box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
              border-radius: 10px;
              background: #ededed;
            }
          }
          .rightLetterBoxOrg {
            position: relative;
            /*/deep/ */
            .inputDivBox {
              height: 65px;
              width: 98%;
              background: #c4c9cf;
              position: relative;
              z-index: 2000;
              .inputDiv {
                position: absolute !important;
                top: 20px;
                z-index: 1000;
                width: 350px;
                left: 70px;
                background: #c4c9cf;
                input {
                  width: 100%;
                  height: 40px;
                  background: #b3bac2;
                  color: #60666d;
                  text-indent: 5px;
                  outline-style: none;
                  outline-width: 0px;
                  border: none;
                  border-style: none;
                  text-shadow: none;
                  -webkit-appearance: none;
                  -webkit-user-select: text;
                  outline-color: transparent;
                  box-shadow: none;
                  font-size: 14px;
                }
                input::-webkit-input-placeholder {
                  /* WebKit browsers 适配谷歌 */
                  color: #60666d;
                }
                input:-moz-placeholder {
                  /* Mozilla Firefox 4 to 18 适配火狐 */
                  color: #60666d;
                }
                input::-moz-placeholder {
                  /* Mozilla Firefox 19+ 适配火狐 */
                  color: #60666d;
                }
                input:-ms-input-placeholder {
                  /* Internet Explorer 10+  适配ie*/
                  color: #60666d;
                }
              }
            }

            .rightLetter {
              position: absolute !important;
              right: 0px;
              top: 0px;
              width: 30px;
              height: 500px;
              background: #c6cbd1;
              z-index: 1000;
              display: flex;
              justify-content: center;
              /*align-items: center*/
              .divBox {
                width: 30px;
                margin-top: 110px;
                div {
                  width: 30px !important;
                  color: #fff;
                  z-index: 1000;
                  text-align: center;
                  line-height: 14px !important;
                  cursor: pointer;
                }
              }
            }
            .i-select-option {
              position: fixed;
              width: 480px;
              height: 500px;
              /*background: #c6cbd1;*/
              z-index: 999;
              overflow-y: auto;
              overflow-x: hidden;
              background-image: linear-gradient(#c9ced4, #c9ced4),
                linear-gradient(#ffffff, #ffffff);
              background-blend-mode: normal, normal;
              opacity: 0.96;
              .selectTitle {
                color: #777e86;
                font-size: 14px;
                width: 100%;
                text-indent: 74px;
                line-height: 36px;
                margin-top: 9px;
                margin-bottom: 4px;
              }
              ul {
                margin-bottom: 40px;
                li {
                  color: #3b3d41;
                  font-size: 18px;
                  height: 72px;
                  /*line-height: 26px;*/
                  display: flex;
                  align-items: center;
                  padding-left: 74px;
                  cursor: pointer;
                }
                li:hover {
                  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#1e5799+0,b4bbc3+0,ffffff+100&1+1,0+100 */
                  background: -moz-linear-gradient(
                    left,
                    rgba(180, 187, 195, 1) 0%,
                    rgba(181, 188, 196, 1) 1%,
                    rgba(255, 255, 255, 0) 100%
                  ); /* FF3.6-15 */
                  background: -webkit-linear-gradient(
                    left,
                    rgba(180, 187, 195, 1) 0%,
                    rgba(181, 188, 196, 1) 1%,
                    rgba(255, 255, 255, 0) 100%
                  ); /* Chrome10-25,Safari5.1-6 */
                  background: linear-gradient(
                    to right,
                    rgba(180, 187, 195, 1) 0%,
                    rgba(181, 188, 196, 1) 1%,
                    rgba(255, 255, 255, 0) 100%
                  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#b4bbc3', endColorstr='#00ffffff',GradientType=1 ); /* IE6-9 */
                }
              }
            }
            .i-select-option::-webkit-scrollbar {
              width: 10px;
              height: 1px;
            }
            .i-select-option::-webkit-scrollbar-thumb {
              border-radius: 10px;
              box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
              background: #bbb;
            }
            .i-select-option::-webkit-scrollbar-track {
              box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
              border-radius: 10px;
              background: #ededed;
            }
          }
        }
      }

      .active {
        position: relative;
        background: rgba(171, 176, 182, 0.3);
      }
    }
    .SelectedStatus {
      width: 60px;
      /*float: left;*/
      margin-right: 30px;
      ul {
        li {
          width: 100%;
          height: 64px;
          line-height: 64px;
          margin-bottom: 10px;
          text-align: center;
        }
      }
    }
    .searchBTN {
      width: 60px;
      height: 60px;
      margin-top: 150px;
      position: relative;
      .crossBg1 {
        position: absolute;
        left: -30px;
        width: 120px;
        height: 60px;
        background: #fff;
        opacity: 0.12;
        z-index: -10;
      }
      .crossBg2 {
        position: absolute;
        top: -30px;
        width: 60px;
        height: 120px;
        background: #fff;
        opacity: 0.12;
        z-index: -10;
        i {
          font-size: 40px;
          color: #ed2424;
        }
      }
      .cross {
        opacity: 0.12;
        .crossBg {
          background: #fff;
          height: 120px;
          position: absolute;
          width: 60px;
          i {
            font-size: 40px;
            color: #ed2424;
          }
        }
        .crossBg::after {
          background: #fff;
          content: "";
          height: 60px;
          left: -30px;
          position: absolute;
          top: 30px;
          width: 120px;
        }
      }
      .searchImg {
        /*margin-top: 30px;*/
        z-index: 1000;
        width: 60px;
        height: 60px;
        cursor: pointer;
        img {
          width: 60px;
          height: 60px;
        }
      }
    }
  }
  .showBg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    opacity: 0;
    z-index: 990;
  }
}
</style>
