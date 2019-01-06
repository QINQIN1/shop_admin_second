// 导入axios
// import axios from 'axios'
export default {
  // 进入页面发送请求
  created () {
    this.getUserList()
  },
  data () {
    return {
      // 用户列表数据
      userList: [],
      // 总条数
      total: 0,
      // 当前页
      pagenum: 1,
      // 每页总条数
      pagesize: 3,
      // 搜索内容
      searchText: '',
      // 添加用户控制对话框的展示和隐藏
      isShowUserAddDialog: false,
      //  添加用户数据
      userAddForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户，表单校验
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        {
          min: 5,
          max: 12,
          message: '用户名长度为5到12个字符',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          min: 6,
          max: 12,
          message: '密码长度为6到12个字符',
          trigger: 'blur'
        }],
        email: [{
          pattern: /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
          message: '邮箱式不正确',
          trigger: 'blur'
        }],
        mobile: [{
          pattern: /^1(3|4|5|7|8)\d{9}$/,
          message: '手机号码格式不正确',
          trigger: 'blur'
        }]
      },
      // 编辑用户数据
      userEditForm: {
        username: '',
        email: '',
        mobile: '',
        id: ''
      },
      isShowUserEditDialog: false
    }
  },
  methods: {
    // 分页获取数据
    async getUserList (pagenum = 1, query = '') {
      const options = {
        params: {
          query,
          pagenum,
          pagesize: 3
        }
        // headers: {
        //   Authorization: localStorage.getItem("token")
        // }
      }
      const res = await this.$http.get('/users', options)
      console.log('用户列表数据', res)
      if (res.data.meta.status === 200) {
        // 表示登录成功
        this.userList = res.data.data.users
        // 设置总条数
        this.total = res.data.data.total
        // 当前页
        this.pagenum = res.data.data.pagenum
      } else {
        // 登录失败，跳回到登录页
        this.$router.push('/login')
        localStorage.removeItem('token')
      }
    },
    // 切换分页，获取当前页数据
    changePage (curPage) {
      this.getUserList(curPage, this.searchText)
      // console.log('切换分页',curPage)
    },
    // 切换用户状态
    async changeUserState (user) {
      try {
        const res = await this.$http.put(
          `/users/${user.id}/state/${user.mg_state}`,
          null, {
            // headers:{
            //   Authorization:localStorage.getItem('token')
            // }
          }
        )
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.data.meta.msg,
            duration: 1000
          })
        }
      } catch (e) {
        this.$message({
          type: 'error',
          message: '设置状态失败'
        })
      }
    },
    // 搜索内容
    search () {
      // console.log('search')
      this.getUserList(1, this.searchText)
    },
    // 添加用户展示对话框
    showUserAddDialog () {
      // console.log("showUserAddDialog");
      this.isShowUserAddDialog = true
    },
    // 添加用户隐藏对话框
    hideUserAddDialog () {
      this.$refs.userAddFormRef.resetFields()
    },
    // 添加用户确认按钮
    async addUser () {
      try {
        // 先进行表单校验
        await this.$refs.userAddFormRef.validate()
        // 点击确认关闭对话框
        const res = await this.$http.post('/users', this.userAddForm)
        console.log(res)
        if (res.data.meta.status === 201) {
          this.isShowUserAddDialog = false
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
          // 重新获取列表数据
          this.getUserList(1, this.searchText)
        }
      } catch (e) {
        // 表单验证失败
      }
    },
    // 删除单个用户
    async delUserById (id) {
      try {
        await this.$confirm('您是否确认删除?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await this.$http.delete(`/users/${id}`)
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
          // 重新刷新页面
          this.getUserList(1, this.searchText)
        } else {
          this.$message({
            type: 'warning',
            message: res.data.meta.msg
          })
        }
      } catch (e) {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      }
    },
    // 展示编辑单个用户对话框
    showUserEditDialog (user) {
      console.log('showUserEditDialog')
      this.isShowUserEditDialog = true
      for (let key in this.userEditForm) {
        this.userEditForm[key] = user[key]
      }
    },
    // 点击确认编辑
    async updateUser () {
      // 解构
      const {id, email, mobile} = this.userEditForm
      const res = await this.$http.put(`/users/${id}`, {
        email,
        mobile
      })
      //  console.log(res)
      const {meta: {status, msg}} = res.data
      if (status === 200) {
        this.isShowUserEditDialog = false
        this.$message({
          type: 'success',
          message: msg
        })
        this.getUserList(this.pagenum, this.searchText)
      }
    }

  }
}
