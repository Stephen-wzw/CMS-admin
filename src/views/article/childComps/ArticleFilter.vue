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
          <el-form-item label="发表时间" prop="date">
            <el-date-picker
              placeholder="选择日期"
              v-model="form.date"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
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
        title: "",
        category: "",
        content: "",
        date: "",
        isDelete: "",
      },
      categories: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
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
