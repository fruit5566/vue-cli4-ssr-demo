const path = require("path");

const { createBundleRenderer } = require("vue-server-renderer");
const serverBundle = require(path.join(__dirname, "../dist/vue-ssr-server-bundle.json"));
const clientManifest = require(path.join(__dirname, "../dist/vue-ssr-client-manifest.json"));
const template = require("fs").readFileSync(path.join(__dirname, "../public/server.template.html"), "utf-8");

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
});

function renderToString(context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html);
    });
  });
}

module.exports = {
  renderToString
};
