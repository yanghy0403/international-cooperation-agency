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
        <div ><router-link tag="li" to="/analysis">统计与分析</router-link></div>
        <div class="navActive"><router-link tag="li" to="/inquire">论文查询</router-link></div>


      </div>
      <div class="ex-btm" @click="lastPage">
        <div class="iconfontClose">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="closeName">返回上一页</div>
      </div>
    </div>

    <div  class="ex-right2" >
      <!--<div class="fr-reel-close">-->
        <!--<div  class="right-icon "></div>-->
      <!--</div>-->
      <div class="personList" >
        <div class="breadCrumbs">
          <ul>
            <li>合作论文</li>
            <li>/</li>
            <li>论文查询</li>
            <li>/</li>
          </ul>
        </div>
        <div class=" personHeaderNew1" style="display: flex">
          <div class="personTitleName">2015年到2019年，中科院与世界各国合作发表科研论文 <span>{{titleNum}}</span> 篇 </div>

          <Login />
        </div>
        <div class="personHeader">
          <div class="personList-FilterCondition-inpuire ">
            <ul>
              <li class="reel-filterCondition_1_li">
                <el-input v-model="newParams['mq_title']" placeholder="请输入论文题目"></el-input>
              </li>
              <li class="reel-filterCondition_1_li">
                <el-input v-model="newParams['mq_authors.zhName']" placeholder="请输入作者姓名"></el-input>
              </li>
              <li class="reel-filterCondition_1_li">
                <!--<el-input v-model="input" placeholder="请输入机构名称"></el-input>-->
                <el-select filterable  v-model="newParams['mq_organizations.zhOrgName']" clearable  placeholder="请输入机构名称">
                  <el-option
                    v-for="item in orgAll"
                    :key="item.index"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </li>
              <li class="reel-filterCondition_1_li">
               <el-input v-model="newParams['mq_keyword']" placeholder="请输入关键词"></el-input>
              </li>
              <li class="reel-filterCondition_1_li">
                 <!--<el-input v-model="input" placeholder="请输入年份"></el-input>-->
                <el-tooltip class="item" effect="light" content="连续年份请用 - 隔开,例如：2010-2019;不连续年份请用;隔开，例如:2010;2019" placement="top">
                  <el-input  v-model="newParams['mq_year']"  placeholder="请输入年份"></el-input>
                </el-tooltip>
              </li>
              <li class="reel-filterCondition_1_li">
                <el-select
                  v-model="newParams['mq_source']"
                  :remote-method="filterMethod"
                  clearable
                  remote
                  filterable
                  :loading="selentLoading"
                  placeholder="请输入期刊名称">
                  <el-option
                    v-for="item in journalAll"
                    :key="item.index"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </li>
            </ul>
          </div>
          <div class="paramsinpuireSearchDiv">
            <div :style="{background:conditionType?'#ff3a25':'#f1f3f6'}" class="personSearch" @mouseenter="clickHover(1)" @mouseleave="clickHover(2)" @click="threeLevelSearch">
              <img :src="searchIcon" alt="">
            </div>
            <!--<div class="personReast iconfont icon-fanhui1" @click="emptyParams2"></div>-->
            <div :style="{background:conditionType?'#ff3a25':'#f1f3f6'}" class="personReast " @mouseenter="clickHover(5)" @mouseleave="clickHover(6)" @click="emptyParams2">
              <img :src="emptyIcon" alt="">
            </div>
            <div :style="{background:conditionType?'#ff3a25':'#f1f3f6' , color:conditionType?'#fff':'#727272'}"  class="personDownload" @mouseenter="clickHover(3)" @mouseleave="clickHover(4)">
              <img :src="downloadIcon" alt="">
            </div>
          </div>

        </div>
        <div class="listTabs">
          <el-select size="mini" v-model="newParams['sort_sort']" value="综合排序" clearable  placeholder="请选择院内机构">
            <el-option label="综合排序" value="timesCited">  </el-option>
            <el-option label="按照时间排序" value="date"> </el-option>
          </el-select>

          <p class="personTotal">
            检索到
            <label>{{totalNum}}</label>条结果
          </p>
        </div>
        <div style=""  class="tableList globaltableScroll" v-loading="loading" element-loading-text="加载中...">
          <Table
            class=""
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
              :current.sync="newParams.page_offset"
              :page-size="newParams.page_limit"
              @on-change="changePage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  //引入js
  import visitFun from '@/assets/js/visit.js'
  import Axios from "axios";
  export default {
    components: {

    },
    data(){
      return{
        tableHeight:window.innerHeight-420,
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
        searchIcon: require("../../assets/images/exchange/筛选4.png"),
        searchImgHover: require("../../assets/images/exchange/筛选3.png"),
        downloadImg: require("../../assets/images/exchange/导出图标（默认）2.png"),
        downloadIcon: require("../../assets/images/exchange/导出图标（默认）2.png"),
        downloadImgHover: require("../../assets/images/exchange/导出图标（选中）2.png"),
        emptyIcon: require("../../assets/images/exchange/clearDefault.png"),
        emptyIconDefault: require("../../assets/images/exchange/clearDefault.png"),
        emptyIconSelect: require("../../assets/images/exchange/clearSelected.png"),
        params2:{
          orgSelect:'',  //院内机构
          yearSelect:'', //年份
          continentSelect:'', //大洲
          countrySelect:'', //国家
          citySelect:'', //城市
          foreignOrgSelect:'', //国外机构
          subjectSelect:'', //学科
          limit:60,
          offset:1,
        },
        newParams:{
          'mq_authors.zhName':'',     //作者姓名
          'mq_keyword':'',                //关键词
          'mq_organizations.zhOrgName':'',    //机构名称
          'mq_source':'',                     //期刊名称
          'mq_title':'',                      //论文题目
          'mq_year':'',                        //输入年份
          'order_dir':'desc',                     //排序方向（降序 asc 升序 desc）
          'page_limit':60,                     //行数
          'page_offset':1,                   //页码
          'sort_sort':'date',                      //排序字段

        },
        loading:true,
        selentLoading:false,
        TopicFounding:{
          countByYear:{},
          tableData:[],
        },
        TopicSubject:{},
        personRankingData:{},
        orgRankingData:{},
        TopicpersonList:{},
        paperTableData:[],
        tableTitle:[],

        orgAll:[],
        journalAll:[],
        countriesAll:[],
        cityAll:[],
        foreignOrgAll:[
          {
            value:'',
            label:'',
          }, {
            value:'',
            label:'',
          },
        ],
        subjectAll:[],
        // 出访人员列表
        columns1: visitFun.inpuireTable,
        globalArea:'',
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
              }
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成

          }
        },

        totalNum:'',
        pageNum:'',
        titleNum:'',
        conditionType:false,
      }
    },
    watch:{
      newParams: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          if(val['mq_authors.zhName'] == '' && val['mq_title'] == '' && val['mq_organizations.zhOrgName'] == '' && val['mq_keyword'] == '' && val['mq_year'] == '' && val['mq_source'] == ''  ){
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
    },
    mounted(){
      visitFun.getInstitutionsInTheHospital(data=>{this.orgAll = data})

      visitFun.handleSubject(data=>{this.subjectAll = data})

      this.getAllFun()
      this.getTotalNum()
      this.getjournal() //获取期刊

    },
    methods:{
      getAllFun(){

        //三级
        this.getlistData()
      },
      handleChange(val){
        if(val ==1){

        }
      },
      filterMethod(query){
        alert(1)
        let that = this
        if (query !== '') {
          that.selentLoading = true;
          setTimeout(() => {
            that.selentLoading = false;
            let params = `${query}`
            that.axios.get(`/paper/journal?journalName=${params}`)
              .then(res => {
                if (res.data.code == 200) {
                  that.journalAll = res.data.data
                }
              });
          }, 20);
        } else {
          that.journalAll = [];
        }
      },
      getjournal(){
        let params = this.newParams.mq_source
        this.axios.get(`/paper/journal?journalName=${params}`)
          .then(res => {
            if (res.data.code == 200) {
              this.journalAll = res.data.data
            }

          });
      },

      getTotalNum(){
        this.axios.get(`/paper/count`)
          .then(res => {
            if (res.data.code == 200) {
              this.titleNum = res.data.data
            }
          });
      },


      //鼠标滑入改变图标
      clickHover(val){
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
      emptyParams2(){
        this.newParams = {
          'mq_authors.zhName':'',     //作者姓名
            'mq_keyword':'',                //关键词
            'mq_organizations.zhOrgName':'',    //机构名称
            'mq_source':'',                     //期刊名称
            'mq_title':'',                      //论文题目
            'mq_year':'',                        //输入年份
            'order_dir':'desc',                     //排序方向（降序 asc 升序 desc）
            'page_limit':60,                     //行数
            'page_offset':1,                   //页码
            'sort_sort':'date',                      //排序字段

        }
        this.threeLevelSearch()
      },

      //三级搜索
      threeLevelSearch(){
        this.getlistData()
      },


      // 获取出访数据
      getlistData() {
        let that = this
        this.loading = true
        this.axios({
          method: 'POST',
            url: '/paper/list',
          headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
          transformRequest: [
            function () {
              let ret = ''
              for (let it in that.newParams) {
                ret +=
                  encodeURIComponent(it) + '=' + encodeURIComponent(that.newParams[it]) + '&'
              }
              return ret
            }
          ]
        }).then((res) => {
          if (res.data.code == 200) {
            this.paperTableData = res.data.data.content
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

            this.totalNum = res.data.data.count
            this.pageNum = res.data.data.count>9940?9940:res.data.data.count
            this.loading = false
          }
        });
      },


      changePage(val){
        this.params2.offset = val
        this.threeLevelSearch()
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
