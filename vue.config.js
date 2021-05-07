module.exports = {
  devServer: {
    open: true,
    hot: true,
    proxy: {
      "/api": {
        target: "http://10.138.240.106:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        components: "@/components",
        views: "@/views",
        network: "@/network",
      },
    },
  },
};
