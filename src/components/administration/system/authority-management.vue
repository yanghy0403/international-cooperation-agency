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
        <div class="navActive">
          <router-link tag="li" to="/authority-management"
            >用户权限管理</router-link
          >
        </div>
        <div>
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
          <li>用户权限管理</li>
        </ul>
      </div>
      <div class="fr-header">
        <div class="titleName">用户权限管理</div>
        <Login style="float: right" />
      </div>
      <div class="AddRoles" @click="modal7 = true">新增角色<span>+</span></div>
      <div>
        <Table border :columns="columns1" :data="roleList">
          <template slot-scope="{ row }" slot="permissions">
            <span v-for="(item, index) in row.permissions" :key="index"
              >【{{ item.name }}】</span
            >
          </template>
          <template slot-scope="{ row, index }" slot="modify">
            <span
              class="modifyIcon"
              @click="handleModifyRole(row, index)"
            ></span>
            <span
              class="deleteIcon"
              @click="handleDeleteRole(row, index)"
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
    <!-- 角色添加 -->
    <Modal
      title="新增角色"
      v-model="modal7"
      :closable="false"
      @on-ok="handleAddRole"
      width="600"
    >
      <Input
        v-model="roleName"
        placeholder="请输入新增的角色名称..."
        style="width: 400px"
      />
      <div>
        <el-tag
          v-for="(tag, index) in tags"
          :key="index"
          closable
          @close="handleCloseTag(tag.name, index)"
          :type="tag.type"
        >
          {{ tag.name }}
        </el-tag>
      </div>

      <Tree
        @on-check-change="handleTreeNode"
        :data="treeData"
        show-checkbox
      ></Tree>
      <div slot="footer">
        <Button type="text" @click="cancel">取消</Button>
        <Button type="primary" @click="handleAddRole">新增</Button>
      </div>
    </Modal>
    <!-- 角色权限修改 -->
    <Modal
      title="修改角色权限"
      v-model="modal8"
      :closable="false"
      @on-ok="handleModifyRoleBtn"
      width="600"
    >
      <Input
        v-model="roleName"
        placeholder="请输入新增的角色名称..."
        style="width: 400px"
      />
      <div>
        <el-tag
          v-for="(tag, index) in tags"
          :key="index"
          closable
          @close="handleCloseTag(tag.name, index)"
          :type="tag.type"
        >
          {{ tag.name }}
        </el-tag>
      </div>

      <Tree
        @on-check-change="handleTreeNode"
        :data="treeData"
        show-checkbox
      ></Tree>
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
      modal7: false,
      modal8: false,
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 100,
        },
        {
          title: "角色",
          key: "name",
          align: "center",
          width: 500,
        },
        {
          title: "角色权限范围",
          slot: "permissions",
          align: "center",
        },
        {
          title: "操作",
          slot: "modify",
          align: "center",
          width: 200,
        },
      ],

      treeData: [
        {
          title: "首页基础查询",
          id: "1c6191b5-12e2-4ba7-86d3-7ae5b5842528",
          checked: false,
        },
        {
          title: "综合查询",
          id: "269aa263-3adf-45f5-b01b-5a7a83776dc5",
          checked: false,
        },
        {
          title: "人员交流",
          id: "7145dfbe-8dac-46e0-9ddd-42a02b3ab275",
          checked: false,
        },
        {
          title: "合作项目",
          id: "afa0d6f0-2a33-438a-8c4b-51643e74aae6",
          checked: false,
        },
        {
          title: "国际人才",
          id: "e7de00c1-3207-4c3a-8b62-804ccb772701",
          checked: false,
        },
        {
          title: "合作论文",
          id: "e89865e6-d1f0-40d2-a52e-d1c4e6e9e21f",
          checked: false,
        },
        {
          title: "伙伴机构",
          id: "5a8aa304-9883-4445-b713-f101e66839ea",
          checked: false,
        },
        {
          title: "应用助手",
          id: "895257ca-72ed-4dd0-8695-9da6d658b2d5",
          checked: false,
        },
        {
          title: "决策支撑",
          id: "90d10c8d-957f-4abd-97be-e0d780f27b0c",
          checked: false,
        },
        {
          title: "系统管理",
          id: "8871460f-1284-4f6f-8fb9-e87cd2005bb8",
          checked: false,
        },
        {
          title: "安全审计",
          id: "00f7e634-e612-42f0-b793-e87a2d386bea",
          checked: false,
        },
      ],
      tags: [],
      roleList: [],
      roleName: "测试",
      pids: ["1c6191b5-12e2-4ba7-86d3-7ae5b5842528"],
    };
  },
  mounted() {
    this.getRoleList();
  },
  methods: {
    handleClose() {
      this.$router.push("/");
    },
    lastPage() {
      visitFun.lastPage();
    },
    // 获取选中的节点
    handleTreeNode(data) {
      let treeData = data;
      this.tags = [];
      let idArr = [];
      treeData.forEach((item) => {
        this.tags.push({
          name: item.title,
          type: "danger",
        });
        idArr.push(item.id);
      });
      this.pids = [...new Set(idArr)];
    },
    // 关闭节点
    handleCloseTag(val) {
      this.tags = this.tags.map((item, i) => {
        if (item.name === val) {
          this.tags.splice(i, 1);
          return {
            name: item.name,
            type: "danger",
          };
        }
      });
    },

    // 角色列表
    getRoleList() {
      let data = {
        email: "",
      };
      this.axios
        .get("/manager/system/roleList", { params: data })
        .then((res) => {
          if (res.data.code == 200) {
            this.roleList = res.data.data;
          }
        });
    },

    // 新增角色
    handleAddRole() {
      this.modal7 = false;
      let data = {
        pids: this.pids,
        roleName: this.roleName,
      };
      this.axios
        .get("/manager/system/role/add", { parasms: data })
        .then((res) => {
          if (res.data.code == 200) {
            this.getRoleList();
            this.$Message.success({
              background: true,
              content: "角色添加成功！",
            });
          }
        });
    },
    // 获取当前角色的信息
    handleModifyRole(val) {
      (this.treeData = [
        {
          title: "首页基础查询",
          id: "1c6191b5-12e2-4ba7-86d3-7ae5b5842528",
          checked: false,
        },
        {
          title: "综合查询",
          id: "269aa263-3adf-45f5-b01b-5a7a83776dc5",
          checked: false,
        },
        {
          title: "人员交流",
          id: "7145dfbe-8dac-46e0-9ddd-42a02b3ab275",
          checked: false,
        },
        {
          title: "合作项目",
          id: "afa0d6f0-2a33-438a-8c4b-51643e74aae6",
          checked: false,
        },
        {
          title: "国际人才",
          id: "e7de00c1-3207-4c3a-8b62-804ccb772701",
          checked: false,
        },
        {
          title: "合作论文",
          id: "e89865e6-d1f0-40d2-a52e-d1c4e6e9e21f",
          checked: false,
        },
        {
          title: "伙伴机构",
          id: "5a8aa304-9883-4445-b713-f101e66839ea",
          checked: false,
        },
        {
          title: "应用助手",
          id: "895257ca-72ed-4dd0-8695-9da6d658b2d5",
          checked: false,
        },
        {
          title: "决策支撑",
          id: "90d10c8d-957f-4abd-97be-e0d780f27b0c",
          checked: false,
        },
        {
          title: "系统管理",
          id: "8871460f-1284-4f6f-8fb9-e87cd2005bb8",
          checked: false,
        },
        {
          title: "安全审计",
          id: "00f7e634-e612-42f0-b793-e87a2d386bea",
          checked: false,
        },
      ]),
        (this.tags = []);
      this.modal8 = true;
      this.roleName = val.name;
      let arrData = [];
      this.treeData.forEach((item) => {
        val.permissions.forEach((items) => {
          if (item.id == items.id) {
            item.checked = true;
            this.tags.push({
              name: items.name,
              type: "danger",
            });
          }
        });
      });
    },
    // 修改角色
    handleModifyRoleBtn() {
      this.modal8 = false;
      this.getRoleList();
      this.$Message.success({
        background: true,
        content: "角色信息修改成功！",
      });
    },
    // 删除角色
    handleDeleteRole(val) {
      let data = {
        pids: val.id,
        roleName: val.name,
      };

      this.axios
        .get("/manager/system/permission/delete", { params: data })
        .then((res) => {
          if (res.data.code == 200) {
            this.getRoleList();
            this.$Message.success({
              background: true,
              content: "删除成功！",
            });
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/system/system.less";
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
</style>
