module.exports = {
  configureWebpack: {
    devtool: process.env.NODE_ENV === "production" ? false : "eval-source-map", // INFO: set to eval-source-map for debugging. Added unsafe-eval to csp meta tag and nginx config on dev
  },
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/_variables.scss";`,
      },
    },
  },
};
