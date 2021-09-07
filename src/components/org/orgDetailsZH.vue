<template>
  <div class="details">
    <!-- 左侧 -->
    <div class="details-fl">
      <div class="fl-logo" @click="goHome">
        <img src="../../assets/images/国际人才/页面固定内容/logo.png" alt />
        <p>中国科学院国际合作</p>
        <p>数据汇交与分析平台</p>
      </div>
      <div class="fl-info">
        <img src="../../assets/images/国际人才/defaultPerson.png" alt="" />
        <p class="personName">{{ detailData.orgZhNormalName }}</p>
        <p class="personNationality"></p>
        <div class="education">
          <p class="line"></p>
          <p class>{{ detailData.orgType }}</p>
          <p class></p>
          <p class="line"></p>
        </div>
        <p class="orgName orgEN">
          <label>所在国家：</label>
          <span>{{
            detailData.country == null ? "-" : detailData.country
          }}</span>
        </p>
        <p class="orgName orgZH">
          <label>所在城市：</label>
          <span>{{ detailData.city == null ? "-" : detailData.city }}</span>
        </p>
      </div>
      <div class="Influence">
        <influence :orgId="orgId" />
      </div>
      <div class="fl-btm" @click="handleClose">
        <div class="iconfontClose">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="closeName">返回上一页</div>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="details-fr">
      <div class="fr-header">
        <div class="header-fl">
          <ul>
            <li>
              <lable>国际合作度</lable>
              <span>{{ scoreVal }}</span>
            </li>
            <li>
              <lable>合作论文(篇)</lable>
              <span>{{ paperNum }}</span>
            </li>
            <li>
              <lable>来访(人次)</lable>
              <span>{{ laifangVal }}</span>
            </li>
            <li>
              <lable>出访(人次)</lable>
              <span>{{ VisitVal }}</span>
            </li>
          </ul>
        </div>
        <div class="header-fr">
          <ul>
            <li class="li1"></li>
            <li class="li2" @click="favorites"></li>
            <li class="li3"></li>
          </ul>
          <Login />
        </div>
      </div>
      <div class="scrollDiv">
        <div class="container_1">
          <div
            class="chart CooperationTrack"
            :style="{
              width:
                JSON.stringify(relatedData.orgDetail) == '[]' &&
                JSON.stringify(relatedData.personDetail) == '[]'
                  ? '97%'
                  : '48%',
            }"
          >
            <cooperationTrack
              :detailData="cooperationdetailData"
              :linksData="linksData"
            />
          </div>
          <div
            class="chart personRelated"
            v-if="
              JSON.stringify(relatedData.orgDetail) != '[]' ||
              JSON.stringify(relatedData.personDetail) != '[]'
            "
          >
            <personRelatedModule
              :personImg="realPersonImg"
              :relatedData="relatedData"
              :isRelatedChage="isRelatedChage"
            />
          </div>
        </div>

        <div class="container_3">
          <!-- 交流 -->
          <div
            :style="{ width: dataNum == 1 ? '97%' : '48%' }"
            v-if="JSON.stringify(communicationData.count) != '[]'"
            class="chart work"
          >
            <interflowModule :data="communicationData" />
          </div>
          <!-- 国际zuzhi -->
          <div
            :style="{ width: dataNum == 1 ? '97%' : '48%' }"
            v-if="JSON.stringify(internationalOrgData.count) != '[]'"
            class="chart work"
          >
            <InternationalModule :data="internationalOrgData" />
          </div>
          <!-- 人才 -->
          <div
            :style="{ width: dataNum == 1 ? '97%' : '48%' }"
            v-if="JSON.stringify(personListData.count) != '[]'"
            class="chart work"
          >
            <personModule :data="personListData" />
          </div>
          <!-- 项目 -->
          <div
            :style="{ width: dataNum == 1 ? '97%' : '48%' }"
            v-if="JSON.stringify(projectData.count) != '[]'"
            class="chart work"
          >
            <projectModule :data="projectData" />
          </div>
          <!-- 平台 -->
          <div
            :style="{ width: dataNum == 1 ? '97%' : '48%' }"
            v-if="JSON.stringify(platformData.count) != '[]'"
            class="chart Learn"
          >
            <platformModule :data="platformData" />
          </div>
          <!-- 奖励 -->
          <div
            :style="{ width: dataNum == 1 ? '97%' : '48%' }"
            v-if="JSON.stringify(rawardData.count) != '[]'"
            class="chart Learn"
          >
            <rewardModule :data="rawardData" />
          </div>
          <!-- 协议 -->
          <div
            :style="{ width: dataNum == 1 ? '97%' : '48%' }"
            v-if="JSON.stringify(agreementData.count) != '[]'"
            class="chart Learn"
          >
            <protocolModule :data="agreementData" />
          </div>
          <!-- 产出 -->
          <div
            :style="{ width: dataNum % 2 == 1 ? '97%' : '48%' }"
            v-if="JSON.stringify(paperData) != '[]'"
            class="chart Learn"
          >
            <outputModule :data="paperData" :table="paperTable" />
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
import influence from "./orgZHModules/Influence";
import cooperationTrack from "./orgZHModules/CooperationTrack";
import personRelatedModule from "./orgZHModules/personRelatedModule";
import interflowModule from "./orgZHModules/interflowModule";
import platformModule from "./orgZHModules/platformModule";
import projectModule from "./orgZHModules/projectModule";
import personModule from "./orgZHModules/personModule";
import rewardModule from "./orgZHModules/rewardModule";
import protocolModule from "./orgZHModules/protocolModule";
import outputModule from "./orgZHModules/outputModule";
import InternationalModule from "./orgZHModules/InternationalModule";
import visitFun from '@/assets/js/visit.js'

