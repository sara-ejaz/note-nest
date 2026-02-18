// Global error handling middleware
// Any controller can call next(err) to reach here

const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  res.status(statusCode).json({
    message,
  });
};

module.exports = errorHandler;

