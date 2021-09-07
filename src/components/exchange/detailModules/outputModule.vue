<template>
  <div class="outputCon">
    <div class="titleDiv2">
      <div class="titleName">产出</div>
      <div class="operating">
        <div class="centerDiv centerDiv1">
          <img :src="bagImg" alt="">
        </div>
        <div @click.stop="iconClick(1)" class="centerLeftDiv"></div>
        <div @click.stop="iconClick(2)" class="centerRightDiv"></div>
      </div>
    </div>
    <div class="paperList paperListScroll" v-if="isShowChart">
      <ul>
        <li v-for="(item,index) in newData" :key="index">
          <h5>{{item.论文标题}}</h5>
          <div>
            <label>作者：</label>
            <span>{{item.论文作者}}</span>
          </div>
          <div>
            <label>期刊：</label>
            <span>{{item.期刊名称}}C</span>
          </div>
          <div>
            <label>发表时间：</label>
            <span>{{item.出版年}}</span>
          </div>
          <div>
            <label>关键词：</label>
            <span>{{item.关键词}}</span>
          </div>
          <div>
            <label>摘要：</label>
            <span>
              {{item.摘要}}
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div class="workExperience2" v-else>
      <div class="tabDIv newTable2 newScrollbargray">
          <el-table
            :data="newData"
            style="width: 100%;border-right:none">
            <!--<el-table-column-->
              <!--v-for="(subitem,subindex) in tableTitle"-->
              <!--key="subindex"-->
              <!--align="center"-->
              <!--:prop="subitem"-->
              <!--:label="subitem"-->
              <!--min-width="250"-->
            <!--&gt; </el-table-column>  -->

            <el-table-column align="center" prop="序号" label="序号"  min-width="100" > </el-table-column>
            <el-table-column align="center" prop="论文作者" label="论文作者"  min-width="400" > </el-table-column>
            <el-table-column align="center" prop="发表时间" label="发表时间"  min-width="150" > </el-table-column>
            <el-table-column align="center" prop="期刊名称" label="期刊名称"  min-width="250" > </el-table-column>
            <el-table-column align="center" prop="出版年" label="出版年"  min-width="100" > </el-table-column>
            <el-table-column align="center" prop="卷" label="卷"  min-width="100" > </el-table-column>
            <el-table-column align="center" prop="期" label="期"  min-width="100" > </el-table-column>
            <el-table-column align="center" prop="开始页" label="开始页"  min-width="100" > </el-table-column>
            <el-table-column align="center" prop="结束页" label="结束页"  min-width="100" > </el-table-column>
            <el-table-column align="center" prop="国际标准期刊号 (ISSN)" label="国际标准期刊号 (ISSN)"  min-width="250" > </el-table-column>
            <el-table-column align="center" prop="关键词" label="关键词"  min-width="400" > </el-table-column>
            <el-table-column align="center" prop="wos类别" label="wos类别"  min-width="100" > </el-table-column>
            <el-table-column align="center" prop="学科领域" label="学科领域"  min-width="200" > </el-table-column>
            <el-table-column align="center" prop="Web of Science 核心合集的被引频次计数" label="Web of Science 核心合集的被引频次计数"  min-width="300" > </el-table-column>
          </el-table>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        icon1:require('../../../assets/images/国际人才/图表模式.png'),
        icon2:require('../../../assets/images/国际人才/表格模式.png'),
        bagImg:require('../../../assets/images/国际人才/图表模式.png'),
        style:'background:#ff3925;color:#fff',
        isShowPeriodical:true,
        newData:[],
        isShowChart:true,
        tableTitle:[
          '序号',
          '论文标题',
          '论文作者',
          '发表时间',
          '期刊名称',
          '出版年',
          '卷',
          '期',
          '开始页',
          '结束页',
          '国际标准期刊号 (ISSN)',
          '关键词',
          'wos类别',
          '研究方向',
          'Web of Science 核心合集的被引频次计数',
        ],
        tableTitleLabel:[
          'id',
          'title',
          'author',
          'date',
          'source',
          'year',
          'volume',
          'issue',
          'pageBegin',
          'pageEnd',
          'issn',
          'keyword',
          'abstrac',
          'category',
          'researchField',
          'timesCited',
        ],
      }
    },
    props:{
      produceData: {
        default: []
      },
    },
    watch:{
      produceData: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          this.newData = val.table
          this.tableTitle = []
          for(let item in this.newData[0]){
            if(item != '摘要'){
              this.tableTitle.push(item)
            }

          }
        }
      },
    },
    methods:{
      iconClick(val){
        if(val == 1){
          this.bagImg = this.icon1
          this.isShowChart = true
        }else{
          this.bagImg = this.icon2
          this.isShowChart = false
        }
      },
      changePaperType(val){
        if(val == 1){
          this.isShowPeriodical = true
        }else{
          this.isShowPeriodical = false
        }
      },
    },
  }
