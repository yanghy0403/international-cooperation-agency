<template>
   <div class="main">
       <div class="content">
              <myheader @navindex="handlenavindex"></myheader>

               <div class="centerCon">
               
                 <situationalAwareness v-if="curnavindex ==0"></situationalAwareness>
                  <cooperationNetwork v-if="curnavindex ==1"></cooperationNetwork>
                 <tightness v-if="curnavindex ==2"></tightness>
               </div>
               <div class="footerCon">
                  <myfooter></myfooter>
               </div>
       </div>
   </div>
</template>

<script>

import myheader from './decisionheader';
import myfooter from './decisionfooter';
import tightness from './tightness';
import situationalAwareness from './situationalAwareness';
import cooperationNetwork from './cooperationNetwork';
export default {
 name:'decision',
 data(){
    return{
         curnavindex:-1,
          orgName:'',//搜索的机构名称
    }
},
 components:{myheader,tightness,myfooter,situationalAwareness,cooperationNetwork},
 methods:{
     //接收头部组件穿过来的当前当行下标
    handlenavindex(val){
     
        this.curnavindex = val;
        
    }
 },
 mounted(){
  
 }
}
</script>

<style lang="less" scoped>
 .main{
   height: 100%;
    overflow-y: auto;
     width: 100%;
    background: url("../../assets/images/背景/背景大图.jpg") no-repeat;
   background-size: cover;
    .content{
        width: 1840px;
        margin: 0 auto;
        height: 100%;
         display: flex;
        flex-direction: column;
}

   .centerCon{
     flex: 1;
   }
   .footerCon{
     height: 80px;
     width: 100%;
   }
 }
</style>
