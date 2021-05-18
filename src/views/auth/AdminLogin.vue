<template>
  <div class="login-wrap">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="login"
      size="small"
    >
      <h1>后台管理系统</h1>
      <div class="title-wrap">
        <div
          :class="{ isActive: status == 'login', title: true }"
          @click="changeLogin"
        >
          登录
        </div>
        <!-- <div
          :class="{ isActive: status == 'register', title: true }"
          @click="changeRegister"
        >
          注册
        </div> -->
      </div>
      <el-form-item prop="adminName" label-width="0">
        <el-input
          v-model="form.adminName"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" label-width="0">
        <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <div class="btn-wrap" v-if="status == 'login'">
        <el-button type="primary" @click="loginClick('form')" size="small"
          >登录</el-button
        >
        <!-- <el-button @click="resetForm('form')" size="small">重置</el-button> -->
      </div>
      <!-- <div class="btn-wrap" v-else>
        <el-button type="primary" @click="registerClick('form')" size="small"
          >注册</el-button
        >
        <el-button @click="resetForm('form')" size="small">重置</el-button>
      </div> -->
    </el-form>
  </div>
</template>

<script>
import { login } from "network/auth";

export default {
  data() {
    return {
      form: {
        adminName: "",
        password: "",
      },
      rules: {
        adminName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      status: "login",
    };
  },
  methods: {
    changeLogin() {
      this.status = "login";
    },

    // changeRegister() {
    //   this.status = "register";
    // },

    loginClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.form).then((res) => {
            if (res.code) {
              this.$message.success("登录成功")
              console.log(res);
              window.sessionStorage.setItem('sessionId', res.JSESSIONID);
              this.$router.push("/admin").catch((err) => err);
            } else {
              this.$message.error("登录失败");
            }
          });
        } else {
          return false;
        }
      });
    },

    // registerClick(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert("register!");
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
* {
  outline: none;
  user-select: none;
}

.login-wrap {
  min-height: 100vh;
  min-width: 100vh;
  background-color: #f8f9fe;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login {
  width: 40%;
  height: 60%;
  border-radius: 0.5rem;
  background-color: #fff;
  border-left: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  padding: 0 2rem;
}

h1 {
  margin-top: 1rem;
}

.title-wrap {
  line-height: 50px;
  height: 50px;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  text-align: left;
}

.title {
  cursor: pointer;
  margin-right: 1rem;
  display: inline-block;
}

.isActive {
  color: #121212;
  font-weight: 600;
  position: relative;
}

.isActive:after {
  display: block;
  position: absolute;
  bottom: 0.5rem;
  content: "";
  width: 2.4rem;
  height: 3px;
  background-color: #06f;
}

.btn-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
</style>