export default {
  components: {
    influence,
    cooperationTrack,
    personRelatedModule,
    interflowModule,
    platformModule,
    projectModule,
    personModule,
    rewardModule,
    protocolModule,
    outputModule,
    InternationalModule
  },
  data() {
    return {
      personImg: require("../../assets/images/国际人才/defaultPerson.png"),
      realPersonImg: "",
      iconData: {
        icon1: require("../../assets/images/国际人才/details/下载-默认状态.png"),
        icon1Hover: require("../../assets/images/国际人才/details/下载-选中状态.png"),
        icon2: require("../../assets/images/国际人才/details/收藏-默认状态.png"),
        icon2Hover: require("../../assets/images/国际人才/details/收藏-选中状态.png"),
        icon3: require("../../assets/images/国际人才/details/分享-默认状态.png"),
        icon3Hover: require("../../assets/images/国际人才/details/分享-选中状态.png"),
      },
      orgName: "",

      statisticsData: {},

      workData: [],
      studyData: {},
      awardData: {},
      exchang: {},
      exchangetable: {},

      studytable: {},

      dataNum: 0,
      isRelatedChage: true,
      relatedData: {}, //关联网络数据
      orgId: "",
      detailData: [],
      personDetails: {},
      linksData: [],
      cooperationdetailData: [],
      projectData: [], // 项目
      communicationData: [],
      platformData: [], // 平台
      agreementData: [], // 协议
      rawardData: [], // 奖励
      paperData: [], // 产出
      paperTable:[],  // 产出列表
      internationalOrgData: [], // 国际组织
      personListData: [], // 人才

      scoreVal: "",
      paperNum: "",
      VisitVal: "",
      laifangVal: "",
    };
  },
  created() {
    this.orgId = this.$route.query.id;
  },
  mounted() {
    this.handleGetDetail();
  },
  methods: {
    // 主页详情
    handleGetDetail() {
      this.axios
        .get("/org/china/detail", {
          params: { instId: this.orgId },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.detailData = res.data.data;
            this.orgName = res.data.data.orgZhNormalName;
            this.handleCooperateWithInternational();

            this.handleGetRelationNet();

            this.handleProject();

            this.handleGetCommunication();

            this.handleGetPlatform();

            this.handleGetAgreement();

            this.handleGetRaward();
            this.handePaperList();

            this.handlePaperTable()

            this.handleInternationalOrg()

            this.handlePerson()

            this.handleScore();
            this.handlePaperNum();
            this.handleVisit();
            this.handleLaifang();
          }
        });
    },
    //收藏
    favorites(){
      let userId = 'admin'
      let type = '机构'
      let content = `国内机构-${this.detailData.orgZhNormalName}-${this.detailData.country}@organizationZH-${this.orgId}`
      visitFun.favoritesFun(userId,type,content)
    },
    // 国籍合作度
    handleScore() {
      this.axios
        .get("/org/china/detail/score", { params: { orgId: this.orgId } })
        .then((res) => {
          if (res.data.code == 200) {
            this.scoreVal = res.data.data;
          }
        });
    },
    //出访
    handleVisit() {
      this.axios
        .get("/org/org/out/num", {
          params: { orgId: this.orgId, type: "zh"},
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.VisitVal = res.data.data;
          }
        });
    },
    //合作论文篇数
    handlePaperNum() {
      this.axios
        .get("/org/org/paper/num", { params: { orgId: this.orgId, } })
        .then((res) => {
          if (res.data.code == 200) {
            this.paperNum = res.data.data;
          }
        });
    },
    // 到访人次
    handleLaifang() {
      this.axios
        .get("/org/en/org/laifang", {
          params: { orgId: this.orgId, type: "zh" },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.laifangVal = res.data.data;
          }
        });
    },
    // 合作轨迹
    handleCooperateWithInternational() {
      this.axios
        .get("/org/zh/detail/cooperateWithInternational", {
          params: { instId: this.orgId },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.personDetails = res.data.data;
            this.linksData = this.personDetails.links;
            this.cooperationdetailData = this.personDetails.detail;
          }
        });
    },
    // 关联网络
    handleGetRelationNet() {
      this.axios
        .get("/org/china/detail/relationNet", {
          params: { instId: this.orgId },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.relatedData = res.data.data;
            if (this.relatedData != null) {
              this.isRelatedChage = !this.isRelatedChage;
            } else {
            }
          }
        });
    },
    // 交流
    handleGetCommunication() {
      this.axios
        .get("/org/zh/detail/communication", { params: { orgId: this.orgId,name: this.orgName } })
        .then((res) => {
          if (res.data.code == 200) {
            this.communicationData = res.data.data;
            if (JSON.stringify(this.communicationData.count) != "[]") {
              this.dataNum += 1;
            }
          }
        });
    },
    // 国际组织
    handleInternationalOrg () {
      this.axios.get("/org/zh/detail/internationalOrg",{ params: { orgId: this.orgId,name: this.orgName } }).then(res => {
        if(res.data.code == 200) {
          this.internationalOrgData = res.data.data
          if (JSON.stringify(this.internationalOrgData.count) != "[]") {
              this.dataNum += 1;
            }
        }
      })
    },
    // 人才
    handlePerson () {
      this.axios.get("/org/zh/org/detail/person",{ params: { orgId: this.orgId,name: this.orgName } }).then(res => {
        if(res.data.code == 200) {
          this.personListData = res.data.data
          if (JSON.stringify(this.personListData.count) != "[]") {
              this.dataNum += 1;
            }
        }
      })
    },
    // 项目
    handleProject() {
      this.axios
        .get("/org/zh/detail/project", { params: { instId: this.orgId,orgName: this.orgName } })
        .then((res) => {
          if (res.data.code == 200) {
            this.projectData = res.data.data;
            if (JSON.stringify(this.projectData.count) != "[]") {
              this.dataNum += 1;
            }
          }
        });
    },
    // 平台
    handleGetPlatform() {
      this.axios
        .get("/org/zh/detail/platform", { params: { instId: this.orgId,orgName: this.orgName } })
        .then((res) => {
          if (res.data.code == 200) {
            this.platformData = res.data.data;
            if (JSON.stringify(this.platformData.count) != "[]") {
              this.dataNum += 1;
            }
          }
        });
    },
    // 协议
    handleGetAgreement() {
      this.axios
        .get("/org/zh/detail/agreement", { params: { instId: this.orgId,orgName: this.orgName } })
        .then((res) => {
          if (res.data.code == 200) {
            this.agreementData = res.data.data;
            if (JSON.stringify(this.agreementData.count) != "[]") {
              this.dataNum += 1;
            }
          }
        });
    },
    // 奖励
    handleGetRaward() {
      this.axios
        .get("/org/zh/detail/award", { params: { instId: this.orgId,orgName: this.orgName } })
        .then((res) => {
          if (res.data.code == 200) {
            this.rawardData = res.data.data;
            if (JSON.stringify(this.rawardData.count) != "[]") {
              this.dataNum += 1;
            }
          }
        });
    },
    // 产出
    handePaperList() {
      this.axios
        .get("/org/zh/detail/paper", {
          params: { instId: this.orgId, orgName: this.orgName },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.paperData = res.data.data;
            if (JSON.stringify(this.paperData) != "[]") {
              this.dataNum += 1;
            }
            // console.log(this.paperData)
          }
        });
    },

    // 产出列表
    handlePaperTable() {
      this.axios.get("/org/zh/detail/paper/table",{
          params: { instId: this.orgId, orgName: this.orgName },
        }).then(res => {
          if(res.data.code == 200) {
            this.paperTable = res.data.data
          }
        })
    },

    // 返回首页
    handleClose() {
      this.$router.go(-1);
    },
    // 返回首页
    goHome() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/Details.less";
