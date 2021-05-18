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
        :autosize="{ minRows: 3, maxRows: 7 }"
        v-model="articleForm.articleContent"
        size="small"
        placeholder="仅支持markdown语法"
      ></el-input>
    </el-form-item>
    <div class="btn" v-if="$route.params.articleId == 'add'">
      <el-button type="primary" @click="submitForm('articleForm')" size="small"
        >发布文章</el-button
      >
      <el-button @click="saveDraft('articleForm')" size="small" type="info"
        >存为草稿</el-button
      >
      <el-button @click="back('articleForm')" size="small">返回</el-button>
    </div>
    <div class="btn" v-else>
      <el-button type="primary" @click="submitForm('articleForm')" size="small"
        >保存更改</el-button
      >
      <el-button @click="back('articleForm')" size="small">返回</el-button>
    </div>
  </el-form>
</template>

<script>
import { getCategory } from "network/category";
import { postArticle, getArticleById, updateArticle } from "network/article";

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
    this.getArticle();
    console.log(this.$route);
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

    getArticle() {
      let articleId = this.$route.params.articleId;

      if (articleId != "add") {
        getArticleById(articleId).then((res) => {
          console.log(res);
          for (let key in this.articleForm) {
            this.articleForm[key] = res[key];
          }
        });
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let articleId = this.$route.params.articleId;

          if (articleId != "add") {
            // 编辑文章
            updateArticle(this.articleForm, articleId).then((res) => {
              console.log(res);
              if (res.msg == "新增文章成功") {
                this.$message({
                  type: "success",
                  message: "保存成功!",
                });

                this.$EventBus.$emit("addArticleSuccess");
                this.$router.go(-1);

                this.$nextTick(() => {
                  this.$refs[formName].resetFields();
                });
              } else {
                this.$message({
                  type: "error",
                  message: "保存失败!",
                });
              }
            });
          } else {
            // 新增文章
            postArticle(this.articleForm).then((res) => {
              if (res.msg == "新增文章成功") {
                this.$message({
                  type: "success",
                  message: "新增成功!",
                });

                this.$EventBus.$emit("addArticleSuccess");
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
          }
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
