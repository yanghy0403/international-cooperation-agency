<template>
     <div
        class="graph"
        v-loading="loading"
        element-loading-text="正在加载图谱..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
        >
        <div class="bg-class" v-show="isshow" @click="handleBgClose"></div>
         <div class="default" v-if="!isfade"> 
                    <div class="search" v-if="iconindex ==1"> 
                        <div class="i-select">
                              <el-input v-model="orgName" placeholder="请输入机构名称" @input="handleSearch"></el-input>
                                <button @click="handleApply">生成机构图谱</button>
                                <div class="select-list" >
                                        <div class="ivu-poptip-inner scrollbar" v-show="selectname">
                                            <ul v-if="orgData.length !== 0" class="resultdata">
                                                <li
                                                class="ivu-poptip-body"
                                                v-for="(item, k) in orgData"
                                                :key="k + 'x'"
                                                @click="handleClickQuery(item)"
                                                >
                                                <p>{{item.name}}</p>
                                                </li>
                                            </ul>
                                            <ul v-else>
                                                <span class="ivu-poptip-body-content-inner"
                                                >暂无匹配数据</span
                                                >
                                            </ul>
                                </div>
                        </div>
                    </div>
                    </div>
                    <div class="oper">
                        <div class="icon upload" @click="handleDownload"></div>
                        <div class="icon photo" :class="isphoto ? 'photoing':''" @click="handleClick(1)"></div>
                        <div class="icon table" :class="istable?'tableing':''" @click="handleClick(2)"></div>
                        <div class="icon fade" @click="handleFade"></div>
                    </div>
                    <div class="comment" v-if="iconindex ==1">
                        <ul>
                            <li>*注 :</li>
                            <li>
                                    <p>机构外圆直径越大,表示与搜索机构的关系越近</p>
                                    
                            </li>
                        </ul>
                    </div>
                <div class="module">
                        <graph v-show="iconindex ==1" :orgData="orgData" ref="graph"></graph>
                        <mytable v-show="iconindex ==2" :orgData="orgData" ref="table"></mytable>
                        
                </div>
        </div>
        <div class="fullescn" v-if="isfade">
           <div class="column columned">
                  <div class="oper">
                    <div class="icon upload" @click="handleDownload"></div>
                    <div class="icon photo" :class="isphoto ? 'photoing':''" @click="handleClick(1)"></div>
                    <div class="icon table" :class="istable?'tableing':''" @click="handleClick(2)"></div>
                    <div class="icon shrink" @click="handleshrink"></div>
                </div>
                 <div class="comment" v-if="iconindex ==1">
                        <ul>
                            <li>*注 :</li>
                            <li>
                                  <p>机构外圆直径越大,表示与搜索机构的关系越近</p>
                            </li>
                        </ul>
                    </div>
               <div class="module">
                       <graph v-show="iconindex ==1" :orgData="orgData" ref="graph"></graph>
                        <mytable v-show="iconindex ==2" :orgData="orgData" ref="table"></mytable>
               </div>
            </div>
        </div> 
      
    </div>

</template>

<script>
import $ from 'jquery'
import html2canvas from 'html2canvas';
 import visitFun from '@/assets/js/visit.js'
