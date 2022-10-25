const catchController =  (fn) => async (req, res, next) => {
  try {
    const data = await fn(req, res, next);
    return res.sendJson({data});
  } catch (error) {
    next(err);
  }
};

export default catchController;