<template>
  <div class="subsidize">
    <div v-if="selectedCur == 0">
      <div v-if="change">
        <div class="indexTitleDiv">
          <div class="titleName">
            <span @click.stop="changeType(0)" :class="{selectAcitve:selectedCur==0}">院内作者排名TOP10</span>
            <img src="../../../assets/images/国际人才/wangfandijia.png" alt />
            <span @click.stop="changeType(1)" :class="{selectAcitve:selectedCur==1}">国外作者排名TOP10</span>
          </div>
          <div class="operating">
            <div @click.stop="iconClick(1)" class="downloadNew iconDiv"></div>
            <div @click.stop="iconClick(2)" class="visualization iconDiv">
              <img :src="icon1" alt />
            </div>
            <div @click.stop="iconClick(3)" class="visualizationList iconDiv">
              <img :src="icon2" alt />
            </div>
            <div @click.stop="iconClick(4)" class="fullScreen iconDiv"></div>
          </div>
        </div>
        <div class="subsidizeCharts" v-show="isShowChart" ref="mySubsidizeChartDiv">
          <div style="width: 48%;position: relative;" class="subsidizeChart" id="mySubsidizeChart"  ref="mySubsidizeChart">
            <div style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" ref="mySubsidizeChartHover">

            </div>
            <div class="rankTitle">
              <div class="rangeLeftDiv"></div>
              <div class="rangeRightDiv" ref="rangeItemRef">
                <div  class="rangeItem" v-for="(item,index) in rankRange" :key="index">{{item}}</div>
              </div>
            </div>
            <div class="rankCon" >
              <div ref="rankConBoxDiv">
                <div class="topHeight"></div>
                <div class="conItem" @click="foundingDataClick(item.personId,item.name)" v-for="(item,index) in foundingData" :key="index">
                  <div class="conLeft">{{item.name}}</div>
                  <div class="conRight">
                    <div  class="colorDiv" :style="{width:((Number(item.value)/Number(rankRange[6])*(13/14))*100+'%') , marginLeft:((rangeItemWidth/2)+'px')}"></div>
                    <div class="textDiv">{{item.value}}</div>
                  </div>
                </div>
              </div>

              <div class="lineDiv" :style="{width:(rangeItemWidth*7)+'px',height:rankConBoxDivHeight+'px'}">
                <div  :style="{width:(rangeItemWidth)+'px',height:rankConBoxDivHeight+'px'}"  class="lineItem" v-for="(item,index) in 7" :key="index">
                  <div class="line" :style="{width:'1px',height:rankConBoxDivHeight+'px'}"></div>
                </div>
              </div>
            </div>
          </div>
          <div style="width: 4%;"></div>
          <div style="width: 48%;height: 100%;display: flex;flex-direction: column">
            <div style="height: 30px;line-height: 30px;font-size: 18px;font-weight: 600;color: #393939;">{{personName}}合作人员图谱</div>
            <div style="width: 100%;flex: 1;border: 1px solid #d3d6dd;" ref="myrelationChart1"></div>
          </div>
          <div v-if="tabNum == 1" class="maskDiV"></div>
        </div>
        <div ref="myTableImg"  id="subsidizeList" v-show="!isShowChart">
          <table>
            <thead>
            <tr>
              <th>单位名称</th>
              <th>篇数</th>
            </tr>
            </thead>
            <tbody v-if="tableData1 != undefined">
            <tr v-for="(item,i) in tableData1" :key="i">
              <td>{{item.name}}</td>
              <td>{{item.value}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <transition name="bounce" mode="out-in">
        <div class="fullFcreen" v-if="!change">
          <div class="indexTitleDiv">
            <div class="titleName">
              <span @click.stop="changeType(0)" :class="{selectAcitve:selectedCur==0}">院内作者排名TOP10</span>
              <img src="../../../assets/images/国际人才/wangfandijia.png" alt />
              <span @click.stop="changeType(1)" :class="{selectAcitve:selectedCur==1}">国外作者排名TOP10</span>
            </div>
            <div class="operating">
              <div @click.stop="iconClick(1)" class="downloadNew iconDiv"></div>
              <div @click.stop="iconClick(2)" class="visualization iconDiv">
                <img :src="icon1" alt />
              </div>
              <div @click.stop="iconClick(3)" class="visualizationList iconDiv">
                <img :src="icon2" alt />
              </div>
              <div @click.stop="iconClick(4)" class="fullScreensPlus iconDiv"></div>
            </div>
          </div>
          <div class="subsidizeCharts" v-show="isShowChart" ref="mySubsidizeChartDiv">
            <div style="width: 48%;display: flex;flex-direction: column" class="subsidizeChart"  ref=" mySubsidizeChart2">
              <div class="rankTitle">
                <div class="rangeLeftDiv"></div>
                <div class="rangeRightDiv" ref="rangeItemRef2">
                  <div  class="rangeItem" v-for="(item,index) in rankRange" :key="index">{{item}}</div>
                </div>
              </div>
              <div class="rankCon" style="flex: 1;">
                <div ref="rankConBoxDiv2">
                  <div class="topHeight"></div>
                  <div class="conItem conItem2" @click="foundingDataClick(item.personId,item.name)" v-for="(item,index) in foundingData" :key="index">
                    <div class="conLeft">{{item.name}}</div>
                    <div class="conRight">
                      <div  class="colorDiv" :style="{width:((Number(item.value)/Number(rankRange[6])*(12/13))*100+'%') , marginLeft:((rangeItemWidth2/2)+'px')}"></div>
                      <div class="textDiv">{{item.value}}</div>
                    </div>
                  </div>
                </div>

                <div class="lineDiv" :style="{width:(rangeItemWidth2*7)+'px',height:rankConBoxDivHeight2+'px'}">
                  <div  :style="{width:(rangeItemWidth2)+'px',height:rankConBoxDivHeight2+'px'}"  class="lineItem" v-for="(item,index) in 7" :key="index">
                    <div class="line" :style="{width:'1px',height:rankConBoxDivHeight2+'px'}"></div>
                  </div>
                </div>
              </div>
            </div>
            <div style="width: 4%;"></div>
            <div style="width: 48%;height: 100%;display: flex;flex-direction: column">
              <div style="height: 30px;line-height: 30px;font-size: 18px;font-weight: 600;color: #393939;">{{personName}}合作人员图谱</div>
              <div style="width: 100%;flex: 1;border: 1px solid #d3d6dd;" ref="myrelationChart1"></div>
            </div>
            <div v-if="tabNum == 1" class="maskDiV"></div>
          </div>
          <div ref="myTableImg"  id="subsidizeList" v-show="!isShowChart">
            <table>
              <thead>
              <tr>
                <th>单位名称</th>
                <th>篇数</th>
              </tr>
              </thead>
              <tbody v-if="tableData1 != undefined">
              <tr v-for="(item,i) in tableData1" :key="i">
                <td>{{item.name}}</td>
                <td>{{item.value}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </transition>
    </div>

    <div v-if="selectedCur == 1">
      <div v-if="change">
        <div class="indexTitleDiv">
          <div class="titleName">
            <span @click.stop="changeType(0)" :class="{selectAcitve:selectedCur==0}">院内作者排名TOP10</span>
            <img src="../../../assets/images/国际人才/wangfandijia.png" alt />
            <span @click.stop="changeType(1)" :class="{selectAcitve:selectedCur==1}">国外作者排名TOP10</span>
          </div>
          <div class="operating">
            <div @click.stop="iconClick(1)" class="downloadNew iconDiv"></div>
            <div @click.stop="iconClick(2)" class="visualization iconDiv">
              <img :src="icon1" alt />
            </div>
            <div @click.stop="iconClick(3)" class="visualizationList iconDiv">
              <img :src="icon2" alt />
            </div>
            <div @click.stop="iconClick(4)" class="fullScreen iconDiv"></div>
          </div>
        </div>
        <div class="subsidizeCharts" v-show="isShowChart" ref="mySubsidizeChartDiv">
          <div style="width: 48%;position: relative" class="subsidizeChart" id="mySubsidizeChart"  ref="mySubsidizeChart">
            <div style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" ref="mySubsidizeChartHover">

            </div>
            <div class="rankTitle">
              <div class="rangeLeftDiv"></div>
              <div class="rangeRightDiv" ref="rangeItemRef">
                <div  class="rangeItem" v-for="(item,index) in rankRange2" :key="index">{{item}}</div>
              </div>
            </div>
            <div class="rankCon" >
              <div ref="rankConBoxDiv">
                <div class="topHeight"></div>
                <div class="conItem" @click="foundingDataClick2(item.personId,item.name)"  v-for="(item,index) in foundingData2" :key="index">
                  <div class="conLeft">{{item.name}}</div>
                  <div class="conRight">
                    <div  class="colorDiv" :style="{width:((Number(item.value)/Number(rankRange2[6])*(13/14))*100+'%') , marginLeft:((rangeItemWidth/2)+'px')}"></div>
                    <div class="textDiv">{{item.value}}</div>
                  </div>
                </div>
              </div>

              <div class="lineDiv" :style="{width:(rangeItemWidth*7)+'px',height:rankConBoxDivHeight+'px'}">
                <div  :style="{width:(rangeItemWidth)+'px',height:rankConBoxDivHeight+'px'}"  class="lineItem" v-for="(item,index) in 7" :key="index">
                  <div class="line" :style="{width:'1px',height:rankConBoxDivHeight+'px'}"></div>
                </div>
              </div>
            </div>
          </div>
          <div style="width: 4%;"></div>
          <div style="width: 48%;height: 100%;">
            <div style="height: 30px;line-height: 30px;font-size: 18px;font-weight: 600;color: #393939;">{{personName2}}合作人员图谱</div>
            <div style="width: 100%;height: 90%;border: 1px solid #d3d6dd;" ref="myrelationChart2"></div>
          </div>
          <div v-if="tabNum == 1" class="maskDiV"></div>
        </div>
        <div ref="myTableImg"  id="subsidizeList" v-show="!isShowChart">
          <table>
            <thead>
            <tr>
              <th>单位名称</th>
              <th>篇数</th>
            </tr>
            </thead>
            <tbody v-if="tableData2 != undefined">
            <tr v-for="(item,i) in tableData2" :key="i">
              <td>{{item.name}}</td>
              <td>{{item.value}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <transition name="bounce" mode="out-in">
        <div class="fullFcreen" v-if="!change">
          <div class="indexTitleDiv">
            <div class="titleName">
              <span @click.stop="changeType(0)" :class="{selectAcitve:selectedCur==0}">院内作者排名TOP10</span>
              <img src="../../../assets/images/国际人才/wangfandijia.png" alt />
              <span @click.stop="changeType(1)" :class="{selectAcitve:selectedCur==1}">国外作者排名TOP10</span>
            </div>
            <div class="operating">
              <div @click.stop="iconClick(1)" class="downloadNew iconDiv"></div>
              <div @click.stop="iconClick(2)" class="visualization iconDiv">
                <img :src="icon1" alt />
              </div>
              <div @click.stop="iconClick(3)" class="visualizationList iconDiv">
                <img :src="icon2" alt />
              </div>
              <div @click.stop="iconClick(4)" class="fullScreensPlus iconDiv"></div>
            </div>
          </div>
          <div class="subsidizeCharts" v-show="isShowChart" ref="mySubsidizeChartDiv">
            <div style="width: 48%;display: flex;flex-direction: column;" class="subsidizeChart"  ref=" mySubsidizeChart2">
              <div class="rankTitle">
                <div class="rangeLeftDiv"></div>
                <div class="rangeRightDiv" ref="rangeItemRef2">
                  <div  class="rangeItem" v-for="(item,index) in rankRange2" :key="index">{{item}}</div>
                </div>
              </div>
              <div class="rankCon" style="height: 100%;flex: 1;">
                <div ref="rankConBoxDiv2">
                  <div class="topHeight"></div>
                  <div class="conItem conItem2" @click="foundingDataClick2(item.personId,item.name)" v-for="(item,index) in foundingData2" :key="index">
                    <div class="conLeft">{{item.name}}</div>
                    <div class="conRight">
                      <div  class="colorDiv" :style="{width:((Number(item.value)/Number(rankRange2[6])*(12/13))*100+'%') , marginLeft:((rangeItemWidth2/2)+'px')}"></div>
                      <div class="textDiv">{{item.value}}</div>
                    </div>
                  </div>
                </div>

                <div class="lineDiv" :style="{width:(rangeItemWidth2*7)+'px',height:'100%'}">
                  <div  :style="{width:(rangeItemWidth2)+'px',height:rankConBoxDivHeight2+'px'}"  class="lineItem" v-for="(item,index) in 7" :key="index">
                    <div class="line" :style="{width:'1px',height:rankConBoxDivHeight2+'px'}"></div>
                  </div>
                </div>
              </div>
            </div>
            <div style="width: 4%;"></div>
            <div style="width: 48%;height: 100%;display: flex;flex-direction: column">
              <div style="height: 30px;line-height: 30px;font-size: 18px;font-weight: 600;color: #393939;">{{personName2}}合作人员图谱</div>
              <div style="width: 100%;flex: 1;border: 1px solid #d3d6dd;" ref="myrelationChart2"></div>
            </div>
            <div v-if="tabNum == 1" class="maskDiV"></div>
          </div>
          <div ref="myTableImg"  id="subsidizeList" v-show="!isShowChart">
            <table>
              <thead>
              <tr>
                <th>单位名称</th>
                <th>篇数</th>
              </tr>
              </thead>
              <tbody v-if="tableData2 != undefined">
              <tr v-for="(item,i) in tableData2" :key="i">
                <td>{{item.name}}</td>
                <td>{{item.value}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </transition>
    </div>


  </div>
</template>

<script>
  //引入js
  import visitFun from '@/assets/js/visit.js'
  export default {
    data() {
      return {
        icon1: require("../../../assets/images/国际人才/index/图表选中.png"),
        icon2: require("../../../assets/images/国际人才/index/图标列表默认.png"),
        icon3: require("../../../assets/images/国际人才/index/图表默认.png"),
        icon4: require("../../../assets/images/国际人才/index/图表列表选中.png"),
        icon5: require("../../../assets/images/国际人才/index/图表选中.png"),
        icon6: require("../../../assets/images/国际人才/index/图标列表默认.png"),
        change: true,
        chart: 0,
        selectedCur:0,
        show: false,
        clientHeight: "",
        foundingData: [],
        foundingData2: [],
        mySubsidizeChart: null,
        titleName: "全院出访人次单位排名",
        tableData1: [],
        tableData2: [],
        isShowChart: true,
        tabNum: "",
        rankRange:['0','2000','4000','6000','8000','10000','12000'],
        rankRange2:['0','2000','4000','6000','8000','10000','12000'],
        maxNum:'12000',

        rankConrHeight:'',
        rankConrHeight2:'',
        rangeItemWidth:'',
        rangeItemWidth2:'',
        rankConBoxDivHeight:'',
        rankConBoxDivHeight2:'',
        myChart1:null,
        myChart2:null,
        personName:'',
        personName2:'',
      };
    },
    props: ["data","mode","visitType"],
    watch: {
      data: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          let data = val.zhPersonList
          let data2 = val.enPersonList
          if(val.zhPersonList.length > 0){
            this.foundingDataClick(val.zhPersonList[0].personId, val.zhPersonList[0].name)

          }
          this.getNewData(data)
          this.getNewData2(data2)
        }
      },
      mode: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          this.tabNum = val;
        }
      },
      change: {
        deep: true, // 深度监听
        immediate: true, // 监听到后，立即执行 handler方法
        handler (val) {
          let that = this
          if(val == true){
            this.rangeItemWidth2 = (this.$refs.rangeItemRef2.clientWidth)/7
            this.rankConBoxDivHeight2 = (this.$refs.mySubsidizeChart2.clientHeight)
          }else{
            this.getFullWidth()
          }
        }
      },
    },
    mounted() {
      let that = this
      this.clientHeight = `${document.documentElement.clientHeight}`; //获取浏览器可视区域高度
      window.onresize = function () {
        that.clientHeight = `${document.documentElement.clientHeight}`;
      };
      this.handleSubsidizeChart1()
      let val = {
        chartData:[
          {
            name:'李达舜',
            value:'1956',
          },{
            name:'张文才',
            value:'1622',
          },{
            name:'王志宏',
            value:'1358',
          },{
            name:'苏建强',
            value:'1262',
          },{
            name:'王夕阳',
            value:'966',
          },{
            name:'原野',
            value:'526',
          },{
            name:'陈锋',
            value:'423',
          },{
            name:'李硕',
            value:'320',
          },{
            name:'赵光',
            value:'296',
          },{
            name:'李科',
            value:'256',
          },
        ],
      }

      let val2 = {
        chartData:[
          {
            name:'Zhang Di',
            value:'1956',
          },{
            name:'Tang Zhanyun',
            value:'1622',
          },{
            name:'he Huang',
            value:'1358',
          },{
            name:'Zhou Guoyin',
            value:'1262',
          },{
            name:'Lev Becker',
            value:'966',
          },{
            name:'hen ye',
            value:'526',
          },{
            name:' Matthew Perez nott',
            value:'423',
          },{
            name:' Ren Bing',
            value:'320',
          },{
            name:'Ben may dept cancres',
            value:'296',
          },{
            name:'Diane Qizi',
            value:'256',
          },
        ],
      }
//      this.getNewData(val)
//       this.getNewData2(val2)

    },
    methods: {

      getNewData(val){
        this.foundingData = val;
        this.tableData1 = val;
        this.$nextTick(() => {
          this.rankConrHeight = (this.$refs.mySubsidizeChart.clientHeight-20)+'px'
          this.rangeItemWidth = (this.$refs.rangeItemRef.clientWidth)/7
          this.rankConBoxDivHeight = (this.$refs.rankConBoxDiv.clientHeight)
        });

        if(val){
          let arr = visitFun.getRangeType(val[0].value)
          this.rankRange = arr
        }
      },
      getNewData2(val){
        this.foundingData2 = val;
        this.tableData2 = val;
        this.$nextTick(() => {
          this.rankConrHeight = (this.$refs.mySubsidizeChart.clientHeight-20)+'px'
          this.rangeItemWidth = (this.$refs.rangeItemRef.clientWidth)/7
          this.rankConBoxDivHeight = (this.$refs.rankConBoxDiv.clientHeight)
        });
        if(val){
          let arr = visitFun.getRangeType(val[0].value)
          this.rankRange2 = arr
        }
      },


      changeType(val){
        let that = this
        this.selectedCur = val
        if(val == 1){
          setTimeout(function () {
            that.foundingDataClick2(that.foundingData2[0].personId, that.foundingData2[0].name)
          },200)
        }else{
          setTimeout(function () {
            that.foundingDataClick(that.foundingData[0].personId, that.foundingData[0].name)
          },200)
        }
      },

      getFullWidth(){
        this.$nextTick(() => {
          this.rangeItemWidth2 = (this.$refs.rangeItemRef2.clientWidth)/7
          this.rankConBoxDivHeight2 = (this.$refs.mySubsidizeChart2.clientHeight)
          this.rankConrHeight2 = (this.$refs.mySubsidizeChart2.clientHeight-20)+'px'
        });
      },
      iconClick(val) {
        let that = this
        if (val == 1) {
          if(this.isShowChart){
            this.download();
          }else{
            this.downloadTable();
          }
        } else if (val == 2) {
          this.icon1 = this.icon5;
          this.icon2 = this.icon6;
          this.isShowChart = true;
          this.getFullWidth()
        } else if (val == 3) {
          this.icon1 = this.icon3;
          this.icon2 = this.icon4;
          this.isShowChart = false;
        } else if (val == 4) {
          this.handleChange();
        }
      },
      handleChange() {
        let that = this
        this.change = !this.change;
        let time = setTimeout(() => {
          if (!this.change) {
            this.$refs.mySubsidizeChart.style.height =
              this.clientHeight - 250 + "px";

            this.getFullWidth();
          } else {
            this.$refs.mySubsidizeChart.style.height = 350 + "px";

            this.rangeItemWidth2 = (this.$refs.rangeItemRef2.clientWidth)/7
            this.rankConBoxDivHeight2 = (this.$refs.mySubsidizeChart2.clientHeight)
          }
//          this.getFullWidth();

          this.foundingDataClick2(this.foundingData2[0].personId, this.foundingData2[0].name)
          this.foundingDataClick(this.foundingData[0].personId, this.foundingData[0].name)
          clearTimeout(time);
        }, 200);

        let time2 = setTimeout(() => {
          this.foundingDataClick2(this.foundingData2[0].personId, this.foundingData2[0].name)
          this.foundingDataClick(this.foundingData[0].personId, this.foundingData[0].name)
          clearTimeout(time2);
        }, 1000);
      },
      foundingDataClick(id,paramsName){
        this.axios( {
          method: 'POST',
          url: "/paper/statistic/graph",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: [
            function () {
              let ret = ''
              let params = {
                personId:id,
                personName:paramsName,
              }
              for (let it in params) {
                ret +=
                  encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
              }
              return ret
            }
          ]
        }).then((res) => {
          if (res.data.code == 200) {
            let data  = []
            let links = []
            res.data.data.nodeList.forEach((item,index)=>{
              if(item.size){
                data.push({
                  "name": item.personId,
                  "value": item.size/10 >10?item.size/10:10,
                  "symbolSize": item.size/10 >10?item.size/10:10,
                  'realName':item.name,
                  "draggable": "true",
                  "label":{
                    'normal':{
                      show:true,
                      position: 'top',
                      color:'#191919',
                      formatter:item.name,
                    }
                  },
                  "itemStyle": {
                    "normal": {
                      "color": `rgba(255,58,37)`
                    }
                  }
                } )
              }else{
                data.push({
                  "name": item.personId,
                  "value": 80,
                  "symbolSize": 80,
                  "draggable": "true",
                  'realName':item.name,
                  "label":{
                    'normal':{
                      show:true,
                      color:'#fff',
                      fontSize: '16' ,
                      formatter:item.name,
                    }
                  },
                  "itemStyle": {
                    "normal": {
                      "color": `#ff3a25`
                    }
                  }
                } )
              }
            })
            let maxlink = res.data.data.linkList[0].width
            res.data.data.linkList.forEach((item,index)=>{
              links.push({
                source:item.target,
                target:item.source,
                content:item.content,
                lineStyle:{
                  width:((item.width)/maxlink*4)+1,
                },
              })
            })
            this.personName = paramsName
            this.handleSubsidizeChart1(data, links)
          }
        });
      },

      foundingDataClick2(id,paramsName){
        this.axios( {
          method: 'POST',
          url: "/paper/statistic/graph",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: [
            function () {
              let ret = ''
              let params = {
                personId:id,
                personName:paramsName,
              }
              for (let it in params) {
                ret +=
                  encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
              }
              return ret
            }
          ]
        }).then((res) => {
          if (res.data.code == 200) {
            let data  = []
            let links = []
            res.data.data.nodeList.forEach((item,index)=>{
              if(item.size){
                data.push({
                  "name": item.personId,
                  "value": this.change?item.size/10:item.size/8,
                  "symbolSize": item.size/10 >10?item.size/10:10,
                  'realName':item.name,
                  "draggable": "true",
                  "label":{
                    'normal':{
                      show:true,
                      position: 'top',
                      color:'#191919',
                      formatter:item.name,
                    }
                  },
                  "itemStyle": {
                    "normal": {
                      "color": `rgba(255,58,37)`
                    }
                  }
                } )
              }else{
                data.push({
                  "name": item.personId,
                  "value": 80,
                  "symbolSize": 80,
                  "draggable": "true",
                  'realName':item.name,
                  "label":{
                    'normal':{
                      show:true,
                      color:'#fff',
                      fontSize: '16' ,
                      formatter:item.name,
                    }
                  },
                  "itemStyle": {
                    "normal": {
                      "color": `#ff3a25`
                    }
                  }
                } )
              }
            })
            let maxlink = res.data.data.linkList[0].width
            res.data.data.linkList.forEach((item,index)=>{
              links.push({
                source:item.target,
                target:item.source,
                content:item.content,
                lineStyle:{
                  width:((item.width)/maxlink*4)+1,
                },
              })
            })
            this.personName2 = paramsName
            this.handleSubsidizeChart2(data, links)
          }
        });
      },


      // 下载图片
      download() {
        let self = this;
        // let refs = self.$refs.mySubsidizeChartDiv
        let refs = self.$refs.mySubsidizeChartDiv
        let imgName = `全院${self.visitType}人次单位排名`
        setTimeout(function () {
          visitFun.downloadImg(refs,imgName)
        },500)
      },
      // 下载table
      downloadTable() {
        let self = this;
        let refs = self.$refs.myTableImg
        let imgName = `全院${self.visitType}人次单位排名`
        setTimeout(function () {
          visitFun.downloadImg(refs,imgName)
        },500)
      },

      handleSubsidizeChart1(data,links) {
        this.myChart1 = null
        this.myChart1 = this.$echarts.init(this.$refs.myrelationChart1)
        let type = 'in'
        this.getRelatedChart(this.myChart1,data,links,type)
      },
      handleSubsidizeChart2(data,links) {
        this.myChart2 = null
        this.myChart2 = this.$echarts.init(this.$refs.myrelationChart2)
        let type = 'out'
          this.getRelatedChart(this.myChart2,data,links,type)
      },

      getRelatedChart(val,data,links,type){
        let myChart = val,
          _this = this;
        myChart.showLoading();
        let option = option = {
          backgroundColor: 'rgba(0,0,0,0)',
          tooltip: {
            formatter: (params) => {
              if(params.dataType == 'node'){
                return params.data.realName
              }else if(params.dataType == 'edge'){
                return params.data.content
              }
            },
          },
          animationDuration: 3000,
          animationEasingUpdate: 'quinticInOut',
          grid:{
            x:20,
            y:20,
            x2:5,
            y2:20,
          },
          series: [{
            name: '论文关系图',
            type: 'graph',
            layout: 'force',
            force: {
              repulsion: _this.change?600:1500
            },
            data:data,
            links:links,

            focusNodeAdjacency: false,
            roam: true,
            label: {
              normal: {
                show: true,
                // position: 'top',
              }
            },
            lineStyle: {
              normal: {
                color: '#ff3a25',
                curveness: 0,
                type: "solid"
              }
            }
          }]
        };
        myChart.setOption(option, true);
        myChart.hideLoading();
        myChart.off("click");
        myChart.on("click", function (params) {
          let  id = params.data.name;
          if(type == 'out'){
            _this.$router.push({
              path: "/PersonDetails",
              query: { id: id },
            });
          }else if(type == 'in'){
            _this.$router.push({
              path: "/domesticPersonnelInfor",
              query: { id: id },
            });
          }
        });

      },

    },
  };
