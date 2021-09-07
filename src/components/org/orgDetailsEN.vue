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
        <p class="personName">{{ orgInfoData.orgEnNormalName }}</p>
        <p class="personNameZH">{{ orgInfoData.orgZhNormalName }}</p>
        <p class="personNationality"></p>
        <div class="education">
          <p class="line"></p>
          <p class>{{ orgInfoData.orgType }}</p>
          <p class></p>
          <p class="line"></p>
        </div>
        <p class="orgName orgEN">
          <label>所在国家：</label>
          <span>{{
            orgInfoData.country == null ? "-" : orgInfoData.country
          }}</span>
        </p>
        <p class="orgName orgZH">
          <label>所在城市：</label>
          <span>{{ orgInfoData.city == null ? "-" : orgInfoData.city }}</span>
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
     <div v-show="showDownload" class="bagshadow">
        <div class="bagLeft"></div>
        <div class="bagRight">
          <div class="row1">
            <span>人员报告信息下载</span>
            <span @click="toDownload(1)"><img src="../../assets/images/exchange/close.png" alt=""></span>
          </div>
          <div class="row2"><input v-model="filename" type="text"></div>
          <div class="row3" @click="fillName">使用系统规则自动命名</div>
          <div class="row4">
            <div class="selectDiv">
              <div>已选（{{selectEdNum}}）</div>
              <div><span @click="choseAll(0)">全选</span> | <span @click="choseAll(1)">取消</span></div>
            </div>

            <ul class="downloadUl">
              <li @click="choseItem(index)" class="item" v-for="(item,index) in downloadData" :key="index">
                <div>
                  <img v-if="item.selected" src="../../assets/images/exchange/selected.png" alt="">
                  <img v-else src="../../assets/images/exchange/selectDefault.png" alt="">
                </div>
                <div><img src="../../assets/images/exchange/toRight.png" alt=""></div>
                <div>{{item}}</div>
              </li>
            </ul>
          </div>
          <div class="row5">
            <div class="titleDiv">格式</div>
            <div @click="chooseType(1)" class="itemDiv">
              PDF
              <img v-if="typeNum == 1" src="../../assets/images/exchange/selected.png" alt="">
              <img v-else src="../../assets/images/exchange/selectDefault.png" alt="">
            </div>
            <div @click="chooseType(2)" class="itemDiv">
              Word
              <img  v-if="typeNum == 2" src="../../assets/images/exchange/selected.png" alt="">
              <img v-else src="../../assets/images/exchange/selectDefault.png" alt="">
            </div>
            <div @click="chooseType(3)" class="itemDiv">
              XLS
              <img  v-if="typeNum == 3" src="../../assets/images/exchange/selected.png" alt="">
              <img v-else src="../../assets/images/exchange/selectDefault.png" alt="">
            </div>
          </div>
          <div class="row6">
            <div @click="download">下载</div>
          </div>
        </div>
      </div>
      <div class="fr-header">
        <div class="header-fl">
          <ul>
            <li>
              <lable>与中科院亲密度</lable>
              <span>{{ scoreVal }}</span>
            </li>
            <li>
              <lable>机构影响力</lable>
              <span>{{ reflectionVal }}</span>
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
              <lable>中科院出访(人次)</lable>
              <span>{{ visitNum }}</span>
            </li>
          </ul>
        </div>
        <div class="header-fr">
          <ul>
            <li @click="toDownload(0)" class="li1"></li>
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
          <!-- 人才 -->
          <div
            :style="{ width: dataNum == 1 ? '97%' : '48%' }"
            v-if="JSON.stringify(personData.count) != '[]'"
            class="chart work"
          >
            <personModule :data="personData" />
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
          <!-- 协议 -->
          <div
            :style="{ width: dataNum == 1 ? '97%' : '48%' }"
            v-if="JSON.stringify(protocolData.count) != '[]'"
            class="chart Learn"
          >
            <protocolModule :data="protocolData" />
          </div>
          <!-- 奖励 -->
          <div
            :style="{ width: dataNum == 1 ? '97%' : '48%' }"
            v-if="JSON.stringify(rewardData.count) != '[]'"
            class="chart Learn"
          >
            <rewardModule :data="rewardData" />
          </div>
          <!-- 产出 -->
          <div
            :style="{ width: dataNum % 2 == 1 ? '97%' : '48%' }"
            v-if="JSON.stringify(outPutData) != '[]'"
            class="chart Learn"
          >
            <outputModule :data="outPutData" :table="outPutTableData" />
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
import influence from "./orgEnModules/Influence";
import cooperationTrack from "./orgEnModules/CooperationTrack";
import personRelatedModule from "./orgEnModules/personRelatedModule";
import interflowModule from "./orgEnModules/interflowModule";
import platformModule from "./orgEnModules/platformModule";
import projectModule from "./orgEnModules/projectModule";
import personModule from "./orgEnModules/personModule";
import rewardModule from "./orgEnModules/rewardModule";
import protocolModule from "./orgEnModules/protocolModule";
import outputModule from "./orgEnModules/outputModule";
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
      orgId: "",
      workData: [],
      studyData: {},
      exchang: {},
      exchangetable: {},
      dataNum: 0,

      //机构主页
      orgName: "",
      orgId: "",
      orgInfoData: [],
      radarData: [],
      personDetails: [],
      linksData: [],
      cooperationdetailData: [],
      relatedData: {}, //关联网络数据
      isRelatedChage: true,

      projectData: [], // 项目
      platformData: [], // 平台
      personData: [], // 人才
      rewardData: [], // 奖励
      protocolData: [], // 协议
      outPutData: [], // 产出
      outPutTableData: [], // 产出列表
      communicationData: [], // 交流

      scoreVal: "",
      paperNum: "",
      reflectionVal: "",
      laifangVal: "",
      visitNum: "",
      showDownload: false,
      typeNum:0,
      downloadData: ["参与国际合作轨迹","关联网络","交流","人才","项目","平台"],
      filename: "",
      selectEdNum: 0,
      alldownloadData:[
          {
            name:'trace',
            label:'参与国际合作轨迹',
            selected:false,
            exist:false,
            img:'',
          },  {
            name:'network',
            label:'关联网络',
            selected:false,
            exist:false,
            img:'',
          },  {
            name:'communication',
            label:'交流',
            selected:false,
            exist:false,
            img:'',
          },  {
            name:'talent',
            label:'人才',
            selected:false,
            exist:false,
            img:'',
          },  {
            name:'project',
            label:'项目',
            selected:false,
            exist:false,
            img:'',
          },
          {
            name:'platform',
            label:'平台',
            selected:false,
            exist:false,
            img:'',
          }, {
            name:'award',
            label:'奖励',
            selected:false,
            exist:false,
            img:'',
          },
            {
            name:'protocol',
            label:'协议',
            selected:false,
            img:'',
          }, {
            name:'produce',
            label:'产出',
            selected:false,
            exist:false,
            img:'',
          },
        ],

    };
  },
  computed:{
      downloadData(){
        let newData = []
        this.alldownloadData.forEach((item,index)=>{
          if(item.exist == true){
            newData.push(item)
          }
        })
        return newData
      },
    },
  created() {
    this.orgId = this.$route.query.id;
  },
  mounted() {
    // this.handleRadar()
    this.getInfo();
  },
  methods: {
    // 返回首页
    handleClose() {
      this.$router.go(-1);
    },
    // 返回首页
    goHome() {
      this.$router.push({ path: "/" });
    },
    // 下载
    toDownload(val){
        if(val == 0){
          this.showDownload = true
        }else{
          this.showDownload = false
          this.downloadData.forEach((item,index)=>{
            item.selected = false
            this.selectEdNum = 0
          })
        }
      },
      //填充名称
      fillName(){
       let name = this.personDetails.name
        this.filename = `${name}的个人主页`
      },

      // 选择单个
      choseItem(val){
        this.downloadData[val].selected = !this.downloadData[val].selected
        if(this.downloadData[val].selected == true){
          this.selectEdNum = this.selectEdNum + 1
        }else{
          this.selectEdNum = this.selectEdNum - 1
        }
      },

      // 全选 ，全部取消
      choseAll(val){
        if(val == 0){
          this.downloadData.forEach((item,index)=>{
            item.selected = true
          })
          this.selectEdNum = this.downloadData.length
        }else{
          this.downloadData.forEach((item,index)=>{
            item.selected = false
          })
          this.selectEdNum = 0
        }
      },

      chooseType(val){
        this.typeNum = val
      },

      download() {

      },

    //收藏
    favorites(){
      let userId = 'admin'
      let type = '机构'
      let content = `国外机构-${this.orgInfoData.orgEnNormalName}-${this.orgInfoData.country}@organizationEN-${this.orgId}`
      visitFun.favoritesFun(userId,type,content)
    },

    //与中科院请密度
    handleScore() {
      this.axios
        .get("/org/foreign/detail/score", { params: { orgId: this.orgId } })
        .then((res) => {
          if (res.data.code == 200) {
            this.scoreVal = res.data.data;
          }
        });
    },
    //机构影响力
    handleReflection() {
      this.axios
        .get("/org/foreign/detail/reflection", {
          params: { orgId: this.orgId },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.reflectionVal = res.data.data;
          }
        });
    },
    //合作论文篇数
    handlePaperNum() {
      this.axios
        .get("/org/org/paper/num", { params: { orgId: this.orgId } })
        .then((res) => {
          if (res.data.code == 200) {
            this.paperNum = res.data.data;
          }
        });
    },
    // 来访人次
    handleLaifang() {
      this.axios
        .get("/org/en/org/laifang", {
          params: { orgId: this.orgId, type: "en" },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.laifangVal = res.data.data;
          }
        });
    },
    // 出访人次
    handleVisitNum() {
      this.axios
        .get("/org/org/out/num", { params: { orgId: this.orgId, type: "en" } })
        .then((res) => {
          if (res.data.code == 200) {
            this.visitNum = res.data.data;
          }
        });
    },

    // 机构详情
    getInfo() {
      this.axios
        .get("/org/org/detail/info", { params: { orgId: this.orgId } })
        .then((res) => {
          if (res.data.code == 200) {
            this.orgInfoData = res.data.data;
            this.orgName = res.data.data.orgZhNormalName;
            this.handleCooperateWithZky();

            this.handleGetRelatedData();

            this.handleExchangeMap();

            this.handleGetProject();

            this.handleGetPlatform();

            this.handlePerson();

            this.handleReward();

            this.handelProtocol();

            this.handleOutPut();

            this.handleOutPutTable();

            this.handleScore();
            this.handlePaperNum();
            this.handleReflection();
            this.handleLaifang();
            this.handleVisitNum();
          }
        });
    },

    // 合作轨迹
    handleCooperateWithZky() {
      this.axios
        .get("/org/foreign/detail/cooperateWithZky", {
          params: { orgId: this.orgId },
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
    handleGetRelatedData() {
      this.axios
        .get("/org/foreign/detail/relationNet", {
          params: { orgId: this.orgId },
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

    //  交流
    handleExchangeMap() {
      this.axios
        .get("/org/foreign/detail/communication", {
          params: { orgId: this.orgId, name: this.orgName },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.communicationData = res.data.data;
            if (JSON.stringify(this.communicationData.count) != "[]") {
              this.dataNum += 1;
            }
          }
        });
    },

    // 人才
    handlePerson() {
      this.axios
        .get("/org/foreign/detail/person", {
          params: { orgId: this.orgId, name: this.orgName },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.personData = res.data.data;
            if(JSON.stringify(this.personData.count) != "[]") {
              this.dataNum += 1;
            }
          }
        });
    },

    // 项目   730d68d813e7ff45214cb2d16d733ecb
    handleGetProject() {
      this.axios
        .get("/org/foreign/detail/project", {
          params: { orgId: this.orgId, name: this.orgName },
        })
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
        .get("/org/foreign/detail/platform", {
          params: { orgId: this.orgId, name: this.orgName },
        })
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
    handelProtocol() {
      this.axios
        .get("/org/foreign/detail/protocol", { params: { orgId: this.orgId } })
        .then((res) => {
          if (res.data.code == 200) {
            this.protocolData = res.data.data;
            if (JSON.stringify(this.protocolData.count) != "[]") {
              this.dataNum += 1;
            }
          }
        });
    },
    // 奖励
    handleReward() {
      this.axios
        .get("/org/foreign/detail/award", {
          params: { orgId: this.orgId, name: this.orgName },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.rewardData = res.data.data;
            if (JSON.stringify(this.rewardData.count) != "[]") {
              this.dataNum += 1;
            }
          }
        });
    },// 奖励
    handleReward() {
      this.axios
        .get("/org/foreign/detail/award", {
          params: { orgId: this.orgId, name: this.orgName },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.rewardData = res.data.data;
            if (JSON.stringify(this.rewardData.count) != "[]") {
              this.dataNum += 1;
            }
          }
        });
    },

    //产出
    handleOutPut() {
      this.axios
        .get("/org/foreign/detail/outPut", {
          params: { orgId: this.orgId, name: this.orgName },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.outPutData = res.data.data;
            if (JSON.stringify(this.outPutData) != "[]") {
              this.dataNum += 1;
            } else {
              this.dataNum = 1;
            }
          }
        });
    },
    handleOutPutTable() {
      this.axios
        .get("/org/en/detail/paper/table", {
          params: { orgId: this.orgId, orgName: this.orgName },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.outPutTableData = res.data.data;
          }
        });
    },

    // 导出excel
    handleExcel() {
      this.axios
        .get("/org/en/detail/exportExcel", {
          params: { orgId: this.orgId, name: this.orgName, type: "en" },
        })
        .then((res) => {
          //console.log(res);
          // if(res.data.code == 200) {
          //   let blob = new Blob([res.data], {
          //     type: "application/vnd.ms-excel",
          //   }); // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
          //   let url = window.URL.createObjectURL(blob); // 3.创建一个临时的url指向blob对象

          //   // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
          //   let a = document.createElement("a");
          //   a.href = url;
          //   a.download = "国外机构信息.xlsx";
          //   a.click();
          //   // 5.释放这个临时的对象url
          //   window.URL.revokeObjectURL(url);
          // }
        });
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
  .personNameZH {
    font-size: 16px;
    color: #ff3925;
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
