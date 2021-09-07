<template>
  <div class="input-container">
    <!-- 显示的输入框，用v-model绑定数据，并且绑定focus事件 -->
    <Input class="input-number" v-model="inputData" @on-focus="_showInputNumber" />
    <!--  -->
    <div class="input-dropdown-wrap">
      <Dropdown trigger="custom" :visible="visibNormal" class="input-dropdown">
        <Dropdown-menu slot="list">
          <div class="dropdown-list">
            <Row
              class="item"
              v-fot="item in arrayList"
              :value="item.code"
              :key="item.code"
              @click.native="_inputNumChange(item.code)"
            >{{item.text}}</Row>
          </div>
        </Dropdown-menu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
/**
 * 输入下拉框
 * @author  mino
 * @version 1.0.0
 * @description 可输入，也可展开下拉框进行选择
 */
export default {
    data() {
        return {
            inputData: '1',    //输入框的默认值
            visibNormal: false    //下拉显示控制
        }
    },
    props: {
        arrayList: {    //下拉列表的数据
            type: Array,
            default: []
        }
    },
    watch: {
        inputData(newVal) {
            this.$emit('getInputNum', newVal);
        }
    },
    methods: {
        //展示下拉选项
        _showInputNumber(e) {
            let _this = this;
            if(this.visibNormal) return;
            
            this.visibNormal = true;
            //给输入框元素加入阻止冒泡事件
            e.target.addEventListener('click', (e) => {
                e.stopPropagation();
            });
            document.addEventListener('click', _this._hideNormal);
        },
        //下拉框列表的点击事件
        _inputNumChange(data) {
            this.$emit('getInputNum', data);
        },
        //隐藏下拉框
        _hideNormal() {
            let curTarget = event.target;
            if(curTarget.nodeName == 'SPAN' && curTarget.classList.contains('switch')) {
              return;
            }
            
            this.visibNormal = false;
            document.removeEventListener('click', this._hideNormal);
        }
    }
}
</script>

<style scoped lang="less">
.input-container {
  /deep/ .input-dropdown-wrap {
    height: 0 !important;
    overflow: hidden;
  }
  .dropdown-list {
    height: 1.3rem;
    overflow: auto;
    border-bottom: 0.01rem solid #e4e4e4;
    .item {
      line-height: 0.25rem;
      padding-left: 0.15rem;
      &:hover {
        background: grey;
      }
    }
  }
  .input-number {
    width: 2.2rem;
  }
  .input-dropdown {
    width: 2.2rem;
    /deep/ .ivu-select-dropdown {
      margin-top: -0.2rem;
    }
  }
}
</style>