import graph from './tightnessModule/graph'
import mytable from './tightnessModule/table'
import { log } from 'util';
export default {
 name:'tightness',
 data(){
    return{
       orgName:'',
       isphoto:true,//图形图标是否选中
       istable:false,//表格图标是否选中
       iconindex:1,//默认展示图形
       iconindex1:1,//默认展示图形(放大)
       isfade:false,//控制放大图形的出现
      
       orgData:{},//机构数据
       selectname: false,
       curorgData:{"name":"美国哈佛医学院/Harvard Medical School","orgId":"a739e680673146ccc71e8672bb897d37","isChinaOrg":"False"},//当前选中的推荐机构数据
      loading: false,
      isshow: false,
      
    }
 },
 watch: {},
 components:{graph,mytable},
  methods:{
      handleRouter(path,index){
          this.curnavindex =index;
          this.$router.push(path);
      },
      //生成图谱
      handleApply(){
         this.getGraphData();
      },
    
   
     //切换图标内容
     handleClick(num){
         this.iconindex = num;
          this.iconindex1 = num;
         if(num ==1){
              this.istable = false;
              this.isphoto =true;
           
         }else if(num ==2){
             this.isphoto = false;
             this.istable =true;
         }
      
         
     },
    
   
     //图形放大
     handleFade(){
       
         this.isfade = true;
         this.$nextTick(()=>{
                var height = document.querySelector('.columned').clientHeight;
                // var height1 = document.querySelector('.oper').clientHeight;
                var width =  document.querySelector('.module').clientWidth;
                document.getElementById('graph').style.width = width +'px';
                document.getElementById('graph').style.height = height +'px';
                this.getGraphData();
            })
      
     },
     //图形收缩
     handleshrink(){
         this.isfade = false;
          this.$nextTick(()=>{
                var height = document.querySelector('.module').clientHeight;
                var width =  document.querySelector('.module').clientWidth;
                document.getElementById('graph').style.width = width +'px';
                document.getElementById('graph').style.height = height +'px';
                this.getGraphData();
            })
     },
     //获取推荐的机构
     handleSearch(){
           this.isshow = true;
          this.selectname = true;
           var url=`/index/org/autoTipDetail`;
           var data ={
                query_name:this.orgName
           }
           this.axios.get(url,{params:data}).then(res=>{
                //  console.log(res);
                 if(res.data.code ==200){
                       this.orgData = res.data.data;
                       this.selectname =true;
                 }
           })

     },
     //点击推荐数据将机构名赋值给输入框
      handleClickQuery(val) {
          this.orgName = val.name;
          this.curorgData = val;
          this.selectname = false;
           this.isshow = false;
      
    },
    //请求图形数据
    getGraphData(){
          var url = `/overview/orgRelationNet`;
        
          var data ={
              orgId:this.curorgData.orgId,
              orgName:this.curorgData.name,
              type:this.curorgData.isChinaOrg? 'en':'zh'
          }
            this.loading = true;
          this.axios.get(url,{params:data}).then(res=>{
                // console.log(res);
                if(res.data.code ==200){
                      this.orgData = res.data.data;
                       this.loading = false;
                     
                }
          })
          
    },
     handleBgClose() {
      this.selectname = false;
        this.isshow = false;
    },
    //导出功能
    handleDownload(){
        // console.log(this.$refs.graph)
       
       if(this.iconindex ==1){
           var node =document.getElementById('graph');
           node.style.background = 'rgba(0,0,0,0.7)';
           
          html2canvas(node).then(canvas => {
               node.style.background = 'none'
               let saveUrl = canvas.toDataURL('image/png');
                let a = document.createElement('a')
                document.body.appendChild(a)
                a.href = saveUrl
                a.download = '机构紧密度'
                a.click();
               a.parentNode.removeChild(a);
              
          })
       }if(this.iconindex ==2){
           var node =document.getElementById('table');
           node.style.background = 'rgba(0,0,0,0.7)';
        
           html2canvas(node).then(canvas => {
                node.style.background = 'none'
               let saveUrl = canvas.toDataURL('image/png');
               let a = document.createElement('a')
                document.body.appendChild(a)
                a.href = saveUrl
                a.download = '机构紧密度'
                a.click()
              a.parentNode.removeChild(a);
          })
       }
    }
  
 },
 mounted(){
     this.getGraphData();
   
 }
}

</script>

