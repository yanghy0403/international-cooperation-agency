<template>
  <div class="login">
    <img
      src="../../assets/images/国际人才/页面固定内容/用户按钮-内页版-默认状态.png"
      alt
    />
    <p>{{userName}}</p>
    <div class="hoverDiv">
      <ul>
        <li @click="personalCenter(0)">个人中心</li>
        <li @click="personalCenter(1)">退出登录</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      code: "",
    };
  },
  mounted() {
    let cookie = document.cookie;
    if (cookie.indexOf("bic_api") == 0) {
      let tokenArr = cookie.split("|");
      this.userName = tokenArr[0].split("=")[1];
      this.code = tokenArr[1];
    }
  },
  methods: {
    personalCenter(val) {
      if (val == 0) {
        this.$router.push({ path: "/favorites" });
      } else {
        window.location.href =
          "http://10.0.0.26:8088/user/loginDelete?umtId=" + this.code;
          
      }
    },
  },
};
</script>

<style lang="less" scope>
.login {
  // position: relative;
  width: 70px;
  text-align: center;
  cursor: pointer;

  img {
    width: 24px;
    height: 29px;
  }

  p {
    margin-top: 10px;
    font-size: 14px;
    color: #727272;
  }
  .hoverDiv {
    position: fixed;
    right: 15px;
    width: 100px;
    background: #ccc;
    display: none;
    z-index: 99;
    ul {
      li {
        height: 38px;
        line-height: 38px;
        color: #000;
        font-size: 14px;
        cursor: pointer;
        &:hover {
          background: #fff;
        }
      }
    }
  }

  &:hover > .hoverDiv {
    display: block;
  }
}
</style>
