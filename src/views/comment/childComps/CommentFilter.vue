<template>
  <div class="filter-wrap">
    <el-form ref="form" :model="form" label-width="80px" inline size="small">
      <!-- 第一行——评论内容、评论用户 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="评论内容" prop="content">
            <el-input v-model="form.content" style="width: 300px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评论用户" prop="user">
            <el-input v-model="form.user" style="width: 300px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="评论时间" prop="date">
            <el-date-picker
              placeholder="选择日期"
              v-model="form.date"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 300px"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所在文章" prop="article">
            <el-input v-model="form.article" style="width: 300px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="btn-wrap">
        <el-button type="primary" @click="onSubmit" size="small"
          >搜索</el-button
        >
        <el-button size="small" @click="resetForm('form')">重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        content: "",
        user: "",
        date: "",
        article: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
  },
};
</script>

<style scoped>
.filter-wrap {
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
}

.btn-wrap {
  display: flex;
  justify-content: center;
}
</style>
