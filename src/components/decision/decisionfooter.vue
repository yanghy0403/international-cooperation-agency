<template>
    <div class="footer">
          <ul>
              <li>
                  中国科学院国际合作局 版权所有
              </li>
              <li>|</li>
              <li>技术支持：中国科学院计算机网络信息中心</li>
          </ul>
    </div>
</template>

<script>
export default {
 name:'myfooter'
}
</script>

<style lang="less" scoped>
 .footer{
     height: 60px;
     display: flex;
     justify-content: center;
     align-items: center;
     ul{
         display: flex;
         justify-content: flex-start;
         align-items: center;
         margin-top: 20px;
         li{
             color: #a5a5a5;
             font-size: 12px;
             margin: 5px;
             img{
                 display: inline-block;
                 width:16px;
                 height: 20px;
                 margin-right: 5px;
             }
         }
     }
 }
</style>
