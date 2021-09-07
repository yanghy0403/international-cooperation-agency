<template>
  <div class="ICA-application">
    <div class="assistant assistant-logoIcon">
      <ul>
        <li v-show="cur== null">
          <img src="../../assets/images/应用助手/图标区默认图标.png" alt />
        </li>
        <li v-show="cur==0" :class="{bgs:cur==0}">
          <div class="corners">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
          <img src="../../assets/images/应用助手/国际合作态势简报符号.png" alt />
        </li>
        <li v-show="cur==1" :class="{bgs:cur==1}">
          <div class="corners">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
          <img src="../../assets/images/应用助手/机构合作数据摘要.png" alt />
        </li>
        <li v-show="cur==2" :class="{bgs:cur==2}">
          <div class="corners">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
          <img src="../../assets/images/应用助手/年度国际合作统计.png" alt />
        </li>
        <li v-show="cur==3" :class="{bgs:cur==3}">
          <div class="corners">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
          <img src="../../assets/images/应用助手/国际合作统计年鉴.png" alt />
        </li>
        <li v-show="cur==4" :class="{bgs:cur==4}">
          <div class="corners">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
          <img src="../../assets/images/应用助手/统计公报.png" alt />
        </li>
      </ul>
    </div>
    <div class="assistant-select">
      <ul>
        <li :class="{bgs:cur==0}" @mouseenter="mouseoverClick(0)" @mouseleave="mouseleaveClick(0)">
          <span>国际合作态势简报</span>
          <input @click="curClick(0)" id="item1" type="radio" name="test" value="item1" />
          <label for="item1"></label>
        </li>
        <li :class="{bgs:cur==1}" @mouseenter="mouseoverClick(1)" @mouseleave="mouseleaveClick(1)">
          <span>机构合作数据摘要</span>
          <input @click="curClick(1)" id="item2" type="radio" name="test" value="item2" />
          <label for="item2"></label>
        </li>
        <li :class="{bgs:cur==2}" @mouseenter="mouseoverClick(2)" @mouseleave="mouseleaveClick(2)">
          <span>国际合作统计手册</span>
          <input @click="curClick(2)" id="item3" type="radio" name="test" value="item3" />
          <label for="item3"></label>
        </li>
        <li :class="{bgs:cur==3}" @mouseenter="mouseoverClick(3)" @mouseleave="mouseleaveClick(3)">
          <span>国际合作统计年鉴</span>
          <input @click="curClick(3)" id="item4" type="radio" name="test" value="item4" />
          <label for="item4"></label>
        </li>
        <li :class="{bgs:cur==4}" @mouseenter="mouseoverClick(4)" @mouseleave="mouseleaveClick(4)">
          <span>国际合作统计公报</span>
          <input @click="curClick(4)" id="item5" type="radio" name="test" value="item5" />
          <label for="item5"></label>
        </li>
      </ul>
    </div>
    <div class="assistant countryName">
      <ul>
        <li v-show="cur==0||cur==null">
          <div class="i-select" @click="handleSelectDwon">
            <input v-model="value" class="i-ipt" type="text" readonly="readonly" placeholder="选择国家" />
            <i class="el-icon-caret-bottom"></i>
            <!-- <i class="el-icon-error"></i> -->
          </div>
          <div class="rightLetterBox" v-show="isShow">
            <div class="i-select-option newScrollbar">
              <div style="height: 45px;width: 100%;"></div>
              <div class="selectTitle" style>全部国家</div>
              <ul>
                <li
                  @click.stop="handleValue(item)"
                  v-for="(item,i) in countryData"
                  :key="i"
                >{{item}}</li>
              </ul>
            </div>
            <!--<div class="rightLetter">-->
            <!--<div class="divBox">-->
            <!--<div v-for="(item,index) in letterWorld" :key="index">{{item}}</div>-->
            <!--</div>-->
            <!--</div>-->
            <div class="inputDivBox">
              <div class="inputDiv">
                <input placeholder="请输入国家 / country" type="text" v-model="countryValue" />
              </div>
            </div>
          </div>

          <!--<div class="i-select-option" v-show="isShow">-->
          <!--<label>热门国家</label>-->
          <!--<ul>-->
          <!--<li-->
          <!--@click="handleValue(item)"-->
          <!--v-for="(item,i) in countrys[0].populars"-->
          <!--:key="i"-->
          <!--&gt;{{item.label}}</li>-->
          <!--</ul>-->
          <!--<label>全部国家</label>-->
          <!--<ul>-->
          <!--<li-->
          <!--@click="handleValue(item)"-->
          <!--v-for="(item,i) in countrys[1].allOptions"-->
          <!--:key="i"-->
          <!--&gt;{{item.label}}</li>-->
          <!--</ul>-->
          <!--</div>-->
        </li>
        <li v-show="cur==1">
          <div class="i-select" @click="handleSelectDwon1">
            <input
              v-model="value1"
              class="i-ipt"
              type="text"
              readonly="readonly"
              placeholder="选择机构"
            />
            <i class="el-icon-caret-bottom"></i>
          </div>
          <div class="i-select-option" v-show="isShow1">
            <ul>
              <li @click="handleValue1(item)" v-for="(item,i) in orgData" :key="i">{{item.label}}</li>
            </ul>
          </div>
        </li>
        <li v-show="cur==2">
          <div class="i-select" @click="handleSelectDwon2">
            <input
              v-model="value2"
              class="i-ipt"
              type="text"
              readonly="readonly"
              placeholder="选择年份"
            />
            <i class="el-icon-caret-bottom"></i>
          </div>
          <div class="i-select-option" v-show="isShow2">
            <ul>
              <li @click="handleValue2(item)" v-for="(item,i) in years" :key="i">{{item.value}}</li>
            </ul>
          </div>
        </li>
        <li v-show="cur==3">
          <div class="i-select" @click="handleSelectDwon3">
            <input
              v-model="value3"
              class="i-ipt"
              type="text"
              readonly="readonly"
              placeholder="选择年份"
            />
            <i class="el-icon-caret-bottom"></i>
          </div>
          <div class="i-select-option" v-show="isShow3">
            <ul>
              <li @click="handleValue3(item)" v-for="(item,i) in years2" :key="i">{{item.value}}</li>
            </ul>
          </div>
        </li>
        <li v-show="cur==4">
          <div class="i-select" @click="handleSelectDwon4">
            <input
              v-model="value4"
              class="i-ipt"
              type="text"
              readonly="readonly"
              placeholder="选择年份"
            />
            <i class="el-icon-caret-bottom"></i>
          </div>
          <div class="i-select-option" v-show="isShow4">
            <ul>
              <li @click="handleValue4(item)" v-for="(item,i) in years2" :key="i">{{item.value}}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="searchBTN" @click="handleAppAsstSearch">
      <div class="cross">
        <div class="crossBg"></div>
      </div>
      <div class="searchImg">
        <img
          v-if="value =='' && value1 =='' && value2 ==''&& value3 == ''&& value4 == ''"
          src="../../assets/images/综合查询/搜索按钮-默认状态.png"
          alt
        />
        <img v-else src="../../assets/images/综合查询/搜索按钮-选中状态.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countryValue: "",
      orgId: "",
      countryData: [],
      cur: null,
      realcur: null,
      isClick: false,
      isShow: false,
      isShow1: false,
      isShow2: false,
      isShow3: false,
      isShow4: false,
      value: "",
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      countrys: [
        {
          populars: [
            {
              label: "美国",
            },
            {
              label: "俄罗斯",
            },
            {
              label: "哈萨克斯坦",
            },
          ],
        },
        {
          allOptions: [
            {
              value: "aerbaniya",
              label: "阿尔巴尼亚",
            },
            {
              value: "agenting",
              label: "阿根廷",
            },
            {
              value: "alblianheqiuzhangguo",
              label: "阿拉伯联合酋长国",
            },
            {
              value: "aisaiebiya",
              label: "埃塞俄比亚",
            },
            {
              value: "antiguahebabuda",
              label: "安提瓜岛和巴布达",
            },
          ],
        },
      ],
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
      years: [
        {
          value: "2010",
        },
        {
          value: "2011",
        },
        {
          value: "2012",
        },
        {
          value: "2013",
        },
        {
          value: "2014",
        },
        {
          value: "2015",
        },
        {
          value: "2016",
        },
        {
          value: "2017",
        },
        {
          value: "2018",
        },
        {
          value: "2019",
        },
        {
          value: "2020",
        },
      ],
      years2: [
        {
          value: "2010",
        },
        {
          value: "2011",
        },
        {
          value: "2012",
        },
        {
          value: "2013",
        },
        {
          value: "2014",
        },
        {
          value: "2015",
        },
        {
          value: "2016",
        },
        {
          value: "2017",
        },
        {
          value: "2018",
        },
        {
          value: "2019",
        },
        {
          value: "2020",
        },
      ],
      changed: true,
      orgData: [],
    };
  },
  watch: {
    countryValue(newval, oldval) {
      this.getCountryData();
    },
  },
  mounted() {
    this.getCountryData();
    this.handleOrg();
  },
  methods: {
    // 国家搜索列表
    getCountryData() {
      let params =
        "city=" +
        "&continent=" +
        "&countrySimpleZhName=" +
        this.countryValue +
        "&source=";
      this.axios.get(`/index/country/autoTip?${params}`).then((res) => {
        if (res.data.code == 200) {
          this.countryData = res.data.data.name;
        }
      });
    },
    handleOrg() {
      this.axios.get("/index/org/autoTipDetail").then(res => {
        // console.log(res)
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

    handleSelectDwon() {
      if (this.isShow == false) {
        this.isShow = true;
        this.isShow1 = false;
        this.isShow2 = false;
        this.isShow3 = false;
        this.isShow4 = false;
      } else {
        this.isShow = false;
        this.isShow1 = false;
        this.isShow2 = false;
        this.isShow3 = false;
        this.isShow4 = false;
      }
    },
    handleValue(val) {
      this.value = val;
      this.isShow = false;
    },
    handleSelectDwon1() {
      if (this.isShow1 == false) {
        this.isShow = false;
        this.isShow1 = true;
        this.isShow2 = false;
        this.isShow3 = false;
        this.isShow4 = false;
      } else {
        this.isShow = false;
        this.isShow1 = false;
        this.isShow2 = false;
        this.isShow3 = false;
        this.isShow4 = false;
      }
    },
    handleValue1(val) {
      this.value1 = val.name;
      this.orgId = val.orgId
      this.isShow1 = false;
    },
    handleSelectDwon2() {
      if (this.isShow2 == false) {
        this.isShow = false;
        this.isShow1 = false;
        this.isShow2 = true;
        this.isShow3 = false;
        this.isShow4 = false;
      } else {
        this.isShow = false;
        this.isShow1 = false;
        this.isShow2 = false;
        this.isShow3 = false;
        this.isShow4 = false;
      }
    },
    handleValue2(val) {
      this.value2 = val.value;
      this.isShow2 = false;
    },
    handleSelectDwon3() {
      if (this.isShow3 == false) {
        this.isShow = false;
        this.isShow1 = false;
        this.isShow2 = false;
        this.isShow3 = true;
        this.isShow4 = false;
      } else {
        this.isShow = false;
        this.isShow1 = false;
        this.isShow2 = false;
        this.isShow3 = false;
        this.isShow4 = false;
      }
    },
    handleSelectDwon4() {
      if (this.isShow4 == false) {
        this.isShow = false;
        this.isShow1 = false;
        this.isShow2 = false;
        this.isShow3 = false;
        this.isShow4 = true;
      } else {
        this.isShow = false;
        this.isShow1 = false;
        this.isShow2 = false;
        this.isShow3 = false;
        this.isShow4 = false;
      }
    },
    handleValue3(val) {
      this.value3 = val.value;
      this.isShow3 = false;
    },
    handleValue4(val) {
      this.value4 = val.value;
      this.isShow4 = false;
    },

    mouseoverClick(val) {
      this.realcur = this.cur;
      this.cur = val;
    },
    mouseleaveClick(val) {
      if (!this.isClick) {
        this.cur = this.realcur;
      }
      this.isClick = false;
    },
    curClick(val) {
      this.cur = val;
      this.isClick = true;
    },
    handleAppAsstSearch() {
      // console.log(this.cur)
      var cur = this.cur;
      switch (cur) {
        case 0:
          if (this.value != "") {
            this.$router.push({ path: '/briefing', query: {country:this.value} });;
          }
          break;
        case 1:
          if (this.value1 != "") {
            this.$router.push({ path: '/summary',query: {orgName:this.value1} });
          }
          break;
        case 2:
          this.$router.push("/statistics");
          break;
        case 3:
          if (this.value3 != "") {
            sessionStorage.setItem("yearbook",this.value3)
            this.$router.push("/yearbook");
          }
          break;
        case 4:
          if(this.value4 != "") {
            sessionStorage.setItem("bulletin",this.value4)
            this.$router.push("/bulletin")
          }
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/common.less";
.ICA-application {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  .assistant {
    height: 375px;
    // background: rgba(132, 139, 150, 0.12);
  }
  .assistant-logoIcon {
    position: relative;
    width: 180px;
    align-items: center;
    margin-left: 60px;
    display: flex;
    align-items: center;
    ul {
      width: 100%;
      height: 100%;
      li {
        text-align: center;
        line-height: 375px;
        width: 100%;
        height: 100%;
        background: rgba(132, 139, 150, 0.12);
        img {
          width: 65px;
          height: 65px;
        }
      }
      .bgs {
        background: rgba(171, 176, 182, 0.3) !important;
      }
    }
  }
  .assistant-select {
    margin-left: 6px;
    ul {
      li {
        position: relative;
        // line-height: 30px;
        width: 294px;
        height: 70px;
        background: rgba(132, 139, 150, 0.12);
        margin-bottom: 7px;
        color: #fff;
        font-size: 18px;
        text-align: center;
        line-height: 70px;
        input[type="radio"] {
          width: 40px;
          height: 40px;
          opacity: 0;
        }
        label {
          position: absolute;
          right: 40px;
          top: 20px;
          width: 30px;
          height: 30px;
          border: 3px solid #999;
        }
        input:checked + label {
          // background-color: #fff;
          border: 3px solid #fff;
        }

        input:checked + label::after {
          position: absolute;
          content: "";
          width: 10px;
          height: 15px;
          top: 2px;
          left: 8px;
          border: 3px solid #ed2424;
          border-top: none;
          border-left: none;
          transform: rotate(45deg);
        }
      }
      .bgs {
        background: rgba(171, 176, 182, 0.3) !important;
      }
      li:last-child {
        margin-bottom: 0;
      }
    }
  }
  .countryName {
    width: 259px;
    height: 60px;
    margin-left: 19px;
    ul {
      li {
        width: 100%;
        height: 60px;
        .i-select {
          position: relative;
          width: 100%;
          height: 100%;
          .i-ipt {
            cursor: pointer;
            width: 100%;
            height: 100%;
            border: 0;
            outline: none;
            background: rgba(132, 139, 150, 0.12);
            text-align: center;
            color: #fdfdfd;
            font-size: 18px;
          }
          i {
            position: absolute;
            right: 30px;
            top: 20px;
            font-size: 18px;
            color: #dadada;
          }
          .i-ipt::-webkit-input-placeholder {
            /* Chrome/Opera/Safari */
            color: #dadada;
            font-size: 18px;
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
        }
        .rightLetterBox {
          position: relative;
          .inputDivBox {
            height: 45px;
            width: 90%;
            background: #c4c9cf;
            position: relative;
            z-index: 2000;
            .inputDiv {
              position: absolute !important;
              top: 15px;
              z-index: 1000;
              width: 200px;
              height: 30px;
              left: 20px;
              background: #c4c9cf;
              input {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 30px;
                margin: 0;
                padding: 0;
                line-height: 30px;
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
                font-size: 12px;
              }
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
            width: 259px;
            max-height: 300px;
            /*background: #c6cbd1;*/
            z-index: 99;
            overflow-y: auto;
            overflow-x: hidden;
            background-image: linear-gradient(#c9ced4, #c9ced4),
              linear-gradient(#ffffff, #ffffff);
            background-blend-mode: normal, normal;
            opacity: 0.96;
            .selectTitle {
              text-indent: 24px;
              color: #777e86;
              font-size: 14px;
              width: 100%;
              line-height: 36px;
              margin-top: 9px;
              margin-bottom: 4px;
            }
            ul {

              li {
                color: #3b3d41;
                font-size: 18px;
                height: px;
                // line-height: 36px;
                padding-left: 24px;
                display: flex;
                align-items: center;
                cursor: pointer;
              }
              li:hover {
                /*background: #b4bbc3;*/
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

        .i-select-option {
          position: fixed;
          width: 259px;
          max-height: 300px;
          background: #c6cbd1;
          z-index: 99;
          overflow-y: auto;
          overflow-x: hidden;
          label {
            color: #777e86;
            font-size: 14px;
            margin-left: 20px;
          }
          ul {
            li {
              display: flex;
              color: #3b3d41;
              font-size: 14px;
              height: 80px;
              padding-left: 24px;
              cursor: pointer;
              align-items: center;
            }
            li:hover {
              background: rgb(30, 87, 153); /* Old browsers */
              background: -moz-linear-gradient(
                left,
                rgb(30, 87, 153) 0%,
                rgb(180, 187, 195) 0%,
                rgb(255, 255, 255) 100%
              ); /* FF3.6-15 */
              background: -webkit-linear-gradient(
                left,
                rgb(30, 87, 153) 0%,
                rgb(180, 187, 195) 0%,
                rgb(255, 255, 255) 100%
              ); /* Chrome10-25,Safari5.1-6 */
              background: linear-gradient(
                to right,
                rgb(30, 87, 153) 0%,
                rgb(180, 187, 195) 0%,
                rgb(255, 255, 255) 100%
              ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
              filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1e5799', endColorstr='#ffffff',GradientType=1 ); /* IE6-9 */
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
  .searchBTN {
    // float: left;
    overflow: hidden;
    height: 100%;
    margin-top: 420px;
    margin-left: 51px;
    .cross {
      opacity: 0.12;
      .crossBg {
        background: #fff;
        height: 120px;
        position: absolute;
        width: 60px;
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
      margin-top: 30px;
      img {
        width: 60px;
        height: 60px;
      }
    }
  }
}
</style>
