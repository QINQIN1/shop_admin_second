<template>
 <el-container class="home-container">
   <!-- 头部 -->
  <el-header class="home-header">
    <el-row type="flex" align="middle">
      <el-col :span="6">
          <img src="@/assets/images/logo.png" alt="">
      </el-col>
      <el-col>
          <h1>电商后台管理系统</h1>
      </el-col>
      <el-col :span="6">
        <div>
          欢迎上海前端31期王者
          <a href="javascript:;" class="logout" @click="logout">退出</a>
        </div>
      </el-col>
    </el-row>
  </el-header>
  <!-- 主体 -->
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="200px" class="home-aside">
      <!-- el-menu菜单组件 -->
      <!-- el-submenu 可折叠的-->
      <!-- el-menu-item 可点击的-->
      <!-- default-active设置菜单默认高亮 -->
      <!--  @open="handleOpen"
          @close="handleClose"
          菜单展开收起事件
           -->
      <!-- index 唯一标志 -->
      <!-- :router="true" 启用路由模式 -->
      <el-menu
        default-active="2"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
        >
        <el-submenu index="1">
          <!-- template 用来展示菜单名称和图标 -->
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>
            <el-menu-item index="users">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 主体内容 -->
    <el-main class="home-main">
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
    methods: {
      async logout(){
        try{
          const res=await this.$confirm('是否确认退出?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 退出登录执行的逻辑
        // 返回到登录页
        // 将token从localstorage中移除
         this.$message({
            type: 'success',
            message: '退出成功!'
          });
        this.$router.push('/login');
        localStorage.removeItem('token');
        // console.log(res)
        }catch(e){
          this.$message({
            type: 'info',
            message: '已取消退出'
          });
        }
      }
  }
}

</script>

<style>
  .home-container{
    background-color: #EAEEF1;
    height: 100%;
  }
  .el-header{
    padding-left:0;
  }
  .home-header{
    background-color: #B3C1CD;
  }

  .home-header img{
    width: 200px;
  }
  .home-header h1{
    color:#fff;
    font-size: 28px;
    font-weight: bolder;
    margin: 0;
    text-align: center;
  }
  .home-header div{
    font-weight: bold;
    min-width:235px;
  }
  .home-header .logout{
      color:#daa520;
  }
  .home-aside{
    background-color: #545C64;
  }
</style>