</script>
<style lang="less" scoped>
@import "../../../assets/css/titlecss.less";
.outputCon{
  width:100%;
  height:100%;
  .paperList {
    height:320px;
    ul {
      li {
        margin: 0 60px 50px;
        h5 {
          font-size: 16px;
          color: #6f6f6f;
          font-weight: bold;
          line-height: 22px;
          cursor: pointer;
        }
        div {
          line-height: 28px;
          label {
            font-size: 14px;
            color: #6f6f6f;
            font-weight: bold;
          }
          span {
            font-size: 14px;
            color: #6f6f6f;
            cursor: pointer;
          }
        }
      }
    }
  }


  .paperListScroll{
    overflow-y: scroll !important;

    /*width:10px;*/
    /*height:10px;*/
    /*三角箭头的颜色*/
    scrollbar-arrow-color: rgba(0, 0, 0, 0) !important;
    /*滚动条滑块按钮的颜色*/
    scrollbar-face-color: rgba(0, 0, 0, 0)!important;
    /*滚动条整体颜色*/
    scrollbar-highlight-color: rgba(0, 0, 0, 0)!important;
    /*滚动条阴影*/
    scrollbar-shadow-color: rgba(0, 0, 0, 0)!important;
    /*滚动条轨道颜色*/
    scrollbar-track-color: rgba(0, 0, 0, 0)!important;
    /*滚动条3d亮色阴影边框的外观颜色——左边和上边的阴影色*/
    scrollbar-3dlight-color: rgba(0, 0, 0, 0)!important;
    /*滚动条3d暗色阴影边框的外观颜色——右边和下边的阴影色*/
    scrollbar-darkshadow-color: rgba(0, 0, 0, 0)!important;
    /*滚动条基准颜色*/
    scrollbar-base-color: rgba(0, 0, 0, 0)!important;
  }
  .paperListScroll::-webkit-scrollbar {
    width: 5px!important;
    height: 5px!important;
    /*height: 10px!important;*/
  }

  .paperListScroll::-webkit-scrollbar-track {
    background: rgba(0,0,0,0)!important;
    border-radius: 1px!important;
  }

  .paperListScroll::-webkit-scrollbar-thumb {
    background: #ff3925!important;
    /*background: #cfd9e3;*/
    border-radius: 1px!important;
  }

  .paperListScroll::-webkit-scrollbar-thumb:hover {
    background: rgba(0,0,0,0)!important;
  }

  .paperListScroll::-webkit-scrollbar-corner {
    background: rgba(0,0,0,0)!important;
  }

  .paperListScroll::-webkit-scrollbar-track {
    background: rgba(0,0,0,0)!important;
  }

}
.workExperience2 {
  margin:0 20px;
  height:330px;
  .tabDIv{
    height:310px;
    width:100%;
    overflow: auto;
    .tabletitle{
      line-height: 29px;
      font-size: 15px;
      font-weight: 600;
      margin:15px 0  5px;
    }
  }
}
</style>
