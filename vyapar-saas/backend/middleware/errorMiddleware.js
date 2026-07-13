const errorHandler = (err, req, res, next) => {
  console.error(`Error Code context block logs: ${err.stack}`);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Internal Enterprise Server Error Module Exception'
  });
};

module.exports = errorHandler;