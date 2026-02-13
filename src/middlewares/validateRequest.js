module.exports = (schema) => {
  return (req, res, next) => {
    try {
      if (schema.body) {
        const { error } = schema.body.validate(req.body);
        if (error) {
          return res.status(400).json({
            message: error.details[0].message
          });
        }
      }

      if (schema.params) {
        const { error } = schema.params.validate(req.params);
        if (error) {
          return res.status(400).json({
            message: error.details[0].message
          });
        }
      }

      next();
    } catch (err) {
      return res.status(500).json({
        message: "Validation error",
        error: err.message
      });
    }
  };
};
