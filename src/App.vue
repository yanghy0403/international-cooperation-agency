<template>
  <div style="height:100%;">
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view> -->
      <keep-alive :include="keepAlivePage">
          <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script>
  export default {
  name: "K_app",
  data(){
    return{
      keepAlivePage:['topicIndex','identityIndex','mutualVisits','importVisit','exportVisit','analysis','partner','CooperationProjects','IntelligenceProject','PartnerAgencies'],
    }
  },
  computed: {

  },
  watch: {
    $route: {
      handler: function(val, oldVal){
        // if(val.name == 'Main'){
        //   this.keepAlivePage = []
        // }else{
        //   this.keepAlivePage = ['topicIndex','identityIndex','mutualVisits','importVisit','exportVisit','analysis','partner','CooperationProjects','IntelligenceProject','PartnerAgencies']
        // }
        // if(oldVal.name == 'Main'){
        //   this.keepAlivePage = []
        // }else{
        //   this.keepAlivePage = ['topicIndex','identityIndex','mutualVisits','importVisit','exportVisit','analysis','partner','CooperationProjects','IntelligenceProject','PartnerAgencies']
        // }
        this.keepAlivePage = this.$store.state.keepAlivePage
      },
      // 深度观察监听
      deep: true
    }
  },
  mounted() {

  }
};
</script>

<style lang="less">
  @import "./assets/css/global/index.less";

  .el-select-dropdown__item.selected {
    color: #ff3a25!important;
  }
  .pagination{
    a{
      font-size: 12px;
    }
  }
</style>
