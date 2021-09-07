<template>
  <div class="main">
    <div class="bg"></div>
    <div class="gridBox">
      <div class="dotBox">
        <div class="bagItem" v-for="(item, index) in 128" :key="index">
          <img :src="imgCenter" alt />
        </div>
        <div class="a"></div>
        <div class="b"></div>
        <div class="c"></div>
        <div class="d"></div>
      </div>
      <div class="ICA-home">
        <!-- 头部 -->
        <header class="ICA-header">
          <div class="ICA-logo">
            <img src="../assets/images/固定图标/logo.png" alt />
            <div class="logoName">
              <p>中国科学院国际合作</p>
              <p>数据汇交与分析平台</p>
            </div>
          </div>
          <div class="ICA-login" v-if="userName != ''">
            <img src="../assets/images/固定图标/用户按钮-默认状态.png" alt />
            <p>{{ userName }}</p>
            <!-- <p @click="handlezhuxiao">注销</p> -->
            <div class="hoverDiv">
              <ul>
                <li @click="personalCenter(0)">个人中心</li>
                <li @click="personalCenter(1)">注销</li>
              </ul>
            </div>
          </div>
          <div class="ICA-login" @click.stop="handleLogin" v-else>
            <img src="../assets/images/固定图标/用户按钮-默认状态.png" alt />
            <p>登&nbsp;&nbsp;&nbsp;&nbsp;录</p>
          </div>
        </header>
        <!-- 中间部分 -->
        <div class="ICA-a-search">
          <div class="ICA-search-fl">
            <img src="../assets/images/背景/导航标尺.png" alt />
            <ul>
              <li @click="cur = 0" :class="{ active: cur == 0 }">综合查询</li>
              <li @click="cur = 1" :class="{ active: cur == 1 }">应用助手</li>
              <li @click="cur = 2" :class="{ active: cur == 2 }">决策支撑</li>
              <li @click="cur = 3" :class="{ active: cur == 3 }">管理审计</li>
            </ul>
          </div>
          <div class="ICA-search-center">
            <div class="content" v-show="cur == 0">
              <IntegratedQuery />
            </div>
            <div class="content" v-show="cur == 1">
              <ApplicationAssistant />
            </div>
            <div class="content" v-show="cur == 2">
              <DecisionSupport />
            </div>
            <div class="content" v-show="cur == 3">
              <AuditManagement />
            </div>
          </div>
          <div class="ICA-search-fr">
            <ul>
              <li @click="curFr = 0" :class="{ activeFr: curFr == 0 }">
                <div class="fr-l">
                  <!-- <p>2,103,030</p> -->
                  <count-to
                    :start-val="0"
                    :end-val="multiCount.communication"
                    useEasing="true"
                    :duration="5000"
                    class="numSize"
                  ></count-to>
                  <p>
                    <span>
                      {{ multiCount.communicationCompare }}
                      <!--<img v-if="Number(multiCount.communicationCompare) >= 0" src="../assets/images/固定图标/网站动态数据指示箭头-上升.png" alt />
                      <img v-else src="../assets/images/固定图标/网站动态数据指示箭头-下降.png" alt="">{{multiCount.communicationCompare == 'null'?0:multiCount.communicationCompare}}-->
                    </span>
                    <!--<span>较上年</span>-->
                  </p>
                </div>
                <div class="fr-r" @click="toExchange">
                  <p>人&nbsp;员</p>
                  <p>交&nbsp;流</p>
                </div>
              </li>
              <li @click="curFr = 1" :class="{ activeFr: curFr == 1 }">
                <div class="fr-l">
                  <count-to
                    :start-val="0"
                    :end-val="multiCount.project"
                    useEasing="true"
                    :duration="5000"
                    class="numSize"
                  ></count-to>
                  <p>
                    <span>
                      {{ multiCount.projectCompare }}
                      <!--<img v-if="Number(multiCount.projectCompare) >= 0" src="../assets/images/固定图标/网站动态数据指示箭头-上升.png" alt />
                      <img v-else src="../assets/images/固定图标/网站动态数据指示箭头-下降.png" alt="">{{multiCount.projectCompare == 'null'?0:multiCount.projectCompare}}-->
                    </span>
                    <!--<span>较上年</span>-->
                  </p>
                </div>
                <div class="fr-r" @click="toProject">
                  <p>合&nbsp;作</p>
                  <p>项&nbsp;目</p>
                </div>
              </li>
              <li @click="curFr = 2" :class="{ activeFr: curFr == 2 }">
                <div class="fr-l">
                  <count-to
                    :start-val="0"
                    :end-val="multiCount.talent"
                    useEasing="true"
                    :duration="5000"
                    class="numSize"
                  ></count-to>
                  <p>
                    <span>
                      {{ multiCount.talentCompare }}
                      <!--<img v-if="Number(multiCount.talentCompare) >= 0" src="../assets/images/固定图标/网站动态数据指示箭头-上升.png" alt />
                      <img v-else src="../assets/images/固定图标/网站动态数据指示箭头-下降.png" alt="">{{multiCount.talentCompare == 'null'?0:multiCount.talentCompare}}-->
                    </span>
                    <!--<span>较上年</span>-->
                  </p>
                </div>
                <div class="fr-r" @click="handleInternationalTalents">
                  <p>国&nbsp;际</p>
                  <p>人&nbsp;才</p>
                </div>
              </li>
              <li @click="curFr = 3" :class="{ activeFr: curFr == 3 }">
                <div class="fr-l">
                  <count-to
                    :start-val="0"
                    :end-val="multiCount.paper"
                    useEasing="true"
                    :duration="5000"
                    class="numSize"
                  ></count-to>
                  <p>
                    <span>
                      {{ multiCount.paperCompare }}
                      <!--<img v-if="Number(multiCount.paperCompare) >= 0" src="../assets/images/固定图标/网站动态数据指示箭头-上升.png" alt />
                      <img v-else src="../assets/images/固定图标/网站动态数据指示箭头-下降.png" alt=""> {{multiCount.paperCompare=='null'?0:multiCount.paperCompare}}-->
                    </span>
                    <!--<span>较上年</span>-->
                  </p>
                </div>
                <div class="fr-r" @click="toPaper">
                  <p>合&nbsp;作</p>
                  <p>论&nbsp;文</p>
                </div>
              </li>
              <li @click="curFr = 4" :class="{ activeFr: curFr == 4 }">
                <div class="fr-l">
                  <count-to
                    :start-val="0"
                    :end-val="multiCount.partnerOrg"
                    useEasing="true"
                    :duration="5000"
                    class="numSize"
                  ></count-to>
                  <p>
                    <span>
                      {{ multiCount.partnerOrgCompare }}
                      <!--<img v-if="Number(multiCount.partnerOrgCompare) >= 0" src="../assets/images/固定图标/网站动态数据指示箭头-上升.png" alt />
                      <img v-else src="../assets/images/固定图标/网站动态数据指示箭头-下降.png" alt="">{{multiCount.partnerOrgCompare=='null'?0:multiCount.partnerOrgCompare}}-->
                    </span>
                    <!--<span>较上年</span>-->
                  </p>
                </div>
                <div class="fr-r" @click="toPartnerAgencies">
                  <p>伙&nbsp;伴</p>
                  <p>机&nbsp;构</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 底部 -->
        <footer class="ICA-footer">
          <div class="ICA-footer-fl">
            <!--<img @click="systemManagement" src="../assets/images/固定图标/事业单位标志.png" alt />-->
            <p>中国科学院国际合作局 版权所有</p>
            <p>技术支持：中国科学院计算机网络信息中心</p>
            <!--<p>备案号：京ICP备xxxxxx</p>-->
          </div>
          <div class="ICA-footer-fr">
            <!--<div class="featuresBg">-->
            <!--&lt;!&ndash; <img src="../assets/images/固定图标/联系方式-默认状态.png" alt /> &ndash;&gt;-->
            <!--<i class="iconfont icon-erweima"></i>-->
            <!--</div>-->
            <div class="featuresBg">
              <!-- <img style="width: 9px;height: 21px" src="../assets/images/固定图标/帮助-默认状态.png" alt /> -->
              <i class="iconfont icon-icon"></i>
            </div>
            <!--<div class="featuresBg">-->
            <!--&lt;!&ndash; <img src="../assets/images/固定图标/分享-默认状态.png" alt /> &ndash;&gt;-->
            <!--<i class="iconfont icon-fenxiang"></i>-->
            <!--</div>-->
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import IntegratedQuery from "./tabs/IntegratedQuery";
import ApplicationAssistant from "./tabs/ApplicationAssistant";
import DecisionSupport from "./tabs/DecisionSupport";
import AuditManagement from "./tabs/AuditManagement";
import countTo from "vue-count-to";

