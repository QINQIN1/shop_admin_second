export default {
  data () {
    return {
      ruleList: [],
      // 分配权限展示对话框
      isShowRightsDialog: false,
      // 权限对话框数据
      rightsTree: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      curRoleId: -1
    }
  },
  created () {
    this.getRoleList()
    this.getRightsTree()
  },
  methods: {
    // 获取表格索引
    getIndex (index) {
      return index + 1
    },
    //  获取角色列表数据
    async getRoleList () {
      const res = await this.$http.get('/roles')
      // console.log(res)
      // console.log(res.data.data)
      this.ruleList = res.data.data
    },
    // 展示分配权限对话框
    showRightsDialog (curRole) {
      this.isShowRightsDialog = true
      console.log('curRole', curRole)
      // 暂存id
      this.curRoleId = curRole.id
      // 打开对话框的时候应该选中当前角色拥有的权限
      const checkedKeys = []
      curRole.children.forEach(lev1 => {
        lev1.children.forEach(lev2 => {
          lev2.children.forEach(lev3 => {
            checkedKeys.push(lev3.id)
          })
        })
      })
      console.log(checkedKeys)
      // 勾选角色拥有的权限
      this.$nextTick(() => {
        console.log(this.$refs)
        this.$refs.tree.setCheckedKeys(checkedKeys)
      })
    },
    // 获取权限列表树形数据
    async getRightsTree () {
      const res = await this.$http.get('/rights/tree')
      // console.log(res)
      this.rightsTree = res.data.data
    },
    // 点击确定，角色授权s
    async assignRights () {
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
      const allKeys = [...checkedKeys, ...halfCheckedKeys]
      const res = await this.$http.post(`/roles/${this.curRoleId}/rights`, {
        rids: allKeys.join(',')
      })
      console.log(res)
      // 关闭分配权限对话框
      this.isShowRightsDialog = false
      //  提示成功
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
      // 重新渲染角色列表数据
      this.getRoleList()
    },
    // 删除角色指定权限
    async deleteRights (roleId, rightId) {
      const res = await this.$http.delete(`/roles/${roleId}/rights/${rightId}
   `)
      // console.log(res)
      // 提示删除信息成功
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
      // 重新获取列表数据
      this.getRoleList()
    }
  }
}
