#!/usr/bin/env node
require("dotenv").config();
// grab cli service requirements.
const { error } = require("@vue/cli-shared-utils");
const Service = require("@vue/cli-service/lib/Service");
const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd());

//parse the environment base
const url = require("url");
const baseURL = process.env.VUE_APP_BASE_URL || "http://localhost:9669";
const parts = url.parse(baseURL);

const command = "serve";
const publicHost = `${parts.hostname}:${parts.port}`;

//set container name based on URL base.
const args = ["--public", publicHost, "--port", parts.port];
const argsV = { public: publicHost, port: parts.port };

service.run(command, argsV, args).catch((err) => {
  error(err);
  process.exit(1);
});
