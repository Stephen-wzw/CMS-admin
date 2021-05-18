<template>
  <div class="filter-wrap">
    <el-form ref="form" :model="form" label-width="80px" inline size="small">
      <!-- 第一行——标题、分类、全文内容 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="所属分类" prop="category">
            <el-select
              v-model="form.category"
              placeholder="请选择"
              clearable
              style="width: 208px"
            >
              <el-option
                v-for="(item, index) in categories"
                :label="item.label"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="form.title" style="width: 208px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="全文内容" prop="content">
            <el-input v-model="form.content" style="width: 208px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="开始时间" prop="date1">
            <el-date-picker
              placeholder="选择日期"
              v-model="form.date1"
              type="date"
              style="width: 208px"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结束时间" prop="date2">
            <el-date-picker
              placeholder="选择日期"
              v-model="form.date2"
              type="date"
              style="width: 208px"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否删除" prop="isDelete">
            <el-select v-model="form.isDelete" placeholder="不限" clearable>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="btn-wrap">
        <el-button type="primary" @click="onSubmit(form)" size="small"
          >搜索</el-button
        >
        <el-button size="small" @click="resetForm('form')">重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getCategory } from "network/category";

export default {
  data() {
    return {
      form: {
        title: "",
        category: "",
        content: "",
        date1: "",
        date2: "",
        isDelete: "",
      },
      categories: undefined,
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

        this.categories = tempData;
      });
    },

    onSubmit(form) {
      this.$EventBus.$emit("searchArticle", form)
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
