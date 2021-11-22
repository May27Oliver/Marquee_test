const path = require("path");
const fs = require("fs");
const sourceFolder = path.resolve(__dirname, "src");
const folderInsideSrc = fs
  .readdirSync(sourceFolder)
  .filter((name) => fs.statSync(path.resolve(sourceFolder, name)).isDirectory())
  .reduce((acc, val) => {
    acc[val] = path.resolve(sourceFolder, val);
    return acc;
  }, {});

module.exports = {
  webpack: function (config, env) {
    //Add resolve alias
    config.resolve.alias = {
      ...config.resolve.alias,
      ...folderInsideSrc,
    };

    //For React Hot Loader
    if (env !== "production") {
      config = require("react-app-rewire-hot-loader")(config, env);
      config.resolve.alias = {
        ...config.resolve.alias,
        "react-dom": "@hot-loader/react-dom",
      };
    }

    //For Postcss
    require("react-app-rewire-postcss")(config, {
      plugins: (loader) => [
        require("postcss-import")({
          path: ["./src/static/styles"],
        }),
        require("postcss-flexbugs-fixes"),
        require("postcss-preset-env")({
          autoprefixer: {
            flexbox: "no-2009",
          },
          stage: 3,
        }),
        require("postcss-simple-vars")(),
        require("postcss-color-function")(),
        require("postcss-nested-ancestors")(),
        require("postcss-nested")(),
      ],
    });

    return config;
  },
  devSever: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.hot = true;
    };
  },
};
