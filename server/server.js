/* eslint-disable no-console */

const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
const { checkIfDeployed } = require(path.join(
  __dirname,
  "../src/plugins/console-greeting"
));
const initCheck = checkIfDeployed();

app = express();
app.use(serveStatic(path.join(__dirname, "../dist")));
const port = process.env.PORT || 3030;
app.use(checkIfDeployed);
app.listen(port, initCheck);
