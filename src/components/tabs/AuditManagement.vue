<template>
  <div class="decision-support">
    <div class="decision-item"  @click="curClick(0)" :class="cur==0?'activeClass line':'line'" @mouseenter="mouseoverClick(0)" @mouseleave="mouseleaveClick(0)">
      <div class="corners" v-if="this.cur == 0">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
      <div class="imgDiv">
        <img src="../../assets/images/决策支持/系统管理1-默认状态.png" alt />
      </div>
      <p>系统管理</p>
    </div>
    <div class="decision-item"  @click="curClick(1)" :class="cur==1?'activeClass line':'line'" @mouseenter="mouseoverClick(1)" @mouseleave="mouseleaveClick(1)">
      <div class="corners" v-if="this.cur == 1">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
      <div class="imgDiv">
        <img src="../../assets/images/决策支持/安全审计1-默认状态.png" alt />
      </div>
      <p>安全审计</p>
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      cur: null,
      realcur: null,
      isClick:false
    };
  },
  methods:{
    mouseoverClick(val){
      this.realcur = this.cur
      this.cur = val
    },
    mouseleaveClick(val){
      if(!this.isClick){
        this.cur = this.realcur
      }
      this.isClick = false
    },
    curClick(val){
      
      
      if(val == 0) {
        this.$router.push({ path: "/authority-management"});
      } else if(val == 1) {
        this.$router.push({ path: "/audit-management"});
      }
    },

  },
};
</script>

<style lang="less" scoped>
@import '../../assets/css/common.less';
.decision-support {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  .decision-item{
    cursor: pointer;
  }
  .line {
    width: 445px;
    height: 420px;
    // border: 1px solid #fff;
    background: rgba(132, 139, 150, 0.12);
    float: left;
    align-items: center;
    margin-right: 10px;
    z-index:10;
    .pDiv{
      z-index:0;
    }
    .imgDiv{
      width:119px;
      height:119px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0,0,0,0);
      margin: 130px 88px 80px 160px;
      img {
        width: 79px;
        height: 79px;
        /*margin: 150px 108px 100px 108px;*/
      }
    }


    p {
      font-size: 18px;
      color: #fff;
      text-align: center;
    }
  }
  .activeClass {
    position: relative;
    background: rgba(171, 176, 182, 0.3);
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    .imgDiv{
      background: #ff3a25;
      border-radius: 80px;
    }
  }
  .line:hover {
    background: rgba(171, 176, 182, 0.3);
    font-size: 20px;
    font-weight: bold;
    color: #fff;

    /*img {*/
      /*background: #ff3a25;*/
      /*width: 99px;*/
      /*height: 99px;*/
      /*padding: 20px;*/
      /*border-radius: 50px;*/
    /*}*/
  }
  .line:first-child {
    margin-left: 60px;
  }
}
</style>
