<template>
  <el-form
    :model="aboutForm"
    :rules="rules"
    ref="aboutForm"
    label-width="100px"
    label-position="top"
    size="small"
  >
    <el-form-item label="关于标题" prop="aboutTitle">
      <el-input v-model="aboutForm.aboutTitle"></el-input>
    </el-form-item>
    <el-form-item label="详细内容" prop="aboutContent">
      <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 7 }"
        v-model="aboutForm.aboutContent"
        placeholder="请输入详细内容"
      ></el-input>
    </el-form-item>
    <el-form-item label="简要描述" prop="aboutSubscript">
      <el-input
        type="textarea"
        :autosize="{ minRows: 1, maxRows: 2 }"
        v-model="aboutForm.aboutSubscript"
        placeholder="请输入简要描述"
      ></el-input>
    </el-form-item>
    <div class="btn">
      <el-button type="primary" @click="submitForm('aboutForm')" size="small"
        >保存更改</el-button
      >
    </div>
  </el-form>
</template>

<script>
import { getAbout, updateAbout } from "network/about";

export default {
  data() {
    return {
      aboutForm: {
        aboutTitle: "",
        aboutContent: "",
        aboutSubscript: "",
      },
      rules: {
        aboutTitle: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
        ],
        aboutContent: [
          { required: true, message: "请输入详细内容", trigger: "blur" },
        ],
        aboutSubscript: [
          { required: true, message: "请输入简要描述", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getAbout();
  },
  methods: {
    getAbout() {
      getAbout().then((res) => {
        console.log(res);
        for (let key in this.aboutForm) {
          this.aboutForm[key] = res[key];
        }
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 编辑文章
          updateAbout(this.aboutForm).then((res) => {
            console.log(res);
            if (res.msg == "修改关于成功") {
              this.$message({
                type: "success",
                message: "保存成功!",
              });
            } else {
              this.$message({
                type: "error",
                message: "保存失败!",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
.el-form--label-top .el-form-item__label {
  padding: 0 !important;
}
</style>