.fl-info {
  margin-top: 18px;
  img {
    width: 220px;
    height: 220px;
  }
  .personName {
    margin-top: 26px;
    font-size: 24px;
    color: #ff3925;
    width: 100%;

    word-break: break-all;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .personNationality {
    //  margin-top: 10px;
    font-size: 16px;
    color: #ff3925;
  }
  .education {
    color: #d3d3d3;
    .line {
      width: 77px;
      height: 2px;
      background: #49586e;
      margin: 16px 0;
    }
    p {
      font-size: 14px;
      line-height: 20px;
    }
  }
  .orgName {
    color: #d3d3d3;
    font-size: 14px;
    line-height: 24px;

    word-break: break-all;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .orgZH {
    margin-top: 20px;
  }
}
.Influence {
  width: 160px;
  height: 160px;
  margin-top: 40px;
  // border: 1px solid #fff;
}
.scrollDiv {
  margin-top: 110px;
}
.container_1 {
  width: 100%;
  display: flex;
  .chart {
    width: 48%;
    height: 400px;
    margin-left: 1%;
    background: #f4f5f7;
  }
}
.container_2 {
  width: 100%;
  margin-top: 1%;
  .interflow {
    width: 97%;
    height: 530px;
    margin-left: 1%;
    background: #f4f5f7;
  }
  .interflow_time {
    width: 97%;
    height: 430px;
    margin-left: 1%;
    background: #f4f5f7;
  }
}
.container_3 {
  width: 100%;
  display: flex;
  margin-top: 10px;
  flex-wrap: wrap;
  .chart {
    margin-bottom: 10px;
    width: 48%;
    height: 400px;
    margin-left: 1%;
    background: #f4f5f7;
  }
}
.container_4 {
  width: 100%;
  display: flex;
  margin-top: 1%;
  .chart {
    width: 48%;
    height: 400px;
    margin-left: 1%;
    background: #f4f5f7;
  }
}
.record-info {
  margin: 22px 0 38px 88px;
  img {
    width: 12px;
    height: 16px;
    margin-right: 8px;
  }
  .line {
    margin: 0 10px;
  }
  span {
    font-size: 12px;
  }
}
</style>
