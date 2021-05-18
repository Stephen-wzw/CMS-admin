<template>
  <el-container class="layout">
    <el-aside width="200px">
      <div class="aside-header">
        <img src="~assets/img/logo.png" alt="" />
        <h4>博客后台管理</h4>
      </div>
      <el-menu
        default-active="/admin/article-manage"
        class="el-menu-vertical-demo"
        background-color="#2f4050"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/admin/article-manage">
          <i class="el-icon-document"></i>
          <span slot="title">文章管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/category">
          <i class="el-icon-menu"></i>
          <span slot="title">分类管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/comment">
          <i class="el-icon-chat-line-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/message">
          <i class="el-icon-message"></i>
          <span slot="title">留言管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/about">
          <i class="el-icon-user"></i>
          <span slot="title">关于管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">系统设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 相对于侧边栏定位 -->
    <el-container class="margin-left">
      <el-header>
        <el-dropdown>
          <span class="el-dropdown-link">
            Admin<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-edit">修改密码</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style scoped>
/* 侧边栏 */
.el-aside {
  background-color: #2f4050;
  text-align: left;
  overflow-y: auto;
  height: 100vh;
  position: fixed;
  left: 0;
}

.margin-left {
  margin-left: 200px;
}

.aside-header {
  background-color: #233545;
  padding: 25px;
  transition: all 0.2s;
}

.el-aside img {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
  transition: all 0.2s;
}

.el-aside h4 {
  color: #dfe4ed;
}

.el-aside .el-menu {
  border-right: 0;
}

/* 内容区头部 */
.el-header {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding: 0 24px;
  background: #f3f3f4;
  border-bottom: 1px solid #e7eaec;
}

/* 内容区main */
.el-main {
  background-color: #f0f2f5;
  color: #333;
  padding: 0;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-footer {
  text-align: center;
  background-color: #f0f2f5;
  user-select: none;
  padding: 24px 0;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
