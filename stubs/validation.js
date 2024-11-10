const requiredFields = (fields) => (req, res, next) => {
  for (const fieldName of fields) {
    if (!req.body[fieldName]) {
      throw new Error(`Field ${fieldName} does't set`);
    }
  }

  next();
};

module.exports = { requiredFields };
