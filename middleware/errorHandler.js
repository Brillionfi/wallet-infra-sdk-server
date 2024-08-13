function errorHandler(err, req, res, next) {
  if (err.response && err.response.data) {
    res.status(err.response.status).json(err.response.data);
  } else {
    res.status(500).json({
      error: err.message || "An unexpected error occurred",
    });
  }
}

export default errorHandler;
