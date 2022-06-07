<template>
  <el-pagination
    :page-size="pageSize"
    layout="prev, pager, next"
    :total="Number(total)"
    @current-change="handleCurrentChange">
  </el-pagination>
</template>

<script>
import axios from 'axios'
export default {
  name:'MyFooter',
  data () {
    return {
      pageNum: 1,
      pageSize: 5,
      total: ""
    }
  },
  methods: {
    handleCurrentChange(val){
      this.pageNum  = val
      axios.get(`http://localhost:8081/all_user?pageNum=${this.pageNum}&pageSize=${this.pageSize}`).then(
            response => {
              this.$bus.$emit('changedUsers',response.data.list)
            },
            error => {
              console.log('请求失败了',error.message)
            }
        ) 
      this.$bus.$emit("getPageNum",val)
    }
  },
  mounted() {
    this.$bus.$on('getAllUsers',(data)=>{
      this.pageSize = Number(data.pageSize)
      this.total = data.total
    })
  },
  beforeDestroy(){
    this.$bus.$off('getAllUsers')//有事件名代表解绑对应的事件 无事件名则全部解绑(如有人用 则不起作用)
  }
}
</script>

<style lang="">

</style>
