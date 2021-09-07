<template>
    <div id="graph" class="atlas"></div>
</template>

<script>
import nodelogo from'../../../assets/images/decision/logo.png';
import orgsmall  from'../../../assets/images/decision/orgsmall.png';
export default {
 name:'graph',
 props:['orgData'],
 watch:{
     orgData(newval,oldval){
       
         if(newval.node && newval.node.length>0){
                
                this.$nextTick(()=>{
                    this.applyGraph();
                })
              
         }
     }
 },
 methods:{
        //图谱渲染
      applyGraph(){
           console.log(this.orgData);
            var mychart = this.$echarts.init(document.getElementById('graph'));
            //  mychart.showLoading();
               var data = this.orgData;
               var nodes = data.node;
               var links = data.link;
              
                var color=['#ff3a25','#ffc067','#667ec2','#66c284','#ff7575','#89defe','#e5dfcb','#3241ad','#ad3280','#00E5EE','#76EEC6','#6A5ACD','#00BFFF','#FFEC8B','#FF6A6A'];
                // var category = nodes.map(item=>{
                //     return item.category
                // });
                // category = Array.from(new Set(category));
                var category = data.category;
                var range =[] ;
                nodes.forEach(item=>{
                      if(item.value){
                          range.push(Math.round(Math.log(item.value)))
                      }
                })
                range = Array.from(new Set(range)).sort();
               
                 var min = range[0];
                 var max = range[range.length-1];
                 var consult = (max-min)/range.length;
               nodes= nodes.map(item=>{
                    if(item.category ==='国内机构' || item.category ==='国外机构'){
                          if(item.value< min + consult*1){
                              item.symbolSize = 30;
                          }else if(item.value< min + consult*2 && item.value> min + consult*1){
                              item.symbolSize = 40;
                          }else if(item.value< min + consult*3 && item.value> min + consult*2){
                              item.symbolSize = 50;
                          }else if(item.value< min + consult*4 && item.value> min + consult*3){
                              item.symbolSize = 60;
                          }else if(item.value< min + consult*5 && item.value> min + consult*4){
                              item.symbolSize = 70;
                          }else{
                              item.symbolSize = 80;
                          }
                    }else{
                        item.symbolSize = 15;
                    }
                    return item;
               })
                nodes.forEach(node => {
                   if (node.category ==='国内机构') {
                    node.symbol = "image://" + nodelogo;
                   
                      node.itemStyle = {
                       color: color[0]
                    };
                    //  node.category =1;
                }else if (node.category ==='国外机构') {
                   
                    node.symbol = "image://" + orgsmall;
                    node.itemStyle = {
                      color: color[1],
                     
                    };
                    // node.category =0;
                } else if (node.category ==="国际组织") {
                     
                    node.itemStyle = {
                      color: color[2]
                    };
                    //  node.category =2;
                }else if (node.category === '交流') {
                     
                    node.itemStyle = {
                    color: color[3]
                    };
                    //  node.category =3;
                }else if (node.category === '项目') {
                     
                    node.itemStyle = {
                    color: color[4]
                    };
                    //   node.category =4;
                }else if (node.category === '平台') {
                     
                    node.itemStyle = {
                    color: color[5]
                    };
                    //   node.category =5;
                }else if (node.category === '奖励') {
                     
                    node.itemStyle = {
                    color: color[6]
                    };
                    //   node.category =6;
                }else if (node.category === '论文') {
                     
                    node.itemStyle = {
                    color: color[7]
                    };
                    //   node.category =7;
                }else if (node.category === '协议') {
                     
                    node.itemStyle = {
                       color: color[8]
                    };
                    //   node.category =8;
                 }else if (node.category === '人才') {
                     
                    node.itemStyle = {
                       color: color[2]
                    };
                   
                 }else if (node.category === '产出') {
                     
                    node.itemStyle = {
                       color: color[7]
                    };
                   
                 }
                    node.id1 = node.id;
                     node.id = node.uniqueId;
                     node.uniqueId = node.id1;
                     node.category = category.indexOf(node.category);
                    return node;
                });
           
            
               links.forEach(link => {
                    link.label = {
                        align: 'center',
                        fontSize: 12
                    };
                    link.lineStyle = {
                        color: '#dadada',
                        width:0.5,
                        opacity:0.2
                       
                    }
               
                });
            
           
            var categories = category.map(item=>{
                 if(item =='国内机构' ){
                     return {
                          name:'国内机构',
                          itemStyle: {
                             color: color[0]
                          }
                     }
                 }else if(item =='国外机构' ){
                     return {
                          name:'国外机构',
                          itemStyle: {
                             color: color[1]
                          }
                     }
                 }else if(item =='国际组织' ){
                     return {
                          name:'国际组织',
                          itemStyle: {
                             color: color[2]
                          }
                     }
                 }else if(item =='交流' ){
                     return {
                          name:'交流',
                          itemStyle: {
                             color: color[3]
                          }
                     }
                 }else if(item =='项目' ){
                     return {
                          name:'项目',
                          itemStyle: {
                             color: color[4]
                          }
                     }
                 }else if(item =='平台' ){
                     return {
                          name:'平台',
                          itemStyle: {
                             color: color[5]
                          }
                     }
                 }else if(item =='奖励' ){
                     return {
                          name:'奖励',
                          itemStyle: {
                             color: color[6]
                          }
                     }
                 }else if(item =='论文' ){
                     return {
                          name:'论文',
                          itemStyle: {
                             color: color[7]
                          }
                     }
                 }else if(item =='协议' ){
                     return {
                          name:'协议',
                          itemStyle: {
                             color: color[8]
                          }
                     }
                 }else if(item =='人才' ){
                     return {
                          name:'人才',
                          itemStyle: {
                             color: color[2]
                          }
                     }
                 }else if(item =='产出' ){
                     return {
                          name:'产出',
                          itemStyle: {
                             color: color[7]
                          }
                     }
                 }
            })
          
             
                let option = {
                        tooltip:{
                            show:true,
                            formatter:function(params){
                               
                                if(params.data.value){
                                    var str = params.data.name + ":" + params.data.value;
                                }else{
                                     var str = params.data.name;
                                }
                                return str;
                            }
                        },
                        legend: [{
                            // selectedMode: 'single',
                            data: categories.map(x => x.name),
                            orient:'vertical',
                            left: '50',
                            bottom:'140',
                            icon: "circle",
                            height:90,
                            width:110,
                            itemGap: 20 ,// 设置间距
                            textStyle:{
                                color:'#8f949f',
                                fontSize:14
                            }
                        }],
                        series: [{
                            type: 'graph',
                            layout: 'force',
                            symbolSize: 58,
                            draggable: true,
                            roam: true,
                            zoom:1.2,
                            focusNodeAdjacency: true,
                            categories: categories,
                        
                            label: {
                                show: false,
                                 formatter:function(params){
                                    return ;
                                }
                            },
                            force: {
                                repulsion: 1000,
                                edgeLength: 120
                            },
                            data: nodes,
                            links: links,
                            color:color
                        }]
                }

            //  mychart.hideLoading();
             mychart.setOption(option);
            

      },
 },
 mounted(){
    
     if(this.orgData.nodes && this.orgData.nodes.length>0){
        this.$nextTick(()=>{
            
                this.applyGraph();
            })
    }
 }
}
</script>

<style lang="less" scoped>
 #graph{
     width: 100%;
     height: 100%;
 }
</style>