</script>

<style lang="less" scoped>
  @import "../../../assets/css/titlecss.less";
  .selectAcitve {
    color: #ff3a25!important;
  }
  .titleName{
    cursor: pointer;
  }
  .subsidizeChart{
    width: 100%;
    height: 100%;
    z-index: 5;

    .rankTitle{
      width: 100%;
      height: 20px;
      background: #ede2e2;
      display: flex;
      .rangeLeftDiv{
        /*width: 147px;*/
        width: 120px;
      }
      .rangeRightDiv{
        flex: 1;
        display: flex;
        .rangeItem{
          flex: 1;
          text-align: center;
          color: #8f949f;
          font-size: 10px;
          line-height: 20px;
        }
      }
    }
    .rankCon{
      /*display: flex;*/
      overflow-y: scroll;
      position: relative;

      .topHeight{
        width: 100%;
        height: 10px;
      }

      .conItem{
        display: flex;
        height: 32px;
        line-height: 32px;
        width: 100%;
        .conLeft{
          width: 120px;
          /*width: 147px;*/
          text-align: right;
          font-size: 12px;
          color: #6f6f6f;
        }
        .conRight{
          flex: 1;
          display: flex;
          align-items: center;
          .colorDiv{
            height: 6px;
            z-index: 6;
            /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#f1f3f6+1,ff3a25+100 */
            background: #f1f3f6; /* Old browsers */
            background: -moz-linear-gradient(left,  #f1f3f6 1%, #ff3a25 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(left,  #f1f3f6 1%,#ff3a25 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to right,  #f1f3f6 1%,#ff3a25 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f1f3f6', endColorstr='#ff3a25',GradientType=1 ); /* IE6-9 */
          }
          .textDiv{
            margin-left: 10px;
            height: 32px;
            line-height: 32px;
            color: #8f949f;
            font-size: 10px;
          }

        }
      }
      .conItem2{
        height: 54px;
      }
      .conItem:hover{
        .colorDiv{
          height: 12px;
        }
        .textDiv{
          color: #ff3a25;
        }
        .conLeft{
          color: #ff3a25;
        }
      }
      .lineDiv{
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        /*z-index: 0;*/

        height: 100%;
        .lineItem{
          display: flex;
          justify-content: center;
          .line{
            background: #d3d6dd;
            margin-left: 10px;
          }
        }
        .lineItem:first-child{
          background: transparent;
          z-index: 8;
          .line{
            z-index: 8;
          }
        }
      }
    }
    .rankCon::-webkit-scrollbar {
      width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    .rankCon::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      background: #adbacd;
    }
    .rankCon::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      background: #d3d6dd;
    }
    .rankCon::-webkit-scrollbar-thumb:hover {
      background: #ff3925 !important;
    }
  }



  .subsidize {
    width: 100%;
    height: 100%;
    padding: 10px 20px;
    .subsidizeCharts {
      position: relative;
      width: 100%;
      height: 350px;
      display: flex;
      .subsidizeChart
      .maskDiV {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(255,255,255,0);
      }
    }
    #subsidizeList {
      // margin-top: 20px;
      width: 100%;
      height: 330px;
      border: 1px solid #ccc;
      overflow-y: scroll;
      table {
        width: 100%;
        thead {
          tr {
            height: 30px;
            line-height: 0px;
            th {
              font-size: 12px;
              width: 10%;
              text-align: center;
            }
          }
        }
        tbody {
          tr {
            border-top: 1px solid #ccc;
            height: 35px;
            line-height: 0px;
            td {
              width: 10%;
              font-size: 12px;
              text-align: center;
            }
          }
        }
      }
    }
    #subsidizeList::-webkit-scrollbar {
      width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    #subsidizeList::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      background: #ff3a25;
    }
    #subsidizeList::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      background: #d3d6dd;
    }
    .fullFcreen {
      position: absolute;
      top: 40px;
      left: 20px;
      width: 1450px;
      height: 91.5%;
      padding: 5%;
      background: #fff;
      z-index: 10;
      .subsidizeCharts {
        position: relative;
        width: 100%;
        height: 91%;
        .subsidizeChart
        .maskDiV {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: rgba(255,255,255,0);
        }
      }
      #subsidizeList {
        margin-top: 20px;
        width: 100%;
        height: 91%;
        border: 1px solid #ccc;
        table {
          width: 100%;
          thead {
            tr {
              height: 50px;
              line-height: 0px;
              th {
                font-size: 12px;
                width: 10%;
                text-align: center;
              }
            }
          }
          tbody {
            tr {
              border-top: 1px solid #ccc;
              height: 50px;
              line-height: 0px;
              td {
                width: 10%;
                text-align: center;
              }
            }
          }
        }
      }

      .bounce-enter-active {
        animation: bounce-in 6s;
      }
      .bounce-leave-active {
        animation: bounce-in 6s reverse;
      }
      @keyframes bounce-in {
        0% {
          transform: scale(0);
        }
        50% {
          transform: scale(1.5);
        }
        100% {
          transform: scale(1);
        }
      }
      .subsidizeList {
        width: 100%;
      }
    }
  }
</style>
