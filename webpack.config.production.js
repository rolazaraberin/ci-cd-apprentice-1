const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

/*********************************************
 * EXPORT WEBPACK OPTIONS
 *********************************************/
module.exports = {
  entry: getEntryOptions(),
  mode: getModeOptions(),
  module: getModuleOptions(),
  // target: "node",
  // node: { global: true },
  optimization: getOptimizationOptions(),
  output: getOutputOptions(),
  plugins: getPluginsOptions(),
  resolve: getResolveOptions(),
};

/***************************************************
 * ENTRY
 **************************************************/
function getEntryOptions() {
  //INFO - https://webpack.js.org/configuration/entry-context/#entry
  let entryOptions = { index: "./src/index.ts" };
  // let entryOptions = ["./src/index.js", "./src/index.assets.js"];
  return entryOptions;
}

/********************************************
 * MODE
 ********************************************/
function getModeOptions() {
  let modeOptions = "production";
  //let modeOptions = "development";
  return modeOptions;
}

/****************************************************
 * MODULES
 ****************************************************/
function getModuleOptions() {
  let rulesOptions = [];
  const moduleOptions = { rules: rulesOptions };
  // const moduleOptions = { rules: getRulesOptions() };
  //GATHER ASSETS (PICTURES) IN HTML FILE
  //INFO - https://webpack.js.org/loaders/html-loader
  // let htmlLoaderRules = {
  //   test: /\.html$/, //MATCH HTML FILES
  //   use: "html-loader",
  // };
  // rulesOptions.push(htmlLoaderRules);

  //BUNDLE PICTURES FROM HTML FILE
  //INFO - https://webpack.js.org/guides/asset-modules
  // let pictureRules = {
  //   test: /\.(jpg|svg|png|gif|ico)$/, //MATCH DIFFERENT PICTURE FORMATS WITH OR |
  //   type: "asset/resource",
  // };
  // rulesOptions.push(pictureRules);

  //TRANSLATE WITH BABEL
  //INFO - https://webpack.js.org/loaders/babel-loader/
  let babelLoaderPresets = {
    loader: "babel-loader",
    options: {
      presets: [
        "@babel/preset-env",
        // "@babel/preset-react",
        "@babel/preset-typescript",
      ],
    },
  };
  let babelLoaderRules = {
    test: /\.(ts|js|tsx|jsx)$/, //MATCH JAVASCRIPT FILES
    exclude: /node-modules/, //MATCH NODE_MODULES
    use: babelLoaderPresets,
  };
  rulesOptions.push(babelLoaderRules);

  //TRANSLATE SCSS TO CSS
  //INFO - https://webpack.js.org/loaders/sass-loader
  // let miniCssExtractPluginRules = {
  //   test: /\.(s)css$/,
  //   use: [
  //     MiniCssExtractPlugin.loader, //3. CREATE CSS FILE
  //     "css-loader", //2. READ IN CSS
  //     "sass-loader", //1. TRANSLATE SCSS TO CSS
  //   ],
  // };
  // rulesOptions.push(miniCssExtractPluginRules);

  return moduleOptions;
}

/********************************************************
 * OPTIMIZATIONS - MINIFY
 *******************************************************/
function getOptimizationOptions() {
  let minimizerOptions = [];
  let optimizationOptions = {
    minimize: true,
    minimizer: minimizerOptions,
  };

  //MINIFY HTML
  //INFO - https://webpack.js.org/plugins/html-minimizer-webpack-plugin
  // minimizerOptions.push(new HtmlMinimizerPlugin());

  //MINIFY CSS
  //INFO - https://webpack.js.org/plugins/css-minimizer-webpack-plugin
  // minimizerOptions.push(new CssMinimizerPlugin());

  //MINIFY JAVASCRIPT
  //INFO - https://webpack.js.org/plugins/terser-webpack-plugin
  //NOTE: TERSER-WEBPACK-PLUGIN IS INCLUDED WITH WEBPACK 5
  minimizerOptions.push(new TerserWebpackPlugin());

  return optimizationOptions;
}

/***************************************************
 * OUTPUT
 ***************************************************/
function getOutputOptions() {
  //INFO - https://webpack.js.org/concepts/output
  //INFO - https://github.com/babel/babel-loader#top-level-function-iife-is-still-arrow-on-webpack-5
  let environmentOptions = { arrowFunction: false };
  const path = require("path");
  let outputOptions = {
    path: path.resolve(__dirname, "build"), //PLACE WEBPACK FILES IN DIST DIRECTORY
    environment: environmentOptions,
  };
  return outputOptions;
}

/****************************************************
 * PLUGINS
 ****************************************************/
function getPluginsOptions() {
  const pluginsOptions = [];

  //DYNAMICALLY INJECT CSS FILE INTO HTML DOM HEAD
  //INFO - https://webpack.js.org/plugins/mini-css-extract-plugin
  // const miniCssExtractPluginOptions = {
  //   //filename: "[name].css", //DEFAULT
  //   //filename: "[contenthash].css",
  // };
  // pluginsOptions.push(new MiniCssExtractPlugin(miniCssExtractPluginOptions));

  //DYNAMICALLY INJECT JAVASCRIPT INTO HTML DOM HEAD
  //INFO - https://webpack.js.org/plugins/html-webpack-plugin
  // const htmlWebpackPluginOptions = {
  //   template: "./src/index.html", //USE THIS FILE INSTEAD OF AN EMPTY HTML
  //   //template: "./public/index.html", //USE THIS FILE INSTEAD OF AN EMPTY HTML
  //   //filename: "index.html", //OVERRIDE DEFAULT FILENAME INDEX.HTML
  // };
  // pluginsOptions.push(new HtmlWebpackPlugin(htmlWebpackPluginOptions));

  return pluginsOptions;
}

function getResolveOptions() {
  //DUPLICATE REACT - https://blog.maximeheckel.com/posts/duplicate-dependencies-npm-link/
  //NPM LINK - https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react
  //WEBPACK RESOLVE - https://webpack.js.org/configuration/resolve/
  const resolveOptions = {
    //EXTENSIONS - https://webpack.js.org/configuration/resolve/#resolveextensions
    //PRIORITIZES IMPORT EXTENSIONS, STARTING WITH INDEX 0
    //EXAMPLE import Title from "components/Title" WILL CHECK FOR Title.tsx FIRST
    extensions: [".tsx", ".ts", ".js", "..."],

    //ALIAS - https://webpack.js.org/configuration/resolve/#resolvealias
    //ALLOWS IMPORT FROM THE ALIAS INSTEAD OF RELATIVE PATH
    //EXAMPLE import Title from "components/Title" instead of "../../components/Title"
    alias: {
      assets: path.resolve("./src/assets/"),
      bootstrap: path.resolve("./node_modules/bootstrap/"),
      components: path.resolve("./src/components/"),
      public: path.resolve("./public/"),
      renderers: path.resolve("./src/renderers/"),
      scripts: path.resolve("./src/scripts/"),
      scss: path.resolve("./src/scss/"),
      skills: path.resolve("./src/skills/"),
      src: path.resolve("./src/"),
    },
  };
  return resolveOptions;
}
