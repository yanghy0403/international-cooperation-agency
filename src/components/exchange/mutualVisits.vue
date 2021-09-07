<template>
  <div class="exchangeCon">
    <div class="ex-left">
      <div class="ex-logo" @click="handleClose">
        <img src="../../assets/images/国际人才/页面固定内容/logo.png" alt />
        <p>中国科学院国际合作</p>
        <p>数据汇交与分析平台</p>
      </div>
      <div class="exTitle">人员交流</div>
      <div class="ex-nav">
        <!--<div ><router-link tag="li" to="/exchange">查询与检索</router-link></div>-->
        <div ><router-link tag="li" to="/importVisit">出访</router-link></div>
        <div><router-link tag="li" to="/exportVisit">来访</router-link></div>
        <div  class="navActive"><router-link tag="li" to="/mutualVisits">总计</router-link></div>
      </div>
      <div class="ex-btm" @click="lastPage">
        <div class="iconfontClose">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="closeName">返回上一页</div>
      </div>
    </div>
    <div class="ex-right" v-show="isSlide">
      <div class="fr-reel fr-reel-detail" >
        <div class="fr-reel-left">
          <div class="fr-reelHeader">
            <div class="reel-filterCondition_1">
              <ul>
                <li class="reel-filterCondition_1_li">
                  <el-select  filterable clearable v-model="params['orgSelect']" placeholder="请选择院内机构">
                    <el-option
                      v-for="item in orgAll"
                      :key="item.index"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </li>
                <li class="reel-filterCondition_1_li">
                  <el-tooltip class="item" effect="light" content="连续年份请用 - 隔开,例如：2011-2019;不连续年份请用;隔开，例如:2011;2019" placement="top">
                    <el-input  v-model="params['yearSelect']"  placeholder="请输入年份"></el-input>
                  </el-tooltip>
                </li>
                <!--<li class="reel-filterCondition_1_li">-->
                  <!--<el-cascader-->
                    <!--:options="areaoptions"-->
                    <!--v-model="globalArea"-->
                    <!--:show-all-levels="false"-->
                    <!--placeholder="请选择地区"-->
                    <!--:props="areaProps">-->
                  <!--</el-cascader>-->
                <!--</li>-->
                <li class="reel-filterCondition_1_li">
                  <el-select filterable @change="changecontinent"  clearable v-model="params['continentSelect']" placeholder="请选择大洲">
                    <el-option
                      v-for="item in areaoptions"
                      :key="item.index"
                      :label="item.label"
                      :value="item.label">
                    </el-option>
                  </el-select>
                </li>
                <li class="reel-filterCondition_1_li">
                  <el-select filterable clearable v-model="params['countrySelect']" placeholder="请选择国家或地区">
                    <el-option
                      v-for="item in countriesAll"
                      :key="item.index"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </li>

                <li class="reel-filterCondition_1_li">
                  <el-select filterable :loading="foreignOrgAllloading"  remote :remote-method="filterMethod" clearable v-model="params['foreignOrgSelect']" placeholder="请选择国外机构">
                    <el-option
                      v-for="item in foreignOrgAll"
                      :key="item.index"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </li>
                <li class="reel-filterCondition_1_li">

                  <el-select filterable clearable v-model="params['subjectSelect']" placeholder="请选择学科">
                    <el-option
                      v-for="item in subjectAll"
                      :key="item.index"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </li>
              </ul>
            </div>

            <div class="searchDiv" style="">
              <div :style="{background:conditionType?'#ff3a25':'#f1f3f6'}" class="reel-filterBtns"  @click="secondarySearch">
                <img :src="searchIcon" alt="">
              </div>
              <div :style="{background:conditionType?'#ff3a25':'#f1f3f6'}"  class="reel-emptys "  @click="emptyParams">
                <img :src="emptyIcon" alt="">
              </div>
              <div @click="wordDownload" :style="{background:conditionType?'#ff3a25':'#f1f3f6' , color:conditionType?'#fff':'#727272'}"  class="reel-DownloadAlls reel-DownloadAllsDetail iconfont icon-xiazai"></div>
            </div>
            <!--<div class="reel-filterBtns"  @mouseenter="clickHover(1)" @mouseleave="clickHover(2)" @click="secondarySearch">-->
              <!--<img :src="searchIcon" alt="">-->

            <!--</div>-->
            <!--&lt;!&ndash;<div class="reel-emptys iconfont icon-fanhui1" @click="emptyParams"></div>&ndash;&gt;-->
            <!--<div class="reel-emptys " @mouseenter="clickHover(5)" @mouseleave="clickHover(6)" @click="emptyParams">-->
              <!--<img :src="emptyIcon" alt="">-->
            <!--</div>-->

            <!--<div class="reel-DownloadAlls reel-DownloadAllsDetail iconfont icon-xiazai"></div>-->
          </div>
          <div class="fr-reelCenter newScrollbar">
            <div class="reelCentent  " >
              <div class="moduleDiv" ref="picture1">
                <mutualVisitPersonNum
                  :data="leftTopData"
                  :mode="mode"
                  v-loading="loading"
                  element-loading-text="加载中...">
                </mutualVisitPersonNum>
              </div>
              <div class="moduleDiv" ref="picture2">
                <mutualVisitOrgNum
                  :data="rightTopData"
                  :mode="mode"
                  v-loading="loading"
                  element-loading-text="加载中...">
                </mutualVisitOrgNum>
              </div>
            </div>
            <div class="reelCentent" style="margin-top: 10px;">
              <div class="moduleDiv" ref="picture3">
                <formOfCommunication
                  :data="leftCenterData"
                  :mode="mode"
                  v-loading="loading"
                  element-loading-text="加载中...">
                </formOfCommunication>
              </div>
              <div class="moduleDiv" ref="picture4">
                <TopicSubjectAreas
                  :data="TopicSubject"
                  :mode="mode"
                  :subjectSelect="params['subjectSelect']"
                  v-loading="loading"
                  element-loading-text="加载中..."
                />
              </div>
            </div>
            <div class="reelBottom" ref="picture5">
              <IdentityGlobalMap
                :data="IdentityGlobalData"
                :InstituteData="InstituteImportData"
                :mode="mode"
                v-loading="loading"
                element-loading-text="加载中..."
              />
            </div>
          </div>

        </div>
        <div class="fr-reel-center">
          <div class="iconDiv" @click="handleShutdown">
            <div class="left-icon iconfont icon-shuangjiantouzuo"></div>
            <div class="text"> 查看详细数据</div>
          </div>
        </div>
        <div class="fr-reel-right" >

        </div>
      </div>
    </div >

    <div  class="ex-right2" >
      <div class="fr-reel-close">
        <div class="iconDiv" @click="handleOpenUp">
          <div  class="right-icon iconfont icon-shuangjiantouyou"></div>
          <div  class="text"> 查看统计图表</div>
        </div>
      </div>
      <div class="personList" >
        <div class="breadCrumbs">
          <ul>
            <li>人员交流</li>
            <li>/</li>
            <li>总计</li>
          </ul>
        </div>
        <div class=" personHeaderNew" style="display: flex">
          <h3 class="personTitleName">出、来访</h3>
          <div>
            <input v-model="params2['name']" class="personInput" placeholder="请输入要检索人员姓名" type="text" />
            <div class="iconDiv" @click="threeLevelSearch(1)"><i class="el-icon-search"></i></div>
          </div>
          <Login />
        </div>

        <div class="personHeader">
          <div class="personList-FilterCondition">
            <ul>
              <li style="margin-right: 1px;" class="reel-filterCondition_1_li">
                <el-select filterable clearable v-model="params2['orgSelect']" placeholder="请选择院内机构">
                  <el-option
                    v-for="item in orgAll"
                    :key="item.index"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </li>
              <li style="margin-right: 1px;" class="reel-filterCondition_1_li">
                <el-tooltip class="item" effect="light" content="连续年份请用 - 隔开,例如：2010-2019;不连续年份请用;隔开，例如:2010;2019" placement="top">
                  <el-input  v-model="params2['yearSelect']"  placeholder="请输入年份"></el-input>
                </el-tooltip>
              </li>
              <li style="margin-right: 1px;"  class="reel-filterCondition_1_li">
                <el-select clearable @change="changecontinent" v-model="params2['continentSelect']" placeholder="请选择大洲">
                  <el-option
                    v-for="item in areaoptions"
                    :key="item.index"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </li>
              <li style="margin-right: 1px;"   class="reel-filterCondition_1_li">
                <el-select filterable clearable v-model="params2['countrySelect']" placeholder="请选择国家或地区">
                  <el-option
                    v-for="item in countriesAll"
                    :key="item.index"
                    :label="item.value"
                    :value="item.value">
                  </el-option>
                </el-select>
              </li>
              <li style="margin-right: 1px;" class="reel-filterCondition_1_li">
                <el-select filterable :loading="foreignOrgAllloading" remote :remote-method="filterMethod" clearable v-model="params2['foreignOrgSelect']" placeholder="请选择国外机构">
                  <el-option
                    v-for="item in foreignOrgAll"
                    :key="item.index"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </li>
              <li style="margin-right: 1px;" class="reel-filterCondition_1_li">
                <el-select filterable clearable v-model="params2['subjectSelect']" placeholder="请选择学科">
                  <el-option
                    v-for="item in subjectAll"
                    :key="item.index"
                    :label="item.value"
                    :value="item.value">
                  </el-option>
                </el-select>
              </li>
            </ul>
          </div>
          <div class="params2SearchDiv">
            <div :style="{background:conditionType2?'#ff3a25':'#f1f3f6'}"  class="personSearch"  @click="threeLevelSearch(2)">
              <img :src="searchIcon2" alt="">
            </div>
            <!--<div class="personReast iconfont icon-fanhui1" @click="emptyParams2"></div>-->
            <div :style="{background:conditionType2?'#ff3a25':'#f1f3f6'}"  class="personReast " @mouseenter="clickHover(5)" @mouseleave="clickHover(6)" @click="emptyParams2">
              <img :src="emptyIcon2" alt="">
            </div>

            <div @click='excalDownload' :style="{background:conditionType2?'#ff3a25':'#f1f3f6' , color:conditionType2?'#fff':'#727272'}"  class="personDownload" @mouseenter="clickHover(3)" @mouseleave="clickHover(4)">
              <img :src="downloadIcon2" alt="">
            </div>
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
            总出、来人次
            <label>{{TopicpersonList.count}}</label>
          </p>
        </div>
        <div v-show="isListShow" class="arrayList" v-loading="loading" element-loading-text="加载中...">
          <ul>
            <li v-for="(item,i) in TopicpersonList.personList" :key="i" >
              <!-- 头像 -->
              <div @click="toPersonDetail(item.uniqueId,item.type)" class="avatar">
                <img v-if="item.imgUrl" :src="url + item.imgUrl" alt />
                <img v-else src="../../assets/images/国际人才/默认头像无头像状态.png" alt />
              </div>

              <!--出访：  姓名、国籍、职称、学科领域、访问单位、工作单位 -->
              <!-- 名字 -->
              <!--<div v-if="item.personNationality == '来访'" class="personName">{{item.inviterName}}</div>-->
              <!--<div  v-if="item.personNationality == '出访'" class="personName">{{item.visitName}}</div>-->
              <div  @click="toPersonDetail(item.uniqueId,item.type)" class="personName">{{item.name}}</div>
              <!--<div v-if="item.type == '出访'" @click="toPersonDetail(item.uniqueId,item.type)" class="personName">{{item.visitName}}</div>-->
              <!-- 国家 -->
              <div class="personCountry" >{{item.nationality}}</div>
              <div class="line"></div>
              <!-- 职称、学科领域 -->
              <div
                class="personSpecialty"
              >{{item.title}}·{{item.subject}}</div>

              <!-- 访问单位 -->
              <div class="CHunit" v-if="item.type == '出访'">
                <label>出访单位：</label>
                <span>{{item.visitUnit}}</span>
              </div>

              <div class="CHunit" v-if="item.type == '来访'">
                <label>访问单位：</label>
                <span>{{item.visitUnit}}</span>
              </div>

              <!-- 工作单位 -->
              <div class="ENunit"  v-if="item.type == '出访'">
                <label>工作单位：</label>
                <span>{{item.unit}}</span>
              </div>

              <div class="ENunit"  v-if="item.type == '来访'">
                <label>工作单位：</label>
                <span>{{item.unit}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div v-show="!isListShow" class="globaltableScroll tableList" v-loading="loading" element-loading-text="加载中...">
          <Table
            :height="tableHeight"
            border
            :columns="columns1"
            :data="TopicpersonList.personList"
          ></Table>
        </div>
        <div class="paginationDiv">
          <div class="record-info">
            <span>中国科学院国际合作局  版权所有</span>
            <span class="line">|</span>
            <span>技术支持：中国科学院计算机网络信息中心</span>
          </div>

          <div class="pagination">
            <Page
              :total="TopicpersonList.count"
              :current.sync="params2.offset+1"
              :page-size="params2.limit"
              @on-change="changePage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import TopicSubjectAreas from "./modules/mutualSubjectAreas"; //
  import formOfCommunication from "./modules/formOfCommunication"; //
  import IdentityGlobalMap from "./modules/mutualIdentityGlobalMap";  //地图
  import mutualVisitOrgNum from "./modules/mutualVisitOrgNum";  //地图
  import mutualVisitPersonNum from "./modules/mutualVisitPersonNum";  //地图


  import IdentityGlobalData from '@/assets/json/exchange/map.json'
  import TopicpersonList from '@/assets/json/exchange/列表数据.json'

  //引入js
  import visitFun from '@/assets/js/visit.js'
  import Axios from "axios";

  export default {
    name:'mutualVisits',
    components: {
      TopicSubjectAreas,
      IdentityGlobalMap,
      formOfCommunication,
      mutualVisitPersonNum,
      mutualVisitOrgNum,
    },
    data(){
      return{

        tableHeight:window.innerHeight-330,
        mode:0,
        isSlide:true,
        isListShow: true,
        source:'internationalPerson',
        foreignOrgAllloading:false,
        listIcon1: require("../../assets/images/国际人才/index/默认矩阵.png"),
        listIcon2: require("../../assets/images/国际人才/index/选中列表.png"),
        imgIcon1: require("../../assets/images/国际人才/index/选中矩阵.png"),
        imgIcon2: require("../../assets/images/国际人才/index/默认列表.png"),
        imgIcon3: require("../../assets/images/国际人才/index/选中矩阵.png"),
        imgIcon4: require("../../assets/images/国际人才/index/默认列表.png"),
        searchImg: require("../../assets/images/exchange/筛选4.png"),
        searchIcon: require("../../assets/images/exchange/筛选4.png"),
        searchImgHover: require("../../assets/images/exchange/筛选3.png"),
        downloadImg: require("../../assets/images/exchange/导出图标（默认）2.png"),
        downloadIcon: require("../../assets/images/exchange/导出图标（默认）2.png"),
        downloadImgHover: require("../../assets/images/exchange/导出图标（选中）2.png"),
        emptyIcon: require("../../assets/images/exchange/clearDefault.png"),
        emptyIconDefault: require("../../assets/images/exchange/clearDefault.png"),
        emptyIconSelect: require("../../assets/images/exchange/clearSelected.png"),
        params:{
          orgSelect:'',  //院内机构
          yearSelect:'', //年份
          continentSelect:'', //大洲
          countrySelect:'', //国家
          citySelect:'', //城市
          foreignOrgSelect:'', //国外机构
          subjectSelect:'', //学科
          communicationTypeSelect:'', //交流类型
          personSelect:'', //人员
        },
        params2:{
          orgSelect:'',  //院内机构
          yearSelect:'', //年份
          continentSelect:'', //大洲
          countrySelect:'', //国家
          citySelect:'', //城市
          foreignOrgSelect:'', //国外机构
          subjectSelect:'', //学科
          name:'',
          limit:60,
          offset:0,
        },
        globalArea:'',
        globalArea2:'',
        TopicpersonList:{},
        loading:false,
        TopicFounding:[ ],

        leftTopData:{},
        rightTopData:{},
        leftCenterData:[],

        TopicSubject:{},
        IdentityGlobalData:{},
        InstituteImportData:{}, //院所分布
        orgAll:[],
        countriesAll:[],
        cityAll:[],
        foreignOrgAll:[],
        subjectAll:[],
        areaoptions:[
          {
            value:'1-亚洲',
            label:'亚洲',
          }, {
            value:'1-非洲',
            label:'非洲',
          }, {
            value:'1-北美洲',
            label:'北美洲',
          }, {
            value:'1-南美洲',
            label:'南美洲',
          }, {
            value:'1-欧洲',
            label:'欧洲',
          }, {
            value:'1-南极洲',
            label:'南极洲',
          }, {
            value:'1-大洋洲',
            label:'大洋洲',
          },
        ],
        columns1: visitFun.mutualVisitTable,

        areaProps: {
          lazy: true,
          checkStrictly: true,
          lazyLoad (node, resolve) {
            let that = this
            const { level } = node;
            let nodeIndex = ((node.level))   //  第几级，1代表1一级，2代表第二级，以此类推
            let label = ((node.label))
              if(nodeIndex == 1){
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
                    let newCountryData = []
                    data.forEach((item,index)=>{
                      newCountryData.push({
                        value: `2-${item}`,
                        label: item,
                      })
                    })
                    resolve(newCountryData);
                  }
                });
              }else if(nodeIndex == 2){
                Axios.get("/index/city/autoTip", {
                  params: {
                    city: "",
                    continent: '',
                    country: label,
                    language: "",
                    source: "",
                  },
                }).then((res) => {
                  if (res.data.code == 200) {
                    let data = res.data.data;
                    let newCountryData = []
                    data.forEach((item,index)=>{
                      newCountryData.push({
                        value: `3-${item}`,
                        label: item,
                        leaf: level >= 2
                      })
                    })
                    resolve(newCountryData);
                  }
                });
              }else{
                resolve(true);
              }
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成

          }
        },
        isSearchName:false,
        conditionType:false,
        conditionType2:false,

      }
    },
    watch:{
      params: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          if(val.orgSelect == '' && val.yearSelect == '' && val.continentSelect == '' && val.countrySelect == '' && val.foreignOrgSelect == '' && val.subjectSelect == ''  ){
            this.conditionType = false
            this.searchIcon = this.searchImg
            this.downloadIcon = this.downloadImg
            this.emptyIcon = this.emptyIconDefault
          }else{
            this.conditionType = true
            this.searchIcon = this.searchImgHover
            this.downloadIcon = this.downloadImgHover
            this.emptyIcon = this.emptyIconSelect
          }
        }
      },
      params2: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          if(val['orgSelect'] == '' && val['yearSelect'] == '' && val['continentSelect'] == '' && val['countrySelect'] == '' && val['foreignOrgSelect'] == '' && val.subjectSelect == '' ){
            this.conditionType2 = false
            this.searchIcon2 = this.searchImg
            this.downloadIcon2 = this.downloadImg
            this.emptyIcon2 = this.emptyIconDefault
          }else{
            this.conditionType2 = true
            this.searchIcon2 = this.searchImgHover
            this.downloadIcon2 = this.downloadImgHover
            this.emptyIcon2 = this.emptyIconSelect
          }
        }
      },
    },
    mounted(){
      this.getAllFun()
    },
    methods:{
      /*
      * 下载word
      * */
      wordDownload(){
        // this.getDownload('/communication/wordDownload')
        this.getDownload('/communication/pdfDownload')
      },


      getDownload(fileUrl){
        let _this = this,
            arr = []
        arr.push(this.params.orgSelect)
        arr.push(this.params.yearSelect)
        arr.push(this.params.continentSelect)
        arr.push(this.params.countrySelect)
        arr.push(this.params.foreignOrgSelect)
        arr.push(this.params.subjectSelect)

        for(let i = 0;i<arr.length;i++){
          if(arr[i]==''||arr[i]==null||typeof(arr[i])==undefined){
            arr.splice(i,1);
            i=i-1;
          }
        }
        let params = {
          source:'人员交流',
          type:'互访',
          continent:this.params.continentSelect,
          country:this.params.countrySelect,
          city:'',
          enOrg:this.params.foreignOrgSelect,
          zhOrg:this.params.orgSelect,
          subject:this.params.subjectSelect,
          year:this.params.yearSelect,
          barchartImage:'',
          piechartImage:'',
          org1Image:'',
          org2Image:'',
          mapImage:'',
          param:arr.join('-'),
        }
        let p1= new Promise((resolve,reject)=> {
          let data = _this.$refs.picture1
          visitFun.getImgBase64(data).then((res)=>{
            params.barchartImage = res
            resolve(true)
          })
        })
        let p2= new Promise((resolve,reject)=> {
          let data = _this.$refs.picture2
          visitFun.getImgBase64(data).then((res)=>{
            params.piechartImage = res
            resolve(true)
          })
        })

        let p3= new Promise((resolve,reject)=> {
          let data = _this.$refs.picture3
          visitFun.getImgBase64(data).then((res)=>{
            params.org1Image = res
            resolve(true)
          })
        })

        let p4= new Promise((resolve,reject)=> {
          let data = _this.$refs.picture4
          visitFun.getImgBase64(data).then((res)=>{
            params.org2Image = res
            resolve(true)
          })
        })

        let p5= new Promise((resolve,reject)=> {
          let data = _this.$refs.picture5
          visitFun.getImgBase64(data).then((res)=>{
            params.mapImage = res
            resolve(true)
          })
        })


        Promise.all([p1,p2,p3,p4,p5]).then(()=> {
          _this.axios(visitFun.settingParameters('post',fileUrl,params)).then((res) => {
            if (res.data.code == 200) {
              window.open(res.data.data.fileDownUrl)
            }
          });
        })
      },

      filterMethod(query){
        let _this = this
        if (query !== '') {
          _this.foreignOrgAllloading = true;
          setTimeout(() => {
            _this.foreignOrgAllloading = false;
            _this.axios.get(`/index/org/autoTip?source=false&query_name=${query}`).then((res) => {
              if (res.data.code == 200) {
                _this.foreignOrgAll = res.data.data.zh
              }
            });
          }, 20);
        } else {
        }
      },
      getAllFun(){
        visitFun.getInstitutionsInTheHospital(data=>{this.orgAll = data})
        visitFun.getInstitutionsInTheHospitalOut(data=>{this.foreignOrgAll = data})
        visitFun.handleCountry(data=>{this.countriesAll = data})
        visitFun.handleCity(data=>{this.cityAll = data})
        visitFun.handleSubject(data=>{this.subjectAll = data})

        this.secondLevelSearch() // 二级搜索
        this.threeLevelSearch(2) //三级搜索
      },
      handleChange(val){
        if(val ==1){

        }
      },
      handleShutdown(){
        this.isSlide = false
      },
      handleOpenUp(){
        this.isSlide = true
      },
      //改变大洲
      changecontinent(val){
        this.axios.get("/index/country/autoTip", {
          params: {
            city: "",
            continent: val,
            countrySimpleZhName: "",
            language: "",
            source: "",
          },
        }).then((res) => {
          if (res.data.code == 200) {
            let data = res.data.data.name;
            this.countriesAll = data.map((item) => {
              return {
                value: item,
                label: item,
              };
            });
          }
        });
      },

      //鼠标滑入改变图标
      clickHover(val){
        if(val == 1){
          this.searchIcon = this.searchImgHover
        }else if(val == 2){
          this.searchIcon = this.searchImg
        }else if(val == 3){
          this.downloadIcon = this.downloadImgHover
        }else if(val == 4){
          this.downloadIcon = this.downloadImg
        }else if(val == 5){
          this.emptyIcon = this.emptyIconSelect
        }else if(val == 6){
          this.emptyIcon = this.emptyIconDefault
        }
      },

      // 列表切换
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
      //条件清空
      emptyParams(){
        this.params = {
          orgSelect:'',  //院内机构
          yearSelect:'', //年份
          continentSelect:'', //大洲
          countrySelect:'', //国家
          citySelect:'', //城市
          foreignOrgSelect:'', //国外机构
          subjectSelect:'', //学科
        }
        this.secondarySearch()
      },
      //二级搜索
      secondarySearch(){
        if(this.globalArea != ''){
          this.params.continentSelect = ''
          this.params.countrySelect = ''
          this.params.citySelect = ''
          let length = this.globalArea.length
          if(length == 1){
            this.params.continentSelect = this.globalArea[length-1].split('-')[1]
          }else if(length == 2){
            this.params.countrySelect = this.globalArea[length-1].split('-')[1]
          }else if(length == 3){
            this.params.citySelect = this.globalArea[length-1].split('-')[1]
          }
        }
        this.secondLevelSearch()
      },
      //三级条件清空
      emptyParams2(){
        this.globalArea2 = ''
        this.params2 = {
          orgSelect:'',  //院内机构
          yearSelect:'', //年份
          continentSelect:'', //大洲
          countrySelect:'', //国家
          citySelect:'', //城市
          foreignOrgSelect:'', //国外机构
          subjectSelect:'', //学科
          name:'', //姓名
          limit:60,
          offset:0,
        }
        this.threeLevelSearch(2)
      },

      //二级搜索
      secondLevelSearch(){
        // this.getVisitData()
        this.getInstituteMapData()
        this.getpersontimeData()
        this.getvisitsProjectData()
        this.getCommunicationFormsData()
        this.getsubjectDistributionData()
        this.getnationalityData()

      },

      //三级搜索
      threeLevelSearch(val){
        if(val == 1){
          this.isSearchName = true  //人名条件搜素
        }else if(val == 2){
          this.isSearchName = false  //全部条件搜索
        }
        this.getlistData()
      },

      /*
      * excal下载函数
      * */
      excalDownload(){
        this.axios.get("/communication/exchangeVists/export/personList", {
          params: {
            city:'',
            continent:this.params2.continentSelect,
            foreignOrg:this.params2.foreignOrgSelect,
            instName:this.params2.orgSelect,
            limit:'1000',
            name:this.params2.name,
            offset:'0',
            subject:this.params2.subjectSelect,
            type:'',
            visitCountry:this.params2.countrySelect,
            year:this.params2.yearSelect,
          }
        }).then((res) => {
          if (res.data.code == 200) {
            window.open(res.data.data.fileDownUrl)
          }
        });

      },


      // 获取互访数据
      getVisitData() {
        this.axios.get("/communication/exchangeVists", {
          params: {
            city: this.params.citySelect,   //城市
            continent: this.params.continentSelect,  //大洲
            country: this.params.countrySelect.split('/')[0],  //国家
            enOrg: this.params.foreignOrgSelect,        //国外机构
            subject: this.params.subjectSelect,  //学科
            year: this.params.yearSelect,  //年份
            zhOrg: this.params.orgSelect,  //院内机构
            // offset:1,
            // limit:9999999999,
          },
        }).then((res) => {
          if (res.data.code == 200) {
            this.IdentityGlobalData = {
              geoCoordMap: res.data.data.nationality.Jw,
              data: res.data.data.nationality.visitNationality,
              city: this.params.citySelect,   //城市
              continent: this.params.continentSelect,  //大洲
              country: this.params.countrySelect,  //国家
              enOrg: this.params.foreignOrgSelect,        //国外机构
              subject: this.params.subjectSelect,  //学科
              year: this.params.yearSelect,  //年份
              zhOrg: this.params.orgSelect,  //院内机构
            };
          }
        });
      },


      // 左上
      getpersontimeData() {
        this.axios.get("/communication/exchangeVists/persontime", {
          params:this.getParamsData()
        }).then((res) => {
          if (res.data.code == 200) {
            this.leftTopData = res.data.data.VistsNumber
          }
        });
      },

      // 右上
      getvisitsProjectData() {
        this.axios.get("/communication/exchangeVists/visitsProject", {
          params: this.getParamsData()
        }).then((res) => {
          if (res.data.code == 200) {
            this.rightTopData = res.data.data.VisitsProject
          }
        });
      },

      // 左中
      getCommunicationFormsData() {
        this.axios.get("/communication/exchangeVists/CommunicationForms", {
          params: this.getParamsData()
        }).then((res) => {
          if (res.data.code == 200) {
            this.leftCenterData = res.data.data.CommunicationForms.visitForms

          }
        });
      },

      // 右中
      getsubjectDistributionData() {
        this.axios.get("/communication/exchangeVists/subjectDistribution", {
          params: this.getParamsData()
        }).then((res) => {
          if (res.data.code == 200) {
            this.TopicSubject = {
              subjectData: res.data.data.subjectDistributionMap.Subject,
              subjectTWO: res.data.data.subjectDistributionMap.subSubject,
              city: this.params.citySelect,   //城市
              continent: this.params.continentSelect,  //大洲
              country: this.params.countrySelect,  //国家
              enOrg: this.params.foreignOrgSelect,        //国外机构
              subject: this.params.subjectSelect,  //学科
              year: this.params.yearSelect,  //年份
              zhOrg: this.params.orgSelect,  //院内机构
            };
          }
        });
      },

      // 地图展示国际分布
      getnationalityData() {
        this.axios.get("/communication/exchangeVists/nationality", {
          params: this.getParamsData()
        }).then((res) => {
          if (res.data.code == 200) {
            let newObject = visitFun.correctLocation(res.data.data.nationalityMap.jw)
            this.IdentityGlobalData = {
              geoCoordMap: newObject,
              data: res.data.data.nationalityMap.visitContinent,
//              normalize: res.data.data.nationalityMap.normalize,
              city: this.params.citySelect,   //城市
              continent: this.params.continentSelect,  //大洲
              country: this.params.countrySelect,  //国家
              enOrg: this.params.foreignOrgSelect,        //国外机构
              subject: this.params.subjectSelect,  //学科
              year: this.params.yearSelect,  //年份
              zhOrg: this.params.orgSelect,  //院内机构
            };
          }
        });
      },
      // 获取院所分布数据
      getInstituteMapData() {
        // type: '出访',
        this.axios.get("/communication/exchangeVists/institutesMap", {
          params: {
            city: this.params.citySelect,   //城市
            continent: this.params.continentSelect,  //大洲
            country: this.params.countrySelect,  //国家
            enOrg: this.params.foreignOrgSelect,        //国外机构
            subject: this.params.subjectSelect,  //学科
            year: this.params.yearSelect,  //年份
            zhOrg: this.params.orgSelect,  //院内机构
            offset:1,
            limit:1000,
          },
        }).then((res) => {
          if (res.data.code == 200) {
            this.InstituteImportData = {
              data: res.data.data.institutesNumber,
              city: this.params.citySelect,   //城市
              continent: this.params.continentSelect,  //大洲
              country: this.params.countrySelect,  //国家
              enOrg: this.params.foreignOrgSelect,        //国外机构
              subject: this.params.subjectSelect,  //学科
              year: this.params.yearSelect,  //年份
              zhOrg: this.params.orgSelect,  //院内机构
            };
          }
        });
      },


      // 获取list数据
      getlistData() {
        //根据globalArea2值来判断洲，国家，城市的值
        let newParams = {}
        if(this.isSearchName){
          newParams = {
            city: '',   //城市
            continent: '',  //大洲
            country: '',  //国家
            enOrg: '',        //国外机构
            subject: '',  //学科
            year: '',  //年份
            zhOrg: '',  //院内机构
            name: this.params2.name,  //
            limit: this.params2.limit,  //
            offset: this.params2.offset,  //1
            type:'',
          }
        }else{
          //根据globalArea2值来判断洲，国家，城市的值
          if(this.globalArea2 != ''){
            this.params2.continentSelect = ''
            this.params2.countrySelect = ''
            this.params2.citySelect = ''
            let length = this.globalArea2.length
            if(length == 1){
              this.params2.continentSelect = this.globalArea2[length-1].split('-')[1]
            }else if(length == 2){
              this.params2.countrySelect = this.globalArea2[length-1].split('-')[1]
            }else if(length == 3){
              this.params2.citySelect = this.globalArea2[length-1].split('-')[1]
            }
          }
          newParams = {
            city: this.params2.citySelect,   //城市
            continent: this.params2.continentSelect,  //大洲
            country: this.params2.countrySelect,  //国家
            enOrg: this.params2.foreignOrgSelect,        //国外机构
            subject: this.params2.subjectSelect,  //学科
            year: this.params2.yearSelect,  //年份
            zhOrg: this.params2.orgSelect,  //院内机构
            name: this.params2.name,  //
            limit: this.params2.limit,  //
            offset: this.params2.offset,  //1
            type:'',
          }
          // newParams = this.params2
        }
        this.axios.get("/communication/exchangeVists/personList", {
          params: newParams,
        }).then((res) => {
          if (res.data.code == 200) {
            this.TopicpersonList = res.data.data.personList
          }
        });
      },
      changePage(val){
        this.params2.offset = val-1
        this.threeLevelSearch(2)
      },
      // 进入国才详情页
      toPersonDetail(val,type) {


        if(val){
          if(type == '来访'){
            this.$router.push({
              path: "/PersonDetails",
              query: { id: val },
            });
          }else if (type == '出访'){
            this.$router.push({
              path: "/domesticPersonnelInfor",
              query: { id: val },
            });
          }else{
            alert('获取不到访问类型，跳转失败！')
          }

        }else{
          alert('数据不完整，跳转失败！')

        }

      },
       getParamsData(){
        return {
          city: this.params.citySelect,   //城市
          continent: this.params.continentSelect,  //大洲
          country: this.params.countrySelect.split('/')[0],  //国家
          enOrg: this.params.foreignOrgSelect,        //国外机构
          subject: this.params.subjectSelect,  //学科
          year: this.params.yearSelect,  //年份
          zhOrg: this.params.orgSelect,  //院内机构
          offset:1,
          limit:1000,
        }
       },
      // 返回首页
      handleClose() {
        visitFun.goHome()
      },
      lastPage(){
        visitFun.lastPage()
      },
    },
  }
</script>
<style lang="less" scoped>
  @import "../../assets/css/exchange/index.less";
  .exchangeCon{

  }
</style>