<style lang='less' scoped>
 .graph{
     width: 1840px;
     height: 100%;
    background: rgba(0,0,0,0.2);
     margin: 0 auto;
    
    
  /deep/ .el-loading-spinner i {
    color: #ed2424;
  }
  /deep/ .el-icon-loading:before {
      font-size: 50px;
    }
  /deep/ .el-loading-spinner .el-loading-text {
    color: #ed2424;
    font-size: 25px;
  }

  .bg-class {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0);
        z-index: 9;
  }
    .default{
         width: 100%;
         height:100% ;
          position: relative;
          display: flex;
          flex-direction: column;
         .module{
            width: 100%;
            // height:100% ;
            flex: 1;
        }
    }
   
    .atlas{
             width: 100%;
             height:100% ;
         }
     .oper{
        display: flex;
        justify-content: flex-end;
        margin-right: 1%;
        padding: 10px 0;
     }
     
     .search{
         position: absolute;
         left:40px;
         top:60px;
         z-index: 10;
        //  height: 156px;
         width: 400px;
      
         button{
             background:#ff3a25;
             width: 160px;
             height: 50px;
             font-size:18px;
             color: #fff;
             text-align: center;
             line-height: 50px;
             border-radius: 10px;
             margin: 0 auto;
             border: none;
             margin-top: 80px;
             outline: none;
             cursor: pointer;
         }
         .i-select{
                 position: relative;
                width: 100%;
                height: 100%;
                flex-direction: column;
                display: flex;
                justify-content: center;
                align-items: space-between;
              .select-list {
                     position: absolute;
                    left: 0;
                    top: 64px;
                    z-index: 10;
                    width: 400px;
                    .scrollbar {
                        max-height: 300px;
                        overflow: auto;
                        background-image: linear-gradient(#c9ced4, #c9ced4),
                        linear-gradient(#ffffff, #ffffff);
                        ul li {
                        height: 40px;
                        color: #3b3d41;
                        cursor: pointer;
                        font-size: 14px;
                        p span {
                            margin-right: 15px;
                        }
                        &:hover {
                            background: linear-gradient(
                            to right,
                            #b4bbc3 0%,
                            #b5bcc4 1%,
                            rgba(255, 255, 255, 0) 100%
                            );
                   }
                  }
              }
              .scrollbar::-webkit-scrollbar {
              width: 4px;
              height: 1px;
            }
            .scrollbar::-webkit-scrollbar-thumb {
              border-radius: 10px;
              box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
              background: #ff3a25;
            }
            .scrollbar::-webkit-scrollbar-track {
              box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
              border-radius: 10px;
              background: #ededed;
            }
            }
         }
     }
     .comment{
         position: absolute;
         bottom: 50px;
         left: 50px;
         z-index: 10;
         ul{
             display: flex;
             justify-content: flex-start;
             align-items: flex-start;
             li:first-child{
                 width: 36px;
                 line-height: 30px;
                 color: #8f949f;
                  font-size:12px ;
             }
             li:last-child{
                 p{
                      font-size:12px ;
                      color: #8f949f;
                      line-height: 30px;
                 }
             }
         }
     }
     .fullescn{
         position: fixed;
         left: 0;
         top:0;
         z-index: 10;
         background:#fff;
         width: 100%;
         height: 100%;
         display: flex;
         justify-content: center;
         align-items: center;
          background: url("../../assets/images/背景/背景大图.jpg") no-repeat;
          background-size: cover;
        .column{
           background:rgba(0,0,0,0.2);
            width: 1840px;
            height: 80%;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
                #graph1{
                    width: 100%;
                    height:100% ;
                }
                .oper{
                    
                    display: flex;
                    justify-content: flex-end;
                    
                }
                .module{
                   flex: 1;
                    // .table{
                    //        height: 98%;
                    //        overflow-y: auto;
                    // }
                }
            }
     }
   
  }
  
  .oper{
      position: absolute;
      top: 0;
      right: 1%;
      z-index: 10;
          .icon{
             width: 22px;
             height: 22px;
             margin: 0 3px;
             cursor: pointer;
         }
         .upload{
             background: url(../../assets/images/decision/export.png) no-repeat;
             background-size:100% 100% ;
         }
          .upload:hover{
               background: url(../../assets/images/decision/export1.png) no-repeat;
                background-size:100% 100% ;
          }
         
          .photo{
             background: url(../../assets/images/decision/图默认.jpg) no-repeat;
             background-size:100% 100% ;
         }
          .photo:hover{
               background: url(../../assets/images/decision/图选中.jpg) no-repeat;
                background-size:100% 100% ;
          }
           .photo.photoing{
               background: url(../../assets/images/decision/图选中.jpg) no-repeat;
                background-size:100% 100% ;
          }
          .photo1{
            background: url(../../assets/images/decision/图默认.jpg) no-repeat;
             background-size:100% 100% ;
         }
          .photo1:hover{
            //    background: url(../../assets/images/decision/图选中.jpg) no-repeat;
             background: url(../../assets/images/decision/图选中.jpg) no-repeat;
                background-size:100% 100% ;
          }
           .photo1.photoing{
            //    background: url(../../assets/images/decision/图选中.jpg) no-repeat;
             background: url(../../assets/images/decision/图选中.jpg) no-repeat;
                background-size:100% 100% ;
          }
           .table{
             background: url(../../assets/images/decision/表格默认.jpg) no-repeat;
             background-size:100% 100% ;
         }
          .table:hover{
               background: url(../../assets/images/decision/表格选中.jpg) no-repeat;
                background-size:100% 100% ;
          }
           .table.tableing{
               background: url(../../assets/images/decision/表格选中.jpg) no-repeat;
                background-size:100% 100% ;
          }
          .table1{
             //background: url(../../assets/images/国际人才/index/图标列表默认.png) no-repeat;
             background: url(../../assets/images/decision/表格默认.jpg) no-repeat;
             background-size:100% 100% ;
         }
          .table1:hover{
              // background: url(../../assets/images/decision/表格选中.jpg) no-repeat;
               background: url(../../assets/images/decision/表格选中.jpg) no-repeat;
                background-size:100% 100% ;
          }
           .table1.tableing{
               //background: url(../../assets/images/decision/表格选中.jpg) no-repeat;
                background: url(../../assets/images/decision/表格选中.jpg) no-repeat;
                background-size:100% 100% ;
          }
            .fade{
             background: url(../../assets/images/decision/放大默认.png) no-repeat;
             background-size:100% 100% ;
         }
          .fade:hover{
               background: url(../../assets/images/decision/放大选中.png) no-repeat;
                background-size:100% 100% ;
          }
         .fade.fadeing{
               background: url(../../assets/images/decision/放大选中.png) no-repeat;
                background-size:100% 100% ;
          }
        .shrink{
             background: url(../../assets/images/decision/shrink.png) no-repeat;
             background-size:100% 100% ;
         }
     }
 
</style>
<style lang="less">
.search{
   .el-input__inner{
     
        height:64px;
        line-height: 64px;
        width:400px;
        background: rgba(95,105,121,0.3);
         border: none;
        color: #dadada;
        font-size: 18px;
    }
    .el-input__inner::-webkit-input-placeholder{

            line-height: 64px;
            text-align: center;

        }
}
.content{
    .el-table{
        height: 100%;
       
        .cell{
            text-align: center;
        }
    }
}
</style>
