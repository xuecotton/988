<template>
  <div class="mailbox">
    <div class="head_titlt">
      <div class="last_head">
        <div class="crumb felx_d">
          <ul class="felx_d">
            <li>您的位置：</li>
            <li>
              <a @click="jumpindex">
                <img src="../assets/img/home.png" alt="" class="home"> 网站首页
              </a>
              <img src="../assets/img/decorate.png" alt="" class="img">
            </li>
            <li>
              <a >
                首长信箱
              </a>
              <img src="../assets/img/decorate.png" alt="" class="img">
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 首长信箱开始-->
    <div >
        <div class="main_content">
          <!-- 内容 -->
          <div class="con_list">
    
            <div class="c_con">
              <div class="c_left">
                <div class="title_box">
                  <span>首长信箱</span>
                  <p>
                    mailbox
                  </p>
                </div>
              </div>
              <div class="c_right">
                <div class="top_head">
                  <ul>
                    <li>
                      <a href="#">
                        <span class="text">首长信箱</span>
                      </a>
                    </li>
                  </ul>
                </div>
    
                <div class="new_con">
                  <div class="maile_con">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="52px" class="demo-ruleForm">
                      <el-form-item label="姓名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                      </el-form-item>
                      <el-form-item label="电话" prop="phone">
                        <el-input v-model="ruleForm.phone"></el-input>
                      </el-form-item>
                      <el-form-item label="邮箱" prop="email">
                        <el-input v-model="ruleForm.email"></el-input>
                      </el-form-item>
                      <el-form-item label="内容" prop="desc">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
 
      </div>
  </div>
</template>
<script>
  import  myhttp  from '../assets/js/myhttp.js'
  import $ from "jquery"
  export default{
    data(){
      return{
        ruleForm: {
          email: '',
          name: '',
          phone: '',
          desc: ''
        },
        rules: {
          email: [
            { type: 'email',required: true, message: '请输入正确的邮箱地址', trigger: ['blur'] },
            { min: 1, max: 25, message: '长度在 0 到 25 个字符', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号码或固定电话', trigger: 'blur' },
            { min: 7, max: 11, message: '长度在 7 到 11 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      }
    },
     methods:{
     jumpindex(){
        LinkIndexGo()
      },
      //  信箱的提交
      submitForm(formName) {
        const that=this;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // module_message_api
              console.log(that.ruleForm)
              var message_params={
                that: that,
                _url: myhttp._url,
                ur: myhttp._DetailApi.module_message_api, // 具体接口
                cbk: that.module_message_cbk, // 回调
                data: {
                   user_id:that.ruleForm.name,
                   user_tel:that.ruleForm.phone,
                   user_massgae:that.ruleForm.desc,
                   user_email:that.ruleForm.email
                } 
              }
              myhttp._InitAjax(message_params);
              console.log(message_params)
            } else {
              return false;
            }
          });
        },
        module_message_cbk(res){
          const that=this;
          console.log(res,'信箱提交的返回值')
          if(res.stateCode=='200'){
            this.$message({
              message: '成功提交信箱中的信息',
              type: 'success'
            });
          that.ruleForm.name='',
          that.ruleForm.phone='',
          that.ruleForm.desc='',
          that.ruleForm.email=''
          }else{
            this.$message({
              message: '获取消息失败！！！',
              type: 'warning'
            });
          }
        },
      //信箱的重置； 
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
     }
  }
</script>
<style scoped>
  /* 面包屑导航条的样式开始 */
.main_content{
  margin: 0 auto;
  width: 1200px;
  } 
 
.con_list {
  font-family: 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', 'PT Serif', 'SongTi SC', 'MicroSoft Yahei', Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
}

.head_titlt {
  width: 100%;
  border-bottom: 1px solid rgb(240, 242, 245);
}

.last_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
  height: 50px;
  line-height: 50px;
  font-family: 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', 'PT Serif', 'SongTi SC', 'MicroSoft Yahei', Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
}

.felx_d ul {
  font-size: 12px;
  color: #242424;
  font-weight: 300
}

.felx_d {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.crumb li a {
  color: #242424;
}

.crumb li a:hover {
  color: #009255;
}

.crumb li:last-child .img {
  display: none;
}

.crumb li img {
  width: 10px;
  height: 10px;
  margin: 0 10px;
}
  /* 面包屑导航条的样式结束 */
 /* 内容样式开始 */
 .c_con {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 30px 0;
}

.c_left {
  width: calc(25% - 30px);
  padding-right: 30px;
}

.title_box {
  text-align: center;
  background-color: #009255;
  padding: 0 10px 10px;
} 
.title_box span {
  font-weight: bold;
  font-size: 20px;
  text-shadow: none;
  text-align: center;
  padding: 0 10px;
  margin-top: 5px;
  line-height: 40px;
  display: inline-block;
  color: #fff;
  border-bottom: 1px dashed #fff;
  letter-spacing: 2px;
}
.title_box p {
  line-height: 2;
  color: #ffffff;
  font-size: 12px;
  line-height: 24px;
  text-transform: uppercase;
}
.c_list a {
  width: calc(100% - 30px);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-decoration: none;
  display: block;
  padding: 10px 10px 10px 20px;
  font-size: 15px;
  font-weight: 300;
  position: relative;
  color: #ffffff;
  color: #666666;
  background: -webkit-linear-gradient(top, #ffffff 0%, #f5f5f5 72%, #edecec 100%);
}
.top_head a {
    color: rgb(153, 153, 153);
    font-size: 20px;
    height: 22px;
    line-height: 22px;
    font-weight: 300;
    color: #009255;
}
.top_head {
    padding: 10px 0;
    border-bottom: 1px solid rgb(221, 221, 221);
}
.c_right {
    width: 75%;
}
.el-form-item {
    margin-bottom: 22px;
}
.maile_con {
    width: 50%;
    margin: 20px 0;
}
.new_con {
    width: 100%;
    padding: 10px 0;
}
.el-button--primary{
  color: #FFF;
  background-color: #009255;
  border-color: #009255
}
.demo-ruleForm{
  font-weight: 300
}

</style>