export default {
  components: {
    IntegratedQuery,
    ApplicationAssistant,
    DecisionSupport,
    AuditManagement,
    countTo,
  },
  data() {
    return {
      cur: 0,
      curFr: null,
      imgCenter: require("../assets/images/背景/大点阵-单个点.png"),
      multiCount: [],
      userName: "",
      code: "",
    };
  },
  mounted() {
    let token = document.cookie;

    if (token.indexOf("bic_api") == 0) {
      let tokenArr = token.split("|");
      this.userName = tokenArr[0].split("=")[1];
      this.code = tokenArr[1];
    }
    this.handleMultiCount();
  },
  methods: {
    handleInternationalTalents() {
      this.$router.push({ path: "/topicIndex" });
    },
    toPaper() {
      this.$router.push({ path: "/analysis" });
    },
    toExchange() {
      this.$router.push({ path: "/importVisit" });
    },
    toProject() {
      this.$router.push({ path: "/partner" });
    },

    // 系统管理零时跳转
    systemManagement() {
      this.$router.push({ path: "/authority-management" });
    },
    /**
     * @author: jingyh
     * @description: 跳转伙伴机构
     * @param {type}
     */
    toPartnerAgencies() {
      this.$router.push({ path: "/PartnerAgencies" });
    },
    // 右侧数量
    handleMultiCount() {
      this.axios.get("/index/static").then((res) => {
        if (res.data.code == 200) {
          this.multiCount = res.data.data;
        }
      });
    },

    // 登录
    handleLogin() {
      window.location.href = "http://10.0.0.26:8088/user/login";
    },
    // 注销
    personalCenter(val) {
      if(val ==0) {
        this.$router.push({ path: "/favorites" });
      }else {
        window.location.href =
        "http://10.0.0.26:8088/user/loginDelete?umtId=" + this.code;
      }
      
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/css/common.less";

.main {
  .bg {
    background: url("../assets/images/背景/背景大图.jpg") no-repeat;
    background-size: cover;
    position: fixed;
    width: 100%;
    height: 100%;
    animation-name: scaleDraw; /*关键帧名称*/
    animation-timing-function: ease-in-out; /*动画的速度曲线*/
    animation-iteration-count: infinite; /*动画播放的次数*/
    animation-duration: 100s; /*动画所花费的时间*/
    @keyframes scaleDraw {
      0% {
        transform: scale(1); /*开始为原始大小*/
      }
      50% {
        transform: scale(2); /*开始为原始大小*/
      }
      100% {
        transform: scale(1); /*开始为原始大小*/
      }
    }
  }

  .gridBox {
    width: 100%;
    height: 100%;
    position: fixed;
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.05) 1px,
        transparent 0
      ),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 0);
    background-size: 60px 60px;
  }

  .dotBox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-warp: warp;
    -ms-flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    align-content: flex-start;

    .bagItem {
      width: 120px;
      height: 120px;
      z-index: -10;
      display: flex;
      justify-content: center;
      align-items: center;
      float: left;

      img {
        width: 3px;
        height: 3px;
      }
    }

    animation: twinkling 3s infinite ease-in-out;
    animation-fill-mode: both;
    @keyframes twinkling {
      0% {
        opacity: 0.3;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0.3;
      }
    }

    .a {
      background: #6d7581;
      height: 15px;
      position: absolute;
      left: 59px;
      top: 173px;
      width: 3px;
    }

    .a:after {
      background: #6d7581;
      content: "";
      height: 3px;
      left: -6px;
      position: absolute;
      top: 6px;
      width: 15px;
    }

    .b {
      background: #6d7581;
      height: 15px;
      position: absolute;
      left: 59px;
      top: 713px;
      width: 3px;
    }

    .b:after {
      background: #6d7581;
      content: "";
      height: 3px;
      left: -6px;
      position: absolute;
      top: 6px;
      width: 15px;
    }

    .c {
      background: #6d7581;
      height: 15px;
      position: absolute;
      right: 57px;
      top: 114px;
      width: 3px;
    }

    .c:after {
      background: #6d7581;
      content: "";
      height: 3px;
      right: -6px;
      position: absolute;
      top: 6px;
      width: 15px;
    }

    .d {
      background: #6d7581;
      height: 15px;
      position: absolute;
      right: 57px;
      width: 3px;
      top: 773px;
    }

    .d:after {
      background: #6d7581;
      content: "";
      height: 3px;
      right: -6px;
      position: absolute;
      top: 6px;
      width: 15px;
    }
  }

  .ICA-home {
    width: 96%;
    height: 92%;
    margin: auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%); /* 元素往下位移自身高度50%的距离 */
    // 头部
    .ICA-header {
      height: 70px;

      .ICA-logo {
        float: left;
        height: 100%;

        img {
          width: 70px;
          height: 70px;
        }

        .logoName {
          float: right;
          margin-left: 10px;
          margin-top: 4px;
          line-height: 70px;

          p {
            color: #fff;
            font-size: 24px;
            line-height: 30px;
          }
        }
      }

      .ICA-login {
        float: right;
        width: 100px;
        height: 100%;
        text-align: center;
        cursor: pointer;
        // margin-right: 60px;
        img {
          width: 24px;
          height: 29px;
          margin-top: 6px;
        }

        p {
          width: 100%;
          color: #fff;
          font-size: 14px;
          margin-top: 12px;
        }

        .hoverDiv {
          width: 100px;
          background: #fff;
          display: none;
          ul {
            li {
              height: 38px;
              line-height: 38px;
              color: #000;
              font-size: 14px;
              &:hover {
                background: #ddd;
              }
            }
          }
        }

        &:hover > .hoverDiv {
          display: block;
        }
      }
    }

    // 中间部分
    .ICA-a-search {
      width: 100%;
      height: 540px;
      margin-top: 74px;
      /*overflow: hidden;*/
      // border: 1px solid #fff;
      .ICA-search-fl {
        float: left;
        width: 382px;
        height: 100%;
        display: flex;
        align-items: center;

        img {
          float: left;
          width: 9px;
          // height: 204px;
          margin-left: 22px;
          align-items: center;
        }

        ul {
          li {
            font-size: 35px;
            line-height: 100px;
            color: #fff;
            cursor: pointer;
            margin-left: 55px;
          }

          .active {
            font-size: 46px;
            color: #ff3a25;
            position: relative;
          }

          .active:before {
            content: "";
            display: -webkit-box;
            display: -ms-flexbox;
            display: inline-block;
            height: 3px;
            width: 20px;
            position: absolute;
            background: #ff3a25;
            top: 49px;
            left: -45px;
          }
        }
      }

      .ICA-search-center {
        width: 1020px;
        height: 100%;
        /*overflow: hidden;*/
        float: left;
        background: rgba(255, 255, 255, 0.05);
        // margin-left: 20px;
        .content {
          width: 100%;
          height: 100%;
        }
      }

      .ICA-search-fr {
        height: 100%;
        float: right;
        margin-right: 21px;

        ul {
          li {
            height: 60px;
            margin-bottom: 60px;
            cursor: pointer;

            .fr-l {
              float: left;
              margin-right: 9px;

              .numSize {
                display: block;
                width: 240px;
                color: #fff;
                font-size: 25px;
                text-align: right;
                line-height: 30px;
                height: 30px;
              }

              p {
                width: 240px;
                text-align: right;
                line-height: 30px;
                height: 30px;

                span {
                  font-size: 14px;
                }

                span:last-child {
                  color: #bdc4cc;
                }

                span:first-child {
                  //color: #37ccc0;
                  margin-right: 5px;

                  img {
                    width: 8px;
                    height: 12px;
                    margin-right: 5px;
                    margin-bottom: 5px;
                  }
                }
              }
            }

            .fr-r {
              float: right;
              width: 60px;
              height: 60px;
              background: rgba(255, 255, 255, 0.12);
              font-size: 18px;
              color: #bdc4cc;

              p {
                text-align: center;
                font-size: 18px;
                font-stretch: normal;
                line-height: 30px;
              }
            }
          }

          .activeFr {
            .fr-r {
              background: #bdc4cc;

              p {
                // opacity: 0;
                color: #000;
              }
            }

            .numSize {
              color: #ff3a25;
            }
          }

          li:hover {
            .fr-r {
              background: #bdc4cc;

              p {
                color: #000;
              }
            }

            .numSize {
              color: #ff3a25;
            }
          }
        }
      }
    }

    // 底部
    .ICA-footer {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 42px;

      .ICA-footer-fl {
        float: left;

        img {
          width: 34px;
          height: 42px;
          float: left;
          margin-right: 12px;
          margin-left: 36px;
          margin-top: 10px;
        }

        p {
          width: 500px;
          color: #b2bac2;
          font-size: 12px;
          line-height: 20px;
        }
      }

      .ICA-footer-fr {
        height: 100%;
        float: right;

        .featuresBg {
          float: left;
          width: 36px;
          height: 36px;
          background: rgba(91, 99, 111, 0.3);
          border-radius: 18px;
          text-align: center;
          line-height: 36px;
          margin-right: 18px;

          i {
            font-size: 18px;
            color: #bdc4cc;
            line-height: 38px;
          }
        }

        .featuresBg:hover {
          background: #bdc4cc;

          i {
            color: #000;
          }
        }
      }
    }
  }
}
</style>
