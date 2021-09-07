<template>
  <div>
    <div class="titleDiv">
      <div class="titleName">关联网络</div>
      <div class="operating">
        <div class="centerDiv centerDiv1">
          <img :src="bagImg" alt="">
        </div>
        <div @click.stop="iconClick(1)" class="centerLeftDiv"></div>
        <div @click.stop="iconClick(2)" class="centerRightDiv"></div>
      </div>
    </div>
    <div class="conDiv">
      <div class="CooperationTrack">
        <relatedCharts :personImg="newpersonImg" :personDataVal="personDataVal"></relatedCharts>
      </div>
      <div class="tabDIv newTable">
        <el-table
          v-show="isShowPerson"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="value"
            label="关联度"
            width="80"
            align="center"
            >
            <template slot-scope="scope">
              <el-tooltip placement="left" effect="light" popper-class="related-toolTipClass">
                <div slot="content" style="line-height: 24px;font-size: 12px" >
                  {{scope.row.interValue}}<br/>
                  {{scope.row.paperValue}}<br/>
                  {{scope.row.communicateValue}}<br/>
                  {{scope.row.awardValue}}<br/>
                  {{scope.row.hkValue}}<br/>
                </div>
                <div>{{scope.row.value}}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="人员姓名"
            width="80"
            align="center"
            >
          </el-table-column>
          <el-table-column
            prop="org"
            align="center"
            show-overflow-tooltip
            min-width="100"
            label="所在机构">

          </el-table-column>
        </el-table>
        <el-table
          v-show="!isShowPerson"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="value"
            label="关联度"
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-tooltip placement="left" effect="light" popper-class="related-toolTipClass">
                <div slot="content" style="line-height: 24px;font-size: 14px" >
                  {{scope.row.awardValue}}<br/>
                  {{scope.row.communicateValue}}<br/>
                  {{scope.row.hkValue}}<br/>
                  {{scope.row.interValue}}<br/>
                  {{scope.row.laowuValue}}<br/>
                  {{scope.row.paperValue}}<br/>
                  {{scope.row.studyValue}}<br/>
                  {{scope.row.xinziValue}}<br/>
                </div>
                <div>{{scope.row.value}}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="org"
            show-overflow-tooltip
            min-width="100"
            align="center"
            label="机构名称">
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>
</template>

<script>
  import relatedCharts from '@/components/public/charts/relatedChart';
  export default {
    components:{
      relatedCharts,
    },
    data(){
      return{
        icon1:require('../../../assets/images/国际人才/人员模式.png'),
        icon2:require('../../../assets/images/国际人才/机构模式.png'),
        bagImg:require('../../../assets/images/国际人才/人员模式.png'),
        tableData:[],
        personDataVal:[],
        visible: false,
        tableDataperson: [ ],
        tableDataOrg: [],
        orgChartData:[],
        personChartData:[],
        isShowPerson:true,
        newrelatedData:{},
        newpersonImg:'',

      }
    },
    props: ["relatedData",'isRelatedChage','personImg'],
    computed: {
      isRelatedChageCom() {
        return this.isRelatedChage
      }
    },
    watch:{
      relatedData(newval,oldVal){
        this.newrelatedData = newval
      },
      isRelatedChageCom:{
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          this.$nextTick(()=>{
            this.getChangeData()
          })
        }
      },
      personImg:{
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {

          this.newpersonImg = val

        }
      },
    },
    created(){
    },
    mounted(){
    },
    methods:{
      getChangeData(){
        this.newrelatedData = this.relatedData
        if(this.newrelatedData){
          for(let item in this.newrelatedData.person){
            this.personChartData.push(item)
          }
          for(let item in this.newrelatedData.org){
            this.orgChartData.push(item)
          }
          this.tableDataperson = [...this.newrelatedData.personDetail ]
          this.tableDataOrg = this.newrelatedData.orgDetail
          this.tableData = this.newrelatedData.personDetail
          this.personDataVal = this.personChartData
        }

      },

      iconClick(val){
        if(val == 1){
          this.bagImg = this.icon1
          this.personDataVal = this.personChartData
          this.tableData = this.tableDataperson
          this.isShowPerson = true

        }else{
          this.bagImg = this.icon2
          this.personDataVal = this.orgChartData
          this.tableData = this.tableDataOrg
          this.isShowPerson = false
        }
      },
    },
  }
</script>
<style lang="less">
  .related-toolTipClass{
    background-color: #d9dbdf !important;
    color: #6d788d;
    font-size: 12px;
    border:1px solid rgba(0,0,0,0)!important;
    padding:10px;
    line-height:29px;
  }
  .el-tooltip__popper[x-placement^=left] .popper__arrow::after {
    border-left-color: red;
  }

  .el-tooltip__popper[x-placement^=left] .popper__arrow{
    border-left-color: red;
  }
</style>
<style lang="less" scoped>
  @import "../../../assets/css/titlecss.less";
  .conDiv{
    display: flex;
    align-items: center;
    .CooperationTrack{
      width: 320px;
      height: 320px;
    }
    .tabDIv{
      flex:1;
      /*background: #000;*/
      box-sizing: border-box;
      height:270px;
      overflow: hidden;
      padding:2px 20px;
    }

  }

</style>
