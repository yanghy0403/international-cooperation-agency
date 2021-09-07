<template>
  <header ref="headerDiv" class="headerCon">
    <div class="logo" @click="handleClose">
      <div><img :src="logoImg" alt="" /></div>
      <div>
        <p>中国科学院国际合作</p>
        <p>数据汇交与分析平台</p>
      </div>
    </div>
    <div class="nav">
      <p class="swiper-button-prev" @click="handlePro">
        <i class="el-icon-d-arrow-left"></i>
      </p>
      <!-- <swiper ref="mySwiper" :options="swiperOptions">
                                <div class="swiper-slide" v-for="(item,i) in swiperData" :key="i" :data-index="item">{{item}}</div>

                            </swiper> -->
      <div class="container">
        <ul class="swiper">
          <li
            v-for="(item, i) in swiperData"
            :key="i"
            :data-id="item.id"
            :class="curnavindex == i ? 'active' : ''"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <p class="swiper-button-next" @click="handleNext">
        <i class="el-icon-d-arrow-right"></i>
      </p>
    </div>
    <div class="login">
      <div class="signIn">
        <img :src="signImg" alt="" />
        <p>{{userName}}</p>
        <div class="hoverDiv">
              <ul>
                <li @click="personalCenter(0)">个人中心</li>
                <li @click="personalCenter(1)">注销</li>
              </ul>
            </div>
      </div>
    </div>
  </header>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import $ from "jquery";

export default {
  name: "decisionheader",
  data() {
    return {
      signImg: require("../../assets/images/固定图标/用户按钮-默认状态.png"),
      logoImg: require("../../assets/images/固定图标/logo.png"),
      userName: "",
      code: "",
      curnavindex: 1,
      swiperOptions: {
        direction: "horizontal",
        slidesPerView: 3,
        centeredSlides: true,
        loop: false,
        slideToClickedSlide: true,
      },

      swiperData: [
        {
          name: "国际合作态势",
          id: 0,
        },
        {
          name: "国际合作网络",
          id: 1,
        },
        {
          name: "机构紧密度",
          id: 2,
        },
      ],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    //   swiper() {
    //     return this.$refs.mySwiper.$swiper
    //   }
  },
  methods: {
    // 返回首页
    handleClose() {
      this.$router.push("/");
    },

    //上一个导航
    handlePro() {
      this.curnavindex--;
      if (this.curnavindex < 0) {
        this.curnavindex = 2;
      }
      //    $('.swiper li').removeClass('active');
      $(".swiper").animate(
        {
          left: "-200px",
        },
        400,
        function () {
          $(".swiper").prepend($(".swiper>li:nth(2)")[0]);
          //   $('.swiper>li:nth(1)').addClass('active');
          $(".swiper").css("left", 0);
        }
      );

      this.$emit("navindex", this.curnavindex);
    },
    //下一个导航
    handleNext() {
      this.curnavindex++;
      if (this.curnavindex > 2) {
        this.curnavindex = 0;
      }

      $(".swiper").animate(
        {
          left: "-200px",
        },
        400,
        function () {
          $(".swiper").append($(".swiper>li:nth(0)")[0]);
          //   $('.swiper>li:nth(1)').addClass('active');
          $(".swiper").css("left", 0);
        }
      );
      this.$emit("navindex", this.curnavindex);
    },
    // //轮播
    // handleswiper(){
    //    this.swiper.slideTo(0,1000,false);
    // },
    //点击slide跳转
    slideTo() {
      var _this = this;
      $(".swiper li").on("click", function () {
        var that = $(this);
        var i = that.index(); //用来判断其点击的是左边还是右边用来,判断其是否方左走还是右走
        var id = that.attr("data-id"); //用来判断当前中间显示的组件是那个对应的decision里面的下标,
        _this.handleslide(id, i);
      });
    },
    //切换组件
    handleslide(id, i) {
      this.curnavindex = id;
      if (i == 0) {
        $(".swiper").animate(
          {
            left: "-200px",
          },
          400,
          function () {
            $(".swiper").prepend($(".swiper>li:nth(2)")[0]);

            $(".swiper").css("left", 0);
          }
        );
        this.$emit("navindex", id);
      } else if (i == 1) {
        this.$emit("navindex", id);
      } else if (i == 2) {
        $(".swiper").animate(
          {
            left: "-200px",
          },
          400,
          function () {
            $(".swiper").append($(".swiper>li:nth(0)")[0]);
            $(".swiper").css("left", 0);
          }
        );
        this.$emit("navindex", id);
      }
    },
    // 注销
    personalCenter(val) {
      if(val ==0) {
        this.$router.push({ path: "/favorites" });
      }else {
        window.location.href =
        "http://10.0.0.26:8088/user/loginDelete?umtId=" + this.code;
      }
      
    },
  },
  mounted() {
      let token = document.cookie;

    if (token.indexOf("bic_api") == 0) {
      let tokenArr = token.split("|");
      this.userName = tokenArr[0].split("=")[1];
      this.code = tokenArr[1];
    }
    this.slideTo();
    if (this.$route.query.tag != undefined) {
      var id = this.$route.query.tagid;
      var i = this.$route.query.tag;
      this.handleslide(id, i);
    }
  },
};
</script>

<style lang="less" scoped>
.headerCon {
  width: 1840px;
  height: 130px;
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  .logo {
    height: 50px;
    //margin-left: 40px;
    display: flex;
    cursor: pointer;
    div:nth-of-type(1) {
      width: 50px;
      height: 50px;
      img {
        width: 50px;
        height: 50px;
        float: left;
      }
    }
    div:nth-of-type(2) {
      margin-left: 6px;
      height: 50px;
      color: #fff;
      line-height: 25px;
      font-size: 16px;
    }
  }
  .login {
    width: 200px;
    display: flex;
    justify-content: flex-end;

    .signIn {
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        color: #fff;
        font-size: 14px;
        line-height: 20px;
        margin-top: 6px;
      }
    }
    .hoverDiv {
          width: 100px;
          background: #fff;
          display: none;
          ul {
            li {
              height: 38px;
              line-height: 38px;
              color: #000;
              font-size: 14px;
              &:hover {
                background: #ddd;
              }
            }
          }
        }

        &:hover > .hoverDiv {
          display: block;
        }
  }
  .nav {
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        width: 200px;
        height: 50px;
        background: url(../../assets/images/decision/submenu.png) no-repeat;
        background-size: 100% 100%;
        font-size: 20px;
        color: #bdc4cc;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
      }
      li.active {
        width: 330px;
        height: 80px;
        background: url(../../assets/images/decision/menu.png) no-repeat;
        background-size: 100% 100%;
        font-size: 40px;

        line-height: 80px;
        color: #ffff;
      }
    }

    p {
      i {
        font-size: 20px;
        color: #bdc4cc;
        font-weight: bold;
        cursor: pointer;
      }
    }
    p:first-child {
      margin-right: 20px;
    }
    p:last-child {
      margin-left: 20px;
    }
  }
}
</style>


