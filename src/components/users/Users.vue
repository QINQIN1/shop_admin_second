<template>
  <div class="users">
    <!-- 带斑马纹的表格 -->
    <el-table :data="userList" :stripe="true" style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope" >
          <!-- scope表示当前行数据  -->
         <el-switch
         v-model="scope.row.mg_state"
         @change="changeUserState(scope.row)">
         </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" size="mini" type="primary" plain></el-button>
          <el-button icon="el-icon-delete" size="mini" type="danger" plain></el-button>
           <el-button icon="el-icon-check" size="mini" type="success" plain>分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pagesize"
      :current-page="pagenum"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import axios from "axios";

export default {
  // 进入页面发送请求
  created() {
    this.getUserList();
  },
  data() {
    return {
      // 用户列表数据
      userList: [],
      // 总条数
      total: 0,
      // 当前页
      pagenum: 1,
      // 每页总条数
      pagesize: 3
    };
  },
  methods: {
    async getUserList(pagenum = 1) {
      const url = "http://localhost:8888/api/private/v1/users";
      const options = {
        params: {
          query: "",
          pagenum,
          pagesize: 3
        },
        headers: {
          Authorization: localStorage.getItem("token")
        }
      };
      const res = await axios.get(url, options);
      console.log("用户列表数据", res);
      if (res.data.meta.status === 200) {
        // 表示登录成功
        this.userList = res.data.data.users;
        // 设置总条数
        this.total = res.data.data.total;
        // 当前页
        this.pagenum = res.data.data.pagenum;
      } else {
        // 登录失败，跳回到登录页
        this.$router.push("/login");
        localStorage.removeItem("token");
      }
    },
    changePage(curPage) {
      this.getUserList(curPage);
      // console.log('切换分页',curPage)
    },
    async changeUserState(user){
    try{
        const res=await axios.put(`http://localhost:8888/api/private/v1/users/${user.id}/state/${user.mg_state}`,
        null,
        {
          headers:{
            Authorization:localStorage.getItem('token')
          }
        })
        if(res.data.meta.status===200){
          this.$message({
          type:"success",
          message:res.data.meta.msg,
          duration:1000
        })
        }
      }catch(e){
         this.$message({
          type: 'error',
          message: '设置状态失败'
          })
      }
    },
  }
};
</script>

<style>
</style>
