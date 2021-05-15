<template>
  <el-dialog title="新增分类" :visible.sync="cateFormVisible">
    <el-form ref="categoryForm" :model="categoryForm" :rules="rules">
      <el-form-item label="分类图标" prop="img">
        <el-upload
          action=""
          accept="image/png,image/gif,image/jpg,image/jpeg"
          :multiple="false"
          :limit="1"
          class="uploader"
          :show-file-list="false"
          :on-change="onChange"
          :auto-upload="false"
        >
          <img v-if="imgUrl" :src="imgUrl" class="category" />
          <i v-else class="el-icon-plus uploader-icon">上传图片</i>
        </el-upload>
      </el-form-item>
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="categoryForm.name" size="small"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cateFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addCategory } from "network/category";

export default {
  data() {
    return {
      cateFormVisible: false,
      categoryForm: {
        img: "",
        name: "",
      },
      imgList: undefined,
      imgUrl: "",
      rules: {
        img: [{ required: true, message: "图片不能为空" }],
        name: [{ required: true, message: "名称不能为空" }],
      },
    };
  },
  mounted() {
    this.$EventBus.$on("addCate", () => {
      this.cateFormVisible = !this.dialogFormVisible;
    });
  },
  methods: {
    // 生成图片url 显示出来
    // 保存图片文件
    onChange(file, fileList) {
      const reader = new FileReader();
      let arr = [];

      reader.readAsDataURL(file.raw);

      reader.onload = () => {
        this.imgUrl = reader.result;
      };

      fileList.forEach(item => {
        arr.push(item.raw);
      });
      this.imgList = arr;
      console.log(this.imgList);
    },

    submit() {
      let formData = new FormData();
      
      formData.append('categoryName', this.categoryForm.name);
      formData.append('file', this.imgList[0])

      addCategory(formData).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style scoped>
.uploader,
.el-upload {
  margin-top: 1rem;
  border: 1px dashed #6e4242;
  border-radius: 6px;

  width: 100px;
  height: 100px;
  font-size: 1rem;

  cursor: pointer;
  position: relative;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
}

.uploader:hover {
  border-color: #409eff;
}

.uploader-icon {
  font-size: 14px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.category {
  border-radius: 6px;
  width: 100%;
  height: 100%;
}
</style>
