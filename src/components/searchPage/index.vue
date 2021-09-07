<template>
  <div class="container">
    <header ref="headerDiv" class="headerCon">
      <div class="logo" @click="handleClose">
        <div><img :src="logoImg" alt=""></div>
        <div>
          <p>中国科学院国际合作</p>
          <p>数据汇交与分析平台</p>
        </div>
      </div>
      <div class="condition">
        <div class="personList-FilterCondition">
          <ul>
            <li style="margin-right: 1px;" class="reel-filterCondition_1_li">
              <el-tooltip class="item" effect="light" content="连续年份请用 - 隔开,例如：2010-2019;不连续年份请用;隔开，例如:2010;2019" placement="top">
                <el-input  v-model="params['mq_year']"  placeholder="请输入年份"></el-input>
              </el-tooltip>
            </li>
            <li style="margin-right: 1px;" class="reel-filterCondition_1_li">
              <el-select clearable @change="changecontinent" v-model="params['continent']" :disabled="regionStatus[0].status" placeholder="请选择大洲">
                <el-option
                  v-for="item in areaoptions"
                  :key="item.index"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </li>
            <li style="margin-right: 1px;" class="reel-filterCondition_1_li">
              <el-select  @change="changeCountry" filterable clearable v-model="params['country']" :disabled="regionStatus[1].status" placeholder="请选择国家或地区">
                <el-option
                  v-for="item in countriesAll"
                  :key="item.index"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li style="margin-right: 1px;" class="reel-filterCondition_1_li">
              <el-select @change="changeCity" filterable clearable v-model="params['city']" :disabled="regionStatus[2].status" placeholder="请选择城市">
                <el-option
                  v-for="item in cityAll"
                  :key="item.index"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li style="margin-right: 1px;" class="reel-filterCondition_1_li">
              <el-select filterable clearable v-model="params['org']" placeholder="请选择机构">
                <el-option
                  v-for="item in orgAll"
                  :key="item.index"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </li>
            <li style="margin-right: 1px;" class="reel-filterCondition_1_li">
              <el-select filterable clearable v-model="params['mq_subject']" placeholder="请选择学科">
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
          <div :style="{background:conditionType2?'#ff3a25':'#f1f3f6',border:conditionType2?'none':'1px solid #d9dde4'}"  class="personSearch"  @click="threeLevelSearch">
            <img :src="searchIcon" alt="">
          </div>
          <div :style="{background:conditionType2?'#ff3a25':'#f1f3f6',border:conditionType2?'none':'1px solid #d9dde4'}"  class="personReast "  @click="emptyParams">
            <img :src="emptyIcon" alt="">
          </div>
        </div>
      </div>
      <Login />
    </header>
    <nav class="navCon">
      <div class="navCenter">
        <div class="firstRow">
          <div>已选条件</div>
          <div>
            <p v-if="params2['mq_year']">{{params2['mq_year']}} <i @click="cloneI(1)" class="el-icon-close"></i></p>
            <p v-if="params2['continent']">{{params2['continent']}} <i @click="cloneI(2)" class="el-icon-close"></i></p>
            <p v-if="params2['country']">{{params2['country']}} <i @click="cloneI(3)" class="el-icon-close"></i></p>
            <p v-if="params2['city']">{{params2['city']}} <i @click="cloneI(6)" class="el-icon-close"></i></p>
            <p v-if="params2['org']">{{params2['org']}} <i @click="cloneI(4)" class="el-icon-close"></i></p>
            <p v-if="params2['mq_subject']">{{params2['mq_subject']}} <i @click="cloneI(5)" class="el-icon-close"></i></p>
          </div>
          <div  @click="cloneI(0)"><img v-show="deleteIcon" src="../../assets/images/searchPage/empty.png" alt=""></div>
          <div  @click="lastPage">返回上级</div>
        </div>

        <div class="secondRow" >{{title}}</div>
        <div class="theThirdRow">
          <div class="title">检索结果</div>
          <div class="center">
            <p>{{subtitle}} </p>
            <!-- <p v-if="params2['continent']">{{params2['continent']}}/ </p>
            <p v-if="params2['country']">{{params2['country']}} / </p>
            <p v-if="params2['city']">{{params2['city']}} / </p>
            <p v-if="params2['org']">{{params2['org']}} / </p>
            <p v-if="params2['mq_subject']">{{params2['mq_subject']}} </p> -->
          </div>
          <div class="searchImg">
            <div @click="downloadPdf"></div>
            <div @click="favorites"></div>
          </div>
        </div>
      </div>
    </nav>
    <section>
      <div ref="sectionAside" class="sectionAside"></div>
      <div class="secContainer">
        <div class="sectionItem" ref="picture1">
          <leftOne
            v-loading="leftOneLoading"
            :data="leftOneData"
            element-loading-text="加载中..."
          ></leftOne>
        </div>
        <div class="sectionItem" ref="picture2">
          <rightOne
            :data="TopicFounding"
            v-loading="rightOneLoading"
            element-loading-text="加载中..."
          ></rightOne>
        </div>
        <div class="sectionItem" ref="picture3">
          <leftTwo
            :data="rightTopData"
            v-loading="leftTwoLoading"
            element-loading-text="加载中..."
          ></leftTwo>
        </div>
        <div class="sectionItem" ref="picture4">
          <rightTwo
            v-loading="rightTwoLoading"
            :data="rightTwoData"
            element-loading-text="加载中..."
          ></rightTwo>
        </div>
        <div class="sectionItem" ref="picture5">
          <leftThree
            :data="leftThreeData"
            v-loading="leftThreeLoading"
            element-loading-text="加载中..."
          ></leftThree>
        </div>
        <div class="sectionItem" ref="picture6">
          <rightThree
            v-loading="rightThreeLoading"
            :data="rightThreeData"
            element-loading-text="加载中..."
          ></rightThree>
        </div>
        <div class="sectionItem" ref="picture7">
          <leftFour
            v-loading="leftFourLoading"
            :data="leftFourData"
            element-loading-text="加载中..."
          ></leftFour>
        </div>
        <div class="sectionItem" ref="picture8">
          <rightFour
            v-loading="rightFourLoading"
            :data="personRankingData"
            element-loading-text="加载中..."
          ></rightFour>
        </div>
      </div>
      <div class="sectionAside">

      </div>
    </section>

    <footer>
      <div>中国科学院国际合作局  版权所有  |  技术支持：中国科学院计算机网络信息中心</div>
    </footer>
  </div>
