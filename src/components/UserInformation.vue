<template>
  <div>
    <el-button type="primary" @click="newInsert('userForm')">新增</el-button>
  <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
    <div>
  <el-form :model="user" ref="userForm">

    <el-form-item label="用户名" :label-width="formLabelWidth" prop="name"
      :rules="[
      { required: true, message: '用户名不能为空', trigger: 'blur'}]">
      <el-input v-model="user.name"></el-input>
    </el-form-item>

    <el-form-item label="年龄" :label-width="formLabelWidth" prop="age"
      :rules="[
      { required: true, message: '年龄不能为空', trigger: 'blur'},
      { type: 'number', message: '年龄必须为数字值'}]">
      <el-input v-model.number="user.age"></el-input>
    </el-form-item>

    <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
      <el-radio-group v-model="user.sex">
        <el-radio :label="0">男</el-radio>
        <el-radio :label="1">女</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="地址" :label-width="formLabelWidth" prop="address"
      :rules="[
      { required: true, message: '地址不能为空', trigger: 'blur'}]">
      <el-input v-model="user.address"></el-input>
    </el-form-item>

    <el-form-item label="电话" :label-width="formLabelWidth" prop="phone"
      :rules="[
      { required: true, message: '电话不能为空', trigger: 'blur'},
      { type: 'number', message: '必须为数字'}]">
      <el-input v-model.number="user.phone"></el-input>
    </el-form-item>


    <el-form-item>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('userForm')">确 定</el-button>
    </el-form-item>
    
  </el-form>
  </div>
</el-dialog>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
import axios from 'axios'
export default {
  name:'UserInfomation',
  data () {
    return {
       dialogTableVisible: false,
       dialogFormVisible: false,
       user: {
         name: '',
         age: '',
         sex: 0,
         address: '',
         phone: ''
       },
       newUser:{},
       formLabelWidth: '120px',
       opreation: ''       //准备进行什么样的操作，是新增还是修改
    }
  },
  methods: {
    newInsert(userForm){
      try {
          this.$refs[userForm].resetFields();
        } catch (e) {
          console.log(e)
        }
      this.dialogFormVisible = true
      this.opreation = "insert"
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.newUser.name = this.user.name
            this.newUser.age = this.user.age
            this.newUser.sex = this.user.sex === 0 ? '男' : '女'
            this.newUser.address = this.user.address
            this.newUser.phone = `${this.user.phone}`
            // console.log(this.newUser)
            //如果点击的是新增按钮，那么进行新增操作
            if(this.opreation == "insert"){
            axios.post('http://localhost:8081/insert_user',this.newUser).then(response => {
                window.location.reload()
            },
            error => {
              console.log('请求失败了',error.message)
            })
            }
            //如果点击的是修改按钮，那么进行修改操作
            else{
              axios.post('http://localhost:8081/update_user',this.newUser).then(response => {
                this.$message({
                                message: '恭喜你，修改成功',
                                type: 'success'
                              });
                window.location.reload()
            },
            error => {
              console.log('请求失败了',error.message)
            })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        this.dialogFormVisible = false
      },
  },
  mounted() {
		this.pubId = pubsub.subscribe('send', (msg, data) => {
			console.log('学校发广播了', msg, data)
      this.dialogFormVisible = data.isOpen
      this.newUser.id = data.id
      axios.get(`http://localhost:8081/precise_select?id=${data.id}`).then(
          response => {
            this.user.name = response.data.data.name
            this.user.age = response.data.data.age
            this.user.sex = response.data.data.sex == '男' ? 0 : 1
            this.user.address = response.data.data.address
            this.user.phone = parseInt(response.data.data.phone)
            this.opreation = 'update'
          },
          error => {
            console.log('请求失败了',error.message)
          }
      )   
		})
	},
	beforeDestory() {
		pubsub.unsubscribe(this.pubId)
    console.log("我被销毁了")
	}
}
</script>

<style lang=''>

</style>
