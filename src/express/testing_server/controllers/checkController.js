const { checkInput } = require("./contractOp");

const checkController = {};

function getTime() {
  const today = new Date();
  const date = today.getMonth() + 1 + "/" + today.getDate();
  const time =
    String(today.getHours()).padStart(2, "0") +
    ":" +
    String(today.getMinutes()).padStart(2, "0") +
    ":" +
    String(today.getSeconds()).padStart(2, "0");
  return time + " [" + date + "]";
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
