<template>
    <div class="table" id="table">
          
         <Table :columns="columns" :data="orgData.table">
               <template slot-scope="{ row }" slot="source">
                  <span v-for="(item,i) in row.source" :key="i">{{item}}</span>
            </template>
         </Table>
    </div>
</template>

<script>
export default {
 name:'table',
 data(){
     return{
          tableData:[],
          columns:[
              {
                  title:'排名',
                  key:'rank',
                  align:'center'
              },
               {
                  title:'机构',
                  key:'name',
                  align:'center'
              },
               {
                  title:'关联值',
                  key:'value',
                  align:'center'
              },
               {
                  title:'来源',
                  slot:'source',
                  align:'center'
              }
          ]
     }
 },
 props:['orgData']
}
</script>

<style lang='less' scoped>
 .table{
           // background: rgba(255,255,255,0.2);
            width:100%;
            height:100%;
            padding-top: 2%;
           margin: 0 auto;
            border: 1px solid rgba(255,255,255,0.1);
            table{
                width: 100%;
                 border-top: 1px solid rgba(255,255,255,0.1);
                  overflow-y: auto;
                tr{
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    td,th{
                        color: #fff;
                        text-align: center;
                        height: 40px;
                        line-height: 40px;
                    }
                }
            }
    /deep/ .ivu-table-wrapper{
        height: 100%;
        .ivu-table{
            background:none;
            overflow-y: auto;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            th,td{
                background:none;
                color: #fff;
             border-bottom: 1px solid rgba(255,255,255,0.1);
             span{
                 padding: 0 3px;
             }
            }
            .ivu-table-header{
                border-top: 1px solid rgba(255,255,255,0.1);
            }
        }
        .ivu-table:before{
            background: none;
        }
    }
 }
</style>