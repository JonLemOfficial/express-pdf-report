const { createServer } = require("http");
require("./config/mongoose");
// const fs = require("fs");

const isProd = process.env.NODE_ENV && process.env.NODE_ENV === "production";
const isHerokuEnv = process.env.HEROKU_ENVIRONMENT;
const { PORT = isProd ? 443 : 8000 } = process.env;
const app = isProd ? require("./app/app.prod") : require("./app/app.dev");
const credentials = {
  key: /* fs.readFileSync('./../config/ssl/server.key') || */ null,
  cert: /* fs.readFileSync('./../config/ssl/server.cert') || */ null,
};

const server = createServer(
  ...isProd
    ? [...isHerokuEnv ? [ app ] : [ credentials, app ] ]
    : [ app ]
);

server.listen(...isProd ? [ PORT ] : [ PORT, () => {
  console.log("Server running at: 'http://localhost:8000'");
}]);