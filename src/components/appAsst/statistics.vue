<template>
  <div class="application">
    <div class="application-fl">
      <div class="app-logo">
        <img src="../../assets/images/国际人才/页面固定内容/logo.png" alt />
        <p>中国科学院国际合作</p>
        <p>数据汇交与分析平台</p>
      </div>
      <div class="appTitle">应用助手</div>
      <div class="app-nav">
        <div>
          <router-link tag="li" to="/briefing">国际合作态势简报</router-link>
        </div>
        <div>
          <router-link tag="li" to="/summary">机构合作数据摘要</router-link>
        </div>
        <div class="navActive">
          <router-link tag="li" to="/statistics">国际合作统计手册</router-link>
        </div>
        <div>
          <router-link tag="li" to="/yearbook">国际合作统计年鉴</router-link>
        </div>
        <div>
          <router-link tag="li" to="/bulletin">国际合作统计公报</router-link>
        </div>
      </div>
      <div class="app-btm" @click="lastPage">
        <div class="iconfontClose">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="closeName">返回首页</div>
      </div>
    </div>
    <div class="application-fr"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods:{
    handleClose() {
      this.$router.push("/");
    },
    lastPage(){
        visitFun.lastPage()
      },
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/application/appFl.less';
</style>
