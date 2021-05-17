<template>
  <el-form
    :model="articleForm"
    :rules="rules"
    ref="articleForm"
    label-width="100px"
    label-position="top"
  >
    <el-form-item label="文章标题" prop="articleTitle">
      <el-input v-model="articleForm.articleTitle" size="small"></el-input>
    </el-form-item>
    <el-form-item label="分类" prop="categoryId">
      <el-select
        v-model="articleForm.categoryId"
        placeholder="请选择分类"
        size="small"
      >
        <el-option
          v-for="(item, index) in category"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="正文" prop="articleContent">
      <el-input
        type="textarea"
        :autosize="{ minRows: 5 }"
        v-model="articleForm.articleContent"
        size="small"
        placeholder="仅支持markdown语法"
      ></el-input>
    </el-form-item>
    <el-button type="primary" @click="submitForm('articleForm')" size="small"
      >发布文章</el-button
    >
    <el-button @click="saveDraft('articleForm')" size="small" type="info"
      >存为草稿</el-button
    >
    <el-button @click="back('articleForm')" size="small">返回</el-button>
  </el-form>
</template>

<script>
import { getCategory } from "network/category";
import { postArticle } from "network/article";

export default {
  data() {
    return {
      articleForm: {
        articleTitle: "",
        categoryId: "",
        articleContent: "",
        // TODO: adminId 应从全局获取
        adminId: 1,
        articleStatus: 1,
      },
      category: undefined,
      rules: {
        articleTitle: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
        ],
        categoryId: [
          { required: true, message: "请选择分类", trigger: "change" },
        ],
        articleContent: [
          { required: true, message: "请输入markdown文本", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      getCategory().then((res) => {
        let len = res.length;
        let tempData = []; // 必须要有临时变量才能显示

        for (let i = 0; i < len; i++) {
          tempData[i] = new Object();

          this.$set(tempData[i], "label", res[i].categoryName);
          this.$set(tempData[i], "value", res[i].categoryId);
        }

        this.category = tempData;
        console.log(this.category);
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("发布文章");
          console.log(this.articleForm);
          postArticle(this.articleForm).then((res) => {
            console.log(res);
            if (res.msg == "新增文章成功") {
              this.$message({
                type: "success",
                message: "新增成功!",
              });
              
              this.$EventBus.$emit("addArticleSuccess")
              this.$router.go(-1);

              this.$nextTick(() => {
                this.$refs[formName].resetFields();
              });
            } else {
              this.$message({
                type: "error",
                message: "新增失败!",
              });
            }
          });
          // console.log(this.articleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    saveDraft(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("存为草稿");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    back(formName) {
      this.$router.go(-1);
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
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
