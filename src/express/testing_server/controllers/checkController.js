const { checkInput } = require("./contractOp");

const checkController = {};

function getTime() {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date + " " + time;
}

checkController.checkReq = async (req, res, next) => {
  const endpoint = req.path;
  const method = req.method.toUpperCase();
  const key = "Req@" + method + "@" + endpoint;

  const result = checkInput(req.body, currentContract, key);
  const report = {};
  report["endpoint"] = endpoint;
  report["method"] = method;
  report["pass"] = result.pass;
  report["time"] = getTime();
  report["error"] = result.error;
  res.locals.report = report;
  return next();
};

module.exports = checkController;
