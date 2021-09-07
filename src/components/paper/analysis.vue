<template>
  <div class="exchangeCon">
    <div class="ex-left">
      <div class="ex-logo" @click="handleClose">
        <img src="../../assets/images/国际人才/页面固定内容/logo.png" alt />
        <p>中国科学院国际合作</p>
        <p>数据汇交与分析平台</p>
      </div>
      <div class="exTitle">合作论文</div>
      <div class="ex-nav">
        <div  class="navActive"><router-link tag="li" to="/analysis">统计与分析</router-link></div>
        <div><router-link tag="li" to="/inquire">论文查询</router-link></div>
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
                  <el-select filterable clearable v-model="params['orgSelect']" placeholder="请选择院内机构">
                    <el-option
                      v-for="item in orgAll"
                      :key="item.index"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </li>
                <li class="reel-filterCondition_1_li">
                  <el-tooltip class="item" effect="light" content="连续年份请用 - 隔开,例如：2010-2019;不连续年份请用;隔开，例如:2010;2019" placement="top">
                    <el-input  v-model="params['yearSelect']"  placeholder="请输入年份"></el-input>
                  </el-tooltip>
                </li>
                <li class="reel-filterCondition_1_li">
                  <el-select filterable clearable @change="changecontinent" v-model="params['continentSelect']" placeholder="请选择大洲">
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
                  <el-select remote :loading="foreignOrgAllloading" :remote-method="filterMethod" filterable  v-model="params['foreignOrgSelect']" placeholder="请选择国外机构">
                    <el-option
                      v-for="item in foreignOrgAll"
                      :key="item.index"
                      :label="item.label"
                      :value="item.value">
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
              <div :style="{background:conditionType?'#ff3a25':'#f1f3f6'}" class="reel-filterBtns" @mouseenter="clickHover(1)" @mouseleave="clickHover(2)"  @click="secondarySearch">
                <img :src="searchIcon" alt="">
              </div>
              <div :style="{background:conditionType?'#ff3a25':'#f1f3f6'}"  class="reel-emptys " @mouseenter="clickHover(5)" @mouseleave="clickHover(6)" @click="emptyParams">
                <img :src="emptyIcon" alt="">
              </div>
              <div :style="{background:conditionType?'#ff3a25':'#f1f3f6' , color:conditionType?'#fff':'#727272'}"  class="reel-DownloadAlls reel-DownloadAllsDetail iconfont icon-xiazai" @click="downloadPdf"></div>
            </div>
          </div>
          <div class="fr-reelCenter newScrollbar">
            <div class="reelCentent  " >
              <div class="moduleDiv" ref='picture1'>
                <TopicSubsidize
                  :data="paperYearData"
                  :mode="mode"
                  visitType="出访"
                  v-loading="leftTopLoading"
                  element-loading-text="加载中..."
                />
              </div>
              <div class="moduleDiv" ref='picture2'>
                <TopicSubjectAreas
                  :data="TopicSubject"
                  :mode="mode"
                  :visitType="visitType"
                  v-loading="rightTopLoading"
                  :subjectSelect="params['subjectSelect']"
                  element-loading-text="加载中..."
                />
              </div>
            </div>
            <div class="reelBottom" style="margin-top: 10px;" ref='picture3'>
              <personRanking
                :data="personRankingData"
                :visitType="visitType"
                :mode="mode"
                v-loading="leftCenterLoading"
                element-loading-text="加载中..."
              />

            </div>

            <div class="reelBottom" ref='picture4'>
              <IdentityGlobalMap
                :data="IdentityGlobalData"
                :InstituteData="InstituteImportData"
                :mode="mode"
                :visitType="visitType"
                v-loading="bottomCenterLoading"
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
            <li>合作论文</li>
            <li>/</li>
            <li>统计与分析</li>
            <li></li>
          </ul>
        </div>
        <div class=" personHeaderNew" style="display: flex">
          <h3 class="personTitleName">统计与分析</h3>
          <div style="">
            <input class="personInput" v-model="params2['mq_authors.zhName']" placeholder="请输入要检索人员姓名" type="text" />
            <div class="iconDiv" @click="threeLevelSearch(1)"><i class="el-icon-search"></i></div>
          </div>
          <Login />
        </div>
        <div class="personHeader">
          <div class="personList-FilterCondition">
            <ul>
              <li class="reel-filterCondition_1_li">
                <el-select filterable clearable v-model="params2['mq_organizations.zhOrgName']" placeholder="请选择院内机构">
                  <el-option
                    v-for="item in orgAll"
                    :key="item.index"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </li>
              <li class="reel-filterCondition_1_li">
                <el-tooltip class="item" effect="light" content="连续年份请用 - 隔开,例如：2010-2019;不连续年份请用;隔开，例如:2010;2019" placement="top">
                  <el-input  v-model="params2['mq_year']"  placeholder="请输入年份"></el-input>
                </el-tooltip>
              </li>
              <li class="reel-filterCondition_1_li">
                <el-select clearable @change="changecontinent" v-model="params2['mq_organizations.continent']" placeholder="请选择大洲">
                  <el-option
                    v-for="item in areaoptions"
                    :key="item.index"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </li>
              <li class="reel-filterCondition_1_li">
                <el-select filterable clearable v-model="params2['mq_organizations.country']" placeholder="请选择国家或地区">
                  <el-option
                    v-for="item in countriesAll"
                    :key="item.index"
                    :label="item.value"
                    :value="item.value">
                  </el-option>
                </el-select>
              </li>

              <!--<li class="reel-filterCondition_1_li">-->
                <!--<el-cascader-->
                  <!--:options="areaoptions"-->
                  <!--v-model="globalArea2"-->
                  <!--:show-all-levels="false"-->
                  <!--placeholder="请选择地区"-->
                  <!--:props="areaProps">-->
                <!--</el-cascader>-->
              <!--</li>-->
              <li class="reel-filterCondition_1_li">
                <el-select filterable remote :loading="foreignOrgAllloading" :remote-method="filterMethod"   v-model="params2['mn_organizations.zhOrgName']" placeholder="请选择国外机构">
                  <el-option
                    v-for="item in foreignOrgAll"
                    :key="item.index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </li>
              <li class="reel-filterCondition_1_li">
                <el-select filterable clearable v-model="params2['mq_category']" placeholder="请选择学科">
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
            <div :style="{background:conditionType2?'#ff3a25':'#f1f3f6'}"  class="personSearch" @mouseenter="clickHover(1)" @mouseleave="clickHover(2)" @click="threeLevelSearch(2)">
              <img :src="searchIcon2" alt="">
            </div>
            <!--<div class="personReast iconfont icon-fanhui1" @click="emptyParams2"></div>-->
            <div :style="{background:conditionType2?'#ff3a25':'#f1f3f6'}"  class="personReast " @mouseenter="clickHover(5)" @mouseleave="clickHover(6)" @click="emptyParams2">
              <img :src="emptyIcon2" alt="">
            </div>


            <div :style="{background:conditionType2?'#ff3a25':'#f1f3f6' , color:conditionType2?'#fff':'#727272'}"  class="personDownload" @mouseenter="clickHover(3)" @mouseleave="clickHover(4)">
              <img :src="downloadIcon2" alt="">
            </div>
          </div>



        </div>
        <div class="listTabs">
          <el-select size="mini" value="综合排序" v-model="params2['sort_sort']" clearable  placeholder="请选择排序方式">
            <el-option label="综合排序" value="timesCited">  </el-option>
            <el-option label="按照时间排序" value="date"> </el-option>
          </el-select>
          <p class="personTotal">
            检索到
            <label>{{totalNum}}条结果</label>
          </p>
        </div>

        <div style="" class="tableList globaltableScroll"  v-loading="loading" element-loading-text="加载中...">
          <Table
            :height="tableHeight"
            border
            :columns="columns1"
            :data="paperTableData"
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
              :total="pageNum"
              :current.sync="params2.page_offset"
              :page-size="params2.page_limit"
              @on-change="changePage"
            />
          </div>
        </div>


      </div>
    </div>
  </div>
