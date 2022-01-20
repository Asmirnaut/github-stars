const path = require("path");

module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule
      .oneOf("inline")
      .resourceQuery(/vue/)
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader")
      .end()
      .end()
      .oneOf("external")
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "assets/[name].[ext]",
      });
    config.appendTsSuffixTo = [/\.vue$/];
  },

  // pluginOptions: {
  //   "style-resources-loader": {
  //     preProcessor: "scss",
  //     patterns: [path.resolve(__dirname, "./src/styles/index.scss")],
  //   },
};
