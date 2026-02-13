exports.success = (res, data, status = 200) => {
  return res.status(status).json(data);
};

exports.error = (res, message, status = 400) => {
  return res.status(status).json({ message });
};