</template>
<script>
  import TopicSubsidize from "./modules/TopicSubsidize"; // 历年出访人数
  import TopicSubjectAreas from "./modules/SubjectAreas"; //
  import personRanking from "./modules/personRanking"; //
  import IdentityGlobalMap from "./modules/IdentityGlobalMap";  //地图


  import personRankingData from '@/assets/json/exchange/visitRanking.json'
  import IdentityGlobalData from '@/assets/json/exchange/map.json'
  import TopicpersonList from '@/assets/json/exchange/列表数据.json'


  //引入js
  import visitFun from '@/assets/js/visit.js'
  import Axios from "axios";
  export default {
    name:'analysis',
    components: {
      TopicSubsidize,
      TopicSubjectAreas,
      personRanking,
      IdentityGlobalMap,
    },
    data(){
      return{
        foreignOrgAllloading:false,
        tableHeight:window.innerHeight-330,
        mode:0,
        isSlide:true,
        isListShow: true,
        visitType:'出访',
        source:'internationalPerson',
        listIcon1: require("../../assets/images/国际人才/index/默认矩阵.png"),
        listIcon2: require("../../assets/images/国际人才/index/选中列表.png"),
        imgIcon1: require("../../assets/images/国际人才/index/选中矩阵.png"),
        imgIcon2: require("../../assets/images/国际人才/index/默认列表.png"),
        imgIcon3: require("../../assets/images/国际人才/index/选中矩阵.png"),
        imgIcon4: require("../../assets/images/国际人才/index/默认列表.png"),
        searchImg: require("../../assets/images/exchange/筛选4.png"),
        searchIcon2: require("../../assets/images/exchange/筛选4.png"),
        searchIcon: require("../../assets/images/exchange/筛选4.png"),
        searchImgHover: require("../../assets/images/exchange/筛选3.png"),
        downloadImg: require("../../assets/images/exchange/导出图标（默认）2.png"),
        downloadIcon2: require("../../assets/images/exchange/导出图标（默认）2.png"),
        downloadIcon: require("../../assets/images/exchange/导出图标（默认）2.png"),
        downloadImgHover: require("../../assets/images/exchange/导出图标（选中）2.png"),
        emptyIcon: require("../../assets/images/exchange/clearDefault.png"),
        emptyIcon2: require("../../assets/images/exchange/clearDefault.png"),
        emptyIconDefault: require("../../assets/images/exchange/clearDefault.png"),
        emptyIconSelect: require("../../assets/images/exchange/clearSelected.png"),

        paperYearData:{},  //历年合作论文篇数
        params:{
          orgSelect:'',  //院内机构
          yearSelect:'', //年份
          continentSelect:'', //大洲
          countrySelect:'', //国家
          citySelect:'', //城市
          foreignOrgSelect:'', //国外机构
          subjectSelect:'', //学科
        },
        params2:{
          'mq_authors.zhName':'',     //作者姓名
          'mq_category':'',     //学科
          'mq_organizations.city':'',          //城市
          'mq_organizations.continent':'',     //大洲
          'mq_organizations.country':'',       //国家
          'mn_organizations.zhOrgName':'',     //国外机构
          'mq_organizations.zhOrgName':'',     //院内机构
          'mq_year':'',     //年份
          'order_dir':'desc',                     //排序方向（降序 asc 升序 desc）
          'page_limit':60,                     //行数
          'page_offset':1,                   //页码
          'sort_sort':'date',                      //排序字段
        },
        loading:false,
        leftTopLoading:false,
        rightTopLoading:false,
        leftCenterLoading:false,
        bottomCenterLoading:false,
        TopicSubject:{},
        personRankingData:{},
        IdentityGlobalData:{},  //人才世界地图数据数据
        InstituteImportData:{}, //院所分布数据
        TopicpersonList:{},
        tableTitle:[],

        orgAll:[],
        countriesAll:[],
        cityAll:[],
        foreignOrgAll:[ ],
        subjectAll:[],
        columns1: visitFun.inpuireTable,
        globalArea:'',
        globalArea2:'',
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
        subjectData:[],
        totalNum:0,
        pageNum:0,
        paperTableData:[],
        isSearchName:false,
        conditionType:false,
        conditionType2:false,
      }
    },
    mounted(){
      visitFun.getInstitutionsInTheHospital(data=>{this.orgAll = data})
      visitFun.getInstitutionsInTheHospitalOut(data=>{
        let arr = []
        // console.log(data)
        data.forEach((item,index)=>{
          arr.push({
            label:item,
            value:item.split('/')[0]
          })
        })
        this.foreignOrgAll = arr
      })
      visitFun.handleCountry(data=>{this.countriesAll = data})

      visitFun.handleSubject(data=>{this.subjectAll = data})

      this.getAllFun()
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
          if(val['mq_organizations.continent'] == '' && val['mq_category'] == '' && val['mq_organizations.country'] == '' && val['mn_organizations.zhOrgName'] == '' && val['mq_organizations.zhOrgName'] == '' && val.mq_year == ''  ){
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
    methods:{
      filterMethod(query){
        let _this = this
        if (query !== '') {
          _this.foreignOrgAllloading = true;
          setTimeout(() => {
            _this.foreignOrgAllloading = false;
            _this.axios.get(`/index/org/autoTip?source=false&query_name=${query}`).then((res) => {
              if (res.data.code == 200) {
                let arr = []
                res.data.data.zh.forEach((item,index)=>{
                  arr.push({
                    label:item,
                    value:item.split('/')[0]
                  })
                })
                _this.foreignOrgAll = arr
              }
            });
          }, 20);
        } else {
        }
      },
      getAllFun(){
        //二级
        this.secondLevelSearch()
        //三级
        this.getlistData()
      },
      handleChange(val){
        if(val ==1){

        }
      },
            //下载pdf
      downloadPdf(){
        alert(1)
        let _this = this
          let  params = {
          picture1: '',
          picture2: '',
          picture3: '',
          picture4: '',
          picture5: '',
          picture6: '',
        }
        let picture1 = new Promise((resolve,reject)=> {
          let data = _this.$refs.picture1
          visitFun.getImgBase64(data).then((res)=>{
            params.picture1 = res.split(',')[1]
            resolve(true)
          })
        })
        let picture2 = new Promise((resolve,reject)=> {
          let data = _this.$refs.picture2
          visitFun.getImgBase64(data).then((res)=>{
            params.picture2 = res.split(',')[1]
            resolve(true)
          })
        })
        let picture3 = new Promise((resolve,reject)=> {
          let data = _this.$refs.picture3
          visitFun.getImgBase64(data).then((res)=>{
            params.picture3 = res.split(',')[1]
            resolve(true)
          })
        })
        let picture4 = new Promise((resolve,reject)=> {
          let data = _this.$refs.picture4
          visitFun.getImgBase64(data).then((res)=>{
            params.picture4 = res.split(',')[1]
            resolve(true)
          })
        })

        Promise.all([picture1,picture2,picture3,picture4]).then(()=> {
          this.axios(visitFun.settingParameters('post',"/paper/pdf",params)).then((res) => {
              if (res.data.code == 200) {
                  window.location.href=res.data.data.fileDownUrl;
              }
          });
        })
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
        if(!this.conditionType){
          // if(val == 1){
          //   this.searchIcon = this.searchImgHover
          // }else if(val == 2){
          //   this.searchIcon = this.searchImg
          // }else if(val == 3){
          //   this.downloadIcon = this.downloadImgHover
          // }else if(val == 4){
          //   this.downloadIcon = this.downloadImg
          // }else if(val == 5){
          //   this.emptyIcon = this.emptyIconSelect
          // }else if(val == 6){
          //   this.emptyIcon = this.emptyIconDefault
          // }
        }
      },
      handleShutdown(){
        this.isSlide = false
      },
      handleOpenUp(){
        this.isSlide = true
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
        this.globalArea = ''
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
      //条件清空
      emptyParams2(){
        this.globalArea2 = ''
        this.params2 = {
          'mq_authors.zhName':'',     //姓名
          'mq_category':'',     //学科
          'mq_organizations.city':'',          //城市
          'mq_organizations.continent':'',     //大洲
          'mq_organizations.country':'',       //国家
          'mn_organizations.zhOrgName':'',     //国外机构
          'mq_organizations.zhOrgName':'',     //院内机构
          'mq_year':'',     //年份
          'order_dir':'desc',                     //排序方向（降序 asc 升序 desc）
          'page_limit':60,                     //行数
          'page_offset':1,                   //页码
          'sort_sort':'date',                      //排序字段
        }
        this.threeLevelSearch(2)
      },
      //二级搜索
      secondarySearch(){
        if(this.globalArea != ''){
          this.params['continentSelect'] = ''
          this.params['countrySelect'] = ''
          this.params['citySelect'] = ''
          let length = this.globalArea.length
          if(length == 1){
            this.params['continentSelect'] = this.globalArea[length-1].split('-')[1]
          }else if(length == 2){
            this.params['countrySelect'] = this.globalArea[length-1].split('-')[1]
          }else if(length == 3){
            this.params['citySelect'] = this.globalArea[length-1].split('-')[1]
          }
        }
        this.secondLevelSearch()
      },

      //二级搜索
      secondLevelSearch(){
        this.getMapData()
        this.getInstituteMapData()
        this.getpaperYearData()
        this.getWorldCloud()
        this.getrankData()

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

      // 获取列表数据
      getlistData() {
        let that = this
        this.loading = true
        let newParams = {}
        if(this.isSearchName){
          newParams = {
            'mq_authors.zhName':this.params2['mq_authors.zhName'],     //作者姓名
            'mq_researchField':'',     //学科
            'mq_organizations.city':'',          //城市
            'mq_organizations.continent':'',     //大洲
            'mq_organizations.country':'',       //国家
            'mn_organizations.zhOrgName':'',     //国外机构
            'mq_organizations.zhOrgName':'',     //院内机构
            'mq_year':'',     //年份
            'order_dir':'desc',                     //排序方向（降序 asc 升序 desc）
            'page_limit':this.params2.page_limit,                     //行数
            'page_offset':this.params2.page_offset,                   //页码
            'sort_sort':this.params2.sort_sort,                      //排序字段
          }
        }else{
          //根据globalArea2值来判断洲，国家，城市的值
          if(this.globalArea != ''){
            this.params2['mq_organizations.continent'] = ''
            this.params2['mq_organizations.country'] = ''
            this.params2['mq_organizations.city'] = ''
            let length = this.globalArea.length
            if(length == 1){
              this.params2['mq_organizations.continent'] = this.globalArea[length-1].split('-')[1]
            }else if(length == 2){
              this.params2['mq_organizations.country'] = this.globalArea[length-1].split('-')[1]
            }else if(length == 3){
              this.params2['mq_organizations.city'] = this.globalArea[length-1].split('-')[1]
            }
          }

          newParams = JSON.parse(JSON.stringify(this.params2))
          if(newParams['mq_organizations.country'] != ''){
            newParams['mq_organizations.country'] = newParams['mq_organizations.country'].split('/')[0]
          }
          delete newParams.mq_category;
          newParams['mq_researchField'] =  this.params2.mq_category?this.params2.mq_category:''
        }
        this.axios({
          method: 'POST',
          url: '/paper/statistic/list',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: [
            function () {
              let ret = ''
              for (let it in newParams) {
                ret +=
                  encodeURIComponent(it) + '=' + encodeURIComponent(newParams[it]) + '&'
              }
              return ret
            }
          ]
        }).then((res) => {
          if (res.data.code == 200) {
            this.paperTableData = res.data.data.data.content
            this.paperTableData.forEach((item,index)=>{
              if(item.authors.length > 0){
                let arr = []
                item.authors.forEach((subitem,subindex)=>{
                  arr.push(subitem.zhName)
                })
                item.autherTotal = arr.join('   ,   ')
              }else{
                item.autherTotal = ''
              }

            })

            this.totalNum = res.data.data.data.count
            this.pageNum = this.totalNum>9940?9940:this.totalNum
            this.loading = false
          }
        });
      },


      // 获取地图数据
      getMapData() {
        this.bottomCenterLoading = true
        // this.axios.post("/paper/statistic/global", ).then((res) => {
        //   if (res.data.code == 200) {
        //     let object = {}
        //     res.data.data.countryLocationList.forEach((item,index)=>{
        //       let key = Object.keys(item)[0]
        //       let value = item[key]
        //       if(key != '中国'){
        //         object[key] = value
        //       }
        //     })
        //     let newObject = visitFun.correctLocation(object)
        //     // res.data.data.countryList.splice(0,1)
        //     this.IdentityGlobalData = {
        //       geoCoordMap: newObject,  // 国家经纬度
        //       data: res.data.data.countryList,    // 没个国家的数量
        //     };
        //     this.bottomCenterLoading = false
        //
        //   }
        // });

        let params = {
          'mq_organizations.city': this.params.citySelect,   //城市
          'mq_organizations.continent': this.params.continentSelect,  //大洲
          'mq_organizations.country': this.params.countrySelect.split('/')[0],  //国家
          'mn_organizations.zhOrgName': this.params.foreignOrgSelect,        //国外机构
          'mq_researchFields': this.params.subjectSelect,  //学科
          'mq_year': this.params.yearSelect,  //年份
          'mq_organizations.zhOrgName': this.params.orgSelect,  //院内机构
        }
        this.axios(visitFun.settingParameters('post','/paper/statistic/global',params)).then((res) => {
          if (res.data.code == 200) {
            let object = {}
            res.data.data.countryLocationList.forEach((item,index)=>{
              let key = Object.keys(item)[0]
              let value = item[key]
              if(key != '中国'){
                object[key] = value
              }
            })
            let newObject = visitFun.correctLocation(object)
            // res.data.data.countryList.splice(0,1)
            this.IdentityGlobalData = {
              geoCoordMap: newObject,  // 国家经纬度
              data: res.data.data.countryList,    // 没个国家的数量
            };
            this.bottomCenterLoading = false
          }
        });

      },

      // 获取院所分布数据
      getInstituteMapData() {
        let params = {
          'mq_organizations.city': this.params.citySelect,   //城市
            'mq_organizations.continent': this.params.continentSelect,  //大洲
            'mq_organizations.country': this.params.countrySelect.split('/')[0],  //国家
            'mn_organizations.zhOrgName': this.params.foreignOrgSelect,        //国外机构
            'mq_researchFields': this.params.subjectSelect,  //学科
            'mq_year': this.params.yearSelect,  //年份
            'mq_organizations.zhOrgName': this.params.orgSelect,  //院内机构
        }

        this.axios(visitFun.settingParameters('post','/paper/statistic/org',params)).then((res) => {
          if (res.data.code == 200) {
            let data = {
              cityLongAndLat:[{}],
              org:[],
              cityCount:[],
            }
            let cityCount = []

            res.data.data.nodeLocationList.forEach((item,index)=>{
              cityCount.push({
                name:item.city,
                value:item.count,
              })
              let key = item.city
              let value = item.location
              data.cityLongAndLat[0][key] = value
            })
            cityCount.sort(function(a,b){
              return b.value -  a.value
            })
            data.cityCount = cityCount
            res.data.data.nodeList.forEach((item,index)=>{
              data.org.push({
                name:item.orgName,
                value:item.count,
                source:item.city
              })
            })
            this.InstituteImportData = {
              data: data,
              city: this.params.citySelect,   //城市
              continent: this.params.continentSelect,  //大洲
              country: this.params.countrySelect,  //国家
              enOrg: this.params.foreignOrgSelect,        //国外机构
              subject: this.params.subjectSelect,  //学科
              year: this.params.yearSelect,  //年份
              zhOrg: this.params.orgSelect,  //院内机构
            };
            this.bottomCenterLoading = false
          }
        });
      },


      //左上
      getpaperYearData() {
        this.leftTopLoading = true

        let params = {
          'mq_organizations.city': this.params.citySelect,   //城市
            'mq_organizations.continent': this.params.continentSelect,  //大洲
            'mq_organizations.country': this.params.countrySelect.split('/')[0],  //国家
            'mn_organizations.zhOrgName': this.params.foreignOrgSelect,        //国外机构
            'mq_researchField': this.params.subjectSelect,  //学科
            'mq_year': this.params.yearSelect,  //年份
            'mq_organizations.zhOrgName': this.params.orgSelect,  //院内机构
        }
        this.axios(visitFun.settingParameters('post','/paper/statistic/paperYear',params)).then((res) => {
          if (res.data.code == 200) {
            this.paperYearData = res.data.data
            this.leftTopLoading = false
          }
        });
      },


      //右上 学科
      getsubjectData() {
        this.rightTopLoading = true
        return new Promise((resolve,reject)=>{
          let params = {
            'mq_organizations.city': this.params.citySelect,   //城市
              'mq_organizations.continent': this.params.continentSelect,  //大洲
              'mq_organizations.country': this.params.countrySelect.split('/')[0],  //国家
              'mn_organizations.zhOrgName': this.params.foreignOrgSelect,        //国外机构
              'mq_researchField': this.params.subjectSelect,  //学科
              'mq_year': this.params.yearSelect,  //年份
              'mq_organizations.zhOrgName': this.params.orgSelect,  //院内机构
          }
          this.axios(visitFun.settingParameters('post','/paper/statistic/subject',params)).then((res) => {
            if (res.data.code == 200) {
              let arr = []
              let data = res.data.data
              res.data.data.xData.forEach((item,index)=>{
                arr.push({
                  name:item,
                  value:res.data.data.seriesData[index]
                })
              })
              this.subjectData = arr
              resolve(true)
            }
          });
        })
      },
      //词云
      async getWorldCloud(){
        let _this = this
        let result = await this.getsubjectData()
        if(result){
          this.axios({
              method: 'POST',
              url: '/paper/statistic/cloud',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              transformRequest: [
                function () {
                  let params = {
                      'mq_organizations.city': _this.params.citySelect,   //城市
                      'mq_organizations.continent': _this.params.continentSelect,  //大洲
                      'mq_organizations.country': _this.params.countrySelect.split('/')[0],  //国家
                      'mn_organizations.zhOrgName': _this.params.foreignOrgSelect,        //国外机构
                      'mq_researchFields': '物理学',  //学科
                      'mq_year': _this.params.yearSelect,  //年份
                      'mq_organizations.zhOrgName': _this.params.orgSelect,  //院内机构
                      'limit':'15'
                    }
                  let ret = ''
                  for (let it in params) {
                    ret +=
                      encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
                  }
                  return ret
                }
              ]
          }).then((res) => {
            if (res.data.code == 200) {
              this.TopicSubject = {
                subjectData: this.subjectData,
                subjectTWO: res.data.data,
                city: this.params.citySelect,   //城市
                continent: this.params.continentSelect,  //大洲
                country: this.params.countrySelect.split('/')[0],  //国家
                enOrg: this.params.foreignOrgSelect,        //国外机构
                subject: this.params.subjectSelect,  //学科
                year: this.params.yearSelect,  //年份
                zhOrg: this.params.orgSelect,  //院内机构
              };
              this.rightTopLoading = false
            }
          });
        }
      },
      //左中
      getrankData() {
        this.leftCenterLoading = true
        let _this = this
        this.axios( {
          method: 'POST',
          url: '/paper/statistic/rank',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: [
            function () {
              let params =  {
                'mq_organizations.city': _this.params.citySelect,   //城市
                  'mq_organizations.continent': _this.params.continentSelect,  //大洲
                  'mq_organizations.country': _this.params.countrySelect.split('/')[0],  //国家
                  'mn_organizations.zhOrgName': _this.params.foreignOrgSelect,        //国外机构
                  'mq_researchField': _this.params.subjectSelect,  //学科
                  'mq_year': _this.params.yearSelect,  //年份
                  'mq_organizations.zhOrgName': _this.params.orgSelect,  //院内机构
                  'limit':'10',
              }
              let ret = ''
              for (let it in params) {
                ret +=
                  encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
              }
              return ret
            }
          ]
        }).then((res) => {
          if (res.data.code == 200) {
            this.personRankingData = res.data.data
            this.leftCenterLoading = false
          }
        });
      },


      changePage(val){
        this.params2.page_offset = val
        this.threeLevelSearch(2)
      },

      // 进入国才详情页
      toPersonDetail(val) {
        if(val){
          this.$router.push({
            path: "/domesticPersonnelInfor",
            query: { id: val },
          });
        }else{
          alert('获取不到人员id，请检查数据是否完整！')
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
  @import "../../assets/css/paper/index.less";
  .exchangeCon{

  }
</style>
