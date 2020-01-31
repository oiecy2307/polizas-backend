export const returnError = (res, status, message) => {
  res.status(status).json({ error: true, message });
};

export const returnData = (res, data) => {
  res.status(200).json({ error: false, data });
};

export const getOffset = (req) => {
  try {
    const offset = parseInt(req.query.skip);
    return offset || 0;
  } catch (e) {
    return 0;
  }
}
