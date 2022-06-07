<template>
  <el-table
      :data="users"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="update(scope.row.id,scope.$index)"></el-button>
          <span style="margin-left: 15px"></span>
          <el-button type="danger" icon="el-icon-delete" circle @click="open(scope.row.id,scope.$index)"></el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
import pubsub from 'pubsub-js'
import axios from 'axios'
export default {
  name:'MyContent',
  data () {
    return {
      visible: false,
      users:[],
      all_data: {},
      pageNum: 1,
      pageSize: 5,
    }
  },
  methods: {
      open(id,index) {
        this.$confirm('此操作要删除这条数据吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get(`http://localhost:8081/delete?id=${id}`).then(
            response => {
              this.$message({
              type: 'success',
              message: '删除成功!'
            });
            window.location.reload()
            },
            error => {
             this.$message.error('删除错误!');
            }
        )   
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
    update(id,index){
			pubsub.publish('send', {isOpen:true,id:id})  // 发布消息
		}
    },
    created() {
        axios.get(`http://localhost:8081/all_user?pageNum=${this.pageNum}&pageSize=${this.pageSize}`).then(
            response => {
              // console.log('请求成功了',response.data)
              this.all_data = response.data
              this.users = response.data.list
              // console.log(this.users)
              this.$bus.$emit('getAllUsers',response.data)
            },
            error => {
              console.log('请求失败了',error.message)
            }
        )    
    },
    mounted() {
        this.$bus.$on('changedUsers',(data)=>{
        this.users = data
    })
    },
     beforeDestroy(){
        this.$bus.$off('changedUsers')
    }
}
</script>

<style lang=''>

</style>
