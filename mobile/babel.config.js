module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@": ".",
            "@api": "./api",
            "@assets": "./assets",
            "@components": "./components",
            "@constants": "./constants",
            "@hooks": "./hooks",
            "@lib": "./lib",
            "@store": "./store",
          },
        },
      ],
    ],
  };
};
