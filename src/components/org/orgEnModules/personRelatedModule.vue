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
        <relatedCharts :personDataVal="personDataVal"></relatedCharts>




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
                  <p v-for="(item,index) in scope.row.list" :key="index">{{item.name}}:{{item.value}}</p><br/>
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
                 <p v-for="(item,index) in scope.row.list" :key="index">{{item.name}}:{{item.value}}</p><br/>
                </div>
                <div>{{scope.row.value}}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
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


      }
    },
    props: ["relatedData",'isRelatedChage'],
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
    },
    created(){
    },
    mounted(){
    },
    methods:{
      getChangeData(){
        this.newrelatedData = JSON.parse(JSON.stringify(this.relatedData))
        if(this.newrelatedData){
          this.newrelatedData.personDetail.forEach((item,index)=>{
            this.personChartData.push(item.name)
          })
          this.newrelatedData.orgDetail.forEach((item,index)=>{
            this.orgChartData.push(item.name)
          })
          this.personDataVal = this.personChartData
          this.tableDataperson = this.newrelatedData.personDetail
          this.tableDataOrg = this.newrelatedData.orgDetail
          this.tableDataOrg.forEach((item,index)=>{
            let arr = []
            if(item.visitOutValue!= null){
              arr.push({
                name:'出访',
                value:item.visitOutValue,
              })
            }
            if(item.laifnagValue!= null){
              arr.push({
                name:'来访',
                value:item.laifnagValue,
              })
            }
            if(item.crossMeetingValue!= null){
              arr.push({
                name:'海峡两岸会议',
                value:item.crossMeetingValue,
              })
            }
            if(item.conferenceChinaValue!= null) {
              arr.push({
                name:'在华国际会议资助',
                value:item.conferenceChinaValue,
              })
            }
            if(item.sakuraValue!= null){
              arr.push({
                name:'樱花计划',
                value:item.sakuraValue,
              })
            }
            if(item.specialPlanValue!= null){
              arr.push({
                name:'特别交流计划',
                value:item.specialPlanValue,
              })
            }
            if(item.interValue!= null){
              arr.push({
                name:'国际人才计划',
                value:item.interValue,
              })
            }
            if(item.taiwanValue!= null){
              arr.push({
                name:'台湾青年人才计划',
                value:item.taiwanValue,
              })
            }
            if(item.partnerValue!= null){
              arr.push({
                name:'国际伙伴计划',
                value:item.partnerValue,
              })
            }
            if(item.hkValue!= null){
              arr.push({
                name:'香港联合实验室',
                value:item.hkValue,
              })
            }
            if(item.researchUnitValue!= null){
              arr.push({
                name:'中外联合研究单元',
                value:item.researchUnitValue,
              })
            }
            if(item.zkyOperateAwardValue!= null){
              arr.push({
                name:'中科院国家国际科技合作奖',
                value:item.zkyOperateAwardValue,
              })
            }
            if(item.zkyYoungAwardValue!= null){
              arr.push({
                name:'中科院青年科学家国际合作伙伴奖',
                value:item.zkyYoungAwardValue,
              })
            }
            if(item.countryTechAwardValue!= null){
              arr.push({
                name:'国家国际科技合作奖',
                value:item.countryTechAwardValue,
              })
            }
            if(item.countryGovermentAwardValue!= null){
              arr.push({
                name:'中国政府“友谊奖”',
                value:item.countryGovermentAwardValue,
              })
            }
            if(item.paperValue!= null){
              arr.push({
                name:'合作论文',
                value:item.paperValue,
              })
            }
            item.list = [...arr]
          })
          this.tableDataperson.forEach((item,index)=>{
            let arr = []
            if(item.visitoutVlaue!= null){
              arr.push({
                name:'出访',
                value:item.visitoutVlaue,
              })
            }
            if(item.laifangValue!= null){
              arr.push({
                name:'来访',
                value:item.laifangValue,
              })
            }
            if(item.crossMeetingValue!= null){
              arr.push({
                name:'海峡两岸会议',
                value:item.crossMeetingValue,
              })
            }
            if(item.interValue!= null){
              arr.push({
                name:'国际人才计划',
                value:item.interValue,
              })
            }
            if(item.taiwanValue!= null){
              arr.push({
                name:'台湾青年人才计划',
                value:item.taiwanValue,
              })
            }
            if(item.hkValue!= null){
              arr.push({
                name:'香港联合实验室',
                value:item.hkValue,
              })
            }
            if(item.youngAwardVlaue!= null){
              arr.push({
                name:'中科院青年科学家国际合作伙伴奖',
                value:item.youngAwardVlaue,
              })
            }
            if(item.paperValue!= null){
              arr.push({
                name:'合作论文',
                value:item.paperValue,
              })
            }
            if(item.researchUnitValue!= null){
              arr.push({
                name:'中外联合研究单元',
                value:item.researchUnitValue,
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
