const sendSuccessResponse = (data, res, status) => {
  res.status(status).json({ status: 'success', data });
};

const sendErrorResponse = (message, res, status) => {
  res.status(status).json({ status: 'error', message });
};

module.exports = { sendSuccessResponse, sendErrorResponse };
