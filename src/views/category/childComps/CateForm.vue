<template>
  <el-dialog title="新增分类" :visible.sync="cateFormVisible">
    <el-form ref="categoryForm" :model="categoryForm" :rules="rules">
      <el-form-item label="分类图标" prop="img">
        <el-upload
          ref="upload"
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
      <el-button @click="cancel('categoryForm')">取 消</el-button>
      <el-button type="primary" @click="submit('categoryForm')"
        >确 定</el-button
      >
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
        img: [{ required: true, message: "图片不能为空", trigger: "blur" }],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.$EventBus.$on("addCate", () => {
      this.cateFormVisible = !this.dialogFormVisible;
    });
  },
  methods: {
    // 上传前验证 必须小于1M
    // 在关闭自动上传后，这个钩子不能触发！！！
    // beforeUpload(file) {
    //   console.log(file);
    //   const isLt1M = file.size / 1024 / 1024 < 1;

    //   if (!isLt1M) {
    //     this.$message.error("上传头像图片大小不能超过 1MB!");
    //   }

    //   return isLt1M;
    // },

    // 当图片大小小于1M时，生成图片url 显示出来
    // 保存图片文件
    onChange(file, fileList) {
      console.log("文件状态改变");
      const isLt1M = file.size / 1024 / 1024 < 1;
      console.log(isLt1M);
      if (isLt1M) {
        const reader = new FileReader();
        let arr = [];

        reader.readAsDataURL(file.raw);

        reader.onload = () => {
          this.categoryForm.img = reader.result;
          this.imgUrl = reader.result;
        };

        fileList.forEach((item) => {
          arr.push(item.raw);
        });
        this.imgList = arr;
        console.log(file, fileList);
        console.log(this.imgList);
      } else {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
    },

    submit(categoryForm) {
      // 验证成功后才进行新增
      this.$refs[categoryForm].validate((valid) => {
        if (valid) {
          let formData = new FormData();

          formData.append("categoryName", this.categoryForm.name);
          formData.append("file", this.imgList[0]);

          addCategory(formData).then((res) => {
            this.resetForm(categoryForm);
            this.$EventBus.$emit("addSuccess");

            console.log(res);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    cancel(categoryForm) {
      this.resetForm(categoryForm);
    },

    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
      this.cateFormVisible = false;
      this.imgList = undefined;
      this.imgUrl = "";

      // 清空上传文件列表，确保 onchange事件触发
      let uploadFilesArr = this.$refs.upload.uploadFiles; //上传文件列表
      console.log(uploadFilesArr);
      if (uploadFilesArr.length == 0) {
        return 1;
      } else {
        this.$refs.upload.uploadFiles = [];
      }
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
