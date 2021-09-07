<template>
  <div class="system">
    <div class="application-fl">
      <div class="app-logo" @click="handleClose">
        <img src="../../../assets/images/国际人才/页面固定内容/logo.png" alt />
        <p>中国科学院国际合作</p>
        <p>数据汇交与分析平台</p>
      </div>
      <div class="appTitle">系统管理</div>
      <div class="app-nav">
        <p class="smallTitle">用户管理</p>
        <div>
          <router-link tag="li" to="/authority-management"
            >用户权限管理</router-link
          >
        </div>
        <div class="navActive">
          <router-link tag="li" to="/permission-assignment"
            >用户权限分配</router-link
          >
        </div>
      </div>
      <div class="app-nav">
        <p class="smallTitle">环境配置</p>
        <div>
          <router-link tag="li" to="/system-environment">硬件环境</router-link>
        </div>
      </div>
      <div class="app-btm" @click="lastPage">
        <div class="iconfontClose">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="closeName">返回上一页</div>
      </div>
    </div>
    <div class="application-fr">
      <div class="breadcrumb">
        <ul>
          <li>系统管理</li>
          <li class="line">/</li>
          <li>用户权限分配</li>
        </ul>
      </div>
      <div class="fr-header">
        <div class="titleName">用户权限分配</div>
        <Login style="float: right" />
      </div>
      <div class="list">
        <Table height="700" border :columns="columns1" :data="userList">
          <template slot-scope="{ row }" slot="modify" class="operate">
            <span
              class="modifyIcon"
              @click="handleModifyRole(row)"
            ></span>
            <span
              class="deleteIcon"
              @click="handleDeleteRole(row)"
            ></span>
          </template>
        </Table>
      </div>
      <div class="footerInfo">
        <span>中国科学院国际合作局 版权所有</span>
        <span class="line">|</span>
        <span>技术支持：中国科学院计算机网络信息中心</span>
      </div>
    </div>
    <Modal
      title="新增角色"
      v-model="modal7"
      :closable="false"
      @on-ok="handleModifyRoleBtn"
      width="600"
    >
      <el-select v-model="roleName" clearable placeholder="请选择角色名称">
        <el-option
          v-for="item in roleData"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-input placeholder="请输入用户名" v-model="userName" :disabled="true">
      </el-input>
      <el-input placeholder="请输入用户邮箱" v-model="emailVal" :disabled="true">
      </el-input>
      <input v-model="roleId" type="text" hidden>
      <input v-model="umtId" type="text" hidden>

      <div slot="footer">
        <Button type="text" @click="cancel">取消</Button>
        <Button type="primary" @click="handleModifyRoleBtn">修改</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import visitFun from "@/assets/js/visit.js";
export default {
  data() {
    return {
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 100,
        },
        {
          title: "角色名称",
          key: "roleName",
          align: "center",
          render: (h, params) => {
            if (params.row.roleName !== null) {
              return h("span", params.row.roleName);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "用户名",
          key: "truename",
          align: "center",
          render: (h, params) => {
            if (params.row.truename !== null) {
              return h("span", params.row.truename);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "用户邮箱",
          key: "securityEmail",
          align: "center",
          render: (h, params) => {
            if (params.row.securityEmail !== null) {
              return h("span", params.row.securityEmail);
            } else {
              return h("span", "—");
            }
          },
        },
        {
          title: "权限管理",
          slot: "modify",
          align: "center",
          width: 200,
        },
      ],
      userList: [],
      modal7: false,
      roleData: [],
      roleName: "",
      userName: "",
      emailVal: "",
      roleId: "",
      umtId: ""
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    handleClose() {
      this.$router.push("/");
    },
    lastPage() {
      visitFun.lastPage();
    },

    // 用户列表
    getUserList() {
      let data = {
        email: "",
      };
      this.axios
        .get("/manager/system/userList", { params: data })
        .then((res) => {
          if (res.data.code == 200) {
            this.userList = res.data.data;
            let arr = this.userList.map((item) => {
              return item.roleName;
            });
            this.roleData = [...new Set(arr)]
          }
        });
    },

    // 获取当前行信息
    handleModifyRole(val) {
      this.modal7 = true;
      this.roleName = val.roleName;
      this.userName = val.truename;
      this.emailVal = val.securityEmail;
      this.roleId = val.roleId;
      this.umtId = val.umtId;
    },
    // 修改信息
    handleModifyRoleBtn() {
      let data = {
        oleId: "",
        roleName: "",
        umtId: ""
      }
      this.axios.get("/manager/system/userList",{params: data}).then(res => {
        if(res.data.code == 200) {
          this.modal7 = false;
          this.$Message.success({
              background: true,
              content: "修改成功！",
            });
        }
      })
    },

    // 删除
  handleDeleteRole(val) {
    
  }
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/system/system.less";
.list {
  margin-top: 30px;
}
.modifyIcon {
  width: 16px;
  height: 16px;
  background: url("../../../assets/images/系统管理/修改（默认）.png") no-repeat;
  background-size: 16px 16px;
  cursor: pointer;
  display: inline-block;
  margin-right: 10px;
  &:hover {
    background: url("../../../assets/images/系统管理/修改（选中）.png")
      no-repeat;
    background-size: 16px 16px;
  }
}
.deleteIcon {
  width: 16px;
  height: 16px;
  background: url("../../../assets/images/系统管理/删除按钮（默认）.png")
    no-repeat;
  background-size: 16px 16px;
  cursor: pointer;
  display: inline-block;
  &:hover {
    background: url("../../../assets/images/系统管理/删除按钮（选中）拷贝.png")
      no-repeat;
    background-size: 16px 16px;
  }
}
/deep/ .el-input.is-disabled .el-input__inner {
  width: 440px;
  margin-top: 15px;
}
/deep/ .el-input--suffix .el-input__inner {
  width: 440px;
}
</style>
