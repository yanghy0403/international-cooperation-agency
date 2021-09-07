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
          :data="tableDataperson"
          style="width: 100%">
          <el-table-column
            prop="count"
            label="关联度"
            width="80"
            align="center"
            >
            <template slot-scope="scope">
              <el-tooltip placement="left" effect="light" popper-class="related-toolTipClass">
                <div slot="content" style="line-height: 24px;font-size: 12px" >
                  <span v-for="(item,index) in scope.row.list" :key="index">{{item.name}}:{{item.value}}</span><br/>
                </div>
                <div>{{scope.row.count}}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="personName"
            label="人员姓名"
            width="80"
            align="center"
            >
          </el-table-column>
          <el-table-column
            prop="personOrg"
            align="center"
            show-overflow-tooltip
            min-width="100"
            label="所在机构">

          </el-table-column>
        </el-table>
        <el-table
          v-show="!isShowPerson"
          :data="tableDataOrg"
          style="width: 100%">
          <el-table-column
            prop="count"
            label="关联度"
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-tooltip placement="left" effect="light" popper-class="related-toolTipClass">
                <div slot="content" style="line-height: 24px;font-size: 14px" >
                 <span v-for="(item,index) in scope.row.list" :key="index">{{item.name}}:{{item.value}}</span><br/>
                </div>
                <div>{{scope.row.count}}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="orgName"
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
        this.newrelatedData = JSON.parse(JSON.stringify(this.relatedData))
        if(this.newrelatedData){
          this.newrelatedData.person.forEach((item,index)=>{
            this.personChartData.push(item.personName)
          })
          this.newrelatedData.org.forEach((item,index)=>{
            this.orgChartData.push(item.orgName)
          })
          this.personDataVal = this.personChartData
          this.tableDataperson = this.newrelatedData.person
          this.tableDataOrg = this.newrelatedData.org
          this.tableDataOrg.forEach((item,index)=>{
            let arr = []
            if(item.visitOut!= 0){
              arr.push({
                name:'出访',
                value:item.visitOut,
              })
            }else if(item.crossMeeting!= 0){
              arr.push({
                name:'海峡两岸会议',
                value:item.crossMeeting,
              })
            }else if(item.sakura!= 0){
              arr.push({
                name:'樱花计划',
                value:item.sakura,
              })
            }else if(item.specialPlan!= 0){
              arr.push({
                name:'特别交流计划',
                value:item.specialPlan,
              })
            }else if(item.internationalPerson!= 0){
              arr.push({
                name:'国际人才计划',
                value:item.internationalPerson,
              })
            }else if(item.taiWanYong!= 0){
              arr.push({
                name:'台湾青年人才计划',
                value:item.taiWanYong,
              })
            }else if(item.internationalPartner!= 0){
              arr.push({
                name:'国际伙伴计划',
                value:item.internationalPartner,
              })
            }else if(item.hkLib!= 0){
              arr.push({
                name:'香港联合实验室',
                value:item.hkLib,
              })
            }else if(item.casYongAward!= 0){
              arr.push({
                name:'中科院青年科学家国际合作伙伴奖',
                value:item.casYongAward,
              })
            }else if(item.paper!= 0){
              arr.push({
                name:'合作论文',
                value:item.paper,
              })
            }else if(item.sinoForeignUnit!= 0){
              arr.push({
                name:'中外联合研究单元',
                value:item.sinoForeignUnit,
              })
            }

            item.list = [...arr]
          })
          this.tableDataperson.forEach((item,index)=>{
            let arr = []
            if(item.visitOut!= 0){
              arr.push({
                name:'出访',
                value:item.visitOut,
              })
            }else if(item.crossMeeting!= 0){
              arr.push({
                name:'海峡两岸会议',
                value:item.crossMeeting,
              })
            }else if(item.internationalPerson!= 0){
              arr.push({
                name:'国际人才计划',
                value:item.internationalPerson,
              })
            }else if(item.taiWanYong!= 0){
              arr.push({
                name:'台湾青年人才计划',
                value:item.taiWanYong,
              })
            }else if(item.hkLib!= 0){
              arr.push({
                name:'香港联合实验室',
                value:item.hkLib,
              })
            }else if(item.casYongAward!= 0){
              arr.push({
                name:'中科院青年科学家国际合作伙伴奖',
                value:item.casYongAward,
              })
            }else if(item.paper!= 0){
              arr.push({
                name:'合作论文',
                value:item.paper,
              })
            }else if(item.sinoForeignUnit!= 0){
              arr.push({
                name:'中外联合研究单元',
                value:item.sinoForeignUnit,
              })
            }
            item.list = [...arr]
          })
        }
      },

      iconClick(val){
        if(val == 1){
          this.bagImg = this.icon1
          this.personDataVal = this.personChartData
          this.isShowPerson = true
        }else{
          this.bagImg = this.icon2
          this.personDataVal = this.orgChartData
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