</template>
<script>
  import visitFun from '@/assets/js/visit.js'
  import leftOne from "./modules/leftOne";
  import leftTwo from "./modules/leftTwo";
  import leftThree from "./modules/leftThree";
  import leftFour from "./modules/leftFour";
  import rightOne from "./modules/rightOne";
  import rightTwo from "./modules/rightTwo";
  import rightThree from "./modules/rightThree";
  import rightFour from "./modules/rightFour";
  const imgBase = ''
  export default {
    components: {
      leftOne,
      leftTwo,
      leftThree,
      leftFour,
      rightOne,
      rightTwo,
      rightFour,
      rightThree,
    },
    data(){
      return{
        signImg:require('../../assets/images/固定图标/用户按钮-默认状态.png'),
        logoImg:require('../../assets/images/固定图标/logo.png'),
        emptyIcon: require("../../assets/images/exchange/clearDefault.png"),
        emptyIcon2: require("../../assets/images/exchange/clearDefault.png"),
        emptyIconDefault: require("../../assets/images/exchange/clearDefault.png"),
        emptyIconSelect: require("../../assets/images/exchange/clearSelected.png"),
        searchImg: require("../../assets/images/exchange/筛选4.png"),
        searchIcon2: require("../../assets/images/exchange/筛选4.png"),
        searchIcon: require("../../assets/images/exchange/筛选4.png"),
        searchImgHover: require("../../assets/images/exchange/筛选3.png"),
        footerLogo: require("../../assets/images/固定图标/事业单位标志.png"),
        pictures:{

        },
        params:{
          org:'',  //院内机构
          mq_year:'', //年份
          continent:'', //大洲
          country:'', //国家
          mq_subject:'', //学科
          city:'', //城市
        },
        params2:{
          org:'',  //院内机构
          mq_year:'', //年份
          continent:'', //大洲
          country:'', //国家
          mq_subject:'', //学科
          city:'', //城市
        },
        regionStatus:[
          {
            name:'continentStatus',
            tStatus:false,
          },    {
            name:'countryStatus',
            tStatus:false,
          },    {
            name:'cityStatus',
            tStatus:false,
          },
        ],
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
        countriesAll:[],
        cityAll:[],
        subjectAll:[],
        orgAll:[],
        conditionType2:false,
        leftOneLoading:true,
        rightOneLoading:true,
        leftTwoLoading:true,
        rightTwoLoading:true,
        leftThreeLoading:true,
        leftFourLoading:true,
        rightThreeLoading:true,
        rightFourLoading:true,
        headerHeight:0,
        asideHeight:0,
        TopicFounding:{
          countByYear:{},
          tableData:[],
        },
        leftOneData:{},
        rightTopData:{},
        rightTwoData:{},
        rightFourData:{},
        leftFourData:{},
        rightThreeData:{},
        leftThreeData:{},
        personRankingData:{},
        deleteIcon:false,
        title:'',
        subtitle:'',

      }
    },
    watch:{
      params: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          if(val.org == '' && val.mq_year == '' && val.continent == '' && val.country == '' && val.mq_subject == ''&& val.city == ''  ){
            this.conditionType2 = false
            this.searchIcon = this.searchImg
            this.emptyIcon = this.emptyIconDefault
            this.deleteIcon = false
          }else{
            this.conditionType2 = true
            this.searchIcon = this.searchImgHover
            this.emptyIcon = this.emptyIconSelect
            this.deleteIcon = true
          }
        }
      },
      params2: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          let arr = []
          if(val.org != ''){
            this.title = val.org
            arr = [val.mq_year , val.mq_subject, val.continent, val.country, val.city]
            let r = arr.filter(function (s) {
              return s != ''; // 注：IE9(不包含IE9)以下的版本没有trim()方法
            });
           this.subtitle = r.join('/')
          }
          else if(val.city != ''){
            this.title = val.city
            arr = [val.mq_year , val.mq_subject, val.continent, val.country, ]
            let r = arr.filter(function (s) {
              return s != ''; // 注：IE9(不包含IE9)以下的版本没有trim()方法
            });
           this.subtitle = r.join('/')
          }
          else if(val.country != ''){
            this.title = val.country
            arr = [val.mq_year , val.mq_subject, val.continent]
            let r = arr.filter(function (s) {
              return s != ''; // 注：IE9(不包含IE9)以下的版本没有trim()方法
            });
           this.subtitle = r.join('/')
          }
          else if(val.continent != ''){
             this.title = val.continent
            arr = [val.mq_year , val.mq_subject ]
            let r = arr.filter(function (s) {
              return s != ''; // 注：IE9(不包含IE9)以下的版本没有trim()方法
            });
           this.subtitle = r.join('/')
          }
          else if(val.mq_subject != ''){
            this.title = val.mq_subject
            arr = [val.mq_year]
            let r = arr.filter(function (s) {
              return s != ''; // 注：IE9(不包含IE9)以下的版本没有trim()方法
            });
           this.subtitle = r.join('/')
          }
          else if(val.mq_year != ''){
            this.title = val.mq_year
           this.subtitle = ''
          }else{
            this.title = ''
           this.subtitle = ''
          }

        }
      },
    },
    mounted(){
      this.headerHeight = this.$refs.headerDiv.clientHeight
      this.asideHeight = this.$refs.sectionAside.clientWidth

      let querysubject = this.$route.query.subject
      if(this.$route.query.country){
        let querycountry = this.$route.query.country
        this.params.country = querycountry
      }
      if(this.$route.query.org){
        let queryorg = this.$route.query.org
        this.params.org = queryorg
      }

      if(this.$route.query.subject){
        let querysubject = this.$route.query.subject
        this.params.mq_subject = querysubject
      }

      if(this.$route.query.city){
        let city = this.$route.query.city
        this.params.city = city
      }
      if(this.$route.query.favoritesData){
        let val = this.$route.query.favoritesData
        this.params = {
          org:val.split('-')[3],  //院内机构
          mq_year:val.split('-')[0], //年份
          continent:val.split('-')[1], //大洲
          country:val.split('-')[2], //国家
          mq_subject:val.split('-')[4], //学科
          city:val.split('-')[5], //学科
        }
      }

      this.getOrgData()
      visitFun.handleCountry(data=>{this.countriesAll = data})
      visitFun.handleSubject(data=>{this.subjectAll = data})
      this.getCityAll('')
      this.threeLevelSearch()
    },
    methods:{
      // 收藏
      favorites(){
        let userId = 'admin'
        let arr = []
        let newArr = []
        arr.push(this.params2.continent)
        arr.push(this.params2.country)
        arr.push(this.params2.city)
        arr.push(this.params2.mq_year)
        arr.push(this.params2.org)
        arr.push(this.params2.mq_subject)
        //console.log(arr)
        for(let i = 0;i<arr.length;i++){
          if(arr[i]==''||arr[i]==null||typeof(arr[i])==undefined){
            arr.splice(i,1);
            i=i-1;
          }
        }
        //console.log(arr)

        let type = '全部类型'
        if(this.params2.city != ''){
          type = '城市'
        }
        if(this.params2.country != ''){
          type = '国家'
        }
        if(this.params2.mq_subject != ''){
          type = '学科领域'
        }
        let content = `综合查询-${arr.join('-')}@${this.params2.mq_year}-${this.params2.continent}-${this.params2.country}-${this.params2.org}-${this.params2.mq_subject}-${this.params2.city}`
        visitFun.favoritesFun(userId,type,content)
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
      //下载pdf
      downloadPdf(){
        let _this = this
          let  params = {
          category: this.params.mq_subject,
          city: this.params.city,
          continent: this.params.continent,
          country: this.params.country,
          org: this.params.org,
          year: this.params.mq_year,
          picture1: '',
          picture2: '',
          picture3: '',
          picture4: '',
          picture5: '',
          picture6: '',
          picture7: '',
          picture8: '',
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
        let picture5 = new Promise((resolve,reject)=> {
          let data = _this.$refs.picture5
          visitFun.getImgBase64(data).then((res)=>{
            params.picture5 = res.split(',')[1]
            resolve(true)
          })
        })
        let picture6 = new Promise((resolve,reject)=> {
          let data = _this.$refs.picture6
          visitFun.getImgBase64(data).then((res)=>{
            params.picture6 = res.split(',')[1]
            resolve(true)
          })
        })
        let picture7 = new Promise((resolve,reject)=> {
          let data = _this.$refs.picture7
          visitFun.getImgBase64(data).then((res)=>{
            params.picture7 = res.split(',')[1]
            resolve(true)
          })
        })
        let picture8 = new Promise((resolve,reject)=> {
          let data = _this.$refs.picture8
          visitFun.newgetImgBase64(data).then((res)=>{
            params.picture8 = res.split(',')[1]
            resolve(true)
          })
        })

        Promise.all([picture1,picture2,picture3,picture4,picture5,picture6,picture7,picture8]).then(()=> {
        this.axios(visitFun.settingParameters('post',"/bic/export",params)).then((res) => {
          if (res.data.code == 200) {
              window.location.href=res.data.data.fileDownUrl;
          }
        });
        })
      },

      changeCountry(val){
        if(val == ''){
          this.regionStatus[0].status = false
        }else{
          this.regionStatus[0].status = true
          this.params.continent = ''
        }

        this.getCityAll(val)
      },
      changeCity(val){
        if(val == ''){
          this.regionStatus[0].status = false
          this.regionStatus[1].status = false
        }else{
          this.regionStatus[0].status = true
          this.regionStatus[1].status = true
          this.params.continent = ''
          this.params.country = ''
        }
      },

      getCityAll(val){
        this.axios.get("/index/city/autoTip", {
          params: {
            city: "",
            continent: '',
            country: val,
            language: "",
          },
        }).then((res) => {
          if (res.data.code == 200) {
            let data = res.data.data;
            this.cityAll = data.map((item) => {
              return {
                value: item,
                label: item,
              };
            });
          }
        });
      },
      threeLevelSearch(){
        if(this.params.country != ''){
          this.params.country = this.params.country.split('/')[0]
        }
        this.getAllData()
      },
      cloneI(val){
        if(val == 0){
          this.params = {
            org:'',  //院内机构
            mq_year:'', //年份
            continent:'', //大洲
            country:'', //国家
            mq_subject:'', //学科
            city:'', //城市
          }
          this.params2 = {
            org:'',  //院内机构
            mq_year:'', //年份
            continent:'', //大洲
            country:'', //国家
            mq_subject:'', //学科
            city:'', //城市
          }
        }else if(val == 1){
          this.params['mq_year'] = ''
          this.params2['mq_year'] = ''
        }else if(val == 2){
          this.params['continent'] = ''
          this.params2['continent'] = ''
        }else if(val == 3){
          this.params['country'] = ''
          this.params2['country'] = ''
        }else if(val == 4){
          this.params['org'] = ''
          this.params2['org'] = ''
        }else if(val == 5){
          this.params['mq_subject'] = ''
          this.params2['mq_subject'] = ''
        }else if(val == 6){
          this.params['city'] = ''
          this.params2['city'] = ''
        }

        this.threeLevelSearch()

      },
      emptyParams(){
        this.params = {
          org:'',  //院内机构
          mq_year:'', //年份
          continent:'', //大洲
          country:'', //国家
          mq_subject:'', //学科
          city:'', //学科
        }
        this.regionStatus.forEach((item,index)=>{
          item.status = false
        })
        this.threeLevelSearch()
      },

      // 机构搜索列表
      getOrgData() {
        let params = "query_name="
        this.axios.get(`/index/org/autoTip?${params}`).then((res) => {
          if (res.data.code == 200) {
            this.orgAll = res.data.data.zh;
          }
        });
      },
      // 返回首页
      handleClose() {
        visitFun.goHome()
      },
      //返回上一页
      lastPage(){
        visitFun.lastPage()
      },

      /*
      * 获取数据
      * */
      getAllData(){
        this.params2 = JSON.parse(JSON.stringify(this.params))

        this.getLeftOneData()
        this.getRightOneData()
        this.getLeftTwoData()
        this.getLeftTwoData()
        this.getRightTwoData()
        this.getRightFourData()
        this.getLeftFourData()
        this.getRightThreeData()
        this.getLeftThreeData()

      },
      //左一
      getLeftOneData(){
        this.leftOneLoading = true
        this.axios(visitFun.settingParameters('post','/bic/communication',this.params)).then((res) => {
          if (res.data.code == 200) {
            this.leftOneData = res.data.data
            this.leftOneLoading = false
          }
        });
      },

      //右一
      getRightOneData(){
        this.rightOneLoading = true
        this.axios(visitFun.settingParameters('post','/bic/talent',this.params)).then((res) => {
          if (res.data.code == 200) {
            let data = res.data.data
            // 国际人才计划  internationalPerson    台湾青年人才计划taiWan    CAS-TWAS院长奖学金 scholarshipCas  一带一路”硕士生奖scholarshipOne
            let arr = []
            let arr2 = []
            if(this.params.country.split('/')[0] == '中国台湾' || this.params.continent == '亚洲'){
              arr = ['国际人才计划','台湾青年人才计划','CAS-TWAS院长奖学金','一带一路”硕士生奖',]
              arr2[0] = data.internationalPerson
              arr2[1] = data.taiWan
              arr2[2] = data.scholarshipCas
              arr2[3] = data.scholarshipOne
            }else{
              arr = ['国际人才计划','CAS-TWAS院长奖学金','一带一路”硕士生奖',]
              arr2[0] = data.internationalPerson
              arr2[1] = data.scholarshipCas
              arr2[2] = data.scholarshipOne
            }

            // arr2 = [...data.internationalPerson , ...data.taiWan  , ...data.scholarshipCas , ...data.scholarshipOne , ]
            this.TopicFounding.countByYear = {
              xAxisData:arr,
              yAxisData:arr2,
              year:data.year,
            }
            //console.log(JSON.stringify(this.TopicFounding.countByYear))
            this.TopicFounding.tableData = res.data.data.table
            this.rightOneLoading = false
          }
        });
      },

      //左二
      getLeftTwoData(){
        this.leftTwoLoading = true
        this.axios(visitFun.settingParameters('post','/bic/project',this.params)).then((res) => {
          if (res.data.code == 200) {
            let data = res.data.data
            this.rightTopData = res.data.data
            this.leftTwoLoading = false
          }
        });
      },
      //右二
      getRightTwoData(){
        this.rightTwoLoading = true
        this.axios(visitFun.settingParameters('post','/bic/platform',this.params)).then((res) => {
          if (res.data.code == 200) {
            let data = res.data.data
            this.rightTwoData = res.data.data
            this.rightTwoLoading = false
          }
        });
      },

      //左四
      getLeftFourData(){
        this.leftFourLoading = true
        let params = {
          mq_category:this.params.mq_subject,
          'mq_organizations.continent':this.params.continent,
          'mq_organizations.country':this.params.country,
          org:this.params.org,
          mq_year:this.params.mq_year,
          city:this.params.city,
        }
        this.axios(visitFun.settingParameters('post','/bic/paper',params)).then((res) => {
          if (res.data.code == 200) {
            let data = res.data.data
            this.leftFourData = res.data.data
            this.leftFourLoading = false
          }
        });
      },

      //右三
      getRightThreeData(){
        this.rightThreeLoading = true
        let params = {
          mq_subject:this.params.mq_subject,
          mq_continent:this.params.continent,
          'mq_nationality':this.params.country,
          org:this.params.org,
          mq_year:this.params.mq_year,
          city:this.params.city,
        }
        this.axios(visitFun.settingParameters('post','/bic/award',params)).then((res) => {
          if (res.data.code == 200) {
            let data = res.data.data
            this.rightThreeData = res.data.data
            this.rightThreeLoading = false

          }
        });
      },

      //左三
      getLeftThreeData(){
        this.leftThreeLoading = true
        this.axios(visitFun.settingParameters('post','/bic/agreement',this.params)).then((res) => {
          if (res.data.code == 200) {
            let data = res.data.data
            this.leftThreeData = res.data.data
            this.leftThreeLoading = false
          }
        });
      },

      //右四
      getRightFourData(){
        this.rightFourLoading = true
        let params = {
          category:this.params.mq_subject,
          continent:this.params.continent,
          country:this.params.country,
          org:this.params.org,
          year:this.params.mq_year,
          city:this.params.city,
        }
        this.axios(visitFun.settingParameters('post','/bic/org',params)).then((res) => {
          if (res.data.code == 200) {
            let data = res.data.data
            let arr = []
            res.data.data.forEach((item,idnex)=>{
              arr.push({
                name:item.orgName,
                value:item.count,
                orgid:item.orgId,
              })
            })
            this.personRankingData = arr
            this.rightFourLoading = false
          }
        });
      },
    }
  }
</script>
<style lang="less" scoped>
  .container{
    background: #e1e5ec;
    overflow-y: scroll;
    height: 100%;
    .headerCon{
      width: 100%;
      height: 130px;
      background: url("../../assets/images/searchPage/headerBag.png") repeat-x;
      background-size: auto 130px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .logo{
        height: 50px;
        margin-left: 40px;
        display: flex;
        cursor: pointer;
        div:nth-of-type(1){
          width: 50px;
          height: 50px;
          img{
            width: 50px;
            height: 50px;
            float: left;
          }
        }
        div:nth-of-type(2){
          margin-left: 6px;
          height: 50px;
          color: #fff;
          line-height: 25px ;
          font-size: 16px;
        }
      }
      .condition{
        display: flex;
        margin-left: -180px;
        .personList-FilterCondition {
          ul {
            display: flex;
            li {
              width: 180px;
              flex: 1;
              box-sizing: border-box;
              height: 50px;
              line-height: 40px;
              font-size: 14px;
              display: flex;
              align-items: center;
              /deep/ .el-select {
                width: 100%;
              }
              /deep/ .el-cascader {
                width: 100%;
              }
              /deep/ .el-input__inner{
                background: #ff3925;
                border: none;
                border-radius: 0;
                height: 50px;
                color: #fff;
              }
              ::-webkit-input-placeholder {
                color: #ffffff;
                font-size: 14px;
              }
              /deep/ .el-select__caret{
                color: #fff;
              }
            }
          }
        }
        .params2SearchDiv{
          display: flex;
          justify-content: space-between;
          width: 120px;
          margin-left: 20px;
          .personSearch ,  .personDownload{
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            //margin: 8px 0px 0px 20px;
            cursor: pointer;
            border: 1px solid #d9dde4;
            border-radius:15px;
            img{
              height: 22px;
              width: 20px;
              float: left;
            }
            &:hover{
              background: #ff3925;
            }

          }
          .personDownload{
            img{
              height: 15px;
              width:  14px;
            }
          }
          .personReast {
            width: 50px;
            height: 50px;
            //background: #e2e6ed;
            color: #727272;
            line-height: 50px;
            text-align: center;
            font-size: 18px;
            //margin: 8px 0px 0px 20px;
            border-radius:15px;
            border: 1px solid #d9dde4;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover {
              background: #ff3925;
              color: #fff;
            }
          }
          //}

        }

      }
      .signIn{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 40px;
        div{
          color: #fff;
          font-size: 14px;
          line-height: 20px;
          margin-top: 6px;
        }
      }
    }
    .navCon{
      width: 100%;
      height: 210px;
      background: #d3d7df;
      display: flex;
      justify-content: center;
      .navCenter{
        width: 1650px;
        .firstRow{
          width: 1650px;
          display: flex;
          margin-top: 37px;
          height: 40px;
          align-items: center;
          position: relative;
          /*justify-content: space-between;*/
          div:nth-of-type(1){
            line-height: 40px;
            color: #8f949f;
            font-size: 16px;
          }
          div:nth-of-type(2){
            display: flex;
            p{
              margin-left: 10px;
              height: 24px;
              border: 1px solid #ff3925;
              color: #ff3925;
              line-height: 24px;
              text-indent: 13px;
              padding-right: 8px;
              i{
                text-indent: 0px;
                color: #ff3925;
                cursor: pointer;
              }
            }
          }
          div:nth-of-type(3){
            width: 12px;
            height: 14px;
            margin-left: 14px;
            cursor: pointer;
            img{
              width: 100%;
              height: 100%;
              float: left;
            }
          }
          div:nth-of-type(4){
            height: 38px;
            border: 1px solid #8f949f;
            border-radius: 5px;
            width: 126px;
            position: absolute;
            top: 0;
            right: 0;
            line-height: 38px;
            text-align: center;
            color: #8f949f;
            font-size: 14px;
            cursor: pointer;
          }
        }
        .secondRow{
          width: 1650px;
          margin-top: 15px;
          height: 55px;
          line-height: 55px;
          font-size:46px ;
          color: #393939;
          text-align: center;
        }
        .theThirdRow{
          width: 1650px;
          display: flex;
          height: 40px;
          align-items: center;
          position: relative;
          justify-content: space-between;
          margin-top: 10px;
          .title{
            width: 126px;
            text-align: left;
            line-height: 40px;
            color: #8f949f;
            font-size: 16px;
          }
          .center{
            display: flex;
            align-items: center;
            line-height: 40px;
            color: #393939;
            font-size: 18px;
          }
          .searchImg{
            width: 126px;
            display: flex;
            justify-content: space-between;
            div{
              width: 40px;
              height: 40px;
              cursor: pointer;
            }
            div:nth-of-type(1){
              background: url("../../assets/images/searchPage/download.png") no-repeat ;
              background-size: 100% 100%;
              &:hover{
                background: url("../../assets/images/searchPage/downloadHover.png") no-repeat;
                background-size: 100% 100%;
              }
            }
            div:nth-of-type(2){
              background: url("../../assets/images/searchPage/favorites.png") no-repeat ;
              background-size: 100% 100%;
              &:hover{
                background: url("../../assets/images/searchPage/favoritesHover.png") no-repeat ;
                background-size: 100% 100%;
              }
            }
            div:nth-of-type(3){
              background: url("../../assets/images/searchPage/share.png") no-repeat ;
              background-size: 100% 100%;
              &:hover{
                background: url("../../assets/images/searchPage/sharehover.png") no-repeat ;
                background-size: 100% 100%;
              }
            }
          }
        }
      }
    }
    section{
      width: 100%;
      height: 1630px;
      background: #e1e5ec;
      display: flex;
      justify-content: center;
      margin-top: 20px;
      .sectionAside{
        flex: 1;
      }
      .secContainer{
        display: flex;
        width: 1650px;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
        .sectionItem{
          width: 820px;
          height: 400px;
          background: #f1f3f6;

          /deep/ .el-loading-spinner .path {
            stroke: #ff3a25;
          }

          /deep/ .el-loading-spinner .el-loading-text {
            color: #ff3a25;
          }
        }
      }
    }
    footer{
      width: 100%;
      height: 155px;
      display: flex;
      justify-content: center;
      div{
        width: 100%;
        margin-top: 62px;
        height: 16px;
        font-size: 12px;
        line-height: 16px;
        color: #a5a5a5;
        text-align: center;
        img{
          height: 16px;
          width: auto;
          margin-right: 8px;
        }
      }
    }
  }

</style>
