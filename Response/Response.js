const rejected = (statusCode, msg) => {
  return {
    status: "failed",
    statusCode,
    result: msg,
  };
};

const successfull = (statusCode, msg) => {
  return {
    status: "success",
    statusCode,
    result: msg,
  };
};

module.exports = {
  rejected,
  successfull,
};
