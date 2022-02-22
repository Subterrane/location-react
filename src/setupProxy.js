const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/geoip",
    createProxyMiddleware({
      target: "https://geolite.info",
      changeOrigin: true,
      auth: "679573:LMNz7dUKvhXBklas"
    })
  );
};
