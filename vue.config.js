const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const nodeExternals = require("webpack-node-externals");
const TARGET_NODE = process.env.VUE_APP_MODE == "server";
const target = TARGET_NODE ? "server" : "client";

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  filenameHashing: true,
  pages: {
    index: {
      entry: `./src/entry-${target}.js`,

      // 以下四项只有 client 打包 才会生效
      template: "./public/client.template.html",
      filename: "index.html", // 防止命中静态资源， 可修改为 somename.html
      title: "首页",
      chunks: ["chunk-vendors", "chunk-common", "index"]
    }
  },
  css: {
    extract: false
  },
  configureWebpack: () => ({
    target: TARGET_NODE ? "node" : "web",
    devtool: "source-map",
    output: {
      libraryTarget: TARGET_NODE ? "commonjs2" : undefined
    },
    externals: TARGET_NODE ? nodeExternals({ allowlist: /\.css$/ }) : undefined,
    plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()]
  }),
  chainWebpack: config => {
    if (TARGET_NODE) {
      config.plugins.delete("hmr"); // fix ssr hot update bug
      config.optimization.splitChunks(undefined);
    }
  }
};
