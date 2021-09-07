<template>
  <div class="system">
    <div class="application-fl">
      <div class="app-logo" @click="handleClose">
        <img src="../../assets/images/国际人才/页面固定内容/logo.png" alt />
        <p>中国科学院国际合作</p>
        <p>数据汇交与分析平台</p>
      </div>
      <div class="appTitle">系统管理</div>
      <div class="app-nav">
        <div class="navActive">
          我的收藏
        </div>
        <!--<div >-->
          <!--我的下载-->
        <!--</div>-->
      </div>
      <div class="app-btm" @click="handleClose">
        <div class="iconfontClose">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="closeName">返回上一页</div>
      </div>
    </div>
    <div class="application-fr">
      <div class="breadcrumb">
        <ul>
          <li>个人中心</li>
          <li class="line">/</li>
          <li>我的收藏</li>
        </ul>
      </div>
      <div class="fr-header">
        <div class="titleName">我的收藏</div>
        <div class="loginImg">
          <img
            src="../../assets/images/国际人才/页面固定内容/用户按钮-内页版-默认状态.png"
            alt=""
          />
          <p>Admin<label>/</label>退出</p>
        </div>
      </div>

      <div class="typeDiv">
        <div class="type">
          <div @click="changeType(index)" class="typeItem" v-for="(item,index) in typeData" :key="index">
            <img v-if="item.selected" src="../../assets/images/exchange/selected.png" alt="">
            <img v-else src="../../assets/images/exchange/selectDefault.png" alt="">
            <span>{{item.name}}</span>
          </div>
        </div>

        <div class="search">
          <input v-model="contentValue" placeholder="请输入要检索的内容" type="text">
          <div class="imgDiv" @click="searchContent"><img src="../../assets/images/exchange/searchIcon.png" alt=""></div>
        </div>
      </div>
      <div class="tableDiv">
        <el-table
          :data="dataAll"
          @current-change="handleCurrentChange"
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            property="newContent"
            label="内容"
            align="center"
            min-width="120">
          </el-table-column>
          <el-table-column
            property="date"
            label="时间"
            align="center"
            width="300">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="200">
            <template slot-scope="scope">
              <div class="operating">
                <div @click="openFun(scope.row)" class="open"></div>
                <div @click="deleteFun(scope.row)" class="delete"></div>
              </div>

            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <Page
          :total="totalCount"
          :current.sync="params.page_pageOffset"
          :page-size="params.page_pageSize"
          @on-change="changePage"
        />
      </div>
      <div class="footerInfo">
        <span>中国科学院国际合作局 版权所有</span>
        <span class="line">|</span>
        <span>技术支持：中国科学院计算机网络信息中心</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        modal7: false,
        typeData:[
          {
            name:'全部类型',
            selected:true,
          },{
            name:'人员',
            selected:false,
          },{
            name:'机构',
            selected:false,
          },{
            name:'论文',
            selected:false,
          },{
            name:'国家',
            selected:false,
          },{
            name:'城市',
            selected:false,
          },{
            name:'学科领域',
            selected:false,
          },{
            name:'应用助手',
            selected:false,
          },
        ],
        params:{
          content:'',
          page_pageOffset:1,
          page_pageSize:10,
          type:'',
          userId:'admin',
        },
        contentValue:'',
        dataAll:[],
        totalCount:0,
      };
    },
    mounted() {
      this.getData()
    },
    methods: {
      changeType(val){
        this.params.page_pageOffset = 1
        this.typeData.forEach((item,index)=>{
          item.selected = false
          if(val == index){
            item.selected = true
          }
        })
        this.params.type = this.typeData[val].name
        this.getData()
      },
      searchContent(){
        this.params.content = this.contentValue
        this.getData()
      },
      getData(){
        let params =
          'content='+this.params.content+'&'+
          'page_pageOffset='+this.params.page_pageOffset+'&'+
          'type='+this.params.type+'&'+
          'userId='+this.params.userId+'&'+
          'page_pageSize=10'

        this.axios.get(`/manage/list?${params}`)
          .then(res => {
            if (res.data.code == 200) {
              this.totalCount = res.data.data.count

              this.dataAll = res.data.data.content
              this.dataAll.forEach((item,index)=>{
                item.newContent = item.content.split('@')[0]
                item.condition = item.content.split('@')[1]
              })
            }
          });
      },
      openFun(val){
        if(val.type == '人员' || val.type == '机构'||val.type == '论文' ){
          let name = val.condition.split('-')[0]
          let id = val.condition.split('-')[1]
          this.$router.push({name:name,query:{id:id}})
        }else if(val.type == '全部类型' || val.type == '国家'||val.type == '城市'||val.type == '学科领域'){
          let name = val.condition
          this.$router.push({name:'searchPage',query:{favoritesData:name}})
        }else if(val.type == '应用助手'){
          let name = val.condition
          if(val.newContent.split('-')[1] == '国际合作态势简报'){
            this.$router.push("/briefing");
            sessionStorage.setItem("country",name)
          }else if(val.newContent.split('-')[1] == '机构合作数据摘要'){
            this.$router.push("/summary");
            sessionStorage.setItem("orgName",name)
          }else if(val.newContent.split('-')[1] == '国际合作统计年鉴'){
            let date = val.newContent.split('-')[2]
            this.$router.push("/yearbook");
            sessionStorage.setItem("yearbook",date)
          }else if(val.newContent.split('-')[1] == '国际合作统计公报'){
            let date = val.newContent.split('-')[2]
            this.$router.push("/bulletin")
            sessionStorage.setItem("bulletin",date)
          }
        }
      },
      deleteFun(val){
        let params = val.id
        this.axios.get(`/manage/remove?favoriteId=${params}`)
          .then(res => {
            if (res.data.code == 200) {
              this.getData()
            }
          });
      },
      changePage(val){
        this.params.page_pageOffset = val
        this.getData()
      },
      handleClose() {
        this.$router.push("/");
      },
      getSelectedNodes(val) {

      }
    },
  };
</script>

<style lang="less" scoped>
  @import "../../assets/css/personalCenter/index.less";
</style>
