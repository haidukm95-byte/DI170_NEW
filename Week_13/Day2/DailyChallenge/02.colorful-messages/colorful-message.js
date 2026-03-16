const chalk = require("chalk");

const red = (val) => {
  if (!val) console.error("error");
  console.log(chalk.red(val));
};

const green = (val) => {
  if (!val) console.error("error");
  console.log(chalk.green(val));
};
const blue = (val) => {
  if (!val) console.error("error");
  console.log(chalk.blue(val));
};
const magenta = (val) => {
  if (!val) console.error("error");
  console.log(chalk.magenta(val));
};
const cyan = (val) => {
  if (!val) console.error("error");
  console.log(chalk.cyan(val));
};
const yellow = (val) => {
  if (!val) console.error("error");
  console.log(chalk.yellow(val));
};

module.exports = { red, green, blue, magenta, cyan, yellow };
